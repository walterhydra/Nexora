import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, FileText, CreditCard, ShieldCheck, ChevronRight, BookOpen } from 'lucide-react';
import { docsData } from '../constants/docs';

// Icon Map for dynamic rendering
const IconMap = {
  MessageSquare: MessageSquare,
  FileText: FileText,
  CreditCard: CreditCard,
  ShieldCheck: ShieldCheck
};

export default function DocViewer() {
  const [activeDocId, setActiveDocId] = useState(docsData[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeDoc = docsData.find(doc => doc.id === activeDocId);

  // Quick custom parser for our markdown-like content
  const renderContent = (text) => {
    const lines = text.trim().split('\n');
    return lines.map((line, idx) => {
      line = line.trim();
      if (!line) return <br key={idx} />;
      
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold text-white mt-8 mb-4 tracking-tight">{line.replace('### ', '')}</h3>;
      }
      
      if (line.startsWith('- ')) {
        // Handle bolding within lists
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
    <div className="pt-24 min-h-screen bg-black text-gray-100 relative flex flex-col md:flex-row">
      
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent-blue/5 via-black to-black -z-10" />

      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-white/10 bg-white/[0.02] backdrop-blur-xl h-auto md:h-[calc(100vh-6rem)] md:sticky top-24 overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 text-white">
            <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-display font-bold">Protocol Docs</h2>
          </div>

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
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDocId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass p-10 md:p-14 rounded-[40px] border border-white/10 relative overflow-hidden"
            >
              {/* Decorative top gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-purple-500" />
              
              {/* Header */}
              <div className="mb-12 border-b border-white/10 pb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/5 mb-6 text-accent-blue">
                  {React.createElement(IconMap[activeDoc.icon], { size: 14 })}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{activeDoc.title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
                  {activeDoc.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium">
                  {activeDoc.subtitle}
                </p>
              </div>

              {/* Content Render */}
              <div className="prose prose-invert prose-lg max-w-none">
                {renderContent(activeDoc.content)}
              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
