import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, ChevronRight, Menu, LogOut, User, Settings, Sparkles } from "lucide-react";
import { usePortal } from "./PortalContext";
import { NotificationPanel } from "./NotificationPanel";
import toast from "react-hot-toast";

const pageLabels = {
  overview: "Mission Control",
  projects: "Mission Control",
  deliverables: "Asset Vault",
  invoices: "Billing & Invoice",
  messages: "Communications",
  settings: "Settings",
};

export default function TopNavbar({ clientInfo, onSignOut }) {
  const { activePage, setCommandOpen, setRequestModalOpen, setSidebarOpen } = usePortal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initials = clientInfo?.client_name
    ? clientInfo.client_name.split(" ").map((n) => n[0]).join("")
    : "AC";

  return (
    <header className={`sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 h-20 transition-all duration-300 shrink-0 ${
      scrolled 
        ? "bg-[#030407]/80 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
        : "bg-transparent border-b border-transparent"
    }`}>
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <span className="text-gray-500 font-medium tracking-wide">Workspace</span>
          <ChevronRight size={14} className="text-gray-600" />
          <div className="relative group">
            <motion.span
              key={activePage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-bold tracking-wide relative inline-block"
            >
              {pageLabels[activePage] || "Overview"}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.span>
          </div>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search (CMD+K) */}
        <button
          onClick={() => setCommandOpen(true)}
          className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-gray-400 text-sm hover:text-white hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300 group"
        >
          <Search size={16} className="group-hover:text-blue-400 transition-colors" />
          <span className="text-xs font-medium tracking-wide mr-4">Search Anything...</span>
          <kbd className="px-2 py-1 rounded bg-[#030407] border border-white/[0.05] text-[10px] font-mono text-gray-500 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors shadow-inner">
            ⌘K
          </kbd>
        </button>

        {/* New Request - Premium CTA */}
        <motion.button
          onClick={() => setRequestModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] overflow-hidden border border-blue-400/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
          <Plus size={16} className="relative z-10" />
          <span className="hidden sm:inline relative z-10 tracking-wider uppercase">New Request</span>
        </motion.button>

        <div className="w-px h-8 bg-white/[0.08] mx-1 hidden sm:block" />

        {/* Notifications */}
        <NotificationPanel />

        {/* Avatar Dropdown */}
        <div className="relative ml-1">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}
            className="relative group outline-none shrink-0"
          >
            <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-md group-hover:bg-blue-400/60 transition-colors" />
            {clientInfo?.avatar_url ? (
              <img 
                src={clientInfo.avatar_url} 
                alt="Profile" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                className="relative shadow-lg border border-white/10" 
              />
            ) : (
              <div 
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                className="relative bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-sm font-black shadow-lg border border-white/10 uppercase"
              >
                {initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-[3px] border-[#030407] z-10" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute right-0 top-14 w-56 bg-[#0A0A0F]/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-40 overflow-hidden"
                >
                  <div className="px-5 py-4 bg-white/[0.02] border-b border-white/[0.05]">
                    <p className="text-sm font-bold text-white tracking-wide truncate">{clientInfo?.client_name || "Client"}</p>
                    <p className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold truncate mt-1">{clientInfo?.email || "workspace"}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => { toast("Profile controls inside Settings tab"); setDropdownOpen(false) }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all text-left"
                    >
                      <User size={16} />
                      Profile settings
                    </button>
                    <button
                      onClick={() => { toast("Appearance settings inside Settings tab"); setDropdownOpen(false) }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all text-left"
                    >
                      <Settings size={16} />
                      Preferences
                    </button>
                  </div>
                  {onSignOut && (
                    <div className="p-2 border-t border-white/[0.05] bg-red-500/[0.02]">
                      <button
                        onClick={() => { onSignOut(); setDropdownOpen(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left uppercase tracking-wider"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
