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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  FileText,
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
import { pages, type Page } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';


const NavItem = ({ item }: { item: Page }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(pathname.startsWith(item.href || `/app/pages/${item.id}`));

  React.useEffect(() => {
    if(item.children) {
      const isActive = item.children.some(child => pathname === child.href);
      if(isActive) setIsOpen(true);
    }
  }, [pathname, item.children]);

  if (item.children) {
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
              className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-90')}
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
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between h-12">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
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
            <Link href="/app/dashboard">
              <SidebarMenuButton
                variant="ghost"
                className="w-full justify-start"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <Link href="#">
              <SidebarMenuButton
                variant="ghost"
                className="w-full justify-start"
              >
                <Users className="h-4 w-4" />
                Members
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <Link href="/app/settings">
              <SidebarMenuButton
                variant="ghost"
                className="w-full justify-start"
              >
                <Settings className="h-4 w-4" />
                Settings
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Pages</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>

          <SidebarMenu>
            {pages.map((item) => (
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
            <Button variant="ghost" className="w-full justify-start gap-2 h-14">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || userAvatar?.imageUrl} alt={user?.displayName || 'User'} />
                <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium truncate">{user?.displayName || user?.email}</p>
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
  );
}
