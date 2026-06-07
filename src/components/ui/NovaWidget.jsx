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
          <p className="whitespace-pre-wrap">{content.replace('[OPTIONS]', '')}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-primary-dark transition-colors duration-200"
              >
                {reply}
              </button>
            ))}
          </div>
        </>
      );
    }
    return <p className="whitespace-pre-wrap">{content}</p>;
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
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[380px] h-[550px] max-h-[calc(100vh-120px)] bg-primary-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary-dark rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-white font-medium flex items-center gap-2">
                    Nova <span className="text-[10px] bg-accent-blue/20 text-accent-blue px-2 py-0.5 rounded-full uppercase font-mono">AI</span>
                  </h3>
                  <p className="text-gray-400 text-xs">Usually replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-full`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      {msg.role === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <Bot className="w-4 h-4 text-accent-blue" />}
                    </div>

                    <div 
                      className={`p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-accent-blue text-primary-dark rounded-tr-sm' 
                          : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
                      }`}
                    >
                      {renderMessageContent(msg.content)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Bot className="w-4 h-4 text-accent-blue" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-accent-blue/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-accent-blue/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-accent-blue/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Nova anything..."
                  className="w-full bg-primary-dark border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue/50 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-accent-blue text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-blue/90 transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] text-gray-500 font-mono">Powered by Nexora AI</p>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-gradient-to-tr from-accent-blue to-accent-purple rounded-full shadow-[0_0_20px_rgba(0,255,200,0.3)] flex items-center justify-center z-[100] border border-white/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <m.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
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
            >
              <MessageCircle className="w-6 h-6 text-primary-dark fill-primary-dark" />
            </m.div>
          )}
        </AnimatePresence>
        
        {/* Unread indicator dot */}
        {!isOpen && messages.length === 0 && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-primary-dark rounded-full"></span>
        )}
      </m.button>
    </>
  );
}
