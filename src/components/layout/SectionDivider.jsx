import React from 'react';

export default function SectionDivider() {
  return (
    <div className="relative h-24 md:h-32 w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full fill-current text-primary-light dark:text-primary-dark"
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,123.63,190.28,103.87,242.61,86.4,279.7,70,321.39,56.44Z"></path>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 pointer-events-none" />
    </div>
  );
}
