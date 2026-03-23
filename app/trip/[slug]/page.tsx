import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { trips } from '@/data/trips';
import TripDetail from '@/components/TripDetail';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);
  if (!trip) return {};
  return {
    title: trip.title,
    description: trip.tagline,
    openGraph: {
      title: `${trip.title} | StayLocal`,
      description: trip.tagline,
      images: [{ url: trip.heroImage, width: 1920, height: 1080, alt: trip.title }],
    },
  };
}

export default async function TripPage({ params }: { params: Params }) {
  const { slug } = await params;
  const trip = trips.find((t) => t.slug === slug);
  if (!trip) notFound();
  return <TripDetail trip={trip} />;
}
