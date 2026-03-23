import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

const CATEGORY_STYLES = {
  'Travel Guide': 'bg-sky-50    text-sky-600',
  'Hidden Gems':  'bg-amber-50  text-amber-600',
  'Travel Story': 'bg-emerald-50 text-emerald-600',
};

const StoryCard = ({ story }) => {
  const badge = CATEGORY_STYLES[story.category] ?? 'bg-slate-50 text-slate-500';

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100
                 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300
                 min-w-[80vw] sm:min-w-0 snap-start flex-shrink-0 sm:flex-shrink"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44 sm:h-48 flex-shrink-0">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full
                      backdrop-blur-sm ${badge}`}
        >
          {story.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta row */}
        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span>{story.readTime}</span>
          <span className="mx-0.5">·</span>
          <span>{story.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 leading-snug
                       group-hover:text-emerald-700 transition-colors">
          {story.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {story.excerpt}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-semibold
                         group-hover:gap-2.5 transition-all duration-200">
          Read More
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
};

export default StoryCard;
