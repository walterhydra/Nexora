import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from '../../context/ThemeContext';

export default function ParticleField() {
  const [init, setInit] = useState(false);
  const [particleCount, setParticleCount] = useState(150);
  const { isDark } = useTheme();

  // Performance Rule: max 150 desktop, 60 mobile
  useEffect(() => {
    const checkSize = () => {
      setParticleCount(window.innerWidth < 768 ? 60 : 150);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
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
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 20 }, // burst of 20 particles on click
        repulse: { distance: 150, duration: 0.4 }, // repel on hover
      },
    },
    particles: {
      color: { value: isDark ? "#ffffff" : "#000000" },
      links: {
        color: isDark ? "#ffffff" : "#000000",
        distance: 150,
        enable: true,
        opacity: isDark ? 0.2 : 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1,
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
