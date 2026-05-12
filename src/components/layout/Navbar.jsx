import React, { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import MagneticButton from '../ui/MagneticButton';
import { getScroll } from '../../utils/scroll';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Glassmorphism background state
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);

    // Hide/show logic (Linear.app style) - REMOVED per user request
    // if (latest > 150 && latest > previous) {
    //   setHidden(true);
    // } else {
    //   setHidden(false);
    // }
    setHidden(false);
  });

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      // The home page can handle scrolling to hash on load
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      const lenis = getScroll();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'work' },
    { name: 'How We Work', id: 'howwework' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'FAQ', id: 'faq' }
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out flex justify-center",
          isScrolled ? "pt-4 px-4 sm:px-6" : "pt-0 px-0"
        )}
      >
        <div className={cn(
          "w-full flex items-center justify-between transition-all duration-500 ease-out",
          isScrolled
            ? "max-w-5xl h-16 px-4 sm:px-6 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/10"
            : "max-w-7xl h-24 px-6 md:px-12 bg-transparent"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer" onClick={(e) => location.pathname === '/' && handleNavClick(e, 'home')}>
            <img src="/logo/logo.png" alt="Nexora Logo" className="w-8 h-8 object-contain" />
            <span className="font-display font-bold text-2xl tracking-tight">Nexora</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4 lg:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-lg font-bold hover:text-accent-blue transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className={cn(
              "flex items-center gap-2 lg:gap-4 flex-shrink-0 transition-all duration-500",
              isScrolled 
                ? "pl-4 lg:pl-6 border-l border-gray-200 dark:border-white/10" 
                : "pl-4 lg:pl-6 border-l border-gray-200 dark:border-white/10"
            )}>
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex-shrink-0 text-gray-600 dark:text-gray-300"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <MagneticButton 
                className="bg-accent-primary hover:bg-cyan-300 text-black font-semibold shadow-[0_0_20px_rgba(0,245,255,0.4)] hover:shadow-[0_0_30px_rgba(0,245,255,0.7)] transition-all duration-300 flex-shrink-0 whitespace-nowrap px-8 py-4 text-lg"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Start a Project &rarr;
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-primary-light dark:bg-primary-dark flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-4xl font-display font-bold hover:text-accent-blue"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8">
                <MagneticButton 
                  className="bg-accent-primary hover:bg-cyan-400 text-black font-semibold shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all duration-300"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Start a Project &rarr;
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
