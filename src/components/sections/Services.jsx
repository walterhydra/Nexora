import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link as LinkIcon, TrendingUp } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import GlowCard from '../ui/GlowCard';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { services } from '../../constants/services';
import { useMousePosition } from '../../hooks/useMousePosition';

const iconMap = {
  Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link: LinkIcon, TrendingUp
};

export default function Services() {
  const { x, y } = useMousePosition();
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-4">
            What We <span className="text-gradient">Build</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            End-to-end digital services — from idea to deployment. We craft experiences that demand attention.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon];
            
            return (
              <Tilt
                key={service.id}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2000}
                className="h-full"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
                  }}
                  className="h-full"
                >
                  <Link 
                    to={`/service/${service.slug}`}
                    className="h-full block group"
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <GlowCard className="h-full flex flex-col justify-between group-hover:border-accent-primary/50 transition-colors duration-300">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-accent-primary transition-colors">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="space-y-2 mb-6">
                          {service.deliverables.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {service.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-accent-primary text-xs font-bold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                          Details →
                        </span>
                      </div>
                    </GlowCard>
                  </Link>
                </motion.div>
              </Tilt>
            );
          })}
          
          <AnimatePresence>
            {hoveredCard && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="fixed z-[100] pointer-events-none px-4 py-2 rounded-full bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-white/10 shadow-xl font-mono text-sm font-bold whitespace-nowrap"
                style={{ 
                  left: x + 20, 
                  top: y + 20 
                }}
              >
                From {services.find(s => s.id === hoveredCard)?.price}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
