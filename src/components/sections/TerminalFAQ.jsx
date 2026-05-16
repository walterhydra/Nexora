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
    output: "We operate on value-based pricing. Our base engagements start at ₹2.5L+ for custom applications. Enterprise solutions require custom scoping. Run 'nexora contact' to request a quote."
  },
  {
    id: "maintenance",
    cmd: "nexora status --maintenance",
    output: "Post-launch, we offer optional retainer packages for continuous optimization, security patching, and feature expansion. You own the code; we ensure it thrives."
  }
];

export default function TerminalFAQ() {
  const [theme, setTheme] = useState('cyber'); // cyber, matrix, vaporwave
  const [history, setHistory] = useState([
    { type: 'system', text: 'NEXORA OS v2.0.4 initialized.' },
    { type: 'system', text: 'Click a command on the left or type your query manually.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [terminalFocused, setTerminalFocused] = useState(false);
  const [submittedCommands, setSubmittedCommands] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(null);

  // Simulated Telemetry Metrics
  const [latency, setLatency] = useState(12);
  const [cpuUsage, setCpuUsage] = useState(8);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Theme configuration details
  const themeColors = {
    cyber: {
      primary: '#00F5FF',
      secondary: '#9B59FF',
      bgGlow: 'rgba(0, 245, 255, 0.08)',
      textPrimary: 'text-[#00F5FF]',
      textSecondary: 'text-[#9B59FF]',
      borderGlow: 'border-[#00F5FF]/20',
      iconBg: 'bg-[#00F5FF]/10',
    },
    matrix: {
      primary: '#00FF00',
      secondary: '#39FF14',
      bgGlow: 'rgba(0, 255, 0, 0.08)',
      textPrimary: 'text-[#00FF00]',
      textSecondary: 'text-[#39FF14]',
      borderGlow: 'border-[#00FF00]/20',
      iconBg: 'bg-[#00FF00]/10',
    },
    vaporwave: {
      primary: '#FF007A',
      secondary: '#00F5FF',
      bgGlow: 'rgba(255, 0, 122, 0.08)',
      textPrimary: 'text-[#FF007A]',
      textSecondary: 'text-[#00F5FF]',
      borderGlow: 'border-[#FF007A]/20',
      iconBg: 'bg-[#FF007A]/10',
    }
  };

  const activeColor = themeColors[theme];

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isTyping]);

  // Telemetry updates simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(8, Math.min(25, prev + change));
      });
      setCpuUsage(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1 to +1
        return Math.max(4, Math.min(15, prev + change));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = async (faq) => {
    if (isTyping) return;
    setIsTyping(true);
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'cmd', text: faq.cmd }]);
    
    // Simulate thinking/processing
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Simulate typing output
    let currentOutput = "";
    setHistory(prev => [...prev, { type: 'output', text: "" }]);
    
    for (let i = 0; i < faq.output.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10)); // typing speed
      currentOutput += faq.output[i];
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { type: 'output', text: currentOutput };
        return newHistory;
      });
    }
    
    setIsTyping(false);
  };

  const handleCommandSubmit = async (e) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;
    
    setInputValue('');
    if (isTyping) return;
    
    // Log submitted command in memory history
    setSubmittedCommands(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    // Add command to terminal history
    setHistory(prev => [...prev, { type: 'cmd', text: cmd }]);
    
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const parsedCmd = cmd.toLowerCase();
    let outputText = "";
    
    if (parsedCmd === 'help') {
      outputText = `Available protocols:\n  - help                   Get system commands\n  - nexora --info          General studio specifications\n  - nexora get-timeline    Project sprints and roadmap durations\n  - nexora list --stack    Frontend, backend, & database stack\n  - cat pricing_model.md   Investment starting structures\n  - nexora status          Post-launch optimization and maintenance retainer plans\n  - nexora contact         Initiate dynamic WhatsApp deploy protocol\n  - clear                  Purge terminal display history`;
    } else if (parsedCmd === 'clear') {
      setHistory([
        { type: 'system', text: 'NEXORA OS v2.0.4 initialized.' },
        { type: 'system', text: 'Type a command or click an available query below to execute.' }
      ]);
      setIsTyping(false);
      return;
    } else if (parsedCmd.includes('info')) {
      outputText = "Nexora Studio is a premium digital agency specializing in high-performance web applications, striking UI/UX, and scalable architectures. We build for the future.";
    } else if (parsedCmd.includes('timeline')) {
      outputText = "Our standard sprint operates on a 7-day execution protocol. Complex enterprise applications may scale to 4-8 weeks depending on integration requirements.";
    } else if (parsedCmd.includes('stack') || parsedCmd.includes('list')) {
      outputText = "Frontend: React, Next.js, Framer Motion, Tailwind CSS\nBackend: Node.js, Python, PostgreSQL, Redis\nInfrastructure: AWS, Vercel, Cloudflare";
    } else if (parsedCmd.includes('pricing') || parsedCmd.includes('cat')) {
      outputText = "We operate on value-based pricing. Our base engagements start at ₹2.5L+ for custom applications. Enterprise solutions require custom scoping. Run 'nexora contact' or use our home estimator above to get started.";
    } else if (parsedCmd.includes('status') || parsedCmd.includes('maintenance')) {
      outputText = "Post-launch, we offer optional retainer packages for continuous optimization, security patching, and feature expansion. You own the code; we ensure it thrives.";
    } else if (parsedCmd.includes('contact') || parsedCmd.includes('deploy')) {
      outputText = "Ready to build with Nexora? Run WhatsApp redirect protocol now: \nOpening secure line at: +91 73833 03388\nRedirecting in 3 seconds...";
      setTimeout(() => {
        window.open('https://wa.me/917383303388?text=Hey%20Nexora!%20%F0%9F%9A%80%20I%20am%20interested%20in%20deploying%20a%20project%20with%20you%20using%20the%20OS%20terminal!', '_blank');
      }, 3000);
    } else {
      outputText = `Command not found: "${cmd}". Type "help" to view available protocols, or click a shortcut command in the panel to the left.`;
    }
    
    // Simulate typing output
    let currentOutput = "";
    setHistory(prev => [...prev, { type: 'output', text: "" }]);
    
    for (let i = 0; i < outputText.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 6)); // typing speed
      currentOutput += outputText[i];
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { type: 'output', text: currentOutput };
        return newHistory;
      });
    }
    
    setIsTyping(false);
  };

  // Keyboard navigation for ArrowUp/ArrowDown history
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (submittedCommands.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < submittedCommands.length) {
        setHistoryIndex(nextIndex);
        setInputValue(submittedCommands[submittedCommands.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputValue(submittedCommands[submittedCommands.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  return (
    <section className="py-32 px-6 bg-[#070709] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,245,255,0.05),_transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            System <span className="transition-colors duration-500" style={{ color: activeColor.primary }}>Documentation</span>
          </h2>
          <p className="text-white/40">Query our knowledge base via the terminal interface.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[620px]">
          
          {/* Query Selector & Mission Control (Left Panel) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar select-none">
            
            {/* Host Dashboard Stats Card */}
            <div className="p-5 rounded-2xl bg-[#0A0A0E] border border-white/5 shadow-lg relative overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-20 h-20 blur-[30px] pointer-events-none transition-colors duration-500" 
                style={{ backgroundColor: activeColor.primary + '15' }} // low opacity glow
              />
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30 mb-3 flex items-center justify-between">
                <span>SYSTEM_TELEMETRY</span>
                <span className="flex items-center gap-1 text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  ONLINE
                </span>
              </h4>
              <div className="grid grid-cols-2 gap-3 font-mono text-[10px]">
                <div className="bg-white/[0.01] p-2.5 rounded-lg border border-white/5">
                  <span className="text-white/40 block mb-1">LATENCY</span>
                  <span className="text-white font-bold text-[11px]">{latency}ms</span>
                </div>
                <div className="bg-white/[0.01] p-2.5 rounded-lg border border-white/5">
                  <span className="text-white/40 block mb-1">HOST_NODE</span>
                  <span className="text-white font-bold text-[11px]">MUM-AP-S1</span>
                </div>
                <div className="bg-white/[0.01] p-2.5 rounded-lg border border-white/5">
                  <span className="text-white/40 block mb-1">OS_SHELL</span>
                  <span className="font-bold text-[11px] uppercase transition-colors duration-500" style={{ color: activeColor.primary }}>{theme}</span>
                </div>
                <div className="bg-white/[0.01] p-2.5 rounded-lg border border-white/5">
                  <span className="text-white/40 block mb-1">CPU_LOAD</span>
                  <span className="text-white font-bold text-[11px]">{cpuUsage}%</span>
                </div>
              </div>
            </div>

            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-2 pl-2">Available Commands</h3>
            {faqs.map((faq) => {
              const hovered = isHovered === faq.id;
              return (
                <button
                  key={faq.id}
                  onClick={() => executeCommand(faq)}
                  disabled={isTyping}
                  className="text-left px-5 py-4 rounded-xl bg-white/[0.02] border transition-all group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex flex-col justify-between h-[85px]"
                  style={{
                    borderColor: hovered ? activeColor.primary : 'rgba(255,255,255,0.05)',
                    backgroundColor: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)'
                  }}
                  onMouseEnter={() => setIsHovered(faq.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div 
                    className="font-mono text-sm mb-1 flex items-center gap-2 transition-all duration-300"
                    style={{ color: hovered ? activeColor.primary : '#ffffff' }}
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 absolute" />
                    <span className="group-hover:translate-x-2 transition-transform">&gt; {faq.cmd}</span>
                  </div>
                  <div className="text-[10px] text-white/40 truncate w-full">{faq.output}</div>
                </button>
              );
            })}
          </div>

          {/* Terminal Window (Right Panel) */}
          <div 
            className="w-full lg:w-2/3 h-full flex flex-col rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500 bg-[#0A0A0E]"
            style={{
              borderColor: activeColor.primary + '33', // 20% opacity hex
              boxShadow: `0 20px 50px rgba(0,0,0,0.65), 0 0 35px ${activeColor.bgGlow}`
            }}
          >
            {/* Terminal Header */}
            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              
              {/* Dynamic Theme Segmented Controller */}
              <div className="flex bg-white/5 rounded-full p-0.5 border border-white/10 text-[9px] font-mono select-none">
                {['CYBER', 'MATRIX', 'VAPOR'].map((t) => {
                  const active = (t === 'CYBER' && theme === 'cyber') || (t === 'MATRIX' && theme === 'matrix') || (t === 'VAPOR' && theme === 'vaporwave');
                  return (
                    <button
                      key={t}
                      onClick={() => setTheme(t === 'CYBER' ? 'cyber' : t === 'MATRIX' ? 'matrix' : 'vaporwave')}
                      className="px-2.5 py-0.5 rounded-full font-bold transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: active ? activeColor.primary : 'transparent',
                        color: active ? '#000000' : 'rgba(255,255,255,0.4)'
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 text-white/20">
                <Minimize2 size={14} />
                <Maximize2 size={14} />
                <X size={14} />
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalBodyRef}
              onClick={handleTerminalClick}
              className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed custom-scrollbar cursor-text"
            >
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
                        <span className="transition-colors duration-500" style={{ color: activeColor.secondary }}>guest@nexora:~$</span>
                        <span className="text-white">{entry.text}</span>
                      </div>
                    )}
                    {entry.type === 'output' && (
                      <div className="whitespace-pre-wrap mt-1 transition-colors duration-500" style={{ color: activeColor.primary }}>
                        {entry.text}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Active Prompt Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-2 relative z-10 w-full">
                <span className="transition-colors duration-500 shrink-0 select-none" style={{ color: activeColor.secondary }}>guest@nexora:~$</span>
                <div className="relative flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setTerminalFocused(true)}
                    onBlur={() => setTerminalFocused(false)}
                    disabled={isTyping}
                    className="bg-transparent text-white border-none outline-none focus:ring-0 p-0 m-0 w-full font-mono text-sm"
                    style={{ caretColor: activeColor.primary }}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  {!terminalFocused && inputValue.length === 0 && (
                    <span className="absolute left-0 w-2 h-4 bg-white/20 animate-pulse pointer-events-none" />
                  )}
                </div>
              </form>
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
