import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Phone, MapPin, ArrowRight, ArrowLeft, Mail, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProjectSpecs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submittingMode, setSubmittingMode] = useState(null); // 'whatsapp' | 'email' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please describe your vision and requirements');
      return false;
    }
    return true;
  };

  const handleWhatsAppSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setSubmittingMode('whatsapp');

    // Construct formatted WhatsApp message
    const formattedText = `*New Project Specs Inquiry - Nexoraa Studio*
👤 *Full Name:* ${formData.fullName.trim()}
📧 *Email:* ${formData.email.trim()}
📱 *Phone:* ${formData.phone.trim() || 'N/A'}
⚡ *Service:* ${formData.service || 'Custom Solution'}

📝 *Vision & Requirements:*
${formData.message.trim()}`;

    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '917383303388';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(formattedText)}`;

    // Background lead capture
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          source: 'Project Specs WhatsApp Form'
        })
      }).catch(() => {});
    } catch {
      // Ignore background capture errors
    }

    toast.success('Redirecting to WhatsApp with your project specs!');

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setSubmittingMode(null);
    }, 350);
  };

  const handleEmailSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setSubmittingMode('email');

    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    let sentSuccess = false;

    // 1. Send via local serverless endpoint
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          budget: 'Project Specs Submission',
          source: 'Project Specs Direct Email'
        })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        sentSuccess = true;
      }
    } catch (err) {
      console.warn('API contact fallback:', err);
    }

    // 2. Fallback via Web3Forms
    if (!sentSuccess && web3Key) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone || 'N/A',
            service: formData.service || 'Custom Solution',
            message: formData.message,
            subject: `Project Specs Inquiry from ${formData.fullName}`,
            from_name: 'Nexoraa Studio Portal'
          })
        });
        const data = await response.json().catch(() => ({}));
        if (response.ok && data.success) {
          sentSuccess = true;
        }
      } catch (err) {
        console.warn('Web3Forms fallback:', err);
      }
    }

    if (sentSuccess) {
      toast.success("Project specs emailed successfully! We'll reply within 2 hours.");
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setSubmittingMode(null);
    } else {
      // 3. Fallback to client mailto
      const formattedBody = `Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'N/A'}
Service: ${formData.service || 'Custom Solution'}

Message:
${formData.message}`;

      const mailtoUrl = `mailto:nexoraa.works@gmail.com?subject=${encodeURIComponent(`Project Specs: ${formData.fullName}`)}&body=${encodeURIComponent(formattedBody)}`;
      window.location.href = mailtoUrl;
      toast.success('Opening your email client with project specs!');
      setSubmittingMode(null);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#060609] text-zinc-100 selection:bg-white selection:text-black antialiased font-quicksand py-6 sm:py-10"
      style={{ fontFamily: "'Quicksand', system-ui, -apple-system, sans-serif" }}
    >
      {/* Top Navigation Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-8 sm:mb-12 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 text-xs font-semibold tracking-wide text-zinc-400 hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-none px-4 py-2 cursor-pointer group shadow-sm"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
          <span className="tracking-wide">Support Online · 2H Turnaround</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Open, Unboxed Project Specs Form */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Elegant Header with Animated Metallic Shining Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight leading-tight mb-2 select-none">
                <span
                  className="text-transparent bg-clip-text inline-block"
                  style={{
                    backgroundImage: 'linear-gradient(115deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #71717a 75%, #ffffff 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'metallic-shimmer 3.5s ease-in-out infinite',
                  }}
                >
                  Project Specs
                </span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base mb-8 font-medium leading-relaxed max-w-xl">
                Fill out the form and we'll send a custom proposal within 2 hours.
              </p>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-quicksand">
                    Full Name <span className="text-zinc-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                    className="w-full bg-[#0d0d14] border border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-[#12121c] focus:ring-1 focus:ring-white/20 rounded-none px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-all font-quicksand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-quicksand">
                    Email <span className="text-zinc-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                      className="w-full bg-[#0d0d14] border border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-[#12121c] focus:ring-1 focus:ring-white/20 rounded-none pl-4 pr-11 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-all font-quicksand"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                      <Mail size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-quicksand">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-[#0d0d14] border border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-[#12121c] focus:ring-1 focus:ring-white/20 rounded-none px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-quicksand">
                    Service
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#0d0d14] border border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-[#12121c] focus:ring-1 focus:ring-white/20 rounded-none pl-4 pr-11 py-3.5 text-sm text-white outline-none transition-all appearance-none cursor-pointer font-quicksand"
                    >
                      <option value="" className="bg-[#0d0d14] text-zinc-400">Select a Service</option>
                      <option value="Web Development" className="bg-[#0d0d14] text-white">Web Development</option>
                      <option value="App Development" className="bg-[#0d0d14] text-white">App Development</option>
                      <option value="AI & Automation" className="bg-[#0d0d14] text-white">AI &amp; Automation</option>
                      <option value="Brand & UI/UX Design" className="bg-[#0d0d14] text-white">Brand &amp; UI/UX Design</option>
                      <option value="Full Website Package (7 Days)" className="bg-[#0d0d14] text-white">Full Website Package (7 Days)</option>
                      <option value="Deployment & DevOps" className="bg-[#0d0d14] text-white">Deployment &amp; DevOps</option>
                      <option value="API Integrations" className="bg-[#0d0d14] text-white">API Integrations</option>
                      <option value="SEO & Performance" className="bg-[#0d0d14] text-white">SEO &amp; Performance</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-quicksand">
                  Message <span className="text-zinc-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision and requirements..."
                  rows={5}
                  required
                  className="w-full bg-[#0d0d14] border border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-[#12121c] focus:ring-1 focus:ring-white/20 rounded-none p-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-all resize-y min-h-[140px] font-quicksand leading-relaxed"
                />
              </div>

              {/* Submission Options: WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* 1. Send via WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={Boolean(submittingMode)}
                  className="w-full bg-white hover:bg-zinc-100 active:scale-[0.99] text-black font-bold text-sm py-4 px-5 rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_25px_rgba(255,255,255,0.12)] group disabled:opacity-70 font-quicksand"
                >
                  <span>{submittingMode === 'whatsapp' ? 'Opening WhatsApp...' : 'Send via WhatsApp'}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. Send via Email */}
                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={Boolean(submittingMode)}
                  className="w-full bg-[#12121a] hover:bg-[#181824] active:scale-[0.99] text-white border border-white/15 hover:border-white/30 font-bold text-sm py-4 px-5 rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group disabled:opacity-70 font-quicksand"
                >
                  <Mail size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span>{submittingMode === 'email' ? 'Sending Email...' : 'Send via Email'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Turnaround & Direct Channels Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-1">
            
            {/* Top Card: Estimated 2 Hour Turnaround */}
            <div className="bg-[#0d0d14] border border-white/10 hover:border-white/15 transition-all rounded-none p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2.5 text-[10.5px] font-mono tracking-[0.2em] text-zinc-400 font-semibold uppercase">
                  <div className="w-6 h-6 rounded-none border border-zinc-700 bg-white/[0.03] flex items-center justify-center">
                    <Clock size={13} className="text-zinc-300" />
                  </div>
                  <span>RESPONSE TIME</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-5 mb-7 font-quicksand leading-snug">
                  Estimated 2 Hour Turnaround.
                </h3>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 rounded-none border border-white/10 bg-white/[0.02] text-[10px] font-mono text-zinc-300 uppercase tracking-wider font-medium">
                  24/7 OPERATIONS
                </span>
                <span className="px-3 py-1.5 rounded-none border border-white/10 bg-white/[0.02] text-[10px] font-mono text-zinc-300 uppercase tracking-wider font-medium">
                  DIRECT ENGINEERING
                </span>
                <span className="px-3 py-1.5 rounded-none border border-white/10 bg-white/[0.02] text-[10px] font-mono text-zinc-300 uppercase tracking-wider font-medium">
                  ZERO BOTS
                </span>
              </div>
            </div>

            {/* Bottom Card: Direct Channels */}
            <div className="bg-[#0d0d14] border border-white/10 hover:border-white/15 transition-all rounded-none p-6 sm:p-7 shadow-xl">
              <div className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase mb-4">
                DIRECT CHANNELS
              </div>

              <div className="divide-y divide-white/5">
                {/* 1. Phone */}
                <a
                  href="tel:+917383303388"
                  className="flex items-center justify-between group py-3.5 hover:opacity-85 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-none bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-white/20 transition-all">
                      <Phone size={17} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block font-mono">
                        Call / Voice
                      </span>
                      <span className="text-sm font-semibold text-white tracking-wide font-mono">
                        +91 73833 03388
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </a>

                {/* 2. WhatsApp */}
                <a
                  href="https://wa.me/917383303388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group py-3.5 hover:opacity-85 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-none bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/20 transition-all">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white font-quicksand">WhatsApp</div>
                      <div className="text-xs text-zinc-400 font-mono">+91 73833 03388</div>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-zinc-500 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all"
                  />
                </a>

                {/* 3. Email */}
                <a
                  href="mailto:nexoraa.works@gmail.com"
                  className="flex items-center justify-between group py-3.5 hover:opacity-85 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-none bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-white/20 transition-all">
                      <Mail size={17} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold block font-mono">
                        Direct Email
                      </span>
                      <span className="text-sm font-semibold text-white tracking-wide font-mono">
                        nexoraa.works@gmail.com
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </a>

                {/* 4. Location */}
                <div className="flex items-center gap-3.5 py-3.5">
                  <div className="w-10 h-10 rounded-none bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                    <MapPin size={17} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white font-quicksand">Gujarat, India</div>
                    <div className="text-xs text-zinc-400 font-mono">Serving Clients Worldwide · Remote First</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
