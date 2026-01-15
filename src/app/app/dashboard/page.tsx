'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus2, UserPlus, Clock } from 'lucide-react';
import { pages, addPage } from '@/lib/data';
import { useRouter } from 'next/navigation';

const recentPages = [
  { id: '1-1', title: 'Welcome to WikiFlow' },
  { id: '2-1', title: 'Frontend Guidelines' },
  { id: '3-1', title: 'Roadmap Q3 2024' },
];

export default function DashboardPage() {
  const router = useRouter();
  const handleCreateNewPage = () => {
    const newPage = addPage();
    if (newPage && newPage.href) {
      router.push(newPage.href);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to your Workspace
        </h1>
        <p className="text-muted-foreground">
          Here's a quick overview of what's happening.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Page</CardTitle>
            <FilePlus2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              Start documenting your ideas and knowledge.
            </p>
            <Button size="sm" onClick={handleCreateNewPage}>Create a new page</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Invite Members
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-4">
              Get your team on board to start collaborating.
            </p>
            <Link href="/app/settings?tab=members">
              <Button size="sm">Invite team members</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Pages</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentPages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={`/app/pages/${page.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
