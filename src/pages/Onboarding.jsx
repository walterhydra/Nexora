import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, FileText, CreditCard, PenTool, 
  Code, CheckCircle, Rocket, FileImage, Globe, 
  UploadCloud, ArrowRight, ShieldCheck, HelpCircle,
  ChevronRight, ChevronDown, Check, Sparkles,
  Calculator, Settings
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';
import { docsData } from '../constants/docs';

// Reusing same icons from lucide
const IconMap = {
  MessageSquare,
  FileText,
  CreditCard,
  ShieldCheck
};

const steps = [
  {
    id: 1,
    title: "Requirement Discussion",
    time: "Day 1",
    desc: "Initial meeting or call to understand your vision, business goals, and precise project scope.",
    icon: MessageSquare,
    color: "text-cyan-400",
    glowColor: "rgba(34, 211, 238, 0.15)",
    objectives: [
      "Identify target audience & project goals",
      "Map out complete site structure & sitemap",
      "Establish communication channels (Slack/Email)"
    ]
  },
  {
    id: 2,
    title: "Quotation & Timeline",
    time: "Day 1-2",
    desc: "Custom proposal detailing the exact pricing, deliverable breakdown, and our 7-day execution timeline.",
    icon: FileText,
    color: "text-purple-400",
    glowColor: "rgba(192, 132, 252, 0.15)",
    objectives: [
      "Detailed feature-by-feature cost breakdown",
      "Exact day-by-day milestone delivery roadmap",
      "Transparent technical stack proposal"
    ]
  },
  {
    id: 3,
    title: "Advance Payment",
    time: "Upon Approval",
    desc: "A 50% upfront payment is processed to confirm your project slot and initiate our development sprint.",
    icon: CreditCard,
    color: "text-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.15)",
    objectives: [
      "Generate secure digital invoice",
      "Secure payments via UPI, Stripe, or Bank Transfer",
      "Assign dedicated development resources"
    ]
  },
  {
    id: 4,
    title: "Project Agreement",
    time: "Before Build",
    desc: "Signing of a formal digital contract covering the scope, milestones, and intellectual property terms.",
    icon: PenTool,
    color: "text-amber-400",
    glowColor: "rgba(251, 191, 36, 0.15)",
    objectives: [
      "Review project scope & milestones agreement",
      "Secure digital signature of contract",
      "Establish confidentiality & IP transfer terms"
    ]
  },
  {
    id: 5,
    title: "Active Development",
    time: "Day 2-6",
    desc: "We build your project. You get a live staging link to watch progress and regular updates from our team.",
    icon: Code,
    color: "text-blue-400",
    glowColor: "rgba(96, 165, 250, 0.15)",
    objectives: [
      "Develop clean, responsive custom frontend",
      "Integrate requested dynamic features & APIs",
      "Daily live updates via staging URL"
    ]
  },
  {
    id: 6,
    title: "Final Payment",
    time: "Day 7",
    desc: "Once you approve the final staging build, the remaining 50% payment is cleared before domain handover.",
    icon: CheckCircle,
    color: "text-green-400",
    glowColor: "rgba(74, 222, 128, 0.15)",
    objectives: [
      "Run full cross-browser & QA testing",
      "Final review and project sign-off",
      "Settle final remaining invoice balance"
    ]
  },
  {
    id: 7,
    title: "Delivery & Launch",
    time: "Day 7",
    desc: "Project handover! You receive all source code, credentials, documentation, and post-launch support.",
    icon: Rocket,
    color: "text-rose-400",
    glowColor: "rgba(251, 113, 133, 0.15)",
    objectives: [
      "Deploy code to production server",
      "Connect custom domain & SSL configurations",
      "Initiate 30 days of free post-launch support"
    ]
  }
];

const prerequisites = [
  {
    title: "Brand Assets",
    desc: "High-resolution logos, brand guidelines, and specific color codes.",
    icon: FileImage
  },
  {
    title: "Website Content",
    desc: "Text copy for pages (About, Services, etc.) and high-quality images.",
    icon: UploadCloud
  },
  {
    title: "Domain & Hosting",
    desc: "Access credentials to your domain registrar (GoDaddy, Namecheap, etc.).",
    icon: Globe
  }
];

const faqs = [
  {
    q: "How much time does a project take?",
    a: "We specialize in rapid deployment. Most standard corporate websites and landing pages are designed, built, and launched in exactly 7 days."
  },
  {
    q: "What is your revision policy?",
    a: "We offer 2 rounds of free revisions during the staging phase to ensure the design matches your exact expectations before final handover."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI / Bank Transfer (for Indian clients) and international payments secure via Stripe, PayPal, or Wire Transfer."
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes! Every project comes with 30 days of free bug-fixing and technical support to ensure a smooth transition."
  }
];

const projectTypes = [
  {
    id: 'landing',
    name: 'Landing Page',
    desc: 'High-converting single-page landing site with clean visuals and interactive elements.',
    basePrice: { INR: 24999, USD: 299 },
    baseDays: 4
  },
  {
    id: 'corporate',
    name: 'Corporate Website',
    desc: 'Multi-page business website presenting your services, values, team, and contact channels.',
    basePrice: { INR: 49999, USD: 599 },
    baseDays: 7
  },
  {
    id: 'saas',
    name: 'SaaS MVP / Portal',
    desc: 'Full-stack application with interactive dashboard, mock database, and secure user states.',
    basePrice: { INR: 79999, USD: 999 },
    baseDays: 10
  },
  {
    id: 'custom',
    name: 'E-Commerce & Custom App',
    desc: 'Custom digital platforms with payment gate, product listings, or bespoke business logic.',
    basePrice: { INR: 99999, USD: 1199 },
    baseDays: 14
  }
];

const addonsList = [
  {
    id: 'animations',
    name: 'Premium Custom Animations',
    desc: 'Framer Motion & GSAP animations for Awwwards-level polish.',
    price: { INR: 9999, USD: 120 },
    days: 1
  },
  {
    id: 'seo',
    name: 'Advanced SEO & Meta-tag Setup',
    desc: 'Complete Schema.org schema validation and search engine optimization indexing.',
    price: { INR: 4999, USD: 60 },
    days: 0
  },
  {
    id: 'integrations',
    name: 'Third-Party APIs & CRM Connect',
    desc: 'Link contact queries, database sheets, or marketing pipelines (Zapier, HubSpot).',
    price: { INR: 14999, USD: 180 },
    days: 1
  },
  {
    id: 'auth',
    name: 'Client Portal & Authentication',
    desc: 'Create secure private client panels with password gates and login controls.',
    price: { INR: 24999, USD: 299 },
    days: 2
  }
];

export default function Onboarding() {
  const [activeStepId, setActiveStepId] = useState(1);
  const [activeDocId, setActiveDocId] = useState(docsData[0].id);
  const [expandedFaqIdx, setExpandedFaqIdx] = useState(null);
  
  const [selectedType, setSelectedType] = useState('landing');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeDoc = docsData.find(doc => doc.id === activeDocId);
  const activeStep = steps.find(step => step.id === activeStepId);
  const ActiveStepIcon = activeStep.icon;

  const toggleFaq = (idx) => {
    setExpandedFaqIdx(expandedFaqIdx === idx ? null : idx);
  };

  const selectedProjType = projectTypes.find(t => t.id === selectedType);
  
  let totalPriceINR = selectedProjType.basePrice.INR;
  let totalPriceUSD = selectedProjType.basePrice.USD;
  let totalDays = selectedProjType.baseDays;

  selectedAddons.forEach(addonId => {
    const addon = addonsList.find(a => a.id === addonId);
    if (addon) {
      totalPriceINR += addon.price.INR;
      totalPriceUSD += addon.price.USD;
      totalDays += addon.days;
    }
  });

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  const renderContent = (text) => {
    const lines = text.trim().split('\n');
    return lines.map((line, idx) => {
      line = line.trim();
      if (!line) return <br key={idx} />;
      
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-4 tracking-tight">{line.replace('### ', '')}</h3>;
      }
      
      if (line.startsWith('- ')) {
        const parts = line.replace('- ', '').split('**');
        return (
          <li key={idx} className="flex items-start gap-3 mb-3 text-gray-400">
            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
            <span>
              {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part)}
            </span>
          </li>
        );
      }

      if (line.startsWith('*') && line.endsWith('*')) {
        return <p key={idx} className="italic text-gray-500 my-4 text-sm">{line.replace(/\*/g, '')}</p>;
      }

      return <p key={idx} className="text-gray-400 my-4 leading-relaxed text-lg">{line}</p>;
    });
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/5 via-black to-black -z-10" />
      
      {/* Ambient glowing blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-blue/20 bg-accent-blue/5 mb-6 shadow-[0_0_15px_rgba(0,245,255,0.05)]">
            <ShieldCheck className="text-accent-blue animate-pulse" size={14} />
            <span className="text-xs font-bold uppercase tracking-widest text-accent-blue">Client Journey Protocol</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tight leading-none">
            Our Onboarding <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-cyan-400 to-purple-400">Process</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Transparent, rapid, and engineering-focused. Here is exactly how we take your vision to launch in exactly 7 days.
          </p>
        </motion.div>

        {/* 7-Step Interactive Timeline Dashboard */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Step-by-Step Dashboard</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-1">Interactive Sprint Roadmap</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step Navigation Column (Left) */}
            <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = activeStepId === step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4.5 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden ${
                      isActive 
                        ? 'bg-white/[0.03] border-accent-blue/40 shadow-[0_0_25px_rgba(0,245,255,0.08)]' 
                        : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Active highlight side bar */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeStepIndicator" 
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent-blue" 
                      />
                    )}
                    
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-colors ${
                      isActive ? 'bg-accent-blue text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'
                    }`}>
                      {step.id}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-base ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                          {step.title}
                        </h3>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-accent-blue/15 text-accent-blue' : 'bg-white/5 text-gray-500'}`}>
                          {step.time}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Step Description Card (Right) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ backgroundColor: 'rgba(5, 5, 5, 0.4)', boxShadow: `0px 0px 40px ${activeStep.glowColor}` }}
                  className="p-8 md:p-12 rounded-[32px] border border-white/10 h-full flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Decorative corner glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Giant number background */}
                  <div className="absolute right-6 bottom-0 text-[180px] font-display font-black text-white/[0.01] select-none leading-none">
                    0{activeStep.id}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${activeStep.color} border border-white/10`}>
                        <ActiveStepIcon size={28} />
                      </div>
                      <span className="text-sm font-mono font-bold text-accent-blue bg-accent-blue/10 border border-accent-blue/20 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                        {activeStep.time}
                      </span>
                    </div>

                    <h3 className="text-3xl font-display font-bold text-white mb-4">{activeStep.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                      {activeStep.desc}
                    </p>

                    {/* Step Specific Objectives */}
                    <div className="border-t border-white/5 pt-6">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-accent-blue" /> Step Objectives & Deliverables
                      </h4>
                      <ul className="space-y-3.5">
                        {activeStep.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                            <div className="w-5 h-5 rounded-md bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check size={12} className="text-accent-blue" />
                            </div>
                            <span className="leading-relaxed">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scope & Estimator Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 bg-[#030303]/40 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden backdrop-blur-xl"
        >
          {/* Radial light glow */}
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-accent-blue flex items-center gap-2">
                <Calculator size={14} /> Interactive Cost Calculator
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2">Scope & Estimate Planner</h2>
              <p className="text-gray-400 mt-2 text-base">Select your core deliverables and add-ons to build your custom 7-day sprint plan.</p>
            </div>
            
            {/* Currency selector toggle */}
            <div className="flex bg-white/5 border border-white/10 rounded-full p-1.5 self-start md:self-auto shadow-inner">
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-full transition-all ${
                  currency === 'USD' ? 'bg-accent-blue text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button 
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-full transition-all ${
                  currency === 'INR' ? 'bg-accent-blue text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                INR (₹)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Project Types & Addons (Left) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">1. Select Project Type</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                        selectedType === type.id
                          ? 'bg-accent-blue/[0.03] border-accent-blue/40 shadow-[0_0_20px_rgba(0,245,255,0.05)]'
                          : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <h5 className={`font-bold text-base mb-1.5 ${selectedType === type.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {type.name}
                      </h5>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">{type.desc}</p>
                      <div className="text-sm font-mono font-bold text-accent-blue">
                        Base: {currency === 'USD' ? `$${type.basePrice.USD}` : `₹${type.basePrice.INR.toLocaleString()}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">2. Choose Optional Add-ons</h4>
                <div className="space-y-3">
                  {addonsList.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 relative group ${
                          isSelected
                            ? 'bg-white/[0.03] border-accent-blue/30 shadow-[0_0_15px_rgba(0,245,255,0.03)]'
                            : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                            isSelected ? 'bg-accent-blue border-accent-blue text-black' : 'border-white/20 text-transparent'
                          }`}>
                            <Check size={12} className="stroke-[3]" />
                          </div>
                          <div>
                            <h5 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                              {addon.name}
                            </h5>
                            <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{addon.desc}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <div className="text-sm font-mono font-bold text-accent-blue">
                            +{currency === 'USD' ? `$${addon.price.USD}` : `₹${addon.price.INR.toLocaleString()}`}
                          </div>
                          {addon.days > 0 && (
                            <span className="text-[10px] text-gray-500 font-mono">+{addon.days} Day</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Estimate Summary Card (Right) */}
            <div className="lg:col-span-5">
              <div className="bg-[#050505] p-8 md:p-10 rounded-3xl border border-white/10 h-full flex flex-col justify-between relative overflow-hidden">
                {/* Glow backdrop effect */}
                <div className="absolute right-[-20%] bottom-[-20%] w-60 h-60 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                    <Settings size={14} className="text-accent-blue animate-spin-slow" /> Estimate Summary
                  </h4>
                  
                  <div className="space-y-4 border-b border-white/5 pb-6 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Project Platform</span>
                      <span className="font-bold text-white">{selectedProjType.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Add-ons Selected</span>
                      <span className="font-bold text-white">{selectedAddons.length} selected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Total Sprint Timeline</span>
                      <span className="font-bold text-accent-blue font-mono">{totalDays} Days</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">Total Estimated Budget</span>
                    <div className="text-4xl md:text-5xl font-display font-black text-white tracking-tight flex items-baseline gap-1.5">
                      {currency === 'USD' ? `$${totalPriceUSD}` : `₹${totalPriceINR.toLocaleString()}`}
                      <span className="text-xs font-mono text-gray-500 font-normal">est.</span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mt-2">
                      *Includes standard staging link, responsive styling, and 30-day bug support. A formal custom quotation will be sent.
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <Link to={`/contact?type=${encodeURIComponent(selectedProjType.name)}&addons=${encodeURIComponent(selectedAddons.map(id => addonsList.find(a => a.id === id)?.name).filter(Boolean).join(', '))}&price=${encodeURIComponent(currency === 'USD' ? `$${totalPriceUSD}` : `₹${totalPriceINR.toLocaleString()}`)}`}>
                    <MagneticButton className="w-full bg-accent-primary hover:bg-cyan-400 text-black py-4 font-bold text-base rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.15)] transition-all duration-300">
                      Proceed with this Scope <ArrowRight size={18} />
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Documentation Viewer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Legal & Operations</span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mt-1">Deep Dive into the Protocol</h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 bg-[#030303]/40 p-6 md:p-8 rounded-[32px] border border-white/5 backdrop-blur-xl">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/3 flex-shrink-0">
              <nav className="space-y-2">
                {docsData.map((doc) => {
                  const Icon = IconMap[doc.icon] || MessageSquare;
                  const isActive = activeDocId === doc.id;

                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDocId(doc.id)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group border
                        ${isActive 
                          ? 'bg-accent-blue/5 border-accent-blue/30 shadow-[0_0_20px_rgba(0,245,255,0.05)]' 
                          : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                        }
                      `}
                    >
                      <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-accent-blue text-black shadow-[0_0_15px_rgba(0,245,255,0.3)]' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                          {doc.title}
                        </h3>
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeDocIndicator" className="text-accent-blue">
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="w-full lg:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDocId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/60 p-8 md:p-10 rounded-2xl border border-white/5 h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-purple-500" />
                  
                  <div className="mb-8 border-b border-white/10 pb-6">
                    <h2 className="text-3xl font-display font-black text-white mb-2">{activeDoc.title}</h2>
                    <p className="text-lg text-gray-500 font-medium">{activeDoc.subtitle}</p>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    {renderContent(activeDoc.content)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </motion.div>

        {/* Bento Grid layout for Prerequisites & Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
          
          {/* Prerequisites */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-[#030303]/40 p-8 md:p-10 rounded-[32px] border border-white/5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl font-bold mb-2 text-white">What We Need From You</h3>
              <p className="text-gray-400 mb-8">To hit the 7-day milestone, we require these prerequisites prior to kick-off:</p>
              
              <div className="space-y-6">
                {prerequisites.map((req, i) => {
                  const Icon = req.icon;
                  return (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-accent-blue transition-all duration-300 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/30">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{req.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{req.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Quick Rules */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 flex flex-col justify-between"
          >
            <div className="bg-[#030303]/40 p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
              <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                <PenTool className="text-purple-400" size={18} /> Revision Policy
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                We believe in perfection. Every project includes <strong className="text-white">2 rounds of free revisions</strong> during development. Structural edits post-approval are handled separately.
              </p>
            </div>

            <div className="bg-[#030303]/40 p-8 rounded-2xl border border-white/5 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />
              <div>
                <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                  <CreditCard className="text-green-400" size={18} /> Payment Methods
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm mb-5">
                  Flexible, secure checkout processes built for global delivery:
                </p>
                <ul className="space-y-2.5 text-xs font-mono text-gray-300">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> UPI / Bank Transfer (India)</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Swift / Wire Transfer</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Stripe / Cards / PayPal (Global)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Frequently Asked Questions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-accent-blue/60 mx-auto mb-3" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Frequently Asked Questions</h3>
            <p className="text-gray-500 text-sm">Have queries about how the 7-day delivery sprint runs?</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className={`bg-[#030303]/40 border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-accent-blue/30 bg-white/[0.02]' : 'border-white/5'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-white hover:text-accent-blue transition-colors group"
                  >
                    <span className="text-base md:text-lg">{faq.q}</span>
                    <ChevronDown 
                      size={18} 
                      className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-blue' : ''}`} 
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4 bg-black/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] border border-white/10 text-center p-12 md:p-20 overflow-hidden bg-black shadow-[0_0_50px_rgba(0,245,255,0.03)]"
        >
          {/* Futuristic ambient grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
              Ready to Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-purple-400">Vision?</span>
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Step into the sprint. Work directly with elite engineers and get your digital product launched in exactly 7 days.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link to="/contact">
                <MagneticButton className="bg-accent-primary hover:bg-cyan-400 text-black px-8 py-4.5 font-bold text-base rounded-full flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,245,255,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,245,255,0.5)]">
                  Start Your Project <ArrowRight size={18} />
                </MagneticButton>
              </Link>
              <a href="https://wa.me/917383303388" target="_blank" rel="noopener noreferrer">
                <MagneticButton className="bg-[#25D366]/10 border border-[#25D366]/30 text-white hover:bg-[#25D366]/20 px-8 py-4.5 font-bold text-base rounded-full flex items-center gap-2.5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#25D366" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  Chat on WhatsApp
                </MagneticButton>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
