import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          { subscriber_email: email },
          publicKey
        );
      } else {
        // Fallback for demo purposes if keys aren't set
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setStatus('success');
      toast.success('Successfully subscribed to the loop!', {
        icon: '🚀',
        style: {
          borderRadius: '10px',
          background: '#111',
          color: '#fff',
          border: '1px solid rgba(0,245,255,0.2)'
        },
      });
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus('idle');
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="py-24 relative z-10 overflow-hidden" id="newsletter">
      <div className="max-w-4xl mx-auto px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-accent-primary/20"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/10 via-transparent to-accent-violet/10 opacity-50" />
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 relative z-10">
            Stay in the <span className="text-gradient">Loop</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto relative z-10">
            Get the latest insights, updates, and futuristic tech trends delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="relative z-10 max-w-md mx-auto flex flex-col sm:flex-row gap-4 group">
            <div className="relative flex-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-accent-violet rounded-lg blur opacity-30 group-focus-within:opacity-100 transition duration-500"></div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="relative w-full text-base bg-bg-secondary border border-black/10 dark:border-white/10 rounded-lg px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="relative min-h-[44px] px-8 py-4 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-70 cursor-pointer"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : status === 'success' ? (
                <span>Subscribed!</span>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
