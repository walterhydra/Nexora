import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { 
  Mail, Eye, Lock, Zap, MessageCircle, ShieldCheck, 
  LayoutDashboard, FolderKanban, Receipt, Settings, 
  Bell, ChevronDown, ArrowLeft, ArrowRight,
  Clock, CheckCircle2, Terminal, Bot, X, Send, MessageSquare, Download, File
} from 'lucide-react';
import nexoraLogo from '../assets/nexora-logo.png';

const LivePulseFeed = () => {
  const [logs, setLogs] = useState([
    { id: 1, text: "System initialized. Secure gateway active.", type: "system" }
  ]);

  useEffect(() => {
    const events = [
      { text: "Committing UI updates to staging environment...", type: "dev" },
      { text: "Optimizing database queries for faster load times.", type: "dev" },
      { text: "Reviewing pull request #42 for phase 2 milestone.", type: "system" },
      { text: "Running end-to-end test suite... 142/142 passed.", type: "success" },
      { text: "Deploying latest assets to CDN edge network.", type: "system" },
      { text: "Client feedback received. Logging into ticketing system.", type: "dev" }
    ];
    
    const interval = setInterval(() => {
      setLogs(prev => {
        const nextEvent = events[Math.floor(Math.random() * events.length)];
        const newLog = { 
          id: Date.now(), 
          text: nextEvent.text, 
          type: nextEvent.type 
        };
        // keep only last 5 logs
        return [newLog, ...prev].slice(0, 5);
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0f1115] rounded-xl border border-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col h-full min-h-[300px]">
      <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#0a0a0c]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-white tracking-wide">Live Project Pulse</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold">Live</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col gap-4 font-mono text-xs overflow-hidden relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1c23] to-[#0f1115]">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <m.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <span className="text-gray-600 shrink-0 mt-0.5">&gt;</span>
              <p className={`leading-relaxed ${
                log.type === 'success' ? 'text-emerald-400' :
                log.type === 'dev' ? 'text-blue-400' : 'text-gray-300'
              }`}>
                {log.text}
              </p>
            </m.div>
          ))}
        </AnimatePresence>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f1115] to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const InteractiveInvoice = () => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const rX = -((mouseY / height) - 0.5) * 20;
    const rY = ((mouseX / width) - 0.5) * 20;
    
    setRotate({ x: rX, y: rY });
    setGlare({ 
      x: (mouseX / width) * 100, 
      y: (mouseY / height) * 100,
      opacity: 1 
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="mt-8 flex flex-col xl:flex-row gap-12 items-center bg-white border border-gray-200 rounded-2xl p-8 lg:p-12 shadow-sm">
      <div className="flex-1 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
          <CheckCircle2 className="w-3.5 h-3.5" />
          PAID IN FULL
        </div>
        <h3 className="text-3xl font-bold text-gray-900">Phase 2: Platform Architecture</h3>
        <p className="text-gray-500 max-w-md text-sm leading-relaxed">
          Invoice #INV-2026-042 for the completion of the backend infrastructure, database schemas, and the initial API integrations.
        </p>
        <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors pt-2">
          Download PDF Receipt <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3D Card Container */}
      <div 
        className="relative w-full max-w-md aspect-[1.6/1] [perspective:1000px] cursor-pointer shrink-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <m.div
          ref={cardRef}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col justify-between border border-gray-700"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Holographic Glare Effect */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Top Row */}
          <div className="flex justify-between items-start relative z-20" style={{ transform: "translateZ(20px)" }}>
            <div>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase block mb-1">Invoice Amount</span>
              <span className="text-2xl font-bold tracking-tight">$8,250.00</span>
            </div>
            {/* Smart Chip Graphic */}
            <div className="w-10 h-7 rounded bg-gradient-to-tr from-gray-300 to-white flex flex-col justify-between p-1 shadow-sm opacity-90">
               <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 bg-gray-400/50 rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-gray-400/50 rounded-sm" />
               </div>
               <div className="h-0.5 bg-gray-400/50 rounded" />
            </div>
          </div>

          {/* Middle Pattern */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none" style={{ transform: "translateZ(10px)" }}>
            <Zap className="w-32 h-32" />
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end relative z-20" style={{ transform: "translateZ(30px)" }}>
            <div className="space-y-1">
              <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Issued To</div>
              <div className="text-sm font-semibold tracking-wide">NOVA CORP</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Date Paid</div>
              <div className="text-sm font-semibold tracking-wide">OCT 12, 2026</div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hi Alex! I am your Nexora AI Concierge. How can I help you with your project today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setShowSuggestions(false);
    const userMessage = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Dummy AI Response logic
    setTimeout(() => {
      let responseText = "I'm checking on that for you. Our team will get back to you shortly.";
      const lowerInput = text.toLowerCase();
      
      if (lowerInput.includes('invoice') || lowerInput.includes('pay')) {
        responseText = "Your latest invoice for Phase 2 ($8,250.00) was paid in full on Oct 12, 2026. You can view the details in the interactive card below or in the Invoices tab.";
      } else if (lowerInput.includes('phase 2') || lowerInput.includes('architecture') || lowerInput.includes('status')) {
        responseText = "Phase 2 (Platform Architecture) is currently active and is at 63% completion. The Backend API Integration is due on Oct 15.";
      } else if (lowerInput.includes('support') || lowerInput.includes('help')) {
        responseText = "I can help you open a new support ticket, or you can email our 24/7 team at support@nexora.com. You currently have 0 active tickets.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        responseText = "Hello! Let me know if you need any updates on your active milestones or billing.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  const suggestions = [
    "Check my latest invoice",
    "What's the status of Phase 2?",
    "I need support"
  ];

  return (
    <>
      {/* Floating Button with Pulse Animation */}
      <m.div
        className={`fixed bottom-8 right-8 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="relative">
           {/* Pulsing ring behind the button */}
           <m.div 
             animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} 
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-blue-500 rounded-full blur-md"
           />
           <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-xl flex items-center justify-center border border-blue-400/30"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white"></span>
          </m.button>
        </div>
      </m.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 right-8 w-[90vw] sm:w-[400px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 z-50 overflow-hidden flex flex-col"
            style={{ height: '600px', maxHeight: 'calc(100vh - 4rem)' }}
          >
            {/* High-End Glassmorphism Header */}
            <div className="relative p-5 flex items-center justify-between text-white overflow-hidden bg-gray-900">
              {/* Animated abstract background for AI feel */}
              <div className="absolute inset-0 opacity-40">
                <m.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 blur-2xl rounded-full"
                />
              </div>
              
              <div className="relative z-10 flex items-center gap-4">
                {/* AI Orb Logo */}
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <m.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-500/20 rounded-full"
                  />
                  <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" />
                  <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-[spin_4s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-wide">Nexora Intelligence</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-gray-300 font-mono uppercase tracking-widest">System Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#fafafa] flex flex-col gap-5">
              <AnimatePresence>
                {messages.map((msg) => (
                  <m.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-600/20' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </m.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <m.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 px-4 py-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                    <m.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <m.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <m.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                </m.div>
              )}
              
              {/* Suggested Prompts */}
              {showSuggestions && !isTyping && (
                <m.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-2 mt-2"
                >
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1 px-1">Suggested Questions</p>
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="text-left text-xs text-gray-600 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 py-2.5 px-4 rounded-xl transition-colors shadow-sm hover:shadow flex items-center justify-between group"
                    >
                      {suggestion}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </m.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your project..."
                  className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full pl-5 pr-14 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

const OverviewTab = () => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 max-w-6xl mx-auto w-full">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Alex</h1>
      <p className="text-gray-400 text-sm">Here is what's happening with your assets today.</p>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { label: "Active Assets", value: "3", change: "+1 this month", icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { label: "Total Asset Value", value: "$12,450", change: "Paid in full", icon: Receipt, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { label: "Support Tickets", value: "0", change: "All resolved", icon: CheckCircle2, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" }
      ].map((stat, i) => (
        <div key={i} className={`bg-white/[0.02] rounded-xl border ${stat.border} p-6 backdrop-blur-md`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-400">{stat.label}</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            <span className="text-xs font-medium text-gray-500">{stat.change}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Project Timeline & Recent Activity */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main Active Project */}
      <div className="xl:col-span-2 bg-white/[0.02] rounded-xl border border-white/[0.06] backdrop-blur-md overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-base font-bold text-white">E-Commerce Replatforming</h3>
          <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">Phase 3 Active</span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-300">Overall Completion</span>
            <span className="text-sm font-bold text-blue-400">63%</span>
          </div>
          <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden mb-8">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[63%] transition-all duration-1000"></div>
          </div>

          <h4 className="text-sm font-bold text-white mb-4">Upcoming Milestones</h4>
          <div className="space-y-5">
            {[
              { title: "Design System Approval", date: "Completed Oct 1", status: "done" },
              { title: "Backend API Integration", date: "Awaiting your approval", status: "action_needed" },
              { title: "Frontend Implementation", date: "Pending Phase 2", status: "pending" }
            ].map((milestone, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 ${
                  milestone.status === 'done' ? 'bg-blue-600 border-blue-600' : 
                  milestone.status === 'action_needed' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/[0.02] border-white/[0.08]'
                }`}>
                  {milestone.status === 'done' && <CheckCircle2 className="w-3 h-3 text-white" />}
                  {milestone.status === 'action_needed' && <div className="w-2 h-2 bg-amber-400 rounded-full" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${milestone.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>{milestone.title}</p>
                  <p className={`text-xs mt-0.5 ${milestone.status === 'action_needed' ? 'text-amber-400 font-medium' : 'text-gray-400'}`}>{milestone.date}</p>
                  
                  {milestone.status === 'action_needed' && (
                    <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-200">Please review and approve to proceed.</span>
                      <button className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-amber-500/15">
                        Approve Stage
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Status & Quick Actions */}
      <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] backdrop-blur-md overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Current Balance</h3>
          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">Due July 15</span>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
            <Receipt className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-sm font-semibold text-gray-400 mb-1">Outstanding Invoice</p>
          <h2 className="text-4xl font-bold text-white mb-6">₹45,000</h2>
          
          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg shadow-sm transition-all mb-3 active:scale-[0.98]">
            Pay Now via Stripe
          </button>
          <button className="w-full bg-white/[0.02] hover:bg-white/[0.04] text-white border border-white/[0.08] font-semibold py-3 rounded-lg transition-colors">
            View Invoice PDF
          </button>
        </div>
      </div>
    </div>

    {/* Interactive 3D Invoice Feature */}
    <InteractiveInvoice />
  </m.div>
);

const ProjectsTab = () => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 max-w-6xl mx-auto w-full">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Your Projects</h1>
      <p className="text-gray-400 text-sm">Manage and track your ongoing and completed projects.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] p-6 backdrop-blur-md hover:bg-white/[0.04] transition-all group cursor-pointer">
        <div className="flex justify-between items-start mb-4">
           <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center border border-blue-500/20">
             <FolderKanban className="w-6 h-6" />
           </div>
           <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-md border border-blue-500/20">In Progress</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">E-Commerce Replatforming</h3>
        <p className="text-gray-400 text-sm mt-2 mb-6">Complete overhaul of the backend infrastructure and frontend UI.</p>
        <div className="w-full bg-white/[0.04] rounded-full h-1.5 mb-2"><div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full w-[63%]"></div></div>
        <div className="flex justify-between text-xs font-semibold text-gray-500">
          <span>63% Complete</span>
          <span>Due Oct 28</span>
        </div>
      </div>
      
      <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] p-6 backdrop-blur-md hover:bg-white/[0.04] transition-all group cursor-pointer">
        <div className="flex justify-between items-start mb-4">
           <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center border border-emerald-500/20">
             <CheckCircle2 className="w-6 h-6" />
           </div>
           <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-md border border-emerald-500/20">Completed</span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">Brand Identity Design</h3>
        <p className="text-gray-400 text-sm mt-2 mb-6">Logo, color palette, typography, and brand guidelines.</p>
        <div className="w-full bg-white/[0.04] rounded-full h-1.5 mb-2"><div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full w-[100%]"></div></div>
        <div className="flex justify-between text-xs font-semibold text-gray-500">
          <span>100% Complete</span>
          <span>Delivered Sep 15</span>
        </div>
      </div>
    </div>
  </m.div>
);

const InvoicesTab = () => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 max-w-6xl mx-auto w-full">
    <div className="mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Billing & Invoices</h1>
        <p className="text-gray-400 text-sm">View and manage your project invoices.</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-blue-600/15 transition-all">
        Download Statement
      </button>
    </div>
    
    <div className="mb-12">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Latest Invoice</h3>
      <InteractiveInvoice />
    </div>

    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/[0.02] border-b border-white/[0.06]">
            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Project</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06] text-sm">
          <tr className="hover:bg-white/[0.04] transition-colors cursor-pointer">
            <td className="px-6 py-4 font-medium text-white">INV-2026-042</td>
            <td className="px-6 py-4 text-gray-300">E-Commerce Phase 2</td>
            <td className="px-6 py-4 text-gray-400">Oct 12, 2026</td>
            <td className="px-6 py-4 font-semibold text-white">$8,250.00</td>
            <td className="px-6 py-4"><span className="inline-flex px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">Paid</span></td>
          </tr>
          <tr className="hover:bg-white/[0.04] transition-colors cursor-pointer">
            <td className="px-6 py-4 font-medium text-white">INV-2026-031</td>
            <td className="px-6 py-4 text-gray-300">Brand Identity</td>
            <td className="px-6 py-4 text-gray-400">Sep 01, 2026</td>
            <td className="px-6 py-4 font-semibold text-white">$4,500.00</td>
            <td className="px-6 py-4"><span className="inline-flex px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">Paid</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </m.div>
);

const MessagesTab = () => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 max-w-6xl mx-auto w-full h-[calc(100vh-4rem)] flex flex-col">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white mb-1">Messages</h1>
      <p className="text-gray-400 text-sm">Communicate directly with the Nexora team.</p>
    </div>
    
    <div className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden shadow-sm flex min-h-[500px] backdrop-blur-md">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r border-white/[0.06] flex flex-col">
        <div className="p-4 border-b border-white/[0.06]">
           <input type="text" placeholder="Search messages..." className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 text-white placeholder-gray-600" />
        </div>
        <div className="flex-1 overflow-y-auto p-2">
           <div className="p-3 bg-blue-500/10 rounded-lg cursor-pointer border border-blue-500/20 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-blue-500/20 border border-blue-400/20">NX</div>
              <div>
                <h4 className="text-sm font-bold text-white">Nexora Concierge</h4>
                <p className="text-xs text-gray-400 truncate mt-0.5 font-medium">Your latest invoice is ready...</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[#09090b]">
         <div className="p-4 border-b border-white/[0.06] bg-white/[0.01] flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 border border-blue-400/20">NX</div>
            <div>
               <h3 className="text-sm font-bold text-white">Nexora Concierge</h3>
               <span className="text-[10px] text-emerald-400 uppercase font-mono tracking-wider font-bold">Online</span>
            </div>
         </div>
         
         <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            <div className="flex justify-start">
               <div className="max-w-[70%] p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl rounded-tl-sm text-sm text-gray-300 shadow-sm backdrop-blur-md">
                 Hello Alex! I am your dedicated Nexora AI concierge. You can ask me anything about your project statuses, invoices, or request support tickets directly through here.
               </div>
            </div>
            <div className="flex justify-end">
               <div className="max-w-[70%] p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm text-sm shadow-md shadow-blue-500/10">
                 Can you confirm the deadline for Phase 3?
               </div>
            </div>
            <div className="flex justify-start">
               <div className="max-w-[70%] p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl rounded-tl-sm text-sm text-gray-300 shadow-sm backdrop-blur-md">
                 Phase 3 is scheduled to be completed by October 28th.
               </div>
            </div>
         </div>
         
         <div className="p-4 bg-white/[0.01] border-t border-white/[0.06]">
            <div className="relative flex items-center">
               <input type="text" placeholder="Type your message..." className="w-full bg-white/[0.02] border border-white/[0.08] rounded-full pl-5 pr-14 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 text-white placeholder-gray-600" />
               <button className="absolute right-1.5 w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md shadow-blue-500/20 active:scale-[0.95]">
                 <Send className="w-4 h-4 ml-0.5" />
               </button>
            </div>
         </div>
      </div>
    </div>
  </m.div>
);

const DeliverablesTab = () => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 max-w-6xl mx-auto w-full">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white mb-1">File Delivery Hub</h1>
      <p className="text-gray-400 text-sm">Access your final assets, source files, and work in progress.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Final Deliverables */}
      <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] shadow-sm overflow-hidden flex flex-col backdrop-blur-md">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between bg-emerald-500/5">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold">Final Deliverables</h3>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Approved</span>
        </div>
        <div className="p-4 space-y-2 flex-1">
          {[
            { name: "Brand_Guidelines_vFinal.pdf", size: "4.2 MB", date: "Oct 12", type: "pdf" },
            { name: "Logo_Package_All_Formats.zip", size: "12.8 MB", date: "Oct 12", type: "zip" },
            { name: "UI_Design_System.fig", size: "18.5 MB", date: "Oct 10", type: "fig" }
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-white/[0.04] rounded-lg border border-transparent hover:border-white/[0.08] transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                  file.type === 'pdf' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                  file.type === 'zip' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                }`}>
                  .{file.type}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.size} • Uploaded {file.date}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-400 transition-colors p-2">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Work In Progress */}
      <div className="bg-white/[0.02] rounded-xl border border-white/[0.06] shadow-sm overflow-hidden flex flex-col backdrop-blur-md">
        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between bg-blue-500/5">
          <div className="flex items-center gap-2 text-blue-400">
            <FolderKanban className="w-5 h-5" />
            <h3 className="font-bold">Work In Progress</h3>
          </div>
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">Active</span>
        </div>
        <div className="p-4 space-y-2 flex-1">
          {[
            { name: "Homepage_Draft_v2.fig", size: "8.1 MB", date: "Today", type: "fig" },
            { name: "Copywriting_Wireframe.pdf", size: "1.2 MB", date: "Yesterday", type: "pdf" }
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-white/[0.04] rounded-lg border border-transparent hover:border-white/[0.08] transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                  file.type === 'pdf' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                }`}>
                  .{file.type}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.size} • Uploaded {file.date}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-400 transition-colors p-2">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </m.div>
);

const SettingsTab = () => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 max-w-3xl mx-auto w-full">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white mb-1">Account Settings</h1>
      <p className="text-gray-400 text-sm">Manage your profile, company details, and notifications.</p>
    </div>
    
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl shadow-sm p-8 mb-6 backdrop-blur-md">
       <h3 className="text-base font-bold text-white mb-6">Profile Information</h3>
       <div className="flex items-center gap-6 mb-8">
          <img src="https://ui-avatars.com/api/?name=Alex+Client&background=2563eb&color=fff" alt="User" className="w-20 h-20 rounded-full border border-white/[0.08] shadow-sm" loading="lazy" decoding="async" width="80" height="80" />
          <div>
            <button className="bg-white/[0.02] text-white hover:bg-white/[0.04] px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-white/[0.08]">Change Avatar</button>
          </div>
       </div>
       <div className="grid grid-cols-2 gap-6">
          <div>
             <label className="block text-xs font-semibold text-gray-400 mb-2">First Name</label>
             <input type="text" defaultValue="Alex" className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 text-white" />
          </div>
          <div>
             <label className="block text-xs font-semibold text-gray-400 mb-2">Last Name</label>
             <input type="text" defaultValue="Client" className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 text-white" />
          </div>
          <div className="col-span-2">
             <label className="block text-xs font-semibold text-gray-400 mb-2">Email Address</label>
             <input type="email" defaultValue="client@company.com" className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 text-white" />
          </div>
       </div>
    </div>
    
    <div className="flex justify-end">
       <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-md shadow-blue-600/15">Save Changes</button>
    </div>
  </m.div>
);

export default function ClientPortal() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if ((email === 'Nexoraa.works@gmail.com' || email === 'Nexoraa.Admin') && password === '220305@Nexoraa') {
      navigate('/invoice-system');
    } else {
      setIsAuthenticated(true);
    }
  };

  // --- LOGIN SCREEN (Matches screenshot layout, adapted to Nexora Blue) ---
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-[#070709] text-white font-sans overflow-hidden">
        {/* Left Side (Constellation Map/Features) */}
        <div className="hidden md:flex md:w-3/5 flex-col p-16 relative overflow-hidden bg-gradient-to-br from-[#0b0d19] via-[#05060b] to-[#010103] border-r border-white/[0.05]">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Subtle dotted background pattern */}
          <div className="absolute inset-0 z-0 opacity-10" 
               style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
          />
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Logo Header */}
            <div className="flex items-center gap-3 mb-20 relative z-10">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
                 <span className="text-white font-extrabold text-sm tracking-widest">NX</span>
               </div>
               <span className="font-bold text-2xl text-white tracking-tight bg-clip-text bg-gradient-to-r from-white to-gray-400">Nexora</span>
            </div>

            {/* Headline */}
            <div className="max-w-xl z-20 mt-8 space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Architecting high-yield <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">digital assets</span> <br/>
                for enterprises.
              </h1>
              <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                Log in to monitor project execution, inspect performance telemetry, approve milestones, and access asset resources.
              </p>
            </div>

            {/* Constellation Connection Network (SVG) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-25 pointer-events-none z-0">
              <svg viewBox="0 0 800 500" className="w-full h-full stroke-blue-500/30 stroke-[1.5] fill-none">
                {/* Connecting Lines */}
                <path d="M 150 150 L 300 100 L 450 180 L 600 120 L 700 220" className="animate-[pulse_4s_infinite]" />
                <path d="M 200 350 L 350 280 L 450 180 L 550 320 L 650 250" />
                <path d="M 300 100 L 350 280 M 450 180 M 600 120 L 550 320" />
                
                {/* Nodes */}
                <circle cx="150" cy="150" r="5" className="fill-blue-500 stroke-blue-300 stroke-2 animate-pulse" />
                <circle cx="300" cy="100" r="6" className="fill-indigo-500 stroke-indigo-300 stroke-2" />
                <circle cx="450" cy="180" r="8" className="fill-cyan-500 stroke-cyan-300 stroke-2" />
                <circle cx="600" cy="120" r="6" className="fill-blue-500 stroke-blue-300 stroke-2" />
                <circle cx="700" cy="220" r="5" className="fill-indigo-500 stroke-indigo-300 stroke-2" />
                <circle cx="200" cy="350" r="5" className="fill-blue-500 stroke-blue-300 stroke-2" />
                <circle cx="350" cy="280" r="7" className="fill-cyan-500 stroke-cyan-300 stroke-2" />
                <circle cx="550" cy="320" r="6" className="fill-indigo-500 stroke-indigo-300 stroke-2" />
                <circle cx="650" cy="250" r="5" className="fill-blue-500 stroke-blue-300 stroke-2" />

                {/* Pulsing Outer Rings */}
                <circle cx="450" cy="180" r="16" className="stroke-cyan-500/20 stroke-[1] animate-[ping_3s_infinite]" />
                <circle cx="350" cy="280" r="14" className="stroke-blue-500/20 stroke-[1] animate-[ping_4s_infinite]" />
              </svg>
            </div>

            {/* Bottom Cards */}
            <div className="mt-auto flex gap-4 z-20">
              {[
                { icon: Zap, label: "Real-time Auditing", desc: "Live telemetry logs", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                { icon: ShieldCheck, label: "Secure Execution", desc: "End-to-end encryption", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                { icon: MessageCircle, label: "Priority Channel", desc: "Direct core team access", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" }
              ].map((card, i) => (
                <div key={i} className="flex-1 bg-white/[0.02] rounded-xl p-4 border border-white/[0.06] backdrop-blur-md flex flex-col hover:bg-white/[0.04] transition-all duration-300">
                  <div className={`w-8 h-8 rounded-lg ${card.bg} border flex items-center justify-center mb-3`}>
                    <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
                  </div>
                  <span className="text-xs font-bold text-white mb-0.5">{card.label}</span>
                  <span className="text-[10px] text-gray-500">{card.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-2/5 bg-[#070709] flex flex-col justify-center px-6 sm:px-12 lg:px-16 relative">
          {/* Subtle Glow Behind Form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-6 right-6 z-20 hidden md:block">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Secure Gateway</span>
            </div>
          </div>

          <div className="relative z-10 w-full max-w-md mx-auto">
            {/* The Login Card with transparent glassmorphism */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative backdrop-blur-xl">
              {/* Top gradient glow border */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500"></div>
              
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white mb-1.5 tracking-wide">Client Gateway</h2>
                <p className="text-xs text-gray-400 mb-8">Access the Nexora B2B partner dashboard</p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Email or ID</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@agency.com" 
                        className="w-full pl-4 pr-10 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 focus:bg-white/[0.04] transition-all text-white placeholder-gray-600"
                      />
                      <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                    <div className="relative group">
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password" 
                        className="w-full pl-4 pr-10 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 focus:bg-white/[0.04] transition-all text-white placeholder-gray-600"
                      />
                      <Eye className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-300 transition-colors" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/[0.1] bg-white/[0.02] text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0" />
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Remember session</span>
                    </label>
                    <a href="#" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm py-3.5 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 active:scale-[0.98] mt-2"
                  >
                    Authenticate Gateway
                  </button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <Link to="/" className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                  </Link>
                  <p className="text-[10px] text-gray-500">
                    Need gateway access? Contact <a href="mailto:partnerships@nexora.com" className="text-blue-400 hover:underline">partnerships@nexora.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- POST-LOGIN DASHBOARD (Clean Professional SaaS Design) ---
  return (
    <div className="min-h-screen bg-[#070709] text-white flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0a0a0c] border-r border-white/[0.06] flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-md shadow-blue-500/20 border border-white/[0.08]">
             <img src={nexoraLogo} alt="Nexora" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-white tracking-tight text-lg">Nexora</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'overview', icon: LayoutDashboard, label: "Dashboard" },
            { id: 'projects', icon: FolderKanban, label: "Projects" },
            { id: 'deliverables', icon: File, label: "Deliverables" },
            { id: 'invoices', icon: Receipt, label: "Invoices" },
            { id: 'messages', icon: MessageCircle, label: "Messages" },
            { id: 'settings', icon: Settings, label: "Settings" },
          ].map((item, i) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={i} 
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 border border-transparent hover:bg-white/[0.02] hover:text-white'}`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/[0.06]">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <Lock className="w-4 h-4 text-gray-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#070709]">
        {/* Header */}
        <header className="h-16 bg-[#0a0a0c]/80 border-b border-white/[0.06] px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Client Portal</span>
            <ChevronDown className="w-3 h-3" />
            <span className="text-white font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-[#0a0a0c]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/[0.06]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">Alex Client</p>
                <p className="text-xs text-gray-400">Nova Corp</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Alex+Client&background=2563eb&color=fff" alt="User" className="w-9 h-9 rounded-full border border-white/[0.08]" />
            </div>
          </div>
        </header>

        {/* Dashboard Content dynamically rendered based on activeTab */}
        <AnimatePresence mode="wait">
           {activeTab === 'overview' && <OverviewTab key="overview" />}
           {activeTab === 'projects' && <ProjectsTab key="projects" />}
           {activeTab === 'deliverables' && <DeliverablesTab key="deliverables" />}
           {activeTab === 'invoices' && <InvoicesTab key="invoices" />}
           {activeTab === 'messages' && <MessagesTab key="messages" />}
           {activeTab === 'settings' && <SettingsTab key="settings" />}
        </AnimatePresence>

        {/* Floating AI Concierge */}
        <AIConcierge />
      </main>
    </div>
  );
}
