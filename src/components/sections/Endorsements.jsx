import React from 'react';
import { m } from 'framer-motion';
import { Star } from 'lucide-react';

const endorsementsData = [
  {
    id: 1,
    badgeVal: "+40%",
    badgeLabel: "BOOKINGS UP",
    quote: "Nexoraa ne hamare cafe ki digital presence completely transform kar di. Pehle mahine mein hi table bookings 40% badh gayi. 7-din mein website ready thi — exactly jaise promise kiya tha.",
    author: "Kavit Patel",
    role: "Co-Founder, Curators Coffee — Vadodara",
    initial: "K"
  },
  {
    id: 2,
    badgeVal: "7 Days",
    badgeLabel: "LIVE WEBSITE",
    quote: "Digital menu aur curated space ka web showcase bohot seamless hai. Guests hamare naye web experience se bohot impress hue. 100% code ownership certificate milna sabse bada trust factor raha.",
    author: "Riddhi Shah",
    role: "Founder, The Project Cafe — Ahmedabad",
    initial: "R"
  },
  {
    id: 3,
    badgeVal: "3x",
    badgeLabel: "MORE ENQUIRIES",
    quote: "7-din ki delivery commitment bilkul real nikla. Specialty coffee aur weekend event queries 3 guna ho gayi pehle 2 mahine mein. Top-tier design aur lightning-fast speed.",
    author: "Devang Mehta",
    role: "Co-Owner, Meraki The Coffee House — Surat",
    initial: "D"
  }
];

export default function Endorsements() {
  return (
    <section id="endorsements" className="py-20 md:py-28 relative overflow-hidden bg-white dark:bg-[#070709] border-t border-black/5 dark:border-white/5 font-quicksand">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-white/60 mb-3">
              <span>☆</span> ENDORSEMENTS
            </div>
            {/* Title: Pure font metallic shimmer, zero background glow */}
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-quicksand font-bold tracking-tight text-white leading-tight cursor-default select-none"
              style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
            >
              <span 
                className="text-transparent bg-clip-text inline-block"
                style={{
                  fontFamily: '"Quicksand", system-ui, sans-serif',
                  backgroundImage: 'linear-gradient(115deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #71717a 75%, #ffffff 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'metallic-shimmer 4.5s ease-in-out infinite',
                }}
              >
                Real Results. Real Businesses. Across Gujarat.
              </span>
            </h2>
          </div>

          {/* 4.8 Rating Pill Badge */}
          <div className="flex items-center gap-3.5 p-3 px-5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-sm self-start md:self-auto shrink-0 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400" aria-label="4.8 out of 5 stars">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <div className="relative w-3.5 h-3.5">
                <Star className="w-3.5 h-3.5 text-amber-400/30 dark:text-white/20" />
                <div className="absolute inset-y-0 left-0 overflow-hidden w-[75%]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 max-w-none" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-950 dark:text-white leading-none">
                4.8 / 5.0
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 mt-1">
                CLIENT RATING
              </span>
            </div>
          </div>
        </div>

        {/* 3 Endorsements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {endorsementsData.map((item) => (
            <m.div 
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col justify-between p-7 lg:p-8 rounded-2xl bg-white dark:bg-[#0d0d12] border border-black/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 relative group"
            >
              {/* Card Top: Quote glyph & Metric Badge */}
              <div className="flex items-start justify-between mb-6">
                <span className="text-3xl font-serif text-gray-300 dark:text-white/20 select-none leading-none">
                  “
                </span>
                <div className="px-3.5 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] flex flex-col items-center">
                  <span className="text-sm font-black text-gray-950 dark:text-white leading-none">
                    {item.badgeVal}
                  </span>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 dark:text-white/50 uppercase mt-0.5">
                    {item.badgeLabel}
                  </span>
                </div>
              </div>

              {/* Card Middle: Quote */}
              <p className="text-gray-700 dark:text-white/75 font-quicksand text-base sm:text-[17px] leading-relaxed mb-8 font-normal">
                "{item.quote}"
              </p>

              {/* Card Bottom: Divider & Author with Avatar Initial */}
              <div className="border-t border-black/10 dark:border-white/10 pt-5 flex items-center gap-3.5 mt-auto">
                <div className="w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center font-bold text-gray-900 dark:text-white text-sm shrink-0">
                  {item.initial}
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-gray-950 dark:text-white text-sm truncate font-quicksand">
                    {item.author}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-white/50 truncate font-quicksand mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}

