import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
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
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          className="fixed bottom-0 inset-x-0 w-full z-[9999] bg-[#090a10]/98 backdrop-blur-2xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.85)] text-white"
        >
          {/* Subtle Top Accent Hairline */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          {/* Full-width Inner Container */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 max-w-4xl">
                <h3 className="text-white font-bold text-base sm:text-lg tracking-tight font-sans">
                  Accept the use of cookies.
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-2 font-sans">
                  We use cookies to improve your browsing experience, serve personalized content, and analyze our traffic. By clicking Accept all Cookies, you agree to the storing of cookies on your device.
                </p>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-1 font-sans">
                  You can customize your settings by clicking Manage Preferences. For more details, see our{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-white underline hover:text-cyan-400 transition-colors font-medium"
                  >
                    Cookie Policy.
                  </Link>
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={decline}
                className="p-1.5 sm:p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Expandable Preferences Drawer */}
            <AnimatePresence>
              {expanded && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                    <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl p-3.5">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-white text-xs sm:text-sm font-semibold">Strictly Essential Cookies</div>
                          <div className="text-neutral-500 text-xs">Required for core website security & functionality</div>
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        Always On
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl p-3.5">
                      <div className="flex items-center gap-3">
                        <BarChart2 className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div>
                          <div className="text-white text-xs sm:text-sm font-semibold">Performance & Analytics</div>
                          <div className="text-neutral-500 text-xs">Helps us optimize site speed and usage metrics</div>
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                        Optional
                      </span>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-5">
              <button
                onClick={accept}
                className="px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-white hover:bg-neutral-200 text-black transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Accept all Cookies
              </button>

              <button
                onClick={() => setExpanded(v => !v)}
                className="px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 transition-all active:scale-95 cursor-pointer"
              >
                {expanded ? 'Hide Preferences' : 'Manage Preferences'}
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
