import { useEffect } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f6fa] pb-24 pt-28 text-gray-950 dark:bg-[#050609] dark:text-white md:pt-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px'
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-accent-blue/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-6">
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-black/10 pb-10 dark:border-white/10 md:pb-14"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/85 px-3 py-2 text-xs font-bold uppercase tracking-widest text-accent-blue shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <RefreshCcw size={15} />
              Refund framework
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <CalendarClock size={16} />
              Last updated May 2026
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-display font-black leading-[0.98] md:text-7xl lg:text-8xl">
                Clear terms before <span className="text-accent-blue">work begins.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                Our refund policy protects your investment while respecting the time and resources committed to custom digital work.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-lg border border-black/10 bg-white/85 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              {[
                ['24h', 'Pre-kickoff'],
                ['7-10', 'Business days'],
                ['100%', 'Scope support']
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg bg-gray-100 px-3 py-4 text-center dark:bg-black/35">
                  <div className="text-xl font-black">{value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        <motion.section {...reveal} id="eligibility" className="py-12 md:py-16">
          <div className="mb-7 flex items-center gap-3">
            <ShieldCheck className="text-accent-blue" size={24} />
            <h2 className="text-2xl font-display font-bold md:text-3xl">Refund eligibility at a glance</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {stages.map((stage, index) => {
              const tone = toneStyles[stage.tone];
              const Icon = tone.Icon;

              return (
                <motion.article
                  key={stage.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className={`relative overflow-hidden rounded-lg border bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.07)] dark:bg-[#0b0d12] ${tone.border}`}
                >
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}>
                      <Icon size={21} />
                    </div>
                    <span className={`rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-widest ${tone.bg} ${tone.text}`}>
                      {stage.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stage.timing}</div>
                  <h3 className="mt-2 text-2xl font-display font-bold">{stage.label}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{stage.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 border-l border-black/10 pl-5 dark:border-white/10">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">On this page</div>
              <div className="space-y-1">
                {navigation.map(([id, label], index) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-white hover:text-accent-blue dark:text-gray-400 dark:hover:bg-white/5"
                  >
                    <span className="text-[10px] text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="space-y-6">
            <motion.section {...reveal} id="overview" className="rounded-lg border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b0d12] md:p-8">
              <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                    <FileCheck2 size={24} />
                  </div>
                  <h2 className="mt-5 text-2xl font-display font-bold">General overview</h2>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  <p>
                    Nexora Studio creates custom digital products through focused development sprints. Significant planning, engineering time, and production resources are committed as soon as a project begins.
                  </p>
                  <p>
                    Refund eligibility therefore depends primarily on whether work has started, how much has been completed, and whether final delivery has occurred.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section {...reveal} id="subscriptions" className="rounded-lg border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b0d12] md:p-8">
              <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                    <CreditCard size={24} />
                  </div>
                  <h2 className="mt-5 text-2xl font-display font-bold">Subscription services</h2>
                </div>
                <div>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                    Maintenance, hosting, and ongoing support plans may be cancelled at any time. Cancellation takes effect at the end of the current billing cycle.
                  </p>
                  <div className="mt-6 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
                    {[
                      ['Cancel anytime', true],
                      ['Service continues until billing period ends', true],
                      ['Partial-period refunds or credits', false]
                    ].map(([label, allowed]) => (
                      <div key={label} className="flex items-center justify-between gap-4 py-4">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${allowed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                          {allowed ? <Check size={17} /> : <X size={17} />}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section {...reveal} id="revisions" className="overflow-hidden rounded-lg border border-accent-blue/25 bg-[#07111d] text-white shadow-[0_20px_70px_rgba(15,23,42,0.16)]">
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="flex min-h-[280px] flex-col justify-between bg-accent-blue p-7 text-black md:p-8">
                  <RefreshCcw size={34} />
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.2em]">Our preferred resolution</div>
                    <h2 className="mt-3 text-4xl font-display font-black leading-tight">Revise first. Refund only when eligible.</h2>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-7 md:p-9">
                  <p className="text-lg leading-relaxed text-gray-300">
                    If delivered work does not meet the specifications documented in the original project scope, we will correct those issues without additional charge.
                  </p>
                  <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-6">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-accent-blue" size={20} />
                    <p className="text-sm leading-relaxed text-gray-400">
                      Complimentary revisions apply only to requirements already included in the agreed scope. New features or changed requirements may require a separate estimate.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section {...reveal} id="exclusions" className="rounded-lg border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b0d12] md:p-8">
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                  <AlertTriangle size={23} />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">Non-refundable costs</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">These costs are committed externally or become final once approved.</p>
                </div>
              </div>
              <div className="grid gap-px overflow-hidden rounded-lg border border-black/10 bg-black/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
                {nonRefundable.map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-gray-50 p-5 dark:bg-[#0b0d12]">
                    <XCircle className="mt-0.5 shrink-0 text-red-500" size={18} />
                    <span className="text-sm font-medium leading-relaxed text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section {...reveal} id="request" className="rounded-lg border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b0d12] md:p-8">
              <div className="mb-8 flex items-center justify-between gap-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent-blue">Request process</div>
                  <h2 className="mt-2 text-3xl font-display font-bold">Three steps to a clear answer</h2>
                </div>
                <Clock3 className="hidden text-accent-blue sm:block" size={34} />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['01', 'Write to billing', 'Include your project name, payment date, and reason for the request.'],
                  ['02', 'Eligibility review', 'We review project status, delivered work, and committed third-party costs.'],
                  ['03', 'Resolution', 'Eligible refunds are returned to the original payment method within 7-10 business days.']
                ].map(([number, title, description]) => (
                  <div key={number} className="border-t-2 border-accent-blue pt-5">
                    <div className="text-xs font-black tracking-widest text-accent-blue">{number}</div>
                    <h3 className="mt-3 text-lg font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section {...reveal} className="relative overflow-hidden rounded-lg bg-gray-950 p-7 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] md:p-10">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-accent-blue/15 to-transparent" />
              <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-blue">
                    <Mail size={15} />
                    Billing support
                  </div>
                  <h2 className="max-w-xl text-3xl font-display font-black leading-tight md:text-5xl">Need us to review your situation?</h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-gray-400">
                    Send the billing team your project details and we will provide a written eligibility decision.
                  </p>
                </div>
                <a
                  href="mailto:nexoraa.works@gmail.com?subject=Refund%20Eligibility%20Review"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent-blue px-5 py-3.5 text-sm font-bold text-black transition-colors hover:bg-white"
                >
                  Contact billing <ArrowRight size={18} />
                </a>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
