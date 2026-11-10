import React from 'react';
import LaunchSticker from '../ui/LaunchSticker';

export default function ReadyToLaunch() {
  const whatsappUrl = `https://wa.me/917383303388?text=${encodeURIComponent(
    "Hi Nexoraa Studio! I'm ready to get my website live in 7 days. I would like a free consultation."
  )}`;

  return (
    <section className="w-full bg-[#050507] text-white pt-20 pb-20 sm:pb-24 relative overflow-hidden font-quicksand border-t border-white/[0.08]">
      {/* Subtle radial ambient mesh */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.08),transparent_65%)]" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-10">
          
          {/* Left Column: Main Pitch & Action */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white leading-[1.15] tracking-tight font-quicksand">
              Ready to get your website live in 7 days?
            </h2>
            <p className="text-neutral-400 font-medium text-base sm:text-lg mt-4 font-quicksand">
              Developer 'kal pakka deta hu' bolke gayab ho gaya? Tension mat lo, Spidey 7 din me website live karega! 🕷️⚡
            </p>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-none bg-white text-black font-bold text-sm sm:text-base hover:bg-neutral-200 transition-all duration-200 shadow-xl shadow-white/5 group active:scale-95 font-sans"
              >
                <span>WhatsApp Karo — Free Consultation</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Custom Agency Sticker Badge */}
          <div className="flex justify-center lg:justify-end shrink-0">
            <LaunchSticker />
          </div>

        </div>
      </div>
    </section>
  );
}
