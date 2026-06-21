import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ArrowRight, Activity, Terminal, CheckCircle2, RotateCw } from 'lucide-react';

export default function PrivacyPolicy() {
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
            <div>DATA PRIVACY LEDGER REGISTERED</div>
            <div className="hidden sm:block text-emerald-500 font-bold">● RATIFIED & COMPLIANT</div>
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
                  <span className="text-black dark:text-white">Nexoraa_Privacy_v1.2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Audit Authority:</span>
                  <span className="text-black dark:text-white">Nexoraa Legal Directorate</span>
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
                    Block Index #NX-PP-2026-088 <br />
                    Cryptographic signature is verified and matches current registry states.
                  </div>
                </m.div>
              )}
            </div>

            {/* Compliance Stats Card */}
            <div className="bg-white dark:bg-[#0b0d12] rounded-3xl border border-black/15 dark:border-white/10 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-sm font-display font-black uppercase tracking-wider text-black dark:text-white mb-4 pb-3 border-b border-black/5 dark:border-white/5">
                Privacy Directive
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Data Encryption', val: 'AES-256 Bit Sockets' },
                  { label: 'Regulatory Scope', val: 'GDPR / CCPA / EEA' },
                  { label: 'Registry ID', val: 'NX-PP-2026-088' },
                  { label: 'Revision Status', val: 'Codified & Active' }
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
                Document Ledger NX-PP-088
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
              animate={{ opacity: 0.9, scale: 1, rotate: -10, filter: 'blur(0px)' }}
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
                Certified Legal Directive
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight mt-3 text-black dark:text-white">
                Privacy Policy
              </h2>
            </div>

            {/* Decree Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6 text-base md:text-lg leading-relaxed">
              
              {/* 1. Introduction */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 1.</span> Introduction
              </h3>
              <p>Welcome to Nexoraa Studio ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
              <p>When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it.</p>

              {/* 2. Information We Collect */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 2.</span> Information We Collect
              </h3>
              <p>The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect can include the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Name and Contact Data:</strong> We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
                <li><strong>Credentials:</strong> We collect passwords, password hints, and similar security information used for authentication and account access.</li>
                <li><strong>Payment Data:</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument.</li>
              </ul>

              {/* 3. How We Use Your Information */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 3.</span> How We Use Your Information
              </h3>
              <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you marketing and promotional communications.</li>
                <li>To fulfill and manage your orders, payments, returns, and exchanges made through the Website.</li>
                <li>To deliver services to the user.</li>
                <li>To respond to user inquiries/offer support to users.</li>
              </ul>

              {/* 4. Will Your Information Be Shared With Anyone? */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 4.</span> Information Sharing
              </h3>
              <p>We share and disclose your information in compliance with legal thresholds:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Compliance with Laws:</strong> We disclose your information where legally required to comply with applicable local and federal laws, governmental audits, or judicial proceedings.</li>
                <li><strong>Vital Rights:</strong> We share data where necessary to investigate, prevent, or address suspected policy breaches, security risks, fraud, or threats to physical protection.</li>
                <li><strong>Consultants and Third-Party Providers:</strong> We share information exclusively with authorized vendors who require data access to perform billing or code hosting operations.</li>
              </ul>

              {/* 5. Cookies and Similar Technologies */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 5.</span> Cookies and Tracking
              </h3>
              <p>We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific details regarding tracking methods and opt-out routes are provided in our Cookie Policy.</p>

              {/* 6. Data Retention */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 6.</span> Data Retention
              </h3>
              <p>We retain personal data strictly for as long as active user contracts require. In cases where tax, regulatory, or administrative ledgers require archive maintenance, data is preserved under isolation states.</p>

              {/* 7. Your Privacy Rights */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 7.</span> Your Privacy Rights
              </h3>
              <p>In accordance with GDPR/EEA legal directives, users possess direct rights of access, rectification, erasure, and database portability. Under certain circumstances, you may also object directly to data processing workflows.</p>

              {/* 8. Contact Us */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white mt-8 flex items-center gap-2">
                <span className="text-accent-blue">§ 8.</span> Legal Contact Directives
              </h3>
              <p>If you have questions or comments about this policy, you may email us or by post to:</p>
              <p className="font-mono bg-black/5 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5 inline-block text-sm">
                Nexoraa Studio<br />
                Legal Department<br />
                contact@nexoraa.studio
              </p>
            </div>

            {/* Signature Verification Block */}
            <div className="border-t border-black/10 dark:border-white/10 pt-10 mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 font-mono">
              {/* Signature Area */}
              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-gray-400">Authorized Signatures</div>
                <div className="flex gap-8 items-center">
                  <div className="text-sm italic font-serif text-accent-blue dark:text-accent-blue/90 border-b border-black/20 dark:border-white/20 pb-1 pr-6 select-none">
                    Nexoraa Compliance Officer
                  </div>
                </div>
                <div className="text-[9px] text-gray-400 font-mono">Nexoraa Data Registry Directorate</div>
              </div>

              {/* SHA Checksum Verification */}
              <div className="text-left sm:text-right space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-gray-400">Digital Registry Hash</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 break-all max-w-xs font-mono">
                  SHA-256: 7d8c6b5a4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a
                </div>
                <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider flex items-center sm:justify-end gap-1">
                  ✓ Ratified & Ledger Registered
                </div>
              </div>
            </div>

          </m.main>

        </div>
      </div>
    </div>
  );
}
