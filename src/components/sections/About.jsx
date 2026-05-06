import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Nexora Studio Logo SVG component for the card
  const Logo = () => (
    <div className="w-full h-full bg-gradient-to-tr from-accent-blue to-accent-purple rounded-2xl flex items-center justify-center p-4">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
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
          <span className="text-white">About </span>
          <span className="text-gradient">Nexora.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="space-y-8">
            <p className="text-xl text-gray-400 leading-relaxed">
              <strong className="text-white">Premium Digital Agency and Technology Innovators</strong> with a passion for building impactful digital solutions. We specialize in <strong className="text-accent-blue">end-to-end development</strong>, <strong className="text-accent-secondary">stunning design</strong>, and <strong className="text-accent-primary">high-performance web apps</strong>. We thrive in fast-paced environments and are always eager to collaborate on meaningful projects that <strong className="text-white">solve real-world problems</strong>.
            </p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-sm text-gray-500 mb-1 font-mono uppercase tracking-wider">Phone</div>
                <div className="text-white font-medium">+91-9999999999</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 font-mono uppercase tracking-wider">Email</div>
                <div className="text-white font-medium"><a href="mailto:hello@nexorastudio.com" className="hover:text-accent-blue transition-colors">hello@nexorastudio.com</a></div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 font-mono uppercase tracking-wider">Based in</div>
                <div className="text-white font-medium">Remote / Global</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 font-mono uppercase tracking-wider">Social</div>
                <div className="flex gap-4">
                  <a href="#" className="text-accent-blue hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="text-accent-blue hover:text-white transition-colors">Twitter</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card (Business Card Style) */}
          <div className="relative perspective-1000 w-full max-w-lg mx-auto aspect-[1.6/1]">
            <div 
              className={`w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 flex flex-col justify-between group hover:border-accent-primary/40 transition-colors">
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] -z-10" />
                
                <div className="flex justify-between items-start z-10">
                  <div className="flex-1 pr-6">
                    <div className="text-accent-primary font-mono text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">
                      Agency Identity Card
                    </div>
                    <h3 className="text-4xl font-display font-bold leading-none mb-2 text-white">Nexora<br/>Studio</h3>
                    <p className="text-gray-400 font-mono text-sm mt-2">&lt;Digital Craftsmen /&gt;</p>
                    
                    {/* Abstract Barcode */}
                    <div className="mt-5 w-24 h-4 opacity-40" style={{ background: 'repeating-linear-gradient(90deg, #fff 0, #fff 2px, transparent 2px, transparent 4px, #fff 4px, #fff 5px, transparent 5px, transparent 8px, #fff 8px, #fff 12px, transparent 12px, transparent 15px)' }} />
                  </div>

                  {/* Logo Avatar */}
                  <div className="w-24 h-24 shrink-0 rounded-2xl border border-white/20 p-2 relative z-10 bg-black/50 backdrop-blur-md shadow-xl">
                    <Logo />
                  </div>
                </div>

                {/* Decorative Text */}
                <div className="absolute right-[-5%] bottom-[-15%] text-[8rem] font-black text-white/[0.02] leading-none pointer-events-none font-display select-none">
                  AGENCY
                </div>

                {/* Smart Chip (Golden) */}
                <div className="absolute top-10 right-36 w-12 h-9 rounded-md border border-white/30 overflow-hidden opacity-90 z-10 shadow-lg" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)' }}>
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #000 4px, #000 8px)' }} />
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30" />
                   <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/30" />
                </div>

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
                <div className="w-full h-14 bg-gradient-to-r from-[#000] via-[#111] to-[#000] mt-8 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.05),_0_3px_5px_rgba(0,0,0,0.5)] z-10" />

                <div className="flex flex-1 p-6 items-center">
                  {/* Left QR */}
                  <div className="w-1/3 flex flex-col items-center justify-center border-r border-white/10 pr-6">
                    <div className="bg-white p-2 rounded-xl">
                      {/* Simple WhatsApp QR Code */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("https://wa.me/917567097891?text=Hello Milan! I am interested in collaborating with Nexora Studio.")}`} 
                        alt="Scan for WhatsApp" 
                        className="w-24 h-24 rounded-lg mix-blend-multiply"
                      />
                    </div>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-3 text-center">Scan to<br/>Connect</span>
                  </div>

                  {/* Right Details */}
                  <div className="w-2/3 pl-6 flex flex-col justify-center">
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <div className="text-accent-primary text-[10px] mb-1 font-mono uppercase tracking-widest">Experience</div>
                        <div className="text-white font-bold text-sm">Pro Agency</div>
                        <div className="text-gray-500 text-[10px] mt-0.5">50+ Projects</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-accent-secondary text-[10px] mb-1 font-mono uppercase tracking-widest">Status</div>
                        <div className="text-white font-bold text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                          Online
                        </div>
                        <div className="text-gray-500 text-[10px] mt-0.5">Accepting Work</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-white/60 text-[10px] mb-2 font-mono uppercase tracking-widest">Technology Core</div>
                      <div className="flex flex-wrap gap-1.5">
                        {['React', 'Node.js', 'Next.js', 'Tailwind'].map(tech => (
                          <span key={tech} className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[10px] text-gray-300 font-medium">
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
