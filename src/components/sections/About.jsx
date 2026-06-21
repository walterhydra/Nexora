import React, { useState } from 'react';
import { m } from 'framer-motion';
import toast from 'react-hot-toast';

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Nexoraa Studio Logo SVG component for the card
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
          <span className="text-gradient">Nexoraa.</span>
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
                <div className="text-gray-900 dark:text-white font-medium">
                  <a 
                    href="mailto:nexoraa.works@gmail.com" 
                    onClick={() => {
                      navigator.clipboard.writeText("nexoraa.works@gmail.com");
                      toast.success("Email copied to clipboard! Opening mail client...");
                    }}
                    className="hover:text-accent-blue transition-colors"
                  >
                    nexoraa.works@gmail.com
                  </a>
                </div>
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
                  <a href="https://www.walterhydra.me" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:text-gray-900 dark:hover:text-white transition-colors">Portfolio</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card (Business Card Style) */}
          <div className="relative perspective-1000 w-full max-w-xl mx-auto aspect-[1.91/1]">

            <div 
              className={`w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* Front of Card — Real Business Card Image */}
              <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <img 
                  src="/assets/work/Company Card.jpeg" 
                  alt="Nexoraa Studio Business Card - Front" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="420"
                />
                {/* Click to flip hint */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] text-white/70 uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse shadow-[0_0_8px_rgba(180,118,255,0.8)]" />
                  Click to flip
                </div>
              </div>

              {/* Back of Card — Real Business Card Image */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <img 
                  src="/assets/work/Company Card (2).jpeg" 
                  alt="Nexoraa Studio Business Card - Back" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="420"
                />
                {/* Click to flip hint */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] text-white/70 uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_rgba(0,255,200,0.8)]" />
                  Click to flip back
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
