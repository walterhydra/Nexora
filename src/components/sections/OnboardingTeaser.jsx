import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Fingerprint } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const MarqueeRow = ({ text, direction = 1, speed = 20 }) => {
  return (
    <div className="flex whitespace-nowrap overflow-hidden py-4 opacity-[0.03] select-none pointer-events-none font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter">
      <motion.div
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 px-4"
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};

export default function OnboardingTeaser() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden flex flex-col justify-center items-center min-h-[80vh]">
      
      {/* Animated Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-center -rotate-3 scale-110">
        <MarqueeRow text="DISCOVERY ✦ STRATEGY ✦ PROTOCOL ✦" direction={1} speed={30} />
        <MarqueeRow text="ONBOARDING ✦ VELOCITY ✦ TRANSPARENCY ✦" direction={-1} speed={40} />
        <MarqueeRow text="DEPLOYMENT ✦ HANDOVER ✦ SCALE ✦" direction={1} speed={25} />
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Foreground Holographic Card */}
      <motion.div 
        style={{ y, scale }}
        className="relative z-10 w-[90%] max-w-4xl mx-auto"
      >
        <div className="glass backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 md:p-16 lg:p-20 overflow-hidden relative group">
          
          {/* Internal Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent-blue/50 rounded-tl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent-blue/50 rounded-br-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Glare Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-accent-blue group-hover:scale-110 group-hover:bg-accent-blue/10 transition-all duration-500 shadow-[0_0_0_rgba(0,245,255,0)] group-hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]">
              <Fingerprint size={32} strokeWidth={1.5} />
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight leading-tight">
              Enter the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-purple-500">Nexora Protocol.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Total transparency from day one. See the exact 7-step journey we take to transform your vision into a live digital empire.
            </p>

            <Link to="/onboarding">
              <MagneticButton className="relative overflow-hidden group/btn bg-white text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3">
                <span className="relative z-10 flex items-center gap-2">
                  Unlock The Process <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
                {/* Button Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-accent-blue opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </MagneticButton>
            </Link>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
