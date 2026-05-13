import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import TrustBadges from '../components/sections/TrustBadges';
import Services from '../components/sections/Services';
import TechStack from '../components/sections/TechStack';
import Work from '../components/sections/Work';
import Stats from '../components/sections/Stats';
import About from '../components/sections/About';
import Team from '../components/sections/Team';
import HowWeWork from '../components/sections/HowWeWork';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import Newsletter from '../components/sections/Newsletter';
import Contact from '../components/sections/Contact';
import BlogTeaser from '../components/sections/BlogTeaser';

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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Hero />
      <TrustBadges />
      <Services />
      <TechStack />
      <Work />
      <Stats />
      <About />
      <Team />
      <HowWeWork />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Newsletter />
      <Contact />
      <BlogTeaser />
    </motion.main>
  );
}
