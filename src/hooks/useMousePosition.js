import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    let animationFrameId;
    
    const updateMousePosition = (ev) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mousePosition;
}
