
const PricingSection = () => {
  const bookedSpots = 2;
  const totalSpots = 8;
  const availableSpots = totalSpots - bookedSpots;

  return (
    <section id="pricing" className="py-32 px-6 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-serif mb-3 text-white">
            Simple, Honest Pricing
          </h2>
          <p className="text-xl text-emerald-200">One price. No hidden costs.</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            

            {/* Price Display */}
            <div className="text-center mb-8 pb-8 border-b border-white/20">
              <div className="mb-2">
                <span className="text-2xl text-slate-400 line-through">₹18,000</span>
              </div>
              <div className="mb-3">
                <span className="text-7xl md:text-8xl font-serif bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                  ₹15,000
                </span>
              </div>
              <p className="text-emerald-200 text-lg">Per person • All inclusive</p>
            </div>

            {/* Advance Payment */}
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-200 font-medium">Advance to Confirm</span>
                <span className="text-3xl font-bold text-amber-300">₹5,000</span>
              </div>
              <p className="text-xs text-amber-300/80">Non-refundable • Secures your spot</p>
            </div>

{/* CTA Button */}
<div className="text-center">
  <a
    href="https://forms.gle/GJuAs71C2dujDDs3A"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-16 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 hover:from-emerald-500 hover:to-teal-500 active:scale-95"
  >
    Reserve Your Spot
  </a>

  <p className="text-sm text-slate-500 mt-4 font-medium">
    Limited seats • Small group journey
  </p>
</div>


                        {/* LIVE SPOTS TRACKER - Main Attraction */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/40 rounded-full px-6 py-2 mb-4">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </div>
                  <span className="text-red-300 font-semibold text-sm uppercase tracking-wider">Live Booking</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Only <span className="text-5xl md:text-6xl text-emerald-400 animate-pulse">{availableSpots}</span> Spots Left
                </h3>
                <p className="text-slate-300">Out of {totalSpots} total travelers</p>
              </div>

              {/* Visual Spot Grid */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 max-w-3xl mx-auto mb-6">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="relative group/spot"
                  >
                    {i < bookedSpots ? (
                      // Booked Spot
                      <div className="relative">
                        <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-4 md:p-6 border-2 border-slate-700 opacity-40 transform transition-all duration-300">
                          <svg className="w-full h-full text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-1 bg-red-600 rotate-45"></div>
                        </div>
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          ✓
                        </div>
                      </div>
                    ) : (
                      // Available Spot - ANIMATED
                      <div className="relative animate-bounce" style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}>
                        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 md:p-6 border-2 border-emerald-300 shadow-lg shadow-emerald-500/50 transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-emerald-400/60">
                          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                          !
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-emerald-400 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Status Bar */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Booking Progress</span>
                  <span className="text-white font-bold">{bookedSpots}/{totalSpots} Confirmed</span>
                </div>
                <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-full transition-all duration-1000 animate-pulse"
                    style={{ width: `${(bookedSpots / totalSpots) * 100}%` }}
                  ></div>
                </div>
                <p className="text-center text-red-400 font-semibold mt-2 text-xs animate-pulse">
                  ⚠️ {availableSpots} spots filling fast!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;