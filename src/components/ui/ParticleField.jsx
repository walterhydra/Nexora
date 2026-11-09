import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Custom canvas-based particle system.
 * Performance Optimizations:
 * - Automatically pauses RAF loop when scrolled offscreen via IntersectionObserver.
 * - Caps DPR to 1.5 to prevent massive GPU fill-rate degradation on 3x retina/mobile displays.
 * - Debounced resize listener.
 */
export default function ParticleField() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  // Keep theme ref in sync without re-initializing particles
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const initParticles = useCallback((width, height) => {
    const count = width < 768 ? 25 : 55; // Slightly reduced count for high frame stability
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        amplitudeX: Math.random() * 0.4 + 0.1,
        amplitudeY: Math.random() * 0.4 + 0.1,
        frequencyX: Math.random() * 0.008 + 0.002,
        frequencyY: Math.random() * 0.008 + 0.002,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
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

    // Set canvas size, capped at DPR 1.5 for optimal mobile & desktop performance
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();
    particlesRef.current = initParticles(width, height);

    // Debounced resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const oldW = width || 1;
        const oldH = height || 1;
        setCanvasSize();
        particlesRef.current.forEach(p => {
          p.x = (p.x / oldW) * width;
          p.y = (p.y / oldH) * height;
        });
      }, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to pause RAF when canvas is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animFrameRef.current) {
          animFrameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = null;
        return;
      }
      if (window.isLoaderActive) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      time++;
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkRef.current;
      const particles = particlesRef.current;
      const baseColor = dark ? '255, 255, 255' : '0, 0, 0';
      const darkMultiplier = dark ? 1 : 0.7;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const sineX = Math.sin(time * p.frequencyX + p.phaseX) * p.amplitudeX;
        const sineY = Math.cos(time * p.frequencyY + p.phaseY) * p.amplitudeY;

        p.x += p.vx + sineX;
        p.y += p.vy + sineY;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const opacity = Math.max(0.02, (p.baseOpacity + Math.sin(time * p.opacitySpeed + p.opacityPhase) * 0.08) * darkMultiplier);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${opacity.toFixed(2)})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      observer.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        willChange: 'transform',
      }}
    />
  );
}
