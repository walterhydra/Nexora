import React, { useEffect } from 'react';
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
  X,
  XCircle
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

const toneStyles = {
  emerald: {
    border: 'border-emerald-500/20 dark:border-emerald-500/10',
    bg: 'bg-emerald-500/5 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    Icon: CheckCircle2
  },
  amber: {
    border: 'border-amber-500/20 dark:border-amber-500/10',
    bg: 'bg-amber-500/5 dark:bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    Icon: Clock3
  },
  red: {
    border: 'border-red-500/20 dark:border-red-500/10',
    bg: 'bg-red-500/5 dark:bg-red-500/10',
    text: 'text-red-600 dark:text-red-400',
    Icon: XCircle
  }
};

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#f8fafc] dark:bg-[#0A0A0B] text-gray-800 dark:text-gray-300 transition-colors duration-300 font-sans relative overflow-hidden">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Document Header */}
        <m.header 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-gray-200 dark:border-white/10 pb-8 mb-12"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#00F5FF]">
              Refund & Cancellation Framework
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
              <CalendarClock size={14} />
              Last updated: May 2026
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-950 dark:text-white tracking-tight mt-3">
            Refund Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Our refund policy protects your investment while respecting the time, design draft cycles, and production engineering resources committed to custom digital solutions.
          </p>
        </m.header>

        {/* Document Body */}
        <m.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-12"
        >
          {/* Eligibility Matrix */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              1. Refund Eligibility at a Glance
            </h2>
            <div className="grid gap-4 md:grid-cols-3 mt-4">
              {stages.map((stage) => {
                const style = toneStyles[stage.tone];
                const Icon = style.Icon;

                return (
                  <div
                    key={stage.label}
                    className={`relative overflow-hidden rounded-2xl border p-5 bg-white dark:bg-white/[0.01] shadow-sm ${style.border}`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.bg} ${style.text}`}>
                        <Icon size={16} />
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
                        {stage.status}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stage.timing}</div>
                    <h3 className="mt-2 text-base font-bold text-gray-950 dark:text-white">{stage.label}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">{stage.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* General Overview */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              2. General Overview
            </h2>
            <div className="text-base leading-relaxed text-gray-600 dark:text-gray-400 space-y-4">
              <p>
                Nexoraa Studio creates premium custom digital products through rapid sprints. Significant strategic planning, UI mockup drafting, and server infrastructure provisioning are committed as soon as a project is initiated.
              </p>
              <p>
                Refund eligibility therefore depends primarily on the current phase of execution, what milestones have been delivered, and what third-party overheads have been committed.
              </p>
            </div>
          </section>

          {/* Subscriptions */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              3. Subscription Services
            </h2>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Ongoing plans, including maintenance retaining cycles, edge hosting, and Priority Support packages, can be cancelled at any time:
            </p>
            <div className="bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 rounded-2xl p-5 divide-y divide-gray-150 dark:divide-white/5 text-sm max-w-xl">
              {[
                ['Cancel anytime', true],
                ['Service continues until billing period ends', true],
                ['Partial-period refunds or credits', false]
              ].map(([label, allowed]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="text-gray-700 dark:text-gray-300 font-mono text-xs">{label}</span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${allowed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {allowed ? <Check size={12} /> : <X size={12} />}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Revisions & Reductions */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              4. Revisions Framework
            </h2>
            <div className="bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-gray-950 dark:text-white">Our Primary Resolution Protocol</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                If custom delivered assets do not match the parameters documented in the initial project scope agreement, we will correct the issues without additional charge. Revisions apply strictly to requirements already defined in the kickoff scope.
              </p>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              5. Non-Refundable Expenses
            </h2>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Certain operational expenses are committed externally and cannot be recovered under any refund event:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              {nonRefundable.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 p-4 rounded-xl shadow-sm">
                  <XCircle className="mt-0.5 shrink-0 text-red-500" size={16} />
                  <span className="text-xs font-semibold leading-relaxed text-gray-800 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Request Process */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              6. Request Process
            </h2>
            <div className="grid gap-6 md:grid-cols-3 mt-4">
              {[
                ['01', 'Write to billing', 'Include your company/project name, agreement details, and request reason.'],
                ['02', 'Eligibility review', 'Nexoraa reviews active project milestone states and committed expenses.'],
                ['03', 'Resolution', 'Ratified decision amounts are returned to the original payment gate within 7-10 business days.']
              ].map(([number, title, description]) => (
                <div key={number} className="border-t border-[#00F5FF]/50 pt-4 space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#00F5FF] tracking-widest">{number}</div>
                  <h3 className="text-base font-bold text-gray-950 dark:text-white">{title}</h3>
                  <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Billing Block */}
          <section className="pt-8">
            <div className="relative overflow-hidden rounded-2xl bg-gray-950 border border-white/5 p-8 text-white">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00F5FF] uppercase tracking-wider">
                    <Mail size={14} />
                    Billing Resolution
                  </div>
                  <h2 className="text-2xl font-display font-bold">Have an eligibility question?</h2>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400 max-w-xl">
                    Reach out to our billing team directly at contact@nexoraa.works with your active project details.
                  </p>
                </div>
                <a
                  href="mailto:contact@nexoraa.works?subject=Refund%20Eligibility%20Review"
                  className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-[#00F5FF] px-5 py-3 text-xs font-mono font-bold text-black transition-colors"
                >
                  Contact Billing <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>
        </m.article>
      </div>
    </div>
  );
}
