'use client';
import { ChevronDown, Menu, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import TripCard from './TripCard';
import { trips } from '@/data/trips';

const StayLocal = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('home');
  const [scrolled, setScrolled]             = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home',    label: 'Home'          },
    { id: 'about',   label: 'About'         },
    { id: 'trips',   label: 'Explore Trips' },
    { id: 'contact', label: 'Contact'       },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 text-slate-900">

      {/* ── Navigation ──────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-serif font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              StayLocal
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-emerald-600 font-semibold'
                      : 'text-slate-600 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-emerald-100 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-emerald-900/40 to-teal-900/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Mountain landscape"
          className="absolute inset-0 w-full h-full object-cover animate-zoomSlow"
        />
        <div className="relative z-20 text-center text-white px-6 max-w-4xl animate-fadeInUp">
          <button onClick={() => scrollToSection('trips')}>
            <div className="mb-8 inline-block">
              <img src="favicon.ico" alt="Logo" className="w-60 h-60 mx-auto animate-float" />
            </div>
          </button>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight animate-slideDown">
            Stay local. Move slow.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-slate-200 font-light leading-relaxed animate-slideUp">
            Travel that follows the rhythm of the place — not a checklist.
          </p>
          <button
            onClick={() => scrollToSection('trips')}
            className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-slow"
          >
            <span className="flex items-center gap-2">
              Begin the Journey
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* ── About Us Section ────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-emerald-50/50" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Why StayLocal
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Not a commercial tour",  desc: "We don't run tourist packages. This is a slow, intentional journey with people who value depth over distance." },
              { title: "Small groups only",       desc: "6–8 travelers maximum. Enough for connection, small enough to stay intimate with the place." },
              { title: "Local stays, local food", desc: "Homestays with families who've lived here for generations. Meals cooked in home kitchens, not restaurants." },
              { title: "Experience > itinerary",  desc: "We follow the weather, the mood, the moment. No rigid timelines. Just presence." },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-emerald-100"
              >
                <h3 className="text-2xl font-serif text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Trips ───────────────────────────────────────────────── */}
      <section id="trips" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="inline-block text-emerald-600 font-semibold text-xs tracking-widest uppercase mb-3">
              Handpicked Journeys
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">
              Explore Trips
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-lg leading-relaxed">
              Small groups. Slow pace. Real places. Pick a journey that speaks to you.
            </p>
          </div>

          {/* Trip grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {trips.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-slate-400 text-sm mt-12">
            More destinations coming soon —{' '}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline font-medium"
            >
              WhatsApp us for custom journeys
            </a>
          </p>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-br from-slate-900 to-emerald-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Let's Talk</h2>
          <p className="text-slate-300 mb-10 text-lg leading-relaxed">
            Questions before booking? Curious about a trip? We're real people — reach us
            directly.
          </p>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
          <p className="text-slate-400 text-sm mt-5">Typically replies within 2 hours</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              StayLocal
            </h3>
            <p className="text-slate-500 text-sm">Travel with intention</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-500 hover:text-emerald-400 transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-center border-t border-slate-800 pt-8">
            <p className="text-xs text-slate-600">
              © 2026 StayLocal. Made with care for slow travelers.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Keyframe animations (used by hero section) ──────────────────── */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes zoomSlow {
          from { transform: scale(1);    }
          to   { transform: scale(1.08); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0);    }
          50%      { transform: translateY(-12px); }
        }
        .animate-fadeIn      { animation: fadeIn     0.3s ease            forwards; }
        .animate-fadeInUp    { animation: fadeInUp   1s   ease            forwards; }
        .animate-slideDown   { animation: slideDown  1s   ease  0.2s both;          }
        .animate-slideUp     { animation: slideUp    1s   ease  0.4s both;          }
        .animate-zoomSlow    { animation: zoomSlow   8s   ease-in-out infinite alternate; }
        .animate-float       { animation: float      4s   ease-in-out infinite;           }
        .animate-pulse-slow  { animation: pulse      3s   cubic-bezier(0.4,0,0.6,1) infinite; }
      `}</style>
    </div>
  );
};

export default StayLocal;
