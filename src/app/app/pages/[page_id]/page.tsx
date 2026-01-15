'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Share2,
  Star,
  Clock,
  MessageSquare,
  MoreVertical,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { findPageById } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function PageDetail({ params }: { params: { page_id: string } }) {
  const page = findPageById(params.page_id);
  const [title, setTitle] = useState(page?.title || 'Untitled');
  const [content, setContent] = useState(page?.content || '');

  useEffect(() => {
    const pageData = findPageById(params.page_id);
    setTitle(pageData?.title || 'Untitled');
    setContent(pageData?.content || '');
  }, [params.page_id]);

  if (!page) {
     return (
      <div className="flex flex-col gap-6 items-center justify-center h-full">
         <h1 className="text-4xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
    );
  }


  return (
    <div className="grid lg:grid-cols-4 gap-8 items-start">
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold tracking-tight bg-transparent border-none focus:ring-0 p-0"
            placeholder="Untitled"
          />
          <div className="flex items-center gap-2">
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
          <CardContent className="p-6">
            <Textarea
              className="min-h-[60vh] w-full resize-none border-0 p-0 shadow-none focus-visible:ring-0"
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
            <CardDescription>
              Discuss and leave feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-center text-muted-foreground py-8">
              No comments yet.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
