import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: "Web Development",
      desc: "High-performance, interactive websites built with modern frameworks like React and Next.js. We focus on zero-lag experiences and stunning visual design.",
      icon: "🌐"
    },
    {
      title: "App Development",
      desc: "Native-feeling mobile applications for iOS and Android. We build robust, scalable apps that keep users engaged and coming back.",
      icon: "📱"
    },
    {
      title: "Automation Solutions",
      desc: "Streamline your business operations with custom AI and workflow automations. Save hundreds of hours and reduce human error.",
      icon: "⚡"
    },
    {
      title: "UI/UX Design",
      desc: "Award-winning interface design that prioritizes user experience, conversion rates, and brand identity. We craft digital experiences that stand out.",
      icon: "🎨"
    },
    {
      title: "E-Commerce",
      desc: "Scalable online stores optimized for conversion. From Shopify to custom headless builds, we engineer platforms designed to sell.",
      icon: "🛍️"
    },
    {
      title: "SEO & Performance",
      desc: "Technical SEO and speed optimization. We ensure your site ranks high on Google and loads instantly across all devices.",
      icon: "🚀"
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-accent-blue/5 to-transparent -z-10" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Our <span className="text-accent-blue">Services</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Comprehensive digital engineering to transform your business. We build the future of the web.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl border border-gray-200 dark:border-white/10 hover:border-accent-blue/50 transition-colors group"
            >
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-blue transition-colors">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
