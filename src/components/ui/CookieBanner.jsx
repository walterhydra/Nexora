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
          initial={{ y: 80, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-lg"
        >
          {/* Subtle Ambient Studio Glow */}
          <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 blur-2xl pointer-events-none" />

          {/* Main Card */}
          <div className="relative bg-[#090a10]/95 border border-white/10 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden">
            
            {/* Elegant Hairline Accent */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <div className="p-4 sm:p-5">
              {/* Header row */}
              <div className="flex items-start gap-3.5">
                {/* Minimal Cookie Icon Badge */}
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                  <Cookie className="w-5 h-5 text-cyan-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white font-semibold text-sm tracking-tight font-sans">
                      We value your privacy
                    </h3>
                    <button
                      onClick={decline}
                      className="text-neutral-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-1 font-sans">
                    We use cookies to enhance your experience, analyze performance, and serve relevant content.{' '}
                    <button
                      onClick={() => setExpanded(v => !v)}
                      className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline focus:outline-none transition-colors"
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
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3.5 pt-3.5 border-t border-white/5 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-white text-[11px] font-semibold">Essential</div>
                          <div className="text-neutral-500 text-[10px]">Always active</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2.5">
                        <BarChart2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <div>
                          <div className="text-white text-[11px] font-semibold">Analytics</div>
                          <div className="text-neutral-500 text-[10px]">Performance data</div>
                        </div>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex items-center gap-2.5 mt-4 pt-1">
                <button
                  onClick={decline}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-[0.98]"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-white hover:bg-neutral-200 text-black shadow-lg shadow-white/5 transition-all cursor-pointer active:scale-[0.98]"
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
