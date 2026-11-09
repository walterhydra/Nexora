"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  MessageSquare,
  Settings,
  X,
} from "lucide-react"
import { usePortal } from "@/lib/portal-context"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "assets", label: "Asset Vault", icon: FolderOpen },
  { id: "billing", label: "Billing & Invoice", icon: CreditCard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
] as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { activePage, setActivePage, setSidebarOpen } = usePortal()

  const handleNav = (id: string) => {
    setActivePage(id as any)
    setSidebarOpen(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#0A0A0F] border-r border-[#1E1E2E] w-60">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#1E1E2E]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm font-[var(--font-sora)]">N</span>
          </div>
          <span
            className="text-white font-bold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            NEXORAA
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-white transition-colors lg:hidden"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 px-3 py-4 space-y-1"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activePage === item.id
          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => handleNav(item.id)}
              whileHover={{ x: 3 }}
              className={cn(
                "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group text-left",
                isActive
                  ? "bg-indigo-500/10 text-white"
                  : "text-[#64748B] hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-indigo-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={18}
                className={cn(
                  "transition-colors duration-200 shrink-0",
                  isActive ? "text-indigo-400" : "text-[#64748B] group-hover:text-white"
                )}
              />
              <span className="font-[var(--font-inter)]">{item.label}</span>
              {item.id === "messages" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center">
                  5
                </span>
              )}
            </motion.button>
          )
        })}
      </motion.nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-[#1E1E2E]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-semibold">
              RP
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0A0A0F]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">Ramesh Patel</p>
            <p className="text-xs text-[#64748B] truncate">PatelMart Pvt. Ltd.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = usePortal()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <SidebarContent onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
