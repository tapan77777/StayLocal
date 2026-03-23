import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import experiences from '@/data/experiences.json';
import ExperienceDetail from '@/components/ExperienceDetail';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) return {};
  return {
    title: `${exp.title} | StayLocal`,
    description: exp.shortDesc,
    openGraph: {
      title: `${exp.title} | StayLocal`,
      description: exp.shortDesc,
      images: [{ url: exp.heroImage, width: 1920, height: 1080, alt: exp.place }],
    },
  };
}

export default async function ExperiencePage({ params }: { params: Params }) {
  const { slug } = await params;
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) notFound();
  return <ExperienceDetail experience={exp} />;
}
