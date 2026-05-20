import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, FileText, CreditCard, PenTool, 
  Code, CheckCircle, Rocket, FileImage, Globe, 
  UploadCloud, ArrowRight, ShieldCheck, HelpCircle,
  BookOpen, ChevronRight
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
    color: "text-blue-400"
  },
  {
    id: 2,
    title: "Quotation & Timeline",
    time: "Day 1-2",
    desc: "Custom proposal detailing the exact pricing, deliverable breakdown, and our 7-day execution timeline.",
    icon: FileText,
    color: "text-purple-400"
  },
  {
    id: 3,
    title: "Advance Payment",
    time: "Upon Approval",
    desc: "A 50% upfront payment is processed to confirm your project slot and initiate our development sprint.",
    icon: CreditCard,
    color: "text-green-400"
  },
  {
    id: 4,
    title: "Project Agreement",
    time: "Before Build",
    desc: "Signing of a formal digital contract covering the scope, milestones, and intellectual property terms.",
    icon: PenTool,
    color: "text-yellow-400"
  },
  {
    id: 5,
    title: "Active Development",
    time: "Day 2-6",
    desc: "We build your project. You get a live staging link to watch progress and regular updates from our team.",
    icon: Code,
    color: "text-cyan-400"
  },
  {
    id: 6,
    title: "Final Payment",
    time: "Day 7",
    desc: "Once you approve the final staging build, the remaining 50% payment is cleared before domain handover.",
    icon: CheckCircle,
    color: "text-emerald-400"
  },
  {
    id: 7,
    title: "Delivery & Launch",
    time: "Day 7",
    desc: "Project handover! You receive all source code, credentials, documentation, and post-launch support.",
    icon: Rocket,
    color: "text-pink-400"
  }
];

const prerequisites = [
  {
    title: "Brand Assets",
    desc: "High-resolution logos, brand guidelines, and specific color codes (if any).",
    icon: FileImage
  },
  {
    title: "Website Content",
    desc: "Text copy for pages (About, Services, etc.) and high-quality images.",
    icon: UploadCloud
  },
  {
    title: "Domain & Hosting",
    desc: "Access credentials to your domain registrar (e.g., GoDaddy, Namecheap).",
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
    a: "We accept UPI (for Indian clients), direct Bank Transfers, and international payments via Stripe, PayPal, or Wire Transfer."
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes! Every project comes with 30 days of free bug-fixing and technical support to ensure a smooth transition."
  }
];

export default function Onboarding() {
  const [activeDocId, setActiveDocId] = useState(docsData[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeDoc = docsData.find(doc => doc.id === activeDocId);

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
            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
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
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/10 via-black to-black -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <ShieldCheck className="text-accent-blue" size={14} />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Client Journey</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight">
            Our Onboarding <span className="text-accent-blue">Process</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Transparent, fast, and highly professional. Here is exactly what happens from our first "Hello" to your final launch.
          </p>
        </motion.div>

        {/* 7-Step Timeline */}
        <div className="mb-32 relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue/50 via-purple-500/50 to-transparent -translate-x-1/2 rounded-full hidden md:block" />
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-blue/50 via-purple-500/50 to-transparent md:hidden" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full glass border border-white/20 bg-black flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
                    <span className="font-display font-bold text-lg">{step.id}</span>
                  </div>

                  <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="glass p-8 rounded-3xl border border-white/10 hover:border-accent-blue/30 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${step.color}`}>
                          <Icon size={20} />
                        </div>
                        <span className="text-sm font-mono font-bold text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full">
                          {step.time}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interactive Documentation Viewer embedded in Onboarding */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Deep Dive into the Protocol</h3>
            <p className="text-gray-400">Explore the critical early stages of our process in detail.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 glass p-6 md:p-10 rounded-[40px] border border-white/10">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-1/3 flex-shrink-0">
              <nav className="space-y-2">
                {docsData.map((doc) => {
                  const Icon = IconMap[doc.icon];
                  const isActive = activeDocId === doc.id;

                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDocId(doc.id)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group
                        ${isActive 
                          ? 'bg-accent-blue/10 border border-accent-blue/30 shadow-[0_0_20px_rgba(0,245,255,0.1)]' 
                          : 'hover:bg-white/5 border border-transparent'
                        }
                      `}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-accent-blue text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                          {doc.title}
                        </h3>
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeIndicator" className="text-accent-blue">
                          <ChevronRight size={18} />
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
                  className="bg-black/40 p-8 md:p-10 rounded-3xl border border-white/5 h-full relative overflow-hidden"
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

        {/* Policies & Prerequisites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-[40px] border border-white/10"
          >
            <h3 className="text-3xl font-bold mb-2 text-white">What We Need From You</h3>
            <p className="text-gray-400 mb-8">To ensure a rapid turnaround, we require the following before development begins:</p>
            
            <div className="space-y-6">
              {prerequisites.map((req, i) => {
                const Icon = req.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-accent-blue">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">{req.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{req.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />
              <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                <PenTool className="text-purple-400" size={20} /> Revision Policy
              </h4>
              <p className="text-gray-400 leading-relaxed">
                We believe in getting it right. Every project includes <strong className="text-white">2 rounds of free revisions</strong> during the staging phase. Additional major structural changes after approval may incur extra charges.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-green-500/20 blur-3xl rounded-full" />
              <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                <CreditCard className="text-green-400" size={20} /> Payment Methods
              </h4>
              <p className="text-gray-400 leading-relaxed mb-4">
                We make transactions seamless and secure across the globe.
              </p>
              <ul className="space-y-2 text-sm font-medium text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> UPI / RTGS (Indian Clients)</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> Direct Bank Transfer</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400"/> Stripe / PayPal (International)</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <HelpCircle className="w-12 h-12 text-accent-blue mx-auto mb-4 opacity-50" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h3>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass p-6 md:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="text-lg font-bold text-white mb-3">{faq.q}</h4>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-20 rounded-[40px] border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-purple-500/10" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
              Ready to <span className="text-accent-blue">Launch?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Follow our proven process and get a world-class digital product that drives growth.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <MagneticButton className="bg-white text-black hover:bg-gray-200 px-8 py-4 font-bold text-lg rounded-full flex items-center gap-2">
                  Start Your Project <ArrowRight size={20} />
                </MagneticButton>
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <MagneticButton className="bg-[#25D366] text-white hover:bg-[#20bd5a] px-8 py-4 font-bold text-lg rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
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
