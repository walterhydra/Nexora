import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  MessageSquare, FileText, CreditCard, PenTool, 
  Code, CheckCircle, Rocket, Globe,
  ArrowRight, ShieldCheck, ChevronDown, Check,
  Settings, Clock, LayoutDashboard, KanbanSquare, Receipt, ExternalLink, Lock
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';
import { docsData } from '../constants/docs';

const steps = [
  {
    id: 1,
    title: "Discovery & Strategy",
    time: "Day 1",
    desc: "We begin with a deep dive into your business objectives. No fluff, just absolute clarity on your target audience, site architecture, and project scope.",
    icon: MessageSquare,
    objectives: ["Audience & Goal Mapping", "Information Architecture", "Communication Setup"]
  },
  {
    id: 2,
    title: "Proposal & Timeline",
    time: "Day 1-2",
    desc: "You receive a precise, fixed-price quotation alongside a day-by-day roadmap. You know exactly what is being built, when it will be delivered, and how much it costs.",
    icon: FileText,
    objectives: ["Fixed Cost Breakdown", "Milestone Roadmap", "Tech Stack Selection"]
  },
  {
    id: 3,
    title: "Project Initiation",
    time: "Upon Approval",
    desc: "A 50% upfront commitment secures your development slot. We instantly provision your dedicated portal and assign engineering resources.",
    icon: CreditCard,
    objectives: ["Digital Invoicing", "Resource Allocation", "Portal Access Granted"]
  },
  {
    id: 4,
    title: "Formal Agreement",
    time: "Before Build",
    desc: "We execute a digital contract outlining intellectual property transfer, confidentiality, and exact deliverables. Your assets are fully protected.",
    icon: PenTool,
    objectives: ["Scope Verification", "Digital Signature", "IP & NDA Terms"]
  },
  {
    id: 5,
    title: "Engineering Sprint",
    time: "Day 2-6",
    desc: "The build phase. We write clean, performant code. You get access to live staging links and daily progress updates directly in your portal.",
    icon: Code,
    objectives: ["Custom Frontend Build", "API Integrations", "Daily Staging Updates"]
  },
  {
    id: 6,
    title: "Quality Assurance",
    time: "Day 7",
    desc: "Rigorous cross-browser testing and performance optimization. Once you sign off on the staging build, the final balance is cleared.",
    icon: CheckCircle,
    objectives: ["Cross-Device Testing", "Performance Audit", "Final Sign-off"]
  },
  {
    id: 7,
    title: "Deployment & Handoff",
    time: "Day 7",
    desc: "We push to production. Domain mapping, SSL setup, and asset handover are completed. Your 30-day technical support period begins.",
    icon: Rocket,
    objectives: ["Production Deployment", "Domain Configuration", "Source Code Handoff"]
  }
];

const faqs = [
  {
    q: "How much time does a standard project take?",
    a: "We specialize in rapid, high-quality deployment. Most standard corporate websites and landing pages are engineered and launched in exactly 7 days."
  },
  {
    q: "What is your revision policy?",
    a: "We offer 2 rounds of structural and design revisions during the staging phase to ensure the final product perfectly aligns with your expectations."
  },
  {
    q: "What payment methods do you accept?",
    a: "We process payments globally via Stripe (Cards, Wire) and accept UPI or standard Bank Transfers for domestic clients."
  },
  {
    q: "Do you provide post-launch support?",
    a: "Absolutely. Every engagement includes a standard 30-day period of technical support and bug-fixing post-deployment to ensure stability."
  }
];

export default function Onboarding() {
  const [activePortalTab, setActivePortalTab] = useState('kanban');
  const [expandedFaqIdx, setExpandedFaqIdx] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx) => {
    setExpandedFaqIdx(expandedFaqIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-200 selection:bg-white selection:text-black">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden">
        {/* Subtle, expensive mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <ShieldCheck className="text-gray-400" size={14} />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-300">Enterprise Protocol</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-black mb-8 tracking-tighter leading-[0.9] text-white">
            From Vision To <br className="hidden md:block" />
            <span className="text-gray-500">Reality In 7 Days.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            No endless email chains. No missed deadlines. Experience a radically transparent, engineering-driven onboarding process built for modern businesses.
          </p>

          <Link to="/contact">
            <MagneticButton className="mx-auto group bg-white hover:bg-gray-200 text-black pr-2 pl-6 py-2 font-bold text-sm rounded-full transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
              <span className="flex items-center gap-4">
                Initiate Project 
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </span>
            </MagneticButton>
          </Link>
        </m.div>
      </section>


      {/* 2. The Sprint (Sticky Scroll Layout) */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">The <br/>Architecture <br/>of Execution.</h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              A precise, deterministic seven-step roadmap designed to eliminate friction and guarantee delivery speed.
            </p>
            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          {/* Scrolling Right Column (Cards) */}
          <div className="lg:w-2/3 flex flex-col gap-12 md:gap-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <m.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Vertical tracking line */}
                  <div className="absolute left-0 top-0 bottom-[-3rem] md:bottom-[-6rem] w-[1px] bg-white/10 last:bg-transparent">
                    <div className="absolute top-0 left-[-4px] w-[9px] h-[9px] rounded-full bg-white border-2 border-black" />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                      Step 0{step.id}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                      {step.time}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight group flex items-center gap-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl font-light">
                    {step.desc}
                  </p>

                  <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 md:p-8">
                    <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-6 border-b border-white/5 pb-4">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-4">
                      {step.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm md:text-base text-gray-300">
                          <Check size={18} className="text-gray-500 flex-shrink-0 mt-0.5" />
                          <span className="font-light">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. The Portal Simulator (Professional Glass Redesign) */}
      <section className="py-32 px-6 relative overflow-hidden bg-black border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Total Transparency.</h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              Upon initiation, you receive access to our proprietary client dashboard. Monitor live staging, track sprint velocity, and download invoices—all in one secure environment.
            </p>
          </div>

          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative mx-auto max-w-5xl z-10"
          >
            {/* Elegant Frosted Window */}
            <div className="relative rounded-2xl bg-[#080808]/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col h-[600px]">
              
              {/* macOS-style Window Chrome */}
              <div className="h-12 bg-black/40 border-b border-white/10 flex items-center px-4 justify-between backdrop-blur-md">
                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-gray-400">
                  <Lock size={10} className="text-gray-500" /> portal.nexoraa.agency/client/ACME
                </div>
              </div>
              
              <div className="flex flex-1 overflow-hidden">
                {/* Minimalist Sidebar */}
                <div className="w-64 border-r border-white/5 bg-black/20 flex-col hidden md:flex">
                  <div className="p-6 pb-2">
                    <div className="text-xl font-display font-bold text-white mb-8 tracking-tighter">NEXORAA.</div>
                    <div className="space-y-1">
                      {[
                        { id: 'kanban', icon: KanbanSquare, label: 'Sprint Board' },
                        { id: 'staging', icon: ExternalLink, label: 'Live Staging' },
                        { id: 'invoices', icon: Receipt, label: 'Invoices' },
                        { id: 'settings', icon: Settings, label: 'Settings' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActivePortalTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            activePortalTab === tab.id 
                              ? 'bg-white/10 text-white' 
                              : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                          }`}
                        >
                          <tab.icon size={16} strokeWidth={activePortalTab === tab.id ? 2 : 1.5} />
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto p-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                        AC
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">ACME Corp</div>
                        <div className="text-[10px] text-gray-500 font-mono">Enterprise</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 bg-[#0A0A0A] relative overflow-hidden">
                  
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                          {activePortalTab === 'kanban' && 'Sprint Board'}
                          {activePortalTab === 'staging' && 'Staging Environment'}
                          {activePortalTab === 'invoices' && 'Billing'}
                          {activePortalTab === 'settings' && 'Project Settings'}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono">ID: NXR-ACME-892</p>
                      </div>
                      
                      {activePortalTab === 'kanban' && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-gray-300 text-xs font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Sprint Active
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      <AnimatePresence mode="wait">
                        {activePortalTab === 'kanban' && (
                          <m.div 
                            key="kanban"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                          >
                            {/* Todo Column */}
                            <div className="space-y-4">
                              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                                Backlog (2)
                              </div>
                              <div className="bg-[#111] border border-white/5 p-5 rounded-xl hover:border-white/10 transition-colors">
                                <h4 className="text-sm font-bold text-white mb-2">Connect Stripe API</h4>
                                <div className="text-xs text-gray-500 font-mono">Backend Task</div>
                              </div>
                              <div className="bg-[#111] border border-white/5 p-5 rounded-xl hover:border-white/10 transition-colors">
                                <h4 className="text-sm font-bold text-white mb-2">Build Pricing Component</h4>
                                <div className="text-xs text-gray-500 font-mono">Frontend Task</div>
                              </div>
                            </div>
                            
                            {/* In Progress Column */}
                            <div className="space-y-4">
                              <div className="text-[10px] font-mono text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" /> In Progress (1)
                              </div>
                              <div className="bg-white/5 border border-white/20 p-5 rounded-xl relative overflow-hidden">
                                <div className="absolute left-0 top-0 w-[2px] h-full bg-white" />
                                <h4 className="text-sm font-bold text-white mb-3">Hero Section Parallax</h4>
                                <div className="w-full bg-black rounded-full h-1 mb-2">
                                  <div className="bg-white h-1 rounded-full w-[60%]" />
                                </div>
                                <div className="text-[10px] text-gray-400 font-mono text-right">60% Complete</div>
                              </div>
                            </div>
                            
                            {/* Done Column */}
                            <div className="space-y-4 opacity-50">
                              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                                Completed (2)
                              </div>
                              <div className="bg-[#111] border border-white/5 p-5 rounded-xl">
                                <h4 className="text-sm font-bold text-gray-400 line-through mb-1">Architecture Setup</h4>
                              </div>
                              <div className="bg-[#111] border border-white/5 p-5 rounded-xl">
                                <h4 className="text-sm font-bold text-gray-400 line-through mb-1">Database Schema</h4>
                              </div>
                            </div>
                          </m.div>
                        )}
                        
                        {activePortalTab !== 'kanban' && (
                          <m.div
                            key="other"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full text-center p-8"
                          >
                            <Settings size={24} className="text-gray-700 mb-4" />
                            <p className="text-sm text-gray-500 font-mono max-w-sm">
                              Encrypted data segment. Active during production lifecycle.
                            </p>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* 4. Minimalist FAQ / Operations */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Operational Clarity.</h2>
            <p className="text-gray-400 text-lg font-light">Direct answers to common logistical questions.</p>
          </div>

          <div className="space-y-1">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border-b border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between py-8 text-left group"
                >
                  <span className={`text-xl md:text-2xl font-display tracking-tight transition-colors ${expandedFaqIdx === idx ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    expandedFaqIdx === idx ? 'border-white bg-white text-black' : 'border-white/10 text-white group-hover:border-white/30'
                  }`}>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${expandedFaqIdx === idx ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaqIdx === idx && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-400 text-lg leading-relaxed font-light pr-12">
                        {faq.a}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Minimalist CTA */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter">
            Ready to Build?
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Skip the endless meetings. Let's engineer your digital presence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact">
              <MagneticButton className="group bg-white text-black pr-2 pl-8 py-2.5 font-bold text-sm rounded-full transition-colors hover:bg-gray-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <span className="flex items-center gap-6">
                  Initiate Project 
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </span>
              </MagneticButton>
            </Link>
            <a href="https://wa.me/917383303388" target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
              Connect via WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
