import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import TrustBadges from '../components/sections/TrustBadges';
import Services from '../components/sections/Services';
import About from '../components/sections/About';

import Team from '../components/sections/Team';
import Contact from '../components/sections/Contact';

import { motion } from 'framer-motion';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative"
    >
      {/* Cinematic Noise Layer */}
      <div className="noise-overlay" />

      {/* Main Flow */}
      <Hero />
      <div className="bg-[var(--bg-primary)]">
         <TrustBadges />
         <Services />
         <About />

         <Team />
         <Contact />
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>
    </motion.main>
  );
}
