import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  Rocket,
  MessageSquare,
  Paperclip,
  Info,
  X,
  Bell,
} from "lucide-react"
import { usePortal } from "./PortalContext"
import { notifications as initialNotifs } from "./portalData"
import { cn } from "../../utils/cn"

const iconMap = {
  check: CheckCircle2,
  rocket: Rocket,
  message: MessageSquare,
  paperclip: Paperclip,
  info: Info,
}

const colorMap = {
  payment: "text-emerald-400",
  dev: "text-indigo-400",
  message: "text-cyan-400",
  files: "text-amber-400",
  update: "text-blue-400",
}

export function NotificationPanel() {
  const { notifOpen, setNotifOpen } = usePortal()
  const [notifs, setNotifs] = useState(initialNotifs)

  const unreadCount = notifs.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setNotifOpen(!notifOpen)}
        className="relative w-9 h-9 rounded-lg bg-[#111118] border border-[#1E1E2E] flex items-center justify-center text-[#64748B] hover:text-white hover:border-[#6366F1]/40 transition-all duration-200"
        aria-label="Notifications"
      >
        <Bell size={17} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {notifOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setNotifOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute right-0 top-11 w-80 bg-[#111118] border border-[#1E1E2E] rounded-xl shadow-2xl z-40 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E1E2E]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-sora)" }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-xs font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors bg-transparent border-0 cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="text-[#64748B] hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[#1E1E2E]">
                {notifs.slice(0, 5).map((notif, i) => {
                  const Icon = iconMap[notif.icon] || Info
                  const color = colorMap[notif.type] || "text-indigo-400"
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition-colors cursor-pointer",
                        !notif.read && "bg-indigo-500/5"
                      )}
                    >
                      <div className={cn("shrink-0 mt-0.5", color)}>
                        <Icon size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-xs leading-relaxed", notif.read ? "text-[#64748B]" : "text-white")}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-[#64748B] mt-0.5">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      )}
                    </motion.div>
                  )
                })}
              </div>

              <div className="px-4 py-2.5 border-t border-[#1E1E2E]">
                <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors w-full text-center bg-transparent border-0 cursor-pointer">
                  View all notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
