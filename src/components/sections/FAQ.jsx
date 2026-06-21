import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { faqs } from '../../constants/faq';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { HelpCircle, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../ui/MagneticButton';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState(1);

  const activeFaq = faqs[activeIndex];

  return (
    <section id="faq" className="py-24 md:py-32 bg-primary-light dark:bg-primary-dark relative overflow-hidden z-10 border-t border-black/5 dark:border-white/5">
      {/* Background subtle ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[130px] opacity-25 dark:opacity-10" style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 65%)' }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] rounded-full blur-[130px] opacity-25 dark:opacity-10" style={{ background: 'radial-gradient(circle, rgba(155,89,255,0.08) 0%, transparent 65%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Header Block */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 text-center lg:text-left border-b border-gray-200/50 dark:border-white/5 pb-10"
        >
          <m.div variants={fadeUp} className="text-accent-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 flex items-center justify-center lg:justify-start gap-2">
            <span className="w-5 h-[1px] bg-accent-primary/40" /> Help Desk
          </m.div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <m.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </m.h2>
            <m.p variants={fadeUp} className="text-base text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Tap any question to preview the answer. Direct developer communication, transparent agreements, and instant responses.
            </m.p>
          </div>
        </m.div>

        {/* Desktop Layout: Split Interactive Panel */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-start">
          {/* Left Menu Selection list */}
          <div className="col-span-5 space-y-2">
            {faqs.map((faq, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={faq.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full p-4.5 rounded-2xl text-left transition-all duration-300 flex items-start gap-4 cursor-pointer group border-0 bg-transparent ${
                    isActive 
                      ? 'bg-white dark:bg-white/[0.03] border-l-4 border-accent-blue dark:border-accent-primary shadow-sm' 
                      : 'hover:bg-gray-55/50 dark:hover:bg-white/[0.01] border-l-4 border-transparent'
                  }`}
                >
                  {/* Question Serial */}
                  <span className={`font-mono text-sm font-bold tracking-tight shrink-0 mt-0.5 ${
                    isActive ? 'text-accent-blue dark:text-accent-primary' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
                  }`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Question text */}
                  <span className={`text-base font-semibold transition-colors duration-300 leading-snug ${
                    isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}>
                    {faq.question}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Preview Card Box */}
          <div className="col-span-7 h-full">
            <AnimatePresence mode="wait">
              <m.div
                key={activeFaq.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-[#070709]/40 border border-gray-200/50 dark:border-white/5 shadow-2xl rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[420px] relative overflow-hidden"
              >
                {/* Decorative background grid vector */}
                <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 mix-blend-overlay">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                <div>
                  {/* Category Indicator */}
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-white/5 pb-4 relative z-10">
                    <span className="bg-accent-blue/10 dark:bg-white/5 text-accent-blue dark:text-accent-primary font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                      {activeFaq.category === 'process' ? 'Process & Speed' : activeFaq.category === 'quality' ? 'Code & Quality' : 'Payment & Trust'}
                    </span>
                    <HelpCircle size={18} className="text-gray-300 dark:text-white/10" />
                  </div>

                  {/* Active Question */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-4 pr-6 relative z-10">
                    {activeFaq.question}
                  </h3>

                  {/* Visual Divider */}
                  <div className="w-12 h-[2px] bg-gradient-to-r from-accent-blue to-accent-purple my-6 relative z-10" />

                  {/* Answer */}
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal pr-4 relative z-10">
                    {activeFaq.answer}
                  </p>
                </div>

                {/* Card footer redirect */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between relative z-10">
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">Nexoraa Studio Handbook v1.0</span>
                  <Link to="/contact" className="flex items-center gap-1.5 text-xs font-bold text-accent-blue hover:text-accent-blue/80 dark:text-accent-primary dark:hover:text-accent-primary/80 transition-colors group/link cursor-pointer">
                    Ask Milan directly
                    <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout: Responsive Accordion List */}
        <div className="lg:hidden space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = faq.id === openAccordionId;
            return (
              <div
                key={faq.id}
                className={`border border-gray-200/60 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-gray-55/50 dark:bg-white/[0.02] border-accent-blue/20 dark:border-accent-blue/10 shadow-sm' 
                    : 'bg-white dark:bg-transparent hover:bg-gray-55/35 dark:hover:bg-white/[0.01]'
                }`}
              >
                <button
                  onClick={() => setOpenAccordionId(isOpen ? -1 : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer focus:outline-none border-0 bg-transparent"
                >
                  <span className={`text-base font-semibold pr-6 transition-colors duration-300 ${
                    isOpen ? 'text-accent-blue dark:text-white' : 'text-gray-800 dark:text-gray-300'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-7 h-7 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'bg-accent-blue text-white rotate-45 border-accent-blue' 
                      : 'bg-transparent text-gray-400'
                  }`}>
                    <Plus size={14} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-sm text-gray-655 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 pt-3 leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
