import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { stories } from '@/data/stories';
import StoryDetail from '@/components/StoryDetail';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} | StayLocal`,
      description: story.excerpt,
      images: [{ url: story.heroImage, width: 1920, height: 1080, alt: story.title }],
    },
  };
}

export default async function StoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();
  return <StoryDetail story={story} />;
}
