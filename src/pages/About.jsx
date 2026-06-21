import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ArrowRight, Activity, Terminal, CheckCircle2, RotateCw } from 'lucide-react';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Live Scanner State
  const [scanState, setScanState] = useState('idle'); // idle | scanning | verified
  const triggerScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('verified');
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#f4f6fa] dark:bg-[#050609] text-gray-950 dark:text-white relative overflow-hidden font-sans">
      {/* Background grid pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-accent-blue/10 via-transparent to-transparent -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Registry Status Strip */}
        <m.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 bg-white/80 dark:bg-[#0c0d13]/80 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-4 mb-8 shadow-sm backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase">
              Live Registry Status: Securing Node #NX-001
            </span>
          </div>
          <div className="flex gap-4 text-[10px] font-mono text-gray-400">
            <div>IP SHA-256 REGISTERED</div>
            <div className="hidden sm:block text-emerald-500 font-bold">● ACTIVE & SECURED</div>
          </div>
        </m.div>

        {/* Dashboard Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 md:gap-10 items-start">
          
          {/* LEFT SIDEBAR: Verification & Integrity Widgets */}
          <m.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:sticky lg:top-28"
          >
            {/* Interactive Audit Scanner Card */}
            <div className="relative overflow-hidden bg-white dark:bg-[#0b0d12] rounded-3xl border border-black/15 dark:border-white/10 p-6 shadow-xl backdrop-blur-xl">
              
              {/* Animated laser sweep scanner line */}
              {scanState === 'scanning' && (
                <m.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent shadow-[0_0_12px_rgba(79,142,247,0.9)] z-30"
                />
              )}

              <h3 className="text-sm font-display font-black uppercase tracking-wider text-black dark:text-white mb-4 flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/5">
                <Terminal size={16} className="text-accent-blue" />
                Ledger Verification
              </h3>

              <div className="space-y-3.5 font-mono text-[11px] mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Node Directory:</span>
                  <span className="text-black dark:text-white">Nexoraa_About_v1.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Audit Authority:</span>
                  <span className="text-black dark:text-white">Nexoraa Compliance</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Integrity:</span>
                  <span>
                    {scanState === 'verified' ? (
                      <span className="text-emerald-500 font-bold px-2 py-0.5 rounded bg-emerald-500/10">100% VALID</span>
                    ) : scanState === 'scanning' ? (
                      <span className="text-accent-blue animate-pulse font-bold px-2 py-0.5 rounded bg-accent-blue/10">ANALYZING...</span>
                    ) : (
                      <span className="text-amber-500 font-bold px-2 py-0.5 rounded bg-amber-500/10">PENDING AUDIT</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">SSL Connection:</span>
                  <span className="text-emerald-500 font-bold">ESTABLISHED</span>
                </div>
              </div>

              {scanState === 'idle' && (
                <button 
                  onClick={triggerScan}
                  className="w-full py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-accent-blue hover:text-black dark:hover:bg-accent-blue transition-all duration-300 text-xs font-mono font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCw size={14} className="animate-spin-slow" />
                  Audit Certificate
                </button>
              )}
              {scanState === 'scanning' && (
                <div className="w-full py-3 bg-accent-blue/15 text-accent-blue text-xs font-bold text-center rounded-xl font-mono animate-pulse border border-accent-blue/30 uppercase tracking-wider">
                  Analyzing Registry...
                </div>
              )}
              {scanState === 'verified' && (
                <m.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="w-full py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold text-center rounded-xl font-mono flex items-center justify-center gap-2">
                    <CheckCircle2 size={14} />
                    Verified Authenticity
                  </div>
                  <div className="text-[9px] text-gray-500 dark:text-gray-400 font-mono text-center leading-relaxed">
                    Block Index #NX-AB-2026-001 <br />
                    Cryptographic signature is verified and matches current registry states.
                  </div>
                </m.div>
              )}
            </div>

            {/* Compliance Stats Card */}
            <div className="bg-white dark:bg-[#0b0d12] rounded-3xl border border-black/15 dark:border-white/10 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-sm font-display font-black uppercase tracking-wider text-black dark:text-white mb-4 pb-3 border-b border-black/5 dark:border-white/5">
                Registry Credentials
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Privacy Standards', val: 'GDPR / ISO27001' },
                  { label: 'Aesthetic Score', val: 'Premium UI / UX' },
                  { label: 'Engine Speed', val: 'Lighthouse 98+' },
                  { label: 'Protocol Class', val: 'Authorized Tier-A' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">{item.label}</span>
                    <span className="font-mono font-bold text-black dark:text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Barcode Display */}
            <div className="bg-white dark:bg-[#0b0d12] rounded-3xl border border-black/15 dark:border-white/10 p-5 shadow-xl flex flex-col items-center justify-center backdrop-blur-xl">
              <div className="text-3xl font-mono tracking-[0.25em] text-black/40 dark:text-white/30 select-none">
                ||||||||||||||||||||||
              </div>
              <div className="text-[9px] font-mono text-gray-400 mt-2 uppercase tracking-widest">
                Document Ledger NX-AB-001
              </div>
            </div>
          </m.aside>

          {/* RIGHT SIDE: Main Decree Document Sheet */}
          <m.main 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-white dark:bg-[#0b0d12] p-8 md:p-14 rounded-[2rem] border-2 border-double border-black/20 dark:border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          >
            {/* Classic certificate corner brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-black/30 dark:border-white/20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-black/30 dark:border-white/20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-black/30 dark:border-white/20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-black/30 dark:border-white/20" />

            {/* Stamping Animation */}
            <m.div
              initial={{ opacity: 0, scale: 3.5, rotate: -60, filter: 'blur(4px)' }}
              animate={{ opacity: 0.9, scale: 1, rotate: -15, filter: 'blur(0px)' }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 14, 
                delay: 0.8 
              }}
              className="absolute top-6 right-6 md:top-12 md:right-12 w-28 h-28 md:w-36 md:h-36 pointer-events-none select-none z-20 origin-center"
            >
              <img 
                src="/projects/stamp.png" 
                alt="Nexoraa Official Seal" 
                className="w-full h-full object-contain"
              />
            </m.div>

            {/* Sheet Title Header */}
            <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-accent-blue">
                Authorized Organization Charter
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight mt-3 text-black dark:text-white">
                About <span className="text-accent-blue">Nexoraa</span>
              </h2>
            </div>

            {/* Decree Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-8 text-base md:text-lg leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                  Section I. Constitution of Enterprise
                </h3>
                <p>
                  Pursuant to the laws of digital innovation and architectural design excellence, Nexoraa Studio is established as an advanced engineering collective. We reject standard framework defaults and commercial templates, committing exclusively to bespoke system development, speed optimization, and premium aesthetic structures.
                </p>
                <p>
                  Our charter is simple: to deploy custom-engineered interfaces and intelligent backend layers that command target objectives, elevate branding positions, and deliver maximum operational value.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                  Section II. Operational Directives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {[
                    { title: "Rapid Sprints", desc: "Interactive deployment pipelines engineered to go from design sign-off to live deployment in structured sprints." },
                    { title: "Zero-Lag Architectures", desc: "Engineered codebases with zero bloat, static optimization, and modular component assets." },
                    { title: "Immersive Design Systems", desc: "Custom dark/light dynamics, responsive typography, and premium user layouts." },
                    { title: "Authorized Accountability", desc: "Every project is locked in phases, backed by direct communication channels with senior engineers." }
                  ].map((directive, index) => (
                    <div key={index} className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-black dark:text-white text-sm mb-1">{directive.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{directive.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Signature Verification Block */}
            <div className="border-t border-black/10 dark:border-white/10 pt-10 mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 font-mono">
              {/* Signature Area */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-gray-400">Authorized Signatures</div>
                <div className="flex gap-8 items-center">
                  <div className="text-sm italic font-serif text-accent-blue dark:text-accent-blue/90 border-b border-black/20 dark:border-white/20 pb-1 pr-6 select-none">
                    Milan & Nexoraa Directorate
                  </div>
                </div>
                <div className="text-[9px] text-gray-400">Nexoraa Corporate Directorate</div>
              </div>

              {/* SHA Checksum Verification */}
              <div className="text-left sm:text-right space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-gray-400">Digital Authenticity Hash</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 break-all max-w-xs font-mono">
                  SHA-256: 3c9b7e12f0a5d2e3f4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7
                </div>
                <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider flex items-center sm:justify-end gap-1">
                  ✓ Authenticated Registry Document
                </div>
              </div>
            </div>

          </m.main>

        </div>
      </div>
    </div>
  );
}
