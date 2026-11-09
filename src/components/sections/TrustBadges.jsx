import React from 'react';
import { m } from 'framer-motion';
import { Clock, Code, Eye, MessageCircle, Target } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../animations/variants';

const guarantees = [
  { icon: Clock, title: "7-Day Delivery", text: "Cashback protection if we're late." },
  { icon: Code, title: "100% Code Ownership", text: "Signed certificate. No lock-in." },
  { icon: Eye, title: "Live Build Access", text: "Private preview URL from day 1." },
  { icon: MessageCircle, title: "WhatsApp Support", text: "2-hour response. 7 days a week." },
  { icon: Target, title: "Free Nexoraa Audit", text: "Speed, SEO & mobile graded free." }
];

export default function TrustBadges() {
  return (
    <section className="pt-24 pb-16 bg-white dark:bg-black border-y border-black/10 dark:border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/5 to-transparent pointer-events-none" />
      
      <m.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10"
      >
        {guarantees.map((item, idx) => {
          const Icon = item.icon;
          return (
            <m.div 
              key={idx}
              variants={fadeUp}
              className="relative p-5 rounded-2xl bg-[#0b0e17]/80 backdrop-blur-md border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col items-center text-center group overflow-hidden cursor-pointer"
            >
              {/* 1px Razor Top Border Beam on Hover */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Subtle Luxury Glass Sheen Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
              
              {/* Icon Container - Steady & Stable */}
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-accent-primary/40 group-hover:bg-accent-primary/[0.08] flex items-center justify-center mb-3.5 transition-colors duration-300 relative z-10">
                <Icon size={20} className="text-gray-300 group-hover:text-accent-primary group-hover:scale-110 transition-all duration-300 ease-out" />
              </div>

              <h4 className="font-bold text-white text-sm mb-1 relative z-10 tracking-tight">{item.title}</h4>
              <p className="text-gray-400 group-hover:text-gray-300 text-xs leading-relaxed relative z-10 transition-colors duration-300">{item.text}</p>
            </m.div>
          );
        })}
      </m.div>
    </section>
  );
}
