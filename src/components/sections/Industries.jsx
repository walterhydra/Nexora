import React, { useState, useRef } from 'react';
import { m } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  ShoppingBag,
  Stethoscope,
  Utensils,
  Briefcase,
  Rocket,
  Store,
  ArrowRight
} from 'lucide-react';

const industries = [
  {
    id: 'education',
    title: 'Education',
    subtitle: 'COACHING · SCHOOLS · INSTITUTES',
    desc: 'Course pages, results, faculty, admin dashboard and local SEO — built to rank and convert.',
    icon: GraduationCap
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    subtitle: 'BUILDERS · BROKERS · PROPERTY',
    desc: 'Property listings, enquiry pipelines, CRM and builder portfolios that attract serious buyers.',
    icon: Building2
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    subtitle: 'RETAIL · D2C · MARKETPLACES',
    desc: 'Full-featured stores, peer-to-peer marketplaces and product discovery platforms.',
    icon: ShoppingBag
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'CLINICS · HOSPITALS · DOCTORS',
    desc: 'Clean, credible clinic websites with appointment booking, doctor profiles and trust signals.',
    icon: Stethoscope
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    subtitle: 'HOTELS · RESTAURANTS · CAFÉS',
    desc: 'Digital menus, table reservations, hotel bookings and brand-aligned food service websites.',
    icon: Utensils
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    subtitle: 'CONSULTANTS · AGENCIES · FIRMS',
    desc: 'Authority-building websites for CA firms, law offices, consultants and service businesses.',
    icon: Briefcase
  },
  {
    id: 'startups',
    title: 'Startups',
    subtitle: 'MVPS · SAAS · DIGITAL PRODUCTS',
    desc: 'From idea to production — MVPs, web applications and scalable digital products.',
    icon: Rocket
  },
  {
    id: 'local-businesses',
    title: 'Local Businesses',
    subtitle: 'SHOPS · SERVICES · REGIONAL',
    desc: 'Fast, affordable websites for local businesses that need to be found and trusted online.',
    icon: Store
  }
];

const IndustryCard = React.memo(({ ind, idx }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--ind-mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--ind-my', `${e.clientY - rect.top}px`);
  };

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: idx * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-none bg-white dark:bg-[#09090d] border border-black/10 dark:border-white/10 hover:border-black/35 dark:hover:border-white/30 transition-colors duration-300 overflow-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
    >
      {/* Shine Effects: Active ONLY when cursor is actively inside this card */}
      {isHovered && (
        <>
          {/* Dynamic Cursor Spotlight Shine */}
          <div
            className="pointer-events-none absolute -inset-px z-0"
            style={{
              background: `radial-gradient(300px circle at var(--ind-mx, 50%) var(--ind-my, 50%), rgba(255, 255, 255, 0.08), transparent 65%)`,
            }}
          />

          {/* Forward-Only Glass Sheen Sweep on Entry */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
            <div 
              className="absolute -top-[50%] -bottom-[50%] -left-[100%] w-[100%] bg-gradient-to-r from-transparent via-white/[0.14] to-transparent transform -skew-x-12 animate-[card-shine-sweep_0.75s_ease-out_forwards]" 
            />
          </div>
        </>
      )}

      <div className="relative z-10">
        {/* Top Row: Square Icon Box + Index Number */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-9 h-9 rounded-md border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] group-hover:border-black/30 dark:group-hover:border-white/30 flex items-center justify-center text-gray-800 dark:text-white/80 transition-colors">
            <ind.icon size={18} strokeWidth={1.75} />
          </div>
          <span 
            className="text-xs font-normal text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/60 transition-colors"
            style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
          >
            0{idx + 1}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-[19px] sm:text-xl font-bold text-gray-950 dark:text-white tracking-tight mb-1.5 leading-snug"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          {ind.title}
        </h3>

        {/* Subtitle from user reference image */}
        <span 
          className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.16em] uppercase text-gray-400 dark:text-white/40 mb-3.5 block"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          {ind.subtitle}
        </span>

        {/* Description from user reference image */}
        <p 
          className="text-[13px] text-gray-600 dark:text-white/60 leading-[1.65] font-normal mb-6"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          {ind.desc}
        </p>
      </div>

      {/* Bottom Link: EXPLORE -> */}
      <div className="relative z-10 pt-4 border-t border-black/5 dark:border-white/5 mt-auto">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-white/45 hover:text-black dark:hover:text-white transition-colors"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          <span>EXPLORE</span>
          <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </m.div>
  );
});

export default function Industries() {
  return (
    <section 
      id="industries" 
      className="py-24 md:py-32 px-6 bg-[#040406] dark:bg-[#040406] relative overflow-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
    >
      {/* Background Ambience - Hardware GPU Accelerated Radial Glow */}
      <div 
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none transform-gpu"
        style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none transform-gpu"
        style={{ background: 'radial-gradient(circle, rgba(123, 47, 255, 0.05) 0%, transparent 70%)' }}
      />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,4,6,1)_100%),_linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header (Left Title + Right Subtitle matching user reference) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-14 md:mb-18">
          <div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12]"
              style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
            >
              Built for different <br className="hidden sm:inline" />
              businesses.
            </h2>
          </div>

          <div className="max-w-md">
            <p 
              className="text-white/60 text-sm sm:text-[15px] font-normal leading-relaxed"
              style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
            >
              Each industry has its own audience, content logic and conversion behaviour. We understand the difference.
            </p>
          </div>
        </div>

        {/* 8-Card Grid (4 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {industries.map((ind, idx) => (
            <IndustryCard key={ind.id} ind={ind} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
