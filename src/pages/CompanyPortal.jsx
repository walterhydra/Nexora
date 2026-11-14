import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import {
  Search, Bell, User, CheckCircle2, Clock, TrendingUp, AlertTriangle,
  Globe, Building2, Sparkles, RefreshCw, Tv, Download, Plus, Phone,
  Mail, ExternalLink, ShieldCheck, Lock, LogOut, Filter, ArrowUpRight, ArrowRight,
  Check, ChevronDown, SlidersHorizontal, Eye, EyeOff, Trophy, Percent, Layers,
  Activity, X, ChevronRight, FileText, ArrowUpDown, Flame, Laptop,
  HelpCircle, MoreVertical, Smartphone, AlertCircle, BarChart3, Target,
  Zap, Radio, Cpu
} from 'lucide-react';
import toast from 'react-hot-toast';
import NexoraaLogo from '../components/ui/NexoraaLogo';

// Initial Mock Dataset for Company Overview & Team Pipeline
const INITIAL_BUSINESSES = [
  {
    id: 'BIZ-1001',
    name: 'Apex Dental Care',
    category: 'Healthcare & Clinic',
    city: 'New York, NY',
    contact: 'Dr. Michael Chen',
    phone: '+1 (555) 234-8901',
    email: 'contact@apexdentalcare.org',
    websiteStatus: 'no-website',
    auditNotes: 'No web presence found on Google Maps. Operating purely on offline referrals.',
    dealValue: 3200,
    priority: 'high',
    stage: 'audit-sent',
    assignedTo: 'Ashish K.',
    actionRequired: true,
    lastActivity: '2 hours ago'
  },
  {
    id: 'BIZ-1002',
    name: 'Vanguard Logistics Hub',
    category: 'Supply Chain & Freight',
    city: 'Chicago, IL',
    contact: 'Robert Kowalski',
    phone: '+1 (555) 876-1234',
    email: 'info@vanguardlog.net',
    websiteStatus: 'poor-website',
    auditNotes: 'Desktop-only layout built in 2013. Mobile score 24/100, broken tracking forms.',
    dealValue: 6500,
    priority: 'high',
    stage: 'proposal-sent',
    assignedTo: 'Vikram S.',
    actionRequired: true,
    lastActivity: '45 mins ago'
  },
  {
    id: 'BIZ-1003',
    name: 'Solaria Artisan Bakery',
    category: 'Food & Hospitality',
    city: 'Austin, TX',
    contact: 'Elena Rostova',
    phone: '+1 (555) 432-9012',
    email: 'orders@solariabakery.com',
    websiteStatus: 'no-website',
    auditNotes: 'High Instagram following (18k), but losing daily orders due to missing order website.',
    dealValue: 2400,
    priority: 'high',
    stage: 'demo-booked',
    assignedTo: 'Priya M.',
    actionRequired: false,
    lastActivity: '3 hours ago'
  },
  {
    id: 'BIZ-1004',
    name: 'Metro Law Associates',
    category: 'Legal Services',
    city: 'Boston, MA',
    contact: 'Arthur Pendelton',
    phone: '+1 (555) 789-2345',
    email: 'apendelton@metrolawboston.com',
    websiteStatus: 'poor-website',
    auditNotes: 'Takes 7.8s to load on 4G. Missing SSL certificate and responsive booking widget.',
    dealValue: 4800,
    priority: 'medium',
    stage: 'negotiation',
    assignedTo: 'Ashish K.',
    actionRequired: false,
    lastActivity: 'Yesterday'
  },
  {
    id: 'BIZ-1005',
    name: 'Horizon Solar Solutions',
    category: 'Renewable Energy',
    city: 'Phoenix, AZ',
    contact: 'Marcus Vance',
    phone: '+1 (555) 345-6789',
    email: 'solar@horizonsolarsol.com',
    websiteStatus: 'poor-website',
    auditNotes: 'Outdated Wix template with broken lead capture form and slow image load.',
    dealValue: 5200,
    priority: 'high',
    stage: 'deal-won',
    assignedTo: 'Dev Team',
    actionRequired: false,
    lastActivity: 'Just now'
  },
  {
    id: 'BIZ-1006',
    name: 'Kallisto Luxury Spa',
    category: 'Wellness & Beauty',
    city: 'Miami, FL',
    contact: 'Sofia Delgado',
    phone: '+1 (555) 654-3210',
    email: 'concierge@kallistomiami.com',
    websiteStatus: 'no-website',
    auditNotes: 'New luxury spa opened 3 months ago. Needs VIP booking portal & portfolio.',
    dealValue: 3900,
    priority: 'high',
    stage: 'deal-won',
    assignedTo: 'Priya M.',
    actionRequired: false,
    lastActivity: '1 day ago'
  },
  {
    id: 'BIZ-1007',
    name: 'Titan Heavy Machinery Repair',
    category: 'Industrial & Auto',
    city: 'Detroit, MI',
    contact: 'Dan Kowalczyk',
    phone: '+1 (555) 987-6543',
    email: 'service@titanmachinerepair.com',
    websiteStatus: 'no-website',
    auditNotes: 'Zero online presence. 40+ technicians, quotes handled only via paper.',
    dealValue: 4200,
    priority: 'medium',
    stage: 'pitch-booked',
    assignedTo: 'Vikram S.',
    actionRequired: true,
    lastActivity: '5 hours ago'
  },
  {
    id: 'BIZ-1008',
    name: 'Crestview Architecture Studio',
    category: 'Real Estate & Design',
    city: 'Seattle, WA',
    contact: 'Hannah Lin',
    phone: '+1 (555) 210-9876',
    email: 'hlin@crestviewarch.design',
    websiteStatus: 'poor-website',
    auditNotes: 'Flash/legacy code, non-functional on iOS Safari. Portfolios fail to render.',
    dealValue: 5800,
    priority: 'high',
    stage: 'contract-sent',
    assignedTo: 'Ashish K.',
    actionRequired: false,
    lastActivity: '30 mins ago'
  },
  {
    id: 'BIZ-1009',
    name: 'Veritas Financial Advisory',
    category: 'Finance & Wealth',
    city: 'Charlotte, NC',
    contact: 'Gregory Thorne',
    phone: '+1 (555) 321-4567',
    email: 'advisory@veritasfa.com',
    websiteStatus: 'poor-website',
    auditNotes: 'Lacks modern security badges, mobile layout cuts off tables and disclosures.',
    dealValue: 7200,
    priority: 'high',
    stage: 'deal-won',
    assignedTo: 'Ashish K.',
    actionRequired: false,
    lastActivity: 'Yesterday'
  },
  {
    id: 'BIZ-1010',
    name: 'Echo Sound & Event Productions',
    category: 'Media & Entertainment',
    city: 'Nashville, TN',
    contact: 'Trevor Campbell',
    phone: '+1 (555) 456-7890',
    email: 'booking@echosoundevents.com',
    websiteStatus: 'no-website',
    auditNotes: 'Handles major regional festivals but booking requests are lost in email.',
    dealValue: 3600,
    priority: 'medium',
    stage: 'audit-sent',
    assignedTo: 'Priya M.',
    actionRequired: true,
    lastActivity: '4 hours ago'
  }
];

export default function CompanyPortal() {
  const navigate = useNavigate();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('nexora_team_auth') === 'true' ||
      sessionStorage.getItem('nexora_team_auth') === 'true';
  });

  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard Data State
  const [businesses, setBusinesses] = useState(() => {
    const saved = localStorage.getItem('nexora_team_businesses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BUSINESSES;
      }
    }
    return INITIAL_BUSINESSES;
  });

  // UI States
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('all'); // all, no-website, poor-website, high-priority, won, action-req
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('high-low'); // high-low, stage
  const [isTvMode, setIsTvMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // New Business Form State
  const [newBiz, setNewBiz] = useState({
    name: '',
    category: 'Healthcare & Clinic',
    city: '',
    contact: '',
    phone: '',
    email: '',
    websiteStatus: 'no-website',
    auditNotes: '',
    dealValue: 3500,
    priority: 'high',
    stage: 'lead-captured',
    assignedTo: 'Ashish K.'
  });

  // Keep Clock Updated every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save businesses to localStorage when changed
  useEffect(() => {
    localStorage.setItem('nexora_team_businesses', JSON.stringify(businesses));
  }, [businesses]);

  // Auth Handler
  const handleSSO = (provider = 'Google Workspace') => {
    setIsLoggingIn(true);
    setLoginError('');
    setTimeout(() => {
      localStorage.setItem('nexora_team_auth', 'true');
      setIsAuthenticated(true);
      setIsLoggingIn(false);
      toast.success(`Access Granted via ${provider}. Welcome to Nexoraa Operations!`, {
        icon: '🛡️',
        duration: 3500
      });
    }, 450);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      const cleanId = loginId.trim();
      const cleanPass = loginPassword.trim();

      const isValid = (
        (cleanId === 'nexoraa@123' && cleanPass === '11119412') ||
        (cleanId.toLowerCase() === 'admin' && (cleanPass === 'nexoraa2026' || cleanPass === '11119412')) ||
        (cleanId.toLowerCase() === 'ashish' && (cleanPass === 'nexoraa2026' || cleanPass === '11119412')) ||
        (cleanId.toLowerCase().includes('@nexoraa.works')) ||
        (cleanId.toLowerCase().includes('nexoraa') && cleanPass.length > 0)
      );

      if (isValid) {
        if (rememberMe) {
          localStorage.setItem('nexora_team_auth', 'true');
        } else {
          sessionStorage.setItem('nexora_team_auth', 'true');
        }
        setIsAuthenticated(true);
        toast.success('Access Granted! Welcome to Nexoraa Team Operations Portal.', {
          icon: '🛡️',
          duration: 3500
        });
      } else {
        setLoginError('Invalid credentials. Use your corporate email or click Instant Demo Access.');
        toast.error('Authentication Failed. Check credentials.');
      }
      setIsLoggingIn(false);
    }, 450);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexora_team_auth');
    sessionStorage.removeItem('nexora_team_auth');
    setIsAuthenticated(false);
    toast('Signed out from Team Portal.', { icon: '👋' });
  };

  const handleQuickFill = () => {
    setLoginId('nexoraa@123');
    setLoginPassword('11119412');
    setLoginError('');
    handleSSO('Authorized Nexoraa ID');
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('Live pipeline synchronized with CRM & audit feeds!', {
        icon: '🔄'
      });
    }, 700);
  };

  // Add Business Handler
  const handleAddBusiness = (e) => {
    e.preventDefault();
    if (!newBiz.name.trim()) {
      toast.error('Please enter business name');
      return;
    }

    const createdBiz = {
      ...newBiz,
      id: `BIZ-${Date.now().toString().slice(-4)}`,
      dealValue: Number(newBiz.dealValue) || 2500,
      actionRequired: newBiz.priority === 'high',
      lastActivity: 'Just now'
    };

    setBusinesses(prev => [createdBiz, ...prev]);
    setShowAddModal(false);
    toast.success(`Added ${newBiz.name} to Pipeline!`, { icon: '✨' });

    // Reset Form
    setNewBiz({
      name: '',
      category: 'Healthcare & Clinic',
      city: '',
      contact: '',
      phone: '',
      email: '',
      websiteStatus: 'no-website',
      auditNotes: '',
      dealValue: 3500,
      priority: 'high',
      stage: 'lead-captured',
      assignedTo: 'Ashish K.'
    });
  };

  // Status toggle handler
  const handleStageChange = (bizId, newStage) => {
    setBusinesses(prev => prev.map(b => {
      if (b.id === bizId) {
        return {
          ...b,
          stage: newStage,
          lastActivity: 'Just now',
          actionRequired: newStage !== 'deal-won' && b.priority === 'high'
        };
      }
      return b;
    }));
    toast.success('Pipeline stage updated');
  };

  // Metrics Calculation
  // Base numbers configured to give realistic totals mirroring the photo's scale:
  // Base constants + local changes
  const localNoWebsiteCount = businesses.filter(b => b.websiteStatus === 'no-website').length;
  const localPoorWebsiteCount = businesses.filter(b => b.websiteStatus === 'poor-website').length;
  const localWonCount = businesses.filter(b => b.stage === 'deal-won').length;
  const localHighPriorityCount = businesses.filter(b => b.priority === 'high').length;
  const localActionReqCount = businesses.filter(b => b.actionRequired).length;

  const totalBusinessCount = 1420 + businesses.length;
  const noWebsiteCount = 640 + localNoWebsiteCount;
  const poorWebsiteCount = 415 + localPoorWebsiteCount;
  const highPriorityCount = 180 + localHighPriorityCount;
  const dealsWonCount = 145 + localWonCount;
  const actionReqCount = 30 + localActionReqCount;
  const totalRevenue = 145000 + businesses.filter(b => b.stage === 'deal-won').reduce((sum, b) => sum + b.dealValue, 0);

  // Target Goal Calculation
  const targetGoal = 200; // Monthly target deals
  const targetAchievedPercent = Math.min(100, Math.round((dealsWonCount / targetGoal) * 100));
  const remainingDeals = Math.max(0, targetGoal - dealsWonCount);

  // Bar Chart Department & Category Breakdown (matching Dept-wise output in photo)
  const stageCategories = useMemo(() => {
    const stages = [
      { id: 'no-website', name: 'No Website', count: noWebsiteCount, color: '#f43f5e', target: 700 },
      { id: 'poor-website', name: 'Poor Mobile UI', count: poorWebsiteCount, color: '#f97316', target: 500 },
      { id: 'slow-speed', name: 'Slow Speed / SEO', count: 310, color: '#eab308', target: 400 },
      { id: 'no-ecommerce', name: 'No E-Commerce', count: 245, color: '#8b5cf6', target: 350 },
      { id: 'audit-sent', name: 'Audit Sent', count: 380, color: '#3b82f6', target: 450 },
      { id: 'pitch-booked', name: 'Pitch Booked', count: 215, color: '#06b6d4', target: 300 },
      { id: 'proposal-out', name: 'Proposal Out', count: 190, color: '#6366f1', target: 250 },
      { id: 'high-priority', name: 'High Priority', count: highPriorityCount, color: '#d946ef', target: 200 },
      { id: 'negotiation', name: 'Negotiation', count: 94, color: '#ec4899', target: 150 },
      { id: 'contract-sent', name: 'Contract Sent', count: 68, color: '#14b8a6', target: 100 },
      { id: 'deal-won', name: 'Deal Won', count: dealsWonCount, color: '#10b981', target: targetGoal },
      { id: 'onboarding', name: 'Onboarding', count: 140, color: '#059669', target: 180 }
    ];

    if (sortBy === 'high-low') {
      return [...stages].sort((a, b) => b.count - a.count);
    }
    return stages;
  }, [noWebsiteCount, poorWebsiteCount, highPriorityCount, dealsWonCount, sortBy]);

  // Max value for bar chart height
  const maxBarValue = Math.max(...stageCategories.map(s => s.count), 700);

  // Filtered Businesses for Directory Table
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      // Tab filter
      if (activeTab === 'no-website' && b.websiteStatus !== 'no-website') return false;
      if (activeTab === 'poor-website' && b.websiteStatus !== 'poor-website') return false;
      if (activeTab === 'high-priority' && b.priority !== 'high') return false;
      if (activeTab === 'won' && b.stage !== 'deal-won') return false;
      if (activeTab === 'action-req' && !b.actionRequired) return false;

      // Category filter
      if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.city.toLowerCase().includes(q) ||
          b.contact.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [businesses, activeTab, selectedCategory, searchQuery]);

  // Export to CSV Handler
  const handleExportCSV = () => {
    const headers = ['ID,Business Name,Category,City,Contact Person,Phone,Email,Website Status,Priority,Deal Value,Stage,Assigned Rep\n'];
    const rows = businesses.map(b =>
      `"${b.id}","${b.name}","${b.category}","${b.city}","${b.contact}","${b.phone}","${b.email}","${b.websiteStatus}","${b.priority}","$${b.dealValue}","${b.stage}","${b.assignedTo}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nexora_team_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Lead Directory exported to CSV');
  };

  // Formatted Date String matching the photo: "Sun, Nov 08, 2026 • 06:22:44 PM"
  const formattedDateTime = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[currentTime.getDay()];
    const monthName = months[currentTime.getMonth()];
    const dayNum = String(currentTime.getDate()).padStart(2, '0');
    const year = currentTime.getFullYear();

    let hours = currentTime.getHours();
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    const strHours = String(hours).padStart(2, '0');

    return `${dayName}, ${monthName} ${dayNum}, ${year} • ${strHours}:${minutes}:${seconds} ${ampm}`;
  }, [currentTime]);

  // --------------------------------------------------------------------------
  // ENTERPRISE LOGIN SCREEN (Split Screen: Animated Tech Panel + Crisp White Login)
  // --------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col lg:flex-row antialiased font-quicksand selection:bg-blue-600 selection:text-white">

        {/* ================================================================== */}
        {/* LEFT COLUMN: ANIMATED HIGH-TECH OPERATIONS & TELEMETRY SHOWCASE    */}
        {/* ================================================================== */}
        <div className="w-full lg:w-1/2 bg-[#080c16] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[520px] lg:min-h-screen">
          
          {/* Animated Ambient Background Glows & Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
          
          <m.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-[110px] pointer-events-none"
          />
          <m.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.12, 0.22, 0.12],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
          />

          {/* Top Branding Header */}
          <div className="relative z-10 flex items-center justify-between">
            <NexoraaLogo theme="dark" size="lg" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Live Operations Mesh
            </div>
          </div>

          {/* Center: Live Animated Telemetry Showcase */}
          <div className="relative z-10 my-auto py-8 max-w-xl space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#00F5FF]">
                Enterprise Suite • Internal Pipeline
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white mt-2">
                Engineering Velocity &amp;
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mt-1">
                  Continuous Transparency.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300/90 mt-4 leading-relaxed font-normal">
                Dedicated team access for live client audits, business pipeline intelligence, and operational throughput tracking with isolated stage views.
              </p>
            </div>

            {/* Live Animated Telemetry Cards */}
            <div className="space-y-3.5 pt-2">
              
              {/* Card 1: Animated Throughput Equalizer & Velocity */}
              <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white tracking-wide uppercase">
                      Sprint Velocity &amp; Throughput
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    +38.4% Peak
                  </span>
                </div>

                {/* Animated Equalizer Bars */}
                <div className="flex items-end gap-1.5 h-10 w-full pt-1">
                  {[45, 75, 55, 90, 65, 80, 60, 95, 70, 85, 50, 92, 78, 88, 62, 98].map((h, i) => (
                    <m.div
                      key={i}
                      animate={{
                        height: [`${h * 0.4}%`, `${h}%`, `${h * 0.55}%`, `${h * 0.9}%`],
                      }}
                      transition={{
                        duration: 1.6 + (i % 4) * 0.3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: i * 0.08,
                      }}
                      className="flex-1 rounded-xs bg-gradient-to-t from-blue-600 via-cyan-400 to-[#00F5FF] opacity-85"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-400 font-mono">
                  <span>14 Sprints Deployed</span>
                  <span>99.98% On-Time Delivery</span>
                </div>
              </m.div>

              {/* Card 2: Zero-Trust Node & Radar Ping */}
              <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <m.div
                      animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-lg border border-cyan-400"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Global Edge Node Sync</h4>
                    <p className="text-[11px] text-slate-400 font-mono">Frankfurt • Singapore • US-East (14ms)</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Zero-Trust Active
                  </span>
                </div>
              </m.div>

            </div>
          </div>

          {/* Bottom Left: Footer & Security Metadata */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div>&copy; {new Date().getFullYear()} Nexoraa Studio. All rights reserved.</div>
            <div className="flex items-center gap-4 text-[11px]">
              <span onClick={() => navigate('/privacy-policy')} className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span onClick={() => navigate('/terms')} className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: PURE WHITE THEME PROFESSIONAL LOGIN PANEL            */}
        {/* ================================================================== */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative border-l border-slate-200/80">

          {/* Top Right: "Website →" Pill Button */}
          <div className="flex justify-end w-full">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all shadow-2xs group cursor-pointer"
            >
              <span>Website</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Centered Login Card */}
          <div className="w-full max-w-md mx-auto my-auto py-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[11px] font-bold tracking-wider uppercase mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Single Sign-On Enabled
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                Sign in with your enterprise credentials to access the workspace.
              </p>
            </div>

            {/* Enterprise SSO Buttons */}
            <div className="space-y-2.5 mb-6">
              {/* Google Workspace */}
              <button
                type="button"
                onClick={() => handleSSO('Google Workspace')}
                disabled={isLoggingIn}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-2xs active:scale-[0.99] cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google Workspace</span>
              </button>

              {/* Microsoft Entra / SSO */}
              <button
                type="button"
                onClick={() => handleSSO('Microsoft Entra')}
                disabled={isLoggingIn}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-2xs active:scale-[0.99] cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                <span>Continue with Microsoft SSO</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                or sign in with corporate email
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <div>
                    <p className="font-semibold">Authentication Failed</p>
                    <p className="text-rose-600/90 text-xs mt-0.5">{loginError}</p>
                  </div>
                </div>
              )}

              {/* EMAIL OR STAGE ID Input */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-2">
                  WORK EMAIL OR TEAM ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="name@nexoraa.works"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium"
                  />
                </div>
              </div>

              {/* PASSWORD Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600">
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    1-Click Demo Pass
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-600 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Keep Signed In Checkbox */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span>Keep me signed in</span>
                </label>
                <span className="text-[11px] font-mono text-slate-400">TLS 1.3 Certified</span>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Workspace Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Security Badge */}
            <div className="mt-8 pt-5 border-t border-slate-100 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Protected by Nexoraa Enterprise Zero-Trust Shield</span>
              </div>
            </div>
          </div>

          {/* Bottom Right Spacer / Security Note */}
          <div className="text-center text-[11px] text-slate-400 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
            <span>&copy; {new Date().getFullYear()} Nexoraa Digital Agency</span>
            <span>•</span>
            <span onClick={() => navigate('/privacy-policy')} className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span onClick={() => navigate('/terms')} className="hover:text-slate-600 cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    );
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATED TEAM DASHBOARD (Matching the user's uploaded photo!)
  // --------------------------------------------------------------------------
  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-800 antialiased font-sans ${isTvMode ? 'p-2 sm:p-4' : 'p-3 sm:p-6'} transition-all`}>
      <div className="max-w-[1720px] mx-auto space-y-4">

        {/* ================================================================== */}
        {/* 1. TOP NAVBAR (Identical to top bar in photo)                     */}
        {/* ================================================================== */}
        <header className="bg-white border border-slate-200/90 rounded-2xl px-4 sm:px-6 py-3 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Dashboard Heading */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>

            {/* Quick status on mobile */}
            <div className="md:hidden flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Middle: Clean Search Bar */}
          <div className="w-full md:max-w-xl relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Spec Card No, PO, Job Card, Business Name, Contact..."
              className="w-full pl-10 pr-10 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200/80 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Controls: Online Status, Bell, User Profile */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Online Status Badge (as in photo) */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => toast('No unread system alerts. All systems operational.', { icon: '🔔' })}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {/* User Profile Info & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-left"
              >
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-bold text-slate-900 leading-tight">Super Admin</div>
                  <div className="text-[11px] text-slate-500 font-mono leading-tight">admin@nexoraa.com</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  SA
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Signed in as</p>
                    <p className="text-xs text-slate-500 font-mono truncate">nexoraa@123</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsTvMode(!isTvMode);
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Tv className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isTvMode ? 'Exit TV Mode' : 'Enter TV Mode'}</span>
                  </button>
                  <button
                    onClick={() => {
                      handleExportCSV();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export Leads CSV</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Portal</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================================================================== */}
        {/* 2. SECOND HEADER / OPERATIONS BANNER (Identical to photo)          */}
        {/* ================================================================== */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          {/* Left: Official Nexoraa Full Brand Logo + Title */}
          <div className="flex items-center gap-4">
            <NexoraaLogo theme="light" size="sm" />
            <div className="hidden sm:block border-l border-slate-200 pl-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE BUSINESS & PIPELINE OPERATIONS
              </div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                Live Company Overview Dashboard
              </h2>
            </div>
          </div>

          {/* Right: Clock + Shift Pills + Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto justify-between xl:justify-end">
            {/* Clock Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-mono tracking-tight">{formattedDateTime}</span>
            </div>

            {/* Shift / View Category Pills (as in photo: • SHIFT, A Shift, B Shift, C Shift) */}
            <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${activeTab === 'all'
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                • ALL
              </button>
              <button
                onClick={() => setActiveTab('no-website')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${activeTab === 'no-website'
                    ? 'bg-white text-rose-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                No Web
              </button>
              <button
                onClick={() => setActiveTab('poor-website')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${activeTab === 'poor-website'
                    ? 'bg-white text-amber-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Poor Web
              </button>
              <button
                onClick={() => setActiveTab('won')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${activeTab === 'won'
                    ? 'bg-white text-emerald-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Won
              </button>
            </div>

            {/* TV Mode Toggle */}
            <button
              onClick={() => {
                setIsTvMode(!isTvMode);
                toast(isTvMode ? 'Standard view enabled' : 'TV Kiosk view enabled', { icon: '📺' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5 text-slate-500" />
              <span>TV Mode</span>
            </button>

            {/* Sync Button (as in photo) */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
            </button>

            {/* Add Lead / Business Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Lead</span>
            </button>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 3. SEVEN STAT CARDS ROW (Exact match to the 7 cards in the photo)  */}
        {/* ================================================================== */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-3.5">
          {/* Card 1: Rejection % / Quality Rate (in photo: 0.00% Month Rejection % | GOOD) */}
          <div
            onClick={() => setActiveTab('all')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                %
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                GOOD
              </span>
            </div>
            <div className="my-2.5">
              <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
                {targetAchievedPercent}%
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                Conversion Win Rate
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Target &gt; 70.00%
            </div>
          </div>

          {/* Card 2: Total Business (in photo: 88.3 Sqm Month Production | 2%) */}
          <div
            onClick={() => setActiveTab('all')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold text-sm">
                <Building2 className="w-4 h-4 text-cyan-600" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                TOTAL
              </span>
            </div>
            <div className="my-2.5">
              <div className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
                {totalBusinessCount.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                Total Businesses
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Target 1,500 Audits
            </div>
          </div>

          {/* Card 3: No Website (in photo: 0 Sqm Dispatched (Month) | 91% DONE) */}
          <div
            onClick={() => setActiveTab('no-website')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-rose-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                <Globe className="w-4 h-4 text-rose-600" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                45% SHARE
              </span>
            </div>
            <div className="my-2.5">
              <div className="text-2xl font-bold tracking-tight text-rose-600 font-mono">
                {noWebsiteCount}
              </div>
              <div className="text-xs text-slate-700 font-semibold mt-0.5 truncate group-hover:text-rose-600 transition-colors">
                No Website
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              High Need: 1st Web Presence
            </div>
          </div>

          {/* Card 4: Poor Website (in photo: 0 Sqm Today's Production | 0% SPEED) */}
          <div
            onClick={() => setActiveTab('poor-website')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                <Smartphone className="w-4 h-4 text-amber-600" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                REVAMP
              </span>
            </div>
            <div className="my-2.5">
              <div className="text-2xl font-bold tracking-tight text-amber-600 font-mono">
                {poorWebsiteCount}
              </div>
              <div className="text-xs text-slate-700 font-semibold mt-0.5 truncate group-hover:text-amber-600 transition-colors">
                Poor Website
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Needs Redesign & Speed
            </div>
          </div>

          {/* Card 5: High Priority (in photo: 2658.4 Sqm Total Pending WIP | 18 BATCHES) */}
          <div
            onClick={() => setActiveTab('high-priority')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                <Flame className="w-4 h-4 text-purple-600" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                CRITICAL
              </span>
            </div>
            <div className="my-2.5">
              <div className="text-2xl font-bold tracking-tight text-purple-700 font-mono">
                {highPriorityCount}
              </div>
              <div className="text-xs text-slate-700 font-semibold mt-0.5 truncate group-hover:text-purple-600 transition-colors">
                High Priority
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Closing SLA &lt; 24h
            </div>
          </div>

          {/* Card 6: Action Required (in photo: 0 Jobs on Hold | ACTION REQ.) */}
          <div
            onClick={() => setActiveTab('action-req')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-rose-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-rose-600" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                ACTION REQ.
              </span>
            </div>
            <div className="my-2.5">
              <div className="text-2xl font-bold tracking-tight text-rose-600 font-mono">
                {actionReqCount}
              </div>
              <div className="text-xs text-slate-700 font-semibold mt-0.5 truncate group-hover:text-rose-600 transition-colors">
                Follow-ups Due
              </div>
            </div>
            <div className="text-[11px] text-blue-600 font-semibold group-hover:underline">
              Click to Inspect &gt;
            </div>
          </div>

          {/* Card 7: Deals Won (in photo: 0 Machine Breakdowns | UNDER REPAIR) */}
          <div
            onClick={() => setActiveTab('won')}
            className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                <Trophy className="w-4 h-4 text-emerald-600" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                DEAL WON
              </span>
            </div>
            <div className="my-2.5">
              <div className="text-2xl font-bold tracking-tight text-emerald-600 font-mono">
                {dealsWonCount}
              </div>
              <div className="text-xs text-slate-700 font-semibold mt-0.5 truncate group-hover:text-emerald-600 transition-colors">
                Deals Won
              </div>
            </div>
            <div className="text-[11px] text-blue-600 font-semibold group-hover:underline">
              View Details &gt;
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. MIDDLE SECTION: TWO MAIN CARDS (Exact match to photo)          */}
        {/* ================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* ---------------------------------------------------------------- */}
          {/* Left Card: "Today's Production vs Target" (Monthly Deals Goal)    */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Monthly Deals vs Target
                  </h3>
                  <p className="text-xs text-slate-500">Live floor throughput tracking</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                • {targetAchievedPercent}% Achieved
              </span>
            </div>

            {/* Gauge & Main Numbers Area */}
            <div className="my-6 flex items-center gap-6">
              {/* Circular Gauge */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress Arc */}
                  <path
                    className="text-blue-600 transition-all duration-1000 ease-out"
                    strokeDasharray={`${targetAchievedPercent}, 100`}
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-extrabold text-slate-900 font-mono">
                    {targetAchievedPercent}%
                  </span>
                  <span className="text-[9px] font-bold tracking-wider text-slate-400">
                    GOAL
                  </span>
                </div>
              </div>

              {/* Progress Text & Horizontal Bar */}
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    {dealsWonCount}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">
                    / {targetGoal} Won
                  </span>
                </div>
                <div className="text-xs text-amber-700 font-medium flex items-center gap-1">
                  <span>⚡</span>
                  <span>{remainingDeals} deals remaining to hit milestone target</span>
                </div>

                {/* Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-700"
                    style={{ width: `${targetAchievedPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0 Closed</span>
                  <span>Target: {targetGoal} Won</span>
                  <span>Max: 250</span>
                </div>
              </div>
            </div>

            {/* Bottom 4 Metric Boxes (as in photo: MIN TARGET, MAX TARGET, REMAINING, EST. EOD) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-100">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">MIN TARGET</div>
                <div className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">150 Won</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">MAX TARGET</div>
                <div className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">250 Won</div>
              </div>
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-2.5 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-700">REMAINING</div>
                <div className="text-sm font-extrabold text-amber-800 font-mono mt-0.5">{remainingDeals} Won</div>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-2.5 text-center">
                <div className="text-[10px] uppercase font-bold text-emerald-700">EST. EOD</div>
                <div className="text-sm font-extrabold text-emerald-800 font-mono mt-0.5">{dealsWonCount + 6} Won</div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Right Card: "Dept-wise Production Output" (matching chart)        */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Dept-wise Pipeline & Audit Output
                  </h3>
                  <p className="text-xs text-slate-500">Live floor volume output by manufacturing & client stage</p>
                </div>
              </div>

              {/* Sort High -> Low toggle (as in photo) */}
              <button
                onClick={() => setSortBy(sortBy === 'high-low' ? 'stage' : 'high-low')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>{sortBy === 'high-low' ? 'High → Low' : 'Stage Order'}</span>
              </button>
            </div>

            {/* Interactive Bar Chart matching the photo layout */}
            <div className="relative pt-6 pb-2 px-1">
              {/* Y-Axis Grid Lines */}
              <div className="absolute inset-x-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-slate-200 w-full flex justify-end text-[9px] text-slate-400 pr-1">600</div>
                <div className="border-b border-dashed border-slate-200 w-full flex justify-end text-[9px] text-slate-400 pr-1">450</div>
                <div className="border-b border-dashed border-slate-200 w-full flex justify-end text-[9px] text-slate-400 pr-1">300</div>
                <div className="border-b border-dashed border-slate-200 w-full flex justify-end text-[9px] text-slate-400 pr-1">150</div>
                <div className="border-b border-slate-300 w-full flex justify-end text-[9px] text-slate-400 pr-1">0</div>
              </div>

              {/* Bars Grid */}
              <div className="relative z-10 grid grid-cols-6 sm:grid-cols-12 gap-1.5 sm:gap-2.5 h-48 items-end pt-2 pb-1">
                {stageCategories.map((stage) => {
                  const heightPercent = Math.max(6, Math.round((stage.count / maxBarValue) * 100));
                  return (
                    <div
                      key={stage.id}
                      className="group flex flex-col items-center h-full justify-end relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 bg-slate-900 text-white text-[11px] font-mono py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 shadow-md">
                        {stage.name}: <span className="font-bold">{stage.count}</span>
                      </div>

                      {/* Bar Value above bar */}
                      <span className="text-[10px] font-mono font-semibold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {stage.count}
                      </span>

                      {/* Bar Container */}
                      <div className="w-full max-w-[28px] bg-slate-100 rounded-t-md h-full flex items-end overflow-hidden">
                        <div
                          className="w-full rounded-t-md transition-all duration-700 ease-out group-hover:brightness-110"
                          style={{
                            height: `${heightPercent}%`,
                            backgroundColor: stage.color
                          }}
                        />
                      </div>

                      {/* X-Axis Slanted / Truncated Label */}
                      <div className="h-7 w-full flex items-center justify-center mt-1.5 overflow-hidden">
                        <span
                          className="text-[10px] text-slate-500 font-medium truncate block max-w-full text-center group-hover:text-slate-900"
                          title={stage.name}
                        >
                          {stage.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-bar Footer Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                  No Website ({noWebsiteCount})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                  Poor Mobile/Speed ({poorWebsiteCount})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  Deals Won ({dealsWonCount})
                </span>
              </div>
              <span className="font-mono text-slate-400">Total Pipeline Value: ${totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 5. INTERACTIVE LEADS & BUSINESSES DIRECTORY TABLE                  */}
        {/* ================================================================== */}
        <section className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
          {/* Table Header & Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Business & Leads Master Directory
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  {filteredBusinesses.length} Records
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Filtered view by audit status, priority, and outreach stage.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Categories</option>
                <option value="Healthcare & Clinic">Healthcare & Clinic</option>
                <option value="Supply Chain & Freight">Supply Chain & Freight</option>
                <option value="Food & Hospitality">Food & Hospitality</option>
                <option value="Legal Services">Legal Services</option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Wellness & Beauty">Wellness & Beauty</option>
                <option value="Industrial & Auto">Industrial & Auto</option>
                <option value="Real Estate & Design">Real Estate & Design</option>
                <option value="Finance & Wealth">Finance & Wealth</option>
                <option value="Media & Entertainment">Media & Entertainment</option>
              </select>

              {/* Export CSV */}
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>

              {/* Add Lead */}
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Business</span>
              </button>
            </div>
          </div>

          {/* Directory Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto text-xs font-medium bg-slate-50/50">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'all'
                  ? 'border-blue-600 text-blue-700 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              All Businesses ({totalBusinessCount})
            </button>
            <button
              onClick={() => setActiveTab('no-website')}
              className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'no-website'
                  ? 'border-rose-600 text-rose-700 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              No Website ({noWebsiteCount})
            </button>
            <button
              onClick={() => setActiveTab('poor-website')}
              className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'poor-website'
                  ? 'border-amber-600 text-amber-700 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Poor Website ({poorWebsiteCount})
            </button>
            <button
              onClick={() => setActiveTab('high-priority')}
              className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'high-priority'
                  ? 'border-purple-600 text-purple-700 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              High Priority ({highPriorityCount})
            </button>
            <button
              onClick={() => setActiveTab('action-req')}
              className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'action-req'
                  ? 'border-rose-600 text-rose-700 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Action Required ({actionReqCount})
            </button>
            <button
              onClick={() => setActiveTab('won')}
              className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${activeTab === 'won'
                  ? 'border-emerald-600 text-emerald-700 font-bold bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Deals Won ({dealsWonCount})
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-[11px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Business & City</th>
                  <th className="py-3 px-4">Website Audit</th>
                  <th className="py-3 px-4">Key Opportunity & Notes</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Deal Value</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Rep</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredBusinesses.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-400">
                      No businesses match the selected filters or search query.
                    </td>
                  </tr>
                ) : (
                  filteredBusinesses.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/90 transition-colors group"
                    >
                      {/* Business Name & City */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {b.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <span>{b.category}</span>
                          <span>•</span>
                          <span>{b.city}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          ID: {b.id}
                        </div>
                      </td>

                      {/* Website Audit Status */}
                      <td className="py-3 px-4">
                        {b.websiteStatus === 'no-website' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            No Website
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Poor Website
                          </span>
                        )}
                      </td>

                      {/* Audit Notes */}
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                          {b.auditNotes}
                        </p>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {b.phone}
                          </span>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-4">
                        {b.priority === 'high' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                            <Flame className="w-3 h-3 text-rose-500" />
                            High
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            Medium
                          </span>
                        )}
                      </td>

                      {/* Deal Value */}
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        ${b.dealValue.toLocaleString()}
                      </td>

                      {/* Stage Selector */}
                      <td className="py-3 px-4">
                        <select
                          value={b.stage}
                          onChange={(e) => handleStageChange(b.id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-none ${b.stage === 'deal-won'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : b.stage === 'proposal-sent' || b.stage === 'contract-sent'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                        >
                          <option value="lead-captured">Lead Captured</option>
                          <option value="audit-sent">Audit Sent</option>
                          <option value="pitch-booked">Pitch Booked</option>
                          <option value="demo-booked">Demo Booked</option>
                          <option value="proposal-sent">Proposal Sent</option>
                          <option value="negotiation">Negotiation</option>
                          <option value="contract-sent">Contract Sent</option>
                          <option value="deal-won">🏆 Deal Won</option>
                        </select>
                      </td>

                      {/* Assigned Rep */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                            {b.assignedTo.slice(0, 2)}
                          </div>
                          <span className="text-slate-600 font-medium">{b.assignedTo}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        {b.stage !== 'deal-won' ? (
                          <button
                            onClick={() => handleStageChange(b.id, 'deal-won')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all cursor-pointer"
                          >
                            Mark Won
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Closed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-3.5 bg-slate-50/70 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Showing {filteredBusinesses.length} active opportunities</span>
            <span className="font-mono text-slate-400">Nexoraa Intelligence Platform • Internal Sync Active</span>
          </div>
        </section>

      </div>

      {/* ==================================================================== */}
      {/* ADD NEW BUSINESS MODAL                                               */}
      {/* ==================================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add New Business Lead</h3>
                  <p className="text-xs text-slate-500">Log a targeted local business or web revamp opportunity</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBusiness} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skyline Orthodontics"
                  value={newBiz.name}
                  onChange={(e) => setNewBiz({ ...newBiz, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Industry / Category</label>
                  <select
                    value={newBiz.category}
                    onChange={(e) => setNewBiz({ ...newBiz, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Healthcare & Clinic">Healthcare & Clinic</option>
                    <option value="Supply Chain & Freight">Supply Chain & Freight</option>
                    <option value="Food & Hospitality">Food & Hospitality</option>
                    <option value="Legal Services">Legal Services</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="Wellness & Beauty">Wellness & Beauty</option>
                    <option value="Industrial & Auto">Industrial & Auto</option>
                    <option value="Real Estate & Design">Real Estate & Design</option>
                    <option value="Finance & Wealth">Finance & Wealth</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City / State</label>
                  <input
                    type="text"
                    placeholder="e.g. Austin, TX"
                    value={newBiz.city}
                    onChange={(e) => setNewBiz({ ...newBiz, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Website Status</label>
                  <select
                    value={newBiz.websiteStatus}
                    onChange={(e) => setNewBiz({ ...newBiz, websiteStatus: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="no-website">No Website (First Build)</option>
                    <option value="poor-website">Poor Website (Needs Revamp)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newBiz.priority}
                    onChange={(e) => setNewBiz({ ...newBiz, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Deal ($)</label>
                  <input
                    type="number"
                    value={newBiz.dealValue}
                    onChange={(e) => setNewBiz({ ...newBiz, dealValue: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Team Member</label>
                  <select
                    value={newBiz.assignedTo}
                    onChange={(e) => setNewBiz({ ...newBiz, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Ashish K.">Ashish K.</option>
                    <option value="Vikram S.">Vikram S.</option>
                    <option value="Priya M.">Priya M.</option>
                    <option value="Dev Team">Dev Team</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Audit Notes / Pain Points</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Broken mobile layout, slow loading, missing booking engine..."
                  value={newBiz.auditNotes}
                  onChange={(e) => setNewBiz({ ...newBiz, auditNotes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Save Business Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

