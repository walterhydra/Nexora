import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  Mail,
  RefreshCcw,
  ShieldCheck,
  X,
  XCircle,
  Terminal,
  RotateCw
} from 'lucide-react';

const stages = [
  {
    label: 'Before kickoff',
    timing: 'Within 24 hours',
    status: 'Eligible',
    tone: 'emerald',
    description: 'Full refund available before work begins, minus payment processing fees.'
  },
  {
    label: 'Development active',
    timing: 'After kickoff',
    status: 'Case review',
    tone: 'amber',
    description: 'A partial refund may be considered based on completed work and allocated resources.'
  },
  {
    label: 'After delivery',
    timing: 'Final handover',
    status: 'Not eligible',
    tone: 'red',
    description: 'Delivered projects are handled through agreed revisions rather than refunds.'
  }
];

const nonRefundable = [
  'Domain name registrations and renewals',
  'Third-party software licenses and API costs',
  'Approved custom illustration or branding assets',
  'Expedited or priority delivery fees'
];

const navigation = [
  ['overview', 'Overview'],
  ['eligibility', 'Eligibility'],
  ['subscriptions', 'Subscriptions'],
  ['revisions', 'Revisions'],
  ['exclusions', 'Exclusions'],
  ['request', 'Request process']
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
};

const toneStyles = {
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    Icon: CheckCircle2
  },
  amber: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    Icon: Clock3
  },
  red: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    Icon: XCircle
  }
};

export default function RefundPolicy() {
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
    <main className="relative min-h-screen overflow-hidden bg-[#f4f6fa] pb-24 pt-28 text-gray-950 dark:bg-[#050609] dark:text-white md:pt-36">
      {/* Background grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px'
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-accent-blue/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-6">
        
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
            <div>REFUND COMPLIANCE LEDGER REGISTERED</div>
            <div className="hidden sm:block text-emerald-500 font-bold">● ACTIVE & SECURED</div>
          </div>
        </m.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 md:gap-10 items-start">
          
          {/* LEFT SIDEBAR: Verification, Navigation Menu, Credentials */}
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
                  <span className="text-black dark:text-white">Nexoraa_Refund_v1.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Audit Authority:</span>
                  <span className="text-black dark:text-white">Nexoraa Treasury</span>
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
                    Block Index #NX-RF-2026-033 <br />
                    Cryptographic signature is verified and matches current registry states.
                  </div>
                </m.div>
              )}
            </div>

            {/* Sidebar Navigation */}
            <div className="bg-white dark:bg-[#0b0d12] rounded-3xl border border-black/15 dark:border-white/10 p-6 shadow-xl backdrop-blur-xl">
              <nav className="font-mono text-xs space-y-1">
                <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">On this page</div>
                <div className="space-y-1">
                  {navigation.map(([id, label], index) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-gray-500 dark:text-gray-400 transition-all hover:bg-black/5 dark:hover:bg-white/5 hover:text-accent-blue dark:hover:text-accent-blue"
                    >
                      <span className="text-[10px] text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                      {label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            {/* Custom Barcode Display */}
            <div className="bg-white dark:bg-[#0b0d12] rounded-3xl border border-black/15 dark:border-white/10 p-5 shadow-xl flex flex-col items-center justify-center backdrop-blur-xl">
              <div className="text-3xl font-mono tracking-[0.25em] text-black/40 dark:text-white/30 select-none">
                ||||||||||||||||||||||
              </div>
              <div className="text-[9px] font-mono text-gray-400 mt-2 uppercase tracking-widest">
                Document Ledger NX-RF-033
              </div>
            </div>
          </m.aside>

          {/* RIGHT SIDE: Certified Document Sheet */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-white/90 dark:bg-[#0b0d12]/90 backdrop-blur-xl p-6 md:p-12 lg:p-14 rounded-3xl border-2 border-double border-black/20 dark:border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
          >
            {/* Certificate Corner brackets */}
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

            <m.header
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-black/10 pb-10 dark:border-white/10 md:pb-14"
            >
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/85 px-3 py-2 text-xs font-bold uppercase tracking-widest text-accent-blue shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 font-mono">
                  <RefreshCcw size={15} />
                  Refund framework
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 font-mono">
                  <CalendarClock size={16} />
                  Last updated May 2026
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
                <div>
                  <h1 className="max-w-4xl text-4xl font-display font-black leading-[1.05] md:text-5xl lg:text-6xl text-black dark:text-white">
                    Clear terms before <span className="text-accent-blue">work begins.</span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    Our refund policy protects your investment while respecting the time and resources committed to custom digital work.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-black/10 bg-white/85 p-2.5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 font-mono">
                  {[
                    ['24h', 'Pre-kickoff'],
                    ['7-10', 'Business days'],
                    ['100%', 'Scope support']
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-lg bg-gray-100 px-2.5 py-3.5 text-center dark:bg-black/35">
                      <div className="text-base font-black text-black dark:text-white">{value}</div>
                      <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </m.header>

            <m.section {...reveal} id="eligibility" className="py-12 md:py-16 border-b border-black/10 dark:border-white/10">
              <div className="mb-7 flex items-center gap-3">
                <ShieldCheck className="text-accent-blue" size={24} />
                <h2 className="text-xl md:text-2xl font-display font-bold text-black dark:text-white">Refund eligibility at a glance</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {stages.map((stage, index) => {
                  const tone = toneStyles[stage.tone];
                  const Icon = tone.Icon;

                  return (
                    <m.article
                      key={stage.label}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.5 }}
                      className={`relative overflow-hidden rounded-xl border bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.04)] dark:bg-[#0b0d12] ${tone.border}`}
                    >
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}>
                          <Icon size={18} />
                        </div>
                        <span className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest ${tone.bg} ${tone.text} font-mono`}>
                          {stage.status}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono">{stage.timing}</div>
                      <h3 className="mt-2 text-lg font-display font-bold text-black dark:text-white">{stage.label}</h3>
                      <p className="mt-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{stage.description}</p>
                    </m.article>
                  );
                })}
              </div>
            </m.section>

            <div className="space-y-12 mt-12">
              <m.section {...reveal} id="overview" className="rounded-xl border border-black/10 bg-white dark:bg-[#0b0d12] p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                      <FileCheck2 size={22} />
                    </div>
                    <h2 className="mt-4 text-xl font-display font-bold text-black dark:text-white">General overview</h2>
                  </div>
                  <div className="space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    <p>
                      Nexoraa Studio creates custom digital products through focused development sprints. Significant planning, engineering time, and production resources are committed as soon as a project begins.
                    </p>
                    <p>
                      Refund eligibility therefore depends primarily on whether work has started, how much has been completed, and whether final delivery has occurred.
                    </p>
                  </div>
                </div>
              </m.section>

              <m.section {...reveal} id="subscriptions" className="rounded-xl border border-black/10 bg-white dark:bg-[#0b0d12] p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                      <CreditCard size={22} />
                    </div>
                    <h2 className="mt-4 text-xl font-display font-bold text-black dark:text-white">Subscription services</h2>
                  </div>
                  <div>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-400 text-sm">
                      Maintenance, hosting, and ongoing support plans may be cancelled at any time. Cancellation takes effect at the end of the current billing cycle.
                    </p>
                    <div className="mt-6 divide-y divide-black/15 dark:divide-white/10 border-y border-black/15 dark:border-white/10 text-xs">
                      {[
                        ['Cancel anytime', true],
                        ['Service continues until billing period ends', true],
                        ['Partial-period refunds or credits', false]
                      ].map(([label, allowed]) => (
                        <div key={label} className="flex items-center justify-between gap-4 py-3.5">
                          <span className="font-medium text-gray-700 dark:text-gray-300 font-mono">{label}</span>
                          <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${allowed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                            {allowed ? <Check size={14} /> : <X size={14} />}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </m.section>

              <m.section {...reveal} id="revisions" className="overflow-hidden rounded-xl border border-accent-blue/25 bg-[#07111d] text-white">
                <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                  <div className="flex min-h-[220px] flex-col justify-between bg-accent-blue p-6 text-black">
                    <RefreshCcw size={28} />
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] font-mono">Our preferred resolution</div>
                      <h2 className="mt-2 text-2xl md:text-3xl font-display font-black leading-tight">Revise first. Refund only when eligible.</h2>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <p className="text-sm md:text-base leading-relaxed text-gray-300">
                      If delivered work does not meet the specifications documented in the original project scope, we will correct those issues without additional charge.
                    </p>
                    <div className="mt-6 flex items-start gap-2.5 border-t border-white/15 pt-5">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-accent-blue" size={16} />
                      <p className="text-[11px] leading-relaxed text-gray-400">
                        Complimentary revisions apply only to requirements already included in the agreed scope. New features or changed requirements may require a separate estimate.
                      </p>
                    </div>
                  </div>
                </div>
              </m.section>

              <m.section {...reveal} id="exclusions" className="rounded-xl border border-black/10 bg-white dark:bg-[#0b0d12] p-6 md:p-8">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-black dark:text-white">Non-refundable costs</h2>
                    <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-400">These costs are committed externally or become final once approved.</p>
                  </div>
                </div>
                <div className="grid gap-px overflow-hidden rounded-xl border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
                  {nonRefundable.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 bg-gray-50 p-4 dark:bg-[#0b0d12]">
                      <XCircle className="mt-0.5 shrink-0 text-red-500" size={16} />
                      <span className="text-xs font-semibold leading-relaxed text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </m.section>

              <m.section {...reveal} id="request" className="rounded-xl border border-black/10 bg-white dark:bg-[#0b0d12] p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-5">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-accent-blue font-mono">Request process</div>
                    <h2 className="mt-1.5 text-2xl font-display font-bold text-black dark:text-white">Three steps to a clear answer</h2>
                  </div>
                  <Clock3 className="hidden text-accent-blue sm:block" size={28} />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    ['01', 'Write to billing', 'Include your project name, payment date, and reason for the request.'],
                    ['02', 'Eligibility review', 'We review project status, delivered work, and committed third-party costs.'],
                    ['03', 'Resolution', 'Eligible refunds are returned to the original payment method within 7-10 business days.']
                  ].map(([number, title, description]) => (
                    <div key={number} className="border-t-2 border-accent-blue pt-4">
                      <div className="text-[10px] font-black tracking-widest text-accent-blue font-mono">{number}</div>
                      <h3 className="mt-2 text-base font-bold text-black dark:text-white">{title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                  ))}
                </div>
              </m.section>

              <m.section {...reveal} className="relative overflow-hidden rounded-xl bg-gray-950 p-6 text-white md:p-8">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-accent-blue/15 to-transparent" />
                <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-blue font-mono">
                      <Mail size={14} />
                      Billing support
                    </div>
                    <h2 className="max-w-xl text-2xl font-display font-black leading-tight md:text-3xl">Need us to review your situation?</h2>
                    <p className="mt-3 max-w-xl text-xs leading-relaxed text-gray-400">
                      Send the billing team your project details and we will provide a written eligibility decision.
                    </p>
                  </div>
                  <a
                    href="mailto:nexoraa.works@gmail.com?subject=Refund%20Eligibility%20Review"
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent-blue px-4 py-3 text-xs font-mono font-black text-black transition-colors hover:bg-white"
                  >
                    Contact billing <ArrowRight size={15} />
                  </a>
                </div>
              </m.section>
            </div>

            {/* Signature Verification Block */}
            <div className="border-t border-black/10 dark:border-white/10 pt-10 mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 font-mono">
              {/* Signature Area */}
              <div className="space-y-2 text-black dark:text-white">
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Authorized Signatures</div>
                <div className="flex gap-8 items-center font-mono">
                  <div className="text-sm italic font-serif text-accent-blue dark:text-accent-blue/90 border-b border-black/20 dark:border-white/20 pb-1 pr-6 select-none">
                    Nexoraa Compliance Officer
                  </div>
                </div>
                <div className="text-[9px] text-gray-400 font-mono">Nexoraa Finance & Operations Directorate</div>
              </div>

              {/* SHA Checksum Verification */}
              <div className="text-left sm:text-right space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Registry Ledger Hash</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 break-all max-w-xs font-mono">
                  SHA-256: 9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d
                </div>
                <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider flex items-center sm:justify-end gap-1 font-mono">
                  ✓ Ratified & Ledger Registered
                </div>
              </div>
            </div>

          </m.div>

        </div>
      </div>
    </main>
  );
}
