import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { CheckCircle2, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    // Parse URL search parameters for prefilled scope details
    const params = new URLSearchParams(window.location.search);
    const projectType = params.get('type');
    const addons = params.get('addons');
    const price = params.get('price');

    if (projectType) {
      let prefilledMsg = `Hi Nexora, I'm interested in building a ${projectType}.\n`;
      if (addons) {
        prefilledMsg += `Selected Add-ons: ${addons}\n`;
      }
      if (price) {
        prefilledMsg += `Estimated Budget: ${price}\n`;
      }
      prefilledMsg += `Let's discuss my project details!`;
      setMessageValue(prefilledMsg);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const formData = new FormData(formRef.current);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const message = formData.get('message');

    // 1. Try sending via Web3Forms if configured
    if (web3Key) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: name,
            email: email,
            message: message,
            subject: `Elite Contact Page Inquiry from ${name}`,
            from_name: "Nexora Studio Portal"
          })
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setIsSubmitting(false);
          setIsSuccess(true);
          toast.success("Inquiry sent successfully! We'll contact you soon.");
          formRef.current.reset();
          setTimeout(() => setIsSuccess(false), 5000);
          return;
        } else {
          throw new Error(data.message || "Web3Forms submission failed");
        }
      } catch (err) {
        console.warn("Web3Forms failed, trying next option:", err);
      }
    }

    // 2. Try sending via EmailJS SMTP relay if configured
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: name,
            from_email: email,
            message: message,
            reply_to: email,
            to_email: 'nexoraa.works@gmail.com'
          },
          publicKey
        );
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Inquiry sent successfully! We'll contact you soon.");
        formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
        return;
      } catch (err) {
        console.warn("EmailJS failed, trying next option:", err);
      }
    }

    // 3. Fallback to FormSubmit API
    try {
      const payload = {
        name,
        email,
        message,
        _subject: `Elite Contact Page Inquiry: ${name}`
      };

      const response = await fetch("https://formsubmit.co/ajax/nexoraa.works@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Inquiry sent successfully! We'll contact you soon.");
        formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("FormSubmit response not OK");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setIsSubmitting(false);
      
      // Copy email to clipboard as clean fallback
      navigator.clipboard.writeText("nexoraa.works@gmail.com");
      toast.error("Submit service is currently offline. We have copied nexoraa.works@gmail.com to your clipboard!", {
        duration: 6000,
        style: {
          background: '#ff4b4b',
          color: '#fff',
          fontWeight: 'bold'
        }
      });
    }
  };

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
              <a 
                href="mailto:nexoraa.works@gmail.com"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText("nexoraa.works@gmail.com");
                  toast.success("Email copied to clipboard! Opening mail client...");
                  window.location.href = "mailto:nexoraa.works@gmail.com";
                }}
                className="flex items-center gap-4 hover:text-accent-blue transition-colors group"
              >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-blue group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Email</p>
                  <p className="text-lg font-medium">nexoraa.works@gmail.com</p>
                </div>
              </a>
              
              <a href="tel:+917383303388" className="flex items-center gap-4 hover:text-accent-blue transition-colors group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-blue group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Phone</p>
                  <p className="text-lg font-medium">+91 7383303388</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-blue">
                  <MapPin size={24} />
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
            className="glass p-8 rounded-3xl border border-gray-200 dark:border-white/10 relative overflow-hidden"
          >
            {isSuccess && (
              <div className="absolute inset-0 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                <CheckCircle2 size={64} className="text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Got it!</h3>
                <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
              </div>
            )}

            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="user_name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  name="user_name"
                  id="user_name"
                  required
                  className="w-full bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors text-gray-900 dark:text-white" 
                  placeholder="John Doe" 
                />
              </div>
              
              <div>
                <label htmlFor="user_email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  name="user_email"
                  id="user_email"
                  required
                  className="w-full bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors text-gray-900 dark:text-white" 
                  placeholder="john@example.com" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  id="message"
                  required
                  rows="4" 
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  className="w-full bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-blue transition-colors resize-none text-gray-900 dark:text-white" 
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <MagneticButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent-blue text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Sending <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /></>
                ) : (
                  <>Send Message <ArrowRight size={18} /></>
                )}
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
