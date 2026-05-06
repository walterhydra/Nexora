/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode via class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          light: '#f5f5fa',
          dark: '#0a0a0f',
        },
        accent: {
          blue: '#4f8ef7',
          purple: '#9b59ff',
        },
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'mesh': 'mesh 15s ease-in-out infinite',
      },
      keyframes: {
        mesh: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(180deg)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
