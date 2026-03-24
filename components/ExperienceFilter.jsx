'use client';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import Link from 'next/link';

/* ─── helpers ────────────────────────────────────────────────────────────── */
const extractState = (place) => {
  const parts = place.split(',');
  return parts.length > 1 ? parts[parts.length - 1].trim() : place.trim();
};

const unique = (arr) => [...new Set(arr)];

/* ─── pill button ────────────────────────────────────────────────────────── */
const Chip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-200 flex-shrink-0
                ${active
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}
  >
    {label}
    {active && <X className="w-3 h-3 opacity-70" />}
  </button>
);

/* ─── horizontal scroll row ──────────────────────────────────────────────── */
const ChipRow = ({ children }) => (
  <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   Main filter component
═══════════════════════════════════════════════════════════════════════════ */
export default function ExperienceFilter({ experiences }) {
  const [search,      setSearch]      = useState('');
  const [activeTag,   setActiveTag]   = useState(null);
  const [activeState, setActiveState] = useState(null);

  /* derive tag + state lists from data */
  const allTags = useMemo(
    () => unique(experiences.flatMap((e) => e.tags).filter(Boolean)),
    [experiences],
  );

  const allStates = useMemo(
    () => unique(experiences.map((e) => extractState(e.place)).filter(Boolean)),
    [experiences],
  );

  /* filter logic */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return experiences.filter((exp) => {
      const matchesTag = !activeTag || exp.tags.includes(activeTag);
      const matchesState = !activeState || extractState(exp.place) === activeState;
      const matchesSearch =
        !q ||
        exp.place.toLowerCase().includes(q) ||
        exp.title.toLowerCase().includes(q) ||
        exp.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesState && matchesSearch;
    });
  }, [experiences, search, activeTag, activeState]);

  const hasActiveFilter = search.trim() || activeTag || activeState;

  const resetAll = () => {
    setSearch('');
    setActiveTag(null);
    setActiveState(null);
  };

  return (
    <>
      {/* ── Sticky filter bar ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-3 space-y-3">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search places, tags..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50
                         text-sm text-slate-900 placeholder-slate-400
                         focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100
                         transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center
                           text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tag chips */}
          <ChipRow>
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              />
            ))}
          </ChipRow>

          {/* State chips */}
          <ChipRow>
            {allStates.map((state) => (
              <Chip
                key={state}
                label={state}
                active={activeState === state}
                onClick={() => setActiveState(activeState === state ? null : state)}
              />
            ))}
          </ChipRow>

          {/* Active filter summary + reset */}
          {hasActiveFilter && (
            <div className="flex items-center justify-between pt-0.5">
              <p className="text-xs text-slate-500">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                {activeTag && <> · <span className="text-slate-700 font-medium">{activeTag}</span></>}
                {activeState && <> · <span className="text-slate-700 font-medium">{activeState}</span></>}
                {search.trim() && <> · &ldquo;<span className="text-slate-700 font-medium">{search.trim()}</span>&rdquo;</>}
              </p>
              <button
                onClick={resetAll}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <SlidersHorizontal className="w-3 h-3" />
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filtered.map((exp) => (
              <ExperienceCard key={exp.slug} experience={exp} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-2xl mb-3">🏔️</p>
            <p className="text-slate-700 font-semibold mb-1">No experiences found</p>
            <p className="text-slate-400 text-sm mb-5">Try a different tag, state, or search term.</p>
            <button
              onClick={resetAll}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Footer nudge */}
        {filtered.length > 0 && (
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
        )}
      </div>
    </>
  );
}
