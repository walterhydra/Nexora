import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Code2, Clock, Star, Users, ArrowUpRight } from 'lucide-react';

const stats = [
  { 
    id: "01",
    label: "Projects Delivered", 
    value: 50, 
    suffix: "+",
    icon: <Code2 size={40} className="text-accent-primary" />,
    color: "from-accent-primary/20 to-transparent",
    border: "border-accent-primary/30",
    desc: "We have successfully designed, built, and launched premium digital products for brands across the globe, focusing on scalable architecture and pixel-perfect design.",
    top: "top-[10vh]"
  },
  { 
    id: "02",
    label: "Avg. Delivery Time", 
    value: 7, 
    suffix: " Days",
    icon: <Clock size={40} className="text-accent-secondary" />,
    color: "from-accent-secondary/20 to-transparent",
    border: "border-accent-secondary/30",
    desc: "By utilizing modern frameworks and an elite agile workflow, we drastically reduce time-to-market without ever compromising on quality.",
    top: "top-[15vh]"
  },
  { 
    id: "03",
    label: "Client Satisfaction", 
    value: 98, 
    suffix: "%",
    icon: <Star size={40} className="text-yellow-400" />,
    color: "from-yellow-400/20 to-transparent",
    border: "border-yellow-400/30",
    desc: "Our commitment to communication, transparency, and post-launch support results in long-term partnerships rather than one-off projects.",
    top: "top-[20vh]"
  },
  { 
    id: "04",
    label: "Team Experts", 
    value: 24, 
    suffix: "",
    icon: <Users size={40} className="text-green-400" />,
    color: "from-green-400/20 to-transparent",
    border: "border-green-400/30",
    desc: "We are a globally distributed, highly curated team of senior developers, award-winning designers, and product strategists.",
    top: "top-[25vh]"
  }
];

const StatCard = ({ stat, idx }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like spring
      onMouseMove={handleMouseMove}
      className={`sticky ${stat.top} w-full min-h-[40vh] md:min-h-[35vh] bg-[#0a0a0a]/90 backdrop-blur-2xl border ${stat.border} rounded-[2.5rem] p-8 md:p-12 mb-16 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-center group`}
    >
      {/* High-Performance Cursor Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />

      {/* Internal Gradient Glow */}
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${stat.color} opacity-30 pointer-events-none z-0`} />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16">
        
        {/* Left Side: Number & Title */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-base text-gray-500 tracking-widest">{stat.id}</span>
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
              {stat.icon}
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            {stat.label}
          </h3>
          
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-md">
            {stat.desc}
          </p>
        </div>

        {/* Right Side: Massive Animated Number */}
        <div className="flex-1 flex justify-start lg:justify-end w-full">
          <div className="relative group/num">
            <AnimatedCounter 
              end={stat.value} 
              suffix={stat.suffix} 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500"
            />
            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover/num:opacity-100 group-hover/num:translate-x-2 group-hover/num:-translate-y-2 transition-all duration-300">
              <ArrowUpRight className="text-white w-5 h-5" />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function Stats() {
  return (
    <section className="py-32 relative bg-[#050505] z-10">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-accent-primary/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-white/20" />
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-gray-400">The Impact</span>
            <span className="w-12 h-[1px] bg-white/20" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-tight">
            Performance at <span className="text-gradient italic font-light">Scale</span>
          </h2>
        </motion.div>

        {/* Card Stacking Container */}
        <div className="relative pb-[20vh]">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
