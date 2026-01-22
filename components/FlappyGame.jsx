'use client';
import { Calendar, Check, ChevronDown, MapPin, Users, X } from 'lucide-react';
import { useState } from 'react';

const StayLocal = () => {
  const [expandedDay, setExpandedDay] = useState(null);

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
      title: "Move to Shoja",
      location: "Shoja",
      stay: "Mountain homestay",
      activities: [
        "Morning at leisure",
        "Short drive to Shoja (1 hour)",
        "Walk to Jalori Pass viewpoint",
        "Evening with local family",
        "Home-cooked Himachali dinner"
      ],
      pace: "Gentle transition",
      focus: "Mountain silence"
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

  return (
    <div className="bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 to-stone-900/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" 
          alt="Mountain landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Stay local. Move slow.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-stone-200 font-light leading-relaxed">
            Travel that follows the rhythm of the place — not a checklist.
          </p>
          <button 
            onClick={() => document.getElementById('journey').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-stone-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-stone-100 transition-colors"
          >
            View the Journey
          </button>
        </div>
      </section>

      {/* Why StayLocal */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            Why StayLocal
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-stone-800">Not a commercial tour</h3>
              <p className="text-stone-600 leading-relaxed">
                We don't run tourist packages. This is a slow, intentional journey with people who value depth over distance.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-stone-800">Small groups only</h3>
              <p className="text-stone-600 leading-relaxed">
                6–8 travelers maximum. Enough for connection, small enough to stay intimate with the place.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-stone-800">Local stays, local food</h3>
              <p className="text-stone-600 leading-relaxed">
                Homestays with families who've lived here for generations. Meals cooked in home kitchens, not restaurants.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-serif text-stone-800">Experience itinerary</h3>
              <p className="text-stone-600 leading-relaxed">
                We follow the weather, the mood, the moment. No rigid timelines. Just presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Overview */}
      <section id="journey" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            The Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-stone-50 p-8 rounded-2xl">
              <MapPin className="w-8 h-8 text-stone-600 mb-4" />
              <h3 className="text-xl font-serif mb-3 text-stone-800">Location</h3>
              <p className="text-stone-600">Jibhi – Shoja – Manali</p>
              <p className="text-sm text-stone-500 mt-2">Himachal Pradesh</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl">
              <Calendar className="w-8 h-8 text-stone-600 mb-4" />
              <h3 className="text-xl font-serif mb-3 text-stone-800">Duration</h3>
              <p className="text-stone-600">5 Nights / 4 Days</p>
              <p className="text-sm text-stone-500 mt-2">Delhi to Delhi</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl">
              <Users className="w-8 h-8 text-stone-600 mb-4" />
              <h3 className="text-xl font-serif mb-3 text-stone-800">Group Size</h3>
              <p className="text-stone-600">6–8 travelers</p>
              <p className="text-sm text-stone-500 mt-2">Small & intimate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Day-wise Plan */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            Day by Day
          </h2>
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  className="w-full p-6 flex items-center justify-between hover:bg-stone-50 transition-colors"
                >
                  <div className="text-left">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-serif text-stone-400">
                        {String(day.day).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-xl font-serif text-stone-800">{day.title}</h3>
                        <p className="text-stone-500 text-sm">{day.location}</p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-stone-400 transition-transform ${
                      expandedDay === day.day ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedDay === day.day && (
                  <div className="px-6 pb-6 pt-2 border-t border-stone-100">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-stone-500 mb-2">Where we stay</p>
                        <p className="text-stone-700">{day.stay}</p>
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 mb-2">Pace of the day</p>
                        <p className="text-stone-700">{day.pace}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm text-stone-500 mb-3">What we do</p>
                      <ul className="space-y-2">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="text-stone-700 pl-6 relative before:content-['·'] before:absolute before:left-0 before:text-stone-400">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-xl">
                      <p className="text-sm text-stone-500">Experience focus</p>
                      <p className="text-stone-700 font-medium">{day.focus}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            What's Included
          </h2>
          <div className="space-y-4">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4">
                <Check className="w-5 h-5 text-stone-600 mt-1 flex-shrink-0" />
                <p className="text-lg text-stone-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-stone-50 rounded-2xl">
            <p className="text-stone-600 leading-relaxed">
              <strong className="text-stone-800">A note on mountain travel:</strong> Weather and road conditions in the Himalayas can be unpredictable. We build buffer time into the journey and adapt when needed. This is part of mountain travel — we embrace it.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For / Not For */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl">
              <h3 className="text-2xl font-serif mb-6 text-stone-800">This is for you if</h3>
              <ul className="space-y-4">
                {thisIsFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-700 mt-1 flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <h3 className="text-2xl font-serif mb-6 text-stone-800">This is NOT for you if</h3>
              <ul className="space-y-4">
                {thisIsNotFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-700 mt-1 flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-stone-600 mt-12 max-w-2xl mx-auto leading-relaxed">
            This clarity helps us travel with the right people. If this resonates, you'll love the journey.
          </p>
        </div>
      </section>

      {/* StayLocal Promise */}
      <section className="py-24 px-6 bg-stone-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            The StayLocal Promise
          </h2>
          <p className="text-xl md:text-2xl text-stone-300 leading-relaxed font-light">
            We don't promise perfection. We promise honesty, warmth, and respect for the places we visit.
          </p>
          <p className="text-lg text-stone-400 mt-8 leading-relaxed">
            We pay our hosts fairly. We travel responsibly. We show up with curiosity, not consumption. This is travel that honors the land and the people who call it home.
          </p>
        </div>
      </section>

      {/* Contact / Join */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Interested in Joining?
          </h2>
          <p className="text-xl text-stone-600 mb-12 leading-relaxed">
            We'd love to hear from you. Share a bit about yourself and why this journey calls to you.
          </p>
          <a
            href="https://wa.me/1234567890?text=Hi, I'm interested in the StayLocal journey to Jibhi-Shoja-Manali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-stone-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-stone-800 transition-colors"
          >
            Start a Conversation
          </a>
          <p className="text-sm text-stone-500 mt-6">
            No pressure. Just a conversation.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-stone-900 text-stone-400 text-center">
        <p className="text-sm">
          StayLocal — Travel with intention
        </p>
        <p className="text-xs mt-2 text-stone-500">
          Made with care for slow travelers
        </p>
      </footer>
    </div>
  );
};

export default StayLocal;