import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { fadeUp, staggerContainer } from '../../animations/variants';
import MagneticButton from '../ui/MagneticButton';
import { Mail, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Make sure to add these to .env:
    // VITE_EMAILJS_SERVICE_ID
    // VITE_EMAILJS_TEMPLATE_ID
    // VITE_EMAILJS_PUBLIC_KEY
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Fallback if env vars are missing during dev
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Message sent successfully (Dev Mode)!");
        formRef.current.reset();
      }, 1500);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
          setIsSubmitting(false);
          setIsSuccess(true);
          toast.success("Message sent successfully! We'll be in touch soon.");
          formRef.current.reset();
          
          setTimeout(() => setIsSuccess(false), 5000);
      }, (error) => {
          setIsSubmitting(false);
          toast.error("Oops! Something went wrong. Please try again.");
          console.error(error.text);
      });
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Nexora Studio, I'd like to discuss a project")}`;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-blue/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Copy & Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold mb-6">
              Let's build <br />
              <span className="text-gradient">something great.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-md">
              Have a project in mind? We'd love to hear about it. Drop us a line or schedule a quick chat.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-6">
              <a href="mailto:hello@nexorastudio.com" className="flex items-center gap-4 text-lg hover:text-accent-blue transition-colors group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                hello@nexorastudio.com
              </a>
              
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg hover:text-green-500 transition-colors group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare size={20} />
                </div>
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-3xl p-8 border border-gray-200 dark:border-white/10 relative overflow-hidden">
              {isSuccess && (
                <div className="absolute inset-0 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle2 size={64} className="text-green-500 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Got it!</h3>
                  <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="user_name" className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                    <input 
                      type="text" 
                      name="user_name" 
                      id="user_name" 
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="user_email" className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                    <input 
                      type="email" 
                      name="user_email" 
                      id="user_email" 
                      required
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Budget</label>
                  <select 
                    name="budget" 
                    id="budget"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all appearance-none"
                  >
                    <option value="" disabled selected>Select a budget range</option>
                    <option value="< $2k">Under $2,000</option>
                    <option value="$2k - $5k">$2,000 - $5,000</option>
                    <option value="$5k - $10k">$5,000 - $10,000</option>
                    <option value="$10k+">$10,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-500 dark:text-gray-400">Tell us about your project</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    required
                    rows="4"
                    placeholder="We need a new website that does..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all resize-none"
                  ></textarea>
                </div>

                <MagneticButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full justify-center bg-white text-black hover:bg-gray-100 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">Sending <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /></span>
                  ) : (
                    <span className="flex items-center gap-2">Send Message <ArrowRight size={18} /></span>
                  )}
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
