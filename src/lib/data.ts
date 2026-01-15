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
    children: [
      {
        id: '5-1',
        title: 'Tester Manual',
        icon: FileText,
        href: '/app/pages/5-1',
        content: `
# WikiFlow Tester Manual

Welcome to WikiFlow! This manual will guide you through the features currently available for testing. Please note that this version of the application uses in-memory data, which means **all changes will be lost when you refresh your browser or restart the application.**

---

## 1. Authentication

The application uses a mock authentication system.

### Logging In
- You can use any email and password on the login screen. The default values are \`user@example.com\` and \`password\`.
- You can also log in using the "Continue with Google" button, which will sign you in as a mock Google user.

### Logging Out
- You can log out at any time by clicking on your user avatar in the top-right corner and selecting "Logout".

---

## 2. The Dashboard

The dashboard is your central hub for actions and quick access to resources.

### Creating a New Page
- Click the **"Create a new page"** button on the dashboard to instantly create a new, untitled document and be redirected to it.

### Quick Links
This section is designed to give you easy access to important resources.

#### Manually Adding a Resource
1. Click the **"Add Resource"** button.
2. A dialog will appear. Fill in the **Title**, **URL**, and select a **Type** (Website, Google Drive Folder, or Doc).
3. Choose an existing **Category** from the dropdown or select "Create a new category" to add a new one.
4. Click "Add Resource" to see it appear in the list.

#### Automated Drive Scanning (AI Feature)
1. Click the **"Scan for Drive Files"** button.
2. The system will simulate scanning a Google Drive account.
3. An AI model will analyze the file names and automatically categorize them (e.g., into "Operations", "Marketing", etc.).
4. The newly discovered files will be added to the "Quick Links" section under their suggested categories.

---

## 3. Pages

This is the core of the wiki where you document knowledge.

### Creating a Page
- In addition to the dashboard button, you can create a page by clicking the **'+' icon** next to the "Pages" label in the sidebar.
- A dialog will ask you to select a "Parent Page". Choosing "Root" places it at the top level. Selecting another page makes it a sub-page.

### Editing a Page
- Click on any page in the sidebar to navigate to it.
- You can edit the page's **Title** by clicking on it at the top.
- The main content area is a simple text box where you can write your notes.

### Saving and Organizing
1. After making changes, click the **"Save"** button in the top right.
2. A dialog will appear, allowing you to confirm or change the **Parent Page**. This is how you organize pages into categories.
3. Click **"Save Changes"**. Your content will be saved (for your current session), and the page's position in the sidebar will be updated if you changed its parent.

---

Thank you for testing WikiFlow! Your feedback is invaluable.
`,
      }
    ]
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
  for (const page of pageList) {
    // A page cannot be its own parent.
    if (page.id === pageId) {
      continue;
    }

    // A page is a potential parent if it already has children,
    // or if it doesn't have an href (implying it's a container).
    const isCategory = (page.children && page.children.length > 0) || !page.href;

    if (isCategory) {
      potentialParents.push(page);
    }

    // Recurse through children if they exist
    if (page.children) {
      const childParents = getPotentialParents(pageId, page.children);
       potentialParents = [
        ...potentialParents,
        ...childParents,
      ];
    }
  }
  // Remove duplicates that might occur from recursion logic and filter out the page itself
  const uniqueParents = Array.from(new Set(potentialParents.map(p => p.id)))
    .map(id => findPageById(id)!)
    .filter(p => p && p.id !== pageId);
    
  return uniqueParents;
};
