import React from 'react';

export default function MorphingBlob({ className, delay = 0, reverse = false }) {
  // Removed heavy framer motion animation on blurred element to restore 60fps
  return (
    <div
      className={`absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15 dark:opacity-20 pointer-events-none ${className}`}
    />
  );
}
