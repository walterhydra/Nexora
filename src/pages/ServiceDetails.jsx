import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { services } from '../constants/services';
import { Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link as LinkIcon, TrendingUp, ArrowLeft, CheckCircle2, Shield, Clock, Check, X, HelpCircle } from 'lucide-react';
import ScrambleText from '../components/ui/ScrambleText';
import { getScroll } from '../utils/scroll';

const iconMap = {
  Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link: LinkIcon, TrendingUp
};

const getServiceComparison = (slug) => {
  const defaultCompare = {
    features: [
      { name: "Price", starter: "₹15,000", growth: "₹35,000", scale: "₹80,000", enterprise: "Custom" },
      { name: "Timeline", starter: "3 Days", growth: "7 Days", scale: "14 Days", enterprise: "Flexible" },
      { name: "Revision Rounds", starter: "1 Round", growth: "3 Rounds", scale: "Unlimited", enterprise: "SLA Guaranteed" },
      { name: "Support Period", starter: "1 Month", growth: "3 Months", scale: "6 Months", enterprise: "24/7 Priority" },
      { name: "Dedicated Specialist", starter: false, growth: true, scale: true, enterprise: "Full Squad" },
      { name: "Source Code Access", starter: true, growth: true, scale: true, enterprise: "Complete IP Transfer" },
    ]
  };

  if (slug === 'web-development') {
    return {
      features: [
        { name: "Pricing (INR)", starter: "₹15,000", growth: "₹35,000", scale: "₹80,000", enterprise: "Custom Quote" },
        { name: "Timeline", starter: "3 Days", growth: "7 Days", scale: "14 Days", enterprise: "Custom Roadmap" },
        { name: "Page Limit", starter: "Up to 5 Pages", growth: "Up to 10 Pages", scale: "Unlimited Pages", enterprise: "Enterprise Systems" },
        { name: "Database Integration", starter: "Static Only", growth: "Basic Database", scale: "High-Performance Db", enterprise: "Multi-cluster Distributed" },
        { name: "Revision Rounds", starter: "1 Round", growth: "3 Rounds", scale: "Unlimited", enterprise: "Continuous SLA" },
        { name: "SEO Optimization", starter: "Basic Meta Tags", growth: "Full On-Page SEO", scale: "Advanced Schema & Speed", enterprise: "Enterprise Programmatic SEO" },
        { name: "CMS Admin Panel", starter: false, growth: true, scale: true, enterprise: "Custom Headless CMS" },
        { name: "Support Period", starter: "1 Month", growth: "3 Months", scale: "6 Months", enterprise: "24/7 Dedicated Support" },
      ]
    };
  }

  if (slug === 'app-development') {
    return {
      features: [
        { name: "Pricing (INR)", starter: "₹25,000", growth: "₹65,000", scale: "₹1,20,000", enterprise: "Custom Quote" },
        { name: "Timeline", starter: "5 Days", growth: "10 Days", scale: "21 Days", enterprise: "Agile Sprints" },
        { name: "Platform Support", starter: "Android Only", growth: "iOS & Android (Hybrid)", scale: "iOS + Android + Web", enterprise: "Multi-device IoT / Watch" },
        { name: "User Auth & Profiles", starter: false, growth: "Social + Email Auth", scale: "Advanced Multi-Factor Auth", enterprise: "Enterprise IAM Single Sign-On" },
        { name: "Offline Mode / Sync", starter: false, growth: "Basic caching", scale: "Real-time Offline Sync", enterprise: "Distributed Peer-to-Peer" },
        { name: "Store Submission", starter: "Guide Only", growth: "Full Play/App Store submission", scale: "Submission & Beta Testing", enterprise: "Continuous App Store Ops" },
        { name: "Support Period", starter: "1 Month", growth: "3 Months", scale: "6 Months", enterprise: "24/7 Critical System Monitoring" },
      ]
    };
  }

  if (slug === 'ui-ux-design') {
    return {
      features: [
        { name: "Pricing (INR)", starter: "₹10,000", growth: "₹25,000", scale: "₹50,000", enterprise: "Custom retainer" },
        { name: "Timeline", starter: "2 Days", growth: "5 Days", scale: "10 Days", enterprise: "Continuous Retainer" },
        { name: "Figma Delivery", starter: "Screens Only", growth: "Organized Figma Drafts", scale: "Elite Premium UI Kit", enterprise: "Complete Multi-brand Design System" },
        { name: "Interactive Prototype", starter: false, growth: "Basic click-through", scale: "Fully Animated Flow", enterprise: "High-Fidelity Micro-interactions" },
        { name: "User Research & Audits", starter: false, growth: "Competitor Audit", scale: "Complete User Testing Report", enterprise: "Continuous Usability Audits" },
        { name: "Developer Hand-off", starter: "Assets Export", growth: "Spec sheets", scale: "Zero-friction dev guidelines", enterprise: "Live Component Library Sync" },
        { name: "Revision Rounds", starter: "2 Rounds", growth: "4 Rounds", scale: "Unlimited Revisions", enterprise: "SLA Dedicated Designer" },
      ]
    };
  }

  if (slug === 'ai-automation') {
    return {
      features: [
        { name: "Pricing (INR)", starter: "₹20,000", growth: "₹50,000", scale: "₹1,00,000", enterprise: "Custom Quote" },
        { name: "Timeline", starter: "4 Days", growth: "8 Days", scale: "15 Days", enterprise: "Milestone-driven" },
        { name: "AI Model Integration", starter: "OpenAI API Basic", growth: "Advanced LangChain Agents", scale: "Custom RAG & Fine-tuning", enterprise: "Proprietary Local LLMs" },
        { name: "Workflow Automations", starter: "1 active tool integration", growth: "Up to 5 API integrations", scale: "Complete Multi-system Sync", enterprise: "Autonomous Agent Clusters" },
        { name: "Database & Vector Search", starter: false, growth: "Basic database logging", scale: "Vector database integration", enterprise: "Fully Federated Vector Search" },
        { name: "Analytics Dashboard", starter: false, growth: "Basic logs", scale: "Live Cost & Token analytics", enterprise: "Enterprise System Observability" },
        { name: "Support Period", starter: "1 Month", growth: "3 Months", scale: "6 Months", enterprise: "24/7 AI System Support" },
      ]
    };
  }

  return defaultCompare;
};

const ArchitectureBlueprint = ({ tier }) => {
  return (
    <div className="bg-[#0A0A0B] border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden h-[180px] md:h-[220px] shadow-inner">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/4 w-[150px] h-[150px] bg-[#00F5FF]/5 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="absolute top-3 left-4 text-[9px] font-mono tracking-widest text-[#00F5FF]/80 flex items-center gap-1.5 uppercase select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-ping" />
        Live Blueprint: {tier.toUpperCase()} TOPOLOGY
      </div>

      <svg className="w-full h-full max-w-[460px] relative z-10" viewBox="0 0 500 200" fill="none">
        <defs>
          <filter id="glow-heavy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {tier === 'starter' && (
          <g>
            {/* Draw active line */}
            <motion.path
              d="M 125 100 L 375 100"
              stroke="#00F5FF"
              strokeWidth="2.5"
              strokeDasharray="8 4"
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              filter="url(#glow-heavy)"
              strokeLinecap="round"
            />
            {/* Nodes */}
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <rect x="40" y="70" width="110" height="60" rx="10" fill="#141416" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="95" y="98" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Client Web</text>
              <text x="95" y="114" fill="#888" fontSize="8" fontFamily="monospace" textAnchor="middle">Vite Engine</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <rect x="350" y="70" width="110" height="60" rx="10" fill="#141416" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="405" y="98" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Edge Host</text>
              <text x="405" y="114" fill="#888" fontSize="8" fontFamily="monospace" textAnchor="middle">Global CDN</text>
            </motion.g>
          </g>
        )}

        {tier === 'growth' && (
          <g>
            {/* Draw active lines */}
            <motion.path
              d="M 100 100 L 210 100"
              stroke="#9B59FF"
              strokeWidth="2"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.path
              d="M 310 100 L 380 65"
              stroke="#9B59FF"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.path
              d="M 310 100 L 380 135"
              stroke="#9B59FF"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />

            {/* Nodes */}
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <rect x="15" y="70" width="95" height="60" rx="10" fill="#141416" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="62" y="98" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">App Client</text>
              <text x="62" y="114" fill="#888" fontSize="8" fontFamily="monospace" textAnchor="middle">React client</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <rect x="210" y="70" width="100" height="60" rx="10" fill="#141416" stroke="#9B59FF" strokeWidth="1.5" />
              <text x="260" y="98" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Vercel Edge</text>
              <text x="260" y="114" fill="#888" fontSize="8" fontFamily="monospace" textAnchor="middle">Serverless API</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <rect x="380" y="35" width="105" height="50" rx="8" fill="#141416" stroke="#333" strokeWidth="1" />
              <text x="432" y="59" fill="#aaa" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">API Engine</text>
              <text x="432" y="72" fill="#666" fontSize="7" fontFamily="monospace" textAnchor="middle">Core Services</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <rect x="380" y="110" width="105" height="50" rx="8" fill="#141416" stroke="#00FF00" strokeWidth="1.5" />
              <text x="432" y="134" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Supabase DB</text>
              <text x="432" y="147" fill="#888" fontSize="7" fontFamily="monospace" textAnchor="middle">Relational Postgres</text>
            </motion.g>
          </g>
        )}

        {tier === 'scale' && (
          <g>
            {/* Draw active lines */}
            <motion.path
              d="M 90 70 L 170 100"
              stroke="#00F5FF"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.path
              d="M 90 130 L 170 100"
              stroke="#00F5FF"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.path
              d="M 270 100 L 365 100"
              stroke="#00FF00"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              filter="url(#glow-heavy)"
            />
            <motion.path
              d="M 365 100 L 375 60"
              stroke="#00FF00"
              strokeWidth="1.5"
            />
            <motion.path
              d="M 365 100 L 375 140"
              stroke="#00FF00"
              strokeWidth="1.5"
            />

            {/* Nodes */}
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <rect x="10" y="45" width="85" height="42" rx="8" fill="#141416" stroke="#333" strokeWidth="1" />
              <text x="52" y="66" fill="#aaa" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">NextJS App</text>
              <text x="52" y="77" fill="#666" fontSize="7" fontFamily="monospace" textAnchor="middle">Web Client</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <rect x="10" y="112" width="85" height="42" rx="8" fill="#141416" stroke="#333" strokeWidth="1" />
              <text x="52" y="133" fill="#aaa" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">React Native</text>
              <text x="52" y="144" fill="#666" fontSize="7" fontFamily="monospace" textAnchor="middle">Mobile Client</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <rect x="160" y="70" width="110" height="60" rx="10" fill="#141416" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="215" y="98" fill="white" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Cloudflare WAF</text>
              <text x="215" y="114" fill="#888" fontSize="8" fontFamily="monospace" textAnchor="middle">Secured Shield</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <rect x="365" y="25" width="115" height="46" rx="8" fill="#141416" stroke="#00FF00" strokeWidth="1.5" />
              <text x="422" y="47" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">API Server</text>
              <text x="422" y="58" fill="#888" fontSize="7" fontFamily="monospace" textAnchor="middle">Scale Cluster</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <rect x="365" y="125" width="115" height="46" rx="8" fill="#141416" stroke="#00FF00" strokeWidth="1.5" />
              <text x="422" y="147" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">DB + Redis</text>
              <text x="422" y="158" fill="#888" fontSize="7" fontFamily="monospace" textAnchor="middle">Failover Cluster</text>
            </motion.g>
          </g>
        )}

        {tier === 'enterprise' && (
          <g>
            {/* Draw active lines */}
            <motion.path
              d="M 80 100 L 155 100"
              stroke="#FF007A"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              filter="url(#glow-heavy)"
            />
            <motion.path
              d="M 255 100 L 330 100"
              stroke="#00F5FF"
              strokeWidth="2.5"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              filter="url(#glow-heavy)"
            />
            <motion.path
              d="M 330 100 L 400 55"
              stroke="#9B59FF"
              strokeWidth="2"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
            <motion.path
              d="M 330 100 L 400 145"
              stroke="#00FF00"
              strokeWidth="2"
              strokeDasharray="6 3"
              animate={{ strokeDashoffset: [0, -18] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />

            {/* Nodes */}
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <rect x="5" y="70" width="85" height="60" rx="10" fill="#141416" stroke="#FF007A" strokeWidth="1.5" />
              <text x="47" y="98" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Anycast DNS</text>
              <text x="47" y="114" fill="#888" fontSize="7" fontFamily="monospace" textAnchor="middle">Global edge</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <rect x="150" y="70" width="105" height="60" rx="10" fill="#141416" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="202" y="98" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Dynamic ALB</text>
              <text x="202" y="114" fill="#888" fontSize="7" fontFamily="monospace" textAnchor="middle">Security load</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <rect x="385" y="25" width="110" height="50" rx="8" fill="#141416" stroke="#9B59FF" strokeWidth="1.5" />
              <text x="440" y="49" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Kubernetes Pod</text>
              <text x="440" y="62" fill="#888" fontSize="7" fontFamily="monospace" textAnchor="middle">Dedicated Node</text>
            </motion.g>

            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.25 }}>
              <rect x="385" y="120" width="110" height="50" rx="8" fill="#141416" stroke="#00FF00" strokeWidth="1.5" />
              <text x="440" y="144" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Distributed DB</text>
              <text x="440" y="157" fill="#888" fontSize="7" fontFamily="monospace" textAnchor="middle">Multi-Region RAID</text>
            </motion.g>
          </g>
        )}
      </svg>
    </div>
  );
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);
  const containerRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [scaleValue, setScaleValue] = useState(40);

  // Removed mouse tracking state to prevent full-component re-renders on every mouse move, which causes severe lag.

  useEffect(() => {
    // Instantly reset scroll to top to prevent transition lag under smooth scroll
    window.scrollTo(0, 0);
    try {
      const lenis = getScroll();
      if (lenis) lenis.scrollTo(0, { immediate: true });
    } catch (e) {
      // fallback
    }
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Service Not Found</h1>
          <button onClick={() => navigate('/')} className="text-[#00F5FF] hover:underline font-mono">Back to Home</button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Globe;

  const getRecommendation = (val) => {
    if (val < 25) return { tier: "starter", name: "Starter", desc: "Minimalist landing framework or rapid MVP build optimized for edge loading speeds." };
    if (val < 60) return { tier: "growth", name: "Growth", desc: "Dynamic multi-tier platform optimized for conversions, live serverless operations, and search presence." };
    if (val < 85) return { tier: "scale", name: "Scale", desc: "Production-ready enterprise system with multi-client synchronization, automated security, and advanced vectors." };
    return { tier: "enterprise", name: "Enterprise", desc: "Highly redundant squad architecture built on container clusters with high-availability failover and continuous SLA." };
  };

  const currentRec = getRecommendation(scaleValue);
  const comparisonData = getServiceComparison(service.slug);

  const getWhatsAppLink = (rec) => {
    const priceFeature = comparisonData.features.find(f => f.name.toLowerCase().includes("pricing") || f.name.toLowerCase().includes("price"));
    const selectedPrice = priceFeature ? priceFeature[rec.tier] : "Custom";

    const timelineFeature = comparisonData.features.find(f => f.name.toLowerCase().includes("timeline"));
    const selectedTimeline = timelineFeature ? timelineFeature[rec.tier] : "Flexible";

    const message = `Hey Nexora! 🚀\n\nI am extremely interested in your *${rec.name}* tier for *${service.title}*!\n\n📋 *Selected Package Specifications:*\n- *Service:* ${service.title}\n- *Package:* ${rec.name} Node\n- *Investment:* ${selectedPrice}\n- *Delivery Timeline:* ${selectedTimeline}\n\nLet's construct an elite product architecture together! ✨`;
    
    return `https://wa.me/917383303388?text=${encodeURIComponent(message)}`;
  };

  const getEmailLink = (rec) => {
    const priceFeature = comparisonData.features.find(f => f.name.toLowerCase().includes("pricing") || f.name.toLowerCase().includes("price"));
    const selectedPrice = priceFeature ? priceFeature[rec.tier] : "Custom";

    const timelineFeature = comparisonData.features.find(f => f.name.toLowerCase().includes("timeline"));
    const selectedTimeline = timelineFeature ? timelineFeature[rec.tier] : "Flexible";

    const subject = `Elite Collaboration: ${service.title} - ${rec.name} Node`;
    const body = `Hey Nexora Team! 🚀\n\nI am looking to deploy and scale a premium ${service.title} project using the ${rec.name} architecture!\n\n📋 Selected Package Specifications:\n- Service: ${service.title}\n- Architecture Node: ${rec.name} Node\n- Estimated Investment: ${selectedPrice}\n- Timeline: ${selectedTimeline}\n\nLet's connect and discuss the roadmap to build something epic together!\n\nBest regards,\n[Your Name]`;
    
    return `https://mail.google.com/mail/?view=cm&fs=1&to=nexoraa.works@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };



  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden"
    >
      {/* Static Radial Gradient Background (Optimized) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%)`
        }}
      />

      {/* Floating Animated Background Orbs (Optimized for Performance) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(0,0,0,0) 70%)' }}
        />
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(155,89,255,0.15) 0%, rgba(0,0,0,0) 70%)' }}
        />
      </div>

      {/* Grid Lines Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none z-0" />

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 text-white">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/#services')}
          className="flex items-center gap-2 hover:opacity-70 transition-all font-mono text-sm uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Content Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-start">

            {/* Top Icon Area */}
            <div className="flex items-center w-full mb-8">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl border border-white/5 bg-[#111] z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Icon size={22} className="text-white" />
              </div>
              <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-grow max-w-[200px]" />
            </div>

            {/* Huge Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-[1.05] mb-10 text-white">
              {service.title}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 mb-12">
              <div className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-mono text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-default">
                <Clock size={14} className="group-hover:text-accent-primary transition-colors" />
                <span>7-Day Delivery</span>
              </div>
              <div className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-mono text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-default">
                <Shield size={14} className="group-hover:text-accent-purple transition-colors" />
                <span>Fixed Pricing</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-16 max-w-3xl border-l-2 border-[#00F5FF]/30 pl-6">
              {service.details}
            </p>

            {/* What's Included */}
            <div className="w-full relative">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-gradient-to-r from-[#00F5FF] to-transparent w-12" />
                <h2 className="text-2xl font-bold font-display tracking-wide uppercase">What's Included</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-[#161616] relative overflow-hidden cursor-default transition-colors duration-300 hover:border-white/20 hover:bg-[#1a1a1a]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/0 via-[#00F5FF]/5 to-[#00F5FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="flex-shrink-0 relative z-10 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all duration-300">
                      <CheckCircle2 size={14} className="text-gray-500 group-hover:text-[#00F5FF] transition-colors duration-300" />
                    </div>
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300 relative z-10">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar Area (4 cols) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 flex flex-col gap-6">

              {/* Main Pricing Card */}
              <div className="group relative p-8 rounded-[2rem] border border-white/10 bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 hover:border-white/20">
                {/* Glowing orb behind card */}
                <div
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, rgba(0,0,0,0) 70%)' }}
                />

                <div className="relative z-10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-[#00F5FF] uppercase mb-4 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#00F5FF] rounded-full" />
                    <ScrambleText text="INVESTMENT" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-8 group-hover:-translate-y-1 transition-transform duration-500">
                    <span className="text-6xl font-black font-display tracking-tighter">{service.price}</span>
                    <span className="text-sm font-mono text-gray-500">/project</span>
                  </div>

                  <div className="flex flex-col gap-3 mb-8">
                    {!showOptions ? (
                      <button
                        onClick={() => setShowOptions(true)}
                        className="relative w-full py-4 bg-[#00F5FF] text-black font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Secure Booking
                          <Rocket size={16} />
                        </span>
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:animate-[shimmer_1.5s_infinite]" />
                      </button>
                    ) : (
                      <div className="flex flex-col gap-3 w-full">
                        <a
                          href={`https://wa.me/917383303388?text=${encodeURIComponent(`Hey Nexora!  I am looking to build and scale a premium project, and would love to collaborate on your elite ${service.title} solutions. Let's build something epic together!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full py-4 bg-[#00F5FF] text-black font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            Book via WhatsApp
                          </span>
                        </a>
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=nexoraa.works@gmail.com&su=${encodeURIComponent(`Elite Collaboration: ${service.title} Project`)}&body=${encodeURIComponent(`Hey Nexora Team! 🚀\n\nI am looking to build and scale a premium digital solution and would love to collaborate on your elite ${service.title} services.\n\nLet's connect and discuss the roadmap to build something epic together!\n\nBest regards,\n[Your Name]`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full py-4 bg-transparent overflow-hidden rounded-xl border border-white/10 text-white font-semibold flex items-center justify-center hover:border-white/30 transition-all text-center cursor-pointer"
                        >
                          <span className="relative z-10">Book via Email</span>
                        </a>
                        <button
                          onClick={() => setShowOptions(false)}
                          className="text-xs text-gray-500 hover:text-white transition-colors text-center mt-1"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => setShowCompare(true)}
                      className="relative w-full py-4 bg-transparent overflow-hidden rounded-xl border border-white/10 group/btn transition-all hover:border-white/30 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative z-10 text-white font-semibold group-hover/btn:text-[#00F5FF] transition-colors">Compare Packages</span>
                    </button>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                  <div className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase mb-4">
                    <ScrambleText text="BUILT WITH" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg border border-white/10 bg-black/50 text-xs font-mono text-gray-300 hover:text-white hover:border-[#00F5FF]/50 transition-colors duration-300 cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="p-6 rounded-[1.5rem] border border-white/10 bg-[#111] relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF00]/0 via-[#00FF00]/5 to-[#00FF00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-white font-bold uppercase mb-3">
                    <ScrambleText text="STATUS" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00FF00] animate-ping opacity-50" />
                      <div className="relative w-2 h-2 rounded-full bg-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.8)]" />
                    </div>
                    <span className="text-xs font-mono text-gray-300 tracking-wide">Accepting new projects</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Immersive Comparison Modal */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-6xl bg-[#070708] border border-white/5 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_rgba(0,245,255,0.12)] max-h-[95vh] md:max-h-[90vh] flex flex-col z-10 overflow-y-auto md:overflow-hidden"
            >
              {/* Decorative Accent Lights */}
              <div className="absolute -top-[10%] -left-[10%] w-[300px] h-[300px] rounded-full bg-[#00F5FF]/10 blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-[10%] -right-[10%] w-[300px] h-[300px] rounded-full bg-[#9B59FF]/10 blur-[80px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowCompare(false)}
                className="absolute top-6 right-6 p-2.5 rounded-full border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-all cursor-pointer z-50 bg-[#121214]"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="mb-6 relative z-10">
                <span className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-[0.25em] block mb-2">System Console</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-3">
                  {service.title} Architect Hub
                </h3>
                <p className="text-xs text-gray-400 mt-1">Select a core tier in the dashboard panel to view live infrastructure configurations and detailed spec blueprints.</p>
              </div>

              {/* Configurator Container Grid */}
              {(() => {
                return (

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 overflow-y-auto md:overflow-hidden h-full md:pb-4">
                    
                    {/* Left Column: Selector + Live SVG Blueprint (Col Span 5) */}
                    <div className="md:col-span-5 flex flex-col gap-4 justify-between h-full">
                      
                      {/* Interactive Custom Tactile Control Nodes */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3.5">
                          <span className="text-[10px] font-mono tracking-wider text-gray-400">SELECT INFRASTRUCTURE NODE</span>
                          <span className="text-[9px] font-mono text-[#00F5FF] uppercase tracking-widest bg-[#00F5FF]/10 px-2 py-0.5 rounded border border-[#00F5FF]/20 select-none animate-pulse">RECOMMENDED</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "starter", val: 10, label: "STARTER", code: "01", glow: "#00F5FF", bg: "rgba(0, 245, 255, 0.03)", border: "rgba(0, 245, 255, 0.15)" },
                            { id: "growth", val: 40, label: "GROWTH", code: "02", glow: "#9B59FF", bg: "rgba(155, 89, 255, 0.03)", border: "rgba(155, 89, 255, 0.15)" },
                            { id: "scale", val: 75, label: "SCALE", code: "03", glow: "#00FF00", bg: "rgba(0, 255, 0, 0.03)", border: "rgba(0, 255, 0, 0.15)" },
                            { id: "enterprise", val: 95, label: "ENTERPRISE", code: "04", glow: "#FF007A", bg: "rgba(255, 0, 122, 0.03)", border: "rgba(255, 0, 122, 0.15)" }
                          ].map((node) => {
                            const isActive = currentRec.tier === node.id;
                            return (
                              <button
                                key={node.id}
                                onClick={() => setScaleValue(node.val)}
                                className={`relative py-3 px-3 rounded-xl border transition-all duration-300 flex flex-col items-start justify-center cursor-pointer text-left ${isActive ? 'bg-white/[0.04]' : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]'}`}
                                style={{ borderColor: isActive ? node.glow : '' }}
                              >
                                {isActive && (
                                  <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]" />
                                )}
                                
                                <span className={`text-[8px] font-mono tracking-widest ${isActive ? 'text-white' : 'text-gray-500'} mb-1`}>
                                  SYS_NODE [{node.code}]
                                </span>
                                <span className={`text-xs font-bold font-display uppercase tracking-wider ${isActive ? '' : 'text-gray-400 group-hover:text-gray-200'}`} style={{ color: isActive ? node.glow : '' }}>
                                  {node.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Live Topology View */}
                      <ArchitectureBlueprint tier={currentRec.tier} />

                      {/* Dynamic Detail Card */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-full min-h-[90px]">
                        <div>
                          <div className="text-[8px] font-mono tracking-widest text-gray-500 uppercase mb-1">RECOMMENDATION LOGS</div>
                          <h4 className="text-xs font-bold text-white mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentRec.tier === 'starter' ? '#00F5FF' : currentRec.tier === 'growth' ? '#9B59FF' : currentRec.tier === 'scale' ? '#00FF00' : '#FF007A' }} />
                            Matched Tier: {currentRec.name}
                          </h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-sans mb-3">{currentRec.desc}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mt-1">
                            <a
                              href={getWhatsAppLink(currentRec)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2.5 px-2 rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1"
                              style={{
                                backgroundColor: currentRec.tier === 'starter' ? '#00F5FF' : currentRec.tier === 'growth' ? '#9B59FF' : currentRec.tier === 'scale' ? '#00FF00' : '#FF007A',
                                color: currentRec.tier === 'starter' || currentRec.tier === 'scale' ? '#000000' : '#ffffff',
                                boxShadow: `0 4px 15px ${currentRec.tier === 'starter' ? 'rgba(0,245,255,0.12)' : currentRec.tier === 'growth' ? 'rgba(155,89,255,0.12)' : currentRec.tier === 'scale' ? 'rgba(0,255,0,0.12)' : 'rgba(255,0,122,0.12)'}`
                              }}
                            >
                              WHATSAPP
                            </a>
                            <a
                              href={getEmailLink(currentRec)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2.5 px-2 rounded-xl text-[9px] font-mono font-semibold uppercase tracking-wider text-center cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-transparent border border-white/10 hover:border-white/20 text-white flex items-center justify-center gap-1"
                            >
                              EMAIL
                            </a>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column: High-Fidelity Specs Comparison Matrix (Col Span 7) */}
                    <div className="md:col-span-7 flex flex-col h-full bg-[#09090A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
                      
                      {/* Absolute Grid Spotlight */}
                      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/[0.01] rounded-full blur-[40px] pointer-events-none" />

                      <div className="overflow-x-auto w-full h-full md:overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                          <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                              <th className="p-4 text-[9px] font-mono uppercase tracking-wider text-gray-400 w-1/3">SPECIFICATIONS</th>
                              
                              {/* Headers of selected node and all matching cards */}
                              {["starter", "growth", "scale", "enterprise"].map((t) => {
                                const isMatched = currentRec.tier === t;
                                const tierColor = t === 'starter' ? '#00F5FF' : t === 'growth' ? '#9B59FF' : t === 'scale' ? '#00FF00' : '#FF007A';
                                return (
                                  <th
                                    key={t}
                                    className={`p-4 text-center text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${isMatched ? "font-bold" : "text-gray-500 opacity-40"}`}
                                    style={{ color: isMatched ? tierColor : '' }}
                                  >
                                    <div className="flex flex-col items-center gap-0.5">
                                      <span>{t}</span>
                                      {isMatched && (
                                        <span className="text-[7px] px-1.5 py-0.5 rounded-full font-sans font-normal tracking-wide capitalize animate-pulse" style={{ backgroundColor: `${tierColor}15`, color: tierColor }}>
                                          Active
                                        </span>
                                      )}
                                    </div>
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {comparisonData.features.map((feature, idx) => (
                              <tr key={idx} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                                <td className="p-4 text-[11px] font-semibold text-gray-300 font-mono tracking-wide">{feature.name}</td>
                                
                                {["starter", "growth", "scale", "enterprise"].map((t) => {
                                  const isMatched = currentRec.tier === t;
                                  const val = feature[t];
                                  const tierColor = t === 'starter' ? '#00F5FF' : t === 'growth' ? '#9B59FF' : t === 'scale' ? '#00FF00' : '#FF007A';
                                  return (
                                    <td
                                      key={t}
                                      className={`p-4 text-center text-[10px] transition-all duration-300 font-mono ${isMatched ? "bg-white/[0.01] font-semibold" : "text-gray-500 opacity-30"}`}
                                      style={{ color: isMatched ? '#ffffff' : '' }}
                                    >
                                      {typeof val === "boolean" ? (
                                        val ? (
                                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/10 text-green-400 mx-auto border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                                            <Check size={11} className="stroke-[3]" />
                                          </div>
                                        ) : (
                                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 text-gray-500 mx-auto border border-white/5">
                                            <X size={11} />
                                          </div>
                                        )
                                      ) : (
                                        <span className={isMatched ? "" : "text-gray-400"}>{val}</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}

                            {/* Custom CTA Matrix Row */}
                            <tr className="bg-white/[0.01]">
                              <td className="p-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest">DEPLOY NODE</td>
                              
                              {/* Starter CTA */}
                              <td className={`p-3 text-center transition-all duration-300 ${currentRec.tier === "starter" ? "bg-white/[0.01]" : "opacity-30"}`}>
                                <a
                                  href={`https://wa.me/917383303388?text=${encodeURIComponent(`Hey Nexora! I am looking to book your Starter ${service.title} package. Let's construct a roadmap together!`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block py-1.5 px-3 rounded-lg text-[9px] font-bold bg-[#00F5FF] text-black hover:scale-[1.03] active:scale-[0.98] transition-all uppercase tracking-wider text-center"
                                >
                                  Deploy
                                </a>
                              </td>

                              {/* Growth CTA */}
                              <td className={`p-3 text-center transition-all duration-300 ${currentRec.tier === "growth" ? "bg-white/[0.01]" : "opacity-30"}`}>
                                <a
                                  href={`https://wa.me/917383303388?text=${encodeURIComponent(`Hey Nexora! I am looking to book your Growth ${service.title} package. Let's construct a roadmap together!`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block py-1.5 px-3 rounded-lg text-[9px] font-bold bg-[#9B59FF] text-white hover:scale-[1.03] active:scale-[0.98] transition-all uppercase tracking-wider text-center"
                                >
                                  Deploy
                                </a>
                              </td>

                              {/* Scale CTA */}
                              <td className={`p-3 text-center transition-all duration-300 ${currentRec.tier === "scale" ? "bg-white/[0.01]" : "opacity-30"}`}>
                                <a
                                  href={`https://wa.me/917383303388?text=${encodeURIComponent(`Hey Nexora! I am looking to book your Scale ${service.title} package. Let's construct a roadmap together!`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block py-1.5 px-3 rounded-lg text-[9px] font-bold bg-[#00FF00] text-black hover:scale-[1.03] active:scale-[0.98] transition-all uppercase tracking-wider text-center"
                                >
                                  Deploy
                                </a>
                              </td>

                              {/* Enterprise CTA */}
                              <td className={`p-3 text-center transition-all duration-300 ${currentRec.tier === "enterprise" ? "bg-white/[0.01]" : "opacity-30"}`}>
                                <a
                                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=nexoraa.works@gmail.com&su=${encodeURIComponent(`Enterprise Custom Consultation: ${service.title}`)}&body=${encodeURIComponent(`Hey Nexora Team! 🚀\n\nI am looking for a customized Enterprise plan for our ${service.title} project. Let's setup a consultation.\n\nBest regards,\n[Your Name]`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block py-1.5 px-3 rounded-lg text-[9px] font-bold bg-[#FF007A] text-white hover:scale-[1.03] active:scale-[0.98] transition-all uppercase tracking-wider text-center shadow-[0_0_15px_rgba(255,0,122,0.3)]"
                                >
                                  Inquire
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                );
              })()}

              {/* Close Bottom Footer */}
              <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-auto relative z-10 pt-4 border-t border-white/5">
                <button
                  onClick={() => setShowCompare(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/5 hover:border-white/20 text-gray-300 hover:text-white text-xs font-mono cursor-pointer transition-colors text-center"
                >
                  EXIT_CONSOLE
                </button>
                
                <div className="flex items-center gap-2.5">
                  <a
                    href={getEmailLink(currentRec)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-center cursor-pointer transition-all duration-300 border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-white hover:scale-[1.02] active:scale-[0.98]"
                  >
                    DEPLOY via EMAIL
                  </a>
                  
                  <a
                    href={getWhatsAppLink(currentRec)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-center cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      backgroundColor: currentRec.tier === 'starter' ? '#00F5FF' : currentRec.tier === 'growth' ? '#9B59FF' : currentRec.tier === 'scale' ? '#00FF00' : '#FF007A',
                      color: currentRec.tier === 'starter' || currentRec.tier === 'scale' ? '#000000' : '#ffffff',
                      boxShadow: `0 0 25px ${currentRec.tier === 'starter' ? 'rgba(0,245,255,0.25)' : currentRec.tier === 'growth' ? 'rgba(155,89,255,0.25)' : currentRec.tier === 'scale' ? 'rgba(0,255,0,0.25)' : 'rgba(255,0,122,0.25)'}`
                    }}
                  >
                    DEPLOY via WHATSAPP
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

