import React from 'react';

export default function MorphingBlob({ className }) {
  return (
    <div
      className={`absolute w-[360px] h-[360px] rounded-full blur-[45px] opacity-15 dark:opacity-20 pointer-events-none ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  );
}
