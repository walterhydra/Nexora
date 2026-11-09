import React from 'react';

/**
 * NexoraaLogo - Razor-Sharp Vector & 3D Logo Component
 * Matches the official Nexoraa Studio Brandmark with 100% vector clarity (zero blur, zero artifacts)
 *
 * @param {'dark' | 'light'} theme - 'dark' for dark circuit backgrounds, 'light' for white surfaces
 * @param {'sm' | 'md' | 'lg' | 'xl'} size - Component scale
 * @param {string} className - Additional CSS classes
 */
export default function NexoraaLogo({
  theme = 'dark',
  size = 'md',
  className = '',
  onClick
}) {
  const isDark = theme === 'dark';

  // Sizing tokens
  const sizeMap = {
    sm: {
      icon: 'h-8 w-8',
      title: 'text-base tracking-[0.22em]',
      xSize: 'w-3 h-3',
      subtitle: 'text-[9px] tracking-[0.35em]',
      line: 'h-[1.5px]',
      gap: 'gap-2.5'
    },
    md: {
      icon: 'h-11 w-11 sm:h-12 sm:w-12',
      title: 'text-xl sm:text-2xl tracking-[0.24em]',
      xSize: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      subtitle: 'text-[10px] sm:text-[11px] tracking-[0.38em]',
      line: 'h-[2px]',
      gap: 'gap-3.5'
    },
    lg: {
      icon: 'h-14 w-14 sm:h-16 sm:w-16',
      title: 'text-2xl sm:text-3xl tracking-[0.25em]',
      xSize: 'w-5 h-5 sm:w-6 sm:h-6',
      subtitle: 'text-xs sm:text-sm tracking-[0.4em]',
      line: 'h-[2.5px]',
      gap: 'gap-4'
    },
    xl: {
      icon: 'h-18 w-18 sm:h-20 sm:w-20',
      title: 'text-3xl sm:text-4xl tracking-[0.26em]',
      xSize: 'w-7 h-7',
      subtitle: 'text-sm sm:text-base tracking-[0.42em]',
      line: 'h-[3px]',
      gap: 'gap-5'
    }
  };

  const s = sizeMap[size] || sizeMap.md;

  // Colors based on theme
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const blueColor = isDark ? '#3b82f6' : '#2563eb';
  const subtextColor = isDark ? 'text-blue-400' : 'text-blue-600';
  const lineColor = isDark ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-gradient-to-r from-blue-600 to-blue-500';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${s.gap} select-none ${className}`}
      style={{ imageRendering: 'crisp-edges' }}
    >
      {/* 3D Metallic 'N' Brandmark Icon */}
      <div className={`${s.icon} shrink-0 relative flex items-center justify-center`}>
        <img
          src="/logo/nexoraa-icon.png"
          alt="Nexoraa 3D Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Vector Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        {/* Line 1: N E [X] O R A A */}
        <div className={`font-black font-sans uppercase flex items-center ${s.title} ${textColor} leading-none`}>
          <span>NE</span>

          {/* Stylized 'X' with Electric Blue Diagonal Slash */}
          <span className="relative inline-flex items-center justify-center mx-[0.05em] align-middle">
            <svg
              className={`${s.xSize} shrink-0 overflow-visible`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Backslash stroke (Theme Color: White / Dark Slate) */}
              <line
                x1="4"
                y1="4"
                x2="20"
                y2="20"
                stroke={isDark ? '#FFFFFF' : '#0F172A'}
                strokeWidth="4.2"
                strokeLinecap="round"
              />
              {/* Forward slash stroke (Vibrant Royal Blue #2563eb / #38bdf8) */}
              <line
                x1="20"
                y1="4"
                x2="4"
                y2="20"
                stroke={blueColor}
                strokeWidth="4.2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span>ORAA</span>
        </div>

        {/* Line 2: S T U D I O  ──── */}
        <div className="flex items-center w-full mt-1.5 sm:mt-2">
          <span className={`font-extrabold uppercase font-sans ${s.subtitle} ${subtextColor} leading-none shrink-0`}>
            STUDIO
          </span>
          <div className={`flex-1 ${s.line} ${lineColor} rounded-full ml-2 sm:ml-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]`} />
        </div>
      </div>
    </div>
  );
}

