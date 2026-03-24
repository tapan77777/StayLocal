import type { Metadata } from 'next';
import experiences from '@/data/experiences.json';
import ExperienceFilter from '@/components/ExperienceFilter';

export const metadata: Metadata = {
  title: 'My Experiences | StayLocal',
  description: 'Places I have explored — honest accounts, day-by-day breakdowns, and budget insights from someone who actually went.',
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-white pb-20 lg:pb-0">

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-900 pt-28 pb-16 sm:pt-32 sm:pb-20 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-emerald-400 font-semibold text-xs tracking-widest uppercase mb-4">
            First-hand Accounts
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-white mb-5 leading-tight">
            Places I&apos;ve Explored
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Not travel guides. Not sponsored content. These are my real notes — what I ate,
            where I slept, how much it cost, and what it felt like.
          </p>
        </div>
      </div>

      {/* Filter + cards (client component) */}
      <ExperienceFilter experiences={experiences} />
    </main>
  );
}
