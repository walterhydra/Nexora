import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, ChevronDown, Building2, Users, Mail, Zap, Coins, FileText, CreditCard, Lock, Award, Compass, Eye, EyeOff, Copy, Check, CheckCircle2, FolderLock, Undo2, ArrowRight } from 'lucide-react';

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
  const [lockedModalOpen, setLockedModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const [flowState, setFlowState] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('nova_chat_verified') === 'true' ? 'completed' : 'init';
    }
    return 'init';
  });
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

  // Internship Vault State
  const [internshipIdInput, setInternshipIdInput] = useState('');
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [showOfferLetter, setShowOfferLetter] = useState(false);
  const [internIdError, setInternIdError] = useState(false);
  const [acceptedOffers, setAcceptedOffers] = useState({});
  const [expandedOptions, setExpandedOptions] = useState({});



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
      title: 'About Nexoraa',
      desc: 'Our vision & agency details',
      icon: <Building2 className="w-3.5 h-3.5 text-accent-blue" />,
      text: '🏢 About Nexoraa'
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

  const internsData = [
    {
      id: 'milan',
      name: 'Milan Pandavadara',
      role: 'Full Stack Developer Intern',
      department: 'Core Engineering',
      stipend: '₹25,000 / month',
      duration: '6 Months',
      joiningDate: 'June 1, 2026',
      outcomes: [
        'Architecting core dashboard UI & components',
        'Setting up Postgres & Supabase database integration',
        'Managing high-fidelity Vercel cloud deployments',
        'Implementing speed optimization and image generation tools'
      ]
    },
    {
      id: 'divyansh',
      name: 'Divyansh',
      role: 'Frontend Developer Intern',
      department: 'Design & Frontend',
      stipend: '₹18,000 / month',
      duration: '3 Months',
      joiningDate: 'June 15, 2026',
      outcomes: [
        'Engineering clean React & Next.js client components',
        'Implementing responsive layouts and visual validation',
        'Integrating micro-animations and custom styling',
        'Optimizing component performance and load speed'
      ]
    },
    {
      id: 'stany',
      name: 'Stany Gregor',
      role: 'Software Engineer Intern',
      department: 'Web Systems',
      stipend: '₹15,000 / month',
      duration: '3 Months',
      joiningDate: 'June 10, 2026',
      outcomes: [
        'Managing REST API integrations and data flow',
        'Setting up automated CI/CD workflows',
        'Performing speed audits and optimizing performance',
        'Resolving bugs and styling inconsistencies across pages'
      ]
    },
    {
      id: 'rajkumar',
      name: 'Rajkumar Shah',
      role: 'Software Engineer Intern',
      department: 'Core Backend',
      stipend: '₹15,000 / month',
      duration: '3 Months',
      joiningDate: 'June 10, 2026',
      outcomes: [
        'Implementing server-side logic and endpoints',
        'Database migration scripting and caching systems',
        'Integrating background processes and scheduling systems',
        'Reviewing API structures and backend error logs'
      ]
    },
    {
      id: 'riya',
      name: 'Riya Sharma',
      role: 'Social Media & Branding Intern',
      department: 'Marketing & Strategy',
      stipend: '₹12,000 / month',
      duration: '3 Months',
      joiningDate: 'June 20, 2026',
      outcomes: [
        'Designing branding and visual asset collections',
        'Coordinating outreach programs and email sequences',
        'Managing brand voice across X and LinkedIn channels',
        'Analyzing traffic campaigns and user onboarding'
      ]
    }
  ];

  const messagesContainerRef = useRef(null);
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
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
              ? "Hey! 👋 I'm Nova, your guide to Nexoraa Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]"
              : "Hey! 👋 I'm Nova, your guide to Nexoraa Studio. Great to have you here! What would you like to explore?",
            isNew: true
          }
        ]);
      }, 500);
    }
  }, [isOpen]);

  // Reset active document if user is not verified
  useEffect(() => {
    if (flowState !== 'completed') {
      setActiveDocument(null);
      setShowDocsMenu(false);
    }
  }, [flowState]);

  // Reset internship sub-state when changing files
  useEffect(() => {
    if (activeDocument !== 'internship_offer') {
      setInternshipIdInput('');
      setIsIdVerified(false);
      setSelectedIntern(null);
      setShowOfferLetter(false);
      setInternIdError(false);
    }
  }, [activeDocument]);

  const handleVerifyInternId = () => {
    playClickSound(800, 0.05);
    if (internshipIdInput.trim() === '220305') {
      setIsIdVerified(true);
      setInternIdError(false);
    } else {
      setInternIdError(true);
      playClickSound(400, 0.1);
    }
  };


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
          content: `I've sent a 6-digit verification code to **${text}**. Please enter it below (be sure to check your spam folder as well):`,
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
          content: "Email verified successfully! Welcome to Nexoraa Studio. What would you like to explore? \n\n[OPTIONS]",
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
      lowerText.includes('about nexoraa') ||
      lowerText.includes('about founder') ||
      lowerText.includes('about company') ||
      lowerText.includes('about section') ||
      lowerText.includes('who is the founder') ||
      lowerText.includes('milan') ||
      text === '🏢 About Nexoraa'
    ) {
      const aboutResponse = `🏢 **About Nexoraa Studio**
Nexoraa Studio is a **Premium Digital Agency & Technology Innovator** specializing in engineering high-fidelity, high-performance web applications, custom software, and bespoke UI/UX designs. We operate as a remote-first, global team of elite architects and developers dedicated to turning ambitious product concepts into scalable, production-ready solutions.

👑 **Meet the Founder & CEO**
• **Milan Pandavadara** (Full Stack Architect & Visionary)
Milan leads Nexoraa with a builder-first philosophy, bridging the gap between advanced engineering and high-level product design. With years of hands-on experience in full-stack architecture, API integration, and cloud ecosystems, he ensures that every digital solution we deliver is optimized for scale, performance, and unmatched visual aesthetics.
• **LinkedIn**: https://www.linkedin.com/in/milan-pandavdara/
• **GitHub**: https://github.com/walterhydra
• **Portfolio**: https://www.walterhydra.me

🚀 **Our Core Values & Strengths**
• **End-to-End Solutions**: We handle everything from discovery, architecture, and UI/UX design to backend engineering and cloud deployment.
• **High-Performance Code**: Every application is optimized for speed, reliability, and modern SEO best practices.
• **Innovative Design**: We build custom layouts with smooth animations and curated color palettes, refusing generic templates.

📞 **Contact Nexoraa**
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
      const servicesResponse = `Nexoraa Studio offers premium end-to-end digital solutions tailored to elevate your business:

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
      const pricingResponse = `💰 **Nexoraa Pricing & Packages**
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
• 💼 **LinkedIn**: [Nexoraa Studio](https://www.linkedin.com/in/milan-pandavdara/)
• 💻 **GitHub**: [walterhydra](https://github.com/walterhydra)
• 🌐 **Portfolio**: [walterhydra.me](https://www.walterhydra.me)

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
      const lowerText = text.toLowerCase().trim();
      let fallbackResponse = `I'm on it! 💻 While I'm local and offline, I can guide you through our agency's features. Feel free to ask about our Founder, Services, Team, or Pricing Packages! \n\n[OPTIONS]`;

      if (
        lowerText.match(/^(hi|hello|hey|hii|heyy|yo|hola|namaste|good morning|good afternoon|good evening)/i) ||
        lowerText === 'hi' ||
        lowerText === 'hii' ||
        lowerText === 'hello' ||
        lowerText === 'hey'
      ) {
        fallbackResponse = "Hey! 👋 I'm Nova, your guide to Nexoraa Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]";
      } else if (lowerText.match(/^(how are you|hows it going|how do you do|are you okay|doing)/i)) {
        fallbackResponse = "I'm doing fantastic, thank you! 🚀 Ready to help you build premium web apps or explore Nexoraa. What's on your mind? \n\n[OPTIONS]";
      } else if (lowerText.match(/^(thank you|thanks|ty|awesome|great|perfect|ok|okay|nice)/i)) {
        fallbackResponse = "You're very welcome! Let me know if there's anything else I can assist you with. 😊 \n\n[OPTIONS]";
      } else if (lowerText.includes('about') || lowerText.includes('founder') || lowerText.includes('milan')) {
        fallbackResponse = `🏢 **About Nexoraa Studio**
Nexoraa Studio is a **Premium Digital Agency & Technology Innovator** specializing in engineering high-fidelity, high-performance web applications, custom software, and bespoke UI/UX designs. We operate as a remote-first, global team of elite architects and developers dedicated to turning ambitious product concepts into scalable, production-ready solutions.

👑 **Meet the Founder & CEO**
• **Milan Pandavadara** (Full Stack Architect & Visionary)
Milan leads Nexoraa with a builder-first philosophy, bridging the gap between advanced engineering and high-level product design. With years of hands-on experience in full-stack architecture, API integration, and cloud ecosystems, he ensures that every digital solution we deliver is optimized for scale, performance, and unmatched visual aesthetics.
• **LinkedIn**: https://www.linkedin.com/in/milan-pandavdara/
• **GitHub**: https://github.com/walterhydra
• **Portfolio**: https://www.walterhydra.me

🚀 **Our Core Values & Strengths**
• **End-to-End Solutions**: We handle everything from discovery, architecture, and UI/UX design to backend engineering and cloud deployment.
• **High-Performance Code**: Every application is optimized for speed, reliability, and modern SEO best practices.
• **Innovative Design**: We build custom layouts with smooth animations and curated color palettes, refusing generic templates.

📞 **Contact Nexoraa**
• **Email**: nexoraa.works@gmail.com
• **Phone**: +91 7383303388

Would you like to learn more about **Meet the Team**, **Our Services**, or **Contact Us**? \n\n[OPTIONS]`;
      } else if (lowerText.includes('team')) {
        fallbackResponse = "We have an exceptional, remote-first team of experts led by our Founder & CEO, **Milan**.\n\n**Core Team & Leadership:**\n• **Milan Pandavadara** — Founder & CEO (Full Stack Architect)\n• **Gaurav Thakur** — Technical Lead (Mobile & Backend Systems)\n• **Alis Patel** — Full-Stack Architect (Node.js & DevOps)\n• **Abhishek Jha** — Backend Developer (Java & Systems)\n• **Stany Gregor** — Software Engineer (Web Systems)\n• **Divyansh** — Software Engineer (Frontend Engineer)\n• **Rajkumar Shah** — Software Engineer (Web Systems)\n• **Riya Sharma** — Social Media Handler (Branding & Strategy)\n\nWhat would you like to explore? \n\n[OPTIONS]";
      } else if (lowerText.includes('services')) {
        fallbackResponse = "Nexoraa Studio offers premium end-to-end digital solutions:\n\n• **Web & Mobile App Development**: React/Next.js/Vite and robust mobile apps.\n• **Brand & Design**: Stunning, cohesive brand identities and conversion-optimized UI/UX.\n• **Automation & AI Integration**: Custom AI pipelines and chatbot integrations.\n• **DevOps & Cloud Systems**: Secure, scalable setup on AWS, Vercel, and Supabase.\n• **SEO**: Advanced SEO audit and implementation for visibility.\n\nWhat are you looking to build? \n\n[OPTIONS]";
      } else if (lowerText.includes('contact')) {
        fallbackResponse = "We'd love to collaborate on your next premium project!\n\n• 📩 **Email**: nexoraa.works@gmail.com\n• 📞 **Phone**: +91 7383303388\n• 💼 **LinkedIn**: https://www.linkedin.com/in/milan-pandavdara/\n• 🌐 **Portfolio**: https://www.walterhydra.me\n\nLet us know how we can help! \n\n[OPTIONS]";
      } else if (lowerText.includes('pricing') || lowerText.includes('package')) {
        fallbackResponse = `💰 **Nexoraa Pricing & Packages**
We offer transparent, package-based pricing:

• **Starter Package** (₹15,000 / $200): Best for landing pages and simple business sites.
• **Growth Package** (₹35,000 / $450): Best for dynamic business websites. React/Next.js build.
• **Scale Package** (₹75,000+ / $950+): Best for custom web platforms and e-commerce. Full-stack database architecture.

What package matches your requirements? \n\n[OPTIONS]`;
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
 
    const showOptionsGrid = hasOptions && expandedOptions[idx];
 
    return (
      <div className="space-y-4 animate-fade-in">
        <p className="whitespace-pre-wrap leading-relaxed">{parseMarkdown(cleanContent)}</p>
        {hasOptions && !expandedOptions[idx] && (
          <button
            onClick={() => {
              playClickSound(800, 0.05);
              setExpandedOptions(prev => ({ ...prev, [idx]: true }));
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-accent-blue/30 text-gray-400 hover:text-white transition-all duration-300 text-[11px] font-semibold cursor-pointer group mt-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-blue group-hover:scale-110 transition-transform" />
            Explore Menu Options
          </button>
        )}
        {showOptionsGrid && (
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
    { id: 'client_agreement', label: 'Client Agreement', icon: FileText, completed: true },
    { id: 'internship_offer', label: 'Internship Offer', icon: Award, completed: offerAccepted },
    { id: 'nda', label: 'NDA Agreement', icon: Lock, completed: ndaExecuted },
    { id: 'project_proposal', label: 'Project Proposal', icon: Compass, completed: proposalApproved },
  ];

  const renderActiveDocument = () => {
    switch (activeDocument) {
      case 'client_agreement':
        return (
          <div className="flex-1 flex flex-col h-full text-left relative z-10 min-h-0 w-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-blue" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Client Service Agreement</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full border font-mono bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                OFFICIAL DOCUMENT
              </span>
            </div>

            <div className="flex-1 min-h-0 relative rounded-2xl border border-white/10 overflow-hidden bg-black/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.6)] flex flex-col mb-4">
              <iframe
                src="/Video/Nexoraa_Client_Agreement.pdf#toolbar=0&navpanes=0"
                className="w-full h-full flex-1 border-0 rounded-2xl"
                title="Client Agreement PDF"
              />
            </div>

            <div className="flex gap-2.5 pt-2 shrink-0">
              <button
                onClick={() => {
                  playClickSound(600, 0.04);
                  setActiveDocument(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" /> Back to Chat
              </button>
              <a
                href="/Video/Nexoraa_Client_Agreement.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound(800, 0.04)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Open PDF
              </a>
            </div>
          </div>
        );
      case 'internship_offer':
        if (!isIdVerified) {
          return (
            <div className="flex-1 flex flex-col h-full text-left relative z-10 min-h-0 w-full justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0">
                  <div className="flex items-center gap-2">
                    <FolderLock className="w-5 h-5 text-accent-blue" />
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider font-mono">Secure Intern Vault</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border font-mono bg-red-500/10 border-red-500/30 text-red-400">
                    LOCKED
                  </span>
                </div>

                <div className="space-y-4 max-w-sm mx-auto text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <Lock className="w-5 h-5 text-accent-blue/80" />
                  </div>
                  <h4 className="text-white font-semibold text-sm">Verification Required</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Please enter your **Internship Access Code** to unlock the onboarding files and official offer letters.
                  </p>

                  <div className="space-y-2 pt-2">
                    <input
                      type="text"
                      value={internshipIdInput}
                      onChange={(e) => {
                        setInternshipIdInput(e.target.value);
                        setInternIdError(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleVerifyInternId();
                        }
                      }}
                      placeholder="Enter Access Code"
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-center text-white placeholder-gray-600 focus:outline-none transition-all duration-300 font-mono text-xs tracking-wider ${
                        internIdError
                          ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                          : 'border-white/10 focus:border-accent-blue/50 focus:shadow-[0_0_15px_rgba(91,164,230,0.15)]'
                      }`}
                    />
                    {internIdError && (
                      <p className="text-red-500 font-semibold text-[10px] uppercase tracking-wider animate-pulse">
                        Access Denied
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4 border-t border-white/5 shrink-0">
                <button
                  onClick={() => {
                    playClickSound(600, 0.04);
                    setActiveDocument(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Undo2 className="w-3.5 h-3.5" /> Cancel
                </button>
                <button
                  onClick={handleVerifyInternId}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Unlock Vault
                </button>
              </div>
            </div>
          );
        }

        if (!selectedIntern) {
          return (
            <div className="flex-1 flex flex-col h-full text-left relative z-10 min-h-0 w-full justify-between">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent-blue" />
                    <h3 className="text-white font-bold text-sm uppercase tracking-wider">Intern Directory</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border font-mono bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    AUTHORIZED
                  </span>
                </div>

                <p className="text-gray-400 text-[11px] mb-4">
                  Select a team member to view onboarding details, project scope, and official offer letters:
                </p>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {internsData.map((intern) => {
                    const isAccepted = acceptedOffers[intern.id];
                    return (
                      <button
                        key={intern.id}
                        onClick={() => {
                          playClickSound(800, 0.04);
                          setSelectedIntern(intern);
                        }}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-accent-blue/30 transition-all duration-300 group text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/25 flex items-center justify-center font-bold text-accent-blue text-xs group-hover:scale-105 transition-transform">
                            {intern.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-xs group-hover:text-accent-blue transition-colors">
                              {intern.name}
                            </h4>
                            <p className="text-gray-500 text-[10px] mt-0.5">{intern.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isAccepted && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono scale-95">
                              SIGNED
                            </span>
                          )}
                          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors -rotate-90" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2.5 pt-4 border-t border-white/5 shrink-0 mt-4">
                <button
                  onClick={() => {
                    playClickSound(600, 0.04);
                    setIsIdVerified(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Lock Vault
                </button>
              </div>
            </div>
          );
        }

        if (!showOfferLetter) {
          const isAccepted = acceptedOffers[selectedIntern.id];
          return (
            <div className="flex-1 flex flex-col h-full text-left relative z-10 min-h-0 w-full justify-between">
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
                  <button
                    onClick={() => {
                      playClickSound(600, 0.04);
                      setSelectedIntern(null);
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Undo2 className="w-3.5 h-3.5" /> Back to Directory
                  </button>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${isAccepted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                    {isAccepted ? 'OFFER SIGNED' : 'PENDING ACTION'}
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 rounded-full bg-accent-blue/15 border border-accent-blue/30 flex items-center justify-center font-bold text-accent-blue text-sm">
                    {selectedIntern.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide">{selectedIntern.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{selectedIntern.role}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {/* Key-Value Details Grid */}
                  <div className="grid grid-cols-2 gap-3 bg-white/[0.01] border border-white/5 rounded-xl p-3.5">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block tracking-wider font-medium">Department</span>
                      <span className="text-white text-xs font-medium mt-0.5 block">{selectedIntern.department}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block tracking-wider font-medium">Stipend</span>
                      <span className="text-accent-blue text-xs font-semibold mt-0.5 block">{selectedIntern.stipend}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block tracking-wider font-medium">Duration</span>
                      <span className="text-white text-xs font-medium mt-0.5 block">{selectedIntern.duration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block tracking-wider font-medium">Joining Date</span>
                      <span className="text-white text-xs font-medium mt-0.5 block">{selectedIntern.joiningDate}</span>
                    </div>
                  </div>

                  {/* Outcomes Section */}
                  <div>
                    <h4 className="text-[10px] text-accent-blue font-bold uppercase tracking-widest mb-2 border-b border-white/5 pb-1 font-mono">Expected Deliverables</h4>
                    <ul className="space-y-1.5 pl-1.5 text-gray-300 text-[11px] leading-relaxed">
                      {selectedIntern.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent-purple/80 mt-0.5 font-bold">•</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4 border-t border-white/5 shrink-0 mt-4">
                <button
                  onClick={() => {
                    playClickSound(800, 0.04);
                    setShowOfferLetter(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" /> View Official Offer Letter
                </button>
              </div>
            </div>
          );
        }

        {
          const isAccepted = acceptedOffers[selectedIntern.id];
          return (
            <div className="flex-1 flex flex-col h-full text-left relative z-10 min-h-0 w-full justify-between">
              {/* Custom Confetti Animation Elements */}
              {isAccepted && (
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

              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
                  <button
                    onClick={() => {
                      playClickSound(600, 0.04);
                      setShowOfferLetter(false);
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Undo2 className="w-3.5 h-3.5" /> Back to Profile
                  </button>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${isAccepted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                    {isAccepted ? 'SIGNED & EXECUTED' : 'PENDING SIGNATURE'}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-gray-300 text-xs leading-relaxed font-light scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  <div className="text-center font-bold text-white text-[10px] tracking-widest uppercase border-b border-white/5 pb-2 mb-2 font-mono">NEXORAA STUDIO HR DEPT</div>
                  <p className="text-[10px] text-gray-500 font-mono">Date: June 12, 2026</p>
                  <p>Dear **{selectedIntern.name}**,</p>
                  <p>We are thrilled to offer you the position of **{selectedIntern.role}** at Nexoraa Studio. During your time with us, you will work closely with Milan (Founder) and our engineering leaders to design and implement premium, high-performance web products.</p>

                  <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">1. Stipend & Compensation</p>
                  <p>You will receive a monthly stipend of **{selectedIntern.stipend}**, paid during the first week of each consecutive month.</p>

                  <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">2. Role & Duration</p>
                  <p>This is a **{selectedIntern.duration}** remote engagement, starting on **{selectedIntern.joiningDate}**, with the possibility of conversion to a full-time role based on outstanding performance and sprint delivery.</p>

                  <p className="font-semibold text-white uppercase text-[10px] tracking-wider text-accent-blue">3. Expected Outcomes</p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {selectedIntern.outcomes.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>

                  <div className="h-[1px] bg-white/5 my-4" />

                  {/* Interactive Signature Area */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 shrink-0">
                    {isAccepted ? (
                      <div className="flex items-center gap-2.5 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5 animate-pulse" />
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-semibold">Offer Accepted successfully!</span>
                          <span className="text-[9px] text-gray-500 font-mono mt-0.5">Welcome to the elite developer sprints. Signed as: {selectedIntern.name}</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          playClickSound(1100, 0.15);
                          setTimeout(() => playClickSound(1400, 0.1), 80);
                          setAcceptedOffers((prev) => ({ ...prev, [selectedIntern.id]: true }));
                        }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border-0"
                      >
                        Accept Offer & Commit Sprints
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }

      case 'nda':
        return (
          <div className="flex-1 flex flex-col h-full text-left relative z-10 min-h-0 w-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-accent-blue" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Mutual NDA Agreement</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${ndaExecuted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
                {ndaExecuted ? 'EXECUTED' : 'PENDING SIGN-OFF'}
              </span>
            </div>

            <div className="flex-1 min-h-0 relative rounded-2xl border border-white/10 overflow-hidden bg-black/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.6)] flex flex-col mb-4">
              <iframe
                src="/Video/Nexoraa_Studio_NDA.pdf#toolbar=0&navpanes=0"
                className="w-full h-full flex-1 border-0 rounded-2xl"
                title="Mutual NDA PDF"
              />
            </div>

            <div className="flex gap-2.5 pt-2 shrink-0">
              <button
                onClick={() => {
                  playClickSound(600, 0.04);
                  setActiveDocument(null);
                }}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" /> Back to Chat
              </button>
              <a
                href="/Video/Nexoraa_Studio_NDA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound(800, 0.04)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> Open PDF
              </a>
            </div>
          </div>
        );
      case 'project_proposal':
        return (
          <div className="flex-1 flex flex-col h-full text-left relative z-10 min-h-0 w-full">
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
              <p>Nexoraa Studio proposes a high-fidelity client portal build featuring database integration, secure authentication modules, and customized user dashboards.</p>

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
                        <img src="/logo/ChatGPT Image Jun 9, 2026, 09_17_40 PM.png" alt="Nexoraa Logo" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-xs tracking-wider uppercase">Nexoraa Studio</h2>
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
                        Full Stack Architect leading Nexoraa Studio with a builder-first vision.
                      </p>
                    </div>

                    {/* Secure Vault */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-gray-500 block">Secure Vault</span>
                        {flowState !== 'completed' && (
                          <span className="text-[8px] font-mono text-accent-purple flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> LOCKED
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {vaultDocuments.map((doc) => {
                          const IconComponent = flowState !== 'completed' ? Lock : doc.icon;
                          const isActive = activeDocument === doc.id;
                          const isLocked = flowState !== 'completed';
                          return (
                            <button
                              key={doc.id}
                              onClick={() => {
                                playClickSound(750, 0.05);
                                if (doc.id === 'client_agreement' || doc.id === 'nda') {
                                  setLockedModalOpen(true);
                                } else if (isLocked) {
                                  setLockedModalOpen(true);
                                } else {
                                  setActiveDocument(isActive ? null : doc.id);
                                }
                              }}
                              className={`flex items-center gap-2.5 w-full py-1.5 px-3 rounded-xl border transition-all duration-300 text-left ${
                                isLocked
                                  ? 'bg-white/[0.01] border-white/5 text-gray-500 hover:bg-white/[0.04] hover:text-white cursor-pointer'
                                  : isActive
                                    ? 'bg-gradient-to-r from-accent-blue/15 to-accent-purple/15 border-accent-blue/40 text-white shadow-[0_0_15px_rgba(91,164,230,0.1)] cursor-pointer'
                                    : 'bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/[0.04] hover:text-white cursor-pointer'
                              }`}
                              title={isLocked ? "Access Restricted" : `View ${doc.label}`}
                            >
                              <IconComponent className={`w-3.5 h-3.5 ${isLocked ? 'text-gray-600' : isActive ? 'text-accent-blue' : 'text-gray-500'}`} />
                              <span className="text-[10px] font-medium tracking-wide">{doc.label}</span>
                              {isActive && (
                                <Check className="w-3 h-3 text-emerald-400 ml-auto shrink-0" />
                              )}
                              {isLocked && (
                                <Lock className="w-2.5 h-2.5 text-gray-600 ml-auto shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                     {/* Shortcuts */}
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-gray-500 block">Quick Connect</span>
                      <div className="flex flex-col gap-2">
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
                        <a
                          href="https://www.walterhydra.me"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center py-2 px-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.06] text-[10px] text-gray-300 hover:text-white transition-all duration-300 font-medium"
                        >
                          Portfolio
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
                  <div className="bg-white/[0.01] border-b border-white/[0.08] p-5 flex items-center justify-between backdrop-blur-md z-10 shrink-0">
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
                          Nova
                        </h3>
                        <p className="text-gray-400 text-xs font-medium">Usually replies instantly</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (flowState !== 'completed') return;
                          playClickSound(750, 0.04);
                          setShowDocsMenu(!showDocsMenu);
                        }}
                        disabled={flowState !== 'completed'}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 relative border ${
                          flowState !== 'completed'
                            ? 'bg-white/[0.01]/30 border-white/5 text-gray-600 cursor-not-allowed opacity-50'
                            : showDocsMenu || activeDocument
                              ? 'bg-accent-blue/10 border-accent-blue/40 text-accent-blue cursor-pointer'
                              : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.08] cursor-pointer'
                          }`}
                        title={flowState !== 'completed' ? "Verify your email to access" : "Secure Document Vault"}
                      >
                        <FolderLock className="w-4 h-4" />
                        {/* Pulsing indicator if uncompleted documents exist and verified */}
                        {flowState === 'completed' && (!isSigned || !offerAccepted || !ndaExecuted || !proposalApproved) && (
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
                          className={`flex-1 flex flex-col overflow-hidden bg-[#070b14]/98 relative z-10 min-h-0 h-full ${
                            activeDocument ? 'p-3 pb-2' : 'p-6'
                          }`}
                        >
                          {renderActiveDocument()}
                        </m.div>
                      ) : (
                        <m.div
                          key="chat-messages"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex-1 flex flex-col overflow-hidden h-full min-h-0"
                        >
                          {/* Messages */}
                          <div
                            ref={messagesContainerRef}
                            data-lenis-prevent="true"
                            className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-0 text-left min-h-0"
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
                            <div ref={messagesEndRef} className="shrink-0 h-px" />
                          </div>

                          {/* Input Area */}
                          <div className="p-4 bg-transparent border-t border-white/[0.06] backdrop-blur-md z-10 shrink-0">
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
                              <p className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Powered by Nexoraa AI</p>
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
                                  if (doc.id === 'client_agreement' || doc.id === 'nda') {
                                    setLockedModalOpen(true);
                                  } else {
                                    setActiveDocument(isActive ? null : doc.id);
                                  }
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
                                {isActive && (
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

      {/* Fullscreen Locked Strip */}
      <AnimatePresence>
        {lockedModalOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-md flex items-center justify-center"
          >
            <m.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="w-full bg-[#050505]/95 border-y border-white/10 py-8 md:py-10 px-6 flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative origin-center overflow-hidden"
            >
              {/* Glossy Reflection overlay */}
              <m.div 
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
              />
              
              <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                
                {/* Left side: Icon + Text */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8 text-center md:text-left">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <span className="text-2xl md:text-4xl">🔒</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-4xl font-display font-black text-white tracking-tighter uppercase">
                      Access Restricted
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                      This asset is secured and requires exclusive clearance. Please contact our team to verify your identity and unlock this document.
                    </p>
                  </div>
                </div>
                
                {/* Right side: Buttons */}
                <div className="flex flex-row items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <button 
                    onClick={() => setLockedModalOpen(false)}
                    className="flex-1 md:flex-none px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-gray-400 hover:text-white font-bold transition-colors border border-transparent hover:border-white/10 text-sm md:text-base whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <Link to="/contact" onClick={() => setLockedModalOpen(false)} className="flex-1 md:flex-none">
                    <button className="w-full bg-white text-black px-8 py-3.5 font-bold text-sm md:text-base rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center whitespace-nowrap group">
                      <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                        Unlock Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
                      </span>
                    </button>
                  </Link>
                </div>

              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
