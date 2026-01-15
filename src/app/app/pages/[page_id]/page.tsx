'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Share2,
  Star,
  Clock,
  MessageSquare,
  MoreVertical,
  Save,
} from 'lucide-react';
import { findPageById, updatePage, getPotentialParents, Page } from '@/lib/data';
import { useEffect, useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';

export default function PageDetail() {
  const params = useParams();
  const page_id = params.page_id as string;
  const { toast } = useToast();

  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  useEffect(() => {
    if (page_id) {
      setLoading(true);
      const pageData = findPageById(page_id);
      setPage(pageData);
      setTitle(pageData?.title || 'Untitled');
      setContent(pageData?.content || '');
      setLoading(false);
    }
  }, [page_id]);

  const potentialParents = useMemo(() => getPotentialParents(page_id), [page_id]);

  const handleSave = () => {
    updatePage(page_id, title, content, selectedParent);
    toast({
      title: 'Page Saved!',
      description: `"${title}" has been saved successfully.`,
    });
    setIsSaveDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-full">
        <h1 className="text-2xl font-bold tracking-tight">Loading...</h1>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-full">
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-transparent border-none focus:ring-0 p-0 w-full max-w-full"
              placeholder="Untitled"
            />
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaveDialogOpen(true)}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Clock className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Textarea
                className="min-h-[60vh] w-full resize-none border-0 p-6 shadow-none focus-visible:ring-0"
                placeholder="Start writing your document..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4 sticky top-20">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Comments
              </CardTitle>
              <CardDescription>Discuss and leave feedback.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-center text-muted-foreground py-8">
                No comments yet.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save and Classify Page</DialogTitle>
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
                defaultValue={selectedParent || 'root'}
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
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
