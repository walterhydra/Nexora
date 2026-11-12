import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // locked
    analytics: true,
    functional: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const togglePreference = (key) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const acceptAll = () => {
    const all = { essential: true, analytics: true, functional: true, marketing: true };
    setPreferences(all);
    localStorage.setItem('cookieConsent', JSON.stringify(all));
    setIsVisible(false);
  };

  const saveSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const decline = () => {
    const minimal = { essential: true, analytics: false, functional: false, marketing: false };
    setPreferences(minimal);
    localStorage.setItem('cookieConsent', JSON.stringify(minimal));
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
          className="fixed bottom-0 inset-x-0 w-full z-[9999] bg-[#090a10] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.85)] text-white font-quicksand transform-gpu"
        >
          {/* Subtle Top Accent Hairline - Pure Monochrome */}
          <div className="h-[1px] w-full bg-white/10" />

          {/* Compact Full-width Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">

            {/* Main Slim Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">

              {/* Left Column: Simple Text */}
              <div className="flex-1 pr-6 md:pr-4">
                <h3 className="text-white font-bold text-sm sm:text-base tracking-tight">
                  Accept the use of cookies.
                </h3>

                <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed mt-0.5">
                  We use cookies to improve your browsing experience, serve personalized content, and analyze our traffic. By clicking Accept all Cookies, you agree to storing cookies.{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-white underline hover:text-neutral-300 transition-colors font-medium ml-1"
                  >
                    Cookie Policy.
                  </Link>
                </p>
              </div>

              {/* Right Column: Compact Actions + Close */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <button
                  onClick={acceptAll}
                  className="px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white hover:bg-neutral-200 text-black transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Accept all Cookies
                </button>

                <button
                  onClick={() => setExpanded(v => !v)}
                  className="px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {expanded ? 'Hide Preferences' : 'Manage Preferences'}
                </button>

                <button
                  onClick={decline}
                  className="p-1.5 sm:p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Close"
                  title="Close & Decline Optional"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Simple Preferences Drawer: Box ho uske samne white mai likha ho */}
            <AnimatePresence>
              {expanded && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-3">

                      {/* Simple Inline / Wrap Checkboxes with White Text */}
                      <div className="flex flex-wrap items-center gap-5 sm:gap-6 py-1">

                        {/* 1. Essential (Always on / locked) */}
                        <div className="flex items-center gap-2.5 select-none cursor-not-allowed">
                          <div className="w-4.5 h-4.5 rounded border border-white/30 bg-white/20 flex items-center justify-center text-white">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-white text-xs sm:text-sm font-medium">
                            Essential <span className="text-neutral-400 text-[11px]">(Required)</span>
                          </span>
                        </div>

                        {/* 2. Analytics */}
                        <div
                          onClick={() => togglePreference('analytics')}
                          className="flex items-center gap-2.5 select-none cursor-pointer group"
                        >
                          <div
                            className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${preferences.analytics
                              ? 'bg-white border-white text-black'
                              : 'border-white/40 bg-white/[0.04] group-hover:border-white'
                              }`}
                          >
                            {preferences.analytics && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-white text-xs sm:text-sm font-medium group-hover:text-neutral-200 transition-colors">
                            Analytics
                          </span>
                        </div>

                        {/* 3. Preferences */}
                        <div
                          onClick={() => togglePreference('functional')}
                          className="flex items-center gap-2.5 select-none cursor-pointer group"
                        >
                          <div
                            className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${preferences.functional
                              ? 'bg-white border-white text-black'
                              : 'border-white/40 bg-white/[0.04] group-hover:border-white'
                              }`}
                          >
                            {preferences.functional && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-white text-xs sm:text-sm font-medium group-hover:text-neutral-200 transition-colors">
                            Preferences
                          </span>
                        </div>

                        {/* 4. Marketing */}
                        <div
                          onClick={() => togglePreference('marketing')}
                          className="flex items-center gap-2.5 select-none cursor-pointer group"
                        >
                          <div
                            className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${preferences.marketing
                              ? 'bg-white border-white text-black'
                              : 'border-white/40 bg-white/[0.04] group-hover:border-white'
                              }`}
                          >
                            {preferences.marketing && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-white text-xs sm:text-sm font-medium group-hover:text-neutral-200 transition-colors">
                            Marketing
                          </span>
                        </div>

                      </div>

                      {/* Save Button (Monochrome White) */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={saveSelected}
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-neutral-200 text-black transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          Save Preferences
                        </button>
                      </div>

                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
