import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../components/ui/MagneticButton';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-accent-blue/5 to-transparent -z-10" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Get in <span className="text-accent-blue">Touch</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Ready to start your next big project? Let's talk about how Nexora can help you achieve your goals in 7 days.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
              <p className="text-gray-500">Reach out to us directly through any of these channels.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Email</p>
                  <p className="text-lg font-medium">contact@nexora.studio</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Phone</p>
                  <p className="text-lg font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Location</p>
                  <p className="text-lg font-medium">Global / Remote</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass p-8 rounded-3xl border border-gray-200 dark:border-white/10"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" className="w-full bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" className="w-full bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              
              <MagneticButton className="w-full bg-accent-blue text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-colors">
                Send Message
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
