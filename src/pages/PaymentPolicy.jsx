import React, { useEffect } from 'react';
import { m } from 'framer-motion';
import { 
  CreditCard, Building2, Globe, ArrowRight, ShieldCheck, Zap, Lock, Mail
} from 'lucide-react';

export default function PaymentPolicy() {
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
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#00F5FF]">
            Financial Standards
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-950 dark:text-white tracking-tight mt-3">
            Payment Policy
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Our financial architecture is structured to ensure engineering speed, project transparency, and mutual milestone protection.
          </p>
        </m.header>

        {/* Document Body */}
        <m.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-12"
        >
          
          {/* Engagement Models */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              1. Engagement Models
            </h2>
            <div className="grid gap-6 md:grid-cols-2 mt-4">
              {/* Standard Model */}
              <div className="bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-2">Standard Execution</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">Structured for standard projects, high-impact landing layouts, and rapid web sprints.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 text-[#00F5FF] flex items-center justify-center font-bold text-sm">
                      50%
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">System Initiation</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">Secures project slot & starts development.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-150 dark:bg-white/5 text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold text-sm">
                      50%
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Final Handover</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">Settled prior to source transfer and live deployment.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Model */}
              <div className="bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-2">Enterprise Protocol</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">Structured for custom software, SaaS systems, and multi-phase deployments.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 text-[#00F5FF] flex items-center justify-center font-bold text-sm">
                      30%
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Architecture Kickoff</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">Settled upon contract execution.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-150 dark:bg-white/5 text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold text-sm">
                      40%
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Alpha Milestone</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">Settled upon baseline backend/UI integration review.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-150 dark:bg-white/5 text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold text-sm">
                      30%
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Production Release</h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">Settled before production release.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Non-Negotiables */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              2. Non-Negotiable Directives
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Zero-Start Protocol",
                  desc: "Absolutely no engineering, design drafts, or active development cycles commence until the initial system setup fee is verified in our database."
                },
                {
                  title: "Staging Containment",
                  desc: "All developments happen on Nexoraa secure staging servers. Source code repository access, IP transfers, and production launches are released exclusively upon final payment clearance."
                },
                {
                  title: "Phase-Locked Revisions",
                  desc: "Milestones and revision cycles are locked to their respective stages. We do not advance to subsequent execution blocks if preceding phase balances are outstanding."
                }
              ].map((rule) => (
                <div key={rule.title} className="p-5 rounded-2xl bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="sm:w-1/3 shrink-0 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <h4 className="text-sm font-bold text-gray-950 dark:text-white">{rule.title}</h4>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Commerce & Security */}
          <section className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              3. Secure Payments & Processing
            </h2>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              We process credit card transactions and direct transfers through authorized networks to maintain strict security:
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <div className="p-5 bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 rounded-2xl">
                <CreditCard className="text-[#00F5FF] mb-3" size={20} />
                <h3 className="text-sm font-bold text-gray-950 dark:text-white mb-1">Gateways</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Transactions are processed through Stripe or Razorpay, supporting major cards globally.</p>
              </div>
              <div className="p-5 bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 rounded-2xl">
                <Building2 className="text-[#00F5FF] mb-3" size={20} />
                <h3 className="text-sm font-bold text-gray-950 dark:text-white mb-1">Direct Bank Wire</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Supports corporate invoices and regional domestic bank transfers with formal routing details.</p>
              </div>
              <div className="p-5 bg-white dark:bg-white/[0.01] border border-gray-200 dark:border-white/5 rounded-2xl">
                <ShieldCheck className="text-[#00F5FF] mb-3" size={20} />
                <h3 className="text-sm font-bold text-gray-950 dark:text-white mb-1">Encryption</h3>
                <p className="text-xs text-gray-500 leading-relaxed">All transaction portals are protected by AES-256 SSL sockets to ensure complete client data privacy.</p>
              </div>
            </div>
          </section>

          {/* Contact Billing Block */}
          <section className="pt-8">
            <div className="relative overflow-hidden rounded-2xl bg-gray-950 border border-white/5 p-8 text-white">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00F5FF] uppercase tracking-wider">
                    <Mail size={14} />
                    Finance Operations
                  </div>
                  <h2 className="text-2xl font-display font-bold">Billing queries?</h2>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400 max-w-xl">
                    Reach out to our finance department at contact@nexoraa.works for copies of invoices or custom bank payment arrangements.
                  </p>
                </div>
                <a
                  href="mailto:contact@nexoraa.works?subject=Payment%20Inquiry"
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
