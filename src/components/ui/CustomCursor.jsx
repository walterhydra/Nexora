import React, { useEffect, useState } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import { cn } from '../utils/cn';

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (x === null || y === null) return null;

  return (
    <div
      className={cn("custom-cursor", isHovering && "hovering")}
      style={{ left: `${x}px`, top: `${y}px` }}
    />
  );
}
