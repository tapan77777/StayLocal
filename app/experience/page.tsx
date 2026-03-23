import type { Metadata } from 'next';
import Link from 'next/link';
import experiences from '@/data/experiences.json';
import ExperienceCard from '@/components/ExperienceCard';

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

      {/* Cards grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.slug} experience={exp} />
          ))}
        </div>

        {/* Footer nudge */}
        <div className="mt-14 sm:mt-20 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Want to travel to one of these places with a small group?
          </p>
          <Link
            href="/#trips"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700
                       text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors min-h-[48px]"
          >
            See Available Trips
          </Link>
        </div>
      </div>
    </main>
  );
}
