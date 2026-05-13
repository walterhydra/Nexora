import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { services } from '../constants/services';
import { Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link as LinkIcon, TrendingUp, ArrowLeft, CheckCircle2, Shield, Clock } from 'lucide-react';
import ScrambleText from '../components/ui/ScrambleText';

const iconMap = {
  Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link: LinkIcon, TrendingUp
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);
  const containerRef = useRef(null);
  
  // Removed mouse tracking state to prevent full-component re-renders on every mouse move, which causes severe lag.

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Service Not Found</h1>
          <button onClick={() => navigate('/')} className="text-[#00F5FF] hover:underline font-mono">Back to Home</button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Globe;

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden"
    >
      {/* Static Radial Gradient Background (Optimized) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)`
        }}
      />

      {/* Floating Animated Background Orbs (Optimized for Performance) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(0,0,0,0) 70%)' }}
        />
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(155,89,255,0.15) 0%, rgba(0,0,0,0) 70%)' }}
        />
      </div>

      {/* Grid Lines Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none z-0" />

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference text-white">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/#services')}
          className="flex items-center gap-2 hover:opacity-70 transition-all font-mono text-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Content Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-start">
            
            {/* Top Icon Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center w-full mb-8"
            >
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/5 bg-[#111] z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Icon size={22} className="text-white" />
              </div>
              <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-grow max-w-[200px]" />
            </motion.div>

            {/* Huge Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-[1.05] mb-10 text-white"
            >
              {service.title}
            </motion.h1>

            {/* Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <div className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-mono text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-default">
                <Clock size={14} className="group-hover:text-accent-primary transition-colors" />
                <span>7-Day Delivery</span>
              </div>
              <div className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-mono text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-default">
                <Shield size={14} className="group-hover:text-accent-purple transition-colors" />
                <span>Fixed Pricing</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-16 max-w-3xl border-l-2 border-[#00F5FF]/30 pl-6"
            >
              {service.details}
            </motion.p>

            {/* What's Included */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full relative"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-gradient-to-r from-[#00F5FF] to-transparent w-12" />
                <h2 className="text-2xl font-bold font-display tracking-wide uppercase">What's Included</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-[#161616] relative overflow-hidden cursor-default transition-colors duration-300 hover:border-white/20 hover:bg-[#1a1a1a]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/0 via-[#00F5FF]/5 to-[#00F5FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <div className="flex-shrink-0 relative z-10 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
                      <CheckCircle2 size={14} className="text-gray-500 group-hover:text-[#00F5FF] transition-colors duration-300" />
                    </div>
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300 relative z-10">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
          </div>

          {/* Right Sidebar Area (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-4 relative"
          >
            <div className="sticky top-32 flex flex-col gap-6">
              
              {/* Main Pricing Card */}
              <div className="group relative p-8 rounded-[2rem] border border-white/10 bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Glowing orb behind card */}
                <div 
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, rgba(0,0,0,0) 70%)' }}
                />
                
                <div className="relative z-10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-[#00F5FF] uppercase mb-4 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#00F5FF] rounded-full" />
                    <ScrambleText text="INVESTMENT" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-8 group-hover:-translate-y-1 transition-transform duration-500">
                    <span className="text-6xl font-black font-display tracking-tighter">{service.price}</span>
                    <span className="text-sm font-mono text-gray-500">/project</span>
                  </div>

                  <div className="flex flex-col gap-3 mb-8">
                    <a 
                      href={`https://wa.me/917567097891?text=Hello! I am interested in your ${service.title} service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full py-4 bg-[#00F5FF] text-black font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Secure Booking
                        <Rocket size={16} />
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:animate-[shimmer_1.5s_infinite]" />
                    </a>
                    
                    <button className="relative w-full py-4 bg-transparent overflow-hidden rounded-xl border border-white/10 group/btn transition-all hover:border-white/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative z-10 text-white font-semibold group-hover/btn:text-[#00F5FF] transition-colors">Compare Packages</span>
                    </button>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                  <div className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase mb-4">
                    <ScrambleText text="BUILT WITH" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg border border-white/10 bg-black/50 text-xs font-mono text-gray-300 hover:text-white hover:border-[#00F5FF]/50 transition-colors duration-300 cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="p-6 rounded-[1.5rem] border border-white/10 bg-[#111] relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF00]/0 via-[#00FF00]/5 to-[#00FF00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-white font-bold uppercase mb-3">
                    <ScrambleText text="STATUS" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00FF00] animate-ping opacity-50" />
                      <div className="relative w-2 h-2 rounded-full bg-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.8)]" />
                    </div>
                    <span className="text-xs font-mono text-gray-300 tracking-wide">Accepting new projects</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
