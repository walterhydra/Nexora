"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Bell,
  Shield,
  Palette,
  AlertTriangle,
  Camera,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  Laptop,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type Tab = "profile" | "notifications" | "security" | "appearance" | "danger"

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
]

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <motion.button
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-300",
        checked ? "bg-indigo-600" : "bg-[#1E1E2E]"
      )}
      aria-checked={checked}
      role="switch"
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
      />
    </motion.button>
  )
}

function ProfileTab() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState("Ramesh Patel")
  const [phone, setPhone] = useState("+91 98765 43210")
  const [bio, setBio] = useState("Founder & CEO at PatelMart Pvt. Ltd.")

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSaving(false)
    setSaved(true)
    toast.success("Profile saved!")
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-white text-2xl font-bold">
            RP
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors">
            <Camera size={12} />
          </button>
        </div>
        <div>
          <p className="text-white text-sm font-medium">Profile Photo</p>
          <p className="text-[#64748B] text-xs mt-0.5">Drag & drop or click to upload</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Display Name" value={name} onChange={setName} />
        <FormField label="Email" value="ramesh@patelmart.com" readOnly />
        <FormField label="Phone" value={phone} onChange={setPhone} type="tel" />
        <FormField label="Company" value="PatelMart Pvt. Ltd." readOnly />
      </div>
      <div>
        <label className="block text-xs text-[#64748B] font-medium mb-1.5">Bio / Notes</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full bg-[#1E1E2E] border border-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500/60 transition-colors resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/20"
      >
        {saving ? (
          <Loader2 size={15} className="animate-spin" />
        ) : saved ? (
          <CheckCircle2 size={15} className="text-emerald-400" />
        ) : null}
        {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  )
}

function FormField({
  label,
  value,
  onChange,
  readOnly,
  type = "text",
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs text-[#64748B] font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        className={cn(
          "w-full bg-[#1E1E2E] border border-[#2a2a3e] text-sm rounded-lg px-3 py-2 outline-none transition-colors",
          readOnly
            ? "text-[#64748B] cursor-not-allowed"
            : "text-white focus:border-indigo-500/60"
        )}
      />
    </div>
  )
}

function NotificationsTab() {
  const [settings, setSettings] = useState({
    email: true,
    inApp: true,
    invoiceReminders: true,
    messageAlerts: false,
    projectUpdates: true,
  })

  const toggles: { key: keyof typeof settings; label: string; desc: string }[] = [
    { key: "email", label: "Email notifications", desc: "Receive updates via email" },
    { key: "inApp", label: "In-app notifications", desc: "Show notifications in the portal" },
    { key: "invoiceReminders", label: "Invoice reminders", desc: "Get alerted before payment due dates" },
    { key: "messageAlerts", label: "Message alerts", desc: "Notify for new messages" },
    { key: "projectUpdates", label: "Project updates", desc: "Status changes and milestone completions" },
  ]

  return (
    <div className="space-y-3">
      {toggles.map(({ key, label, desc }) => (
        <div
          key={key}
          className="flex items-center justify-between p-4 rounded-xl bg-[#111118] border border-[#1E1E2E]"
        >
          <div>
            <p className="text-white text-sm font-medium">{label}</p>
            <p className="text-[#64748B] text-xs mt-0.5">{desc}</p>
          </div>
          <Toggle
            checked={settings[key]}
            onChange={(v) => {
              setSettings((prev) => ({ ...prev, [key]: v }))
              toast.success(`${label} ${v ? "enabled" : "disabled"}`)
            }}
          />
        </div>
      ))}
    </div>
  )
}

function SecurityTab() {
  const [showPw, setShowPw] = useState(false)
  const [current, setCurrent] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirm, setConfirm] = useState("")
  const [twoFa, setTwoFa] = useState(false)

  const sessions = [
    { device: "MacBook Pro", location: "Mumbai, India", last: "Active now", current: true },
    { device: "iPhone 15 Pro", location: "Mumbai, India", last: "2 hours ago", current: false },
    { device: "iPad Air", location: "Mumbai, India", last: "3 days ago", current: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-sm font-semibold mb-3">Change Password</h3>
        <div className="space-y-3">
          {[
            { label: "Current Password", value: current, onChange: setCurrent },
            { label: "New Password", value: newPw, onChange: setNewPw },
            { label: "Confirm New Password", value: confirm, onChange: setConfirm },
          ].map(({ label, value, onChange }) => (
            <div key={label} className="relative">
              <label className="block text-xs text-[#64748B] font-medium mb-1.5">{label}</label>
              <input
                type={showPw ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#1E1E2E] border border-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 pr-10 outline-none focus:border-indigo-500/60 transition-colors"
              />
            </div>
          ))}
          <button
            onClick={() => {
              if (newPw !== confirm) { toast.error("Passwords do not match"); return }
              toast.success("Password updated!")
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Update Password
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white text-sm font-semibold">Two-Factor Authentication</h3>
            <p className="text-[#64748B] text-xs mt-0.5">Add an extra layer of security</p>
          </div>
          <Toggle checked={twoFa} onChange={(v) => { setTwoFa(v); toast.success(`2FA ${v ? "enabled" : "disabled"}`) }} />
        </div>
        {twoFa && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 rounded-xl bg-[#111118] border border-[#1E1E2E] flex items-center gap-4"
          >
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-3 gap-0.5 p-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className={cn("w-4 h-4 rounded-sm", i % 3 !== 1 ? "bg-black" : "bg-white border border-gray-200")} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-white text-xs font-medium">Scan with authenticator</p>
              <p className="text-[#64748B] text-xs mt-1">Use Google Authenticator or Authy</p>
            </div>
          </motion.div>
        )}
      </div>

      <div>
        <h3 className="text-white text-sm font-semibold mb-3">Active Sessions</h3>
        <div className="space-y-2">
          {sessions.map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#111118] border border-[#1E1E2E]">
              <div className="flex items-center gap-3">
                <Monitor size={16} className="text-[#64748B]" />
                <div>
                  <p className="text-white text-xs font-medium flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">Current</span>
                    )}
                  </p>
                  <p className="text-[#64748B] text-xs">{session.location} · {session.last}</p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => toast.info("Session revoked")}
                  className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AppearanceTab() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  const [accent, setAccent] = useState("indigo")

  const themes = [
    { id: "dark", label: "Dark", icon: Moon },
    { id: "light", label: "Light", icon: Sun },
    { id: "system", label: "System", icon: Laptop },
  ] as const

  const accents = [
    { id: "indigo", color: "bg-indigo-500" },
    { id: "cyan", color: "bg-cyan-500" },
    { id: "purple", color: "bg-purple-500" },
    { id: "emerald", color: "bg-emerald-500" },
    { id: "orange", color: "bg-orange-500" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-sm font-semibold mb-3">Theme</h3>
        <div className="flex gap-3">
          {themes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setTheme(id); toast.info(`${label} theme selected`) }}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-200",
                theme === id
                  ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                  : "bg-[#111118] border-[#1E1E2E] text-[#64748B] hover:text-white hover:border-[#2a2a3e]"
              )}
            >
              <Icon size={18} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white text-sm font-semibold mb-3">Accent Color</h3>
        <div className="flex gap-3">
          {accents.map((a) => (
            <button
              key={a.id}
              onClick={() => { setAccent(a.id); toast.info(`${a.id} accent selected`) }}
              className={cn(
                "w-9 h-9 rounded-full transition-all duration-200",
                a.color,
                accent === a.id && "ring-2 ring-white ring-offset-2 ring-offset-[#0A0A0F] scale-110"
              )}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white text-sm font-semibold mb-1.5">Language</h3>
        <select className="w-48 bg-[#1E1E2E] border border-[#2a2a3e] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500/60">
          <option>English (US)</option>
          <option>Hindi</option>
          <option>Gujarati</option>
        </select>
      </div>
    </div>
  )
}

function DangerZoneTab() {
  const [deleteText, setDeleteText] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-500/5">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white text-sm font-semibold">Delete Account</h3>
            <p className="text-[#64748B] text-xs mt-1 leading-relaxed">
              Once you request account deletion, all your data will be permanently removed.
              This action cannot be undone.
            </p>
          </div>
        </div>
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-sm font-medium border border-rose-500/20 transition-all duration-200"
          >
            Request Account Deletion
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-[#64748B] text-xs">
              Type <span className="text-rose-400 font-mono font-bold">DELETE</span> to confirm:
            </p>
            <input
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full bg-[#1E1E2E] border border-rose-500/30 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-rose-500/60 transition-colors placeholder-[#64748B] font-mono"
            />
            <div className="flex gap-2">
              <button
                disabled={deleteText !== "DELETE"}
                onClick={() => {
                  if (deleteText === "DELETE") {
                    toast.error("Account deletion requested")
                    setShowConfirm(false)
                    setDeleteText("")
                  }
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-all"
              >
                Confirm Deletion
              </button>
              <button
                onClick={() => { setShowConfirm(false); setDeleteText("") }}
                className="px-4 py-2 rounded-lg bg-[#1E1E2E] text-[#64748B] hover:text-white text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

const tabContent = {
  profile: ProfileTab,
  notifications: NotificationsTab,
  security: SecurityTab,
  appearance: AppearanceTab,
  danger: DangerZoneTab,
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const Content = tabContent[activeTab]

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>
          Settings
        </h1>
        <p className="text-[#64748B] text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Tab sidebar */}
        <div className="sm:w-44 shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                    isActive
                      ? "bg-indigo-500/10 text-white"
                      : "text-[#64748B] hover:text-white hover:bg-white/5",
                    tab.id === "danger" && !isActive && "hover:text-rose-400 hover:bg-rose-500/10",
                    tab.id === "danger" && isActive && "bg-rose-500/10 text-rose-400"
                  )}
                >
                  <Icon
                    size={15}
                    className={cn(
                      isActive
                        ? tab.id === "danger"
                          ? "text-rose-400"
                          : "text-indigo-400"
                        : ""
                    )}
                  />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="glass border border-[#1E1E2E] rounded-2xl p-5"
            >
              <Content />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
