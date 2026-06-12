"use client"

import { motion } from "framer-motion"
import {
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  IndianRupee,
  TrendingUp,
} from "lucide-react"
import { invoices, paymentTimeline, project } from "@/lib/data"
import { AnimatedCounter } from "@/components/animated-counter"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

function fmt(n: number) {
  return "₹" + (n / 1000).toFixed(0) + "K"
}
function fmtFull(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

const statusConfig = {
  paid: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    label: "Paid",
  },
  pending: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    label: "Pending",
    pulse: true,
  },
  overdue: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/20",
    label: "Overdue",
    pulse: true,
  },
}

export function BillingPage() {
  const balance = project.budget - project.spent
  const paidPercent = Math.round((project.spent / project.budget) * 100)

  return (
    <motion.div
      key="billing"
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>
          Billing & Invoices
        </h1>
        <p className="text-[#64748B] text-sm mt-0.5">Track payments and download invoices</p>
      </motion.div>

      {/* Summary cards */}
      <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Total Project Value",
            sub: "Contract Value",
            value: project.budget,
            icon: IndianRupee,
            color: "text-white",
            bg: "bg-white/10",
            iconColor: "text-white",
          },
          {
            label: "Amount Paid",
            sub: `${paidPercent}% paid`,
            value: project.spent,
            icon: CheckCircle2,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            iconColor: "text-emerald-400",
          },
          {
            label: "Balance Due",
            sub: "Due Jul 15",
            value: balance,
            icon: AlertCircle,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            iconColor: "text-amber-400",
          },
        ].map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              variants={fadeUp}
              className="glass border border-[#1E1E2E] rounded-xl p-5 glow-hover transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#64748B] text-xs font-medium">{card.label}</span>
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", card.bg)}>
                  <Icon size={14} className={card.iconColor} />
                </div>
              </div>
              <p
                className={cn("text-2xl font-bold", card.color)}
                style={{ fontFamily: "var(--font-sora)" }}
              >
                <AnimatedCounter
                  target={card.value}
                  prefix="₹"
                  formatter={(v) => (v / 1000).toFixed(0) + "K"}
                />
              </p>
              <p className="text-[#64748B] text-xs mt-1">{card.sub}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Payment progress */}
      <motion.div variants={fadeUp} className="glass border border-[#1E1E2E] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-sm font-medium">Payment Progress</span>
          <span className="text-indigo-400 text-sm font-semibold font-mono">{paidPercent}%</span>
        </div>
        <div className="h-3 bg-[#1E1E2E] rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${paidPercent}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute inset-0 flex items-center"
          >
            <div
              className="h-full bg-amber-500/30 rounded-r-full"
              style={{ marginLeft: `${paidPercent}%`, width: `${100 - paidPercent}%` }}
            />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Paid: {fmtFull(project.spent)}
          </span>
          <span className="text-amber-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            Remaining: {fmtFull(balance)}
          </span>
        </div>
      </motion.div>

      {/* Two-column layout: Table + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Table */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <h2
            className="text-lg font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Invoices
          </h2>
          <div className="glass border border-[#1E1E2E] rounded-xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-[#1E1E2E] text-xs text-[#64748B] font-medium uppercase tracking-wider">
              <span>Invoice</span>
              <span className="hidden sm:block">Description</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Action</span>
            </div>
            {invoices.map((inv, i) => {
              const cfg = statusConfig[inv.status]
              return (
                <motion.div
                  key={inv.id}
                  variants={fadeUp}
                  className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 items-center px-4 py-3.5 border-b border-[#1E1E2E] last:border-0 hover:bg-white/2 transition-colors"
                >
                  <div>
                    <p className="text-white text-sm font-mono font-medium">{inv.id}</p>
                    <p className="text-[#64748B] text-xs">{inv.date}</p>
                  </div>
                  <p className="text-[#64748B] text-xs hidden sm:block truncate">{inv.description}</p>
                  <p className="text-white text-sm font-medium font-mono">{fmt(inv.amount)}</p>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap",
                      cfg.bg,
                      cfg.text,
                      cfg.border
                    )}
                  >
                    {cfg.label}
                  </span>
                  <button
                    onClick={() => toast.success(`Downloading ${inv.id}.pdf`)}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Download size={13} />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Payment Timeline */}
        <motion.div variants={fadeUp}>
          <h2
            className="text-lg font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Payment History
          </h2>
          <div className="space-y-0 relative">
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[#1E1E2E]" />
            {paymentTimeline.map((item, i) => {
              const isDone = item.status === "paid"
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 pb-5 relative"
                >
                  <div
                    className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center shrink-0 relative z-10 border-2",
                      isDone
                        ? "bg-emerald-500/20 border-emerald-500/40"
                        : "bg-amber-500/10 border-amber-500/30 status-pulse"
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <Clock size={16} className="text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-white text-sm font-medium">{item.label}</p>
                      <p
                        className={cn(
                          "text-sm font-semibold font-mono",
                          isDone ? "text-emerald-400" : "text-amber-400"
                        )}
                      >
                        {fmt(item.amount)}
                      </p>
                    </div>
                    <p className="text-[#64748B] text-xs mt-0.5">{item.date}</p>
                    <span
                      className={cn(
                        "inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 border",
                        isDone
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      )}
                    >
                      {isDone ? "Completed" : "Pending"}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
