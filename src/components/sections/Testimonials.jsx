import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../constants/testimonials';
import { fadeUp, staggerContainer } from '../../animations/variants';
import GlowCard from '../ui/GlowCard';
import MarqueeStrip from '../layout/MarqueeStrip';
import { Quote, Star, ArrowRight } from 'lucide-react';

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
        <div key={idx} className="flex flex-col items-center group relative">
          {/* Pulse Effect for the first stat */}
          {idx === 0 && (
            <div className="absolute -top-1 -right-4 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-primary"></span>
            </div>
          )}
          <div className="text-3xl md:text-5xl font-display font-black text-gray-900 dark:text-white mb-1 group-hover:text-accent-primary transition-all duration-500 group-hover:scale-110">
            {stat.value}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 font-bold">
            {stat.label}
          </div>
          <div className="w-8 h-1.5 bg-accent-primary/20 rounded-full mt-4 group-hover:w-16 group-hover:bg-accent-primary transition-all duration-500" />
        </div>
      ))}
    </motion.div>
  );
};

const SpotlightTestimonial = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto mt-24 mb-12 p-8 md:p-16 glass rounded-[2.5rem] border border-accent-primary/20 relative overflow-hidden text-center group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <Quote className="absolute -top-10 -left-10 w-48 h-48 text-accent-primary/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
      
      <div className="relative z-10">
        <div className="flex justify-center gap-1.5 mb-10">
          {[1,2,3,4,5].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star size={24} className="fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
            </motion.div>
          ))}
        </div>
        <h3 className="text-2xl md:text-4xl font-display font-medium leading-tight mb-10 text-gray-900 dark:text-white">
          "Nexora didn't just build a website; they architected a <span className="text-gradient font-black">Growth Engine</span> that fundamentally changed our business trajectory."
        </h3>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-primary to-accent-violet p-1 mb-4 shadow-2xl relative">
             <div className="w-full h-full rounded-full bg-bg-primary flex items-center justify-center font-black text-2xl text-gradient">JD</div>
             <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-bg-primary" />
          </div>
          <div className="font-black text-xl text-gray-900 dark:text-white tracking-tight">James Dalton</div>
          <div className="text-accent-primary text-xs uppercase tracking-[0.3em] font-black mt-1">Chief Tech Officer @ FutureScale</div>
        </div>
      </div>
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

        {/* New Spotlight Testimonial Hero */}
        <SpotlightTestimonial />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
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
