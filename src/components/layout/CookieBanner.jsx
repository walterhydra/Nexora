import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 z-[100] max-w-sm p-4 rounded-2xl glass shadow-2xl border border-gray-200 dark:border-white/10"
        >
          <p className="text-sm mb-4">We use cookies to improve your experience and analyze our traffic.</p>
          <div className="flex gap-2">
            <button onClick={accept} className="px-4 py-2 bg-accent-blue text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">
              Accept
            </button>
            <button onClick={decline} className="px-4 py-2 bg-gray-200 dark:bg-white/10 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-white/20 transition">
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
