import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight, Minimize2, Maximize2, X } from 'lucide-react';

const faqs = [
  {
    id: "init",
    cmd: "nexora --info",
    output: "Nexora Studio is a premium digital agency specializing in high-performance web applications, striking UI/UX, and scalable architectures. We build for the future."
  },
  {
    id: "timeline",
    cmd: "nexora get-timeline --project='standard'",
    output: "Our standard sprint operates on a 7-day execution protocol. Complex enterprise applications may scale to 4-8 weeks depending on integration requirements."
  },
  {
    id: "tech",
    cmd: "nexora list --stack",
    output: "Frontend: React, Next.js, Framer Motion, Tailwind CSS\nBackend: Node.js, Python, PostgreSQL, Redis\nInfrastructure: AWS, Vercel, Cloudflare"
  },
  {
    id: "pricing",
    cmd: "cat pricing_model.md",
    output: "We operate on value-based pricing. Our base engagements start at $5,000 for standard applications. Enterprise solutions require custom scoping. Run 'nexora contact' to request a quote."
  },
  {
    id: "maintenance",
    cmd: "nexora status --maintenance",
    output: "Post-launch, we offer optional retainer packages for continuous optimization, security patching, and feature expansion. You own the code; we ensure it thrives."
  }
];

export default function TerminalFAQ() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'NEXORA OS v2.0.4 initialized.' },
    { type: 'system', text: 'Type a command or click an available query below to execute.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfTerminalRef = useRef(null);

  const scrollToBottom = () => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isTyping]);

  const executeCommand = async (faq) => {
    if (isTyping) return;
    setIsTyping(true);
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'cmd', text: faq.cmd }]);
    
    // Simulate thinking/processing
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Simulate typing output
    let currentOutput = "";
    setHistory(prev => [...prev, { type: 'output', text: "" }]);
    
    for (let i = 0; i < faq.output.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20)); // typing speed
      currentOutput += faq.output[i];
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { type: 'output', text: currentOutput };
        return newHistory;
      });
    }
    
    setIsTyping(false);
  };

  return (
    <section className="py-32 px-6 bg-[#070709] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,245,255,0.05),_transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            System <span className="text-accent-primary">Documentation</span>
          </h2>
          <p className="text-white/40">Query our knowledge base via the terminal interface.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
          
          {/* Query Selector (Left Panel) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 pl-2">Available Commands</h3>
            {faqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => executeCommand(faq)}
                disabled={isTyping}
                className="text-left px-5 py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-accent-primary/30 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="font-mono text-sm text-accent-primary mb-1 flex items-center gap-2">
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 absolute" />
                  <span className="group-hover:translate-x-2 transition-transform">&gt; {faq.cmd}</span>
                </div>
                <div className="text-xs text-white/40 truncate">{faq.output}</div>
              </button>
            ))}
          </div>

          {/* Terminal Window (Right Panel) */}
          <div className="w-full lg:w-2/3 h-full flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#0A0A0E]">
            {/* Terminal Header */}
            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex items-center gap-2 text-white/30 font-mono text-[10px] tracking-widest">
                <Terminal size={12} />
                <span>guest@nexora:~</span>
              </div>
              <div className="flex gap-2 text-white/20">
                <Minimize2 size={14} />
                <Maximize2 size={14} />
                <X size={14} />
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed custom-scrollbar">
              <AnimatePresence initial={false}>
                {history.map((entry, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    {entry.type === 'system' && (
                      <div className="text-white/40 italic"># {entry.text}</div>
                    )}
                    {entry.type === 'cmd' && (
                      <div className="flex gap-2 text-white/80">
                        <span className="text-accent-secondary">guest@nexora:~$</span>
                        <span className="text-white">{entry.text}</span>
                      </div>
                    )}
                    {entry.type === 'output' && (
                      <div className="text-accent-primary whitespace-pre-line mt-1">
                        {entry.text}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Active Prompt Line */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-accent-secondary">guest@nexora:~$</span>
                <span className="w-2 h-4 bg-white/50 animate-pulse" />
              </div>
              <div ref={endOfTerminalRef} />
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </section>
  );
}
