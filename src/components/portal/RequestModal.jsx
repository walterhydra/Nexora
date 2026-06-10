import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Paperclip, Loader2, CheckCircle2 } from "lucide-react"
import { usePortal } from "./PortalContext"
import toast from "react-hot-toast"

const priorities = ["Low", "Medium", "High"]

const requestTypes = [
  "Bug Report",
  "Feature Request",
  "Design Change",
  "Content Update",
  "Performance Issue",
  "Other",
]

export function RequestModal() {
  const { requestModalOpen, setRequestModalOpen } = usePortal()
  const [priority, setPriority] = useState("Medium")
  const [type, setType] = useState("Feature Request")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!subject.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRequestModalOpen(false)
      setSubject("")
      setDescription("")
      toast.success("Request submitted successfully!")
    }, 1000)
  }

  return (
    <AnimatePresence>
      {requestModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setRequestModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#111118] border border-[#1E1E2E] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E1E2E]">
              <h2
                className="text-white font-semibold text-base"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Submit a New Request
              </h2>
              <button
                onClick={() => setRequestModalOpen(false)}
                className="text-[#64748B] hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Type */}
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Request Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#1E1E2E] border border-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500/60 transition-colors"
                >
                  {requestTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your request..."
                  className="w-full bg-[#1E1E2E] border border-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500/60 transition-colors placeholder-[#64748B]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about your request..."
                  rows={3}
                  className="w-full bg-[#1E1E2E] border border-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500/60 transition-colors placeholder-[#64748B] resize-none"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Priority</label>
                <div className="flex gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border bg-transparent cursor-pointer ${
                        priority === p
                          ? p === "High"
                            ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                            : p === "Medium"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                            : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : "text-[#64748B] border-[#1E1E2E] hover:border-[#2a2a3e]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attach */}
              <button 
                onClick={() => toast("Attachments coming soon!", { icon: "📎" })}
                className="flex items-center gap-2 text-xs text-[#64748B] hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
              >
                <Paperclip size={14} />
                <span>Attach files</span>
              </button>
            </div>

            <div className="px-5 pb-5">
              <button
                onClick={handleSubmit}
                disabled={!subject.trim() || loading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/25 border-0 cursor-pointer"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : submitted ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : null}
                {loading ? "Submitting..." : submitted ? "Submitted!" : "Submit Request"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
