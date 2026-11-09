import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { faqs } from '../../constants/faq';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  // First item open by default matching reference screenshot
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      className="py-20 md:py-28 px-6 bg-[#040406] dark:bg-[#040406] relative overflow-hidden font-quicksand"
      style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[200px] pointer-events-none" />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,4,6,1)_100%),_linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Subtitle & WhatsApp CTA Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category Tag */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full border border-black/20 dark:border-white/30 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-white/60">
                  ?
                </div>
                <span 
                  className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gray-400 dark:text-white/50"
                  style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                >
                  COMMON QUERIES
                </span>
              </div>

              {/* Stacked Headline */}
              <h2 
                className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.08] mb-4"
                style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
              >
                Frequently <br />
                Asked <br />
                Questions.
              </h2>

              {/* Subtitle */}
              <p 
                className="text-sm sm:text-base text-gray-400 dark:text-white/60 leading-relaxed font-normal mb-8 max-w-sm"
                style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
              >
                Essential insights for Indian business owners scaling their digital presence.
              </p>
            </div>

            {/* Still have questions? WhatsApp Box */}
            <div 
              className="p-5 sm:p-6 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c0c12] max-w-xs shadow-xs"
              style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
            >
              <h4 className="text-base font-bold text-gray-950 dark:text-white mb-3">
                Still have questions?
              </h4>
              <a
                href="https://wa.me/917567097891?text=Hi%20Milan!%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(37,211,102,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp Us →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Accordion Stack */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-none transition-all duration-300 bg-white dark:bg-[#09090d] ${
                    isOpen
                      ? 'border-2 border-black dark:border-white shadow-sm'
                      : 'border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/25'
                  }`}
                  style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                >
                  {/* Clickable Header Row */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer bg-transparent border-0"
                    style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                  >
                    <span 
                      className={`text-[15px] sm:text-[17px] font-bold leading-snug transition-colors ${
                        isOpen 
                          ? 'text-gray-950 dark:text-white' 
                          : 'text-gray-900 dark:text-white/85 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Square Icon Box (+ / -) */}
                    <div 
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-sm flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'bg-black/[0.04] dark:bg-white/[0.06] text-gray-700 dark:text-white/70'
                      }`}
                    >
                      {isOpen ? (
                        <Minus size={14} strokeWidth={2.4} />
                      ) : (
                        <Plus size={14} strokeWidth={2.4} />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                          <div className="w-full h-px bg-black/[0.06] dark:bg-white/[0.08] mb-3.5" />
                          <p 
                            className="text-[13.5px] sm:text-[14.5px] text-gray-600 dark:text-white/70 leading-relaxed font-normal"
                            style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
