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
    <section className="pt-24 pb-16 bg-white dark:bg-black border-y border-black/10 dark:border-white/10 relative overflow-hidden">
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
              className="glass rounded-xl p-4 flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-blue/10 transition-all duration-300 relative overflow-hidden cursor-pointer border border-gray-200 dark:border-white/10 hover:border-accent-blue/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-purple/0 group-hover:from-accent-blue/10 group-hover:to-accent-purple/10 transition-colors duration-500 pointer-events-none" />
              
              <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:bg-accent-blue/20 group-hover:text-accent-blue group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-gray-700 dark:text-gray-300 relative z-10">
                <Icon size={20} />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-blue group-hover:to-accent-purple transition-all duration-300">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed relative z-10">{item.text}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
