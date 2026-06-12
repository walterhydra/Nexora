"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  MessageSquare,
  Settings,
  Plus,
  Download,
  ArrowRight,
} from "lucide-react"
import { usePortal } from "@/lib/portal-context"
import { cn } from "@/lib/utils"

const allItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, group: "Jump to", type: "nav" },
  { id: "assets", label: "Asset Vault", icon: FolderOpen, group: "Jump to", type: "nav" },
  { id: "billing", label: "Billing & Invoice", icon: CreditCard, group: "Jump to", type: "nav" },
  { id: "messages", label: "Messages", icon: MessageSquare, group: "Jump to", type: "nav" },
  { id: "settings", label: "Settings", icon: Settings, group: "Jump to", type: "nav" },
  { id: "new-request", label: "Add New Request", icon: Plus, group: "Actions", type: "action" },
  { id: "download-invoice", label: "Download Latest Invoice", icon: Download, group: "Actions", type: "action" },
]

const recentItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "billing", label: "Invoice #003", icon: CreditCard },
]

export function CommandPalette() {
  const { commandOpen, setCommandOpen, setActivePage, setRequestModalOpen } = usePortal()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen(!commandOpen)
      }
      if (e.key === "Escape") setCommandOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [commandOpen, setCommandOpen])

  useEffect(() => {
    if (commandOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setSelected(0)
    }
  }, [commandOpen])

  const filtered = query
    ? allItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : allItems

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
    acc[item.group] = [...(acc[item.group] || []), item]
    return acc
  }, {})

  const flatFiltered = Object.values(grouped).flat()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!commandOpen) return
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, flatFiltered.length - 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      }
      if (e.key === "Enter") {
        const item = flatFiltered[selected]
        if (item) handleSelect(item)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [commandOpen, selected, flatFiltered])

  const handleSelect = (item: (typeof allItems)[0]) => {
    if (item.type === "nav") {
      setActivePage(item.id as any)
      setCommandOpen(false)
    } else if (item.id === "new-request") {
      setRequestModalOpen(true)
      setCommandOpen(false)
    } else {
      setCommandOpen(false)
    }
  }

  let itemIndex = 0

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          onClick={() => setCommandOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#111118] border border-[#1E1E2E] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1E1E2E]">
              <Search size={16} className="text-[#64748B] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
                placeholder="Search pages, files, actions..."
                className="flex-1 bg-transparent text-white text-sm placeholder-[#64748B] outline-none font-[var(--font-inter)]"
              />
              <kbd className="px-1.5 py-0.5 rounded bg-[#1E1E2E] text-[#64748B] text-xs font-mono">ESC</kbd>
            </div>

            <div className="max-h-72 overflow-y-auto py-2">
              {!query && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-[#64748B] font-medium mb-2 uppercase tracking-wider">Recent</p>
                  {recentItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActivePage(item.id as any); setCommandOpen(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-[#64748B] hover:text-white transition-colors text-sm text-left"
                      >
                        <Icon size={15} />
                        <span>{item.label}</span>
                        <ArrowRight size={13} className="ml-auto opacity-40" />
                      </button>
                    )
                  })}
                </div>
              )}

              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="px-4 pb-2">
                  <p className="text-xs text-[#64748B] font-medium mb-1 uppercase tracking-wider">{group}</p>
                  {items.map((item) => {
                    const Icon = item.icon
                    const idx = itemIndex++
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm text-left",
                          selected === idx
                            ? "bg-indigo-500/20 text-white"
                            : "text-[#64748B] hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon size={15} className={selected === idx ? "text-indigo-400" : ""} />
                        <span>{item.label}</span>
                        <ArrowRight size={13} className="ml-auto opacity-40" />
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="px-4 py-2 border-t border-[#1E1E2E] flex items-center gap-3 text-xs text-[#64748B]">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> select</span>
              <span><kbd className="font-mono">esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
