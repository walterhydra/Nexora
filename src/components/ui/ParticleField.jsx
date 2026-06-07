import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from '../../context/ThemeContext';

export default function ParticleField() {
  const [init, setInit] = useState(false);
  const [particleCount, setParticleCount] = useState(150);
  const { isDark } = useTheme();

  useEffect(() => {
    let timeoutId;
    const checkSize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setParticleCount(window.innerWidth < 768 ? 30 : 80);
      }, 150);
    };
    checkSize();
    window.addEventListener('resize', checkSize, { passive: true });
    return () => {
      window.removeEventListener('resize', checkSize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 30,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: false },
        resize: { enable: true },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 }, // repel on hover
      },
    },
    particles: {
      color: { value: isDark ? "#ffffff" : "#000000" },
      links: {
        enable: false, // Disabling links completely solves O(N^2) distance calculations
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: particleCount, // dynamically set by screen width
      },
      opacity: { value: isDark ? 0.3 : 0.2 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [isDark, particleCount]);

  if (!init) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={options}
        className="w-full h-full pointer-events-auto"
      />
    </div>
  );
}
