'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  FilePlus2,
  UserPlus,
  Clock,
  Folder,
  FileText,
  Link2,
  Users,
  Megaphone,
} from 'lucide-react';
import { addPage } from '@/lib/data';
import { useRouter } from 'next/navigation';

const resourceCategories = [
  {
    id: 'operations',
    name: '01. Operations',
    icon: Users,
    resources: [
      {
        title: 'Q3 Logistics Plan',
        href: '#',
        icon: Folder,
      },
      {
        title: 'Supplier Contracts',
        href: '#',
        icon: Folder,
      },
      {
        title: 'Weekly Standup Notes',
        href: '#',
        icon: FileText,
      },
    ],
  },
  {
    id: 'marketing',
    name: '02. Marketing',
    icon: Megaphone,
    resources: [
      {
        title: 'Campaign Assets Q3',
        href: '#',
        icon: Folder,
      },
      {
        title: 'Social Media Calendar',
        href: '#',
        icon: FileText,
      },
      {
        title: 'Brand Guidelines',
        href: '#',
        icon: Link2,
      },
    ],
  },
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
            <Button size="sm" onClick={handleCreateNewPage}>
              Create a new page
            </Button>
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
            <p className="text-xs text-muted-foreground">
              Your recently viewed pages will appear here.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Quick Links</h2>
        <Card>
          <CardContent className="p-4">
            <Accordion
              type="multiple"
              defaultValue={['operations']}
              className="w-full"
            >
              {resourceCategories.map((category) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-3">
                      <category.icon className="h-5 w-5 text-primary" />
                      {category.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      {category.resources.map((resource, index) => (
                        <Link
                          key={index}
                          href={resource.href}
                          className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted"
                        >
                          <resource.icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{resource.title}</span>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
