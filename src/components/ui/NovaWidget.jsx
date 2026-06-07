import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, ChevronDown } from 'lucide-react';

export default function NovaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    '🏢 About Nexora',
    '👥 Meet the Team',
    '🚀 Our Services',
    '📩 Contact Us'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: 'assistant',
            content: "Hey! 👋 I'm Nova, your guide to Nexora Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]"
          }
        ]);
      }, 500);
    }
  }, [isOpen]);

  const handleSend = async (textOverride) => {
    const text = textOverride || inputValue.trim();
    if (!text) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to Vercel Serverless Function
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Map messages for Anthropic, removing the [OPTIONS] placeholder from history
        body: JSON.stringify({ 
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content.replace('[OPTIONS]', '').trim()
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: data.content[0].text 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      
      // Fallback for local testing without API key
      const lowerText = text.toLowerCase();
      let fallbackResponse = "That's a great question! I don't have that info right now, but you can reach our team directly at nexoraa.works@gmail.com.";
      
      if (lowerText.match(/^(hi|hello|hey|how are you|hii)/i)) {
        fallbackResponse = "Hey! 👋 I'm Nova, your guide to Nexora Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]";
      } else if (lowerText.includes('about')) {
        fallbackResponse = "Nexora Studio is a Premium Digital Agency and Technology Innovator. We specialize in end-to-end development, stunning design, and high-performance web apps. Check out our About Page to learn more!";
      } else if (lowerText.includes('team')) {
        fallbackResponse = "We have a fantastic team led by our Founder & CEO, Milan. Want to know about anyone specific?";
      } else if (lowerText.includes('services')) {
        fallbackResponse = "We offer Web & App Development, Brand & Design, Automation & AI, DevOps, API Integrations, and SEO. What are you looking to build?";
      } else if (lowerText.includes('contact')) {
        fallbackResponse = "You can reach us at nexoraa.works@gmail.com or call +91 7383303388. Our team is ready to help!";
      }

      setTimeout(() => {
        setMessages([...newMessages, { role: 'assistant', content: fallbackResponse }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const renderMessageContent = (content) => {
    if (content.includes('[OPTIONS]')) {
      return (
        <>
          <p className="whitespace-pre-wrap leading-relaxed">{content.replace('[OPTIONS]', '')}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className="text-xs font-medium px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-accent-blue/40 hover:shadow-[0_0_15px_rgba(91,164,230,0.15)] transition-all duration-300"
              >
                {reply}
              </button>
            ))}
          </div>
        </>
      );
    }
    return <p className="whitespace-pre-wrap leading-relaxed">{content}</p>;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[400px] h-[600px] max-h-[calc(100vh-120px)] bg-[#0B1120]/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white/[0.02] border-b border-white/10 p-5 flex items-center justify-between backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
                    <img src="/logo/favicon.png" alt="Nova" className="w-full h-full object-contain scale-[1.35]" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[2.5px] border-[#0B1120] rounded-full">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-70"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    Nova <span className="text-[10px] bg-gradient-to-r from-accent-blue to-accent-purple text-transparent bg-clip-text px-2 py-0.5 rounded-full uppercase font-bold border border-white/10">AI</span>
                  </h3>
                  <p className="text-gray-400 text-xs font-medium">Usually replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none -z-10"></div>
              
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-full`}
                >
                  <div className={`flex gap-3 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                    
                    <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-sm">
                      {msg.role === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <img src="/logo/favicon.png" alt="Nova" className="w-full h-full object-contain scale-[1.35]" />}
                    </div>

                    <div 
                      className={`p-4 rounded-2xl text-sm shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-br from-accent-blue to-accent-purple text-white rounded-br-sm' 
                          : 'bg-white/5 backdrop-blur-md border border-white/10 text-gray-200 rounded-bl-sm'
                      }`}
                    >
                      {renderMessageContent(msg.content)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[88%] items-end">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-sm">
                      <img src="/logo/favicon.png" alt="Nova" className="w-full h-full object-contain scale-[1.35]" />
                    </div>
                    <div className="py-3 px-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-bl-sm flex items-center gap-1.5 h-[44px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/[0.02] border-t border-white/10 backdrop-blur-md z-10">
              <div className="relative flex items-center bg-[#0B1120] border border-white/10 rounded-2xl p-1.5 shadow-inner focus-within:border-accent-blue/40 focus-within:ring-1 focus-within:ring-accent-blue/40 transition-all duration-300">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full bg-transparent py-2.5 pl-4 pr-14 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1.5 w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <div className="text-center mt-3 mb-1">
                <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Powered by Nexora AI</p>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Toggle Area */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-3">
        {/* Floating Speech Bubble */}
        <AnimatePresence>
          {!isOpen && (
            <m.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 2, duration: 0.4, type: 'spring' }}
              className="relative bg-[#5BA4E6] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg cursor-pointer hover:bg-[#4a94d6] transition-colors max-w-[220px] text-center"
              onClick={() => setIsOpen(true)}
            >
              Hello! 👋<br/>How can I help you?
              {/* Pointer triangle */}
              <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#5BA4E6]"></div>
            </m.div>
          )}
        </AnimatePresence>

        {/* The Bot Button */}
        <m.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 bg-[#1A2533] rounded-full shadow-[0_0_20px_rgba(91,164,230,0.3)] flex items-center justify-center border border-white/10 overflow-visible relative group"
        >
          {/* AI Radar Ripple Effects */}
          {!isOpen && (
            <>
              {[0, 1, 2].map((i) => (
                <m.div
                  key={i}
                  animate={{ 
                    scale: [0.8, 1, 2.2], 
                    opacity: [0, 0.5, 0] 
                  }}
                  transition={{ 
                    duration: 3, 
                    times: [0, 0.1, 1],
                    repeat: Infinity, 
                    ease: "linear", 
                    delay: i * 1 
                  }}
                  className="absolute inset-0 rounded-full bg-accent-blue/20 border border-accent-blue/40 pointer-events-none z-[-1]"
                ></m.div>
              ))}
            </>
          )}

          {/* AI Energy Orb Backdrop */}
          {!isOpen && (
            <m.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-accent-blue/50 to-transparent blur-[8px] opacity-60 mix-blend-screen pointer-events-none"
            ></m.div>
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <m.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex items-center justify-center bg-accent-blue rounded-full z-10 relative"
              >
                <X className="w-6 h-6 text-primary-dark" />
              </m.div>
            ) : (
              <m.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center mt-1.5 z-10"
              >
                {/* Interactive Logo with float animation */}
                <m.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[85%] h-[85%] absolute group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                >
                  <img src="/logo/favicon.png" alt="Nova Chat" className="w-full h-full object-contain scale-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                </m.div>
              </m.div>
            )}
          </AnimatePresence>
          
          {/* Unread indicator dot */}
          {!isOpen && messages.length === 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-[#1A2533] rounded-full"></span>
          )}
        </m.button>
      </div>
    </>
  );
}
