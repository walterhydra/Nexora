import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Custom canvas-based particle system.
 * Uses requestAnimationFrame with sine-wave drift for buttery-smooth floating.
 * Completely scroll-independent — no position recalculation on scroll/resize.
 */
export default function ParticleField() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  // Keep theme ref in sync without re-initializing particles
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const initParticles = useCallback((width, height) => {
    const count = width < 768 ? 35 : 80;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Base velocity — very slow linear drift
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        // Sine-wave parameters for organic floating
        amplitudeX: Math.random() * 0.4 + 0.1,
        amplitudeY: Math.random() * 0.4 + 0.1,
        frequencyX: Math.random() * 0.008 + 0.002,
        frequencyY: Math.random() * 0.008 + 0.002,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        // Visual
        radius: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.2 + 0.08,
        opacitySpeed: Math.random() * 0.003 + 0.001,
        opacityPhase: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas to exact viewport size — only once + on real resize
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();
    particlesRef.current = initParticles(width, height);

    // Debounced resize — only on actual window resize, not scroll
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const oldW = width;
        const oldH = height;
        setCanvasSize();
        // Scale existing particle positions proportionally — no jumps
        particlesRef.current.forEach(p => {
          p.x = (p.x / oldW) * width;
          p.y = (p.y / oldH) * height;
        });
      }, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation loop — pure requestAnimationFrame, zero scroll dependency
    let time = 0;
    const animate = () => {
      if (window.isLoaderActive) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      time++;
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sine-wave floating on top of linear drift
        const sineX = Math.sin(time * p.frequencyX + p.phaseX) * p.amplitudeX;
        const sineY = Math.cos(time * p.frequencyY + p.phaseY) * p.amplitudeY;

        p.x += p.vx + sineX;
        p.y += p.vy + sineY;

        // Soft wrapping — particle drifts off one edge, appears on the other
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Gentle opacity pulsing
        const opacity = p.baseOpacity + Math.sin(time * p.opacitySpeed + p.opacityPhase) * 0.08;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(255, 255, 255, ${Math.max(0.02, opacity)})`
          : `rgba(0, 0, 0, ${Math.max(0.02, opacity * 0.7)})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    />
  );
}
