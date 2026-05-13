import React, { useState, useEffect } from 'react';
import { useScroll, motion, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [section, setSection] = useState('Home');

  useEffect(() => {
    // Simple intersection observer to update current section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSection(entry.target.id || 'Home');
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex items-center">
      <motion.div
        className="h-1 bg-accent-blue origin-left w-full"
        style={{ scaleX }}
      />
      <div className="absolute right-4 top-2 text-xs font-mono text-gray-500 dark:text-gray-400 dark:text-gray-400 opacity-50">
        {section}
      </div>
    </div>
  );
}
