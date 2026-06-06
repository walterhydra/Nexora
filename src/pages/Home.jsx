import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import TrustBadges from '../components/sections/TrustBadges';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import WhyNexora from '../components/sections/WhyNexora';
import Team from '../components/sections/Team';
import Contact from '../components/sections/Contact';
import TechStack from '../components/sections/TechStack';
import Pricing from '../components/sections/Pricing';
import HowWeWork from '../components/sections/HowWeWork';
import RealtimeWork from '../components/sections/RealtimeWork';
import Work from '../components/sections/Work';
import Stats from '../components/sections/Stats';
import Pulse from '../components/sections/Pulse';
import Testimonials from '../components/sections/Testimonials';
import KineticManifesto from '../components/sections/KineticManifesto';


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
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className="relative"
    >
      {/* Cinematic Noise Layer */}
      <div className="noise-overlay" />

      {/* Main Flow */}
      <Hero />
      <div className="bg-[var(--bg-primary)]">
        <TrustBadges />
        <Services />
        <TechStack />
        <Work />
        <Pulse />
        <Stats />
        <About />
        <Team />
        <HowWeWork />
        <RealtimeWork />
        <Pricing />
        <KineticManifesto />
        <Contact />
      </div>

      {/* Background Ambience (Optimized for scroll performance) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 60%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 60%)' }} />
      </div>
    </motion.main>
  );
}
