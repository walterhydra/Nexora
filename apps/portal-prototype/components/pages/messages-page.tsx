"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Paperclip,
  Hash,
  Pin,
  Bold,
  Italic,
  Link2,
  SmilePlus,
  ChevronLeft,
} from "lucide-react"
import { channels, messages as allMessages } from "@/lib/data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import type { Message } from "@/lib/data"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

function MessageBubble({ msg }: { msg: Message }) {
  const isOwn = msg.sender === "Ramesh Patel"

  if (msg.type === "system") {
    return (
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px bg-[#1E1E2E]" />
        <span className="text-xs text-[#64748B] italic px-2">{msg.content}</span>
        <div className="flex-1 h-px bg-[#1E1E2E]" />
      </div>
    )
  }

  return (
    <motion.div
      variants={fadeUp}
      className={cn("flex items-start gap-3 group", isOwn && "flex-row-reverse")}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0",
          msg.color
        )}
      >
        {msg.initials}
      </div>
      <div className={cn("max-w-sm", isOwn && "items-end flex flex-col")}>
        <div className={cn("flex items-baseline gap-2 mb-1", isOwn && "flex-row-reverse")}>
          <span className="text-white text-xs font-semibold">{msg.sender}</span>
          <span className="text-[#64748B] text-[10px]">{msg.time}</span>
        </div>
        <div
          className={cn(
            "px-3 py-2 rounded-2xl text-sm leading-relaxed",
            isOwn
              ? "bg-indigo-600 text-white rounded-tr-sm"
              : "bg-[#111118] border border-[#1E1E2E] text-white rounded-tl-sm"
          )}
        >
          {msg.content}
        </div>
        {msg.reactions.length > 0 && (
          <div className={cn("flex gap-1 mt-1.5", isOwn && "flex-row-reverse")}>
            {msg.reactions.map((r, i) => (
              <button
                key={i}
                className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#1E1E2E] hover:bg-[#2a2a3e] text-xs transition-colors border border-[#2a2a3e]"
              >
                <span>{r.emoji}</span>
                <span className="text-[#64748B] text-[10px]">{r.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
        AS
      </div>
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-tl-sm bg-[#111118] border border-[#1E1E2E]">
        <span className="text-[#64748B] text-xs italic mr-1">Nexoraa team is typing</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#64748B] typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#64748B] typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#64748B] typing-dot" />
      </div>
    </div>
  )
}

export function MessagesPage() {
  const [activeChannel, setActiveChannel] = useState(1)
  const [input, setInput] = useState("")
  const [showTyping, setShowTyping] = useState(false)
  const [msgs, setMsgs] = useState(allMessages)
  const [showChannels, setShowChannels] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChannel, msgs[activeChannel]])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg: Message = {
      id: Date.now(),
      sender: "Ramesh Patel",
      initials: "RP",
      color: "bg-amber-500",
      content: input,
      time: "Now",
      type: "user",
      reactions: [],
    }
    setMsgs((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }))
    setInput("")
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      const reply: Message = {
        id: Date.now() + 1,
        sender: "Anjali Singh",
        initials: "AS",
        color: "bg-violet-500",
        content: "Thanks for your message! We'll get back to you shortly.",
        time: "Now",
        type: "user",
        reactions: [],
      }
      setMsgs((prev) => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), reply],
      }))
    }, 2500)
  }

  const currentMsgs = msgs[activeChannel] || []

  return (
    <motion.div
      key="messages"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-3.5rem-2rem)] min-h-[500px] flex rounded-2xl overflow-hidden border border-[#1E1E2E] glass"
    >
      {/* Channel list */}
      <div
        className={cn(
          "w-56 shrink-0 border-r border-[#1E1E2E] flex flex-col",
          "hidden sm:flex"
        )}
      >
        <div className="px-4 py-3 border-b border-[#1E1E2E]">
          <p className="text-xs text-[#64748B] font-medium uppercase tracking-wider">Channels</p>
        </div>
        <div className="flex-1 py-2 overflow-y-auto">
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={cn(
                "w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors text-left",
                activeChannel === ch.id
                  ? "bg-indigo-500/10 text-white"
                  : "text-[#64748B] hover:text-white hover:bg-white/5"
              )}
            >
              <Hash size={14} className={activeChannel === ch.id ? "text-indigo-400" : ""} />
              <span className="flex-1 truncate">{ch.name}</span>
              {ch.unread > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center">
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-[#1E1E2E]">
          <button className="flex items-center gap-2 text-xs text-[#64748B] hover:text-white transition-colors">
            <Pin size={12} />
            Pinned Files
          </button>
        </div>
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1E1E2E] shrink-0">
          <button
            onClick={() => setShowChannels(true)}
            className="sm:hidden text-[#64748B] hover:text-white transition-colors mr-1"
          >
            <ChevronLeft size={18} />
          </button>
          <Hash size={15} className="text-[#64748B]" />
          <span
            className="text-white font-semibold text-sm"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            {channels.find((c) => c.id === activeChannel)?.name}
          </span>
          <div className="flex-1" />
          <div className="flex -space-x-2">
            {["bg-indigo-500", "bg-cyan-500", "bg-emerald-500"].map((c, i) => (
              <div
                key={i}
                className={cn("w-6 h-6 rounded-full border-2 border-[#111118]", c)}
              />
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {currentMsgs.map((msg) => (
              <div key={msg.id} className="mb-4">
                <MessageBubble msg={msg} />
              </div>
            ))}
          </motion.div>
          <AnimatePresence>
            {showTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 shrink-0">
          <div className="bg-[#111118] border border-[#1E1E2E] rounded-xl overflow-hidden focus-within:border-indigo-500/40 transition-colors">
            {/* Toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-[#1E1E2E]">
              {[Bold, Italic, Link2, SmilePlus, Paperclip].map((Icon, i) => (
                <button
                  key={i}
                  onClick={() => toast.info("Formatting coming soon")}
                  className="w-6 h-6 rounded flex items-center justify-center text-[#64748B] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
            <div className="flex items-end gap-2 p-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder={`Message #${channels.find((c) => c.id === activeChannel)?.name}...`}
                rows={1}
                className="flex-1 bg-transparent text-white text-sm placeholder-[#64748B] outline-none resize-none leading-relaxed"
                style={{ minHeight: "24px", maxHeight: "120px" }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors shrink-0"
              >
                <Send size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
