'use client';

import Link from 'next/link';
import React, { useState } from 'react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FilePlus2,
  UserPlus,
  Clock,
  Folder,
  FileText,
  Link2,
  Users,
  Megaphone,
  PlusCircle,
  Scan,
  Loader,
} from 'lucide-react';
import { addPage } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { scanDriveFiles } from '@/ai/flows/scan-drive-files';

const initialResourceCategories = [
  {
    id: 'operations',
    name: '01. Operations',
    icon: Users,
    resources: [],
  },
  {
    id: 'marketing',
    name: '02. Marketing',
    icon: Megaphone,
    resources: [
       {
        title: 'Brand Guidelines',
        href: '#',
        icon: Link2,
        type: 'external-link',
      },
    ],
  },
];

const iconMap: Record<string, React.ElementType> = {
  'drive-folder': Folder,
  'drive-doc': FileText,
  'external-link': Link2,
};

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [resourceCategories, setResourceCategories] = useState(initialResourceCategories);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', url: '', category: '', newCategory: '', type: 'external-link' });

  const handleCreateNewPage = () => {
    const newPage = addPage();
    if (newPage && newPage.href) {
      router.push(newPage.href);
    }
  };

  const handleAddResource = () => {
    const { title, url, category, newCategory, type } = newResource;
    if (!title || !url || (!category && !newCategory)) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out all fields to add a resource.",
        });
        return;
    }
    
    let targetCategoryName = category;
    if (newCategory) {
        targetCategoryName = newCategory;
    }

    const icon = iconMap[type as keyof typeof iconMap] || Link2;
    const newResourceItem = { title, href: url, icon, type };
    
    setResourceCategories(prevCategories => {
        const existingCategory = prevCategories.find(c => c.name === targetCategoryName || c.id === targetCategoryName);
        
        if (existingCategory) {
            return prevCategories.map(c => 
                c.name === targetCategoryName || c.id === targetCategoryName
                    ? { ...c, resources: [...c.resources, newResourceItem] }
                    : c
            );
        } else {
            // Create a new category
            const newCat = {
                id: targetCategoryName.toLowerCase().replace(/\s/g, '-'),
                name: targetCategoryName,
                icon: Users, // Default icon for new categories
                resources: [newResourceItem],
            };
            return [...prevCategories, newCat];
        }
    });

    toast({
        title: "Resource Added",
        description: `"${title}" has been added to your quick links.`,
    });

    setNewResource({ title: '', url: '', category: '', newCategory: '', type: 'external-link' });
    setIsAddResourceOpen(false);
  };

  const handleScanDrive = async () => {
    setIsScanning(true);
    toast({
      title: "Scanning Google Drive...",
      description: "This may take a moment.",
    });

    try {
      const result = await scanDriveFiles();

      setResourceCategories(prevCategories => {
        const newCategories = [...prevCategories];
        
        result.resources.forEach(resource => {
          const icon = iconMap[resource.type] || Link2;
          const newResourceItem = { title: resource.title, href: resource.url, icon, type: resource.type };

          let category = newCategories.find(c => c.name.toLowerCase().includes(resource.category.toLowerCase()));
          
          if (category) {
             // Avoid adding duplicates
            if (!category.resources.some(r => r.title === newResourceItem.title)) {
              category.resources.push(newResourceItem);
            }
          } else {
            // Create a new category if it doesn't exist
             newCategories.push({
                id: resource.category.toLowerCase().replace(/\s/g, '-'),
                name: resource.category,
                icon: Users, // default icon
                resources: [newResourceItem],
            });
          }
        });
        
        return newCategories;
      });

      toast({
        title: "Scan Complete",
        description: `Found and categorized ${result.resources.length} new resources.`,
      });

    } catch (error) {
      console.error("Failed to scan drive:", error);
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: "Could not retrieve files from Google Drive.",
      });
    } finally {
      setIsScanning(false);
    }
  };


  return (
    <>
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
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Quick Links</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleScanDrive} disabled={isScanning}>
                        {isScanning ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Scan className="mr-2 h-4 w-4" />
                        )}
                        Scan for Drive Files
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsAddResourceOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Resource
                    </Button>
                </div>
            </div>
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
                       {category.resources.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                            {category.resources.map((resource, index) => (
                            <Link
                                key={index}
                                href={resource.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted"
                            >
                                <resource.icon className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium">{resource.title}</span>
                            </Link>
                            ))}
                        </div>
                        ) : (
                           <div className="text-sm text-center text-muted-foreground py-4">
                                No resources in this category yet.
                           </div>
                        )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isAddResourceOpen} onOpenChange={setIsAddResourceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Resource</DialogTitle>
            <DialogDescription>
              Add a link to a Google Drive folder, document, or any website.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resource-title">Title</Label>
              <Input
                id="resource-title"
                placeholder="e.g., Q4 Marketing Plan"
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-url">URL</Label>
              <Input
                id="resource-url"
                placeholder="https://..."
                value={newResource.url}
                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="resource-type">Type</Label>
                <Select
                    value={newResource.type}
                    onValueChange={(value) => setNewResource({ ...newResource, type: value })}
                >
                    <SelectTrigger id="resource-type">
                    <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="external-link">Website Link</SelectItem>
                    <SelectItem value="drive-folder">Google Drive Folder</SelectItem>
                    <SelectItem value="drive-doc">Google Drive Doc</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-category">Category</Label>
                <Select
                    value={newResource.category}
                    onValueChange={(value) => setNewResource({ ...newResource, category: value, newCategory: '' })}
                >
                    <SelectTrigger id="resource-category">
                    <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {resourceCategories.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                         <SelectItem value="new">Create a new category</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {newResource.category === 'new' && (
                 <div className="space-y-2">
                    <Label htmlFor="new-category-name">New Category Name</Label>
                    <Input
                        id="new-category-name"
                        placeholder="e.g., 03. Design"
                        value={newResource.newCategory}
                        onChange={(e) => setNewResource({ ...newResource, newCategory: e.target.value })}
                    />
                </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddResource}>Add Resource</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
