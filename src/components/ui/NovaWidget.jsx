import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, ChevronDown, Building2, Users, Mail } from 'lucide-react';

// Simple Markdown Bold Parser
const parseMarkdown = (text) => {
  if (!text) return '';
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts = text.split(boldRegex);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} className="font-semibold text-white">{part}</strong>;
    }
    return part;
  });
};

// Word-by-word Typewriter streaming animation component
const TypewriterText = ({ text, onComplete, onWordTyped }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const words = text.split(' ');
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => (prev ? prev + ' ' + words[index] : words[index]));
        index++;
        if (onWordTyped) onWordTyped();
      } else {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, 100);
        }
      }
    }, 40); // 40ms per word is highly natural

    return () => clearInterval(interval);
  }, [text, onComplete, onWordTyped]);

  return (
    <span>
      {parseMarkdown(displayedText)}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-3.5 ml-1 bg-accent-blue/80 animate-pulse rounded-sm align-middle" />
      )}
    </span>
  );
};

export default function NovaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [flowState, setFlowState] = useState(() => 
    sessionStorage.getItem('nova_chat_verified') === 'true' ? 'completed' : 'init'
  );
  const [userEmail, setUserEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');

  const quickRepliesData = [
    {
      title: 'About Nexora',
      desc: 'Our vision & agency details',
      icon: <Building2 className="w-3.5 h-3.5 text-accent-blue" />,
      text: '🏢 About Nexora'
    },
    {
      title: 'Meet the Team',
      desc: 'Our experts & engineers',
      icon: <Users className="w-3.5 h-3.5 text-accent-purple" />,
      text: '👥 Meet the Team'
    },
    {
      title: 'Our Services',
      desc: 'Premium design & dev solutions',
      icon: <Sparkles className="w-3.5 h-3.5 text-accent-blue" />,
      text: '🚀 Our Services'
    },
    {
      title: 'Contact Us',
      desc: "Let's collaborate on a project",
      icon: <Mail className="w-3.5 h-3.5 text-accent-purple" />,
      text: '📩 Contact Us'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const markMessageTyped = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isNew: false } : msg))
    );

    // If greeting finished typing, trigger email request!
    if (index === 0 && flowState === 'init') {
      setIsLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "To begin our chat, please enter your email address below:",
            isNew: true
          }
        ]);
        setFlowState('awaiting_email');
        setIsLoading(false);
      }, 500);
    }
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
            content: flowState === 'completed'
              ? "Hey! 👋 I'm Nova, your guide to Nexora Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]"
              : "Hey! 👋 I'm Nova, your guide to Nexora Studio. Great to have you here! What would you like to explore?",
            isNew: flowState === 'completed' ? false : true
          }
        ]);
      }, 500);
    }
  }, [isOpen]);

  const handleSend = async (textOverride) => {
    const text = textOverride || inputValue.trim();
    if (!text) return;

    if (flowState === 'awaiting_email') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        // Append user message and error prompt
        const nextMsgs = [...messages, { role: 'user', content: text }];
        setMessages(nextMsgs);
        setInputValue('');
        setIsLoading(true);
        setTimeout(() => {
          setMessages([...nextMsgs, {
            role: 'assistant',
            content: "That doesn't look like a valid email address. Please check and try again:",
            isNew: true
          }]);
          setIsLoading(false);
        }, 500);
        return;
      }

      // Valid email - send OTP
      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setUserEmail(text);

      try {
        const res = await fetch('/api/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'send', email: text })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.details || errData.error || 'Failed to send OTP');
        }

        const data = await res.json();
        setOtpToken(data.token);
        setFlowState('awaiting_otp');

        setMessages([...nextMsgs, {
          role: 'assistant',
          content: `I've sent a 6-digit verification code to **${text}**. Please enter it below:`,
          isNew: true
        }]);
      } catch (err) {
        console.error(err);
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: `We had trouble sending a verification code (${err.message}). Please check your email address and try again:`,
          isNew: true
        }]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (flowState === 'awaiting_otp') {
      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'verify',
            email: userEmail,
            otp: text,
            token: otpToken
          })
        });

        if (!res.ok) {
          throw new Error('Invalid OTP');
        }

        sessionStorage.setItem('nova_chat_verified', 'true');
        setFlowState('completed');
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: "Email verified successfully! Welcome to Nexora Studio. What would you like to explore? \n\n[OPTIONS]",
          isNew: true
        }]);
      } catch (err) {
        console.error(err);
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: "The verification code you entered is incorrect or expired. Please try again:",
          isNew: true
        }]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Intercept quick replies for instant premium responses
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes('about nexora') ||
      lowerText.includes('about founder') ||
      lowerText.includes('about company') ||
      lowerText.includes('about section') ||
      lowerText.includes('who is the founder') ||
      lowerText.includes('milan') ||
      text === '🏢 About Nexora'
    ) {
      const aboutResponse = `🏢 **About Nexora Studio**
Nexora Studio is a **Premium Digital Agency & Technology Innovator** specializing in engineering high-fidelity, high-performance web applications, custom software, and bespoke UI/UX designs. We operate as a remote-first, global team of elite architects and developers dedicated to turning ambitious product concepts into scalable, production-ready solutions.

👑 **Meet the Founder & CEO**
• **Milan Pandavadara** (Full Stack Architect & Visionary)
Milan leads Nexora with a builder-first philosophy, bridging the gap between advanced engineering and high-level product design. With years of hands-on experience in full-stack architecture, API integration, and cloud ecosystems, he ensures that every digital solution we deliver is optimized for scale, performance, and unmatched visual aesthetics.
• **LinkedIn**: https://www.linkedin.com/in/milan-pandavdara/
• **GitHub**: https://github.com/walterhydra

🚀 **Our Core Values & Strengths**
• **End-to-End Solutions**: We handle everything from discovery, architecture, and UI/UX design to backend engineering and cloud deployment.
• **High-Performance Code**: Every application is optimized for speed, reliability, and modern SEO best practices.
• **Innovative Design**: We build custom layouts with smooth animations and curated color palettes, refusing generic templates.

📞 **Contact Nexora**
• **Email**: nexoraa.works@gmail.com
• **Phone**: +91 7383303388

Would you like to learn more about **Meet the Team**, **Our Services**, or **Contact Us**? \n\n[OPTIONS]`;

      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setTimeout(() => {
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: aboutResponse,
          isNew: true
        }]);
        setIsLoading(false);
      }, 800);
      return;
    }

    if (lowerText.includes('meet the team') || text === '👥 Meet the Team') {
      const teamResponse = `We have an exceptional, remote-first team of experts led by our Founder & CEO, **Milan**.

**Core Team & Leadership:**
• **Milan Pandavadara** — Founder & CEO (Full Stack Architect)
• **Gaurav Thakur** — Technical Lead (Mobile & Backend Systems)
• **Alis Patel** — Full-Stack Architect (Node.js & DevOps)
• **Abhishek Jha** — Backend Developer (Java & Systems)
• **Stany Gregor** — Software Engineer (Web Systems)
• **Divyansh** — Software Engineer (Frontend Engineer)
• **Rajkumar Shah** — Software Engineer (Web Systems)
• **Riya Sharma** — Social Media Handler (Branding & Strategy)

Would you like to learn more about **About Nexora**, **Our Services**, or **Contact Us**? \n\n[OPTIONS]`;

      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setTimeout(() => {
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: teamResponse,
          isNew: true
        }]);
        setIsLoading(false);
      }, 800);
      return;
    }

    if (lowerText.includes('our services') || text === '🚀 Our Services') {
      const servicesResponse = `Nexora Studio offers premium end-to-end digital solutions tailored to elevate your business:

• **Web & Mobile App Development**: High-performance, responsive React/Next.js/Vite applications and robust mobile apps.
• **Brand & Design**: Stunning, cohesive brand identities and conversion-optimized UI/UX designs.
• **Automation & AI Integration**: Custom AI pipelines, chatbot integrations, and workflow automation.
• **DevOps & Cloud Systems**: Secure, scalable architecture set up on AWS, Vercel, and Supabase.
• **API & Platform Integrations**: Seamless connections with payment, CRM, and communication platforms.
• **Search Engine Optimization (SEO)**: Advanced SEO audit and implementation for visibility and performance.

Would you like to learn more about **About Nexora**, **Meet the Team**, or **Contact Us**? \n\n[OPTIONS]`;

      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setTimeout(() => {
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: servicesResponse,
          isNew: true
        }]);
        setIsLoading(false);
      }, 800);
      return;
    }

    if (lowerText.includes('contact') || text === '📩 Contact Us') {
      const contactResponse = `We'd love to collaborate on your next premium project! You can connect with us directly:

• 📩 **Email**: [nexoraa.works@gmail.com](mailto:nexoraa.works@gmail.com)
• 📞 **Phone**: [+91 7383303388](tel:+917383303388)
• 💼 **LinkedIn**: [Nexora Studio](https://www.linkedin.com/in/milan-pandavdara/)
• 💻 **GitHub**: [walterhydra](https://github.com/walterhydra)

Let us know what you are looking to build! \n\n[OPTIONS]`;

      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setTimeout(() => {
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: contactResponse,
          isNew: true
        }]);
        setIsLoading(false);
      }, 800);
      return;
    }

    // Normal chat handler (flowState === 'completed' or fallback)
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to Vercel Serverless Function
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        content: data.content[0].text,
        isNew: true
      }]);
    } catch (error) {
      console.error("Chat error:", error);

      // Fallback for local testing without API key
      const lowerText = text.toLowerCase();
      let fallbackResponse = "That's a great question! I don't have that info right now, but you can reach our team directly at nexoraa.works@gmail.com.";

      if (lowerText.match(/^(hi|hello|hey|how are you|hii)/i)) {
        fallbackResponse = "Hey! 👋 I'm Nova, your guide to Nexora Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]";
      } else if (lowerText.includes('about') || lowerText.includes('founder') || lowerText.includes('milan')) {
        fallbackResponse = `🏢 **About Nexora Studio**
Nexora Studio is a **Premium Digital Agency & Technology Innovator** specializing in engineering high-fidelity, high-performance web applications, custom software, and bespoke UI/UX designs. We operate as a remote-first, global team of elite architects and developers dedicated to turning ambitious product concepts into scalable, production-ready solutions.

👑 **Meet the Founder & CEO**
• **Milan Pandavadara** (Full Stack Architect & Visionary)
Milan leads Nexora with a builder-first philosophy, bridging the gap between advanced engineering and high-level product design. With years of hands-on experience in full-stack architecture, API integration, and cloud ecosystems, he ensures that every digital solution we deliver is optimized for scale, performance, and unmatched visual aesthetics.
• **LinkedIn**: https://www.linkedin.com/in/milan-pandavdara/
• **GitHub**: https://github.com/walterhydra

🚀 **Our Core Values & Strengths**
• **End-to-End Solutions**: We handle everything from discovery, architecture, and UI/UX design to backend engineering and cloud deployment.
• **High-Performance Code**: Every application is optimized for speed, reliability, and modern SEO best practices.
• **Innovative Design**: We build custom layouts with smooth animations and curated color palettes, refusing generic templates.

📞 **Contact Nexora**
• **Email**: nexoraa.works@gmail.com
• **Phone**: +91 7383303388

Would you like to learn more about **Meet the Team**, **Our Services**, or **Contact Us**? \n\n[OPTIONS]`;
      } else if (lowerText.includes('team')) {
        fallbackResponse = "We have a fantastic team led by our Founder & CEO, Milan. Want to know about anyone specific?";
      } else if (lowerText.includes('services')) {
        fallbackResponse = "We offer Web & App Development, Brand & Design, Automation & AI, DevOps, API Integrations, and SEO. What are you looking to build?";
      } else if (lowerText.includes('contact')) {
        fallbackResponse = "You can reach us at nexoraa.works@gmail.com or call +91 7383303388. Our team is ready to help!";
      }

      setTimeout(() => {
        setMessages([...newMessages, { role: 'assistant', content: fallbackResponse, isNew: true }]);
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

  const renderMessageContent = (msg, idx) => {
    const hasOptions = msg.content.includes('[OPTIONS]');
    const cleanContent = msg.content.replace('[OPTIONS]', '').trim();

    if (msg.role === 'assistant' && msg.isNew) {
      return (
        <div className="space-y-4">
          <p className="whitespace-pre-wrap leading-relaxed">
            <TypewriterText
              text={cleanContent}
              onComplete={() => markMessageTyped(idx)}
              onWordTyped={scrollToBottom}
            />
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4 animate-fade-in">
        <p className="whitespace-pre-wrap leading-relaxed">{parseMarkdown(cleanContent)}</p>
        {hasOptions && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-2 mt-4"
          >
            {quickRepliesData.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply.text)}
                className="flex flex-col items-start p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-accent-blue/30 shadow-sm hover:shadow-[0_4px_20px_rgba(91,164,230,0.1)] transition-all duration-300 group relative overflow-hidden text-left"
              >
                {/* Sweep light effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1 rounded-lg bg-white/[0.03] border border-white/5 group-hover:bg-accent-blue/15 group-hover:border-accent-blue/30 transition-all duration-300">
                    {reply.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-white group-hover:text-accent-blue transition-colors duration-300">
                    {reply.title}
                  </span>
                </div>
                <p className="text-[9px] leading-snug text-gray-400 font-light group-hover:text-gray-300 transition-colors">
                  {reply.desc}
                </p>
              </button>
            ))}
          </m.div>
        )}
      </div>
    );
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
            data-lenis-prevent="true"
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[400px] h-[600px] max-h-[calc(100vh-120px)] bg-[#0B1220]/85 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col z-[100] overflow-hidden"
          >
            {/* Ambient background glows */}
            <div className="absolute top-[20%] left-[-15%] w-[220px] h-[220px] rounded-full bg-accent-blue/10 blur-[80px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-[20%] right-[-15%] w-[220px] h-[220px] rounded-full bg-accent-purple/10 blur-[80px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

            {/* Header */}
            <div className="bg-white/[0.01] border-b border-white/[0.08] p-5 flex items-center justify-between backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
                    <img src="/team/milan-chat.png" alt="Milan" className="w-full h-full object-cover object-[50%_30%]" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[2.5px] border-[#0B1120] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-70"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    Nova <span className="text-[10px] bg-gradient-to-r from-accent-blue to-accent-purple text-transparent bg-clip-text px-2 py-0.5 rounded-full uppercase font-bold border border-white/10 shadow-[0_0_10px_rgba(0,245,255,0.1)]">AI</span>
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
            <div 
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-0"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-full`}
                >
                  <div className={`flex gap-3 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}>

                    <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-sm">
                      {msg.role === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <img src="/team/milan-chat.png" alt="Milan" className="w-full h-full object-cover object-[50%_30%]" />}
                    </div>

                    <div
                      className={`relative text-sm ${msg.role === 'user'
                          ? 'p-4 rounded-2xl shadow-[0_4px_16px_rgba(91,164,230,0.2)] bg-gradient-to-br from-accent-blue via-[#4f46e5] to-accent-purple border border-white/10 text-white rounded-br-sm'
                          : 'py-4 px-5 rounded-2xl rounded-bl-[4px] bg-[#0E1726]/40 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                        }`}
                    >
                      {msg.role !== 'user' && (
                        <>
                          {/* Dot Grid Background */}
                          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '10px 10px' }}></div>
                          {/* Top Glowing Edge */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent"></div>
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-accent-blue blur-[6px] opacity-80"></div>
                        </>
                      )}
                      <div className="relative z-10 text-gray-200 leading-relaxed font-light tracking-wide">
                        {renderMessageContent(msg, idx)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[88%] items-end">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-sm">
                      <img src="/team/milan-chat.png" alt="Milan" className="w-full h-full object-cover object-[50%_30%]" />
                    </div>
                    <div className="py-3 px-5 rounded-2xl rounded-bl-[4px] bg-[#0E1726]/40 backdrop-blur-xl border border-white/[0.08] flex items-center gap-2 h-[44px] relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                      {/* Dot Grid Background */}
                      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '10px 10px' }}></div>
                      {/* Top Glowing Edge */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-accent-blue blur-[4px] opacity-80"></div>

                      <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce relative z-10" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-bounce relative z-10" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce relative z-10" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-transparent border-t border-white/[0.06] backdrop-blur-md z-10">
              <div className="relative flex items-center bg-[#070b15]/90 border border-white/10 rounded-2xl p-1.5 shadow-inner focus-within:border-accent-blue/50 focus-within:ring-2 focus-within:ring-accent-blue/15 transition-all duration-300">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    flowState === 'awaiting_email'
                      ? "Enter your email address..."
                      : flowState === 'awaiting_otp'
                      ? "Enter 6-digit verification code..."
                      : "Ask Nova anything..."
                  }
                  className="w-full bg-transparent py-2.5 pl-4 pr-14 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1.5 w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-white shadow-[0_0_12px_rgba(91,164,230,0.3)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
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
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ delay: 1.5, duration: 0.5, type: 'spring', damping: 20 }}
              className="relative cursor-pointer group z-20"
              onClick={() => setIsOpen(true)}
            >
              {/* Animated gradient border wrapper */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animation: 'shimmer 3s linear infinite' }}></div>

              {/* Main card */}
              <div className="relative flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-[#0D1117] border border-white/[0.08] group-hover:border-transparent shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden">

                {/* Sweep highlight */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none"></div>

                {/* Avatar */}
                <div className="relative flex-shrink-0 w-10 h-10 z-10">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center border border-white/[0.08] overflow-hidden">
                    <img src="/team/milan-chat.png" alt="Milan" className="w-full h-full object-cover object-[50%_30%] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  {/* Online dot */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0D1117] rounded-full z-20">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col text-left relative z-10 mr-1">
                  <span className="text-[11px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple tracking-wide">Nova AI</span>
                  <span className="text-[13px] text-gray-300 group-hover:text-white transition-colors duration-300 font-normal mt-0.5">How can I help you today?</span>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.05] group-hover:bg-accent-blue/20 flex items-center justify-center ml-auto transition-all duration-300 z-10">
                  <svg className="w-3 h-3 text-gray-500 group-hover:text-accent-blue transition-colors duration-300 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
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
