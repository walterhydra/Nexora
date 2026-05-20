import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-accent-blue/5 to-transparent -z-10" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">About <span className="text-accent-blue">Nexora</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We are a premium digital agency specializing in high-performance web development, mobile applications, and intelligent automations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert"
          >
            <h2 className="text-3xl font-bold text-black dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Nexora Studio, our mission is to empower businesses with cutting-edge digital infrastructure. We bridge the gap between visionary design and flawless engineering, delivering products that not only look spectacular but drive measurable growth.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in the power of speed without compromising quality. That's why we've engineered our processes to deliver world-class digital solutions in just 7 days.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass p-8 rounded-3xl border border-gray-200 dark:border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-accent-blue text-xl">✦</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Rapid Delivery:</strong> From concept to launch in exactly 7 days.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue text-xl">✦</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Zero-Lag Architecture:</strong> Performance-obsessed engineering.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue text-xl">✦</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Awwwards-Level Design:</strong> Stunning, interactive, and memorable user experiences.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue text-xl">✦</span>
                <span className="text-gray-600 dark:text-gray-300"><strong>Dedicated Support:</strong> We don't just launch; we partner with you for the long haul.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
