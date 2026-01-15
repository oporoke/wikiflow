import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

export default function PageDetail({ params }: { params: { page_id: string } }) {
  return (
    <div className="grid lg:grid-cols-4 gap-8 items-start">
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">
            Frontend Guidelines
          </h1>
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
              defaultValue={`## Introduction

This document outlines the frontend development guidelines for projects at Acme Inc. Adhering to these standards ensures consistency, maintainability, and quality across our applications.

### Core Principles
- **Component-Based Architecture:** We use React to build encapsulated components that manage their own state.
- **State Management:** For complex state, we utilize Redux Toolkit for a predictable state container.
- **Styling:** We use Tailwind CSS for utility-first styling. All colors, fonts, and spacing should adhere to the design system variables.`}
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
