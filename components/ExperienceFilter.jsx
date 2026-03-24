'use client';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Search, X } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import Link from 'next/link';

/* ─── helpers ────────────────────────────────────────────────────────────── */
const extractState = (place) => {
  const parts = place.split(',');
  return parts.length > 1 ? parts[parts.length - 1].trim() : place.trim();
};

const unique = (arr) => [...new Set(arr)];

/* Priority tags shown first — rest follow in data order */
const PRIORITY_TAGS = ['Mountains', 'Trek', 'Cafes', 'Snow', 'Relax', 'Village'];

const sortTags = (tags) => {
  const priority = tags.filter((t) => PRIORITY_TAGS.includes(t));
  const rest     = tags.filter((t) => !PRIORITY_TAGS.includes(t));
  return [...priority, ...rest];
};

/* ─── Tag chip ───────────────────────────────────────────────────────────── */
const TagChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      inline-flex items-center gap-1.5 whitespace-nowrap
      px-4 py-2 rounded-full text-sm font-medium flex-shrink-0
      border transition-all duration-200 select-none
      ${active
        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50'
      }
    `}
  >
    {label}
    {active && <X className="w-3 h-3 opacity-60 flex-shrink-0" />}
  </button>
);

/* ─── State chip — slightly smaller, different tone ─────────────────────── */
const StateChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      inline-flex items-center gap-1.5 whitespace-nowrap
      px-3.5 py-1.5 rounded-full text-xs font-medium flex-shrink-0
      border transition-all duration-200 select-none
      ${active
        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
        : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-100'
      }
    `}
  >
    {!active && <MapPin className="w-3 h-3 opacity-60 flex-shrink-0" />}
    {label}
    {active && <X className="w-3 h-3 opacity-60 flex-shrink-0" />}
  </button>
);

/* ─── Scrollable chip row ────────────────────────────────────────────────── */
const ChipRow = ({ children }) => (
  <div className="flex gap-2 overflow-x-auto pb-0.5 hide-scrollbar">
    {children}
  </div>
);

/* ─── Section label ──────────────────────────────────────────────────────── */
const FilterLabel = ({ children }) => (
  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2 px-0.5">
    {children}
  </p>
);

/* ═══════════════════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════════════════ */
export default function ExperienceFilter({ experiences }) {
  const searchParams = useSearchParams();
  const [search,      setSearch]      = useState(() => searchParams.get('q') ?? '');
  const [activeTag,   setActiveTag]   = useState(null);
  const [activeState, setActiveState] = useState(null);

  /* sync if the URL param changes (e.g. clicking a place chip from homepage) */
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);

  const allTags = useMemo(
    () => sortTags(unique(experiences.flatMap((e) => e.tags).filter(Boolean))),
    [experiences],
  );

  const allStates = useMemo(
    () => unique(experiences.map((e) => extractState(e.place)).filter(Boolean)),
    [experiences],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return experiences.filter((exp) => {
      const matchesTag    = !activeTag   || exp.tags.includes(activeTag);
      const matchesState  = !activeState || extractState(exp.place) === activeState;
      const matchesSearch = !q
        || exp.place.toLowerCase().includes(q)
        || exp.title.toLowerCase().includes(q)
        || exp.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesState && matchesSearch;
    });
  }, [experiences, search, activeTag, activeState]);

  const hasActiveFilter = !!(search.trim() || activeTag || activeState);

  const resetAll = () => {
    setSearch('');
    setActiveTag(null);
    setActiveState(null);
  };

  return (
    <>
      {/* ── Sticky filter panel ───────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/96 backdrop-blur-lg border-b border-slate-100 shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-4">

          {/* Microcopy + clear */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Find your kind of place
            </p>
            {hasActiveFilter && (
              <button
                onClick={resetAll}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search places, tags..."
              className="w-full pl-11 pr-10 py-3 rounded-full border border-slate-200 bg-slate-50
                         text-sm text-slate-900 placeholder-slate-400
                         focus:outline-none focus:border-emerald-400 focus:bg-white
                         focus:ring-4 focus:ring-emerald-50
                         transition-all duration-200 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center
                           rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700
                           transition-all duration-150"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Tag filter */}
          <div className="mb-3">
            <FilterLabel>Category</FilterLabel>
            <ChipRow>
              {allTags.map((tag) => (
                <TagChip
                  key={tag}
                  label={tag}
                  active={activeTag === tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                />
              ))}
            </ChipRow>
          </div>

          {/* State filter */}
          <div>
            <FilterLabel>State</FilterLabel>
            <ChipRow>
              {allStates.map((state) => (
                <StateChip
                  key={state}
                  label={state}
                  active={activeState === state}
                  onClick={() => setActiveState(activeState === state ? null : state)}
                />
              ))}
            </ChipRow>
          </div>

          {/* Result count — only when filters active */}
          {hasActiveFilter && (
            <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
              <span className="font-semibold text-slate-700">{filtered.length}</span>
              {' '}result{filtered.length !== 1 ? 's' : ''}
              {activeTag    && <> · <span className="text-slate-600">{activeTag}</span></>}
              {activeState  && <> · <span className="text-slate-600">{activeState}</span></>}
              {search.trim() && <> · &ldquo;<span className="text-slate-600">{search.trim()}</span>&rdquo;</>}
            </p>
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
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-4xl mb-4 block">🏔️</span>
            <p className="text-slate-800 font-semibold text-base mb-1.5">No experiences found</p>
            <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
              Try a different tag, state, or search term.
            </p>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600
                         hover:text-emerald-700 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
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
