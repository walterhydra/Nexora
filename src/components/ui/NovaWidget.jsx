import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, ChevronDown, Building2, Users, Mail, Zap, Coins, FileText, CreditCard, Lock, Award, Compass, Eye, EyeOff, Copy, Check, CheckCircle2, FolderLock, Undo2 } from 'lucide-react';

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

  const [flowState, setFlowState] = useState('completed');
  const [userEmail, setUserEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');

  // Tablet controls and volume state
  const [volume, setVolume] = useState(80);
  const [showVolumeHud, setShowVolumeHud] = useState(false);
  const volumeHudTimeoutRef = useRef(null);

  // Secure Document Vault state
  const [activeDocument, setActiveDocument] = useState(null); // 'client_agreement' | 'internship_offer' | 'card_details' | 'nda' | 'project_proposal' | null
  const [showDocsMenu, setShowDocsMenu] = useState(false); // Mobile drawer toggle
  const [revealedCvv, setRevealedCvv] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [ndaExecuted, setNdaExecuted] = useState(false);
  const [proposalApproved, setProposalApproved] = useState(false);

  // Synthesize soft click sounds using Web Audio API
  const playClickSound = (freq = 800, dur = 0.04) => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx || volume === 0) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime((volume / 100) * 0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + dur);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + dur);
    } catch (e) {
      // AudioContext could be blocked initially
    }
  };

  const handleVolumeChange = (delta) => {
    setVolume((prev) => {
      const nextVal = Math.min(100, Math.max(0, prev + delta));
      return nextVal;
    });
    playClickSound(delta > 0 ? 1000 : 600, 0.05);
    setShowVolumeHud(true);
    if (volumeHudTimeoutRef.current) {
      clearTimeout(volumeHudTimeoutRef.current);
    }
    volumeHudTimeoutRef.current = setTimeout(() => {
      setShowVolumeHud(false);
    }, 1500);
  };

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
      title: 'Our Process',
      desc: '7-day elite build sprints',
      icon: <Zap className="w-3.5 h-3.5 text-accent-blue" />,
      text: '⚡ Our Process'
    },
    {
      title: 'Pricing & Packages',
      desc: 'Flexible investment tiers',
      icon: <Coins className="w-3.5 h-3.5 text-accent-purple" />,
      text: '💰 Pricing & Packages'
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
            isNew: true
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

Do you want to know about other things? \n\n[OPTIONS]`;

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

Do you want to know about other things? \n\n[OPTIONS]`;

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

Do you want to know about other things? \n\n[OPTIONS]`;

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

    if (lowerText.includes('process') || text === '⚡ Our Process') {
      const processResponse = `⚡ **Our Elite Development Sprint Process**
We build and deploy premium digital products in structured, high-intensity sprints designed for speed and absolute quality:

• **Day 1: Architectural Blueprint**: We align on product specifications, complete the system mapping, and define database schemas.
• **Day 2-3: UI/UX Conception**: We craft high-fidelity, interactive Figma designs matching your brand aesthetic.
• **Day 4-5: Full-Stack Engineering**: Our developers write clean, modular, and optimized code (React, Next.js, Node.js).
• **Day 6: Refactoring & Audits**: We perform rigorous visual validation, speed optimizations, and security audits.
• **Day 7: Launch & Handover**: Your site is deployed live on secure production servers (Vercel, AWS) with full code handover.

Do you want to know about other things? \n\n[OPTIONS]`;

      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setTimeout(() => {
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: processResponse,
          isNew: true
        }]);
        setIsLoading(false);
      }, 800);
      return;
    }

    if (lowerText.includes('pricing') || lowerText.includes('package') || text === '💰 Pricing & Packages') {
      const pricingResponse = `💰 **Nexora Pricing & Packages**
We offer transparent, package-based pricing tailored to your project goals and scale:

• **Starter Package** (₹15,000 / $200)
Best for landing pages and simple business sites. Includes single-page design, responsive layout, contact form, and basic SEO. Delivered in 3 days.

• **Growth Package** (₹35,000 / $450)
Best for dynamic business websites. Includes multi-page React/Next.js build, interactive UI components, blog system, CMS setup, and full SEO audit. Delivered in 7 days.

• **Scale Package** (₹75,000+ / $950+)
Best for custom web platforms and e-commerce. Includes full-stack database architecture, user authentication, secure payment gateways, customized dashboards, and API integrations.

Do you want to know about other things? \n\n[OPTIONS]`;

      const nextMsgs = [...messages, { role: 'user', content: text }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setTimeout(() => {
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: pricingResponse,
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

Do you want to know about other things? \n\n[OPTIONS]`;

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
      playClickSound(850, 0.03);
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
              onWordTyped={() => {
                scrollToBottom();
                playClickSound(950, 0.015);
              }}
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
                onClick={() => {
                  playClickSound(800, 0.03);
                  handleSend(reply.text);
                }}
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

  const vaultDocuments = [
    { id: 'client_agreement', label: 'Client Agreement', icon: FileText, completed: isSigned },
    { id: 'internship_offer', label: 'Internship Offer', icon: Award, completed: offerAccepted },
    { id: 'card_details', label: 'Card Details', icon: CreditCard, completed: cardCopied },
    { id: 'nda', label: 'NDA Agreement', icon: Lock, completed: ndaExecuted },
    { id: 'project_proposal', label: 'Project Proposal', icon: Compass, completed: proposalApproved },
  ];

  const renderActiveDocument = () => {
    switch (activeDocument) {
      case 'client_agreement':
        return (
          <div className="flex flex-col h-full text-left relative z-10 min-h-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-blue" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Client Service Agreement</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${isSigned ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                {isSigned ? 'SIGNED & EXECUTED' : 'PENDING SIGNATURE'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-gray-300 text-xs leading-relaxed font-light scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">1. Scope of Engagement</p>
              <p>Nexora Studio agrees to design, develop, and deliver a high-performance digital product in accordance with the 7-Day Elite Sprint methodology. Project goals, database schemas, and visual requirements will be locked prior to sprint commencement.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">2. Fees & Investment</p>
              <p>The client agrees to invest the sum of ₹35,000 ($450 USD) for the Growth Package sprint. A 50% deposit is required before architecture mapping begins. Remaining balance is due upon successful handover.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">3. Intellectual Property</p>
              <p>Upon final payment receipt, all proprietary software source code, digital assets, Figma designs, and configurations will be fully transferred to the client with worldwide rights.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">4. Indemnity & Liability</p>
              <p>Nexora Studio warrants that all development work is original and does not violate third-party copyright laws. The maximum aggregate liability for any claim shall not exceed the fees paid under this agreement.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mt-4 shrink-0">
              {isSigned ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs font-semibold">Document Signed Electronically</span>
                  </div>
                  <div className="border-t border-white/5 pt-2.5 flex justify-between items-center text-[9px] text-gray-500 font-mono">
                    <span>SIGNATORY: {signatureName.toUpperCase()}</span>
                    <span>TIMESTAMP: {new Date().toLocaleDateString()} SECURE</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-[9px] uppercase tracking-wider font-semibold text-gray-400 text-left">Signatory Full Name</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      placeholder="Enter full name to sign..."
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue/50"
                    />
                    <button
                      onClick={() => {
                        if (!signatureName.trim()) return;
                        playClickSound(900, 0.08);
                        setIsSigned(true);
                      }}
                      disabled={!signatureName.trim()}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all cursor-pointer"
                    >
                      Sign Agreement
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2.5 pt-3 shrink-0">
              <button
                onClick={() => {
                  playClickSound(600, 0.04);
                  setActiveDocument(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" /> Back to Chat
              </button>
            </div>
          </div>
        );
      case 'internship_offer':
        return (
          <div className="flex flex-col h-full text-left relative z-10 min-h-0 overflow-hidden">
            {/* Custom Confetti Animation Elements */}
            {offerAccepted && (
              <div className="absolute inset-0 pointer-events-none z-50">
                {[...Array(20)].map((_, i) => (
                  <m.div
                    key={i}
                    initial={{ y: -10, x: Math.random() * 300 - 150, scale: Math.random() * 0.5 + 0.5, opacity: 1 }}
                    animate={{
                      y: 500,
                      x: Math.random() * 300 - 150,
                      rotate: 360,
                      opacity: 0
                    }}
                    transition={{
                      duration: Math.random() * 2 + 1.5,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                    className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#00F5FF', '#A020F0', '#10B981', '#F59E0B', '#EF4444'][i % 5]
                    }}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-blue" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Internship Offer Letter</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${offerAccepted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                {offerAccepted ? 'OFFER ACCEPTED' : 'PENDING RESPONSE'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-gray-300 text-xs leading-relaxed font-light scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="text-center font-bold text-white text-[10px] tracking-widest uppercase border-b border-white/5 pb-2 mb-2 font-mono">NEXORA STUDIO HR DEPT</div>
              <p>Dear Candidate,</p>
              <p>We are thrilled to offer you the position of **Full Stack Developer Intern** at Nexora Studio. During your time with us, you will work closely with Milan (Founder) and our engineering leaders to design and implement premium, high-performance web products.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">1. Stipend & Compensation</p>
              <p>You will receive a monthly stipend of ₹15,000 INR, paid during the first week of each consecutive month.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">2. Role & Duration</p>
              <p>This is a 3-month remote engagement, with the possibility of conversion to a full-time associate developer role based on outstanding performance and sprint delivery.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">3. Expected Outcomes</p>
              <p>• Engineering clean React & Next.js client components.<br />• Architecting APIs and managing databases (Postgres/Supabase).<br />• Performing speed audits and visual validation before deployment.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mt-4 shrink-0">
              {offerAccepted ? (
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold">Offer Accepted successfully!</span>
                    <span className="text-[9px] text-gray-500 font-mono mt-0.5">Welcome to the elite developer sprints.</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    playClickSound(1100, 0.15);
                    setTimeout(() => playClickSound(1400, 0.1), 80);
                    setOfferAccepted(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-0"
                >
                  Accept Offer & Commit Sprints
                </button>
              )}
            </div>

            <div className="flex gap-2.5 pt-3 shrink-0">
              <button
                onClick={() => {
                  playClickSound(600, 0.04);
                  setActiveDocument(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" /> Back to Chat
              </button>
            </div>
          </div>
        );
      case 'card_details':
        return (
          <div className="flex flex-col h-full text-left relative z-10 min-h-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent-blue" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Nexora Studio Billing Card</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono">
                SECURE CARD
              </span>
            </div>

            {/* 3D Glassmorphic Card Container with Flip Animation */}
            <div className="flex justify-center items-center py-6 shrink-0 z-20">
              <div className="w-full max-w-[320px] h-[180px] [perspective:1000px]">
                <div
                  className={`w-full h-full rounded-2xl relative transition-transform duration-700 [transform-style:preserve-3d] shadow-2xl ${revealedCvv ? '[transform:rotateY(180deg)]' : ''
                    }`}
                >
                  {/* FRONT OF THE CARD */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-gradient-to-br from-white/15 via-white/[0.03] to-white/[0.08] border border-white/20 backdrop-blur-xl [backface-visibility:hidden] flex flex-col justify-between overflow-hidden shadow-[inset_0_2px_20px_rgba(255,255,255,0.06)]">
                    {/* Glowing highlight orb */}
                    <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 blur-xl pointer-events-none" />

                    {/* Card Brand Header */}
                    <div className="flex justify-between items-start z-10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center p-1">
                          <img src="/logo/favicon.png" alt="Nexora logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-white">NEXORA STUDIO</span>
                      </div>
                      <div className="text-white font-black text-xs italic tracking-widest text-right">VISA</div>
                    </div>

                    {/* Chip */}
                    <div className="w-8 h-6 rounded-md bg-gradient-to-br from-[#ffd700]/80 to-[#b8860b]/60 border border-white/10 shadow-sm relative z-10 flex flex-col overflow-hidden p-0.5">
                      <div className="grid grid-cols-3 gap-0.5 h-full opacity-60">
                        <div className="border-r border-b border-[#222]" />
                        <div className="border-r border-b border-[#222]" />
                        <div className="border-b border-[#222]" />
                        <div className="border-r border-[#222]" />
                        <div className="border-r border-[#222]" />
                        <div className="" />
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="flex items-center justify-between z-10 mt-1">
                      <span className="text-sm font-mono tracking-widest text-white font-semibold">4000 1234 5678 7383</span>
                      <button
                        onClick={() => {
                          playClickSound(800, 0.04);
                          navigator.clipboard.writeText('4000 1234 5678 7383');
                          setCardCopied(true);
                          setTimeout(() => setCardCopied(false), 2000);
                        }}
                        className="p-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
                        title="Copy Card Number"
                      >
                        {cardCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Footer Name / Expiry */}
                    <div className="flex justify-between items-end z-10">
                      <div className="flex flex-col text-left">
                        <span className="text-[6px] text-gray-500 font-semibold uppercase tracking-wider">Cardholder</span>
                        <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wide">MILAN PANDAVDARA</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[6px] text-gray-500 font-semibold uppercase tracking-wider">Expires</span>
                        <span className="text-[9px] text-gray-300 font-bold font-mono">06/31</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK OF THE CARD */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-white/15 via-[#0A0D15] to-[#070b14] border border-white/20 backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between py-4 overflow-hidden shadow-2xl">
                    {/* Magnetic Stripe */}
                    <div className="w-full h-7 bg-black/90 mt-1" />

                    {/* Signature Strip & CVV */}
                    <div className="px-5 flex items-center gap-3">
                      <div className="flex-1 h-6 bg-white/5 border border-white/10 rounded-sm flex items-center justify-end px-3 select-none pointer-events-none">
                        <span className="text-[8px] text-gray-400 font-mono italic">Milan Pandavadara</span>
                      </div>
                      <div className="w-10 h-6 bg-[#ffd700] rounded-sm flex items-center justify-center font-mono font-bold text-black text-xs select-text">
                        388
                      </div>
                    </div>

                    {/* Details */}
                    <div className="px-5 text-[6px] text-gray-500 font-light text-left leading-tight">
                      This is a secure billing demonstration card for Nexora Studio Client Portal. Not valid for real bank transactions.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center z-10 mt-auto shrink-0">
              <p className="text-gray-400 text-xs font-light mb-3">
                {revealedCvv ? "Showing back of card with CVV code." : "Flip the card to reveal the secure CVV code."}
              </p>
              <button
                onClick={() => {
                  playClickSound(800, 0.05);
                  setRevealedCvv(!revealedCvv);
                }}
                className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                {revealedCvv ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" /> Show Card Front
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" /> Reveal CVV / Flip
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-2.5 pt-3 shrink-0">
              <button
                onClick={() => {
                  playClickSound(600, 0.04);
                  setActiveDocument(null);
                  setRevealedCvv(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" /> Back to Chat
              </button>
            </div>
          </div>
        );
      case 'nda':
        return (
          <div className="flex flex-col h-full text-left relative z-10 min-h-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-accent-blue" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Mutual NDA Agreement</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${ndaExecuted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                {ndaExecuted ? 'EXECUTED' : 'PENDING SIGN-OFF'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-gray-300 text-xs leading-relaxed font-light scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <p>This Mutual Non-Disclosure Agreement ("Agreement") is entered into by and between Nexora Studio and the Client/Recipient, to protect proprietary ideas and codebases shared during technical sprint discovery.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">1. Definition of Confidentiality</p>
              <p>Confidential Information includes but is not limited to source code, API keys, design templates, software topology mapping, client databases, and pricing proposals.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">2. Non-Use and Non-Disclosure</p>
              <p>Each party agrees to hold the other's confidential information in strict confidence and shall not use it for any purpose other than evaluating proposed project collaboration.</p>

              <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">3. Duration of Protection</p>
              <p>Confidentiality obligations shall continue to protect proprietary code assets for a period of three (3) years from execution or until otherwise agreed in writing.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mt-4 shrink-0">
              {ndaExecuted ? (
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold">Mutual NDA Executed successfully!</span>
                    <span className="text-[9px] text-gray-500 font-mono mt-0.5">Protected & Encrypted Secure Socket.</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    playClickSound(950, 0.1);
                    setNdaExecuted(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-0"
                >
                  Execute Mutual NDA
                </button>
              )}
            </div>

            <div className="flex gap-2.5 pt-3 shrink-0">
              <button
                onClick={() => {
                  playClickSound(600, 0.04);
                  setActiveDocument(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" /> Back to Chat
              </button>
            </div>
          </div>
        );
      case 'project_proposal':
        return (
          <div className="flex flex-col h-full text-left relative z-10 min-h-0">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-accent-blue" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Web Project Proposal</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${proposalApproved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                {proposalApproved ? 'PROPOSAL APPROVED' : 'UNDER REVIEW'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-gray-300 text-xs leading-relaxed font-light scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="text-center font-bold text-white text-xs pb-1 uppercase font-mono tracking-wider">7-Day Elite Development Sprint</div>
              <p>Nexora Studio proposes a high-fidelity client portal build featuring database integration, secure authentication modules, and customized user dashboards.</p>

              <div className="border border-white/5 rounded-xl p-3 bg-white/[0.01] space-y-2">
                <div className="flex justify-between items-center text-[9px] uppercase font-bold text-gray-400">
                  <span>Development Milestone</span>
                  <span>Allocation</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div className="flex justify-between text-xs">
                  <span>Discovery & System Specs (Day 1)</span>
                  <span className="text-white">₹5,000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Interactive Figma Design (Day 2-3)</span>
                  <span className="text-white">₹10,000</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Full-Stack Development (Day 4-6)</span>
                  <span className="text-white">₹20,000</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div className="flex justify-between text-xs font-bold text-accent-blue">
                  <span>Total Investment Package</span>
                  <span>₹35,000</span>
                </div>
              </div>

              <p className="font-semibold text-white uppercase text-[9px] tracking-wider text-accent-blue">Expected Deliverables</p>
              <p>• Highly responsive dashboard interface matching the brand book.<br />• Full database schema mapping and Postgres setup.<br />• Handover of clean source code and Vercel cloud deployment.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mt-4 shrink-0">
              {proposalApproved ? (
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold">Proposal Formally Approved!</span>
                    <span className="text-[9px] text-gray-500 font-mono mt-0.5">Our team will begin architectural layout prep.</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    playClickSound(1000, 0.1);
                    setProposalApproved(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-0"
                >
                  Approve Proposal & Launch Sprints
                </button>
              )}
            </div>

            <div className="flex gap-2.5 pt-3 shrink-0">
              <button
                onClick={() => {
                  playClickSound(600, 0.04);
                  setActiveDocument(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" /> Back to Chat
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
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
            className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-32px)] md:w-[860px] h-[590px] max-h-[calc(100vh-120px)] z-[100] flex items-center justify-center overflow-visible select-none"
          >
            {/* Physical Tablet Frame */}
            <div className="relative w-full h-full bg-[#080d19] border border-white/15 rounded-[38px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] p-4 flex flex-col md:flex-row overflow-visible">

              {/* Front Camera Dot */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#111] border border-white/5 flex items-center justify-center z-50">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-900/60" />
              </div>

              {/* Physical Volume Buttons on Left Edge */}
              <button
                onClick={() => handleVolumeChange(10)}
                aria-label="Volume Up"
                className="absolute left-[-5px] top-28 w-[5px] h-10 bg-[#1e293b] hover:bg-[#334155] active:translate-x-[2px] transition-all border border-white/10 border-r-0 rounded-l-[5px] cursor-pointer shadow-lg z-0"
              />
              <button
                onClick={() => handleVolumeChange(-10)}
                aria-label="Volume Down"
                className="absolute left-[-5px] top-[152px] w-[5px] h-10 bg-[#1e293b] hover:bg-[#334155] active:translate-x-[2px] transition-all border border-white/10 border-r-0 rounded-l-[5px] cursor-pointer shadow-lg z-0"
              />

              {/* Physical Power / Switch Button on Top Edge */}
              <button
                onClick={() => {
                  playClickSound(500, 0.08);
                  setIsOpen(false);
                }}
                aria-label="Power Switch"
                className="absolute right-14 top-[-5px] w-12 h-[5px] bg-[#1e293b] hover:bg-[#334155] active:translate-y-[2px] transition-all border border-white/10 border-b-0 rounded-t-[5px] cursor-pointer shadow-lg z-0"
              />

              {/* Speaker Grille Detail */}
              <div className="absolute left-14 top-1.5 flex gap-1 z-50">
                <div className="w-1.5 h-0.5 bg-white/10 rounded-full" />
                <div className="w-1.5 h-0.5 bg-white/10 rounded-full" />
                <div className="w-1.5 h-0.5 bg-white/10 rounded-full" />
                <div className="w-1.5 h-0.5 bg-white/10 rounded-full" />
              </div>

              {/* Ambient background glows */}
              <div className="absolute top-[20%] left-[-15%] w-[220px] h-[220px] rounded-full bg-accent-blue/10 blur-[80px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-[20%] right-[-15%] w-[220px] h-[220px] rounded-full bg-accent-purple/10 blur-[80px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

              {/* Screen Area Container */}
              <div className="flex-1 flex flex-col md:flex-row bg-[#0B1220]/95 backdrop-blur-3xl rounded-[24px] overflow-hidden border border-white/5 relative h-full w-full">

                {/* Volume HUD (iPadOS style) */}
                <AnimatePresence>
                  {showVolumeHud && (
                    <m.div
                      initial={{ opacity: 0, x: -15, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -15, scale: 0.95 }}
                      className="absolute left-4 top-36 z-50 bg-[#0F172A]/95 border border-white/10 rounded-2xl p-3 flex flex-col items-center gap-2 shadow-2xl backdrop-blur-md w-10"
                    >
                      <span className="text-[8px] font-black text-gray-400 tracking-wider">VOL</span>
                      <div className="w-1.5 h-20 bg-white/10 rounded-full overflow-hidden relative">
                        <div
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-accent-blue to-accent-purple rounded-full transition-all duration-150"
                          style={{ height: `${volume}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono font-bold text-white">{volume}%</span>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* Left Sidebar (Tablet-like Info Panel) */}
                <div className="hidden md:flex flex-col w-[280px] border-r border-white/10 bg-white/[0.01] p-6 justify-between select-none relative z-10">
                  <div className="space-y-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(91,164,230,0.3)]">
                        <img src="/logo/favicon.png" alt="Nexora Logo" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-xs tracking-wider uppercase">Nexora Studio</h2>
                        <p className="text-[9px] text-accent-blue font-mono">DIGITAL INNOVATOR</p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/[0.08] w-full" />

                    {/* Founder Card */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3 relative overflow-hidden group">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-md">
                            <img
                              src="/team/milan-chat.png"
                              alt="Milan"
                              className="w-full h-full object-cover object-top scale-125"
                            />
                          </div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0B1220] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-xs">Milan</h4>
                          <p className="text-[9px] text-gray-400">Founder & CEO</p>
                        </div>
                      </div>
                      <p className="text-[10px] leading-relaxed text-gray-400 font-light">
                        Full Stack Architect leading Nexora Studio with a builder-first vision.
                      </p>
                    </div>

                    {/* Secure Vault */}
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-gray-500 block">Secure Vault</span>
                      <div className="flex flex-col gap-1.5">
                        {vaultDocuments.map((doc) => {
                          const IconComponent = doc.icon;
                          const isActive = activeDocument === doc.id;
                          return (
                            <button
                              key={doc.id}
                              onClick={() => {
                                playClickSound(750, 0.05);
                                setActiveDocument(isActive ? null : doc.id);
                              }}
                              className={`flex items-center gap-2.5 w-full py-1.5 px-3 rounded-xl border transition-all duration-300 text-left cursor-pointer ${isActive
                                ? 'bg-gradient-to-r from-accent-blue/15 to-accent-purple/15 border-accent-blue/40 text-white shadow-[0_0_15px_rgba(91,164,230,0.1)]'
                                : 'bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/[0.04] hover:text-white'
                                }`}
                            >
                              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-accent-blue' : 'text-gray-500'}`} />
                              <span className="text-[10px] font-medium tracking-wide">{doc.label}</span>
                              {doc.completed && (
                                <Check className="w-3 h-3 text-emerald-400 ml-auto shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Shortcuts */}
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-gray-500 block">Quick Connect</span>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="https://www.linkedin.com/in/milan-pandavdara/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center py-2 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.06] text-[10px] text-gray-300 hover:text-white transition-all duration-300 font-medium"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="https://github.com/walterhydra"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center py-2 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.06] text-[10px] text-gray-300 hover:text-white transition-all duration-300 font-medium"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>System Status: 100% Online</span>
                    </div>
                    <p className="text-[9px] text-gray-600 font-mono">v1.2.0 (Tablet UI)</p>
                  </div>
                </div>

                {/* Right Chat Console Panel */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                  {/* Header */}
                  <div className="bg-white/[0.01] border-b border-white/[0.08] p-5 flex items-center justify-between backdrop-blur-md z-10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
                          <img src="/projects/Ai boat inside photo.png" alt="Nova AI" className="w-full h-full object-cover object-[50%_0%] origin-top scale-[1.4]" />
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          playClickSound(750, 0.04);
                          setShowDocsMenu(!showDocsMenu);
                        }}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 relative border ${showDocsMenu || activeDocument
                          ? 'bg-accent-blue/10 border-accent-blue/40 text-accent-blue'
                          : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        title="Secure Document Vault"
                      >
                        <FolderLock className="w-4 h-4" />
                        {/* Pulsing indicator if uncompleted documents exist */}
                        {(!isSigned || !offerAccepted || !ndaExecuted || !proposalApproved) && (
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          playClickSound(500, 0.08);
                          setIsOpen(false);
                          setActiveDocument(null);
                          setShowDocsMenu(false);
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Document Vault Overlay or Normal Chat */}
                  <div className="flex-1 flex flex-col overflow-hidden relative min-h-0">
                    <AnimatePresence mode="wait">
                      {activeDocument ? (
                        <m.div
                          key={activeDocument}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.25 }}
                          className="flex-1 flex flex-col overflow-hidden bg-[#070b14]/98 p-6 relative z-10 h-full"
                        >
                          {renderActiveDocument()}
                        </m.div>
                      ) : (
                        <m.div
                          key="chat-messages"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex-1 flex flex-col overflow-hidden h-full"
                        >
                          {/* Messages */}
                          <div
                            data-lenis-prevent="true"
                            className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-0 text-left"
                          >
                            {messages.map((msg, idx) => (
                              <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-full`}
                              >
                                <div className={`flex gap-3 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                                  <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-sm">
                                    {msg.role === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <img src="/projects/Ai boat inside photo.png" alt="Nova AI" className="w-full h-full object-cover object-[50%_0%] origin-top scale-[1.4]" />}
                                  </div>

                                  <div
                                    className={`relative text-sm ${msg.role === 'user'
                                      ? 'p-4 rounded-2xl shadow-[0_4px_16px_rgba(91,164,230,0.2)] bg-gradient-to-br from-accent-blue via-[#4f46e5] to-accent-purple border border-white/10 text-white rounded-br-sm'
                                      : 'py-4 px-5 rounded-2xl rounded-bl-[4px] bg-[#0E1726]/40 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                                      }`}
                                  >
                                    {msg.role !== 'user' && (
                                      <>
                                        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '10px 10px' }}></div>
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
                                    <img src="/projects/Ai boat inside photo.png" alt="Nova AI" className="w-full h-full object-cover object-[50%_0%] origin-top scale-[1.4]" />
                                  </div>
                                  <div className="py-3 px-5 rounded-2xl rounded-bl-[4px] bg-[#0E1726]/40 backdrop-blur-xl border border-white/[0.08] flex items-center gap-2 h-[44px] relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                    <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '10px 10px' }}></div>
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
                                onClick={() => {
                                  playClickSound(850, 0.03);
                                  handleSend();
                                }}
                                disabled={!inputValue.trim() || isLoading}
                                className="absolute right-1.5 w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple text-white shadow-[0_0_12px_rgba(91,164,230,0.3)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all cursor-pointer border-0"
                              >
                                <Send className="w-4 h-4 ml-0.5" />
                              </button>
                            </div>
                            <div className="text-center mt-3 mb-1 font-sans">
                              <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Powered by Nexora AI</p>
                            </div>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile/Global Documents Dropdown Drawer */}
                  <AnimatePresence>
                    {showDocsMenu && (
                      <m.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                        className="absolute inset-x-0 bottom-0 bg-[#0c1222]/98 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl z-40 p-6 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] max-h-[85%] overflow-y-auto"
                      >
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2">
                            <FolderLock className="w-5 h-5 text-accent-blue" />
                            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Secure Document Vault</h4>
                          </div>
                          <button
                            onClick={() => {
                              playClickSound(500, 0.05);
                              setShowDocsMenu(false);
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer border-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          {vaultDocuments.map((doc) => {
                            const IconComponent = doc.icon;
                            const isActive = activeDocument === doc.id;
                            return (
                              <button
                                key={doc.id}
                                onClick={() => {
                                  playClickSound(750, 0.05);
                                  setActiveDocument(isActive ? null : doc.id);
                                  setShowDocsMenu(false);
                                }}
                                className={`flex items-center gap-3.5 w-full p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group cursor-pointer ${isActive
                                  ? 'bg-gradient-to-r from-accent-blue/15 to-accent-purple/15 border-accent-blue/40 text-white shadow-[0_0_20px_rgba(91,164,230,0.15)]'
                                  : 'bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/[0.05] hover:border-white/10'
                                  }`}
                              >
                                <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-accent-blue/10 border-accent-blue/20' : 'bg-white/5 border-white/5 group-hover:bg-white/10'} transition-all`}>
                                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-accent-blue' : 'text-gray-400 group-hover:text-white'}`} />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-[12px] font-semibold tracking-wide text-white">{doc.label}</span>
                                  <span className="text-[9px] text-gray-500 font-light mt-0.5">
                                    {doc.id === 'client_agreement' && (isSigned ? 'Signed & Executed' : 'Digital Contract Signature')}
                                    {doc.id === 'internship_offer' && (offerAccepted ? 'Offer Accepted' : 'Full Stack Dev Intern Offer')}
                                    {doc.id === 'card_details' && (cardCopied ? 'Card Copied' : 'Interactive Billing Card')}
                                    {doc.id === 'nda' && (ndaExecuted ? 'Executed NDA' : 'Mutual Confidentiality Agreement')}
                                    {doc.id === 'project_proposal' && (proposalApproved ? 'Proposal Approved' : '7-Day Sprint Roadmap')}
                                  </span>
                                </div>
                                {doc.completed && (
                                  <div className="ml-auto w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div> {/* Close Right Chat Console Panel */}

              </div> {/* Close Screen Area Container */}
            </div> {/* Close Physical Tablet Frame */}
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
                    <img src="/projects/Ai boat inside photo.png" alt="Milan" className="w-full h-full object-cover object-[50%_0%] origin-top scale-[1.4] group-hover:scale-[1.5] transition-transform duration-500" />
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
                  <img src="/logo/ChatGPT Image May 11, 2026, 11_53_46 AM.png" alt="Nova Chat" className="w-full h-full rounded-full object-cover object-[50%_30%] scale-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
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
