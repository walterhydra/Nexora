import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../constants/testimonials';
import { fadeUp, staggerContainer } from '../../animations/variants';
import GlowCard from '../ui/GlowCard';
import MarqueeStrip from '../layout/MarqueeStrip';
import { Quote, Star } from 'lucide-react';

const MarqueeRow = ({ items, direction = "left", speed = 50 }) => {
  return (
    <div className="relative flex w-full overflow-hidden py-4">
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
        {/* Render items multiple times for infinite loop */}
        {[...items, ...items, ...items, ...items].map((testimonial, idx) => (
          <div key={`${testimonial.id}-${idx}`} className="w-[350px] md:w-[450px] h-full whitespace-normal">
            <GlowCard className="p-8 h-full flex flex-col justify-between">
              <div>
                <Quote className="text-accent-blue/30 w-10 h-10 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-accent-primary to-accent-violet text-gray-900 dark:text-white font-bold border border-black/10 dark:border-white/10 shrink-0">
                    {testimonial.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{testimonial.author}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 truncate">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
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
  // Split testimonials into two rows
  const midPoint = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, midPoint);
  const row2 = testimonials.slice(midPoint);

  return (
    <section id="testimonials" className="py-32 bg-bg-primary border-t border-white/5 relative z-10 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-4"
        >
          Don't Just Take <span className="text-gradient">Our Word</span> For It
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          We let our work and our clients do the talking.
        </motion.p>
      </div>

      <div className="w-full flex flex-col relative z-20">
        {/* CSS mask to fade out the edges of the marquee */}
        <style dangerouslySetInnerHTML={{__html: `
          .mask-edges-testimonials {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
        `}} />
        
        <div className="mask-edges-testimonials">
          <MarqueeRow items={row1} direction="left" speed={45} />
          <div className="my-1">
            <MarqueeStrip 
              items={["Quality First", "Customer Obsessed", "Pixel Perfect", "Future Ready", "24/7 Support"]} 
              speed={30} 
              direction={-1}
            />
          </div>
          <MarqueeRow items={row2} direction="right" speed={55} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* View All Reviews Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-gray-900 dark:text-white font-semibold hover:bg-white/10 hover:border-accent-primary transition-all duration-300 group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-violet">
              View More Client Stories
            </span>
            <svg className="w-4 h-4 text-accent-violet group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
