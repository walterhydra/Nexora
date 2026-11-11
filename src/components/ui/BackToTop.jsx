import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { getScroll } from '../../utils/scroll';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const circleRef = useRef(null);
  const rAFRef = useRef(null);
  const docHeightRef = useRef(1);
  const lastOffsetRef = useRef(-1);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const updateDocHeight = () => {
      docHeightRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    updateDocHeight();
    window.addEventListener('resize', updateDocHeight, { passive: true });

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

        if (shouldShow && circleRef.current) {
          const progress = Math.min(100, Math.max(0, (scrollY / docHeightRef.current) * 100));
          const offset = Math.round((circumference - (progress / 100) * circumference) * 10) / 10;
          if (Math.abs(offset - lastOffsetRef.current) >= 0.5) {
            lastOffsetRef.current = offset;
            circleRef.current.style.strokeDashoffset = `${offset}px`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDocHeight);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [circumference]);

  const scrollToTop = () => {
    const lenis = getScroll();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[#0b0e17] hover:bg-[#151926] transition-colors group border border-white/10 shadow-xl cursor-pointer"
          aria-label="Back to top"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-white/10"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              ref={circleRef}
              cx="24"
              cy="24"
              r={radius}
              className="stroke-accent-blue"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
            />
          </svg>

          {/* Icon */}
          <ArrowUp className="w-5 h-5 text-gray-300 group-hover:text-accent-blue group-hover:-translate-y-0.5 transition-all relative z-10" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
