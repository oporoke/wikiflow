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
};

export const pages: Page[] = [
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
      },
      {
        id: '1-2',
        title: 'How to create a page',
        icon: FileText,
        href: '/app/pages/1-2',
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
