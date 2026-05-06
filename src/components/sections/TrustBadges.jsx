import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Code, Eye, MessageCircle, Target } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../animations/variants';

const guarantees = [
  { icon: Clock, title: "7-Day Delivery", text: "Cashback protection if we're late." },
  { icon: Code, title: "100% Code Ownership", text: "Signed certificate. No lock-in." },
  { icon: Eye, title: "Live Build Access", text: "Private preview URL from day 1." },
  { icon: MessageCircle, title: "WhatsApp Support", text: "2-hour response. 7 days a week." },
  { icon: Target, title: "Free Nexora Audit", text: "Speed, SEO & mobile graded free." }
];

export default function TrustBadges() {
  return (
    <section className="pt-24 pb-16 bg-black border-y border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/5 to-transparent pointer-events-none" />
      
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10"
      >
        {guarantees.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="glass rounded-xl p-4 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-accent-blue/20 group-hover:text-accent-blue transition-colors text-gray-300">
                <Icon size={20} />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{item.text}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
