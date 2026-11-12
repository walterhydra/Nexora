import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterPaperWaves from '../ui/FooterPaperWaves';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="w-full text-white pt-16 md:pt-20 pb-16 border-t border-white/[0.12] relative z-10 overflow-hidden font-quicksand bg-[#020617]"
    >
      {/* Animated 3D Layered Paper Waves Background System */}
      <FooterPaperWaves />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 font-quicksand">
        
        {/* --- Top Hero / Callout Row --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 md:pb-16 border-b border-white/[0.08]">
          {/* Left: Giant Bold Typography */}
          <div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.035em] uppercase leading-none select-none font-sans font-[900]">
              <span
                className="text-transparent bg-clip-text inline-block"
                style={{
                  backgroundImage: 'linear-gradient(115deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #71717a 75%, #ffffff 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'metallic-shimmer 4.5s ease-in-out infinite',
                }}
              >
                NEXORAA
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-neutral-400 uppercase mt-3 sm:mt-4 font-sans">
              DIGITAL AGENCY · INDIA
            </p>
          </div>

          {/* Right: Tagline & CTA Button */}
          <div className="flex flex-col items-start md:items-end gap-5 max-w-md">
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed md:text-right font-medium font-quicksand">
              Websites, web apps, e-commerce, CRM and digital products for growing businesses.
            </p>
            <Link
              to="/start-project"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all duration-200 group shadow-lg shadow-white/5 active:scale-95 font-sans"
            >
              <span>Start a Project</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* --- Middle 4-Column Navigation Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-12 md:py-16 border-b border-white/[0.08]">
          {/* Column 1: WORK */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 md:mb-6 select-none font-quicksand">
              WORK
            </h3>
            <ul className="space-y-3 md:space-y-3.5 text-sm text-neutral-300 font-medium font-quicksand">
              <li>
                <Link to="/projects" className="hover:text-white transition-colors duration-200">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/#work" className="hover:text-white transition-colors duration-200">
                  Demo Library
                </Link>
              </li>
              <li>
                <Link to="/contact?type=Coaching%20Institute%20Website" className="hover:text-white transition-colors duration-200">
                  Coaching
                </Link>
              </li>
              <li>
                <Link to="/contact?type=Real%20Estate%20Website" className="hover:text-white transition-colors duration-200">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link to="/contact?type=Cafe%20%26%20Restaurant%20Website" className="hover:text-white transition-colors duration-200">
                  Restaurants
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 md:mb-6 select-none font-quicksand">
              SERVICES
            </h3>
            <ul className="space-y-3 md:space-y-3.5 text-sm text-neutral-300 font-medium font-quicksand">
              <li>
                <Link to="/services" className="hover:text-white transition-colors duration-200">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/contact?type=App%20Development" className="hover:text-white transition-colors duration-200">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link to="/contact?type=Ecommerce" className="hover:text-white transition-colors duration-200">
                  E-Commerce
                </Link>
              </li>
              <li>
                <Link to="/contact?type=Custom%20CRM" className="hover:text-white transition-colors duration-200">
                  CRM & ERP
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors duration-200">
                  UI/UX Redesign
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 md:mb-6 select-none font-quicksand">
              COMPANY
            </h3>
            <ul className="space-y-3 md:space-y-3.5 text-sm text-neutral-300 font-medium font-quicksand">
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/onboarding" className="hover:text-white transition-colors duration-200">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors duration-200">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 md:mb-6 select-none font-quicksand">
              CONTACT
            </h3>
            <ul className="space-y-3 md:space-y-3.5 text-sm text-neutral-300 font-medium font-quicksand">
              <li>
                <a 
                  href="mailto:contact@nexoraa.works" 
                  className="hover:text-white transition-colors duration-200 break-all"
                >
                  contact@nexoraa.works
                </a>
              </li>
              <li>
                <a 
                  href="tel:+917383303388" 
                  className="hover:text-white transition-colors duration-200"
                >
                  +91 73833 03388
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/917383303388" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors duration-200 inline-flex items-center gap-1.5"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Row 1: Business Verification Bar (Matching Image 1 Row 1) --- */}
        <div className="pt-8 pb-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 select-none">
            BUSINESS VERIFICATION
          </span>

          {/* ISO Badge */}
          <div 
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xs bg-[#18181b] border border-neutral-800 hover:border-neutral-700 transition-all cursor-default select-none group shadow-xs"
            title="ISO 9001:2015 Quality Management Certified"
          >
            <div className="h-5.5 min-w-[26px] max-w-[34px] px-0.5 rounded-xs bg-white flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
              <img 
                src="/images/badges/iso.jpg" 
                alt="ISO 9001:2015 Certified" 
                className="h-full w-auto object-contain" 
              />
            </div>
            <span className="text-xs font-bold text-neutral-200 tracking-wider">ISO</span>
          </div>

          {/* MSME Badge */}
          <div 
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xs bg-[#18181b] border border-neutral-800 hover:border-neutral-700 transition-all cursor-default select-none group shadow-xs"
            title="Ministry of Micro, Small & Medium Enterprises · Government of India Registered"
          >
            <div className="h-5.5 min-w-[26px] max-w-[34px] px-0.5 rounded-xs bg-white flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
              <img 
                src="/images/badges/msme.jpg" 
                alt="MSME Government of India" 
                className="h-full w-auto object-contain" 
              />
            </div>
            <span className="text-xs font-bold text-neutral-200 tracking-wider">MSME</span>
          </div>

          {/* MCA Badge */}
          <div 
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xs bg-[#18181b] border border-neutral-800 hover:border-neutral-700 transition-all cursor-default select-none group shadow-xs"
            title="Ministry of Corporate Affairs · Incorporated Entity"
          >
            <div className="h-5.5 min-w-[26px] max-w-[34px] px-0.5 rounded-xs bg-white flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
              <img 
                src="/images/badges/mca.jpg" 
                alt="MCA Ministry of Corporate Affairs" 
                className="h-full w-auto object-contain" 
              />
            </div>
            <span className="text-xs font-bold text-neutral-200 tracking-wider">MCA</span>
          </div>

          {/* Subtitle */}
          <span className="text-xs text-neutral-400 font-normal">
            Registered under Government of India
          </span>
        </div>

        {/* --- Divider Line --- */}
        <div className="border-t border-white/[0.08]" />

        {/* --- Row 2: Bottom Copyright on Left | Square Socials + Legal Links on Right (Matching Image 1 Row 2) --- */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          {/* Left: Brand Icon + Copyright */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo/nexoraa-icon.png" 
              alt="Nexoraa" 
              className="w-5 h-5 object-contain opacity-85" 
            />
            <p className="text-neutral-400 text-xs font-normal">
              &copy; {currentYear} Nexoraa Digital Agency. All rights reserved.
            </p>
          </div>

          {/* Right: Square Social Buttons + Separator + Legal Links */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Square Outlined Social Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/nexoraa.works?igsh=dnM3bjNjNnd5dnU1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 border border-white/10 hover:border-white/30 rounded-xs flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-white/[0.02]"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/milan-pandavdara/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 border border-white/10 hover:border-white/30 rounded-xs flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-white/[0.02]"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/192NuHy2vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 border border-white/10 hover:border-white/30 rounded-xs flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-white/[0.02]"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>

            {/* Vertical Divider Pipe */}
            <span className="text-white/20 select-none text-xs">|</span>

            {/* Legal Links */}
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                PRIVACY
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                TERMS
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
