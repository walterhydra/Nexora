import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { Code2, Clock, Star, Users } from 'lucide-react';

export default function Stats() {
  const stats = [
    { 
      label: "Projects Delivered", 
      value: 50, 
      suffix: "+",
      icon: <Code2 size={24} className="text-accent-primary" />,
      color: "from-accent-primary to-blue-500"
    },
    { 
      label: "Avg. Delivery Time", 
      sub: "(Days)",
      value: 7, 
      suffix: "",
      icon: <Clock size={24} className="text-accent-secondary" />,
      color: "from-accent-secondary to-purple-500"
    },
    { 
      label: "Client Satisfaction", 
      value: 98, 
      suffix: "%",
      icon: <Star size={24} className="text-yellow-400" />,
      color: "from-yellow-400 to-orange-500"
    },
    { 
      label: "Team Experts", 
      value: 24, 
      suffix: "",
      icon: <Users size={24} className="text-green-400" />,
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-bg-secondary z-10 border-y border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="group relative p-8 rounded-3xl bg-bg-tertiary/50 border border-white/5 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 border border-black/10 dark:border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {stat.icon}
                </div>
                
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  className={`text-5xl md:text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-3`} 
                />
                
                <h3 className="text-gray-700 dark:text-gray-300 font-medium tracking-wide text-sm uppercase font-mono">
                  {stat.label}
                  {stat.sub && <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.sub}</span>}
                </h3>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
