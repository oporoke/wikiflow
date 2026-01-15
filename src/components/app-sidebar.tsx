'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  Users,
  Settings,
  ChevronsUpDown,
  PlusCircle,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Logo } from './logo';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { pages, addPage, type Page, getPotentialParents } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const NavItem = ({ item }: { item: Page }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(
    (item.children || []).some((child) => pathname.startsWith(child.href || ''))
  );

  React.useEffect(() => {
    if (item.children) {
      const isActive = item.children.some((child) => pathname.startsWith(child.href || ''));
      if (isActive) setIsOpen(true);
    }
  }, [pathname, item.children]);

  if (item.children && item.children.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            variant="ghost"
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.title}</span>
            </div>
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-90'
              )}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((child) => (
              <NavItem key={child.id} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link href={item.href || '#'}>
      <SidebarMenuButton
        variant="ghost"
        isActive={pathname === item.href}
        className="w-full justify-start"
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        <span>{item.title}</span>
      </SidebarMenuButton>
    </Link>
  );
};

export function AppSidebar() {
  const userAvatar = PlaceHolderImages.find(
    (img) => img.id === 'user-avatar-1'
  );
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [pageList, setPageList] = React.useState(pages);
  const [isCreatePageOpen, setIsCreatePageOpen] = React.useState(false);
  const [selectedParent, setSelectedParent] = React.useState<string | null>(
    null
  );

  const potentialParents = React.useMemo(() => getPotentialParents(''), [pageList]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleCreateNewPage = () => {
    const parentId = selectedParent === 'root' ? undefined : selectedParent || undefined;
    const newPage = addPage(parentId);
    setPageList([...pages]);
    if (newPage && newPage.href) {
      router.push(newPage.href);
    }
    toast({
      title: 'Page Created',
      description: `New page "${newPage.title}" created.`,
    });
    setIsCreatePageOpen(false);
    setSelectedParent(null);
  };

  return (
    <>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start h-12 gap-2 px-2">
                <Logo />
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Acme Inc. Workspace</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Workspace
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/app/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Workspace Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/app/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="#">
                    <Users />
                    <span>Members</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Link href="/app/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
              <span>Pages</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsCreatePageOpen(true)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </SidebarGroupLabel>

            <SidebarMenu>
              {pageList.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <NavItem item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 h-14"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.photoURL || userAvatar?.imageUrl}
                    alt={user?.displayName || 'User'}
                  />
                  <AvatarFallback>
                    {user?.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">
                    {user?.displayName || user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.displayName ? user?.email : ''}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 mb-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/app/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <Dialog open={isCreatePageOpen} onOpenChange={setIsCreatePageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Page</DialogTitle>
            <DialogDescription>
              Choose a category to place this page under. Select 'Root' to
              place it at the top level.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent-page" className="text-right">
                Parent Page
              </Label>
              <Select
                onValueChange={(value) => setSelectedParent(value)}
                defaultValue="root"
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root</SelectItem>
                  {potentialParents.map((parent) => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateNewPage}>Create Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
