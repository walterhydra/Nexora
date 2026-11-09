"use client"

import { motion } from "framer-motion"
import { Search, Plus, ChevronRight, Menu, LogOut, User, Settings } from "lucide-react"
import { useState } from "react"
import { usePortal } from "@/lib/portal-context"
import { NotificationPanel } from "./notification-panel"
import { toast } from "sonner"

const pageLabels: Record<string, string> = {
  overview: "Overview",
  assets: "Asset Vault",
  billing: "Billing & Invoice",
  messages: "Messages",
  settings: "Settings",
}

export function TopNavbar() {
  const { activePage, setCommandOpen, setRequestModalOpen, setSidebarOpen } = usePortal()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 h-14 bg-[#0A0A0F]/80 backdrop-blur-lg border-b border-[#1E1E2E] shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-[#64748B] hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
          <span className="text-[#64748B]">Projects</span>
          <ChevronRight size={14} className="text-[#64748B]" />
          <motion.span
            key={activePage}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-medium relative group cursor-default"
          >
            {pageLabels[activePage]}
            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </motion.span>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search (CMD+K) */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1E1E2E] text-[#64748B] text-sm hover:text-white hover:border-[#6366F1]/40 transition-all duration-200 group"
        >
          <Search size={14} />
          <span className="text-xs">Search</span>
          <kbd className="ml-1 px-1.5 py-0.5 rounded bg-[#1E1E2E] text-[10px] font-mono">⌘K</kbd>
        </button>

        {/* New Request */}
        <motion.button
          onClick={() => setRequestModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">New Request</span>
        </motion.button>

        {/* Notifications */}
        <NotificationPanel />

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-semibold hover:ring-2 hover:ring-indigo-500/40 transition-all"
          >
            RP
          </button>
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute right-0 top-10 w-44 bg-[#111118] border border-[#1E1E2E] rounded-xl shadow-2xl z-40 py-1 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-[#1E1E2E]">
                  <p className="text-xs font-semibold text-white">Ramesh Patel</p>
                  <p className="text-xs text-[#64748B]">ramesh@patelmart.com</p>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#64748B] hover:text-white hover:bg-white/5 transition-colors text-left">
                  <User size={13} />
                  Profile
                </button>
                <button
                  onClick={() => { toast.info("Settings coming right up!"); setDropdownOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#64748B] hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <Settings size={13} />
                  Settings
                </button>
                <button
                  onClick={() => { toast.info("Logged out"); setDropdownOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
                >
                  <LogOut size={13} />
                  Logout
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
