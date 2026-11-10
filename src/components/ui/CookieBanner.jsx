import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Check, Lock } from 'lucide-react';
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
          className="fixed bottom-0 inset-x-0 w-full z-[9999] bg-[#090a10]/98 backdrop-blur-2xl border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.85)] text-white"
        >
          {/* Subtle Top Accent Hairline */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          {/* Compact Full-width Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
            
            {/* Main Slim Row: Compact Height */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
              
              {/* Left Column: Compact Text */}
              <div className="flex-1 pr-6 md:pr-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm sm:text-base tracking-tight font-sans">
                    Accept the use of cookies.
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-cyan-400/80 font-mono hidden sm:inline-block">
                    • Privacy
                  </span>
                </div>

                <p className="text-neutral-400 text-xs sm:text-[13px] leading-relaxed mt-0.5 font-sans">
                  We use cookies to improve your browsing experience, analyze traffic, and personalize content. By clicking Accept all Cookies, you agree to storing cookies.{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-neutral-200 underline hover:text-cyan-400 transition-colors font-medium ml-1"
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
                  className="px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
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

            {/* Expandable Preferences Drawer with Interactive Checkbox Options */}
            <AnimatePresence>
              {expanded && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                        Cookie Categories & Controls
                      </p>
                      <span className="text-[11px] text-neutral-500">
                        Click any box to tick / untick
                      </span>
                    </div>

                    {/* 4 Interactive Tick-box Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      
                      {/* 1. Essential (Locked) */}
                      <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white text-xs font-semibold">Essential</span>
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              Required
                            </span>
                          </div>
                          <p className="text-neutral-500 text-[11px] leading-tight mt-1">
                            Core security, route protection, and site functionality.
                          </p>
                        </div>

                        <div className="w-5 h-5 rounded-md bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 cursor-not-allowed">
                          <Lock className="w-3 h-3" />
                        </div>
                      </div>

                      {/* 2. Analytics (Toggleable) */}
                      <div
                        onClick={() => togglePreference('analytics')}
                        className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          preferences.analytics
                            ? 'bg-cyan-500/[0.05] border-cyan-400/30'
                            : 'bg-white/[0.01] border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-white text-xs font-semibold">Analytics</span>
                          <p className="text-neutral-400 text-[11px] leading-tight mt-1">
                            Anonymized metrics to optimize page speeds and user flows.
                          </p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            preferences.analytics
                              ? 'bg-cyan-400 border-cyan-400 text-black shadow-sm shadow-cyan-500/30'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {preferences.analytics && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      {/* 3. Functional (Toggleable) */}
                      <div
                        onClick={() => togglePreference('functional')}
                        className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          preferences.functional
                            ? 'bg-cyan-500/[0.05] border-cyan-400/30'
                            : 'bg-white/[0.01] border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-white text-xs font-semibold">Preferences</span>
                          <p className="text-neutral-400 text-[11px] leading-tight mt-1">
                            Remembers your portal login sessions and UI configurations.
                          </p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            preferences.functional
                              ? 'bg-cyan-400 border-cyan-400 text-black shadow-sm shadow-cyan-500/30'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {preferences.functional && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      {/* 4. Marketing (Toggleable) */}
                      <div
                        onClick={() => togglePreference('marketing')}
                        className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          preferences.marketing
                            ? 'bg-cyan-500/[0.05] border-cyan-400/30'
                            : 'bg-white/[0.01] border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-white text-xs font-semibold">Marketing</span>
                          <p className="text-neutral-400 text-[11px] leading-tight mt-1">
                            Relevant launch discounts, case studies, and studio offers.
                          </p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            preferences.marketing
                              ? 'bg-cyan-400 border-cyan-400 text-black shadow-sm shadow-cyan-500/30'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {preferences.marketing && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                    </div>

                    {/* Preferences Drawer Footer Buttons */}
                    <div className="flex items-center justify-end gap-2.5 mt-3 pt-2 border-t border-white/5">
                      <button
                        onClick={decline}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Reject All Optional
                      </button>

                      <button
                        onClick={saveSelected}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-black shadow-md shadow-cyan-500/20 transition-all cursor-pointer active:scale-95"
                      >
                        Save My Preferences
                      </button>
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
