'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  PanelLeft,
  Search,
  Settings,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useSidebar } from './ui/sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { usePathname, useRouter } from 'next/navigation';
import { pages } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';

const findPath = (
  nodes: typeof pages,
  targetId: string,
  currentPath: { title: string; href?: string }[] = []
): { title: string; href?: string }[] | null => {
  for (const node of nodes) {
    const path = [...currentPath, { title: node.title, href: node.href }];
    if (node.id === targetId) {
      return path;
    }
    if (node.children) {
      const foundPath = findPath(node.children, targetId, path);
      if (foundPath) return foundPath;
    }
  }
  return null;
};

export function AppHeader() {
  const { toggleSidebar, isMobile } = useSidebar();
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const pageId = pathname.split('/').pop();
  let breadcrumbPath: { title: string; href?: string }[] | null = null;
  if (pageId) {
    breadcrumbPath = findPath(pages, pageId);
  }

  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile && (
        <Button
          size="icon"
          variant="outline"
          className="sm:hidden"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/app/dashboard">Workspace</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbPath &&
            breadcrumbPath.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {index === breadcrumbPath.length - 1 ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href || '#'}>{item.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={userAvatar?.imageUrl || '/placeholder-user.jpg'}
              width={36}
              height={36}
              alt="Avatar"
              className="object-cover"
              data-ai-hint={userAvatar?.imageHint}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
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
    </header>
  );
}
