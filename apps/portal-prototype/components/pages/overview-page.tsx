"use client"

import { motion } from "framer-motion"
import {
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Globe,
  Shield,
  CheckCircle2,
  Circle,
  Clock3,
  Loader,
  CalendarDays,
} from "lucide-react"
import { project, teamMembers, milestones } from "@/lib/data"
import { AnimatedCounter } from "@/components/animated-counter"
import { cn } from "@/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function ProjectHeroCard() {
  const start = new Date("2025-03-10")
  const end = new Date("2025-07-30")
  const now = new Date("2025-06-10")
  const total = end.getTime() - start.getTime()
  const elapsed = now.getTime() - start.getTime()
  const timeProgress = Math.round((elapsed / total) * 100)

  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      className="glass rounded-2xl p-5 sm:p-6 glow-hover transition-all duration-300 border border-[#1E1E2E]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1
              className="text-2xl sm:text-3xl font-bold text-white text-balance"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              {project.name}
            </h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-[#64748B] text-sm leading-relaxed max-w-xl">
            {project.overview}
          </p>
        </div>
      </div>

      {/* Domain info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <DomainItem icon={Globe} label="Domain" value={project.domain} />
        <DomainItem icon={Shield} label="Registrar" value={project.registrar} />
        <DomainItem icon={CalendarDays} label="Domain Expiry" value={project.domainExpiry} />
        <DomainItem
          icon={CheckCircle2}
          label="SSL Status"
          value={project.sslStatus}
          valueClass="text-emerald-400"
        />
      </div>

      {/* Timeline bar */}
      <div>
        <div className="flex justify-between text-xs text-[#64748B] mb-2">
          <span>{project.startDate}</span>
          <span className="text-white font-medium">{project.progress}% Complete</span>
          <span>{project.deadline}</span>
        </div>
        <div className="relative h-2 bg-[#1E1E2E] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: `${timeProgress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#0A0A0F] shadow-md"
            style={{ marginLeft: "-6px" }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[#64748B] mt-1">
          <span>Start</span>
          <span>Today ({timeProgress}% elapsed)</span>
          <span>Deadline</span>
        </div>
      </div>
    </motion.div>
  )
}

function DomainItem({
  icon: Icon,
  label,
  value,
  valueClass,
}: {
  icon: any
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={14} className="text-[#64748B] mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] text-[#64748B] uppercase tracking-wider">{label}</p>
        <p className={cn("text-xs text-white font-medium truncate", valueClass)}>{value}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    "In Progress": {
      bg: "bg-indigo-500/20",
      text: "text-indigo-300",
      dot: "bg-indigo-400",
    },
    Completed: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-300",
      dot: "bg-emerald-400",
    },
    "On Hold": {
      bg: "bg-amber-500/20",
      text: "text-amber-300",
      dot: "bg-amber-400",
    },
  }[status] ?? { bg: "bg-gray-500/20", text: "text-gray-300", dot: "bg-gray-400" }

  return (
    <span className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium", config.bg, config.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full status-pulse", config.dot)} />
      {status}
    </span>
  )
}

function StatsRow() {
  const stats = [
    {
      icon: Users,
      label: "Team Members",
      sub: "Active",
      value: project.teamSize,
      suffix: "",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      icon: Clock,
      label: "Days Left",
      sub: "Est. July 30",
      value: project.daysLeft,
      suffix: "",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      icon: DollarSign,
      label: "Budget",
      sub: "Spent so far",
      value: project.spent,
      prefix: "₹",
      formatter: (v: number) => (v / 1000).toFixed(0) + "K",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: TrendingUp,
      label: "Progress",
      sub: "Complete",
      value: project.progress,
      suffix: "%",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ]

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            custom={i}
            className="glass rounded-xl p-4 border border-[#1E1E2E] glow-hover transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.bg)}>
                <Icon size={16} className={stat.color} />
              </div>
            </div>
            <p className={cn("text-2xl font-bold", stat.color, "font-[var(--font-sora)]")}>
              <AnimatedCounter
                target={stat.value}
                prefix={stat.prefix ?? ""}
                suffix={stat.suffix ?? ""}
                formatter={stat.formatter}
              />
            </p>
            <p className="text-white text-xs font-medium mt-0.5">{stat.label}</p>
            <p className="text-[#64748B] text-xs">{stat.sub}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function TeamSection() {
  return (
    <motion.div variants={fadeUp} custom={5}>
      <h2
        className="text-lg font-semibold text-white mb-4"
        style={{ fontFamily: "var(--font-sora)" }}
      >
        Team Members
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.id}
            variants={fadeUp}
            custom={i * 0.5}
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass border border-[#1E1E2E] rounded-xl p-4 flex items-start gap-3 glow-hover transition-all duration-300 cursor-default"
          >
            <div className="relative shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold",
                  member.color
                )}
              >
                {member.initials}
              </div>
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#111118]",
                  member.online ? "bg-emerald-500" : "bg-[#64748B]"
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{member.name}</p>
              <p className="text-[#64748B] text-xs mb-2">{member.role}</p>
              <div className="flex flex-wrap gap-1">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-1.5 py-0.5 rounded bg-[#1E1E2E] text-[#64748B] text-[10px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function MilestoneTimeline() {
  const statusIcon = {
    completed: <CheckCircle2 size={16} className="text-emerald-400" />,
    "in-progress": <Loader size={16} className="text-indigo-400 animate-spin" />,
    upcoming: <Clock3 size={16} className="text-[#64748B]" />,
  }

  const statusColor = {
    completed: "border-emerald-500/30 bg-emerald-500/5",
    "in-progress": "border-indigo-500/40 bg-indigo-500/5",
    upcoming: "border-[#1E1E2E] bg-transparent",
  }

  return (
    <motion.div variants={fadeUp} custom={6}>
      <h2
        className="text-lg font-semibold text-white mb-4"
        style={{ fontFamily: "var(--font-sora)" }}
      >
        Project Milestones
      </h2>
      <div className="space-y-3">
        {milestones.map((m, i) => (
          <motion.div
            key={m.id}
            variants={fadeUp}
            custom={i * 0.3}
            className={cn(
              "glass border rounded-xl p-4 transition-all duration-300",
              statusColor[m.status]
            )}
          >
            <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                {statusIcon[m.status]}
                <span className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-sora)" }}>
                  Phase {m.id}: {m.phase}
                </span>
                {m.status === "in-progress" && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                    In Progress
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#64748B]">
                <span>{m.dateRange}</span>
                <span className="hidden sm:inline">{m.assignee}</span>
                <span
                  className={cn(
                    "font-medium font-mono",
                    m.status === "completed"
                      ? "text-emerald-400"
                      : m.status === "in-progress"
                      ? "text-indigo-400"
                      : "text-[#64748B]"
                  )}
                >
                  {m.progress}%
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + i * 0.1 }}
                className={cn(
                  "h-full rounded-full",
                  m.status === "completed"
                    ? "bg-emerald-500"
                    : m.status === "in-progress"
                    ? "bg-indigo-500"
                    : "bg-[#64748B]"
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function OverviewPage() {
  return (
    <motion.div
      key="overview"
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      <ProjectHeroCard />
      <StatsRow />
      <TeamSection />
      <MilestoneTimeline />
    </motion.div>
  )
}
