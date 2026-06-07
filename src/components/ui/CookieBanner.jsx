import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Cookie, ShieldCheck, BarChart2 } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ y: 120, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-xl"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-accent-violet/10 blur-2xl pointer-events-none" />

          <div className="relative bg-[#0e0e11]/95 border border-white/10 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden">

            {/* Top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-accent-violet via-accent-primary to-accent-violet opacity-70" />

            <div className="p-5">
              {/* Header row */}
              <div className="flex items-start gap-4">
                {/* Cookie icon */}
                <div className="w-11 h-11 rounded-xl bg-accent-violet/15 border border-accent-violet/25 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-accent-violet" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-white font-bold text-sm tracking-wide">We value your privacy</h3>
                    <button
                      onClick={decline}
                      className="text-gray-600 hover:text-white transition-colors shrink-0 cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    We use cookies to enhance your experience, analyze performance, and serve relevant content.{' '}
                    <button
                      onClick={() => setExpanded(v => !v)}
                      className="text-accent-primary hover:underline focus:outline-none"
                    >
                      {expanded ? 'Show less' : 'Learn more'}
                    </button>
                  </p>
                </div>
              </div>

              {/* Expandable details */}
              <AnimatePresence>
                {expanded && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-white text-[11px] font-semibold">Essential</div>
                          <div className="text-gray-500 text-[10px]">Always active</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
                        <BarChart2 className="w-4 h-4 text-accent-primary shrink-0" />
                        <div>
                          <div className="text-white text-[11px] font-semibold">Analytics</div>
                          <div className="text-gray-500 text-[10px]">Performance data</div>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={decline}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-gray-400 border border-white/10 hover:border-white/20 hover:text-white transition-all cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-accent-violet hover:bg-accent-violet/90 text-white transition-all shadow-lg shadow-accent-violet/20 cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
