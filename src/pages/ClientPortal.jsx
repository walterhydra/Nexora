import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Activity, Clock, FileText, CheckCircle2, ChevronRight, Lock,
  Code2, Zap, Download, LayoutDashboard, CreditCard, Settings,
  LogOut, Mail, Key, Globe, Search, Bell, Terminal, Users, CheckSquare, File, MessageCircle, MoreHorizontal, HelpCircle, Receipt, History, X, Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_DATA = {
  client: "Nova Corp",
  project: "E-Commerce Replatforming",
  status: "In Progress",
  velocity: 94, // out of 100
  timeline: [
    { id: 1, title: "Discovery & Architecture", status: "completed", date: "Oct 1" },
    { id: 2, title: "UI/UX Design System", status: "completed", date: "Oct 3" },
    { id: 3, title: "Frontend Development", status: "in-progress", date: "Oct 5" },
    { id: 4, title: "Backend Integration", status: "pending", date: "Oct 7" },
    { id: 5, title: "QA & Launch", status: "pending", date: "Oct 8" }
  ],
  invoices: [
    { id: "INV-001", amount: "$15,000", status: "Paid", date: "Sep 28" },
    { id: "INV-002", amount: "$10,000", status: "Pending", date: "Oct 8" }
  ],
  team: [
    { name: "Milan", role: "Lead Engineer", avatar: "/team/milan.png", email: "milan@nexora.com", status: "Online" },
    { name: "Abhishek", role: "UI/UX Designer", avatar: "/team/abhishek.png", email: "abhishek@nexora.com", status: "In a meeting" },
    { name: "Gaurav", role: "Project Manager", avatar: "/team/gaurav.png", email: "gaurav@nexora.com", status: "Online" }
  ],
  actionItems: [
    { id: 1, task: "Review new homepage animations", assignee: "Client", due: "Today", details: "Please review the new Framer Motion animations on the homepage hero section. Let us know if the timing feels right." },
    { id: 2, task: "Provide Stripe API keys", assignee: "Client", due: "Tomorrow", details: "We need the production Stripe keys to finalize the checkout flow testing." },
    { id: 3, task: "Finalize product taxonomy", assignee: "Client", due: "Oct 6", details: "Confirm the nested category structure for the new store catalog." }
  ],
  recentFiles: [
    { name: "Design_System_v2.fig", type: "Figma", size: "12 MB" },
    { name: "Architecture_Diagram.pdf", type: "PDF", size: "2.4 MB" },
    { name: "Sprint_2_Report.docx", type: "Doc", size: "1.1 MB" }
  ],
  billing: {
    totalBudget: "$25,000",
    paid: "$15,000",
    outstanding: "$10,000",
    nextInvoiceDue: "Oct 15",
  },
  supportTickets: [
    { id: "TIC-102", subject: "API Integration Request", status: "Open", priority: "High", messages: [{ sender: "Client", text: "We need to connect the new CRM to the lead form." }, { sender: "Agent", text: "Got it! Looking into the endpoints now." }] },
    { id: "TIC-101", subject: "Update Logo Assets", status: "Resolved", priority: "Low", messages: [{ sender: "Agent", text: "Logo has been updated in the header." }] }
  ],
  activityLog: [
    { action: "Pushed frontend code to staging", time: "2 hours ago", author: "Alex R." },
    { action: "Client approved wireframes", time: "Yesterday", author: "Nova Corp" },
    { action: "Paid Invoice INV-001", time: "2 days ago", author: "Nova Corp" }
  ]
};

// SVG Google Icon
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleFakeGoogleLogin = () => {
    setIsGoogleLoading(true);
    const popup = window.open('', 'Google Sign In', 'width=500,height=600,left=200,top=200');
    if (popup) {
      popup.document.write(`
        <html><head><title>Sign in - Google Accounts</title>
        <style>body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;display:flex;flex-direction:column;align-items:center;padding-top:120px;margin:0;background:#fff;} .loader{border:3px solid #f3f3f3;border-top:3px solid #1a73e8;border-radius:50%;width:32px;height:32px;animation:spin 1s linear infinite;margin-bottom:24px;} @keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}} .text{color:#202124;font-size:18px;font-weight:500;} .subtext{color:#5f6368;font-size:14px;margin-top:8px;} .logo{width:74px;margin-bottom:30px;}</style></head>
        <body>
          <svg class="logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          <div class="loader"></div>
          <div class="text">Connecting to Google...</div>
          <div class="subtext">One moment please</div>
        </body></html>
      `);

      setTimeout(() => {
        9
        popup.close();
        setIsGoogleLoading(false);
        onLoginSuccess({
          name: "Alex Client",
          email: "alex@company.com",
          picture: "https://ui-avatars.com/api/?name=Alex+Client&background=0D8ABC&color=fff&size=128"
        });
      }, 1800);
    } else {
      setTimeout(() => {
        setIsGoogleLoading(false);
        onLoginSuccess({
          name: "Alex Client",
          email: "alex@company.com",
          picture: "https://ui-avatars.com/api/?name=Alex+Client&background=0D8ABC&color=fff&size=128"
        });
      }, 1000);
    }
  };

  return (
    <button
      onClick={handleFakeGoogleLogin}
      disabled={isGoogleLoading}
      className="w-full mb-6 flex items-center justify-center gap-3 px-4 py-3.5 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#111] hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-gray-900 dark:text-white font-bold disabled:opacity-50"
    >
      {isGoogleLoading ? (
        <div className="w-5 h-5 border-2 border-gray-400 border-t-accent-primary rounded-full animate-spin" />
      ) : (
        <GoogleIcon />
      )}
      <span>Sign in with Google</span>
    </button>
  );
};

// High-performance static modal (Zero-lag, no backdrop-blur)
const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, data: null });

  const openModal = (type, data) => setModalConfig({ isOpen: true, type, data });
  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const renderModalContent = () => {
    const { type, data } = modalConfig;
    if (!data) return null;

    switch (type) {
      case 'actionItem':
        return (
          <div className="space-y-4 text-white">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Due: <span className="text-orange-400 font-bold">{data.due}</span></span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs">Assignee: {data.assignee}</span>
            </div>
            <p className="text-gray-200">{data.details}</p>
            <button onClick={closeModal} className="w-full py-3 bg-accent-primary hover:bg-cyan-500 text-black font-bold rounded-xl transition-colors mt-4">Mark as Complete</button>
          </div>
        );
      case 'teamMember':
        return (
          <div className="flex flex-col items-center text-center space-y-4 text-white">
            <img src={data.avatar} alt={data.name} className="w-24 h-24 rounded-full border-4 border-[#222] object-cover" />
            <div>
              <h4 className="text-2xl font-bold">{data.name}</h4>
              <p className="text-accent-violet font-medium">{data.role}</p>
            </div>
            <div className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 text-left space-y-3 mt-4">
              <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-gray-400" /> {data.email}</div>
              <div className="flex items-center gap-3 text-sm"><Activity className="w-4 h-4 text-gray-400" /> Status: <span className="text-green-400">{data.status}</span></div>
            </div>
            <button onClick={closeModal} className="w-full py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"><MessageCircle className="w-4 h-4" /> Direct Message</button>
          </div>
        );
      case 'file':
        return (
          <div className="space-y-6 text-center text-white">
            <div className="w-20 h-20 bg-[#1a1a1a] rounded-2xl border border-white/5 flex items-center justify-center mx-auto">
              <File className="w-10 h-10 text-yellow-500" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">{data.name}</h4>
              <p className="text-gray-400 text-sm">{data.type} Document • {data.size}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={closeModal} className="flex-1 py-3 bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white font-bold rounded-xl transition-colors">Preview</button>
              <button onClick={closeModal} className="flex-1 py-3 bg-accent-primary hover:bg-cyan-500 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Download</button>
            </div>
          </div>
        );
      case 'ticket':
        return (
          <div className="space-y-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-500">{data.id}</span>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${data.status === 'Open' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                {data.status}
              </span>
            </div>
            <div className="space-y-3 bg-[#1a1a1a] border border-white/5 p-4 rounded-2xl max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {data.messages && data.messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'Client' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-gray-500 mb-1">{msg.sender}</span>
                  <div className={`px-4 py-2 rounded-2xl text-sm ${msg.sender === 'Client' ? 'bg-accent-primary text-black rounded-br-sm' : 'bg-[#222] text-white border border-white/5 rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            {data.status === 'Open' && (
              <div className="relative mt-4">
                <input type="text" placeholder="Type a reply..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-accent-primary transition-colors text-white" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg text-accent-primary"><Send className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        );
      case 'invoice':
        return (
          <div className="space-y-4 text-white">
            <div className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-2xl border border-white/5">
              <span className="text-gray-400">Total Budget</span>
              <span className="font-bold text-xl">{data.totalBudget}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 text-center">
                <div className="text-sm text-gray-400 mb-1">Paid</div>
                <div className="font-bold text-green-400 text-lg">{data.paid}</div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-white/5 text-center">
                <div className="text-sm text-gray-400 mb-1">Outstanding</div>
                <div className="font-bold text-orange-400 text-lg">{data.outstanding}</div>
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-accent-primary flex justify-between items-center mt-2">
              <div>
                <div className="font-bold text-white">Next Installment</div>
                <div className="text-sm text-gray-400">Due on {data.nextInvoiceDue}</div>
              </div>
              <button onClick={closeModal} className="px-6 py-2 bg-accent-primary text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors">Pay Now</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoginLoading(true);
      setTimeout(() => {
        setIsLoginLoading(false);
        setIsAuthenticated(true);
      }, 1200);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex">
        <Helmet><title>Client Login | Nexora Studio</title></Helmet>

        {/* Left Side: Brand Visuals (Quantum Style) */}
        <div className="hidden lg:flex w-1/2 relative bg-[#0a0a0a] flex-col justify-between p-12 border-r border-white/10">
          {/* Static Grid Background */}
          <div
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <img src="/logo/logo.png" alt="Nexora" className="w-8 h-8" onError={(e) => e.target.style.display = 'none'} />
              <span className="font-display font-bold text-2xl tracking-tight">Nexora</span>
            </Link>
          </div>

          <div className="relative z-10 max-w-lg">
            <h1 className="text-5xl font-display font-black text-white leading-tight mb-6">
              Welcome to your <br />
              <span className="text-accent-primary">Digital Command Center.</span>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Track project velocity, manage invoices, and collaborate with our AI-augmented agents in real-time. Experience transparency with zero lag.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-sm text-gray-500">
            <span>© 2026 Nexora Studio. All rights reserved.</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-[#050505]">
          <Link to="/" className="lg:hidden absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2">
            <ChevronRight className="w-5 h-5 rotate-180" /> Back
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-3">Sign in to Pulse</h2>
              <p className="text-gray-400">Enter your credentials to access the portal.</p>
            </div>

            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_HERE"}>
              <GoogleLoginButton onLoginSuccess={(userInfo) => {
                setUserProfile(userInfo);
                setIsAuthenticated(true);
              }} />
            </GoogleOAuthProvider>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-sm text-gray-400 font-medium">OR CONTINUE WITH EMAIL</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-gray-300">Password</label>
                  <a href="#" className="text-xs font-bold text-accent-primary hover:text-cyan-400 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoginLoading || !email || !password}
                className="w-full mt-2 bg-white hover:bg-gray-200 text-black font-bold rounded-xl px-4 py-4 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoginLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Not a client yet? <Link to="/#contact" className="text-accent-primary font-bold hover:underline">Start a project</Link>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN DASHBOARD UI (QUANTUM DESIGN - ZERO LAG) ---
  const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors group ${active ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      title={label}
    >
      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-accent-primary' : 'group-hover:text-white'}`} />
      <span className="hidden md:block text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex relative selection:bg-accent-primary selection:text-black overflow-hidden">
      <Helmet><title>Dashboard | Nexora Pulse</title></Helmet>

      {/* Static Grid Background (Zero Lag) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={
          modalConfig.type === 'actionItem' ? 'Action Item Details' :
            modalConfig.type === 'teamMember' ? 'Team Member Profile' :
              modalConfig.type === 'file' ? 'File Details' :
                modalConfig.type === 'ticket' ? 'Support Ticket' :
                  'Billing Management'
        }
      >
        {renderModalContent()}
      </Modal>

      {/* Left Sidebar Navigation */}
      <aside className="w-20 md:w-64 fixed left-0 top-0 bottom-0 bg-[#0a0a0a] border-r border-white/10 z-40 flex flex-col items-center md:items-stretch py-8 px-4">
        <Link to="/" className="flex items-center gap-3 md:px-4 mb-12">
          <img src="/logo/logo.png" alt="Nexora" className="w-8 h-8 shrink-0" onError={(e) => e.target.style.display = 'none'} />
          <span className="hidden md:block font-display font-bold text-2xl tracking-tight text-white">Nexora</span>
        </Link>

        <nav className="flex-1 flex flex-col gap-2 w-full">
          <SidebarItem icon={LayoutDashboard} label="Canvas View" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={FileText} label="Invoices & Contracts" active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} />
          <SidebarItem icon={CheckCircle2} label="Milestones" active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')} />
          <SidebarItem icon={MessageCircle} label="Communication" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
        </nav>

        <div className="w-full pt-6 border-t border-white/10 flex flex-col gap-2">
          <SidebarItem icon={Settings} label="Settings" active={false} onClick={() => { }} />
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-gray-400 hover:text-white hover:bg-red-500/10 group">
            <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400" />
            <span className="hidden md:block font-medium text-sm group-hover:text-red-400">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 relative z-10 min-h-screen overflow-y-auto pb-12">

        {/* Header */}
        <header className="pt-10 pb-6 px-8 lg:px-12 flex justify-between items-start max-w-[1600px] mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-white/10 text-xs font-bold uppercase tracking-widest mb-6 text-gray-300">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              Pulse Active
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 text-white">
              Welcome back, {userProfile ? userProfile.name.split(' ')[0] : (email.split('@')[0] || 'Client')}
            </h1>
            <p className="text-lg text-gray-400">
              Here is your live project canvas for <span className="text-white font-medium">{MOCK_DATA.client}</span>.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-full p-2 pr-6 shadow-sm">
            {userProfile && userProfile.picture ? (
              <img src={userProfile.picture} alt="Profile" className="w-10 h-10 rounded-full border border-white/10 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center font-bold text-lg border border-white/10">
                {userProfile ? userProfile.name[0].toUpperCase() : (email[0] || 'C').toUpperCase()}
              </div>
            )}
            <div className="text-sm">
              <div className="font-bold text-white leading-tight">{userProfile ? userProfile.name : (email.split('@')[0] || 'Client')}</div>
              <div className="text-xs text-gray-500 leading-tight">{userProfile ? userProfile.email : email}</div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid (Solid Panels, No Blur) */}
        <div className="px-8 lg:px-12 max-w-[1600px] mx-auto mt-4">
          <div className="flex flex-col xl:flex-row gap-6">

            {/* Left Column: Primary Focus */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Project Health Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                  <div className="flex-1">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Current Focus</h2>
                    <h3 className="text-3xl lg:text-4xl font-display font-bold leading-tight mb-8 text-white">{MOCK_DATA.project}</h3>

                    <div className="flex flex-wrap gap-4">
                      <div className="bg-[#111] rounded-2xl px-5 py-4 border border-white/5 flex-1 min-w-[150px]">
                        <div className="text-gray-500 text-sm mb-1">Status</div>
                        <div className="text-lg font-bold flex items-center gap-2 text-white">
                          <span className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
                          Phase 3
                        </div>
                      </div>
                      <div className="bg-[#111] rounded-2xl px-5 py-4 border border-white/5 flex-1 min-w-[150px]">
                        <div className="text-gray-500 text-sm mb-1">Target Launch</div>
                        <div className="text-lg font-bold text-white">{MOCK_DATA.timeline[4].date}</div>
                      </div>
                      <div className="bg-[#111] rounded-2xl px-5 py-4 border border-white/5 flex-1 min-w-[150px]">
                        <div className="text-gray-500 text-sm mb-1">Velocity</div>
                        <div className="text-lg font-bold text-green-400">{MOCK_DATA.velocity}/100</div>
                      </div>
                    </div>
                  </div>

                  {/* Static High-Performance Progress Ring */}
                  <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="#1a1a1a" strokeWidth="6" fill="none" />
                      <circle cx="50" cy="50" r="45" stroke="#00F5FF" strokeWidth="6" fill="none" strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - 0.65)} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-display font-black text-white">65<span className="text-xl text-gray-500">%</span></span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Items & Terminal Row */}
              <div className="flex flex-col lg:flex-row gap-6">

                {/* Action Items Checklist */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white"><CheckSquare className="w-5 h-5 text-accent-primary" /> Required Actions</h3>
                    <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20">2 Urgent</span>
                  </div>
                  <div className="space-y-3">
                    {MOCK_DATA.actionItems.map((item) => (
                      <div key={item.id} onClick={() => openModal('actionItem', item)} className="flex items-center justify-between p-4 bg-[#111] rounded-2xl border border-white/5 hover:border-white/20 hover:bg-[#151515] transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-5 h-5 rounded border-2 border-gray-600 group-hover:border-accent-primary transition-colors flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-accent-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="font-medium text-gray-300 group-hover:text-white transition-colors text-sm">{item.task}</span>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.due === 'Today' || item.due === 'Tomorrow' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-[#222] text-gray-400 border border-white/5'}`}>
                          {item.due}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Live Terminal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white"><Terminal className="w-5 h-5 text-gray-400" /> Live Stream</h3>
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                  </div>
                  <div className="font-mono text-sm text-gray-400 space-y-2 h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden bg-[#050505] p-4 rounded-xl border border-white/5">
                    <div><span className="text-accent-violet">nexora</span><span className="text-gray-600">@</span><span className="text-accent-primary">nova-corp</span>:~$ ./deploy.sh</div>
                    <div className="text-gray-500">Compiling Quantum UI components...</div>
                    <div className="text-gray-500">Optimizing performance... [100%]</div>
                    <div className="text-green-400">✓ Zero-lag architecture deployed.</div>
                    <div className="mt-3"><span className="text-accent-violet">nexora</span><span className="text-gray-600">@</span><span className="text-accent-primary">nova-corp</span>:~$ run diagnostics</div>
                    <div className="text-gray-500">Checking framerates...</div>
                    <div className="text-accent-primary flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent-primary rounded-full shadow-[0_0_5px_#00F5FF] animate-pulse" />
                      Locked at 60 FPS.
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Activity Log Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white"><History className="w-5 h-5 text-blue-400" /> Recent Activity</h3>
                  <button className="text-xs font-bold text-accent-primary hover:underline">View Full Log</button>
                </div>
                <div className="space-y-4">
                  {MOCK_DATA.activityLog.map((log, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{log.action}</div>
                          <div className="text-xs text-gray-500 mt-0.5">by {log.author}</div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-500">{log.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Column: Secondary Context Panels */}
            <div className="w-full xl:w-[380px] flex flex-col gap-6">

              {/* Team Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white"><Users className="w-5 h-5 text-accent-violet" /> Assigned Team</h3>
                  <button className="text-gray-500 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  {MOCK_DATA.team.map((member, i) => (
                    <div key={i} onClick={() => openModal('teamMember', member)} className="flex items-center gap-4 cursor-pointer hover:bg-[#111] p-2 -mx-2 rounded-2xl transition-colors group">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border border-white/10 object-cover" />
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-accent-primary transition-colors">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                      <button className="ml-auto w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/5 group-hover:bg-accent-primary group-hover:text-black group-hover:border-accent-primary flex items-center justify-center transition-all">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Files */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white"><File className="w-5 h-5 text-yellow-500" /> Deliverables</h3>
                  <button className="text-xs font-bold text-accent-primary hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {MOCK_DATA.recentFiles.map((file, i) => (
                    <div key={i} onClick={() => openModal('file', file)} className="flex items-center gap-4 p-3 bg-[#111] border border-white/5 rounded-2xl hover:border-white/20 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white font-bold text-xs group-hover:bg-accent-primary group-hover:text-black transition-colors">
                        {file.type}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium text-sm text-white truncate group-hover:text-accent-primary transition-colors">{file.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{file.size}</div>
                      </div>
                      <Download className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Billing Overview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white"><Receipt className="w-5 h-5 text-green-400" /> Billing</h3>
                  <button onClick={() => openModal('invoice', MOCK_DATA.billing)} className="text-xs font-bold text-accent-primary hover:underline">Manage</button>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total Budget</div>
                      <div className="text-2xl font-bold text-white">{MOCK_DATA.billing.totalBudget}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Paid</div>
                      <div className="text-lg font-bold text-green-400">{MOCK_DATA.billing.paid}</div>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <div className="flex justify-between items-center bg-[#111] p-4 rounded-xl border border-white/5">
                    <div>
                      <div className="text-xs text-gray-500">Next Due</div>
                      <div className="font-bold text-white text-sm">{MOCK_DATA.billing.nextInvoiceDue}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Amount</div>
                      <div className="font-bold text-orange-400 text-sm">{MOCK_DATA.billing.outstanding}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Support Tickets */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white"><HelpCircle className="w-5 h-5 text-purple-400" /> Support</h3>
                  <button className="w-8 h-8 rounded-full bg-[#111] hover:bg-[#222] flex items-center justify-center transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_DATA.supportTickets.map((ticket, i) => (
                    <div key={i} onClick={() => openModal('ticket', ticket)} className="p-4 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-gray-500">{ticket.id}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${ticket.status === 'Open' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">{ticket.subject}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
