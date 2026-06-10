import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { m, AnimatePresence, useDragControls, useReducedMotion } from 'framer-motion';
import { 
  Mail, Eye, Zap, MessageCircle, ShieldCheck, 
  LayoutDashboard, FolderKanban, Receipt, Settings, 
  Bell, ChevronDown, ArrowLeft, ArrowRight,
  CheckCircle2, Terminal, X, Send, MessageSquare, Download, File,
  Activity, Cpu, Globe, TrendingUp, Menu, Search, Sparkles, LogOut, EyeOff,
  CalendarDays, Layers3, Play, MoreHorizontal, Plus, Command, Gauge, Users,
  ExternalLink, CircleDot, WalletCards, User, Lock, AlertCircle
} from 'lucide-react';
import nexoraLogo from '../assets/nexora-logo.png';
import '../styles/client-portal.css';
import { supabase } from '../lib/supabase';

const MOCK_DATA = {
  clients: [
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      email: 'nova@nexora.com',
      password_hash: 'Nova@2026',
      client_name: 'Alex Johnson',
      company_name: 'Nova Corp'
    },
    {
      id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      email: 'stellar@nexora.com',
      password_hash: 'Stellar@2026',
      client_name: 'Sarah Williams',
      company_name: 'Stellar Inc'
    },
    {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      email: 'client@nexora.com',
      password_hash: 'NexoraClient2026',
      client_name: 'Alex Johnson',
      company_name: 'Nova Corp'
    }
  ],
  projects: [
    {
      id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_name: 'Nova Brand Redesign',
      description: 'Complete brand overhaul including logo, website, and marketing materials.',
      status: 'active',
      progress: 63,
      start_date: '2026-03-01',
      due_date: '2026-08-15'
    },
    {
      id: 'd1000001-0000-0000-0000-000000000002',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_name: 'Nova Mobile App',
      description: 'iOS and Android app development for customer engagement.',
      status: 'active',
      progress: 25,
      start_date: '2026-05-10',
      due_date: '2026-12-01'
    },
    {
      id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_name: 'Stellar E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration.',
      status: 'active',
      progress: 80,
      start_date: '2026-01-15',
      due_date: '2026-07-01'
    },
    {
      id: 'd2000001-0000-0000-0000-000000000002',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_name: 'Stellar SEO Campaign',
      description: 'Comprehensive SEO and content marketing strategy.',
      status: 'completed',
      progress: 100,
      start_date: '2026-02-01',
      due_date: '2026-05-30'
    }
  ],
  milestones: [
    {
      id: 'm1',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Discovery & Research',
      description: 'Market analysis and competitor research',
      status: 'completed',
      progress: 100,
      due_date: '2026-03-20'
    },
    {
      id: 'm2',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'UI/UX Design',
      description: 'Wireframes, mockups, and prototypes',
      status: 'in_progress',
      progress: 70,
      due_date: '2026-05-15'
    },
    {
      id: 'm3',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Frontend Development',
      description: 'React implementation with animations',
      status: 'pending',
      progress: 0,
      due_date: '2026-07-01'
    },
    {
      id: 'm4',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      title: 'Launch & Deployment',
      description: 'Final QA, deployment, and handover',
      status: 'pending',
      progress: 0,
      due_date: '2026-08-15'
    },
    {
      id: 'm5',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Backend Architecture',
      description: 'API design and database setup',
      status: 'completed',
      progress: 100,
      due_date: '2026-02-28'
    },
    {
      id: 'm6',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Payment Integration',
      description: 'Stripe and PayPal integration',
      status: 'completed',
      progress: 100,
      due_date: '2026-04-15'
    },
    {
      id: 'm7',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Frontend Storefront',
      description: 'Product pages, cart, and checkout',
      status: 'in_progress',
      progress: 60,
      due_date: '2026-06-01'
    },
    {
      id: 'm8',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      title: 'Testing & Launch',
      description: 'E2E testing and production deployment',
      status: 'pending',
      progress: 0,
      due_date: '2026-07-01'
    }
  ],
  invoices: [
    {
      id: 'i1',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-001',
      amount: 3500.00,
      status: 'paid',
      issue_date: '2026-03-01',
      due_date: '2026-03-15',
      paid_date: '2026-03-10',
      description: 'Phase 1: Discovery & Research'
    },
    {
      id: 'i2',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-002',
      amount: 8250.00,
      status: 'paid',
      issue_date: '2026-04-15',
      due_date: '2026-04-30',
      paid_date: '2026-04-28',
      description: 'Phase 2: UI/UX Design'
    },
    {
      id: 'i3',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-003',
      amount: 12000.00,
      status: 'pending',
      issue_date: '2026-06-01',
      due_date: '2026-06-15',
      paid_date: null,
      description: 'Phase 3: Frontend Development'
    },
    {
      id: 'i4',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-010',
      amount: 5000.00,
      status: 'paid',
      issue_date: '2026-01-15',
      due_date: '2026-01-30',
      paid_date: '2026-01-25',
      description: 'Phase 1: Backend Architecture'
    },
    {
      id: 'i5',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-011',
      amount: 7500.00,
      status: 'paid',
      issue_date: '2026-03-01',
      due_date: '2026-03-15',
      paid_date: '2026-03-12',
      description: 'Phase 2: Payment Integration'
    },
    {
      id: 'i6',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      invoice_number: 'INV-2026-012',
      amount: 9000.00,
      status: 'pending',
      issue_date: '2026-05-15',
      due_date: '2026-06-01',
      paid_date: null,
      description: 'Phase 3: Frontend Storefront'
    }
  ],
  messages: [
    {
      id: 'msg1',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      sender: 'admin',
      message: 'Welcome to Nexora Studio! Your project dashboard is now live.',
      is_read: true,
      created_at: '2026-06-09T09:00:00Z'
    },
    {
      id: 'msg2',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      sender: 'client',
      message: 'Thanks! The mockups look amazing. Can we add one more page?',
      is_read: true,
      created_at: '2026-06-09T09:05:00Z'
    },
    {
      id: 'msg3',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      sender: 'admin',
      message: 'Absolutely! I have added the extra page to the scope. Updated timeline shared.',
      is_read: false,
      created_at: '2026-06-09T09:10:00Z'
    },
    {
      id: 'msg4',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      sender: 'admin',
      message: 'Welcome Sarah! Your e-commerce project is progressing well.',
      is_read: true,
      created_at: '2026-06-09T10:00:00Z'
    },
    {
      id: 'msg5',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      sender: 'client',
      message: 'Great! When can we expect the storefront preview?',
      is_read: true,
      created_at: '2026-06-09T10:05:00Z'
    },
    {
      id: 'msg6',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      sender: 'admin',
      message: 'The preview will be ready by next Friday. I will send you the staging link.',
      is_read: false,
      created_at: '2026-06-09T10:10:00Z'
    }
  ],
  deliverables: [
    {
      id: 'd1',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      title: 'Brand Guidelines PDF',
      file_type: 'pdf',
      status: 'delivered'
    },
    {
      id: 'd2',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      title: 'Logo Package (SVG + PNG)',
      file_type: 'zip',
      status: 'delivered'
    },
    {
      id: 'd3',
      client_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      project_id: 'd1000001-0000-0000-0000-000000000001',
      title: 'Homepage Mockup v2',
      file_type: 'figma',
      status: 'revision'
    },
    {
      id: 'd4',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      title: 'API Documentation',
      file_type: 'pdf',
      status: 'approved'
    },
    {
      id: 'd5',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      title: 'Database Schema Diagram',
      file_type: 'png',
      status: 'approved'
    },
    {
      id: 'd6',
      client_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      project_id: 'd2000001-0000-0000-0000-000000000001',
      title: 'Storefront Design Mockups',
      file_type: 'figma',
      status: 'pending'
    }
  ]
};

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

const InteractiveInvoice = ({ invoice }) => {
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

  if (!invoice) {
    return (
      <div className="text-gray-500 text-center py-6 bg-[#0a0c14]/40 border border-white/[0.04] rounded-2xl w-full">
        No active invoices to display.
      </div>
    );
  }

  const isPaid = invoice.status === 'paid';
  const amountFormatted = parseFloat(invoice.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="mt-8 flex flex-col xl:flex-row gap-12 items-center bg-[#0a0c14]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] rounded-full" />
         <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>
      
      <div className="flex-1 space-y-4 relative z-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
          isPaid 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
        }`}>
          {isPaid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
          {isPaid ? 'PAID IN FULL' : 'PENDING PAYMENT'}
        </div>
        <h3 className="text-3xl font-bold text-white">{invoice.description || 'Project Invoice'}</h3>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          Invoice #{invoice.invoice_number} for the development and deliverables of this phase.
        </p>
        <button className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors pt-2 group">
          Download PDF Receipt <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3D Card Container */}
      <div 
        className="relative w-full max-w-md aspect-[1.6/1] [perspective:1000px] cursor-pointer shrink-0 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <m.div
          ref={cardRef}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full rounded-2xl p-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a0c14] to-black text-white shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between border border-white/[0.15]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Holographic Glare Effect */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Top Row */}
          <div className="flex justify-between items-start relative z-20" style={{ transform: "translateZ(30px)" }}>
            <div>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase block mb-1">Invoice Amount</span>
              <span className="text-2xl font-bold tracking-tight text-white">${amountFormatted}</span>
            </div>
            {/* Smart Chip Graphic */}
            <div className="w-10 h-7 rounded bg-gradient-to-tr from-[#e5e7eb] to-[#9ca3af] flex flex-col justify-between p-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] opacity-90 border border-gray-400">
               <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 bg-gray-500/50 rounded-sm" />
                  <div className="w-1.5 h-1.5 bg-gray-500/50 rounded-sm" />
               </div>
               <div className="h-0.5 bg-gray-500/50 rounded" />
            </div>
          </div>

          {/* Middle Pattern */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none" style={{ transform: "translateZ(15px)" }}>
            <Zap className="w-48 h-48" />
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end relative z-20" style={{ transform: "translateZ(40px)" }}>
            <div className="space-y-1">
              <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Invoice Number</div>
              <div className="text-sm font-semibold tracking-wide text-gray-200">{invoice.invoice_number}</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{isPaid ? 'Date Paid' : 'Due Date'}</div>
              <div className={`text-sm font-semibold tracking-wide ${isPaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isPaid 
                  ? new Date(invoice.paid_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                  : new Date(invoice.due_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                }
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

const AIConcierge = ({ clientInfo, projects, invoices, milestones }) => {
  const dragControls = useDragControls();
  const messageIdRef = useRef(2);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: `Hi ${clientInfo?.client_name || 'there'}! I am your Nexora AI Concierge. How can I help you with your project today?` }
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
    const userMessage = { id: messageIdRef.current++, role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Dynamic AI Response logic using context
    setTimeout(() => {
      let responseText = `Hi ${clientInfo?.client_name || 'there'}! I'm checking on that for you. The Nexora team is currently on standby.`;
      const lowerInput = text.toLowerCase();
      
      const activeProject = projects.find(p => p.status === 'active') || projects[0];
      const pendingInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue');
      const outstandingAmount = pendingInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

      if (lowerInput.includes('invoice') || lowerInput.includes('pay') || lowerInput.includes('bill')) {
        if (outstandingAmount > 0) {
          responseText = `You currently have ${pendingInvoices.length} outstanding invoice(s) totalling $${outstandingAmount.toLocaleString()}. The next due date is ${new Date(pendingInvoices[0].due_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}.`;
        } else {
          responseText = `All of your invoices are paid in full! Your total value delivered is $${invoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toLocaleString()}.`;
        }
      } else if (lowerInput.includes('project') || lowerInput.includes('status') || lowerInput.includes('progress') || lowerInput.includes('milestone')) {
        if (activeProject) {
          responseText = `Your project "${activeProject.project_name}" is currently active and is at ${activeProject.progress}% completion. Its due date is ${new Date(activeProject.due_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}.`;
        } else {
          responseText = "You don't have any active projects at the moment. Let us know if you'd like to start a new engagement.";
        }
      } else if (lowerInput.includes('support') || lowerInput.includes('help')) {
        responseText = "You can contact our support team at support@nexora.com. You can also chat directly with our developers in the 'Command Center' under the Messages tab.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        responseText = `Hello ${clientInfo?.client_name || ''}! Let me know if you need any updates on your active milestones, billing, or telemetry.`;
      }

      setMessages(prev => [...prev, { id: messageIdRef.current++, role: 'ai', text: responseText }]);
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
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-xl flex items-center justify-center border border-blue-400/30 shadow-blue-500/20"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#070709] animate-pulse"></span>
          </m.button>
        </div>
      </m.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0.05}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 right-8 w-[90vw] sm:w-[400px] bg-[#0a0c14]/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.08] z-50 overflow-hidden flex flex-col"
            style={{ height: '600px', maxHeight: 'calc(100vh - 4rem)' }}
          >
            {/* High-End Glassmorphism Header */}
            <div 
              onPointerDown={(e) => dragControls.start(e)}
              className="relative p-5 flex items-center justify-between text-white overflow-hidden bg-[#0d0f1a]/95 border-b border-white/[0.06] cursor-grab active:cursor-grabbing select-none group"
              title="Drag to reposition"
            >
              {/* Animated abstract background for AI feel */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <m.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 blur-2xl rounded-full"
                />
              </div>
              
              <div className="relative z-10 flex items-center gap-4 pointer-events-none">
                {/* Drag Handle Indicator */}
                <svg className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors mr-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="9" cy="5" r="1" />
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="9" cy="19" r="1" />
                  <circle cx="15" cy="5" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <circle cx="15" cy="19" r="1" />
                </svg>

                {/* AI Orb Logo */}
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <m.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-500/20 rounded-full"
                  />
                  <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" />
                  <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-[spin_4s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-wide text-white">Nova Telemetry</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]" />
                    <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">System Online</p>
                  </div>
                </div>
              </div>
              <button 
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-[#07080d]/80 to-[#07080d] flex flex-col gap-5 relative">
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
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm border border-blue-500/20 shadow-md shadow-blue-500/10' 
                        : 'bg-white/[0.03] border border-white/[0.08] text-gray-200 rounded-tl-sm shadow-sm shadow-black/20'
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
                  <div className="bg-white/[0.03] border border-white/[0.08] px-4 py-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                    <m.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_6px_#60a5fa]" />
                    <m.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_6px_#60a5fa]" />
                    <m.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_6px_#60a5fa]" />
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
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-1 px-1">Suggested Questions</p>
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="text-left text-xs text-gray-300 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/40 hover:text-blue-400 hover:bg-white/[0.04] py-2.5 px-4 rounded-xl transition-colors shadow-sm hover:shadow flex items-center justify-between group"
                    >
                      {suggestion}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                    </button>
                  ))}
                </m.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0a0c14]/95 border-t border-white/[0.06] shadow-[0_-5px_15px_rgba(0,0,0,0.2)] relative z-10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query telemetry system..."
                  className="w-full bg-[#131522] border border-white/[0.08] text-white text-sm rounded-full pl-5 pr-14 py-3 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-inner placeholder-gray-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-500 transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)] disabled:shadow-none"
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

const LegacyOverviewTab = () => (
  <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="portal-page p-5 sm:p-8 max-w-6xl mx-auto w-full">
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

const OverviewTab = ({ clientInfo, projects, milestones, invoices }) => {
  const reduceMotion = useReducedMotion();
  const rise = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
  });

  const activeProject = projects.find(p => p.status === 'active') || projects[0];
  const projectMilestones = activeProject ? milestones.filter(m => m.project_id === activeProject.id) : [];
  
  // Outstanding invoices balance calculation
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue');
  const outstandingAmount = pendingInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const nextDueDate = pendingInvoices.length > 0 
    ? new Date(pendingInvoices[0].due_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) 
    : 'N/A';
  const nextInvoiceNo = pendingInvoices.length > 0 ? pendingInvoices[0].invoice_number : 'N/A';

  // Format milestones for UI
  const uiMilestones = projectMilestones.length > 0 ? projectMilestones : [
    { id: 1, title: 'Discovery', due_date: '2026-09-08', status: 'completed' },
    { id: 2, title: 'Design', due_date: '2026-09-28', status: 'completed' },
    { id: 3, title: 'Build', due_date: '2026-10-18', status: 'in_progress' },
    { id: 4, title: 'Launch', due_date: '2026-10-28', status: 'pending' }
  ];

  const formatDueDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  };

  const currentMilestoneIndex = uiMilestones.findIndex(m => m.status === 'in_progress' || m.status === 'review');
  const activeMilestoneIndex = currentMilestoneIndex !== -1 ? currentMilestoneIndex : uiMilestones.findIndex(m => m.status === 'pending');
  const activeMilestone = activeMilestoneIndex !== -1 ? uiMilestones[activeMilestoneIndex] : null;

  return (
    <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 xl:p-8">
      <m.section {...rise()} className="relative mb-4 overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#101121]/85 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8 xl:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(129,140,248,0.2),transparent_28%),radial-gradient(circle_at_15%_100%,rgba(34,211,238,0.1),transparent_30%)]" />
        <div className="absolute right-[-7%] top-[-65%] h-[500px] w-[500px] rounded-full border border-white/[0.05]" />
        <div className="absolute right-[1%] top-[-45%] h-[380px] w-[380px] rounded-full border border-white/[0.05]" />
        <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.07] px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300"><CircleDot className="h-3 w-3" /> Delivery in motion</span>
              <span className="text-[10px] font-bold text-gray-600">Last synced 2 minutes ago</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-300">Good afternoon, {clientInfo?.client_name || 'Guest'}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.055em] text-white sm:text-5xl xl:text-6xl">Everything your team needs, <span className="text-gray-600">in one clear view.</span></h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black text-[#080914] transition-transform hover:-translate-y-0.5">Review latest build <Play className="h-3.5 w-3.5 fill-current transition-transform group-hover:translate-x-0.5" /></button>
              <button className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-5 py-3 text-xs font-bold text-gray-300 transition-colors hover:bg-white/[0.07]"><MessageCircle className="h-3.5 w-3.5" /> Message team</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              [`${activeProject?.progress || 0}%`, 'Complete', 'text-cyan-300'], 
              [`${activeProject ? Math.max(0, Math.ceil((new Date(activeProject.due_date) - new Date()) / (1000 * 60 * 60 * 24))) : 0}`, 'Days left', 'text-indigo-300'], 
              ['99', 'Health', 'text-emerald-300']
            ].map(([value, label, color], index) => (
              <m.div key={label} {...rise(0.2 + index * 0.08)} className="rounded-2xl border border-white/[0.07] bg-black/10 p-4">
                <span className={`block text-2xl font-black tracking-[-0.06em] ${color}`}>{value}</span><span className="mt-1 block text-[8px] font-black uppercase tracking-[0.17em] text-gray-600">{label}</span>
              </m.div>
            ))}
          </div>
        </div>
      </m.section>

      <div className="grid gap-4 xl:grid-cols-12">
        <m.section {...rise(0.1)} className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d0f1c]/85 p-6 backdrop-blur-2xl xl:col-span-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300">Primary mission</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white">{activeProject?.project_name || 'No Project Assigned'}</h2>
              <p className="mt-2 text-xs text-gray-600">{activeProject?.description || 'Get in touch with us to begin your journey.'}</p>
            </div>
            <button className="rounded-full border border-white/[0.07] p-2 text-gray-600 transition-colors hover:text-white"><MoreHorizontal className="h-4 w-4" /></button>
          </div>
          <div className="relative mb-8">
            <div className="absolute left-0 right-0 top-4 h-px bg-white/[0.07]" />
            <m.div initial={{ width: 0 }} animate={{ width: `${activeProject?.progress || 0}%` }} transition={{ duration: 1.2, delay: 0.3 }} className="absolute left-0 top-4 h-px bg-gradient-to-r from-indigo-400 to-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.5)]" />
            <div className="relative grid grid-cols-4">
              {uiMilestones.map((mItem, index) => {
                const isCompleted = mItem.status === 'completed';
                const isActive = mItem.status === 'in_progress' || mItem.status === 'review';
                return (
                  <div key={mItem.id || index} className={index === uiMilestones.length - 1 ? 'text-right' : index > 0 ? 'text-center' : ''}>
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#0d0f1c] ${
                      isCompleted ? 'bg-indigo-400 text-white' : 
                      isActive ? 'bg-cyan-300 text-[#071018] shadow-[0_0_20px_rgba(103,232,249,.45)]' : 
                      'bg-[#171927] text-gray-600'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="text-[9px] font-black">{index + 1}</span>}
                    </span>
                    <p className={`mt-3 text-[10px] font-black ${!isCompleted && !isActive ? 'text-gray-600' : 'text-gray-200'}`}>{mItem.title}</p>
                    <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-gray-700">{formatDueDate(mItem.due_date)}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [Layers3, 'Current sprint', activeMilestone ? activeMilestone.title : 'None', 'text-indigo-300'], 
              [Users, 'Delivery team', '4 specialists', 'text-cyan-300'], 
              [CalendarDays, 'Target launch', activeProject ? formatDueDate(activeProject.due_date) : 'N/A', 'text-emerald-300']
            ].map(([Icon, label, value, color]) => (
              <div key={label} className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                <Icon className={`mb-4 h-4 w-4 ${color}`} />
                <p className="text-[8px] font-black uppercase tracking-[0.17em] text-gray-700">{label}</p>
                <p className="mt-1 text-xs font-bold text-gray-300">{value}</p>
              </div>
            ))}
          </div>
        </m.section>

        <m.section {...rise(0.16)} className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#d8ff63] to-[#8de86d] p-6 text-[#10150d] xl:col-span-4">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-black/10" /><div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-black/10" />
          <div className="relative flex h-full min-h-[290px] flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-black/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em]">Approval needed</span>
              <ExternalLink className="h-4 w-4" />
            </div>
            <div className="my-auto">
              <Sparkles className="mb-5 h-6 w-6" />
              <h3 className="max-w-xs text-3xl font-black leading-[1.02] tracking-[-0.05em]">
                {activeMilestone ? `${activeMilestone.title} is ready for review.` : 'No milestones ready for review.'}
              </h3>
              <p className="mt-4 max-w-xs text-xs font-semibold leading-5 text-black/55">
                {activeProject ? `Approve today to keep the ${formatDueDate(activeProject.due_date)} launch target locked.` : ''}
              </p>
            </div>
            <button className="flex items-center justify-between rounded-full bg-[#10150d] px-5 py-3.5 text-xs font-black text-white transition-transform hover:-translate-y-0.5">
              Open approval <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </m.section>

        <m.section {...rise(0.22)} className="rounded-[28px] border border-white/[0.08] bg-[#0d0f1c]/85 p-6 backdrop-blur-2xl xl:col-span-4">
          <div className="mb-6 flex items-center justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-600">Asset health</p><h3 className="mt-2 text-lg font-black text-white">Production pulse</h3></div><Gauge className="h-5 w-5 text-cyan-300" /></div>
          <div className="flex items-center gap-5"><div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#67e8f9_0_99%,rgba(255,255,255,.05)_99%)]"><div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#0d0f1c] text-2xl font-black text-white">99</div></div><div className="space-y-3 text-[10px]"><p className="flex items-center justify-between gap-8 text-gray-600">Uptime <b className="text-emerald-300">99.99%</b></p><p className="flex items-center justify-between gap-8 text-gray-600">Load time <b className="text-white">0.8s</b></p><p className="flex items-center justify-between gap-8 text-gray-600">Incidents <b className="text-white">0</b></p></div></div>
        </m.section>
        <m.section {...rise(0.28)} className="rounded-[28px] border border-white/[0.08] bg-[#0d0f1c]/85 p-6 backdrop-blur-2xl xl:col-span-4">
          <div className="mb-6 flex items-center justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-600">Billing</p><h3 className="mt-2 text-lg font-black text-white">Current balance</h3></div><WalletCards className="h-5 w-5 text-indigo-300" /></div>
          <p className="text-4xl font-black tracking-[-0.06em] text-white">
            {outstandingAmount > 0 ? `$${outstandingAmount.toLocaleString()}` : '$0.00'}
          </p>
          <div className="mt-4 flex items-center justify-between text-[9px]">
            <span className="font-bold text-amber-300">{outstandingAmount > 0 ? `Due ${nextDueDate}` : 'All caught up'}</span>
            <span className="text-gray-700">{nextInvoiceNo}</span>
          </div>
          <button className="mt-6 w-full rounded-full border border-white/[0.08] bg-white/[0.04] py-3 text-[10px] font-black text-gray-300 transition-colors hover:bg-white/[0.08]">View invoice</button>
        </m.section>
        <m.section {...rise(0.34)} className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d0f1c]/85 xl:col-span-4"><LivePulseFeed /></m.section>
      </div>
    </div>
  );
}

void LegacyOverviewTab;

const ProjectsTab = ({ projects, clientInfo }) => {
  const [showArchived, setShowArchived] = useState(false);

  const filteredProjects = (projects || []).filter(p => {
    if (showArchived) {
      return p.status === 'completed' || p.status === 'cancelled';
    } else {
      return p.status === 'active' || p.status === 'paused';
    }
  });

  return (
    <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="portal-page p-5 sm:p-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Mission Control</h1>
          <p className="text-gray-400 text-sm">Active project sprints, deliverables, and architecture blueprints.</p>
        </div>
        <div className="flex gap-2 bg-[#0f1115] p-1 rounded-lg border border-white/[0.05]">
          <button 
            onClick={() => setShowArchived(false)}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-all ${!showArchived ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'}`}
          >
            Active Sprints
          </button>
          <button 
            onClick={() => setShowArchived(true)}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-all ${showArchived ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'}`}
          >
            Archived
          </button>
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0c14]/40 border border-white/[0.04] rounded-2xl">
          <p className="text-gray-400 text-sm">No projects found in this section.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isActive = project.status === 'active';
            const isCompleted = project.status === 'completed';
            const progress = project.progress || 0;
            
            const initials = clientInfo?.client_name
              ? clientInfo.client_name.split(' ').map(n => n[0]).join('')
              : 'AC';

            return (
              <div key={project.id} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#0a0c14]/90 backdrop-blur-md rounded-2xl border border-white/[0.08] p-6 hover:border-blue-500/30 transition-all h-full flex flex-col overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 bg-[#131522] rounded-xl flex items-center justify-center border border-white/[0.05] group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors shadow-inner z-10">
                       <FolderKanban className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                     </div>
                     <span className={`px-2.5 py-1 text-xs font-bold rounded-md border shadow-[0_0_10px_rgba(59,130,246,0.1)] flex items-center gap-1.5 z-10 ${
                       isActive
                         ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                         : isCompleted
                         ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                         : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                     }`}>
                       {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                       {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                     </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-50 transition-colors z-10">{project.project_name}</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-1 z-10">{project.description}</p>
                  
                  <div className="mt-auto z-10">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-[#0a0c14] shadow-sm flex items-center justify-center text-[10px] font-bold text-white">
                          {initials}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-white">{progress}%</span>
                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider block">Completion</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-[#131522] rounded-full h-1.5 border border-white/[0.02] overflow-hidden relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </m.div>
  );
};
const InvoicesTab = ({ invoices }) => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const activeInvoice = (invoices || []).find(inv => inv.id === selectedInvoiceId) ||
    (invoices || []).find(inv => inv.status !== 'paid' && inv.status !== 'cancelled') ||
    (invoices || [])[0] ||
    null;

  // Set selected invoice if none is set and we have invoices
  useEffect(() => {
    if (invoices && invoices.length > 0 && !selectedInvoiceId) {
      const firstUnpaid = invoices.find(inv => inv.status !== 'paid' && inv.status !== 'cancelled');
      if (firstUnpaid) {
        setSelectedInvoiceId(firstUnpaid.id);
      } else {
        setSelectedInvoiceId(invoices[0].id);
      }
    }
  }, [invoices, selectedInvoiceId]);

  const totalPaid = (invoices || [])
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);

  const hasUnpaid = (invoices || []).some(inv => inv.status !== 'paid' && inv.status !== 'cancelled');

  const formattedTotalPaid = totalPaid.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const totalCents = (totalPaid % 1).toFixed(2).substring(2);

  // Sparkline values based on invoice amounts or default progression
  const sparklineValues = invoices && invoices.length > 0 
    ? [...invoices].reverse().map(inv => {
        const val = parseFloat(inv.amount || 0);
        return Math.min(100, Math.max(20, (val / 15000) * 100));
      })
    : [30, 45, 20, 65, 80, 50, 100];

  return (
    <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="portal-page p-5 sm:p-8 max-w-6xl mx-auto w-full space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <WalletCards className="w-6 h-6 text-indigo-400" />
            Billing & Invoices
          </h1>
          <p className="text-gray-400 text-sm">Secure ledger of all project invoices and payment history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Summary & Chart */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-[#0a0c14]/80 backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden group">
             <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
             <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Total Value Delivered</h3>
             <div className="flex items-baseline gap-2 mb-2">
               <span className="text-4xl font-black tracking-tighter text-white">${formattedTotalPaid}</span>
               <span className="text-sm font-bold text-indigo-400">.{totalCents}</span>
             </div>
             {hasUnpaid ? (
               <p className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                 <AlertCircle className="w-3.5 h-3.5 animate-pulse" /> Pending invoices require attention
               </p>
             ) : (
               <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                 <CheckCircle2 className="w-3.5 h-3.5" /> All invoices paid in full
               </p>
             )}
             
             {/* Mini Sparkline Chart */}
             <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-end justify-between h-20 gap-2">
               {sparklineValues.map((val, i) => (
                 <m.div 
                   key={i} 
                   initial={{ height: 0 }}
                   animate={{ height: `${val}%` }}
                   transition={{ duration: 0.8, delay: i * 0.05 }}
                   className="w-full bg-indigo-500/20 hover:bg-indigo-500/40 rounded-t-sm transition-colors cursor-pointer relative group/bar animate-pulse"
                 >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white text-black text-[10px] font-bold px-2 py-1 rounded pointer-events-none whitespace-nowrap z-30">
                       INV-{i + 1}
                     </div>
                 </m.div>
               ))}
             </div>
           </div>
           
           <div className="bg-gradient-to-br from-indigo-900/40 to-[#0a0c14] border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
             <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-indigo-500/10" />
             <h3 className="text-sm font-bold text-white mb-2">Nexora Enterprise</h3>
             <p className="text-xs text-indigo-200/70 mb-4 leading-relaxed">Upgrade to a retainer model to streamline billing and lock in priority development hours.</p>
             <button className="text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded-lg transition-colors w-full">
               View Retainer Plans
             </button>
           </div>
        </div>

        {/* Right Side: Interactive Invoice & Ledger */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Invoice</h3>
            </div>
            {activeInvoice ? (
              <InteractiveInvoice invoice={activeInvoice} />
            ) : (
              <div className="text-center py-12 bg-[#0a0c14]/40 border border-white/[0.04] rounded-2xl">
                <p className="text-gray-400 text-sm">No invoices found.</p>
              </div>
            )}
          </div>

          <div className="pt-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Billing History</h3>
            <div className="space-y-3">
              {(invoices || []).map((inv, i) => {
                const amountFormatted = parseFloat(inv.amount || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                const isPaid = inv.status === 'paid';
                const isSelected = activeInvoice?.id === inv.id;

                return (
                  <m.div 
                    key={inv.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedInvoiceId(inv.id)}
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-500/10 border-indigo-500/30'
                        : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.04] hover:border-white/[0.1]'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                        isSelected 
                          ? 'bg-indigo-500/20 border-indigo-400 scale-105'
                          : 'bg-[#0a0c14] border-white/[0.08] group-hover:border-indigo-500/30 group-hover:scale-105'
                      }`}>
                        <Receipt className={`w-5 h-5 transition-colors ${
                          isSelected ? 'text-indigo-400' : 'text-gray-400 group-hover:text-indigo-400'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-white">{inv.description || 'Consulting Services'}</h4>
                          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${
                            isPaid
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : inv.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {inv.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-gray-500">{inv.invoice_number || inv.id}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-xs text-gray-400">Issued: {inv.issue_date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-6 pl-16 sm:pl-0">
                      <span className={`text-lg font-black tracking-tight transition-colors ${
                        isSelected ? 'text-indigo-300' : 'text-white group-hover:text-indigo-300'
                      }`}>{amountFormatted}</span>
                      <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-indigo-500/20 text-white' 
                          : 'bg-white/[0.05] text-gray-400 group-hover:text-white group-hover:bg-white/[0.1]'
                      }`}>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

const MessagesTab = ({ messages, onSendMessage, clientInfo, projects, invoices, milestones }) => {
  const [activeChat, setActiveChat] = useState('concierge');
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  // Scroll to bottom of chat when messages or active chat change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group database messages by date
  const groupMessagesByDate = (msgs) => {
    const groups = {};
    (msgs || []).forEach(m => {
      const dateStr = new Date(m.created_at).toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
      });
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(m);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="portal-page p-5 sm:p-8 max-w-6xl mx-auto w-full h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-400" />
            Command Center
          </h1>
          <p className="text-gray-400 text-sm">Direct encrypted communication channels with your team.</p>
        </div>
      </div>
      
      <div className="flex-1 bg-[#0a0c14]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row relative">
        
        {/* Holographic glowing borders */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col bg-[#05060a]/50">
          <div className="p-5 border-b border-white/[0.06]">
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Communication Nodes</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
             <button 
               onClick={() => setActiveChat('concierge')}
               className={`w-full text-left p-4 rounded-xl flex gap-4 transition-all relative overflow-hidden ${activeChat === 'concierge' ? 'bg-blue-500/10 border border-blue-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05]'}`}
             >
                {activeChat === 'concierge' && (
                  <m.div layoutId="activeChatIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                )}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg border border-white/10">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0a0c14] rounded-full animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-bold text-white truncate">AI Concierge</h4>
                    <span className="text-[10px] text-blue-400 font-bold">Node 1</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate font-medium">Interactive project guide & assistant.</p>
                </div>
             </button>

             <button 
               onClick={() => setActiveChat('devs')}
               className={`w-full text-left p-4 rounded-xl flex gap-4 transition-all relative overflow-hidden ${activeChat === 'devs' ? 'bg-indigo-500/10 border border-indigo-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05]'}`}
             >
                {activeChat === 'devs' && (
                  <m.div layoutId="activeChatIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                )}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[#131522] flex items-center justify-center border border-white/10">
                    <Terminal className="w-5 h-5 text-gray-400" />
                  </div>
                  {messages && messages.length > 0 && messages[messages.length - 1].sender === 'admin' && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-bold text-white truncate">Dev & Admin Team</h4>
                    <span className="text-[10px] text-gray-600 font-bold">Node 2</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate font-medium">
                    {messages && messages.length > 0 
                      ? messages[messages.length - 1].message
                      : 'Start encrypted session...'}
                  </p>
                </div>
             </button>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0c14] to-black">
           
           <div className="p-5 border-b border-white/[0.06] bg-[#0a0c14]/50 backdrop-blur-md flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 border border-blue-400/20">
                  {activeChat === 'concierge' ? <Sparkles className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                </div>
                <div>
                   <h3 className="text-sm font-bold text-white">
                     {activeChat === 'concierge' ? 'Nexora AI Concierge' : `${clientInfo?.company_name || 'Workspace'} Secure Channel`}
                   </h3>
                   <div className="flex items-center gap-1.5 mt-0.5">
                     <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399] animate-pulse" />
                     <span className="text-[10px] text-emerald-400 uppercase font-mono tracking-widest font-bold">Encrypted Connection</span>
                   </div>
                </div>
              </div>
           </div>
           
           {activeChat === 'concierge' ? (
             <div className="flex-1 flex flex-col overflow-hidden relative">
               <div className="flex-1 p-6 overflow-y-auto">
                 <div className="text-center my-4">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 bg-[#0a0c14] px-3 py-1 rounded-full border border-white/[0.05]">Standalone Instance</span>
                 </div>
                 <div className="flex justify-start mb-6">
                   <div className="max-w-[75%] p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl rounded-tl-sm text-sm text-gray-300 shadow-lg backdrop-blur-md relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />
                     Hello {clientInfo?.client_name || 'there'}! I have compiled stats from your active project sprints and invoices. Type your queries about billing, milestone status, or support tickets and I will synthesize the answers.
                   </div>
                 </div>
                 <div className="border border-white/[0.05] rounded-2xl p-4 bg-[#050609]/40 backdrop-blur-md max-w-xl mx-auto mt-6">
                   <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4 text-blue-400" />
                     Quick Reference Info
                   </h4>
                   <p className="text-xs text-gray-400 leading-relaxed">
                     You can ask me questions such as:
                     <span className="block mt-2 font-mono text-blue-300 hover:underline cursor-pointer" onClick={() => setInputText("What's my project progress?")}>• What's my project progress?</span>
                     <span className="block mt-1 font-mono text-blue-300 hover:underline cursor-pointer" onClick={() => setInputText("Tell me about my invoices")}>• Tell me about my invoices</span>
                     <span className="block mt-1 font-mono text-blue-300 hover:underline cursor-pointer" onClick={() => setInputText("How do I contact support?")}>• How do I contact support?</span>
                   </p>
                 </div>
               </div>
               <div className="p-5 border-t border-white/[0.05] bg-[#030408]/60 text-center text-xs text-gray-500">
                 Note: For interactive floating AI Concierge controls, click the blue bubble in the bottom right of the screen.
               </div>
             </div>
           ) : (
             <>
               <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 scroll-smooth">
                 {Object.keys(messageGroups).length === 0 ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                     <MessageSquare className="w-12 h-12 text-gray-600 mb-3" />
                     <h4 className="text-sm font-bold text-gray-400">Secure Comms Established</h4>
                     <p className="text-xs text-gray-500 max-w-xs mt-1">Send a message to initiate direct communications with your account director.</p>
                   </div>
                 ) : (
                   Object.keys(messageGroups).map(dateStr => (
                     <div key={dateStr} className="space-y-4">
                       <div className="text-center my-4">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 bg-[#0a0c14] px-3 py-1 rounded-full border border-white/[0.05]">
                           {dateStr}
                         </span>
                       </div>
                       
                       {messageGroups[dateStr].map(msg => {
                         const isClient = msg.sender === 'client';
                         const timeStr = new Date(msg.created_at).toLocaleTimeString('en-US', { 
                           hour: '2-digit', 
                           minute: '2-digit',
                           hour12: true
                         });

                         return (
                           <m.div 
                             key={msg.id} 
                             initial={{ opacity: 0, y: 10 }} 
                             animate={{ opacity: 1, y: 0 }} 
                             className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}
                           >
                             <div className={`max-w-[75%] p-4 rounded-2xl text-sm relative shadow-md ${
                               isClient 
                                 ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-tr-sm border border-indigo-400/20 shadow-indigo-600/10' 
                                 : 'bg-white/[0.03] border border-white/[0.08] text-gray-300 rounded-tl-sm backdrop-blur-md'
                             }`}>
                               {!isClient && (
                                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50" />
                               )}
                               <p className="whitespace-pre-wrap">{msg.message}</p>
                               <span className={`block text-[9px] font-bold mt-2 text-right ${isClient ? 'text-indigo-200' : 'text-gray-500'}`}>
                                 {timeStr}
                               </span>
                             </div>
                           </m.div>
                         );
                       })}
                     </div>
                   ))
                 )}
                 <div ref={chatEndRef} />
               </div>
               
               <div className="p-5 bg-[#0a0c14]/80 backdrop-blur-md border-t border-white/[0.06] z-10">
                  <div className="relative flex items-end gap-3 bg-[#131522] border border-white/[0.08] rounded-2xl p-2 focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all shadow-inner">
                     <textarea 
                       value={inputText}
                       onChange={e => setInputText(e.target.value)}
                       onKeyDown={handleKeyPress}
                       placeholder="Transmit encrypted message..." 
                       className="w-full bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none resize-none py-2.5 max-h-32 min-h-[44px] pl-2"
                       rows={1}
                     />
                     <button 
                       onClick={handleSend}
                       className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 shrink-0"
                     >
                       <Send className="w-4 h-4 ml-0.5" />
                     </button>
                  </div>
               </div>
             </>
           )}
        </div>
      </div>
    </m.div>
  );
};

const DeliverablesTab = ({ deliverables }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const getFileIconColor = (fileType) => {
    const type = (fileType || '').toLowerCase();
    if (type === 'pdf') return 'red';
    if (type === 'zip') return 'blue';
    return 'purple';
  };

  const hasDynamicData = deliverables && deliverables.length > 0;
  
  const finalizedList = hasDynamicData
    ? deliverables.filter(d => d.status === 'delivered' || d.status === 'approved').map(d => ({
        name: d.title,
        size: d.file_type === 'pdf' ? '4.2 MB' : d.file_type === 'zip' ? '12.8 MB' : '18.5 MB',
        date: d.created_at ? new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'Oct 12',
        type: d.file_type || 'file',
        color: getFileIconColor(d.file_type)
      }))
    : [
        { name: "Brand_Guidelines_vFinal.pdf", size: "4.2 MB", date: "Oct 12", type: "pdf", color: "red" },
        { name: "Logo_Package_All_Formats.zip", size: "12.8 MB", date: "Oct 12", type: "zip", color: "blue" },
        { name: "UI_Design_System.fig", size: "18.5 MB", date: "Oct 10", type: "fig", color: "purple" }
      ];

  const wipList = hasDynamicData
    ? deliverables.filter(d => d.status === 'pending' || d.status === 'revision').map(d => ({
        name: d.title,
        size: d.file_type === 'pdf' ? '1.2 MB' : '8.1 MB',
        date: d.created_at ? new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'Today',
        type: d.file_type || 'fig',
        color: getFileIconColor(d.file_type)
      }))
    : [
        { name: "Homepage_Draft_v2.fig", size: "8.1 MB", date: "Today", type: "fig", color: "purple" },
        { name: "Copywriting_Wireframe.pdf", size: "1.2 MB", date: "Yesterday", type: "pdf", color: "red" }
      ];

  return (
    <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="portal-page p-5 sm:p-8 max-w-6xl mx-auto w-full space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Layers3 className="w-6 h-6 text-emerald-400" />
            Asset Vault
          </h1>
          <p className="text-gray-400 text-sm">Secure storage for your final deliverables and design source files.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl text-xs font-semibold text-white transition-all backdrop-blur-md">
            Request Asset
          </button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-semibold text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            Download All (24.5 MB)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Approved Final Assets */}
        <m.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-2 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Finalized Assets</h2>
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Production Ready</span>
          </div>

          {finalizedList.map((file, i) => (
            <m.div key={i} variants={item} className="group relative overflow-hidden bg-[#0a0c14]/80 backdrop-blur-md border border-white/[0.06] hover:border-emerald-500/30 rounded-2xl p-4 transition-all hover:shadow-[0_10px_30px_rgba(16,185,129,0.05)] cursor-pointer">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-inner
                    ${file.color === 'red' ? 'bg-red-500/10 text-red-400 border border-red-500/20 group-hover:bg-red-500/20' : 
                      file.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20' : 
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20'}`}
                  >
                    .{file.type}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{file.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 font-mono">{file.size}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Vaulted {file.date}</span>
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/[0.04] group-hover:bg-emerald-500 group-hover:text-black text-gray-400 flex items-center justify-center transition-all shadow-sm">
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Work In Progress */}
        <m.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-2 border-b border-white/[0.06]">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <FolderKanban className="w-4 h-4 text-indigo-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Work In Progress</h2>
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">In Review</span>
          </div>

          {wipList.map((file, i) => (
            <m.div key={i} variants={item} className="group relative overflow-hidden bg-[#0a0c14]/80 backdrop-blur-md border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl p-4 transition-all hover:shadow-[0_10px_30px_rgba(99,102,241,0.05)] cursor-pointer">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-inner
                    ${file.color === 'red' ? 'bg-red-500/10 text-red-400 border border-red-500/20 group-hover:bg-red-500/20' : 
                      file.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20' : 
                      'bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20'}`}
                  >
                    .{file.type}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{file.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 font-mono">{file.size}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">Updated {file.date}</span>
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/[0.04] group-hover:bg-indigo-500 group-hover:text-white text-gray-400 flex items-center justify-center transition-all shadow-sm">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </m.div>
  );
};

const SettingsTab = ({ clientInfo }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (clientInfo) {
      const parts = (clientInfo.client_name || '').split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setEmail(clientInfo.email || '');
      setCompanyName(clientInfo.company_name || '');
    }
  }, [clientInfo]);

  return (
    <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="portal-page p-5 sm:p-8 max-w-4xl mx-auto w-full space-y-8">
      <div className="mb-8 border-b border-white/[0.06] pb-6">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-400" />
          Configuration
        </h1>
        <p className="text-gray-400 text-sm">Manage your operational preferences, security settings, and notifications.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
         {/* Sidebar Navigation */}
         <div className="md:col-span-4 space-y-2">
            {['Profile & Identity', 'Security & Access', 'Billing Details', 'Notifications'].map((item, idx) => (
              <button key={idx} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${idx === 0 ? 'bg-white/[0.06] text-white shadow-sm border border-white/[0.04]' : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'}`}>
                 {item}
              </button>
            ))}
         </div>

         {/* Main Content Form */}
         <div className="md:col-span-8 space-y-6">
           <div className="bg-[#0a0c14]/80 backdrop-blur-2xl border border-white/[0.06] rounded-2xl p-6 shadow-lg">
             <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Profile & Identity</h3>
             
             <div className="flex items-center gap-6 mb-8 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                <div className="relative group">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(clientInfo?.client_name || 'Alex Client')}&background=2563eb&color=fff&size=128`} alt="User" className="w-20 h-20 rounded-xl border border-white/[0.1] shadow-xl object-cover" />
                  <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{clientInfo?.client_name || 'Alex Client'}</h4>
                  <p className="text-xs text-gray-400 mt-1">{clientInfo?.company_name || 'Nova Corp'} Workspace</p>
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs font-bold bg-white text-black px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">Upload New</button>
                    <button className="text-xs font-bold text-gray-400 hover:text-white px-3 py-1.5 transition-colors">Remove</button>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">First Name</label>
                   <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-[#131522] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner" />
                </div>
                <div className="col-span-1">
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Last Name</label>
                   <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-[#131522] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner" />
                </div>
                <div className="col-span-2">
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Email Address</label>
                   <div className="relative">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                     <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#131522] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner" />
                   </div>
                </div>
                <div className="col-span-2">
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Company Name</label>
                   <div className="relative">
                     <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                     <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full bg-[#131522] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner" />
                   </div>
                </div>
             </div>
           </div>
           
           <div className="flex justify-end pt-4">
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl text-sm font-black transition-transform hover:-translate-y-0.5 shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
                Save Configuration
              </button>
           </div>
         </div>
      </div>
    </m.div>
  );
};

const TelemetryTab = () => {
  const nodeStatuses = [
    { name: "Frontend Gateway (CDN Edge)", status: "Excellent", ping: "8ms", type: "success" },
    { name: "Primary DB Cluster (Replica)", status: "Synchronized", ping: "2ms", type: "success" },
    { name: "User Auth Portal (OAuth)", status: "Active", ping: "15ms", type: "success" },
    { name: "Stripe Payment Webhook", status: "Listening", ping: "35ms", type: "success" },
    { name: "Nova AI Chatbot Engine", status: "Operational", ping: "120ms", type: "success" },
    { name: "CDN Static Asset Storage", status: "Active", ping: "5ms", type: "success" },
    { name: "Transactional Email Queue", status: "Operational", ping: "14ms", type: "success" },
    { name: "Daily Background Worker", status: "Idle / Healthy", ping: "N/A", type: "success" }
  ];

  const trafficData = [42, 58, 65, 84, 75, 92, 110];

  return (
    <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="portal-page p-5 sm:p-8 max-w-6xl mx-auto w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500 animate-pulse" />
            Asset Telemetry & Health
          </h1>
          <p className="text-gray-400 text-sm">Real-time performance metrics, uptime telemetry, and asset value multiplier audits.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-bold font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          TELEMETRY STREAM ACTIVE
        </div>
      </div>

      {/* Main Grid: Health, Speed & ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Speedometer & Performance Gauge */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 backdrop-blur-md flex flex-col items-center justify-between text-center relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Asset Health Score</h3>
          
          {/* Radial SVG Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Outer background circle */}
              <circle cx="50" cy="50" r="40" className="stroke-white/[0.04] stroke-[8] fill-none" />
              {/* Animated Progress Circle */}
              <m.circle 
                cx="50" 
                cy="50" 
                r="40" 
                className="stroke-blue-500 stroke-[8] fill-none"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 * (1 - 0.99) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white tracking-tight">99</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">Excellent</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-6 border-t border-white/[0.06]">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-mono">LCP</p>
              <p className="text-sm font-bold text-white mt-0.5">0.8s</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-mono">FID</p>
              <p className="text-sm font-bold text-white mt-0.5">12ms</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-mono">CLS</p>
              <p className="text-sm font-bold text-white mt-0.5">0.01</p>
            </div>
          </div>
        </div>

        {/* Business Asset ROI & Traffic stats */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Asset Valuation Multiplier</h3>
              <p className="text-xs text-gray-500 mt-1">Estimate value of this high-yield digital asset</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-semibold text-sm">
              <TrendingUp className="w-4 h-4" />
              +18.4% MoM
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-6 mb-8">
            <h2 className="text-4xl font-black text-white tracking-tight">₹1,250,000</h2>
            <span className="text-xs font-semibold text-gray-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
              Valued @ $15,000 USD
            </span>
          </div>

          {/* Mini Weekly Traffic Visual Chart */}
          <div>
            <div className="flex justify-between items-end gap-2 h-20 mb-3">
              {trafficData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full group/bar relative">
                  {/* Tooltip */}
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-[10px] font-bold text-white px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-md">
                    +{val}%
                  </span>
                  {/* Bar */}
                  <m.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 rounded-t-sm transition-all duration-300 shadow-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold font-mono text-gray-600 uppercase tracking-wider">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Status & Core Infrastructure Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Node System Monitors */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 backdrop-blur-md flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">System Node Status</h3>
              <p className="text-[10px] text-gray-500">Live ping response and operational health of core infrastructure nodes.</p>
            </div>
          </div>

          <div className="space-y-4 flex-1">
            {nodeStatuses.map((node, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-white">{node.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-gray-500">{node.ping}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {node.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Traffic & SEO telemetry */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <Globe className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-white">SEO & Global Visibility</h3>
                <p className="text-[10px] text-gray-500">Search engine rankings, index rates and edge routing latency.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-white/[0.01] rounded-xl border border-white/[0.04]">
                <span className="text-[10px] text-gray-500 uppercase font-mono block mb-1">Search Visibility</span>
                <span className="text-2xl font-bold text-white">84.2%</span>
                <span className="text-[10px] text-emerald-400 font-bold block mt-1">+3.5% this week</span>
              </div>
              <div className="p-4 bg-white/[0.01] rounded-xl border border-white/[0.04]">
                <span className="text-[10px] text-gray-500 uppercase font-mono block mb-1">Index Health</span>
                <span className="text-2xl font-bold text-white">Perfect</span>
                <span className="text-[10px] text-gray-400 block mt-1">100% pages crawled</span>
              </div>
            </div>
          </div>

          {/* Dynamic Map/Grid Visualization */}
          <div className="p-4 bg-black/[0.2] border border-white/[0.04] rounded-xl flex flex-col justify-center items-center h-48 relative overflow-hidden group">
            {/* Visual Grid representing global nodes */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
            <m.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" 
            />
            
            <div className="relative z-10 text-center">
              <Globe className="w-10 h-10 text-blue-500/80 mx-auto mb-3 animate-[spin_20s_linear_infinite]" />
              <p className="text-xs font-bold text-white">Global Edge Network Uptime</p>
              <p className="text-[10px] font-mono text-emerald-400 mt-1 uppercase font-bold tracking-widest">99.99% Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

const portalNavItems = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview', hint: 'Workspace pulse' },
  { id: 'projects', icon: FolderKanban, label: 'Projects', hint: '2 active missions' },
  { id: 'telemetry', icon: Activity, label: 'Telemetry', hint: 'All systems healthy' },
  { id: 'deliverables', icon: File, label: 'Deliverables', hint: '5 files ready' },
  { id: 'invoices', icon: Receipt, label: 'Invoices', hint: '1 action needed' },
  { id: 'messages', icon: MessageCircle, label: 'Messages', hint: 'Team channel' },
  { id: 'settings', icon: Settings, label: 'Settings', hint: 'Account controls' },
];

const PortalBackdrop = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="portal-grid-mask absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <m.div
        animate={reduceMotion ? undefined : { x: [0, 70, 0], y: [0, 35, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-[18%] h-[520px] w-[520px] rounded-full bg-blue-600/[0.11] blur-[130px]"
      />
      <m.div
        animate={reduceMotion ? undefined : { x: [0, -55, 0], y: [0, -30, 0], scale: [1.05, 0.94, 1.05] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-48 right-[8%] h-[560px] w-[560px] rounded-full bg-indigo-500/[0.1] blur-[145px]"
      />
      <m.div
        animate={reduceMotion ? undefined : { opacity: [0.15, 0.4, 0.15], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[58%] top-[35%] h-56 w-56 rounded-full border border-cyan-300/[0.12]"
      />
    </div>
  );
};

const PortalSidebar = ({ activeTab, onTabChange, onSignOut, clientInfo, mobile = false }) => {
  const initials = clientInfo?.client_name
    ? clientInfo.client_name.split(' ').map(n => n[0]).join('')
    : 'AC';

  return (
    <aside className={`relative z-20 flex h-full shrink-0 flex-col border-r border-white/[0.07] bg-[#090a14]/92 backdrop-blur-2xl ${mobile ? 'w-[286px]' : 'hidden w-[96px] lg:flex'}`}>
      <div className={`flex h-[84px] items-center border-b border-white/[0.07] ${mobile ? 'gap-3 px-6' : 'justify-center px-3'}`}>
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-blue-500/35 blur-md" />
          <img src={nexoraLogo} alt="Nexora" className="relative h-10 w-10 rounded-xl border border-white/[0.12] object-cover" />
        </div>
        {mobile && <div>
          <p className="text-sm font-black tracking-[0.16em] text-white">NEXORA</p>
          <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-indigo-300">Client space</p>
        </div>}
      </div>

      {mobile && <div className="px-4 pt-5">
        <div className="rounded-2xl border border-blue-400/[0.16] bg-gradient-to-br from-blue-500/[0.12] to-indigo-500/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">Workspace health</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_#34d399]" />
              Live
            </span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-black tracking-tight text-white">99.9%</span>
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
            <m.div initial={{ width: 0 }} animate={{ width: '99.9%' }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
          </div>
        </div>
      </div>}

      <nav className={`client-portal-scrollbar flex-1 space-y-2 overflow-y-auto py-5 ${mobile ? 'px-3' : 'px-4'}`}>
        {mobile && <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-600">Workspace</p>}
        {portalNavItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              title={mobile ? undefined : item.label}
              className={`group relative flex w-full items-center overflow-hidden rounded-2xl py-3 transition-colors ${mobile ? 'gap-3 px-3 text-left' : 'justify-center px-2'} ${
                isActive ? 'text-white' : 'text-gray-500 hover:bg-white/[0.035] hover:text-gray-200'
              }`}
            >
              {isActive && (
                <m.span
                  layoutId={mobile ? 'mobile-active-nav' : 'desktop-active-nav'}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-2xl border border-indigo-300/[0.18] bg-gradient-to-br from-indigo-400/[0.18] to-cyan-300/[0.06]"
                />
              )}
              <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                isActive ? 'border-blue-400/20 bg-blue-500/15 text-blue-300' : 'border-white/[0.05] bg-white/[0.025] text-gray-500 group-hover:text-gray-300'
              }`}>
                <item.icon className="h-4 w-4" />
              </span>
              {mobile && <span className="relative min-w-0">
                <span className="block text-xs font-bold">{item.label}</span>
                <span className={`mt-0.5 block truncate text-[9px] ${isActive ? 'text-blue-300/60' : 'text-gray-600'}`}>{item.hint}</span>
              </span>}
              {mobile && isActive && <span className="relative ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_9px_#67e8f9]" />}
            </button>
          );
        })}
      </nav>

      <div className={`border-t border-white/[0.07] ${mobile ? 'p-4' : 'p-3'}`}>
        <div className={`mb-3 flex items-center rounded-xl border border-white/[0.05] bg-white/[0.025] ${mobile ? 'gap-3 p-3' : 'justify-center p-2'}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-black text-white shadow-lg shadow-blue-500/20">{initials}</div>
          {mobile && <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{clientInfo?.client_name || 'Alex Client'}</p>
            <p className="truncate text-[9px] text-gray-500">{clientInfo?.company_name || 'Nova Corp workspace'}</p>
          </div>}
        </div>
        <button title="End secure session" onClick={onSignOut} className={`flex w-full items-center rounded-xl py-2.5 text-xs font-bold text-gray-500 transition-colors hover:bg-red-500/[0.08] hover:text-red-300 ${mobile ? 'gap-3 px-3' : 'justify-center px-2'}`}>
          <LogOut className="h-4 w-4" />
          {mobile && 'End secure session'}
        </button>
      </div>
    </aside>
  );
};

export default function ClientPortal() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [funFact, setFunFact] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Database-backed state variables
  const [clientInfo, setClientInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [deliverables, setDeliverables] = useState([]);

  // Fetch all related workspace data for client
  const fetchClientData = async (clientId) => {
    try {
      // 1. Fetch client info
      const { data: client, error: clientErr } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();
      if (clientErr || !client) {
        throw new Error(clientErr?.message || 'Client not found in Supabase');
      }
      setClientInfo(client);

      // 2. Fetch projects
      const { data: projectsData, error: projErr } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', clientId);
      if (projErr) throw projErr;
      setProjects(projectsData || []);

      const projectIds = (projectsData || []).map(p => p.id);

      // 3. Fetch milestones
      if (projectIds.length > 0) {
        const { data: milestonesData, error: mileErr } = await supabase
          .from('milestones')
          .select('*')
          .in('project_id', projectIds)
          .order('due_date', { ascending: true });
        if (mileErr) throw mileErr;
        setMilestones(milestonesData || []);
      } else {
        setMilestones([]);
      }

      // 4. Fetch invoices
      const { data: invoicesData, error: invErr } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', clientId)
        .order('issue_date', { ascending: false });
      if (invErr) throw invErr;
      setInvoices(invoicesData || []);

      // 5. Fetch messages
      const { data: messagesData, error: msgErr } = await supabase
        .from('messages')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: true });
      if (msgErr) throw msgErr;
      setMessages(messagesData || []);

      // 6. Fetch deliverables
      if (projectIds.length > 0) {
        const { data: deliverablesData, error: delErr } = await supabase
          .from('deliverables')
          .select('*')
          .in('project_id', projectIds);
        if (delErr) throw delErr;
        setDeliverables(deliverablesData || []);
      } else {
        setDeliverables([]);
      }
    } catch (error) {
      console.error('Error fetching client data from Supabase, falling back to local storage/mock data:', error);
      
      const localClient = MOCK_DATA.clients.find(c => c.id === clientId) || 
                          MOCK_DATA.clients.find(c => c.email === email?.trim().toLowerCase()) ||
                          MOCK_DATA.clients[0];
      setClientInfo(localClient);
      
      const localProj = MOCK_DATA.projects.filter(p => p.client_id === localClient.id);
      setProjects(localProj);

      const localProjIds = localProj.map(p => p.id);
      const localMiles = MOCK_DATA.milestones.filter(m => localProjIds.includes(m.project_id));
      setMilestones(localMiles);

      const localInvs = MOCK_DATA.invoices.filter(i => i.client_id === localClient.id);
      setInvoices(localInvs);

      const savedMessagesKey = `nexora_messages_${localClient.id}`;
      const savedMsgs = localStorage.getItem(savedMessagesKey);
      if (savedMsgs) {
        try {
          setMessages(JSON.parse(savedMsgs));
        } catch {
          const localMsgs = MOCK_DATA.messages.filter(m => m.client_id === localClient.id);
          setMessages(localMsgs);
        }
      } else {
        const localMsgs = MOCK_DATA.messages.filter(m => m.client_id === localClient.id);
        setMessages(localMsgs);
      }

      const localDels = MOCK_DATA.deliverables.filter(d => localProjIds.includes(d.project_id));
      setDeliverables(localDels);
    }
  };

  useEffect(() => {
    const facts = [
      "Nexora Studio crafts premium digital business assets.",
      "We blend high-end dark glassmorphism with buttery-smooth UI.",
      "Nexora transforms standard dashboards into 'Mission Control' centers.",
      "Every pixel is engineered for a luxury digital experience.",
      "We don't just build websites; we engineer secure, scalable portals.",
      "Nexoraa Studio focuses on performance, aesthetics, and scalable growth."
    ];
    setFunFact(facts[Math.floor(Math.random() * facts.length)]);

    // Check for saved session in localStorage
    const savedSession = localStorage.getItem('nexora_client_session');
    let fetchPromise = Promise.resolve();
    if (savedSession) {
      try {
        const clientData = JSON.parse(savedSession);
        setClientInfo(clientData);
        setIsAuthenticated(true);
        fetchPromise = fetchClientData(clientData.id);
      } catch (err) {
        console.error('Failed to parse saved session', err);
        localStorage.removeItem('nexora_client_session');
      }
    }

    // Simulate real-time loading when opening portal
    const timer = setTimeout(async () => {
      await fetchPromise;
      setIsPageLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Real-time message subscription channel
  useEffect(() => {
    if (!isAuthenticated || !clientInfo?.id) return;

    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `client_id=eq.${clientInfo.id}`
        },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, clientInfo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    // Check for Admin/Invoice system access
    if ((email === 'Nexoraa.works@gmail.com' || email === 'Nexoraa.Admin') && password === '220305@Nexoraa') {
      // Brief loading animation before redirect
      await new Promise(r => setTimeout(r, 1200));
      setIsLoggingIn(false);
      navigate('/invoice-system');
      return;
    }

    // Minimum loading time for professional feel
    const loginStart = Date.now();
    const MIN_LOADING_MS = 1500;

    let authenticatedClient = null;
    let loginErr = null;

    try {
      const { data: client, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (!error && client) {
        if (client.password_hash === password) {
          authenticatedClient = client;
        } else {
          loginErr = 'Invalid username or password. Access Denied.';
        }
      } else {
        if (error) loginErr = error.message;
      }
    } catch (err) {
      console.error('Supabase query error:', err);
      loginErr = err.message;
    }

    // Fallback to local mock data if Supabase request failed or client was not found/unreachable
    if (!authenticatedClient) {
      const trimmedEmail = email.trim().toLowerCase();
      const mockClient = MOCK_DATA.clients.find(
        c => c.email === trimmedEmail && c.password_hash === password
      );

      if (mockClient) {
        authenticatedClient = mockClient;
      }
    }

    // Ensure minimum loading time for a premium feel
    const elapsed = Date.now() - loginStart;
    if (elapsed < MIN_LOADING_MS) {
      await new Promise(r => setTimeout(r, MIN_LOADING_MS - elapsed));
    }

    if (authenticatedClient) {
      localStorage.setItem('nexora_client_session', JSON.stringify({ 
        id: authenticatedClient.id, 
        email: authenticatedClient.email, 
        client_name: authenticatedClient.client_name, 
        company_name: authenticatedClient.company_name 
      }));
      setClientInfo(authenticatedClient);
      setIsAuthenticated(true);
      await fetchClientData(authenticatedClient.id);
    } else {
      setLoginError(loginErr || 'Invalid username or password. Access Denied.');
    }
    setIsLoggingIn(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('nexora_client_session');
    setIsAuthenticated(false);
    setClientInfo(null);
    setProjects([]);
    setMilestones([]);
    setInvoices([]);
    setMessages([]);
    setDeliverables([]);
  };

  const handleSendMessage = async (messageText) => {
    if (!clientInfo || !clientInfo.id) return;
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            client_id: clientInfo.id,
            sender: 'client',
            message: messageText,
            is_read: false
          }
        ])
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        setMessages((prev) => {
          if (prev.some(m => m.id === data[0].id)) return prev;
          return [...prev, data[0]];
        });
      }
    } catch (err) {
      console.error('Failed to send message via Supabase, saving locally:', err);
      // Fallback: save to local state and localStorage
      const newMessage = {
        id: `local-${Date.now()}`,
        client_id: clientInfo.id,
        sender: 'client',
        message: messageText,
        is_read: false,
        created_at: new Date().toISOString()
      };
      
      setMessages((prev) => [...prev, newMessage]);
      const savedMessagesKey = `nexora_messages_${clientInfo.id}`;
      const currentSaved = localStorage.getItem(savedMessagesKey);
      let msgsArray = [];
      if (currentSaved) {
        try {
          msgsArray = JSON.parse(currentSaved);
        } catch {
          msgsArray = MOCK_DATA.messages.filter(m => m.client_id === clientInfo.id);
        }
      } else {
        msgsArray = MOCK_DATA.messages.filter(m => m.client_id === clientInfo.id);
      }
      msgsArray.push(newMessage);
      localStorage.setItem(savedMessagesKey, JSON.stringify(msgsArray));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-[#030407] flex flex-col gap-10 items-center justify-center font-sans px-6 text-center">
        <div className="w-24 h-24 border-[6px] border-white/20 border-t-white rounded-full animate-spin shrink-0" />
        
        <m.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] text-blue-400/80 uppercase mb-2">Did you know?</p>
          <p className="text-sm font-medium text-gray-400 leading-relaxed">
            {funFact}
          </p>
        </m.div>
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center font-sans">
        {/* Nexora Premium Dark Background */}
        <div className="absolute inset-0 bg-[#030407]">
          {/* Huge Blurred Logo Watermarks */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] opacity-15 pointer-events-none">
            <img 
              src="/logo/logo.png" 
              alt="" 
              className="w-full h-full object-contain blur-[8px] animate-pulse"
              style={{ animationDuration: '8s' }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] opacity-25 pointer-events-none">
            <img 
              src="/logo/logo.png" 
              alt="" 
              className="w-full h-full object-contain blur-[40px] animate-pulse"
              style={{ animationDuration: '10s' }}
            />
          </div>

          {/* Dynamic Light Orbs */}
          <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#004dff] blur-[140px] opacity-20 animate-pulse" style={{ animationDuration: '7s' }} />
          <div className="absolute bottom-[0%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#00f0ff] blur-[140px] opacity-15 animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#7000ff] blur-[130px] opacity-15" />
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>
        
        <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center pl-6 pr-12">
          <h2 className="text-[28px] tracking-[0.15em] text-white mb-10 font-light text-center w-full pl-8">
            CUSTOMER LOGIN
          </h2>
          
          <form onSubmit={handleLogin} className="w-full space-y-6">
            {loginError && (
              <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-lg text-center font-medium backdrop-blur-md">
                {loginError}
              </div>
            )}
            {/* Username Input */}
            <div className="relative flex items-center group">
              <div className="absolute -left-12 w-12 flex justify-center">
                <User className="w-6 h-6 text-gray-500 group-focus-within:text-blue-400 transition-colors" strokeWidth={1.5} />
              </div>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username" 
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg text-white placeholder:text-gray-500 px-5 py-3 backdrop-blur-xl outline-none focus:bg-white/[0.06] focus:border-blue-500/50 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
              />
            </div>
            
            {/* Password Input */}
            <div className="relative flex items-center group">
              <div className="absolute -left-12 w-12 flex justify-center">
                <Lock className="w-6 h-6 text-gray-500 group-focus-within:text-blue-400 transition-colors" strokeWidth={1.5} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="w-full bg-white/[0.03] border border-white/[0.05] rounded-lg text-white placeholder:text-gray-500 px-5 py-3 backdrop-blur-xl outline-none focus:bg-white/[0.06] focus:border-blue-500/50 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pr-12"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-500 hover:text-blue-400 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-[16px] h-[16px] bg-white/[0.05] border border-white/[0.1] rounded-[4px] flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all">
                  <svg className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-gray-400 text-[13px] font-medium tracking-wide group-hover:text-gray-200 transition-colors">Remember me</span>
              </label>
              <button type="button" onClick={() => setShowForgotPassword(true)} className="text-blue-400/80 text-[13px] font-medium tracking-wide hover:text-blue-400 transition-colors">Forgot Password?</button>
            </div>
            
            {/* Submit Button */}
            <div className="pt-6 flex justify-center">
              <button 
                type="submit" 
                disabled={isLoggingIn}
                className={`w-full relative overflow-hidden group border font-bold tracking-[0.15em] text-[13px] py-4 rounded-lg transition-all ${
                  isLoggingIn 
                    ? 'bg-blue-500/20 border-blue-400/40 text-blue-200 cursor-not-allowed shadow-[0_0_40px_rgba(59,130,246,0.25)]' 
                    : 'bg-blue-500/10 border-blue-400/20 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:text-white'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoggingIn ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="animate-pulse">AUTHENTICATING...</span>
                    </>
                  ) : (
                    'LOGIN'
                  )}
                </span>
                {!isLoggingIn && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                )}
                {isLoggingIn && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-[shimmer_1s_infinite]" />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Forgot Password Modal */}
        <AnimatePresence>
          {showForgotPassword && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={() => setShowForgotPassword(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
              
              {/* Modal Card */}
              <m.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[440px] bg-[#0d1017]/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* Ambient Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />
                
                {/* Header */}
                <div className="relative px-8 pt-8 pb-4 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Forgot Password?</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Don't worry! Contact our team and we'll help you regain access to your account.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="shrink-0 ml-4 mt-1 w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Contact Methods */}
                <div className="relative px-8 pb-8 pt-2 space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:nexoraa.works@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-blue-500/[0.08] hover:border-blue-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email Us</p>
                      <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors truncate">nexoraa.works@gmail.com</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 shrink-0 ml-auto transition-colors" />
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+917383303388"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-emerald-500/[0.08] hover:border-emerald-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Call Us</p>
                      <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">+91 7383303388</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 shrink-0 ml-auto transition-colors" />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917383303388?text=Hi%20Nexora%2C%20I%20forgot%20my%20Client%20Portal%20password.%20Can%20you%20help%20me%20reset%20it%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-green-500/[0.08] hover:border-green-500/30 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-all">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp</p>
                      <p className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">Message us on WhatsApp</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-green-400 shrink-0 ml-auto transition-colors" />
                  </a>

                  {/* Divider + Note */}
                  <div className="pt-2 border-t border-white/[0.06]">
                    <p className="text-[11px] text-gray-500 leading-relaxed text-center">
                      Our team typically responds within <span className="text-white font-semibold">30 minutes</span> during business hours (10 AM – 8 PM IST).
                    </p>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- POST-LOGIN DASHBOARD ---
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#080914] font-sans text-white">
      <PortalBackdrop />
      <PortalSidebar activeTab={activeTab} onTabChange={handleTabChange} onSignOut={handleSignOut} clientInfo={clientInfo} />

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <m.button
              aria-label="Close navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <m.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
              className="fixed inset-y-0 left-0 z-40 lg:hidden"
            >
              <PortalSidebar mobile activeTab={activeTab} onTabChange={handleTabChange} onSignOut={handleSignOut} clientInfo={clientInfo} />
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="portal-stage client-portal-scrollbar relative z-10 flex min-w-0 flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 mx-3 mt-3 flex h-[72px] shrink-0 items-center justify-between rounded-[22px] border border-white/[0.07] bg-[#0d0f1c]/78 px-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:mx-5 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.035] text-gray-400 transition-colors hover:text-white lg:hidden" aria-label="Open navigation">
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-black capitalize tracking-tight text-white">{portalNavItems.find((item) => item.id === activeTab)?.label}</h2>
              <div className="mt-1 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] text-gray-600">{clientInfo?.company_name || 'Nova Corp'} <ChevronDown className="h-2.5 w-2.5" /> Client workspace</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden h-10 items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 text-[10px] font-bold text-gray-500 transition-colors hover:border-indigo-300/20 hover:text-gray-300 md:flex">
              <Search className="h-3.5 w-3.5" />
              Find anything
              <span className="ml-3 flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[8px] font-bold text-gray-600"><Command className="h-2.5 w-2.5" /> K</span>
            </button>
            <button className="hidden h-10 items-center gap-2 rounded-full bg-[#d8ff63] px-4 text-[10px] font-black text-[#11150e] transition-transform hover:-translate-y-0.5 sm:flex"><Plus className="h-3.5 w-3.5" /> New request</button>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-gray-500 transition-colors hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#d8ff63] shadow-[0_0_8px_#d8ff63]" />
            </button>
          </div>
        </header>

        {/* Dashboard Content dynamically rendered based on activeTab */}
        <AnimatePresence mode="wait" initial={false}>
           {activeTab === 'overview' && <OverviewTab key="overview" clientInfo={clientInfo} projects={projects} milestones={milestones} invoices={invoices} />}
           {activeTab === 'projects' && <ProjectsTab key="projects" projects={projects} clientInfo={clientInfo} />}
           {activeTab === 'telemetry' && <TelemetryTab key="telemetry" />}
           {activeTab === 'deliverables' && <DeliverablesTab key="deliverables" deliverables={deliverables} />}
           {activeTab === 'invoices' && <InvoicesTab key="invoices" invoices={invoices} />}
           {activeTab === 'messages' && <MessagesTab key="messages" messages={messages} onSendMessage={handleSendMessage} clientInfo={clientInfo} projects={projects} invoices={invoices} milestones={milestones} />}
           {activeTab === 'settings' && <SettingsTab key="settings" clientInfo={clientInfo} />}
        </AnimatePresence>

        {/* Floating AI Concierge */}
        <AIConcierge clientInfo={clientInfo} projects={projects} invoices={invoices} milestones={milestones} />
      </main>
    </div>
  );
}
