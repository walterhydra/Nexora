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
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, Alex</h1>
      <p className="text-gray-500 text-sm">Here is what's happening with your projects today.</p>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { label: "Active Projects", value: "3", change: "+1 this month", icon: FolderKanban, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
        { label: "Total Billed", value: "$12,450", change: "Paid in full", icon: Receipt, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
        { label: "Support Tickets", value: "0", change: "All resolved", icon: CheckCircle2, color: "text-gray-600", bg: "bg-gray-100", border: "border-gray-200" }
      ].map((stat, i) => (
        <div key={i} className={`bg-white rounded-xl border ${stat.border} p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <span className="text-xs font-medium text-gray-500">{stat.change}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Project Timeline & Recent Activity */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main Active Project */}
      <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">E-Commerce Replatforming</h3>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">Phase 3 Active</span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Overall Completion</span>
            <span className="text-sm font-bold text-blue-600">63%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
            <div className="h-full bg-blue-600 rounded-full w-[63%] transition-all duration-1000"></div>
          </div>

          <h4 className="text-sm font-bold text-gray-900 mb-4">Upcoming Milestones</h4>
          <div className="space-y-5">
            {[
              { title: "Design System Approval", date: "Completed Oct 1", status: "done" },
              { title: "Backend API Integration", date: "Awaiting your approval", status: "action_needed" },
              { title: "Frontend Implementation", date: "Pending Phase 2", status: "pending" }
            ].map((milestone, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 ${
                  milestone.status === 'done' ? 'bg-blue-600 border-blue-600' : 
                  milestone.status === 'action_needed' ? 'bg-amber-100 border-amber-500' : 'bg-gray-100 border-gray-200'
                }`}>
                  {milestone.status === 'done' && <CheckCircle2 className="w-3 h-3 text-white" />}
                  {milestone.status === 'action_needed' && <div className="w-2 h-2 bg-amber-500 rounded-full" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${milestone.status === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>{milestone.title}</p>
                  <p className={`text-xs mt-0.5 ${milestone.status === 'action_needed' ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>{milestone.date}</p>
                  
                  {milestone.status === 'action_needed' && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-800">Please review and approve to proceed.</span>
                      <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors shadow-sm">
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
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Current Balance</h3>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">Due July 15</span>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <Receipt className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Outstanding Invoice</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">₹45,000</h2>
          
          <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg shadow-sm transition-colors mb-3">
            Pay Now via Stripe
          </button>
          <button className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold py-3 rounded-lg transition-colors">
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
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Projects</h1>
      <p className="text-gray-500 text-sm">Manage and track your ongoing and completed projects.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
        <div className="flex justify-between items-start mb-4">
           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
             <FolderKanban className="w-6 h-6" />
           </div>
           <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-100">In Progress</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">E-Commerce Replatforming</h3>
        <p className="text-gray-500 text-sm mt-2 mb-6">Complete overhaul of the backend infrastructure and frontend UI.</p>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2"><div className="bg-blue-600 h-1.5 rounded-full w-[63%]"></div></div>
        <div className="flex justify-between text-xs font-semibold text-gray-500">
          <span>63% Complete</span>
          <span>Due Oct 28</span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
        <div className="flex justify-between items-start mb-4">
           <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
             <CheckCircle2 className="w-6 h-6" />
           </div>
           <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-100">Completed</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Brand Identity Design</h3>
        <p className="text-gray-500 text-sm mt-2 mb-6">Logo, color palette, typography, and brand guidelines.</p>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2"><div className="bg-emerald-500 h-1.5 rounded-full w-[100%]"></div></div>
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
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing & Invoices</h1>
        <p className="text-gray-500 text-sm">View and manage your project invoices.</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors">
        Download Statement
      </button>
    </div>
    
    <div className="mb-12">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Latest Invoice</h3>
      <InteractiveInvoice />
    </div>

    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
            <td className="px-6 py-4 font-medium text-gray-900">INV-2026-042</td>
            <td className="px-6 py-4 text-gray-600">E-Commerce Phase 2</td>
            <td className="px-6 py-4 text-gray-500">Oct 12, 2026</td>
            <td className="px-6 py-4 font-semibold text-gray-900">$8,250.00</td>
            <td className="px-6 py-4"><span className="inline-flex px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">Paid</span></td>
          </tr>
          <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
            <td className="px-6 py-4 font-medium text-gray-900">INV-2026-031</td>
            <td className="px-6 py-4 text-gray-600">Brand Identity</td>
            <td className="px-6 py-4 text-gray-500">Sep 01, 2026</td>
            <td className="px-6 py-4 font-semibold text-gray-900">$4,500.00</td>
            <td className="px-6 py-4"><span className="inline-flex px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">Paid</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </m.div>
);

const MessagesTab = () => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 max-w-6xl mx-auto w-full h-[calc(100vh-4rem)] flex flex-col">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Messages</h1>
      <p className="text-gray-500 text-sm">Communicate directly with the Nexora team.</p>
    </div>
    
    <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex min-h-[500px]">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
           <input type="text" placeholder="Search messages..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        <div className="flex-1 overflow-y-auto p-2">
           <div className="p-3 bg-blue-50 rounded-lg cursor-pointer border border-blue-100 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-blue-600/20">NX</div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Nexora Concierge</h4>
                <p className="text-xs text-gray-500 truncate mt-0.5">Your latest invoice is ready...</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[#fafafa]">
         <div className="p-4 border-b border-gray-100 bg-white flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-blue-600/20">NX</div>
            <div>
               <h3 className="text-sm font-bold text-gray-900">Nexora Concierge</h3>
               <span className="text-[10px] text-emerald-500 uppercase font-mono tracking-wider font-bold">Online</span>
            </div>
         </div>
         
         <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
            <div className="flex justify-start">
               <div className="max-w-[70%] p-4 bg-white border border-gray-200 rounded-2xl rounded-tl-sm text-sm text-gray-800 shadow-sm">
                 Hello Alex! I am your dedicated Nexora AI concierge. You can ask me anything about your project statuses, invoices, or request support tickets directly through here.
               </div>
            </div>
            <div className="flex justify-end">
               <div className="max-w-[70%] p-4 bg-blue-600 text-white rounded-2xl rounded-tr-sm text-sm shadow-md shadow-blue-600/20">
                 Can you confirm the deadline for Phase 3?
               </div>
            </div>
            <div className="flex justify-start">
               <div className="max-w-[70%] p-4 bg-white border border-gray-200 rounded-2xl rounded-tl-sm text-sm text-gray-800 shadow-sm">
                 Phase 3 is scheduled to be completed by October 28th.
               </div>
            </div>
         </div>
         
         <div className="p-4 bg-white border-t border-gray-200">
            <div className="relative flex items-center">
               <input type="text" placeholder="Type your message..." className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-14 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-inner" />
               <button className="absolute right-1.5 w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
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
      <h1 className="text-2xl font-bold text-gray-900 mb-1">File Delivery Hub</h1>
      <p className="text-gray-500 text-sm">Access your final assets, source files, and work in progress.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Final Deliverables */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-emerald-50">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold">Final Deliverables</h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-1 rounded border border-emerald-200">Approved</span>
        </div>
        <div className="p-4 space-y-2 flex-1">
          {[
            { name: "Brand_Guidelines_vFinal.pdf", size: "4.2 MB", date: "Oct 12", type: "pdf" },
            { name: "Logo_Package_All_Formats.zip", size: "12.8 MB", date: "Oct 12", type: "zip" },
            { name: "UI_Design_System.fig", size: "18.5 MB", date: "Oct 10", type: "fig" }
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                  file.type === 'pdf' ? 'bg-red-50 text-red-600' : 
                  file.type === 'zip' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  .{file.type}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} • Uploaded {file.date}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-2">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Work In Progress */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-blue-50">
          <div className="flex items-center gap-2 text-blue-800">
            <FolderKanban className="w-5 h-5" />
            <h3 className="font-bold">Work In Progress</h3>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-white px-2 py-1 rounded border border-blue-200">Active</span>
        </div>
        <div className="p-4 space-y-2 flex-1">
          {[
            { name: "Homepage_Draft_v2.fig", size: "8.1 MB", date: "Today", type: "fig" },
            { name: "Copywriting_Wireframe.pdf", size: "1.2 MB", date: "Yesterday", type: "pdf" }
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                  file.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  .{file.type}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} • Uploaded {file.date}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-2">
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
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Account Settings</h1>
      <p className="text-gray-500 text-sm">Manage your profile, company details, and notifications.</p>
    </div>
    
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-6">
       <h3 className="text-base font-bold text-gray-900 mb-6">Profile Information</h3>
       <div className="flex items-center gap-6 mb-8">
          <img src="https://ui-avatars.com/api/?name=Alex+Client&background=2563eb&color=fff" alt="User" className="w-20 h-20 rounded-full border border-gray-200 shadow-sm" loading="lazy" decoding="async" width="80" height="80" />
          <div>
            <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-gray-200">Change Avatar</button>
          </div>
       </div>
       <div className="grid grid-cols-2 gap-6">
          <div>
             <label className="block text-xs font-semibold text-gray-700 mb-2">First Name</label>
             <input type="text" defaultValue="Alex" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <div>
             <label className="block text-xs font-semibold text-gray-700 mb-2">Last Name</label>
             <input type="text" defaultValue="Client" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <div className="col-span-2">
             <label className="block text-xs font-semibold text-gray-700 mb-2">Email Address</label>
             <input type="email" defaultValue="client@company.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
       </div>
    </div>
    
    <div className="flex justify-end">
       <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm shadow-blue-600/20">Save Changes</button>
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
      <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f9fc] font-sans">
        {/* Left Side (Map/Features) */}
        <div className="hidden md:flex md:w-3/5 flex-col p-12 relative overflow-hidden bg-[#f4f5f7]">
          {/* Subtle dotted background pattern */}
          <div className="absolute inset-0 z-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
          />
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Logo placeholder */}
            <div className="flex items-center gap-2 mb-16">
               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                 <span className="text-white font-bold text-xs">NX</span>
               </div>
               <span className="font-bold text-xl text-gray-800 tracking-tight">Nexora</span>
            </div>

            {/* Headline */}
            <div className="max-w-xl z-20 mt-12">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                Your trusted <br/>
                digital transformation <br/>
                <span className="text-blue-600">partner</span>
              </h1>
            </div>

            {/* Abstract World Map Graphic (SVG) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[800px] h-[500px] opacity-10 pointer-events-none">
              <svg viewBox="0 0 1000 500" className="w-full h-full fill-gray-800">
                <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,150 T650,100 T750,200 T850,150 L850,350 L150,350 Z" />
                <circle cx="250" cy="150" r="15" fill="#2563EB" opacity="0.5" />
                <circle cx="550" cy="200" r="10" fill="#2563EB" opacity="0.5" />
                <circle cx="750" cy="100" r="20" fill="#2563EB" opacity="0.5" />
                <circle cx="350" cy="250" r="12" fill="#2563EB" opacity="0.5" />
              </svg>
            </div>

            {/* Bottom Cards */}
            <div className="mt-auto flex gap-4 z-20">
              {[
                { icon: Zap, label: "Fast Processing", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: MessageCircle, label: "24/7 Support", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: ShieldCheck, label: "Secure Platform", color: "text-blue-500", bg: "bg-blue-50" }
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-w-[140px]">
                  <div className={`w-10 h-10 rounded-full ${card.bg} flex items-center justify-center mb-3`}>
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">{card.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-2/5 bg-white flex flex-col relative">
          {/* Badge */}
          <div className="absolute top-6 right-6 z-20 hidden md:block">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-[10px] font-semibold text-green-700 uppercase tracking-wider">Secure B2B Portal</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20">
            {/* The Login Card exactly matching the screenshot structure */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden relative">
              {/* Top colored border */}
              <div className="h-1.5 w-full bg-blue-600"></div>
              
              <div className="p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-[#1a1f36] mb-1">Client Login</h2>
                <p className="text-sm text-gray-500 mb-8">Access the Nexora B2B partner dashboard</p>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email or ID</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@agency.com" 
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password" 
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-900"
                      />
                      <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">Remember me</span>
                    </label>
                    <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3.5 rounded-lg shadow-sm shadow-blue-600/20 transition-colors mt-4"
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <Link to="/" className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors">
                    <ArrowLeft className="w-3 h-3" /> Back to Home
                  </Link>
                  <p className="text-[11px] text-gray-400">
                    Need access? Contact <a href="mailto:partnerships@nexora.com" className="text-blue-600 hover:underline">partnerships@nexora.com</a>
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
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-md shadow-blue-600/20">
             <img src={nexoraLogo} alt="Nexora" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-gray-900 tracking-tight text-lg">Nexora</span>
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
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Lock className="w-4 h-4 text-gray-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Client Portal</span>
            <ChevronDown className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Alex Client</p>
                <p className="text-xs text-gray-500">Nova Corp</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Alex+Client&background=2563eb&color=fff" alt="User" className="w-9 h-9 rounded-full border border-gray-200" />
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
