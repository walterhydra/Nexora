"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Search,
  Grid3x3,
  List,
  Folder,
  MoreHorizontal,
  Download,
  Copy,
  Eye,
  CheckCircle2,
  FolderOpen,
  FileText,
  Film,
  Archive,
  Image as ImageIcon,
  File,
} from "lucide-react"
import { assetFiles, folders } from "@/lib/data"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

type FileType = "all" | "images" | "documents" | "videos" | "other"

function getFileIcon(type: string) {
  switch (type) {
    case "pdf":
      return { icon: FileText, color: "text-rose-400", bg: "bg-rose-500/10" }
    case "zip":
      return { icon: Archive, color: "text-amber-400", bg: "bg-amber-500/10" }
    case "png":
    case "jpg":
    case "jpeg":
      return { icon: ImageIcon, color: "text-blue-400", bg: "bg-blue-500/10" }
    case "mp4":
    case "mov":
      return { icon: Film, color: "text-purple-400", bg: "bg-purple-500/10" }
    case "fig":
      return { icon: File, color: "text-indigo-400", bg: "bg-indigo-500/10" }
    default:
      return { icon: File, color: "text-[#64748B]", bg: "bg-[#1E1E2E]" }
  }
}

function filterByType(type: FileType, fileType: string): boolean {
  if (type === "all") return true
  if (type === "images") return ["png", "jpg", "jpeg"].includes(fileType)
  if (type === "documents") return ["pdf", "fig", "doc", "docx"].includes(fileType)
  if (type === "videos") return ["mp4", "mov", "avi"].includes(fileType)
  if (type === "other") return ["zip", "rar"].includes(fileType)
  return true
}

function DownloadButton({ filename }: { filename: string }) {
  const [state, setState] = useState<"idle" | "downloading" | "done">("idle")

  const handleDownload = () => {
    if (state !== "idle") return
    setState("downloading")
    setTimeout(() => {
      setState("done")
      toast.success(`${filename} downloaded`)
      setTimeout(() => setState("idle"), 2000)
    }, 1200)
  }

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1E1E2E] hover:bg-indigo-500/20 text-[#64748B] hover:text-indigo-400 text-xs transition-all duration-200"
    >
      {state === "downloading" ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        >
          <Download size={12} />
        </motion.div>
      ) : state === "done" ? (
        <CheckCircle2 size={12} className="text-emerald-400" />
      ) : (
        <Download size={12} />
      )}
      <span className="hidden sm:inline">{state === "done" ? "Done" : "Download"}</span>
    </button>
  )
}

function FileCard({ file }: { file: typeof assetFiles[0] }) {
  const { icon: Icon, color, bg } = getFileIcon(file.type)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass border border-[#1E1E2E] rounded-xl p-4 group glow-hover transition-all duration-300 relative"
    >
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", bg)}>
        <Icon size={20} className={color} />
      </div>
      <p className="text-white text-sm font-medium truncate mb-1">{file.name}</p>
      <p className="text-[#64748B] text-xs mb-3">
        {file.size} · {file.date}
      </p>
      <div className="flex items-center gap-2">
        <DownloadButton filename={file.name} />
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-7 h-7 rounded-lg bg-[#1E1E2E] hover:bg-white/10 text-[#64748B] hover:text-white flex items-center justify-center transition-colors"
          >
            <MoreHorizontal size={14} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -5 }}
                  className="absolute left-0 top-8 w-36 bg-[#111118] border border-[#1E1E2E] rounded-xl shadow-2xl z-40 py-1 overflow-hidden"
                >
                  {[
                    { icon: Eye, label: "Preview" },
                    { icon: Download, label: "Download" },
                    { icon: Copy, label: "Copy Link" },
                  ].map(({ icon: ItemIcon, label }) => (
                    <button
                      key={label}
                      onClick={() => { toast.info(label); setMenuOpen(false) }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#64748B] hover:text-white hover:bg-white/5 transition-colors text-left"
                    >
                      <ItemIcon size={12} />
                      {label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function FileRow({ file }: { file: typeof assetFiles[0] }) {
  const { icon: Icon, color, bg } = getFileIcon(file.type)

  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/3 transition-colors group border border-transparent hover:border-[#1E1E2E]"
    >
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", bg)}>
        <Icon size={15} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{file.name}</p>
        <p className="text-[#64748B] text-xs">{file.folder}</p>
      </div>
      <span className="text-[#64748B] text-xs hidden sm:block">{file.size}</span>
      <span className="text-[#64748B] text-xs hidden md:block">{file.date}</span>
      <DownloadButton filename={file.name} />
    </motion.div>
  )
}

export function AssetVaultPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<FileType>("all")
  const [search, setSearch] = useState("")

  const filtered = assetFiles.filter(
    (f) =>
      filterByType(filter, f.type) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  )

  const usedGb = 4.2
  const totalGb = 10
  const usedPercent = (usedGb / totalGb) * 100

  return (
    <motion.div
      key="assets"
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-5"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>
            Asset Vault
          </h1>
          <p className="text-[#64748B] text-sm mt-0.5">All project files in one place</p>
        </div>
        <button
          onClick={() => toast.info("Upload feature coming soon")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
        >
          <Upload size={15} />
          Upload File
        </button>
      </motion.div>

      {/* Storage bar */}
      <motion.div variants={fadeUp} className="glass border border-[#1E1E2E] rounded-xl px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#64748B]">Storage Usage</span>
          <span className="text-xs text-white font-medium font-mono">
            {usedGb} GB of {totalGb} GB used
          </span>
        </div>
        <div className="h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${usedPercent}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />
        </div>
      </motion.div>

      {/* Folders */}
      <motion.div variants={fadeUp}>
        <h2 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-3">Folders</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {folders.map((folder, i) => (
            <motion.button
              key={folder.id}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -2 }}
              className="glass border border-[#1E1E2E] rounded-xl p-3 flex flex-col items-start gap-2 glow-hover transition-all duration-300 text-left"
            >
              <FolderOpen size={20} className={folder.color} />
              <div>
                <p className="text-white text-xs font-medium truncate w-full">{folder.name}</p>
                <p className="text-[#64748B] text-xs">{folder.count} files</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 p-1 bg-[#111118] border border-[#1E1E2E] rounded-lg">
          {(["all", "images", "documents", "videos", "other"] as FileType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all duration-200",
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "text-[#64748B] hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-xs flex items-center gap-2 px-3 py-1.5 bg-[#111118] border border-[#1E1E2E] rounded-lg">
          <Search size={14} className="text-[#64748B] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="flex-1 bg-transparent text-white text-xs placeholder-[#64748B] outline-none"
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              view === "grid" ? "bg-indigo-600 text-white" : "text-[#64748B] hover:text-white bg-[#111118] border border-[#1E1E2E]"
            )}
          >
            <Grid3x3 size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              view === "list" ? "bg-indigo-600 text-white" : "text-[#64748B] hover:text-white bg-[#111118] border border-[#1E1E2E]"
            )}
          >
            <List size={14} />
          </button>
        </div>
      </motion.div>

      {/* Files */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#1E1E2E] flex items-center justify-center">
              <FolderOpen size={28} className="text-[#64748B]" />
            </div>
            <div className="text-center">
              <p className="text-white text-sm font-medium mb-1">No files found</p>
              <p className="text-[#64748B] text-xs">
                Your project assets will appear here.
              </p>
            </div>
            <button
              onClick={() => toast.info("Upload feature coming soon")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              <Upload size={14} />
              Upload Files
            </button>
          </motion.div>
        ) : view === "grid" ? (
          <motion.div
            key="grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="glass border border-[#1E1E2E] rounded-xl overflow-hidden divide-y divide-[#1E1E2E]"
          >
            {filtered.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
