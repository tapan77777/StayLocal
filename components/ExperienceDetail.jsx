import { ArrowLeft, BadgeIndianRupee, Lightbulb, MapPin, PackageCheck, Timer, Wallet } from 'lucide-react';
import Link from 'next/link';

/* ─── Experience Detail ────────────────────────────────────────────────── */
const ExperienceDetail = ({ experience }) => (
  <article className="min-h-screen bg-white pb-20 lg:pb-0">

    {/* ── Hero ──────────────────────────────────────────────────────────── */}
    <div className="relative h-[52vh] sm:h-[62vh] overflow-hidden">
      <img
        src={experience.heroImage}
        alt={experience.place}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

      {/* Back */}
      <Link
        href="/experience"
        className="absolute top-5 left-5 sm:top-6 sm:left-8 flex items-center gap-2
                   bg-white/15 backdrop-blur-md text-white text-sm font-medium
                   px-4 py-2.5 rounded-full border border-white/20
                   hover:bg-white/25 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Experiences
      </Link>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-7 sm:px-8 sm:pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-300 text-sm font-medium">{experience.place}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white leading-tight mb-2">
            {experience.title}
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl">
            {experience.subtitle}
          </p>
        </div>
      </div>
    </div>

    {/* ── Content ───────────────────────────────────────────────────────── */}
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16">

      {/* ── Summary highlight strip ── */}
      {(experience.duration || experience.avgPerDay || experience.includes) && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:divide-x sm:divide-slate-200
                        bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden mb-10 sm:mb-14">
          {experience.duration && (
            <div className="flex items-center gap-3 px-5 py-4 sm:flex-1">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Timer className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide leading-none mb-1">I Stayed here for</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{experience.duration}</p>
              </div>
            </div>
          )}
          {experience.avgPerDay && (
            <div className="flex items-center gap-3 px-5 py-4 sm:flex-1">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <BadgeIndianRupee className="w-4 h-4 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide leading-none mb-1">Avg / day</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{experience.avgPerDay}</p>
              </div>
            </div>
          )}
          {experience.includes && (
            <div className="flex items-center gap-3 px-5 py-4 sm:flex-1">
              <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                <PackageCheck className="w-4 h-4 text-sky-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide leading-none mb-1">Includes</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{experience.includes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Founder note highlight */}
      <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl p-5 sm:p-6 mb-10 sm:mb-14">
        <p className="text-slate-700 italic text-base sm:text-lg leading-relaxed">
          &ldquo;{experience.founderNote}&rdquo;
        </p>
        <p className="text-emerald-600 text-sm font-semibold mt-3">— StayLocal Founder</p>
      </div>

      {/* Story paragraphs */}
      <div className="mb-10 sm:mb-14">
        {experience.story.map((para, i) => (
          <p
            key={i}
            className="text-slate-700 text-base sm:text-lg leading-[1.9] mb-5 last:mb-0
                       font-[410] tracking-[-0.01em]"
          >
            {para}
          </p>
        ))}
      </div>

      {/* Day-wise breakdown */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-6 sm:mb-8">
          Day by Day
        </h2>
        <div className="space-y-0">
          {experience.days.map((day, idx) => (
            <div key={day.day} className="flex gap-5 sm:gap-7">
              {/* Timeline spine */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center
                                justify-center text-sm font-bold flex-shrink-0">
                  {day.day}
                </div>
                {idx < experience.days.length - 1 && (
                  <div className="w-px flex-1 bg-emerald-100 my-2" />
                )}
              </div>
              {/* Content */}
              <div className={`pb-8 sm:pb-10 ${idx === experience.days.length - 1 ? 'pb-0' : ''}`}>
                <h3 className="text-base font-semibold text-slate-800 mb-2 leading-snug pt-1.5">
                  {day.title}
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  {day.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mb-10 sm:mb-14">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-amber-900">
              Tips & Notes
            </h2>
          </div>
          <ul className="space-y-3">
            {experience.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-amber-800 text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Budget insights */}
      <div className="mb-10 sm:mb-14">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-800">
              Budget Breakdown
            </h2>
          </div>
          <p className="text-slate-400 text-sm mb-5 leading-relaxed">{experience.budget.note}</p>
          <div className="space-y-2.5">
            {experience.budget.items.map((item) => (
              <div key={item.label} className="flex justify-between items-center gap-4">
                <span className="text-slate-600 text-sm leading-snug">{item.label}</span>
                <span className="text-slate-800 font-semibold text-sm flex-shrink-0">{item.amount}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">
            <span className="text-slate-700 font-semibold text-sm">Total (approx.)</span>
            <span className="text-emerald-600 font-bold text-lg">{experience.budget.total}</span>
          </div>
        </div>
      </div>

      {/* Join this trip CTA */}
      <div className="border-t border-slate-100 pt-10 sm:pt-14">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Want to experience this yourself?
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5
                        bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
          <div>
            <p className="text-slate-800 font-semibold text-base mb-1">
              Join our next group trip to {experience.place.split(',')[0]}
            </p>
            <p className="text-slate-400 text-sm">
              Small group · Slow pace · All inclusive
            </p>
          </div>
          <Link
            href={`/trip/${experience.relatedTripSlug}`}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700
                       text-white px-6 py-3.5 rounded-xl font-semibold text-sm
                       transition-colors flex-shrink-0 min-h-[48px]"
          >
            View Trip Details
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  </article>
);

export default ExperienceDetail;
