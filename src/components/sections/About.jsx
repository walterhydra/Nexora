import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Nexora Studio Logo SVG component for the card
  const Logo = () => (
    <div className="w-full h-full bg-gradient-to-tr from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center p-4">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-900 dark:text-white">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" />
      </svg>
    </div>
  );

  return (
    <section id="about" className="py-24 bg-primary-dark relative overflow-hidden z-10 border-t border-white/5">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Eyebrow */}
        <div className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-accent-primary" /> Who We Are
        </div>
        
        {/* Title */}
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-16">
          <span className="text-gray-900 dark:text-white">About </span>
          <span className="text-gradient">Nexora.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="space-y-8">
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Premium Digital Agency and Technology Innovators</strong> with a passion for building impactful digital solutions. We specialize in <strong className="text-accent-blue">end-to-end development</strong>, <strong className="text-accent-secondary">stunning design</strong>, and <strong className="text-accent-primary">high-performance web apps</strong>. We thrive in fast-paced environments and are always eager to collaborate on meaningful projects that <strong className="text-gray-900 dark:text-white">solve real-world problems</strong>.
            </p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-black/10 dark:border-white/10">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-mono uppercase tracking-wider">Phone</div>
                <div className="text-gray-900 dark:text-white font-medium">+91 7383303388</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-mono uppercase tracking-wider">Email</div>
                <div className="text-gray-900 dark:text-white font-medium"><a href="mailto:nexoraa.works@gmail.com" className="hover:text-accent-blue transition-colors">nexoraa.works@gmail.com</a></div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-mono uppercase tracking-wider">Based in</div>
                <div className="text-gray-900 dark:text-white font-medium">Remote / Global</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-mono uppercase tracking-wider">Social</div>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/milan-pandavdara/" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-gray-900 dark:hover:text-white transition-colors">LinkedIn</a>
                  <a href="https://github.com/walterhydra" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card (Business Card Style) */}
          <div className="relative perspective-1000 w-full max-w-lg mx-auto aspect-[1.75/1]">

            <div 
              className={`w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col justify-between group hover:border-accent-primary/40 transition-colors">

                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] -z-10" />
                
                <div className="flex justify-between items-start z-10 w-full">
                  <div className="flex-1">
                    {/* Smart Chip (Golden) */}
                    <div className="w-12 h-9 rounded-md border border-white/30 overflow-hidden opacity-90 shadow-lg mb-6" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)' }}>
                       <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #000 4px, #000 8px)' }} />
                       <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30" />
                       <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/30" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-display font-bold leading-none mb-2 text-gray-900 dark:text-white">Nexora<br/>Studio</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-mono text-xs md:text-sm mt-1">&lt;Digital Craftsmen /&gt;</p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-accent-primary font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-right">
                      Agency Identity Card
                    </div>
                    {/* Logo Avatar */}
                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl border border-white/10 p-2 bg-black/50 backdrop-blur-md shadow-xl">
                      <Logo />
                    </div>
                  </div>
                </div>


                {/* Decorative Text */}
                <div className="absolute right-[-5%] bottom-[-15%] text-[8rem] font-black text-white/[0.02] leading-none pointer-events-none font-display select-none">
                  AGENCY
                </div>

                {/* Abstract Barcode */}
                <div className="mt-4 w-32 h-6 opacity-30 z-10" style={{ background: 'repeating-linear-gradient(90deg, #fff 0, #fff 2px, transparent 2px, transparent 4px, #fff 4px, #fff 5px, transparent 5px, transparent 8px, #fff 8px, #fff 12px, transparent 12px, transparent 15px)' }} />




                <div className="flex justify-between items-end z-10">
                  <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-widest font-mono">
                    <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse shadow-[0_0_8px_rgba(180,118,255,0.8)]" />
                    Click to flip
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/50 font-mono tracking-widest">ID: 0xEXP24</div>
                    <div className="text-[10px] text-accent-primary font-mono tracking-widest font-bold mt-1">ACCESS: ROOT</div>
                  </div>
                </div>
              </div>

              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">

                
                {/* Magnetic Stripe */}
                <div className="w-full h-10 md:h-14 bg-gradient-to-r from-[#000] via-[#111] to-[#000] mt-6 md:mt-8 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.05),_0_3px_5px_rgba(0,0,0,0.5)] z-10" />


                <div className="flex flex-1 p-6 items-center">
                  {/* Left QR */}
                  <div className="w-1/3 flex flex-col items-center justify-center border-r border-black/10 dark:border-white/10 pr-6">
                    <div className="bg-white p-2 rounded-xl relative group">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://wa.me/917383303388?text=Hello Nexora Studio! I am interested in collaborating on a professional project.")}`} 
                        alt="Scan for WhatsApp" 
                        className="w-24 h-24 rounded-lg mix-blend-multiply transition-opacity duration-300 group-hover:opacity-10"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href="https://wa.me/917383303388?text=Hello%20Nexora%20Studio!%20I%20am%20interested%20in%20collaborating%20on%20a%20professional%20project." target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white text-[10px] font-bold py-1.5 px-3 rounded-full shadow-lg hover:scale-105 transition-transform" onClick={(e) => e.stopPropagation()}>WhatsApp</a>
                        <a href="mailto:nexoraa.works@gmail.com?subject=Professional Project Inquiry - Nexora Studio" className="bg-accent-blue text-white text-[10px] font-bold py-1.5 px-4 rounded-full shadow-lg hover:scale-105 transition-transform" onClick={(e) => e.stopPropagation()}>Email</a>
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-2 text-center leading-tight">Scan or<br/>Hover</span>
                  </div>


                  {/* Right Details */}
                  <div className="w-2/3 pl-6 flex flex-col justify-center">
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <div className="text-accent-primary text-[10px] mb-1 font-mono uppercase tracking-widest">Experience</div>
                        <div className="text-gray-900 dark:text-white font-bold text-sm">Pro Agency</div>
                        <div className="text-gray-500 dark:text-gray-400 text-[10px] mt-0.5">50+ Projects</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-accent-secondary text-[10px] mb-1 font-mono uppercase tracking-widest">Status</div>
                        <div className="text-gray-900 dark:text-white font-bold text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                          Online
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-[10px] mt-0.5">Accepting Work</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-white/60 text-[10px] mb-2 font-mono uppercase tracking-widest">Technology Core</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['React', 'Node.js', 'Next.js', 'Tailwind'].map(tech => (
                          <span key={tech} className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2 py-0.5 text-[10px] text-gray-700 dark:text-gray-300 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      {/* Tailwind specific classes for 3D flip */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </section>
  );
}
