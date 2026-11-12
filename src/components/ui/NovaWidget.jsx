import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, User, ChevronDown, Building2, Users, Mail, Zap, Coins, FileText, CreditCard, Lock, Award, Compass, Eye, EyeOff, Copy, Check, CheckCircle2, FolderLock, Undo2, ArrowRight, RotateCcw } from 'lucide-react';

// Singleton audio context for smooth performance
let sharedAudioCtx = null;

// Pure markdown parse cache for 0ms re-rendering
const markdownCache = new Map();

// Professional Rich Text & Markdown Parser (Bold, Links, Lists, Code)
const parseMarkdown = (text) => {
  if (!text) return '';
  if (markdownCache.has(text)) return markdownCache.get(text);

  const lines = text.split('\n');
  const result = lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const displayLine = isBullet ? trimmed.replace(/^[•\-\*]\s*/, '') : line;

    // Tokenize for bold, links, inline code, and bare URLs
    const tokens = [];
    const pattern = /\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s)]+)|`([^`]+)`|\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(displayLine)) !== null) {
      if (match.index > lastIndex) {
        tokens.push(displayLine.substring(lastIndex, match.index));
      }
      if (match[1] && match[2]) {
        // [label](url)
        tokens.push(
          <a
            key={`l-${lineIdx}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors font-medium cursor-pointer"
          >
            {match[1]}
          </a>
        );
      } else if (match[3]) {
        // bare URL
        tokens.push(
          <a
            key={`u-${lineIdx}-${match.index}`}
            href={match[3]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors font-medium cursor-pointer"
          >
            {match[3]}
          </a>
        );
      } else if (match[4]) {
        // inline code
        tokens.push(
          <code
            key={`c-${lineIdx}-${match.index}`}
            className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[12px] text-red-300 border border-white/5"
          >
            {match[4]}
          </code>
        );
      } else if (match[5]) {
        // bold text
        tokens.push(
          <strong key={`b-${lineIdx}-${match.index}`} className="font-semibold text-white">
            {match[5]}
          </strong>
        );
      }
      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < displayLine.length) {
      tokens.push(displayLine.substring(lastIndex));
    }

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 my-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0 opacity-80" />
          <span className="flex-1 leading-relaxed">{tokens}</span>
        </div>
      );
    }

    if (trimmed === '') {
      return <div key={lineIdx} className="h-1.5" />;
    }

    return (
      <div key={lineIdx} className="leading-relaxed my-0.5">
        {tokens}
      </div>
    );
  });

  markdownCache.set(text, result);
  return result;
};

// High-performance streaming typewriter without main-thread jank
const TypewriterText = ({ text, onComplete, onWordTyped }) => {
  const [displayedText, setDisplayedText] = useState('');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onWordTypedRef = useRef(onWordTyped);
  onWordTypedRef.current = onWordTyped;

  useEffect(() => {
    let index = 0;
    const words = text.split(' ');
    setDisplayedText('');

    // Natural smooth typing speed (1 word at a time, comfortable to read)
    const step = words.length > 60 ? 2 : 1;
    const interval = setInterval(() => {
      if (index < words.length) {
        const nextChunk = words.slice(index, index + step).join(' ');
        setDisplayedText((prev) => (prev ? prev + ' ' + nextChunk : nextChunk));
        index += step;
        if (onWordTypedRef.current) onWordTypedRef.current();
      } else {
        clearInterval(interval);
        if (onCompleteRef.current) {
          setTimeout(onCompleteRef.current, 20);
        }
      }
    }, 45);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div>
      {parseMarkdown(displayedText)}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-3.5 ml-1 bg-red-500 animate-pulse rounded-sm align-middle" />
      )}
    </div>
  );
};

// Static Quick Replies definition (declared outside to avoid recreation per render)
const quickRepliesData = [
  {
    title: 'About Nexoraa',
    desc: 'Our vision & agency details',
    icon: <Building2 className="w-3.5 h-3.5 text-red-400" />,
    text: '🏢 About Nexoraa'
  },
  {
    title: 'Meet the Team',
    desc: 'Our experts & engineers',
    icon: <Users className="w-3.5 h-3.5 text-sky-400" />,
    text: '👥 Meet the Team'
  },
  {
    title: 'Our Services',
    desc: 'Premium design & dev solutions',
    icon: <Sparkles className="w-3.5 h-3.5 text-red-400" />,
    text: '🚀 Our Services'
  },
  {
    title: 'Our Process',
    desc: '7-day elite build sprints',
    icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
    text: '⚡ Our Process'
  },
  {
    title: 'Pricing & Packages',
    desc: 'Flexible investment tiers',
    icon: <Coins className="w-3.5 h-3.5 text-sky-400" />,
    text: '💰 Pricing & Packages'
  },
  {
    title: 'Contact Us',
    desc: "Let's collaborate on a project",
    icon: <Mail className="w-3.5 h-3.5 text-red-400" />,
    text: '📩 Contact Us'
  }
];

// Memoized single chat message item - eliminates typing lag completely
const ChatMessageItem = React.memo(({ msg, idx, onComplete, onWordTyped, onReplyClick }) => {
  const hasOptions = msg.content.includes('[OPTIONS]');
  const cleanContent = msg.content.replace('[OPTIONS]', '').trim();

  if (msg.role === 'user') {
    return (
      <div className="flex justify-end w-full">
        <div className="flex flex-col items-end max-w-[85%] sm:max-w-[75%]">
          <div className="px-4 py-2.5 rounded-none bg-[#161f33] border border-white/10 text-white shadow-sm font-normal text-[13.5px] leading-relaxed break-words">
            {msg.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start w-full">
      <div className="flex gap-2.5 max-w-[92%] sm:max-w-[85%] items-start">
        <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden border border-red-500/30 mt-0.5 shadow-sm bg-black/40">
          <img
            src="/images/spider-man-aesthetic-738pim4mwbf8349v.webp"
            alt="Spidey"
            className="w-full h-full object-cover object-[50%_10%]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[11px] font-semibold text-gray-300 mb-1 px-1 flex items-center gap-1.5">
            Spidey
          </span>
          <div className="px-4 py-3 rounded-none bg-[#0C101A] border border-white/10 text-gray-200 shadow-sm text-[13.5px] leading-relaxed break-words w-full">
            {msg.isNew ? (
              <TypewriterText
                text={cleanContent}
                onComplete={() => onComplete(idx)}
                onWordTyped={onWordTyped}
              />
            ) : (
              <div className="space-y-2.5">
                <div>{parseMarkdown(cleanContent)}</div>
                {hasOptions && (
                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/10 mt-2.5">
                    {quickRepliesData.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => onReplyClick(reply.text)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-red-500/50 text-gray-300 hover:text-white text-xs font-medium transition-all duration-150 cursor-pointer active:scale-95 group shadow-sm"
                      >
                        <span className="opacity-80 group-hover:opacity-100 transition-opacity">{reply.icon}</span>
                        <span>{reply.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function NovaWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lockedModalOpen, setLockedModalOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Close tablet on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setActiveDocument(null);
        setShowDocsMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Clean any old stored chat/verification on refresh/mount so every refresh starts brand new
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('nova_chat_history');
        sessionStorage.removeItem('nova_chat_verified');
      } catch (e) {
        // ignore storage errors
      }
    }
  }, []);

  // Handle 1-click email verification link (?verify_email=...&verify_otp=...&verify_token=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const vEmail = urlParams.get('verify_email');
      const vOtp = urlParams.get('verify_otp');
      const vToken = urlParams.get('verify_token');

      if (vEmail && vOtp && vToken) {
        setUserEmail(vEmail);
        setOtpToken(vToken);
        setFlowState('completed');
        setIsOpen(true);
        setMessages([
          { role: 'user', content: vEmail },
          { role: 'user', content: vOtp },
          {
            role: 'assistant',
            content: `Email verified successfully! 🎉 Welcome to Nexoraa Studio. What would you like to explore? \n\n[OPTIONS]`,
            isNew: true
          }
        ]);
        // Clean URL params without page reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch (e) {
      console.warn('URL auto-verify error', e);
    }
  }, []);

  const handleClearChat = () => {
    playClickSound(600, 0.05);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('nova_chat_history');
        sessionStorage.removeItem('nova_chat_verified');
      } catch (e) {}
    }
    setUserEmail('');
    setOtpToken('');
    setFlowState('awaiting_email');
    setMessages([
      {
        role: 'assistant',
        content: "Hey! 👋 Fresh chat session started.\n\nTo begin our chat, please enter your email address below to verify:",
        isNew: true
      }
    ]);
  };

  // Chat flow state starts at awaiting_email on fresh page load/refresh
  const [flowState, setFlowState] = useState('awaiting_email');
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



  // Synthesize soft click sounds using singleton Web Audio API
  const playClickSound = (freq = 800, dur = 0.04) => {
    try {
      if (typeof window === 'undefined') return;
      if (volume === 0) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
        sharedAudioCtx = new AudioCtx();
      }
      if (sharedAudioCtx.state === 'suspended') {
        sharedAudioCtx.resume().catch(() => { });
      }
      const osc = sharedAudioCtx.createOscillator();
      const gain = sharedAudioCtx.createGain();
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, sharedAudioCtx.currentTime);
      gain.gain.setValueAtTime((volume / 100) * 0.025, sharedAudioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, sharedAudioCtx.currentTime + dur);
      osc.start(sharedAudioCtx.currentTime);
      osc.stop(sharedAudioCtx.currentTime + dur);
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
    }
  ];

  const messagesContainerRef = useRef(null);
  const scrollRafRef = useRef(null);
  const scrollToBottom = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
      scrollRafRef.current = null;
    });
  }, []);

  const markMessageTyped = useCallback((index) => {
    setMessages((prev) =>
      prev.map((msg, i) => (i === index ? { ...msg, isNew: false } : msg))
    );
  }, []);

  const handleSendRef = useRef();
  const onReplyClick = useCallback((text) => {
    if (handleSendRef.current) {
      handleSendRef.current(text);
    }
  }, []);

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
              ? "Hey! 👋 I'm Spidey, your guide to Nexoraa Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]"
              : "Hey! 👋 I'm Spidey, your guide to Nexoraa Studio. Great to have you here!\n\nTo start our conversation, please enter your email address below to verify:",
            isNew: true
          }
        ]);
      }, 350);
    }
  }, [isOpen, flowState]);

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


  const THINKING_DELAY_MS = 3200; // 3.2s minimum thinking time to showcase floating wave animation

  const handleSend = async (textOverride) => {
    const text = textOverride || inputValue.trim();
    if (!text) return;

    if (flowState === 'awaiting_email' || flowState === 'init') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text.trim())) {
        // Append user message and error prompt
        const nextMsgs = [...messages, { role: 'user', content: text }];
        setMessages(nextMsgs);
        setInputValue('');
        setIsLoading(true);
        setTimeout(() => {
          setMessages([...nextMsgs, {
            role: 'assistant',
            content: "That doesn't look like a valid email address. Please enter a valid email address to verify and start chatting:",
            isNew: true
          }]);
          setIsLoading(false);
        }, THINKING_DELAY_MS);
        return;
      }

      // Valid email - send OTP
      const nextMsgs = [...messages, { role: 'user', content: text.trim() }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);
      setUserEmail(text.trim());

      const startTime = Date.now();
      try {
        const res = await fetch('/api/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'send', email: text.trim() })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.details || errData.error || 'Failed to send OTP');
        }

        const data = await res.json();
        setOtpToken(data.token);
        setFlowState('awaiting_otp');

        const fallbackCode = data.message?.includes('OTP') ? data.message.split(': ')[1]?.trim() : null;

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }

        setMessages([...nextMsgs, {
          role: 'assistant',
          content: fallbackCode
            ? `I've generated your verification code. In dev/testing mode, your code is **${fallbackCode}** (or test code **123456**). Please enter it below:`
            : `I've sent a verification code to **${text.trim()}**. Please enter the code below to start our chat (check your spam folder as well):`,
          isNew: true
        }]);
      } catch (err) {
        console.error(err);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
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
      const trimmedText = text.trim();
      // If user provided a different email, update and send fresh OTP
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(trimmedText)) {
        const nextMsgs = [...messages, { role: 'user', content: trimmedText }];
        setMessages(nextMsgs);
        setInputValue('');
        setIsLoading(true);
        setUserEmail(trimmedText);

        const startTime = Date.now();
        try {
          const res = await fetch('/api/otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'send', email: trimmedText })
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.details || errData.error || 'Failed to send OTP');
          }

          const data = await res.json();
          setOtpToken(data.token);

          const fallbackCode = data.message?.includes('OTP') ? data.message.split(': ')[1]?.trim() : null;

          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
          if (remaining > 0) {
            await new Promise((resolve) => setTimeout(resolve, remaining));
          }

          setMessages([...nextMsgs, {
            role: 'assistant',
            content: fallbackCode
              ? `Updated email to **${trimmedText}**. In dev mode, your code is **${fallbackCode}** (or test code **123456**). Please enter it below:`
              : `Updated email to **${trimmedText}**. Verification code sent! Please enter it below:`,
            isNew: true
          }]);
        } catch (err) {
          console.error(err);
          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
          if (remaining > 0) {
            await new Promise((resolve) => setTimeout(resolve, remaining));
          }
          setMessages([...nextMsgs, {
            role: 'assistant',
            content: `Failed to send code to ${trimmedText} (${err.message}). Please check and try again:`,
            isNew: true
          }]);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      const nextMsgs = [...messages, { role: 'user', content: trimmedText }];
      setMessages(nextMsgs);
      setInputValue('');
      setIsLoading(true);

      const startTime = Date.now();
      try {
        const res = await fetch('/api/otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'verify',
            email: userEmail,
            otp: trimmedText,
            token: otpToken
          })
        });

        if (!res.ok) {
          throw new Error('Invalid OTP');
        }

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }

        // Verified in RAM for this session; not saved to sessionStorage so refresh resets as requested
        setFlowState('completed');
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: "Email verified successfully! 🎉 Welcome to Nexoraa Studio. What would you like to explore? \n\n[OPTIONS]",
          isNew: true
        }]);
      } catch (err) {
        console.error(err);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }
        setMessages([...nextMsgs, {
          role: 'assistant',
          content: "The verification code you entered is incorrect or expired. Please check and try again:",
          isNew: true
        }]);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // STRICT GUARD: If not completed, do not allow regular chat
    if (flowState !== 'completed') {
      return;
    }

    // Instant responses for specific quick-reply buttons (free-form queries go to the AI model)
    if (text === '🏢 About Nexoraa') {
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
• **Email**: contact@nexoraa.works
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
      }, THINKING_DELAY_MS);
      return;
    }

    if (text === '👥 Meet the Team') {
      const teamResponse = `We have an exceptional, remote-first team of experts led by our Founder & CEO, **Milan**.

**Core Team & Leadership:**
• **Milan Pandavadara** — Founder & CEO (Full Stack Architect)
• **Gaurav Thakur** — Technical Lead (Mobile & Backend Systems)
• **Alis Patel** — Full-Stack Architect (Node.js & DevOps)
• **Abhishek Jha** — Backend Developer (Java & Systems)
• **Stany Gregor** — Software Engineer (Web Systems)
• **Divyansh** — Software Engineer (Frontend Engineer)
• **Rajkumar Shah** — Software Engineer (Web Systems)

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
      }, THINKING_DELAY_MS);
      return;
    }

    if (text === '🚀 Our Services') {
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
      }, THINKING_DELAY_MS);
      return;
    }

    if (text === '⚡ Our Process') {
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
      }, THINKING_DELAY_MS);
      return;
    }

    if (text === '💰 Pricing & Packages') {
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
      }, THINKING_DELAY_MS);
      return;
    }

    if (text === '📩 Contact Us') {
      const contactResponse = `We'd love to collaborate on your next premium project! You can connect with us directly:

• 📩 **Email**: [contact@nexoraa.works](mailto:contact@nexoraa.works)
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
      }, THINKING_DELAY_MS);
      return;
    }

    // Normal chat handler (flowState === 'completed' or fallback)
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    const startTime = Date.now();
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
      const aiReply = data.reply || data.content?.[0]?.text || data.message || "I'm here to help! What's on your mind?";

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setMessages([...newMessages, {
        role: 'assistant',
        content: aiReply,
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
        fallbackResponse = "Hey! 👋 I'm Spidey, your guide to Nexoraa Studio. Great to have you here! What would you like to explore? \n\n[OPTIONS]";
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
• **Email**: contact@nexoraa.works
• **Phone**: +91 7383303388

Would you like to learn more about **Meet the Team**, **Our Services**, or **Contact Us**? \n\n[OPTIONS]`;
      } else if (lowerText.includes('team')) {
        fallbackResponse = "We have an exceptional, remote-first team of experts led by our Founder & CEO, **Milan**.\n\n**Core Team & Leadership:**\n• **Milan Pandavadara** — Founder & CEO (Full Stack Architect)\n• **Gaurav Thakur** — Technical Lead (Mobile & Backend Systems)\n• **Alis Patel** — Full-Stack Architect (Node.js & DevOps)\n• **Abhishek Jha** — Backend Developer (Java & Systems)\n• **Stany Gregor** — Software Engineer (Web Systems)\n• **Divyansh** — Software Engineer (Frontend Engineer)\n• **Rajkumar Shah** — Software Engineer (Web Systems)\n\nWhat would you like to explore? \n\n[OPTIONS]";
      } else if (lowerText.includes('services')) {
        fallbackResponse = "Nexoraa Studio offers premium end-to-end digital solutions:\n\n• **Web & Mobile App Development**: React/Next.js/Vite and robust mobile apps.\n• **Brand & Design**: Stunning, cohesive brand identities and conversion-optimized UI/UX.\n• **Automation & AI Integration**: Custom AI pipelines and chatbot integrations.\n• **DevOps & Cloud Systems**: Secure, scalable setup on AWS, Vercel, and Supabase.\n• **SEO**: Advanced SEO audit and implementation for visibility.\n\nWhat are you looking to build? \n\n[OPTIONS]";
      } else if (lowerText.includes('contact')) {
        fallbackResponse = "We'd love to collaborate on your next premium project!\n\n• 📩 **Email**: contact@nexoraa.works\n• 📞 **Phone**: +91 7383303388\n• 💼 **LinkedIn**: https://www.linkedin.com/in/milan-pandavdara/\n• 🌐 **Portfolio**: https://www.walterhydra.me\n\nLet us know how we can help! \n\n[OPTIONS]";
      } else if (lowerText.includes('pricing') || lowerText.includes('package')) {
        fallbackResponse = `💰 **Nexoraa Pricing & Packages**
We offer transparent, package-based pricing:

• **Starter Package** (₹15,000 / $200): Best for landing pages and simple business sites.
• **Growth Package** (₹35,000 / $450): Best for dynamic business websites. React/Next.js build.
• **Scale Package** (₹75,000+ / $950+): Best for custom web platforms and e-commerce. Full-stack database architecture.

What package matches your requirements? \n\n[OPTIONS]`;
      }

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, THINKING_DELAY_MS - elapsed);
      setTimeout(() => {
        setMessages([...newMessages, { role: 'assistant', content: fallbackResponse, isNew: true }]);
        setIsLoading(false);
      }, remaining);
      return;
    }

    setIsLoading(false);
  };
  handleSendRef.current = handleSend;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      playClickSound(850, 0.03);
      handleSend();
    }
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
                src="/docs/Nexoraa_Client_Agreement.pdf#toolbar=0&navpanes=0"
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
                href="/docs/Nexoraa_Client_Agreement.pdf"
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
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-center text-white placeholder-gray-600 focus:outline-none transition-all duration-300 font-mono text-xs tracking-wider ${internIdError
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
                src="/docs/Nexoraa_Studio_NDA.pdf#toolbar=0&navpanes=0"
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
                href="/docs/Nexoraa_Studio_NDA.pdf"
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
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
            className="fixed bottom-4 md:bottom-6 right-3 md:right-6 w-[calc(100vw-24px)] md:w-[720px] max-w-[720px] h-[540px] max-h-[calc(100vh-110px)] z-[100] flex items-center justify-center overflow-visible select-none transform-gpu will-change-transform"
          >
            {/* Physical Tablet Frame */}
            <div className="relative w-full h-full bg-[#080d19] border border-white/15 rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2.5 sm:p-3.5 flex flex-col overflow-visible">

              {/* Front Camera Dot with Optical sensor */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#111] border border-white/10 flex items-center justify-center z-50">
                <div className="w-1 h-1 rounded-full bg-red-500" />
              </div>

              {/* Physical Volume Buttons on Left Edge */}
              <button
                onClick={() => handleVolumeChange(10)}
                aria-label="Volume Up"
                className="absolute left-[-5px] top-24 w-[5px] h-9 bg-[#1e293b] hover:bg-[#334155] active:translate-x-[2px] transition-all border border-white/10 border-r-0 rounded-l-[5px] cursor-pointer shadow-lg z-0"
              />
              <button
                onClick={() => handleVolumeChange(-10)}
                aria-label="Volume Down"
                className="absolute left-[-5px] top-[140px] w-[5px] h-9 bg-[#1e293b] hover:bg-[#334155] active:translate-x-[2px] transition-all border border-white/10 border-r-0 rounded-l-[5px] cursor-pointer shadow-lg z-0"
              />

              {/* Physical Power / Switch Button on Top Edge */}
              <button
                onClick={() => {
                  playClickSound(500, 0.08);
                  setIsOpen(false);
                }}
                title="Power Off / Close (Esc)"
                aria-label="Power Switch"
                className="absolute right-14 top-[-5px] w-12 h-[5px] bg-[#1e293b] hover:bg-[#334155] active:translate-y-[2px] transition-all border border-white/10 border-b-0 rounded-t-[5px] cursor-pointer shadow-lg z-0"
              />

              {/* Speaker Grille Detail */}
              <div className="absolute left-14 top-1.5 flex gap-1 z-50">
                <div className="w-1.5 h-0.5 bg-white/20 rounded-full" />
                <div className="w-1.5 h-0.5 bg-white/20 rounded-full" />
                <div className="w-1.5 h-0.5 bg-white/20 rounded-full" />
                <div className="w-1.5 h-0.5 bg-white/20 rounded-full" />
              </div>

              {/* Screen Area Container */}
              <div className="flex-1 flex flex-col bg-[#080B13] rounded-[24px] overflow-hidden border border-white/10 relative h-full w-full">

                {/* Volume HUD */}
                <AnimatePresence>
                  {showVolumeHud && (
                    <m.div
                      initial={{ opacity: 0, x: -15, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -15, scale: 0.95 }}
                      className="absolute left-4 top-32 z-50 bg-[#0F172A]/95 border border-red-500/30 rounded-2xl p-2.5 flex flex-col items-center gap-1.5 shadow-2xl backdrop-blur-md w-9"
                    >
                      <span className="text-[8px] font-black text-red-400 tracking-wider font-mono">VOL</span>
                      <div className="w-1.5 h-16 bg-white/10 rounded-full overflow-hidden relative">
                        <div
                          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-red-600 via-rose-500 to-sky-400 rounded-full transition-all duration-150"
                          style={{ height: `${volume}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-mono font-bold text-white">{volume}%</span>
                    </m.div>
                  )}
                </AnimatePresence>

                {/* Main Chat Console */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10 min-w-0">

                  {/* Subtle Spider Silhouette Watermark - Ultra-clean, zero glow */}
                  <div className="absolute inset-0 pointer-events-none select-none contain-strict flex items-center justify-center overflow-hidden z-0">
                    <svg
                      viewBox="0 0 96 96"
                      fill="currentColor"
                      className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] text-red-500 opacity-[0.045]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M50.4431 44.6386L50.703 44.1559C53.3391 45.6906 59.4431 49.3762 62.7698 51.8416C62.745 53.9208 62.5247 59.401 61.8416 64.6881C61.5322 67.3243 60.2599 73.8589 57.646 78.9084C59.1435 76.9158 62.4876 71.3713 63.8836 65.1337C64.3663 63.3639 65.4653 58.0495 66 50.9505C63.1534 49.3045 56.1683 45.5223 51 43.5619L51.3713 42.7822C55.1955 43.8342 64.1287 46.5025 69.2673 48.7599C69.1559 51.4332 68.495 58.4505 66.7426 65.1337C65.8371 68.5866 63.3416 77.4752 56.2723 86C56.3697 85.8994 56.4882 85.78 56.6273 85.6398C58.1308 84.1248 62.0302 80.1956 67.5223 71.6312C70.2698 66.5446 72.0891 60.6782 74.3911 46.7178C68.9703 44.9728 61.5817 43.0421 51.594 42.0025L51.8911 41.4084C55.6039 41.2104 64.2772 41.0743 69.2673 42.1139C69.8366 38.3144 69.6312 29.4975 65.146 24.6262C66.1361 27.3366 67.9827 34.0569 66.5569 39.255C62.9307 39.2302 54.9431 39.3812 52.0025 40.1832L51.5198 39.552C53.698 38.2525 58.6708 35.5421 61.1361 35.0965C61.1442 35.0372 61.1523 34.9774 61.1605 34.9172C61.8684 29.7099 62.9799 21.5342 55.4554 11C57.2747 14.75 60.2153 23.802 58.3143 33.2772L50.9257 38.6609L50.3688 37.8812L52.6336 35.5421C52.2252 34.8738 51.0074 33.3812 49.4035 32.7574C50.1708 33.6733 51.2079 35.698 49.2178 36.4703H46.2846C45.4307 36.2475 44.198 35.1931 46.099 32.7574C45.3193 33.1163 43.604 34.1757 42.9802 35.5421L44.6881 37.5842L44.3168 38.3267L37.1881 33.3144C36.3465 29.6881 35.6584 20.1559 39.6386 11.0371C39.3184 11.6268 39.0101 12.189 38.7142 12.7287C34.6868 20.0738 32.9356 23.2677 34.1807 35.0965C35.5792 35.3936 39.3639 36.6856 43.3144 39.4777L43.0916 39.9604C39.7005 39.6386 32.0941 39.0619 28.797 39.3292C28.2277 36.6807 27.7054 30.0322 30.1708 24.6262C26.2723 30.1213 25.4926 34.1312 26.1609 42.2252C28.9703 41.6807 36.2896 40.755 43.0916 41.4084L43.3144 42.0025C38.3144 42.6337 26.8515 44.4604 21 46.7178C21.1638 47.5953 21.3229 48.4557 21.4788 49.2991C22.9129 57.0566 24.0818 63.3797 26.2723 68.3639C29.9854 75.5044 33.156 79.1728 37.0129 83.6354C37.6683 84.3937 38.3435 85.1749 39.0446 86C33.0668 77.7203 26.8738 67.3243 26.1609 48.7599C30.0965 47.1881 39.1931 43.7921 44.0941 42.7822L44.4282 43.5619C40.4183 45.2574 31.7673 49.0941 29.5396 50.8762C29.5642 51.2066 29.5884 51.5383 29.6127 51.8715C30.1759 59.5913 30.7984 68.1239 37.5965 78.9084C35.4802 74.2673 33.0891 68.9802 32.5842 51.8416C35.5173 49.8738 42.0446 45.5817 44.6881 44.1559L44.9851 44.6386C43.6485 45.4926 40.5446 47.6386 38.8218 49.3911C38.7104 50.1089 38.5545 52.7847 38.8218 57.745C40.0965 60.0594 43.6559 65.0668 47.6955 66.5817C49.7624 65.7401 54.4084 62.7946 56.4579 57.745C56.6188 56.5569 56.9035 53.2376 56.7549 49.4653C55.5173 48.3391 52.5223 45.797 50.4431 44.6386ZM40.5 49.5L43.5 47L41.5 50C41.5 55.5 43.3217 59.0567 47.8 60.8C53.0938 57.745 54 55 54 50L52 47L55.2 49.8C55.2951 52.3648 55.4229 53.7895 54.7 56.5C53.5 59.5 51.5 61.5 47.7 63.8C44 61.5 43 60 40.7 56.5C40.3164 53.5132 40.1274 51.9879 40.5 49.5Z"
                      />
                    </svg>
                  </div>

                  {/* Header - Compact & sleek for maximum screen real estate */}
                  <div className="bg-[#080C16] border-b border-white/10 px-4 sm:px-5 py-2.5 flex items-center justify-between z-10 shrink-0 shadow-sm">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 p-0.5 border border-white/15 overflow-hidden">
                          <img src="/images/spider-man-aesthetic-738pim4mwbf8349v.webp" alt="Spidey" className="w-full h-full rounded-full object-cover object-[50%_10%]" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#080C16] rounded-full">
                          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-bold text-sm sm:text-[15px] tracking-tight leading-tight">
                            Spidey
                          </h3>
                        </div>
                        <p className="text-gray-400 text-[10px] sm:text-[11px] flex items-center gap-1.5 font-light leading-tight mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                          Nexoraa Studio · Always Online
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleClearChat}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
                        title="New Chat / Reset Conversation"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          playClickSound(500, 0.08);
                          setIsOpen(false);
                          setActiveDocument(null);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-200 cursor-pointer shadow-sm group"
                        title="Close / Minimize (Esc)"
                        aria-label="Close Tablet"
                      >
                        <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
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
                          className={`flex-1 flex flex-col overflow-hidden bg-[#070b14]/98 relative z-10 min-h-0 h-full ${activeDocument ? 'p-3 pb-2' : 'p-6'
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
                            className="flex-1 overflow-y-auto overscroll-contain will-change-scroll p-3.5 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent relative z-0 text-left min-h-0"
                          >
                            <div className="max-w-3xl mx-auto w-full space-y-4">
                              {messages.map((msg, idx) => (
                                <ChatMessageItem
                                  key={idx}
                                  msg={msg}
                                  idx={idx}
                                  onComplete={markMessageTyped}
                                  onWordTyped={scrollToBottom}
                                  onReplyClick={onReplyClick}
                                />
                              ))}

                              {/* Loading Indicator */}
                              {isLoading && (
                                <div className="flex justify-start w-full animate-fade-in">
                                  <div className="flex gap-2.5 max-w-[85%] items-start">
                                    <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden border border-red-500/30 mt-0.5 shadow-sm bg-black/40">
                                      <img
                                        src="/images/spider-man-aesthetic-738pim4mwbf8349v.webp"
                                        alt="Spidey"
                                        className="w-full h-full object-cover object-[50%_10%]"
                                      />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <span className="text-[11px] font-semibold text-gray-300 mb-1 px-1 flex items-center gap-1.5">Spidey</span>
                                      <div className="px-4 py-3 rounded-none bg-[#0C101A] border border-white/10 flex items-center gap-3 shadow-sm">
                                        {/* Floating wave animated 3 dots */}
                                        <div className="flex items-center gap-1.5 h-4 px-0.5">
                                          <m.span
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{
                                              duration: 0.9,
                                              repeat: Infinity,
                                              ease: "easeInOut",
                                              delay: 0
                                            }}
                                            className="w-2 h-2 rounded-full bg-red-500 inline-block"
                                          />
                                          <m.span
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{
                                              duration: 0.9,
                                              repeat: Infinity,
                                              ease: "easeInOut",
                                              delay: 0.18
                                            }}
                                            className="w-2 h-2 rounded-full bg-red-500 inline-block"
                                          />
                                          <m.span
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{
                                              duration: 0.9,
                                              repeat: Infinity,
                                              ease: "easeInOut",
                                              delay: 0.36
                                            }}
                                            className="w-2 h-2 rounded-full bg-red-500 inline-block"
                                          />
                                        </div>
                                        <span className="text-[12px] text-gray-400 font-medium tracking-wide">Thinking...</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div ref={messagesEndRef} className="shrink-0 h-px" />
                            </div>
                          </div>

                          {/* Input Area - Compact & Professional */}
                          <div className="px-3.5 py-2.5 sm:px-5 sm:py-3 bg-[#080C16] border-t border-white/10 z-10 shrink-0">
                            <div className="max-w-3xl mx-auto w-full">
                              <div className="flex items-center gap-2 bg-[#0C101A] border border-white/15 focus-within:border-red-500/70 rounded-none px-3 py-1.5 transition-colors">
                                <input
                                  type={flowState === 'awaiting_email' ? 'email' : 'text'}
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyPress={handleKeyPress}
                                  placeholder={
                                    flowState === 'awaiting_email' || flowState === 'init'
                                      ? "Enter your email address to continue..."
                                      : flowState === 'awaiting_otp'
                                      ? "Enter verification code (e.g. 123456)..."
                                      : "Ask Spidey anything (services, pricing, timeline, tech stack)..."
                                  }
                                  className="flex-1 bg-transparent py-1 text-[13.5px] text-white placeholder-gray-500 focus:outline-none font-normal"
                                />
                                <button
                                  onClick={() => {
                                    playClickSound(850, 0.03);
                                    handleSend();
                                  }}
                                  disabled={!inputValue.trim() || isLoading}
                                  aria-label={
                                    flowState === 'awaiting_email' || flowState === 'init'
                                      ? "Submit email address"
                                      : flowState === 'awaiting_otp'
                                      ? "Verify OTP code"
                                      : "Send message"
                                  }
                                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-none bg-red-600 hover:bg-red-500 text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div> {/* Close Right Chat Console Panel */}

              </div> {/* Close Screen Area Container */}
            </div> {/* Close Physical Tablet Frame */}
          </m.div>
        )}
      </AnimatePresence>

      {/* Toggle Area */}
      {!isOpen && (
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
              {/* Main card - Clean professional, no red border on hover */}
              <div className="relative flex items-center gap-3 px-4.5 py-3 rounded-2xl bg-[#090C15] border border-white/10 group-hover:border-white/20 shadow-2xl transition-all duration-300 overflow-hidden">

                  {/* Sweep highlight */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"></div>

                  {/* Avatar */}
                  <div className="relative flex-shrink-0 w-9 h-9 z-10">
                    <div className="w-full h-full rounded-full bg-[#121622] flex items-center justify-center border border-white/15 overflow-hidden">
                      <img src="/images/spider-man-aesthetic-738pim4mwbf8349v.webp" alt="Spidey" className="w-full h-full object-cover object-[50%_10%] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Online dot */}
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#090C15] rounded-full z-20"></div>
                  </div>

                  {/* Text - Professional simple text with Quicksand font */}
                  <div className="text-left relative z-10 mr-1">
                    <span className="text-[14px] text-gray-200 group-hover:text-white transition-colors duration-200 font-quicksand font-semibold whitespace-nowrap tracking-wide">
                      How can I help you today?
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.05] group-hover:bg-white/10 flex items-center justify-center ml-auto transition-all duration-200 z-10">
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-200 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* The Bot Button - Clean crisp edges, NO blurry aura/glow */}
          <m.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-[#090C15] rounded-full shadow-2xl flex items-center justify-center border-2 border-white/15 hover:border-white/30 overflow-visible relative group cursor-pointer transition-colors duration-300"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <m.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center bg-red-600 rounded-full z-10 relative"
                >
                  <X className="w-6 h-6 text-white" />
                </m.div>
              ) : (
                <m.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center z-10 p-1"
                >
                  {/* Spidey Avatar */}
                  <m.div
                    className="w-full h-full rounded-full overflow-hidden border border-white/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  >
                    <img src="/images/spider-man-aesthetic-738pim4mwbf8349v.webp" alt="Spidey Chat" className="w-full h-full object-cover object-[50%_10%]" />
                  </m.div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Unread indicator dot */}
            {!isOpen && messages.length === 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#090C15] rounded-full"></span>
            )}
          </m.button>
        </div>
      )}

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
