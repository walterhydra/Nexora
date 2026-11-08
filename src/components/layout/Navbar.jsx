import React, { useState, useRef } from 'react';
import { useScroll, useMotionValueEvent, m, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Menu, X, ArrowRight, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import MagneticButton from '../ui/MagneticButton';
import { getScroll } from '../../utils/scroll';

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [lockedModalOpen, setLockedModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSending, setContactSending] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [selectedService, setSelectedService] = useState('Website');

  const handleContactChange = (e) => {
    setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@nexoraa.studio');
    toast.success('Email copied to clipboard!');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSending(true);
    try {
      const finalMessage = `[Project: ${selectedService}] ${contactForm.message}`;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: finalMessage
        })
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        setContactSent(true);
        setContactForm({ name: '', email: '', message: '' });
        toast.success("Inquiry sent successfully!");
      } else {
        throw new Error('Failed');
      }
    } catch {
      toast.error('Could not send message. Email us at contact@nexoraa.studio');
    } finally {
      setContactSending(false);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Detect scroll direction to show/hide navbar
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHidden(true); // Scroll down - Hide
    } else {
      setIsHidden(false); // Scroll up - Show
    }

    // Shrink padding if scrolled
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      const lenis = getScroll();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Work', id: 'work' },
    { name: 'Projects', id: 'realtimework' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Agreement', isRoute: true, path: '/agreement' }
  ];

  return (
    <>
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        {/* Outer Long Strip: Wide floating container */}
        <m.nav
          variants={{
            visible: { y: 0 },
            hidden: { y: "-180%" }
          }}
          animate={isHidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          layout
          className={cn(
            "pointer-events-auto flex items-center justify-between w-[95%] max-w-7xl rounded-full relative overflow-hidden transition-all duration-500",
            "bg-[#050505]/95 border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)] backdrop-blur-md",
            isScrolled ? "p-1.5 px-6" : "p-3 px-8"
          )}
        >
          {/* Refractive Border Gloss Beam Sweep */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <m.div 
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            />
          </div>

          {/* Logo Section (Left) - Zoomed brand text to text-xl */}
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={(e) => location.pathname === '/' && handleNavClick(e, 'home')}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <img 
                  src="/logo/ChatGPT Image May 11, 2026, 11_53_46 AM.png" 
                  alt="Nexoraa Logo Icon" 
                  className="w-full h-full object-contain"
                  loading="eager"
                  fetchPriority="high"
                  width="40"
                  height="40"
                />
              </div>
              <span className="font-display font-black text-lg md:text-xl tracking-[0.2em] text-white">
                NEXORAA
              </span>
            </Link>
          </div>

          {/* Stretched Inner Capsule (Desktop Center - Flex Grow / Stretch) */}
          <div className="hidden md:flex flex-1 max-w-5xl mx-4 lg:mx-8">
            <div 
              className="bg-white/5 border border-white/5 rounded-full p-1.5 flex items-center justify-between w-full relative"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {/* Spaced Links - Responsive text and padding */}
              <div className="flex items-center justify-around flex-1 px-2 lg:px-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative">
                    {link.isRoute ? (
                      <Link
                        to={link.path}
                        onClick={(e) => {
                          if (link.path === '/agreement') {
                            e.preventDefault();
                            setLockedModalOpen(true);
                          }
                        }}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        className="px-3 lg:px-4 xl:px-5 py-2 block text-sm lg:text-base font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative z-10 whitespace-nowrap"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => handleNavClick(e, link.id)}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        className="px-3 lg:px-4 xl:px-5 py-2 block text-sm lg:text-base font-semibold tracking-wide text-gray-300 hover:text-white transition-colors relative z-10 whitespace-nowrap"
                      >
                        {link.name}
                      </a>
                    )}

                    {/* Sliding Active Pill */}
                    {hoveredLink === link.name && (
                      <m.div
                        layoutId="capsule-active"
                        className="absolute inset-0 bg-white/10 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Us CTA inside capsule */}
              <button onClick={() => setContactModalOpen(true)} className="shrink-0 ml-2">
                <MagneticButton 
                  className="bg-black hover:bg-neutral-900 border border-white/10 text-white px-5 py-2 lg:px-6 lg:py-2.5 text-xs lg:text-sm font-black rounded-full transition-colors flex items-center justify-center whitespace-nowrap group"
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    Contact Us
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </span>
                </MagneticButton>
              </button>
            </div>
          </div>

          {/* Actions Section (Right) - CLIENT PORTAL -> */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <Link
              to="/portal"
              className="group relative flex items-center gap-2 bg-white/5 hover:bg-white border border-white/10 hover:border-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-full transition-all duration-300 text-xs lg:text-sm font-semibold text-gray-300 hover:text-black whitespace-nowrap"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-2xs lg:text-xs uppercase tracking-widest flex items-center gap-2">
                Client Portal
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
              </span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2 pr-2 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <Menu size={18} />
            </button>
          </div>

        </m.nav>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-md flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  <img 
                    src="/logo/ChatGPT Image May 11, 2026, 11_53_46 AM.png" 
                    alt="Nexoraa Logo Icon" 
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                    width="40"
                    height="40"
                  />
                </div>
                <span className="font-display font-black text-xl tracking-tight text-white">NEXORAA</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.isRoute ? (
                    <Link
                      to={link.path}
                      onClick={(e) => {
                        if (link.path === '/agreement') {
                          e.preventDefault();
                          setMobileMenuOpen(false);
                          setLockedModalOpen(true);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="text-4xl font-display font-bold text-white hover:text-gray-400 transition-colors tracking-tight"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="text-4xl font-display font-bold text-white hover:text-gray-400 transition-colors tracking-tight"
                    >
                      {link.name}
                    </a>
                  )}
                </m.div>
              ))}
              
              <m.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-col items-center gap-6 w-full max-w-xs"
              >
                <button onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }} className="w-full">
                  <MagneticButton 
                    className="bg-white text-black w-full py-4 font-bold text-sm rounded-full transition-colors hover:bg-gray-200 flex items-center justify-center gap-2"
                  >
                    Contact Us <ArrowRight size={16} />
                  </MagneticButton>
                </button>
                <Link 
                  to="/portal" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="text-sm font-mono text-gray-500 hover:text-white uppercase tracking-widest"
                >
                  Client Portal
                </Link>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Quick Contact Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <m.div
            key="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex items-center justify-center overflow-y-auto p-4 md:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) { setContactModalOpen(false); setContactSent(false); } }}
          >
            <m.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              className="w-full bg-[#050505]/98 border-y border-white/10 py-10 md:py-16 px-6 flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative origin-center overflow-hidden"
            >
              {/* Glossy Reflection overlay */}
              <m.div 
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
              />

              <div className="max-w-6xl w-full relative z-10 flex flex-col md:flex-row items-start justify-between gap-10">
                
                {/* Left side: Status + Quick Links */}
                <div className="flex flex-col items-start gap-6 text-left max-w-sm w-full md:sticky md:top-0">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-wider w-fit">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    SUPPORT ONLINE: RESPONSE IN &lt; 2H
                  </div>

                  <div>
                    <h3 className="text-2xl md:text-4xl font-display font-black text-white tracking-tighter uppercase">
                      Contact Panel
                    </h3>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                      Build your project brief using our control console, or establish a direct communication port with our engineering team.
                    </p>
                  </div>

                  <div className="space-y-4 w-full pt-4 border-t border-white/5">
                    {/* Copyable Email Box */}
                    <div 
                      onClick={copyEmail}
                      className="flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-2xl cursor-pointer transition-all duration-300 group w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#00F5FF] group-hover:bg-[#00F5FF]/10 transition-colors">
                          <Mail size={14} />
                        </div>
                        <div className="text-left">
                          <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Email Protocol</div>
                          <div className="text-xs font-semibold text-gray-300">contact@nexoraa.studio</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-md border border-white/5">
                        Copy
                      </span>
                    </div>

                    {/* WhatsApp Connector */}
                    <a 
                      href="https://wa.me/919999999999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-2xl transition-all duration-300 group w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400/10 transition-colors">
                          <span className="text-xs">💬</span>
                        </div>
                        <div className="text-left">
                          <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Instant Chat</div>
                          <div className="text-xs font-semibold text-gray-300">Connect on WhatsApp</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-md border border-white/5">
                        Open
                      </span>
                    </a>

                    {/* Calendly Booker */}
                    <a 
                      href="https://calendly.com/nexoraa" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-2xl transition-all duration-300 group w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue/10 transition-colors">
                          <span className="text-xs">📅</span>
                        </div>
                        <div className="text-left">
                          <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Consultation</div>
                          <div className="text-xs font-semibold text-gray-300">Book 15 min Discovery Call</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-md border border-white/5">
                        Book
                      </span>
                    </a>
                  </div>
                </div>

                {/* Right side: Dynamic Form Area */}
                <div className="flex-1 w-full bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-6 md:p-8 relative">
                  <AnimatePresence mode="wait">
                    {contactSent ? (
                      <m.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center h-full py-16 text-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <CheckCircle2 className="text-emerald-400" size={32} />
                        </div>
                        <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">Transmission Confirmed</h3>
                        <p className="text-xs text-gray-400 max-w-xs leading-relaxed mt-2">
                          Your brief is active in our console pipeline. An engineer will coordinate with your team within 2 hours.
                        </p>
                        <button
                          onClick={() => { setContactSent(false); setContactModalOpen(false); }}
                          className="mt-6 px-8 py-3.5 rounded-full bg-white text-black text-xs font-bold hover:bg-[#00F5FF] transition-colors"
                        >
                          Terminate Panel
                        </button>
                      </m.div>
                    ) : (
                      <m.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleContactSubmit}
                        className="space-y-6"
                      >
                        {/* Choice 1: Project Type Selection */}
                        <div className="space-y-3 text-left">
                          <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                            1. Select Project Scope
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {['Website', 'E-Commerce', 'SaaS / Web App', 'Mobile App', 'Custom Systems'].map((service) => (
                              <button
                                key={service}
                                type="button"
                                onClick={() => setSelectedService(service)}
                                className={cn(
                                  "px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-300 cursor-pointer",
                                  selectedService === service
                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                                    : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                                )}
                              >
                                {service}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Input Fields */}
                        <div className="grid md:grid-cols-2 gap-4 text-left">
                          <div>
                            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={contactForm.name}
                              onChange={handleContactChange}
                              placeholder="Rahul Sharma"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#00F5FF]/50 focus:bg-white/[0.07] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={contactForm.email}
                              onChange={handleContactChange}
                              placeholder="rahul@company.com"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#00F5FF]/50 focus:bg-white/[0.07] transition-all"
                            />
                          </div>
                        </div>

                        <div className="text-left">
                          <label className="block text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">Project Brief</label>
                          <textarea
                            name="message"
                            required
                            rows={3}
                            value={contactForm.message}
                            onChange={handleContactChange}
                            placeholder="Briefly describe what you're looking to build..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-[#00F5FF]/50 focus:bg-white/[0.07] transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={contactSending}
                          className="w-full py-4 bg-white hover:bg-[#00F5FF] text-black font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group shadow-lg"
                        >
                          {contactSending ? (
                            <><m.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Send size={14} /></m.span> Submitting Project Profile...</>
                          ) : (
                            <>Submit Project Brief <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
                          )}
                        </button>
                      </m.form>
                    )}
                  </AnimatePresence>
                </div>

                {/* Close Button on Top Right of the Strip */}
                <button
                  onClick={() => { setContactModalOpen(false); setContactSent(false); }}
                  className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
                
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Locked Strip */}
      <AnimatePresence>
        {lockedModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md flex items-center justify-center"
          >
            <m.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="w-full bg-[#050505]/95 border-y border-white/10 py-8 md:py-10 px-6 flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative origin-center overflow-hidden"
            >
              {/* Glossy Reflection overlay */}
              <m.div 
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
              />
              
              <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                
                {/* Left side: Icon + Text */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8 text-center md:text-left">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <span className="text-2xl md:text-4xl">🔒</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-4xl font-display font-black text-white tracking-tighter uppercase">
                      Access Restricted
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                      This asset is secured and requires exclusive clearance. Please contact our team to verify your identity and unlock this document.
                    </p>
                  </div>
                </div>
                
                {/* Right side: Buttons */}
                <div className="flex flex-row items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button 
                    onClick={() => setLockedModalOpen(false)}
                    className="flex-1 md:flex-none px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-bold transition-colors border border-transparent hover:border-white/10 text-sm md:text-base whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <Link to="/contact" onClick={() => setLockedModalOpen(false)} className="flex-1 md:flex-none">
                    <button className="w-full bg-white text-black px-8 py-3.5 font-bold text-sm md:text-base rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center whitespace-nowrap group">
                      <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                        Unlock Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
                      </span>
                    </button>
                  </Link>
                </div>

              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
