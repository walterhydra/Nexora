import React, { useEffect } from 'react';
import { m } from 'framer-motion';
import { services } from '../constants/services';
import { Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link as LinkIcon, TrendingUp } from 'lucide-react';

const iconMap = {
  Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link: LinkIcon, TrendingUp
};

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-accent-blue/5 to-transparent -z-10" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Our <span className="text-accent-blue">Services</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Comprehensive digital engineering to transform your business. We build the future of the web.
          </p>
        </m.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <m.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass p-8 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-accent-blue/50 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-blue transition-colors">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
