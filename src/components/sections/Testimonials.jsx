import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../constants/testimonials';
import { fadeUp, staggerContainer } from '../../animations/variants';
import GlowCard from '../ui/GlowCard';
import MarqueeStrip from '../layout/MarqueeStrip';
import { Quote, Star } from 'lucide-react';

const TrustSummary = () => {
  const stats = [
    { label: "Client Satisfaction", value: "99.9%" },
    { label: "Successful Projects", value: "150+" },
    { label: "Repeat Clients", value: "85%" }
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-8 md:gap-20 mb-20 px-6"
    >
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center group">
          <div className="text-3xl md:text-4xl font-display font-black text-gray-900 dark:text-white mb-1 group-hover:text-accent-primary transition-colors">
            {stat.value}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 font-bold">
            {stat.label}
          </div>
          <div className="w-8 h-1 bg-accent-primary/20 rounded-full mt-3 group-hover:w-12 group-hover:bg-accent-primary transition-all" />
        </div>
      ))}
    </motion.div>
  );
};

const MarqueeRow = ({ items, direction = "left", speed = 50 }) => {
  return (
    <div className="relative flex w-full overflow-hidden py-6">
      <motion.div
        className="flex gap-6 whitespace-nowrap min-w-max px-3"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed
        }}
      >
        {[...items, ...items, ...items, ...items].map((testimonial, idx) => (
          <div key={`${testimonial.id}-${idx}`} className="w-[350px] md:w-[450px] h-full whitespace-normal">
            <GlowCard className="p-8 h-full flex flex-col justify-between group relative overflow-hidden">
              {/* Impact Badge */}
              {testimonial.impact && (
                <div className="absolute top-6 right-6 z-20">
                  <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-[10px] font-bold uppercase tracking-wider border border-accent-primary/20 backdrop-blur-md group-hover:bg-accent-primary group-hover:text-white transition-all duration-300">
                    {testimonial.impact}
                  </span>
                </div>
              )}

              <div>
                <Quote className="text-accent-blue/20 w-10 h-10 mb-6 group-hover:text-accent-primary/40 transition-colors" />
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 relative z-10 font-medium">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-6 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-accent-primary to-accent-violet text-white font-bold border-2 border-white/10 shadow-lg shrink-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <span className="relative z-10">{testimonial.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-base text-gray-900 dark:text-white truncate group-hover:text-accent-primary transition-colors">{testimonial.author}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider opacity-60 truncate">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 shrink-0 bg-yellow-400/5 px-2 py-1 rounded-full border border-yellow-400/10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </GlowCard>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  const midPoint = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, midPoint);
  const row2 = testimonials.slice(midPoint);

  return (
    <section id="testimonials" className="py-32 bg-bg-primary border-t border-white/5 relative z-10 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/10 text-accent-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
          Trusted by Global Visionaries
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-black mb-6 uppercase tracking-tighter"
        >
          Client <span className="text-gradient">Impact</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Real stories from the pioneers and founders we've helped scale through high-performance engineering.
        </motion.p>
      </div>

      <div className="w-full flex flex-col relative z-20">
        {/* Trust Summary Bar */}
        <TrustSummary />

        <style dangerouslySetInnerHTML={{__html: `
          .mask-edges-testimonials {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
        `}} />
        
        <div className="mask-edges-testimonials">
          <MarqueeRow items={row1} direction="left" speed={50} />
          <div className="my-6">
            <MarqueeStrip 
              items={["QUALITY FIRST", "CUSTOMER OBSESSED", "PIXEL PERFECT", "FUTURE READY", "24/7 SUPPORT"]} 
              speed={25} 
              direction={-1}
            />
          </div>
          <MarqueeRow items={row2} direction="right" speed={60} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a href="#" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-black text-black dark:text-white font-bold uppercase tracking-widest text-xs border border-black/10 dark:border-white/10 overflow-hidden transition-all duration-500 hover:border-accent-primary">
            <div className="absolute inset-0 w-1 bg-accent-primary transition-all duration-500 group-hover:w-full -z-0 opacity-10" />
            <span className="relative z-10 flex items-center gap-3">
              Read More Client Stories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
