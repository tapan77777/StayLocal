import Link from 'next/link';
import { ArrowLeft, ArrowRight, BadgeIndianRupee, Bell, Lightbulb, MapPin, PackageCheck, Timer, Wallet } from 'lucide-react';
import trips from '@/data/trips.json';

const WA_NUMBER = '919178628894';

/* ─── WhatsApp SVG ──────────────────────────────────────────────────────── */
const WhatsAppIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─── Experience Detail ────────────────────────────────────────────────── */
const ExperienceDetail = ({ experience }) => {
  /* ── Check if a real trip page exists for this experience ── */
  const tripSlugs = new Set(trips.map((t) => t.slug));
  const tripExists = tripSlugs.has(experience.relatedTripSlug);
  const placeName  = experience.place.split(',')[0];

  /* ── WhatsApp links ── */
  const waInterestMsg = encodeURIComponent(
    `Hi, I'm interested in the ${placeName} trip.\n\nCan you share more details?`
  );
  const waNotifyMsg = encodeURIComponent(
    `Hi, I'm interested in the ${placeName} trip. Please notify me when it's available.`
  );
  const waInterestLink = `https://wa.me/${WA_NUMBER}?text=${waInterestMsg}`;
  const waNotifyLink   = `https://wa.me/${WA_NUMBER}?text=${waNotifyMsg}`;

  return (
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
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center
                                  justify-center text-sm font-bold flex-shrink-0">
                    {day.day}
                  </div>
                  {idx < experience.days.length - 1 && (
                    <div className="w-px flex-1 bg-emerald-100 my-2" />
                  )}
                </div>
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

        {/* ── CTA: Trip exists → View trip + WhatsApp ── */}
        {tripExists ? (
          <div className="border-t border-slate-100 pt-10 sm:pt-14">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Want to experience this yourself?
            </p>
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-4">
                <div>
                  <p className="text-slate-800 font-semibold text-base mb-1">
                    Join our next group trip to {placeName}
                  </p>
                  <p className="text-slate-400 text-sm">
                    Small group · Slow pace · All inclusive
                  </p>
                </div>
                <Link
                  href={`/trip/${experience.relatedTripSlug}`}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700
                             text-white px-6 py-3.5 rounded-xl font-semibold text-sm
                             transition-colors flex-shrink-0 min-h-[48px] active:scale-95"
                >
                  View Trip Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Secondary WhatsApp CTA */}
              <a
                href={waInterestLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500
                           hover:text-emerald-700 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Ask a question on WhatsApp first
              </a>
            </div>
          </div>
        ) : (
          /* ── CTA: Trip does NOT exist → Coming Soon ── */
          <div className="border-t border-slate-100 pt-10 sm:pt-14">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Want to experience this yourself?
            </p>
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-emerald-50/40
                            border border-slate-200 rounded-2xl p-6 sm:p-8 text-center">

              {/* Coming soon badge */}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                               bg-amber-100 text-amber-700 border border-amber-200
                               px-3 py-1 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Trip Coming Soon
              </span>

              <h3 className="text-lg sm:text-xl font-serif text-slate-900 mb-2 leading-snug">
                I&apos;m building a group trip to {placeName}
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 max-w-sm mx-auto">
                I&apos;ve been here. I know what makes it special. I&apos;m working on making this
                available as a small group experience.
              </p>

              <a
                href={waNotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5
                           bg-[#25D366] hover:bg-[#22c55e] active:scale-95
                           text-white px-7 py-3.5 rounded-xl font-semibold text-sm
                           transition-all duration-200 shadow-md shadow-green-100 min-h-[48px]"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Notify Me on WhatsApp
              </a>

              <p className="text-slate-400 text-xs mt-4">
                We&apos;ll message you as soon as the trip opens.
              </p>

              {/* Decorative background blur */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-200/20 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default ExperienceDetail;
