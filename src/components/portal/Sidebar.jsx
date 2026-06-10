import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  MessageSquare,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { usePortal } from "./PortalContext";
import { cn } from "../../utils/cn";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "deliverables", label: "Asset Vault", icon: FolderOpen },
  { id: "invoices", label: "Billing & Invoice", icon: CreditCard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function SidebarContent({ onClose, clientInfo, onSignOut }) {
  const { activePage, setActivePage, setSidebarOpen } = usePortal();

  const handleNav = (id) => {
    setActivePage(id);
    setSidebarOpen(false);
  };

  const initials = clientInfo?.client_name
    ? clientInfo.client_name.split(" ").map((n) => n[0]).join("")
    : "AC";

  return (
    <div className="flex flex-col h-full bg-[#05050A]/90 backdrop-blur-3xl border-r border-white/[0.05] w-64 shadow-[10px_0_40px_rgba(0,0,0,0.5)]">
      {/* Logo Area */}
      <div className="flex items-center justify-between px-6 py-8 border-b border-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-xl" />
            <img src="/logo/favicon.png" alt="Nexora" className="relative w-11 h-11 rounded-xl border border-white/[0.1] object-cover shadow-2xl shadow-blue-500/20" />
          </div>
          <div>
            <span className="text-white font-black text-lg tracking-[0.15em] font-sans block leading-none mb-1">
              NEXORA
            </span>
            <span className="text-[9px] text-blue-400 font-bold tracking-[0.2em] uppercase">
              Client Portal
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 px-4 py-8 space-y-2 overflow-y-auto client-portal-scrollbar"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id || (activePage === 'projects' && item.id === 'overview');
          return (
            <motion.button
              key={item.id}
              variants={itemVariants}
              onClick={() => handleNav(item.id)}
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 group text-left",
                isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-200"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border border-blue-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300",
                isActive ? "bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-white/[0.02] text-gray-500 group-hover:bg-white/[0.05]"
              )}>
                <Icon size={16} className={isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"} />
              </div>
              <span className="font-sans relative z-10">{item.label}</span>
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                />
              )}
            </motion.button>
          );
        })}
      </motion.nav>

      {/* User Section */}
      <div className="p-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.05] backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}>
              {clientInfo?.avatar_url ? (
                <img 
                  src={clientInfo.avatar_url} 
                  alt={clientInfo.client_name} 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  className="shadow-lg shadow-blue-500/25 border border-white/[0.1]" 
                />
              ) : (
                <div 
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  className="bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-blue-500/25"
                >
                  {initials}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-[3px] border-[#05050A] shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-bold truncate">{clientInfo?.client_name || "Client"}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase truncate mt-0.5">{clientInfo?.company_name || "Workspace"}</p>
            </div>
          </div>
          
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
            >
              <LogOut size={14} />
              <span className="uppercase tracking-wider">Secure Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ clientInfo, onSignOut }) {
  const { sidebarOpen, setSidebarOpen } = usePortal();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen sticky top-0 shrink-0 z-30">
        <SidebarContent clientInfo={clientInfo} onSignOut={onSignOut} />
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
              className="fixed inset-0 bg-[#030407]/80 backdrop-blur-md z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <SidebarContent
                clientInfo={clientInfo}
                onSignOut={onSignOut}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
