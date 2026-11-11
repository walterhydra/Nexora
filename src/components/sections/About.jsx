import React, { useState, useEffect, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import toast from 'react-hot-toast';

const STUDIO_FACTS = [
  {
    title: "Founder & Leadership",
    text: "Milan Pandavadra leads product engineering, architectural design, and digital innovation at Nexoraa."
  },
  {
    title: "Founded in 2024",
    text: "Built to eliminate slow, bloated traditional agency delays with rapid 7-day sprint execution."
  },
  {
    title: "Our Core Motive",
    text: "Engineering high-speed digital products that automate operations and compound business growth."
  },
  {
    title: "Remote & Worldwide",
    text: "Headquartered in India, collaborating with visionary founders and enterprise clients across the globe."
  },
  {
    title: "Zero Junior Handoffs",
    text: "An elite senior engineering collective shipping pixel-perfect design and production-grade code."
  }
];

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Rotating Fact Typewriter State
  const factRef = useRef(null);
  const isFactInView = useInView(factRef, { once: true, margin: "-40px" });
  const [factIndex, setFactIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFactHovered, setIsFactHovered] = useState(false);

  const isFactHoveredRef = useRef(false);
  isFactHoveredRef.current = isFactHovered;

  useEffect(() => {
    if (!isFactInView) return;

    const currentText = STUDIO_FACTS[factIndex].text;
    let timer;

    if (!isDeleting) {
      if (typedChars < currentText.length) {
        // Fast mechanical typewriter speed (~16ms/char)
        timer = setTimeout(() => {
          setTypedChars(prev => prev + 1);
        }, 16);
      } else {
        // Pause at full text so visitor can read comfortably
        timer = setTimeout(() => {
          if (!isFactHoveredRef.current) {
            setIsDeleting(true);
          }
        }, 3400);
      }
    } else {
      // If hovered while deleting was about to trigger, hold
      if (isFactHoveredRef.current) {
        timer = setTimeout(() => {}, 500);
        return;
      }

      if (typedChars > 0) {
        // Swift backspace (3 chars per tick)
        timer = setTimeout(() => {
          setTypedChars(prev => Math.max(0, prev - 3));
        }, 12);
      } else {
        // Switch to next fact
        setIsDeleting(false);
        setFactIndex(prev => (prev + 1) % STUDIO_FACTS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedChars, isDeleting, factIndex, isFactInView]);

  // Auto-flip the business card every 4 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Removed unused Logo component

  return (
    <section id="about" className="py-24 bg-primary-dark relative overflow-hidden z-10 border-t border-white/5 font-quicksand" style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}>
      {/* Background gradients - GPU Accelerated Radial Glow */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none transform-gpu"
        style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 70%)' }}
      />

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-16">
          {/* Eyebrow */}
          <div className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-accent-primary/60" /> Who We Are <span className="w-8 h-[1px] bg-accent-primary/60" />
          </div>
          
          {/* Title - Continuous Liquid Metallic Shimmer without background glow */}
          <h2 
            className="text-5xl md:text-7xl font-quicksand font-bold tracking-tight cursor-default select-none text-center leading-tight"
            style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
          >
            <span 
              className="text-transparent bg-clip-text inline-block"
              style={{
                fontFamily: '"Quicksand", system-ui, sans-serif',
                backgroundImage: 'linear-gradient(115deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #71717a 75%, #ffffff 100%)',
                backgroundSize: '200% 100%',
                animation: 'metallic-shimmer 4.5s ease-in-out infinite',
              }}
            >
              About Nexoraa.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text / Simple Rotating Studio Facts */}
          <div className="space-y-8 font-quicksand">
            
            {/* Simple Clean Typewriter Text without Card Box */}
            <div 
              ref={factRef}
              className="min-h-[7.5rem] sm:min-h-[6rem] flex items-start cursor-default select-none"
              onMouseEnter={() => setIsFactHovered(true)}
              onMouseLeave={() => setIsFactHovered(false)}
            >
              <p className="text-xl md:text-2xl text-white/75 font-quicksand font-normal leading-relaxed">
                <strong className="text-white font-bold">
                  {STUDIO_FACTS[factIndex].title} —{" "}
                </strong>
                <span>
                  {STUDIO_FACTS[factIndex].text.slice(0, typedChars)}
                </span>
                <span className="inline-block w-2 sm:w-2.5 h-[1.1em] bg-accent-primary align-middle ml-1 rounded-[1px] shadow-[0_0_10px_rgba(0,245,255,0.85)] animate-pulse" />
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-white/10 font-quicksand">
              <div>
                <div className="text-xs text-white/50 mb-1 font-mono uppercase tracking-wider">Phone</div>
                <div className="text-white font-semibold">+91 7383303388</div>
              </div>
              <div>
                <div className="text-xs text-white/50 mb-1 font-mono uppercase tracking-wider">Email</div>
                <div className="text-white font-semibold">
                  <a 
                    href="mailto:nexoraa.works@gmail.com" 
                    onClick={() => {
                      navigator.clipboard.writeText("nexoraa.works@gmail.com");
                      toast.success("Email copied to clipboard! Opening mail client...");
                    }}
                    className="hover:text-accent-primary transition-colors"
                  >
                    nexoraa.works@gmail.com
                  </a>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/50 mb-1 font-mono uppercase tracking-wider">Based in</div>
                <div className="text-white font-semibold">Remote / Global</div>
              </div>
              <div>
                <div className="text-xs text-white/50 mb-1 font-mono uppercase tracking-wider">Social</div>
                <div className="flex gap-4 text-accent-primary font-medium">
                  <a href="https://www.linkedin.com/in/milan-pandavdara/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="https://github.com/walterhydra" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                  <a href="https://www.walterhydra.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card (Business Card Style) */}
          <div 
            className="relative perspective-1000 w-full max-w-xl mx-auto aspect-[1.91/1]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >

            <div 
              className={`w-full h-full transition-transform duration-700 ease-in-out preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              
              {/* Front of Card — Real Business Card Image */}
              <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                <img 
                  src="/cards/company-card-1.jpeg" 
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
                  src="/cards/company-card-2.jpeg" 
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
