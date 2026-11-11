import React from 'react';

export default function MorphingBlob({ className }) {
  return (
    <div
      className={`absolute w-[360px] h-[360px] rounded-full blur-2xl opacity-15 dark:opacity-20 pointer-events-none transform-gpu contain-strict ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  );
}
