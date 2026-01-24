'use client';
import { Calendar, Camera, Check, ChevronDown, ChevronLeft, ChevronRight, MapPin, Menu, Mountain, Users, X, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import PricingSection from './price';
const StayLocal = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Placeholder images for gallery slider
  const galleryImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const days = [
    {
      day: 1,
      title: "Arrival & Settling In",
      location: "Jibhi Valley",
      stay: "Local homestay with valley views",
      activities: [
        "Afternoon arrival from Delhi",
        "Welcome tea and introductions",
        "Evening walk around the village",
        "Dinner with your hosts"
      ],
      pace: "Easy arrival day",
      focus: "Meeting the place and people"
    },
    {
      day: 2,
      title: "Forest & Waterfall",
      location: "Jibhi",
      stay: "Same homestay",
      activities: [
        "No rush morning — breakfast when ready",
        "Walk to Chehni Kothi (ancient fort)",
        "Forest trail to Jibhi waterfall",
        "Afternoon rest or explore village",
        "Evening around the bonfire"
      ],
      pace: "Slow exploration",
      focus: "Nature and local architecture"
    },
    {
      day: 3,
      title: "Move to Shoja & Jalori Pass",
      location: "Shoja",
      stay: "Mountain homestay",
      activities: [
        "Morning at leisure",
        "Short drive to Shoja (1 hour)",
        "Afternoon trek to Jalori Pass viewpoint",
        "Witness panoramic Himalayan views",
        "Evening with local family",
        "Home-cooked Himachali dinner"
      ],
      pace: "Gentle transition",
      focus: "Mountain silence & alpine beauty"
    },
    {
      day: 4,
      title: "High Altitude Day",
      location: "Shoja – Manali",
      stay: "Manali homestay",
      activities: [
        "Morning hike to Serolsar Lake",
        "Packed lunch by the lake",
        "Afternoon drive to Manali",
        "Evening free in Old Manali",
        "Group dinner"
      ],
      pace: "Active morning, restful evening",
      focus: "Alpine lakes and altitude"
    },
    {
      day: 5,
      title: "Departure",
      location: "Manali – Delhi",
      stay: "Journey home",
      activities: [
        "Breakfast with the group",
        "Morning buffer time",
        "Afternoon departure to Delhi",
        "Arrive Delhi evening"
      ],
      pace: "Relaxed goodbye",
      focus: "Reflection and closure"
    }
  ];

  const inclusions = [
    "Delhi to Delhi transport (tempo traveler)",
    "All local transfers and road journeys",
    "4 nights homestay accommodation",
    "All meals — breakfast, lunch, dinner",
    "Guided walks and local experiences",
    "Mountain buffer time (weather/roads)"
  ];

  const thisIsFor = [
    "Travelers who like slow mornings",
    "People curious about local culture",
    "Nature lovers who enjoy walks",
    "Those seeking genuine connections",
    "Small group comfort"
  ];

  const thisIsNotFor = [
    "Rushed sightseeing schedules",
    "Party or nightlife trips",
    "Instagram content creation",
    "Luxury hotel expectations",
    "Solo travel (group experience)"
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'journey', label: 'Experience' },
    { id: 'attractions', label: 'Locations' },
    { id: 'gallery', label: 'Photos' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 text-slate-900">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-emerald-900/40 to-teal-900/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" 
          alt="Mountain landscape"
          className="absolute inset-0 w-full h-full object-cover animate-zoomSlow"
        />
        <div className="relative z-20 text-center text-white px-6 max-w-4xl animate-fadeInUp">
          <button 
            onClick={() => scrollToSection('journey')}
            
          >
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
            onClick={() => scrollToSection('journey')}
            className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-slow"
          >
            <span className="flex items-center gap-2">
              Begin the Journey
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-emerald-50/50" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Why StayLocal
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Not a commercial tour", desc: "We don't run tourist packages. This is a slow, intentional journey with people who value depth over distance." },
              { title: "Small groups only", desc: "6–8 travelers maximum. Enough for connection, small enough to stay intimate with the place." },
              { title: "Local stays, local food", desc: "Homestays with families who've lived here for generations. Meals cooked in home kitchens, not restaurants." },
              { title: "Experience > itinerary", desc: "We follow the weather, the mood, the moment. No rigid timelines. Just presence." }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border border-emerald-100"
              >
                <h3 className="text-2xl font-serif text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Overview */}
      <section id="journey" className="py-24 px-6 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-float" />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            The Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: MapPin, title: "Location", value: "Jibhi – Shoja – Manali", sub: "Himachal Pradesh" },
              { Icon: Calendar, title: "Duration", value: "5 Nights / 4 Days", sub: "Delhi to Delhi" },
              { Icon: Users, title: "Group Size", value: "6–8 travelers", sub: "Small & intimate" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group bg-gradient-to-br from-white to-emerald-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-emerald-200"
              >
                <item.Icon className="w-10 h-10 text-emerald-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-serif mb-3 text-slate-800">{item.title}</h3>
                <p className="text-slate-700 font-semibold text-lg">{item.value}</p>
                <p className="text-sm text-slate-500 mt-2">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day-wise Plan */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Day by Day
          </h2>
          <div className="space-y-4">
            {days.map((day) => (
              <div 
                key={day.day} 
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100"
              >
                <button
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300"
                >
                  <div className="text-left flex items-center gap-6">
                    <span className="text-5xl font-serif text-transparent bg-gradient-to-br from-emerald-400 to-teal-600 bg-clip-text">
                      {String(day.day).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl font-serif text-slate-800">{day.title}</h3>
                      <p className="text-emerald-600 text-sm font-medium">{day.location}</p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-emerald-600 transition-transform duration-300 ${
                      expandedDay === day.day ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedDay === day.day && (
                  <div className="px-6 pb-6 pt-2 border-t border-emerald-100 animate-fadeIn">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl">
                        <p className="text-sm text-emerald-700 font-semibold mb-2">Where we stay</p>
                        <p className="text-slate-700">{day.stay}</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-4 rounded-2xl">
                        <p className="text-sm text-blue-700 font-semibold mb-2">Pace of the day</p>
                        <p className="text-slate-700">{day.pace}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm text-slate-500 mb-3 font-semibold">What we do</p>
                      <ul className="space-y-2">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="text-slate-700 pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-emerald-500">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-2xl">
                      <p className="text-sm text-emerald-700 font-semibold">Experience focus</p>
                      <p className="text-slate-700 font-medium">{day.focus}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Attractions - Jalori Pass */}
      <section id="attractions" className="py-24 px-6 bg-gradient-to-br from-emerald-900 to-teal-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Mountain className="w-16 h-16 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Jalori Pass Trek
            </h2>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              The crown jewel of our journey — a high-altitude trek offering panoramic Himalayan views
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif mb-4">Main Attraction</h3>
              <div className="space-y-4 text-emerald-100">
                <p className="leading-relaxed">
                  At 10,800 feet, Jalori Pass is where the Himalayas reveal themselves in full majesty. Snow-capped peaks stretch endlessly, alpine meadows carpet the ground, and the air carries the silence of high mountains.
                </p>
                <p className="leading-relaxed">
                  This isn't a rushed viewpoint stop — we take time here. Breathe deep. Watch clouds drift through valleys. Let the scale of these mountains settle into you.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <h4 className="text-xl font-serif mb-3">Best Views Include:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-300 mt-1 flex-shrink-0" />
                    <span>360° panoramic Himalayan range</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-300 mt-1 flex-shrink-0" />
                    <span>Serolsar Lake — sacred alpine waters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-300 mt-1 flex-shrink-0" />
                    <span>Dense deodar and pine forests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-300 mt-1 flex-shrink-0" />
                    <span>Traditional Himachali villages below</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-300 mt-1 flex-shrink-0" />
                    <span>Untouched alpine meadows</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-1 rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                  alt="Jalori Pass"
                  className="w-full h-96 object-cover rounded-3xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-2xl shadow-2xl max-w-xs">
                <p className="text-sm font-semibold text-emerald-600 mb-2">Altitude</p>
                <p className="text-3xl font-serif">10,800 ft</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            What's Included
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <Check className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-lg text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200">
            <p className="text-slate-700 leading-relaxed">
              <strong className="text-amber-900">A note on mountain travel:</strong> Weather and road conditions in the Himalayas can be unpredictable. We build buffer time into the journey and adapt when needed. This is part of mountain travel — we embrace it.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-3xl shadow-xl border-2 border-green-200">
              <h3 className="text-2xl font-serif mb-6 text-green-900">This is for you if</h3>
              <ul className="space-y-4">
                {thisIsFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-700 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-100 p-8 rounded-3xl shadow-xl border-2 border-red-200">
              <h3 className="text-2xl font-serif mb-6 text-red-900">This is NOT for you if</h3>
              <ul className="space-y-4">
                {thisIsNotFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="w-6 h-6 text-red-700 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Slider */}
      <section id="gallery" className="py-24 px-6 bg-gradient-to-br from-slate-900 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Camera className="w-16 h-16 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Photo Gallery
            </h2>
            <p className="text-xl text-emerald-200">
              Glimpses from past journeys
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-2 rounded-3xl shadow-2xl">
              <img 
                src={galleryImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="w-full h-96 md:h-[600px] object-cover rounded-2xl"
              />
            </div>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-slate-900" />
            </button>
            
            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentImageIndex === idx ? 'bg-white w-8' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <p className="text-center text-emerald-200 mt-8 italic">
            * Gallery images will be updated with actual journey photos
          </p>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-800 to-emerald-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            The StayLocal Promise
          </h2>
          <p className="text-xl md:text-2xl text-emerald-200 leading-relaxed font-light mb-8">
            We don't promise perfection. We promise honesty, warmth, and respect for the places we visit.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            We pay our hosts fairly. We travel responsibly. We show up with curiosity, not consumption. This is travel that honors the land and the people who call it home.
          </p>
        </div>
      </section>

<PricingSection/>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-br from-slate-900 to-emerald-900 text-slate-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              StayLocal
            </h3>
            <p className="text-slate-400">Travel with intention</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="text-center border-t border-slate-700 pt-8">
            <p className="text-sm text-slate-500">
              © 2026 StayLocal. Made with care for slow travelers.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes zoomSlow {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out 0.3s backwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-zoomSlow {
          animation: zoomSlow 20s ease-out infinite alternate;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default StayLocal;