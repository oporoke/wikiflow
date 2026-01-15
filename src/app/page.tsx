import Link from 'next/link';
import Image from 'next/image';
import {
  BookCopy,
  Users,
  Search,
  Lock,
  Edit,
  Box,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const features = [
    {
      icon: <Edit className="w-8 h-8 text-primary" />,
      title: 'Collaborative Editor',
      description:
        'Work together in real-time with a rich text editor that supports markdown, slash commands, and embeds.',
      image: PlaceHolderImages.find((img) => img.id === 'feature-1'),
    },
    {
      icon: <Box className="w-8 h-8 text-primary" />,
      title: 'Smart Organization',
      description:
        'Structure your knowledge with nested pages, categories, and tags. Find what you need, when you need it.',
      image: PlaceHolderImages.find((img) => img.id === 'feature-2'),
    },
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: 'Powerful Search',
      description:
        "Instantly search across all your documents with our fast and accurate full-text search engine.",
      image: PlaceHolderImages.find((img) => img.id === 'feature-3'),
    },
    {
      icon: <Share2 className="w-8 h-8 text-primary" />,
      title: 'Seamless Sharing',
      description:
        'Control who sees what with granular permissions, from entire workspaces to individual pages.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link href="/" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Your Team's Knowledge Base, Reimagined.
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    WikiFlow is the beautifully simple, yet powerful wiki for
                    modern teams. Centralize your knowledge, collaborate
                    flawlessly, and find information instantly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg">Get Started for Free</Button>
                  </Link>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/hero/600/400"
                alt="Hero"
                width={600}
                height={400}
                data-ai-hint="team collaboration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  WikiFlow provides a comprehensive suite of tools to help your
                  team build and share knowledge effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{feature.description}</p>
                    {feature.image && (
                      <Image
                        src={feature.image.imageUrl}
                        alt={feature.title}
                        width={600}
                        height={400}
                        data-ai-hint={feature.image.imageHint}
                        className="mt-4 rounded-lg object-cover"
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-foreground/60">
          &copy; {new Date().getFullYear()} WikiFlow. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
