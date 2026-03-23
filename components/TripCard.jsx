'use client';
import Link from 'next/link';
import { Clock, MapPin, Users } from 'lucide-react';

const CATEGORY_COLORS = {
  Mountains: 'bg-blue-100 text-blue-700',
  Wildlife:  'bg-amber-100 text-amber-700',
  Hills:     'bg-emerald-100 text-emerald-700',
};

const TripCard = ({ trip }) => {
  const categoryStyle = CATEGORY_COLORS[trip.category] ?? 'bg-slate-100 text-slate-600';
  const savingsPct = Math.round(((trip.originalPrice - trip.price) / trip.originalPrice) * 100);

  return (
    <Link
      href={`/trip/${trip.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 flex-shrink-0">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${categoryStyle}`}>
          {trip.category}
        </span>
        {/* Urgency badge */}
        {trip.spotsLeft <= 3 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {trip.spotsLeft} left
          </span>
        )}
        {/* Discount badge */}
        {savingsPct > 0 && trip.spotsLeft > 3 && (
          <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {savingsPct}% off
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Route */}
        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{trip.route}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors leading-snug">
          {trip.title}
        </h3>

        {/* Tagline */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {trip.tagline}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {trip.shortDuration}
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {trip.groupSize}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-100">
          <div className="leading-tight">
            <p className="text-xs text-slate-400 line-through">
              ₹{trip.originalPrice.toLocaleString('en-IN')}
            </p>
            <p className="text-xl font-bold text-emerald-700">
              ₹{trip.price.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-slate-400">per person</p>
          </div>
          <span className="text-sm font-semibold px-4 py-2 rounded-xl border border-emerald-200 text-emerald-700 bg-emerald-50 group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700 transition-colors duration-300">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
