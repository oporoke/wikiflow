import {
  Book,
  Code,
  FileText,
  Folder,
  GanttChartSquare,
  GitPullRequest,
  Home,
  LifeBuoy,
  Shield,
} from 'lucide-react';

export type Page = {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: Page[];
  href?: string;
  content?: string;
};

export let pages: Page[] = [
  {
    id: '1',
    title: 'Getting Started',
    icon: Home,
    children: [
      {
        id: '1-1',
        title: 'Welcome to WikiFlow',
        icon: FileText,
        href: '/app/pages/1-1',
        content: `## Welcome to WikiFlow!
        
This is your first document in your new knowledge base. Feel free to edit it.`,
      },
      {
        id: '1-2',
        title: 'How to create a page',
        icon: FileText,
        href: '/app/pages/1-2',
        content: 'You can create a new page by clicking the "Create a new page" button on the dashboard or by using the plus icon in the sidebar.',
      },
    ],
  },
  {
    id: '2',
    title: 'Engineering',
    icon: Code,
    children: [
      {
        id: '2-1',
        title: 'Frontend Guidelines',
        icon: FileText,
        href: '/app/pages/2-1',
        content: `## Introduction

This document outlines the frontend development guidelines for projects at Acme Inc. Adhering to these standards ensures consistency, maintainability, and quality across our applications.

### Core Principles
- **Component-Based Architecture:** We use React to build encapsulated components that manage their own state.
- **State Management:** For complex state, we utilize Redux Toolkit for a predictable state container.
- **Styling:** We use Tailwind CSS for utility-first styling. All colors, fonts, and spacing should adhere to the design system variables.`,
      },
      {
        id: '2-2',
        title: 'Backend Architecture',
        icon: FileText,
        href: '/app/pages/2-2',
      },
      {
        id: '2-3',
        title: 'API Reference',
        icon: Folder,
        children: [
          {
            id: '2-3-1',
            title: 'Authentication API',
            icon: FileText,
            href: '/app/pages/2-3-1',
          },
          {
            id: '2-3-2',
            title: 'Pages API',
            icon: FileText,
            href: '/app/pages/2-3-2',
          },
        ],
      },
       {
        id: '2-4',
        title: 'Pull Requests',
        icon: GitPullRequest,
        href: '/app/pages/2-4',
      },
    ],
  },
  {
    id: '3',
    title: 'Product',
    icon: GanttChartSquare,
    children: [
      {
        id: '3-1',
        title: 'Roadmap Q3 2024',
        icon: FileText,
        href: '/app/pages/3-1',
      },
      {
        id: '3-2',
        title: 'Feature Specifications',
        icon: FileText,
        href: '/app/pages/3-2',
      },
    ],
  },
  {
    id: '4',
    title: 'Company policies',
    icon: Shield,
    href: '/app/pages/4',
  },
  {
    id: '5',
    title: 'Help & Support',
    icon: LifeBuoy,
    href: '/app/pages/5',
  },
];

// Function to find a page by its ID in a nested structure
export const findPageById = (id: string, pageArray: Page[] = pages): Page | null => {
  for (const page of pageArray) {
    if (page.id === id) {
      return page;
    }
    if (page.children) {
      const found = findPageById(id, page.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
};


// In-memory function to add a new page. In a real app, this would be an API call.
export const addPage = (parentId?: string) => {
  const newPageId = Date.now().toString();
  const newPage: Page = {
    id: newPageId,
    title: 'Untitled',
    icon: FileText,
    href: `/app/pages/${newPageId}`,
    content: '',
  };

  if (parentId) {
    const parent = findPageById(parentId);
    if(parent) {
      if(!parent.children) {
        parent.children = [];
      }
      parent.children.push(newPage);
    }
  } else {
    pages.push(newPage);
  }
  return newPage;
};

// In-memory function to update a page.
export const updatePage = (pageId: string, title: string, content: string, parentId?: string | null) => {
  const page = findPageById(pageId);
  if (page) {
    page.title = title;
    page.content = content;
    
    // This is a simplified logic for moving the page.
    // A real implementation would need to handle removing it from the old parent.
    if (parentId) {
      const parent = findPageById(parentId);
      if (parent && parent.id !== pageId) { // a page cannot be its own parent
        // For simplicity, we just add it. A more robust solution
        // would remove it from its original location first.
        if(!parent.children) parent.children = [];
        // Avoid adding if it's already there.
        if(!parent.children.find(p => p.id === pageId)) {
           parent.children.push(page);
        }
      }
    }

  }
  return page;
}

export const getPotentialParents = (pageId: string, pageList: Page[] = pages): Page[] => {
  let potentialParents: Page[] = [];
  for(const page of pageList) {
    // A page cannot be its own parent or a child of its own children.
    if(page.id !== pageId && page.href) {
      potentialParents.push(page);
    }
    if(page.children) {
      potentialParents = [...potentialParents, ...getPotentialParents(pageId, page.children)];
    }
  }
  return potentialParents;
}
