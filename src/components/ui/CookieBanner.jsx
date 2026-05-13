import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay so it doesn't appear instantly
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 md:left-1/2 md:-translate-x-1/2 z-50 max-w-sm w-[calc(100%-3rem)] md:w-auto"
        >
          <div className="glass px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 border border-gray-200 dark:border-white/10 shadow-2xl">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center sm:text-left">
              We use cookies to ensure you get the best experience. 🍪
            </p>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={accept}
                className="px-4 py-2 bg-white dark:bg-black text-gray-900 dark:text-white dark:bg-white dark:text-black rounded-full text-sm font-medium hover:scale-105 transition-transform"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
