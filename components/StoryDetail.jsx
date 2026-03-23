import Link from 'next/link';
import { ArrowLeft, Clock, Lightbulb } from 'lucide-react';

/* ─── Prose paragraph renderer ─────────────────────────────────────────── */
const Prose = ({ text }) =>
  text.split('\n\n').map((para, i) => (
    <p key={i} className="text-slate-600 text-base sm:text-lg leading-[1.85] mb-5 last:mb-0">
      {para}
    </p>
  ));

/* ─── Story Detail ──────────────────────────────────────────────────────── */
const StoryDetail = ({ story }) => (
  <article className="min-h-screen bg-white pb-20 lg:pb-0">

    {/* ── Hero ─────────────────────────────────────────────────────────── */}
    <div className="relative h-[52vh] sm:h-[62vh] overflow-hidden">
      <img
        src={story.heroImage}
        alt={story.title}
        className="w-full h-full object-cover"
        priority="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

      {/* Back */}
      <Link
        href="/#stories"
        className="absolute top-5 left-5 sm:top-6 sm:left-8 flex items-center gap-2
                   bg-white/15 backdrop-blur-md text-white text-sm font-medium
                   px-4 py-2.5 rounded-full border border-white/20
                   hover:bg-white/25 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Stories
      </Link>

      {/* Hero caption */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-7 sm:px-8 sm:pb-10">
        <div className="max-w-3xl mx-auto">
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3
                        ${
                          story.category === 'Travel Guide'  ? 'bg-sky-500/90 text-white'    :
                          story.category === 'Hidden Gems'   ? 'bg-amber-500/90 text-white'  :
                                                               'bg-emerald-500/90 text-white'
                        }`}
          >
            {story.category}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white leading-tight mb-2">
            {story.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {story.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>{story.date}</span>
          </div>
        </div>
      </div>
    </div>

    {/* ── Content column ───────────────────────────────────────────────── */}
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16">

      {/* Subtitle */}
      <p className="text-base sm:text-xl text-slate-400 italic leading-relaxed mb-8 sm:mb-12
                    border-l-4 border-emerald-200 pl-5">
        {story.subtitle}
      </p>

      {/* Intro */}
      <div className="mb-10 sm:mb-14">
        {story.intro.map((para, i) => (
          <p
            key={i}
            className="text-slate-700 text-base sm:text-lg leading-[1.9] mb-5 last:mb-0
                       font-[410] tracking-[-0.01em]"
          >
            {para}
          </p>
        ))}
      </div>

      {/* Inline photo strip */}
      <div className="rounded-2xl overflow-hidden mb-10 sm:mb-14">
        <img
          src={story.image}
          alt=""
          className="w-full h-52 sm:h-72 object-cover"
          loading="lazy"
        />
      </div>

      {/* Sections */}
      {story.sections.map((section, i) => (
        <div key={i} className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-4 sm:mb-5">
            {section.heading}
          </h2>
          <Prose text={section.body} />
        </div>
      ))}

      {/* ── Day-wise breakdown ──────────────────────────────────────────── */}
      <div className="mb-10 sm:mb-14">
        <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-6 sm:mb-8">
          Day by Day
        </h2>
        <div className="space-y-0">
          {story.days.map((day, idx) => (
            <div key={day.day} className="flex gap-5 sm:gap-7">
              {/* Timeline spine */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center
                                justify-center text-sm font-bold flex-shrink-0">
                  {day.day}
                </div>
                {idx < story.days.length - 1 && (
                  <div className="w-px flex-1 bg-emerald-100 my-2" />
                )}
              </div>

              {/* Day content */}
              <div className={`pb-8 sm:pb-10 ${idx === story.days.length - 1 ? 'pb-0' : ''}`}>
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

      {/* ── Tips ───────────────────────────────────────────────────────── */}
      <div className="mb-10 sm:mb-16">
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
            {story.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-amber-800 text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Related trip CTA ───────────────────────────────────────────── */}
      <div className="border-t border-slate-100 pt-10 sm:pt-14">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Inspired by this story?
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5
                        bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100">
          <div>
            <p className="text-slate-800 font-semibold text-base mb-1">
              Join our next group trip to this destination
            </p>
            <p className="text-slate-400 text-sm">
              Small group · Slow pace · All inclusive
            </p>
          </div>
          <Link
            href={`/trip/${story.relatedTripSlug}`}
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

export default StoryDetail;
