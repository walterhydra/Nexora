import React, { useEffect, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldAlert, CreditCard, Building2, Globe, 
  ArrowRight, ShieldCheck, Zap, Lock, Terminal, Activity, RotateCw, CheckCircle2
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

export default function PaymentPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Live Scanner State
  const [scanState, setScanState] = useState('idle'); // idle | scanning | verified
  const triggerScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('verified');
    }, 1500);
  };

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#02000a] text-gray-100 relative overflow-hidden font-sans">
      {/* Deep Space Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#02000a] to-[#02000a] -z-20" />
      <m.div 
        style={{ y: yBg }}
        className="absolute top-0 left-0 w-full h-[200vh] opacity-30 -z-10 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[150px]" />
      </m.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Registry Status Strip */}
        <m.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 bg-[#0a0a14]/85 border border-white/10 rounded-2xl px-6 py-4 mb-8 shadow-sm backdrop-blur-md"
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
            <div>FINANCIAL LEDGER DIRECTIVE REGISTERED</div>
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
            <div className="relative overflow-hidden bg-[#07070f]/90 rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
              
              {/* Animated laser sweep scanner line */}
              {scanState === 'scanning' && (
                <m.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent shadow-[0_0_12px_rgba(79,142,247,0.9)] z-30"
                />
              )}

              <h3 className="text-sm font-display font-black uppercase tracking-wider text-white mb-4 flex items-center gap-2 pb-3 border-b border-white/5">
                <Terminal size={16} className="text-accent-blue" />
                Ledger Verification
              </h3>

              <div className="space-y-3.5 font-mono text-[11px] mb-6 text-gray-300">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Node Directory:</span>
                  <span className="text-white">Nexora_Finance_v1.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Audit Authority:</span>
                  <span className="text-white">Nexora Treasury</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Integrity:</span>
                  <span>
                    {scanState === 'verified' ? (
                      <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10">100% VALID</span>
                    ) : scanState === 'scanning' ? (
                      <span className="text-accent-blue animate-pulse font-bold px-2 py-0.5 rounded bg-accent-blue/10">ANALYZING...</span>
                    ) : (
                      <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10">PENDING AUDIT</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">SSL Connection:</span>
                  <span className="text-emerald-400 font-bold">ESTABLISHED</span>
                </div>
              </div>

              {scanState === 'idle' && (
                <button 
                  onClick={triggerScan}
                  className="w-full py-3 bg-white text-black hover:bg-accent-blue hover:text-black transition-all duration-300 text-xs font-mono font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
                  <div className="w-full py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center rounded-xl font-mono flex items-center justify-center gap-2">
                    <CheckCircle2 size={14} />
                    Verified Authenticity
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono text-center leading-relaxed">
                    Block Index #NX-FP-2026-081 <br />
                    Cryptographic signature is verified and matches current registry states.
                  </div>
                </m.div>
              )}
            </div>

            {/* Compliance Stats Card */}
            <div className="bg-[#07070f]/90 rounded-3xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-sm font-display font-black uppercase tracking-wider text-white mb-4 pb-3 border-b border-white/5">
                Financial Protocol
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Ledger Clearance', val: '100% Secure Quarantine' },
                  { label: 'Merchant Scope', val: 'Stripe / Bank Wire' },
                  { label: 'Registry ID', val: 'NX-FP-2026-081' },
                  { label: 'Status class', val: 'Corporate Directive' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">{item.label}</span>
                    <span className="font-mono font-bold text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Barcode Display */}
            <div className="bg-[#07070f]/90 rounded-3xl border border-white/10 p-5 shadow-2xl flex flex-col items-center justify-center backdrop-blur-xl">
              <div className="text-3xl font-mono tracking-[0.25em] text-white/30 select-none">
                ||||||||||||||||||||||
              </div>
              <div className="text-[9px] font-mono text-gray-400 mt-2 uppercase tracking-widest">
                Document Ledger NX-FP-081
              </div>
            </div>
          </m.aside>

          {/* RIGHT SIDE: Main Decree Document Sheet */}
          <m.main 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-[#07070f]/80 backdrop-blur-xl p-8 md:p-14 rounded-[2rem] border-2 border-double border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          >
            {/* Classic certificate corner brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/20" />

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
                alt="Nexora Official Seal" 
                className="w-full h-full object-contain"
              />
            </m.div>

            {/* Hero Section */}
            <div className="text-center mb-20 mt-6 relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 mb-8 backdrop-blur-md font-mono">
                <Activity className="text-accent-blue" size={14} />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-blue">Investment Architecture</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-black mb-6 tracking-tighter leading-none text-white">
                The Nexora <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-indigo-400 to-accent-violet">
                  Protocol
                </span>
              </h1>
              <p className="text-base text-gray-400 max-w-xl mx-auto font-medium leading-relaxed">
                World-class engineering requires elite operational standards. Our financial architecture is built for speed, transparency, and mutual protection.
              </p>
            </div>

            {/* Engagement Models */}
            <m.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-24"
            >
              <m.div variants={itemVariants} className="flex items-center gap-4 mb-10">
                <Zap className="text-accent-blue" size={24} />
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Engagement Models</h2>
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Standard Protocol */}
                <m.div variants={itemVariants} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl" />
                  <div className="relative h-full bg-[#0a0a14]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 hover:border-accent-blue/30 transition-colors duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-transparent opacity-50" />
                    
                    <h3 className="text-2xl font-display font-bold mb-3 text-white">Standard Execution</h3>
                    <p className="text-gray-400 mb-8 text-xs font-medium">Engineered for 7-day rapid deployments and high-impact websites.</p>
                    
                    <div className="relative font-mono">
                      {/* Timeline connecting line */}
                      <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-blue via-white/10 to-white/10" />
                      
                      <div className="space-y-8 relative z-10">
                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 shrink-0 rounded-2xl bg-accent-blue/20 border border-accent-blue/30 text-accent-blue flex items-center justify-center font-bold text-base shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                            50%
                          </div>
                          <div className="pt-1 font-sans">
                            <h4 className="text-base font-bold text-white mb-1">System Initiation</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">Secures your project slot and triggers engineering sprints.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-bold text-base group-hover:bg-accent-blue/10 group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all duration-500">
                            50%
                          </div>
                          <div className="pt-1 font-sans">
                            <h4 className="text-base font-bold text-white mb-1">Final Handover</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">Required prior to source code delivery and live domain push.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>

                {/* Enterprise Protocol */}
                <m.div variants={itemVariants} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl" />
                  <div className="relative h-full bg-[#0a0a14]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 hover:border-accent-violet/30 transition-colors duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-violet to-transparent opacity-50" />
                    
                    <h3 className="text-2xl font-display font-bold mb-3 text-white">Enterprise Protocol</h3>
                    <p className="text-gray-400 mb-8 text-xs font-medium">Architected for large-scale SaaS platforms and multi-phase applications.</p>
                    
                    <div className="relative font-mono">
                      {/* Timeline connecting line */}
                      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-violet via-white/10 to-white/10" />
                      
                      <div className="space-y-6 relative z-10">
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 shrink-0 rounded-xl bg-accent-violet/20 border border-accent-violet/30 text-accent-violet flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                            30%
                          </div>
                          <div className="pt-1 font-sans">
                            <h4 className="text-sm font-bold text-white mb-0.5">Architecture Kickoff</h4>
                            <p className="text-gray-400 text-xs">Post-agreement signing & discovery.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-bold text-sm group-hover:bg-accent-violet/10 group-hover:text-accent-violet group-hover:border-accent-violet/30 transition-all duration-500">
                            40%
                          </div>
                          <div className="pt-1 font-sans">
                            <h4 className="text-sm font-bold text-white mb-0.5">Alpha Milestone</h4>
                            <p className="text-gray-400 text-xs">Upon delivery of core functional backend & UI.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-bold text-sm group-hover:bg-accent-violet/10 group-hover:text-accent-violet group-hover:border-accent-violet/30 transition-all duration-500">
                            30%
                          </div>
                          <div className="pt-1 font-sans">
                            <h4 className="text-sm font-bold text-white mb-0.5">Production Release</h4>
                            <p className="text-gray-400 text-xs">Before deployment to production servers.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>
              </div>
            </m.div>

            {/* Non-Negotiable Standards */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-24 max-w-5xl mx-auto"
            >
              <div className="bg-[#05050a] border border-white/10 rounded-[2rem] p-6 md:p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-mono">
                  <Terminal size={120} />
                </div>
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <Lock className="text-red-400" size={24} />
                  <h2 className="text-xl md:text-2xl font-display font-bold text-white">Non-Negotiable Directives</h2>
                </div>
                
                <div className="space-y-4 relative z-10">
                  {[
                    {
                      title: "Zero-Start Protocol",
                      desc: "Absolutely no engineering, design drafts, or 'test codes' commence until the initial system payment is verified in our ledgers."
                    },
                    {
                      title: "Codebase Quarantine",
                      desc: "All development happens on Nexora secure staging servers. Source code, IP transfers, and live domain deployments are quarantined until 100% ledger clearance."
                    },
                    {
                      title: "Phase-Locked Revisions",
                      desc: "Project progression and active revision cycles are strictly bound to their respective payment phases. We do not advance to Phase B if Phase A is unresolved."
                    }
                  ].map((rule, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                      <div className="md:w-1/3 shrink-0">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                          {rule.title}
                        </h4>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{rule.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>

            {/* Global Commerce & Security */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-24">
              {/* Payment Gateways */}
              <m.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-3 bg-[#0a0a14]/50 backdrop-blur-lg p-8 rounded-[2rem] border border-white/5"
              >
                <h3 className="text-xl font-display font-bold mb-6 text-white flex items-center gap-3">
                  <Globe className="text-emerald-400" size={20} /> Global Commerce Channels
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                      <Globe size={16} />
                    </div>
                    <h4 className="font-bold text-white text-sm mb-0.5">International</h4>
                    <p className="text-[10px] text-gray-400 font-mono">Stripe / PayPal / Wise / Crypto</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                      <CreditCard size={16} />
                    </div>
                    <h4 className="font-bold text-white text-sm mb-0.5">India Protocol</h4>
                    <p className="text-[10px] text-gray-400 font-mono">UPI / GPay / PhonePe / Paytm</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group sm:col-span-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                      <Building2 size={16} />
                    </div>
                    <h4 className="font-bold text-white text-sm mb-0.5">Corporate Wire</h4>
                    <p className="text-[10px] text-gray-400 font-mono">Direct Bank Transfer (NEFT / IMPS / SWIFT)</p>
                  </div>
                </div>
              </m.div>

              {/* Philosophy */}
              <m.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-gradient-to-br from-accent-blue/10 to-transparent p-8 rounded-[2rem] border border-accent-blue/20 relative overflow-hidden flex flex-col justify-center"
              >
                <div className="mb-4">
                  <ShieldCheck className="w-10 h-10 text-accent-blue" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-white">The Guarantee</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We deliver world-class digital products under impossible deadlines. 
                  <br/><br/>
                  This strict financial protocol ensures our engineering fleet remains 100% focused on architectural excellence, eliminating administrative friction and protecting both entities.
                </p>
              </m.div>
            </div>

            {/* CTA Section */}
            <m.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#0a0a14] to-[#0f0f1a] p-10 rounded-[2rem] border border-white/10 text-center relative overflow-hidden shadow-2xl mb-12"
            >
              {/* Decorative glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-accent-blue/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 tracking-tight">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-violet">Initiate?</span>
                </h2>
                <p className="text-sm text-gray-400 mb-8 max-w-xl mx-auto">
                  If our operational protocols align with your standards, we are ready to engineer your digital empire.
                </p>
                
                <div className="flex justify-center">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    <MagneticButton className="bg-white text-black hover:bg-gray-100 px-6 py-3 font-bold text-sm rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      Execute Protocol <ArrowRight size={16} />
                    </MagneticButton>
                  </a>
                </div>
              </div>
            </m.div>

            {/* Signature Verification Block */}
            <div className="border-t border-white/10 pt-10 mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 font-mono">
              {/* Signature Area */}
              <div className="space-y-2 text-white">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Authorized Signatures</div>
                <div className="flex gap-8 items-center font-mono">
                  <div className="text-sm italic font-serif text-accent-blue dark:text-accent-blue/90 border-b border-white/10 pb-1 pr-6 select-none">
                    Nexora Finance Officer
                  </div>
                </div>
                <div className="text-[9px] text-gray-500 font-mono">Nexora Treasury & Ledger Directorate</div>
              </div>

              {/* SHA Checksum Verification */}
              <div className="text-left sm:text-right space-y-1 font-mono">
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Protocol Registry Hash</div>
                <div className="text-[10px] text-gray-400 break-all max-w-xs font-mono">
                  SHA-256: 8a9c7d6b5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b
                </div>
                <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider flex items-center sm:justify-end gap-1 font-mono">
                  ✓ Protocol Ratified & Registered
                </div>
              </div>
            </div>

          </m.main>

        </div>
      </div>
    </div>
  );
}
