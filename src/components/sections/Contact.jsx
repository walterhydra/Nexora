import React, { useState, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Mail, Phone, ArrowUpRight, CheckCircle2, ChevronDown, Send } from 'lucide-react';

export default function Contact() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    const budget = formData.get('budget') || 'Not Specified';
    const message = formData.get('message');

    // 1. Try sending via primary local serverless endpoint
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, budget, message })
      });

      let data = {};
      try {
        data = await response.json();
      } catch (parseErr) {
        throw new Error("Invalid response from server");
      }

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Inquiry received! We'll reply within 24 hours.");
        formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
        return;
      }
    } catch (err) {
      console.warn("Primary endpoint failed, falling back to alternatives:", err);
    }

    // 2. Try sending via Web3Forms
    if (web3Key) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            name,
            email,
            budget,
            message,
            subject: `Project Inquiry from ${name}`,
            from_name: "Nexoraa Studio Portal"
          })
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setIsSubmitting(false);
          setIsSuccess(true);
          toast.success("Inquiry received! We'll reply within 24 hours.");
          formRef.current.reset();
          setTimeout(() => setIsSuccess(false), 5000);
          return;
        }
      } catch (err) {
        console.warn("Web3Forms fallback failed:", err);
      }
    }

    // 3. Try sending via EmailJS SMTP relay
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: name,
            from_email: email,
            budget,
            message,
            reply_to: email,
            to_email: 'nexoraa.works@gmail.com'
          },
          publicKey
        );
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Inquiry received! We'll reply within 24 hours.");
        formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
        return;
      } catch (err) {
        console.warn("EmailJS fallback failed:", err);
      }
    }

    // 4. Fallback to FormSubmit API
    try {
      const payload = {
        name,
        email,
        budget,
        message,
        _subject: `New Project Inquiry: ${name}`
      };

      const response = await fetch("https://formsubmit.co/ajax/nexoraa.works@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success("Inquiry received! We'll reply within 24 hours.");
        formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("FormSubmit failed");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setIsSubmitting(false);
      navigator.clipboard.writeText("nexoraa.works@gmail.com");
      toast.error("Network issue. We have copied nexoraa.works@gmail.com to your clipboard!", {
        duration: 5000
      });
    }
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917383303388";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Milan! I'd like to discuss a project for my business.")}`;

  return (
    <section 
      id="contact" 
      className="py-20 md:py-28 px-6 bg-[#040406] dark:bg-[#040406] relative overflow-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-accent-violet/5 rounded-full blur-[200px] pointer-events-none" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,4,6,1)_100%),_linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Headline, Bio & Interactive Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Availability Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Q1/Q2 Projects · 24h Response</span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.08] mb-4">
                Let's build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  something great.
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-400 dark:text-white/60 leading-relaxed font-normal mb-8 max-w-md">
                Have a project in mind? We'd love to hear about it. Drop us a line, request a custom architecture breakdown, or chat directly.
              </p>

              {/* Contact Channels Grid */}
              <div className="space-y-3 mb-8">
                
                {/* Email Card */}
                <a 
                  href="mailto:nexoraa.works@gmail.com" 
                  onClick={() => {
                    navigator.clipboard.writeText("nexoraa.works@gmail.com");
                    toast.success("Email copied to clipboard!");
                  }}
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-black/30 dark:hover:border-white/25 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                      <Mail size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider text-gray-400 dark:text-white/40 block font-semibold">
                        Direct Email
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                        nexoraa.works@gmail.com
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-gray-400 dark:text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Phone Card */}
                <a 
                  href="tel:+917383303388" 
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-black/30 dark:hover:border-white/25 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                      <Phone size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider text-gray-400 dark:text-white/40 block font-semibold">
                        Call / Hotline
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                        +91 7383303388
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-gray-400 dark:text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* WhatsApp Card */}
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08] hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-[0_2px_10px_rgba(37,211,102,0.3)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10.5px] uppercase tracking-wider text-emerald-400 block font-semibold">
                        Instant Messaging
                      </span>
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        WhatsApp Us (Fastest)
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

              </div>

              {/* Social Channels Row */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest block mb-3">
                  Follow Us
                </span>
                <div className="flex items-center gap-2.5">
                  <a 
                    href="https://www.instagram.com/nexoraa.works?igsh=dnM3bjNjNnd5dnU1" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-all" 
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a 
                    href="https://x.com/NexoraaWorks" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-all" 
                    aria-label="X (Twitter)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/share/192NuHy2vn/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-all" 
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Precision Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-black/15 dark:border-white/10 bg-white dark:bg-[#09090e] p-6 sm:p-9 shadow-2xl overflow-hidden">
              
              {/* Form Card Ambient Sheen */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Success Notification Overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <m.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="absolute inset-0 z-30 bg-[#09090e]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_24px_rgba(52,211,153,0.2)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Inquiry Transmitted
                    </h3>
                    <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                      Thank you for reaching out! Milan and the engineering team will review your scope and follow up within 24 hours.
                    </p>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Form Header */}
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-5 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-400 block mb-1">
                    Direct Inquiry
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                    Send a Project Request
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-white/40 block">
                    Turnaround
                  </span>
                  <span className="text-xs font-bold text-white/90">
                    Within 24 Hours
                  </span>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="user_name" className="block text-xs font-semibold text-gray-400 dark:text-white/70 uppercase tracking-wider mb-2">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="user_name" 
                      id="user_name" 
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-sm text-gray-950 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all font-normal"
                    />
                  </div>

                  <div>
                    <label htmlFor="user_email" className="block text-xs font-semibold text-gray-400 dark:text-white/70 uppercase tracking-wider mb-2">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="user_email" 
                      id="user_email" 
                      required
                      placeholder="e.g. rahul@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-sm text-gray-950 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all font-normal"
                    />
                  </div>
                </div>

                {/* Row 2: Project Budget (Styled aligned to actual packages) */}
                <div>
                  <label htmlFor="budget" className="block text-xs font-semibold text-gray-400 dark:text-white/70 uppercase tracking-wider mb-2">
                    Estimated Budget Range
                  </label>
                  <div className="relative">
                    <select 
                      name="budget" 
                      id="budget"
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-sm text-gray-950 dark:text-white focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer pr-10 font-normal"
                    >
                      <option value="" disabled className="bg-[#09090e] text-gray-400">Select your project scope & budget</option>
                      <option value="Under ₹10,000 (Starter / Landing Page)" className="bg-[#09090e] text-white">Under ₹10,000 (Starter / Landing Page / Business Site)</option>
                      <option value="₹10,000 - ₹25,000 (Intermediate / E-Commerce / App)" className="bg-[#09090e] text-white">₹10,000 - ₹25,000 (Intermediate / E-Commerce / Web App)</option>
                      <option value="₹25,000 - ₹65,000 (Growth / Custom ERP / SaaS)" className="bg-[#09090e] text-white">₹25,000 - ₹65,000 (Growth / Custom ERP / SaaS MVP)</option>
                      <option value="₹65,000+ (Enterprise Architecture / Dedicated Team)" className="bg-[#09090e] text-white">₹65,000+ (Enterprise Architecture / Dedicated Team)</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Row 3: Tell us about your project */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-400 dark:text-white/70 uppercase tracking-wider mb-2">
                    Project Details / Requirements <span className="text-cyan-400">*</span>
                  </label>
                  <textarea 
                    name="message" 
                    id="message" 
                    required
                    rows="4"
                    placeholder="Briefly describe what you are looking to build (e.g. features, target timeline, reference links)..."
                    className="w-full px-4 py-3 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-sm text-gray-950 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-all resize-none leading-relaxed font-normal"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-white hover:bg-gray-100 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.2)] disabled:opacity-50 cursor-pointer active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span>Transmitting inquiry...</span>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Send Message</span>
                        <Send size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </button>
                  
                  <p className="text-[11px] text-gray-400 dark:text-white/40 text-center mt-3">
                    🔒 100% Confidential · Strict NDA Guarantee · No spam ever.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
