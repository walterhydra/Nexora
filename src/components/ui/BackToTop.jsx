import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { getScroll } from '../../utils/scroll';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isVisibleRef = useRef(false);
  const lastProgressRef = useRef(0);
  const rAFRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rAFRef.current) return;

      rAFRef.current = requestAnimationFrame(() => {
        rAFRef.current = null;
        const scrollY = window.scrollY;
        const shouldShow = scrollY > 500;

        if (shouldShow !== isVisibleRef.current) {
          isVisibleRef.current = shouldShow;
          setIsVisible(shouldShow);
        }

        if (shouldShow) {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
          if (Math.abs(progress - lastProgressRef.current) > 1.5) {
            lastProgressRef.current = progress;
            setScrollProgress(progress);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = getScroll();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 flex items-center justify-center rounded-full glass hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group border border-gray-200 dark:border-white/10"
          aria-label="Back to top"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-gray-300 dark:stroke-white/10"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-accent-blue transition-all duration-150"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>

          {/* Icon */}
          <ArrowUp className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-accent-blue group-hover:-translate-y-0.5 transition-all relative z-10" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
