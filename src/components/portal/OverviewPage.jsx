import React, { useState, useEffect } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Terminal, CheckCircle2, MessageSquare, Play, 
  Check, Sparkles, WalletCards, Gauge, ArrowRight, Activity, Clock 
} from 'lucide-react';
import { usePortal } from './PortalContext';

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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden flex flex-col h-full min-h-[340px] rounded-3xl bg-[#030407]/60 border border-white/[0.05] backdrop-blur-2xl shadow-2xl group">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-700" />
      
      {/* Header */}
      <div className="relative px-6 py-5 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Live Project Pulse</h3>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">Real-time Telemetry</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">Live</span>
        </div>
      </div>

      {/* Feed */}
      <div className="relative flex-1 p-6 flex flex-col justify-end gap-5 font-mono text-[11px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03)_0%,transparent_100%)]" />
        <AnimatePresence initial={false}>
          {logs.slice().reverse().map((log, i) => (
            <m.div 
              key={log.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1 - (i * 0.2), y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0 }}
              className="flex items-start gap-4 relative z-10"
            >
              <div className={`mt-0.5 shrink-0 ${log.type === 'success' ? 'text-emerald-400' : log.type === 'dev' ? 'text-cyan-400' : 'text-indigo-400'}`}>
                {log.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                 log.type === 'dev' ? <Terminal className="w-3.5 h-3.5" /> : 
                 <Activity className="w-3.5 h-3.5" />}
              </div>
              <p className={`leading-relaxed tracking-wide ${
                log.type === 'success' ? 'text-emerald-300 font-medium' :
                log.type === 'dev' ? 'text-cyan-300/90' : 'text-gray-400'
              }`}>
                {log.text}
              </p>
            </m.div>
          ))}
        </AnimatePresence>
        
        {/* Fading overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#030407]/90 to-transparent pointer-events-none z-20" />
      </div>
    </div>
  );
};

const OverviewPage = ({ clientInfo, projects = [], milestones = [], invoices = [] }) => {
  const { setActivePage } = usePortal();
  const reduceMotion = useReducedMotion();
  const rise = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
  });

  const activeProject = projects.find(p => p.status === 'active') || projects[0];
  const projectMilestones = activeProject ? milestones.filter(m => m.project_id === activeProject.id) : [];
  
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue');
  const outstandingAmount = pendingInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const nextDueDate = pendingInvoices.length > 0 
    ? new Date(pendingInvoices[0].due_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) 
    : 'N/A';
  const nextInvoiceNo = pendingInvoices.length > 0 ? pendingInvoices[0].invoice_number : 'N/A';

  const uiMilestones = projectMilestones.length > 0 ? projectMilestones : [
    { id: 1, title: 'Discovery & Strategy', due_date: '2026-09-08', status: 'completed' },
    { id: 2, title: 'UI/UX Design', due_date: '2026-09-28', status: 'completed' },
    { id: 3, title: 'Frontend Build', due_date: '2026-10-18', status: 'in_progress' },
    { id: 4, title: 'Launch & QA', due_date: '2026-10-28', status: 'pending' }
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
    <div className="mx-auto w-full max-w-[1600px] p-6 lg:p-10 space-y-8">
      {/* Hero Header Area */}
      <m.div {...rise(0)} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/20 via-[#030407] to-blue-900/10 border border-white/[0.05] p-8 md:p-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">
                Mission Control
              </div>
              <span className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Updated just now
              </span>
            </m.div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              Welcome back, {clientInfo?.client_name?.split(' ')[0] || 'Client'}
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Your digital assets and projects are progressing smoothly. Review the latest updates and active milestones below.
            </p>
          </div>
          
          <m.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 shrink-0"
          >
            <button 
              onClick={() => setActivePage('messages')}
              className="group relative flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.08] px-5 py-3 text-xs font-bold text-gray-300 transition-all hover:bg-white/[0.08] hover:text-white hover:border-white/20 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <MessageSquare className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <span className="relative z-10">Message Team</span>
            </button>
            <button 
              onClick={() => window.open('https://rfelectrotech.com/', '_blank')}
              className="group relative flex items-center justify-center gap-2 rounded-xl bg-white text-[#030407] px-6 py-3 text-xs font-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">Review Build</span>
              <Play className="h-3 w-3 fill-current transition-transform group-hover:translate-x-1 relative z-10" />
            </button>
          </m.div>
        </div>
      </m.div>

      {/* Main Grid System */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Progress & Active Sprint Timeline */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Sprint Progress Card */}
          <m.section {...rise(0.1)} className="relative overflow-hidden rounded-3xl border border-white/[0.05] bg-[#030407]/40 p-8 backdrop-blur-2xl shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase mb-4">Active Project</span>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                  {activeProject?.project_name || 'No Project Assigned'}
                </h2>
                <p className="text-sm text-gray-400 max-w-lg">
                  {activeProject?.description || 'Get in touch with us to begin your journey.'}
                </p>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-end sm:justify-end gap-2 mb-1">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter">
                    {activeProject?.progress || 0}%
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold block">Overall Progress</span>
              </div>
            </div>

            <div className="relative w-full bg-[#0A0A0F] rounded-full h-3 border border-white/[0.05] overflow-hidden mb-10 shadow-inner">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${activeProject?.progress || 0}%` }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              >
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white/40 to-transparent" />
              </m.div>
            </div>

            {/* Milestones Horizontal Timeline */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-8 left-6 right-6 h-[2px] bg-white/[0.05] -z-10 hidden sm:block" />
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {uiMilestones.map((mItem, index) => {
                  const isCompleted = mItem.status === 'completed';
                  const isActive = mItem.status === 'in_progress' || mItem.status === 'review';
                  return (
                    <m.div
                      key={mItem.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                      className={`relative p-5 rounded-2xl border transition-all duration-500 ${
                        isActive ? 'bg-gradient-to-b from-blue-500/10 to-transparent border-blue-500/30 shadow-[0_10px_30px_rgba(59,130,246,0.1)] -translate-y-1' :
                        isCompleted ? 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]' : 'bg-[#030407]/50 border-white/[0.02] opacity-60 grayscale'
                      }`}
                    >
                      <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-4 mb-1">
                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center shadow-lg ${
                          isCompleted ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-500/20' :
                          isActive ? 'bg-gradient-to-br from-blue-400 to-indigo-600 text-white shadow-blue-500/30 ring-4 ring-blue-500/20' :
                          'bg-white/5 text-gray-500 border border-white/10'
                        }`}>
                          {isCompleted ? <Check className="w-5 h-5" strokeWidth={3} /> : <span className="font-bold">{index + 1}</span>}
                        </div>
                        <div>
                          <span className={`text-[9px] font-bold uppercase tracking-widest block mb-1 ${
                            isCompleted ? 'text-emerald-400' :
                            isActive ? 'text-blue-400' : 'text-gray-500'
                          }`}>
                            {mItem.status === 'completed' ? 'Completed' : mItem.status === 'in_progress' ? 'Active Phase' : mItem.status === 'review' ? 'In Review' : 'Upcoming'}
                          </span>
                          <h4 className="text-sm font-bold text-white leading-tight">{mItem.title}</h4>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-3 font-medium flex items-center gap-1.5 sm:mt-4">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDueDate(mItem.due_date)}
                      </p>
                    </m.div>
                  );
                })}
              </div>
            </div>
          </m.section>

          {/* Live Developer Updates Feed */}
          <m.div {...rise(0.2)}>
            <LivePulseFeed />
          </m.div>
        </div>

        {/* Right Column: Alerts, Balance, Telemetry */}
        <div className="lg:col-span-4 space-y-8">
          {/* Action Required: Milestone Review */}
          {activeMilestone && (
            <m.div
              {...rise(0.15)}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-[1px] shadow-[0_20px_40px_rgba(79,70,229,0.25)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-3xl rounded-[23px] p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Action Required</span>
                </div>
                <h3 className="text-lg font-black text-white leading-tight mb-2">
                  {activeMilestone.title} is ready.
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Review and approve the latest deliverables to keep the timeline on track for launch.
                </p>
                <button className="w-full mt-6 group/btn relative flex items-center justify-center gap-2 bg-white text-[#030407] px-4 py-3.5 rounded-xl text-xs font-black shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden transition-all hover:scale-[1.02] active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 uppercase tracking-wider">Open Review Panel</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </m.div>
          )}

          {/* Premium Billing card */}
          <m.section {...rise(0.25)} className="bg-[#030407]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/3 group-hover:bg-emerald-500/20 transition-colors duration-700" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-1">Total Outstanding</span>
                <h3 className="text-3xl font-black text-white tracking-tighter">
                  {outstandingAmount > 0 ? `$${outstandingAmount.toLocaleString()}` : '$0.00'}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg">
                <WalletCards className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            
            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex justify-between items-center bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-xs">
                <span className="text-gray-400 font-medium">Next Invoice</span>
                <span className="font-bold text-white tracking-wider">{nextInvoiceNo}</span>
              </div>
              
              <div className="flex justify-between items-center bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-xs">
                <span className="text-gray-400 font-medium">Status</span>
                <span className={`font-bold tracking-wide ${outstandingAmount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {outstandingAmount > 0 ? `Due ${nextDueDate}` : 'All caught up'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button className="bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/[0.08] text-xs font-bold py-3.5 rounded-xl transition-all uppercase tracking-wider">
                Details
              </button>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] uppercase tracking-wider">
                Pay Now
              </button>
            </div>
          </m.section>

          {/* Premium Telemetry card */}
          <m.section {...rise(0.3)} className="bg-[#030407]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3 group-hover:bg-cyan-500/20 transition-colors duration-700" />
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase block mb-1">Telemetry</span>
                <h3 className="text-base font-black text-white">System Pulse</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#22d3ee_0_99%,rgba(255,255,255,.05)_99%)] shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                <div className="absolute inset-1 rounded-full bg-[#030407]" />
                <div className="relative flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white leading-none">99<span className="text-sm">%</span></span>
                </div>
              </div>
              <div className="flex-1 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/[0.05]">
                  <span className="text-gray-400 font-medium">Uptime</span>
                  <span className="font-bold text-emerald-400">99.99%</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/[0.05]">
                  <span className="text-gray-400 font-medium">Latency</span>
                  <span className="font-bold text-white">0.8s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Errors (24h)</span>
                  <span className="font-bold text-gray-500">0</span>
                </div>
              </div>
            </div>
          </m.section>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
