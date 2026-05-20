import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import {
  Activity, Clock, FileText, CheckCircle2, ChevronRight, Lock,
  Code2, Zap, Download, LayoutDashboard, CreditCard, Settings,
  LogOut, Mail, Key, Globe, Search, Bell, Terminal, Users, CheckSquare, File, MessageCircle, MoreHorizontal, HelpCircle, Receipt, History, X, Send, Eye, EyeOff, Sparkles, SendHorizontal, CreditCard as CardIcon, FileCheck, Check, Laptop, ShieldCheck, ChevronDown, Video, Mic, Volume2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// --- PREMIUM HIGH-GRAPHIC SUB-COMPONENTS ---

// 1. Dynamic Connected HTML5 Canvas Particle Field
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    const particleCount = 50;
    let mouse = { x: null, y: null, radius: 160 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particles with starting orbits & velocities
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render nodes
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Push/pull particles based on mouse proximity
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.2;
            p.y += Math.sin(angle) * force * 1.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 245, 255, 0.2)';
        ctx.fill();
      });

      // Draw connection vectors
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(123, 47, 255, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />;
};

// 2. Interactive Spotlight Card with Mouse-Tracking Background
const SpotlightCard = ({ children, className = "" }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#07070a]/60 backdrop-blur-md transition-all duration-300 ${className}`}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.06) 0%, transparent 70%)',
            left: `${coords.x - 160}px`,
            top: `${coords.y - 160}px`,
            zIndex: 0,
          }}
        />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

// 3. Live Stream Developer Webcam Simulator
const DevWebcam = () => {
  const [fps, setFps] = useState(30);
  const [bitrate, setBitrate] = useState(6.2);
  const [latency, setLatency] = useState(18);

  useEffect(() => {
    const timer = setInterval(() => {
      setFps(Math.floor(29 + Math.random() * 2));
      setBitrate(parseFloat((5.8 + Math.random() * 0.8).toFixed(1)));
      setLatency(Math.floor(14 + Math.random() * 6));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-1 flex flex-col shrink-0">
      {/* Live Blinker Tag */}
      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-full border border-red-500/30">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
        <span className="text-[8px] font-black uppercase text-red-400 tracking-wider">DEV LIVE</span>
      </div>

      {/* Stats overlay */}
      <div className="absolute bottom-2.5 left-2.5 z-20 text-[9px] font-mono text-gray-400 bg-black/70 px-2 py-1 rounded border border-white/5 space-y-0.5">
        <div>FEED: <span className="text-white">MILAN_CORE</span></div>
        <div>FPS: <span className="text-white">{fps}</span></div>
        <div>BITRATE: <span className="text-white">{bitrate} Mbps</span></div>
        <div>PING: <span className="text-white">{latency}ms</span></div>
      </div>

      {/* webcam Viewport */}
      <div className="relative aspect-video w-full rounded-xl bg-[#09090e] overflow-hidden flex items-center justify-center border border-white/5">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(0,245,255,0.03),_rgba(123,47,255,0.02),_rgba(0,245,255,0.03))] bg-[size:100%_4px,_6px_100%] opacity-20" />

        {/* Video feed illustration */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="w-9 h-9 rounded-full border border-accent-primary/20 flex items-center justify-center bg-accent-primary/5 animate-pulse">
            <Video className="w-4 h-4 text-accent-primary" />
          </div>
          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">Milan_Dev_Desk</span>
        </div>
      </div>
    </div>
  );
};

// 4. Voice-Briefing Component with Animated SVG Frequency Bars
const AudioBriefing = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [waveAmplitudes, setWaveAmplitudes] = useState(new Array(18).fill(4));
  const intervalRef = useRef(null);

  const handlePlayToggle = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return p + 1.2;
        });
        setWaveAmplitudes(Array.from({ length: 18 }, () => Math.floor(Math.random() * 18) + 3));
      }, 150);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 flex items-center gap-5 backdrop-blur-md">
      <button
        onClick={handlePlayToggle}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isPlaying ? 'bg-accent-violet text-white shadow-lg shadow-accent-violet/20' : 'bg-accent-primary text-black hover:bg-cyan-400 shadow-md shadow-accent-primary/10'}`}
      >
        {isPlaying ? (
          <X className="w-5 h-5" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current translate-x-0.5"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-accent-primary" /> Gaurav's Voice Briefing
          </span>
          <span className="text-[9px] text-gray-500 font-mono">2:14 min</span>
        </div>
        {/* Animated Audio visualizer waveform */}
        <div className="flex items-end gap-1 h-8 mt-2">
          {waveAmplitudes.map((amp, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-accent-primary to-accent-violet rounded-full transition-all duration-150"
              style={{
                height: isPlaying ? `${amp * 5}%` : '15%',
                opacity: isPlaying ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 5. SVG Radar performance spider coordinates chart
const RadarPerformanceChart = () => {
  const [hoveredMetric, setHoveredMetric] = useState(null);

  const metrics = [
    { name: "Design", value: 92, label: "Figma Assets" },
    { name: "Speed", value: 95, label: "Render Lag" },
    { name: "Security", value: 98, label: "Auth Keys" },
    { name: "Integrity", value: 90, label: "API Sync" },
    { name: "Quality", value: 94, label: "QA Checks" }
  ];

  const cx = 100;
  const cy = 100;
  const r = 70;

  const getPoints = (scale = 1) => {
    return metrics.map((m, i) => {
      const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
      const val = (m.value / 100) * r * scale;
      const x = cx + Math.cos(angle) * val;
      const y = cy + Math.sin(angle) * val;
      return { x, y, name: m.name, value: m.value, angle };
    });
  };

  const activePoints = getPoints(1);
  const pointsStr = activePoints.map(p => `${p.x},${p.y}`).join(' ');

  const bgGrids = [0.4, 0.7, 1.0].map((scale) => {
    return getPoints(scale).map(p => `${p.x},${p.y}`).join(' ');
  });

  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Background polygons grids */}
          {bgGrids.map((grid, idx) => (
            <polygon
              key={idx}
              points={grid}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}

          {/* Background Axes lines */}
          {metrics.map((_, i) => {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const ax = cx + Math.cos(angle) * r;
            const ay = cy + Math.sin(angle) * r;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={ax}
                y2={ay}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            );
          })}

          {/* Performance Radar polygon area */}
          <polygon
            points={pointsStr}
            fill="rgba(0, 245, 255, 0.12)"
            stroke="#00F5FF"
            strokeWidth="2"
            className="drop-shadow-[0_0_6px_rgba(0,245,255,0.5)]"
          />

          {/* Coordinate Nodes */}
          {activePoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill="#7B2FFF"
              stroke="#00F5FF"
              strokeWidth="1.5"
              className="cursor-pointer transition-all hover:scale-125"
              onMouseEnter={() => setHoveredMetric(metrics[i])}
              onMouseLeave={() => setHoveredMetric(null)}
            />
          ))}

          {/* Axis Labels */}
          {metrics.map((m, i) => {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const lx = cx + Math.cos(angle) * (r + 18);
            const ly = cy + Math.sin(angle) * (r + 10);
            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="9"
                fontWeight="bold"
                className="font-mono uppercase tracking-wider"
              >
                {m.name}
              </text>
            );
          })}
        </svg>

        {/* Radar Value Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {hoveredMetric ? (
            <div className="text-center bg-[#07070a] border border-white/10 px-2 py-1 rounded-lg">
              <div className="text-[9px] uppercase tracking-wider text-accent-primary font-bold">{hoveredMetric.name}</div>
              <div className="text-xs font-bold text-white">{hoveredMetric.value}%</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">Pulse</div>
              <div className="text-sm font-black text-white">94.8</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 6. Styled Google Login Handler
const GoogleLoginButton = ({ onLoginSuccess }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleFakeGoogleLogin = () => {
    setIsGoogleLoading(true);
    const popup = window.open('', 'Google Sign In', 'width=500,height=600,left=200,top=200');
    if (popup) {
      popup.document.write(`
        <html><head><title>Sign in - Google Accounts</title>
        <style>
          body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;background:#0d0d12;color:#fff;}
          .card{background:#13131a;border:1px solid rgba(255,255,255,0.08);padding:40px;border-radius:20px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.5);width:320px;}
          .loader{border:3px solid #1f1f2e;border-top:3px solid #00F5FF;border-radius:50%;width:40px;height:40px;animation:spin 1s linear infinite;margin:0 auto 24px;}
          @keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
          .text{font-size:18px;font-weight:600;margin-bottom:8px;}
          .subtext{color:#8f90a6;font-size:14px;}
          .logo{width:60px;margin-bottom:24px;}
        </style></head>
        <body>
          <div class="card">
            <svg class="logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <div class="loader"></div>
            <div class="text">Connecting to Google...</div>
            <div class="subtext">Signing in as Alex Client</div>
          </div>
        </body></html>
      `);

      setTimeout(() => {
        popup.close();
        setIsGoogleLoading(false);
        onLoginSuccess({
          name: "Alex Client",
          email: "alex@company.com",
          picture: "https://ui-avatars.com/api/?name=Alex+Client&background=00F5FF&color=050505&size=128"
        });
      }, 2000);
    } else {
      setTimeout(() => {
        setIsGoogleLoading(false);
        onLoginSuccess({
          name: "Alex Client",
          email: "alex@company.com",
          picture: "https://ui-avatars.com/api/?name=Alex+Client&background=00F5FF&color=050505&size=128"
        });
      }, 1000);
    }
  };

  return (
    <button
      onClick={handleFakeGoogleLogin}
      disabled={isGoogleLoading}
      className="w-full mb-6 flex items-center justify-center gap-3 px-4 py-3.5 border border-white/10 rounded-xl bg-[#0d0d12] hover:bg-[#13131a] transition-all text-white font-bold disabled:opacity-50 shadow-md group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-accent-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      {isGoogleLoading ? (
        <div className="w-5 h-5 border-2 border-gray-400 border-t-accent-primary rounded-full animate-spin" />
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      )}
      <span>Sign in with Google</span>
    </button>
  );
};

// 7. Premium Glassmorphic Modal Component
const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-lg bg-[#0d0d12] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,245,255,0.15)] z-10"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-primary via-accent-violet to-accent-secondary" />
          <div className="flex justify-between items-center p-6 border-b border-white/5">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-primary" />
              {title}
            </h3>
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- STATIC DATABASE DATA POOL ---
const DEFAULT_PROJECT_DATA = {
  client: "Nova Corp",
  project: "E-Commerce Replatforming",
  status: "In Progress",
  timeline: [
    { id: 1, title: "Discovery & Architecture", status: "completed", date: "Oct 1", desc: "Technical spec definition and infrastructure scoping.", lead: "Milan", deliverables: ["Architecture_Specs_v1.pdf", "API_Endpoints_Schema.json"] },
    { id: 2, title: "UI/UX Design System", status: "completed", date: "Oct 3", desc: "High-fidelity wireframes, UI kits, and design prototypes.", lead: "Abhishek", deliverables: ["Design_System_v2.fig", "Sprint_1_Wireframes.fig"] },
    { id: 3, title: "Frontend Development", status: "in-progress", date: "Oct 5", desc: "Building core views, animations, and portal dashboard.", lead: "Abhishek", deliverables: ["Sprint_2_Report.docx"] },
    { id: 4, title: "Backend Integration", status: "pending", date: "Oct 7", desc: "Connecting database schemas, APIs, and payment modules.", lead: "Milan", deliverables: [] },
    { id: 5, title: "QA & Launch", status: "pending", date: "Oct 8", desc: "End-to-end testing, regression checks, and DNS switch.", lead: "Gaurav", deliverables: [] }
  ],
  team: [
    { name: "Milan", role: "Lead Engineer", avatar: "/team/milan.png", email: "milan@nexora.com", status: "Online" },
    { name: "Abhishek", role: "UI/UX Designer", avatar: "/team/abhishek.png", email: "abhishek@nexora.com", status: "In a meeting" },
    { name: "Gaurav", role: "Project Manager", avatar: "/team/gaurav.png", email: "gaurav@nexora.com", status: "Online" }
  ],
  actionItems: [
    { id: 1, task: "Review new homepage animations", assignee: "Client", due: "Today", details: "Please review the new Framer Motion animations on the homepage hero section. Let us know if the timing feels right.", completed: false },
    { id: 2, task: "Provide Stripe API keys", assignee: "Client", due: "Tomorrow", details: "We need the production Stripe keys to finalize the checkout flow testing.", completed: false },
    { id: 3, task: "Finalize product taxonomy", assignee: "Client", due: "Oct 6", details: "Confirm the nested category structure for the new store catalog.", completed: false }
  ],
  recentFiles: [
    { name: "Design_System_v2.fig", type: "Figma", size: "12 MB" },
    { name: "Architecture_Diagram.pdf", type: "PDF", size: "2.4 MB" },
    { name: "Sprint_2_Report.docx", type: "Doc", size: "1.1 MB" }
  ],
  supportTickets: [
    { id: "TIC-102", subject: "API Integration Request", status: "Open", priority: "High", messages: [{ sender: "Client", text: "We need to connect the new CRM to the lead form." }, { sender: "Agent", text: "Got it! Looking into the endpoints now." }] },
    { id: "TIC-101", subject: "Update Logo Assets", status: "Resolved", priority: "Low", messages: [{ sender: "Agent", text: "Logo has been updated in the header." }] }
  ]
};

const LOG_POOL = [
  "nexora@nova-corp:~$ npm run lint",
  "Checking source files for code standards...",
  "All 24 source files passed style checks cleanly.",
  "nexora@nova-corp:~$ git push origin master",
  "Sending updates to GitHub repository...",
  "Branch 'master' updated with commit 9b9470f2.",
  "nexora@nova-corp:~$ npm run test",
  "Executing 18 integration test suites...",
  "All test cases executed. [100% PASS]",
  "nexora@nova-corp:~$ ./sync-assets.sh",
  "Pushing media catalog to production CDN...",
  "Assets synced successfully. (Latency: 14ms)",
  "nexora@nova-corp:~$ run diagnostics",
  "Checking memory leaks & rendering profiles...",
  "System health: 99.8%. Framerate locked at 60 FPS.",
];

// --- MAIN PORTAL COMPONENT ---
export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('nexora_auth') === 'true');
  const [userProfile, setUserProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nexora_user')); } catch { return null; }
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('nexora_tab') || 'overview');

  const [actionItems, setActionItems] = useState(() => {
    const cached = localStorage.getItem('nexora_action_items');
    return cached ? JSON.parse(cached) : DEFAULT_PROJECT_DATA.actionItems;
  });

  const [billing, setBilling] = useState(() => {
    const cached = localStorage.getItem('nexora_billing');
    return cached ? JSON.parse(cached) : { totalBudget: "$25,000", paid: "$15,000", outstanding: "$10,000", outstandingNum: 10000, paidNum: 15000, nextInvoiceDue: "Oct 15" };
  });

  const [invoices, setInvoices] = useState(() => {
    const cached = localStorage.getItem('nexora_invoices');
    return cached ? JSON.parse(cached) : [
      { id: "INV-001", amount: "$15,000", status: "Paid", date: "Sep 28" },
      { id: "INV-002", amount: "$10,000", status: "Pending", date: "Oct 8" }
    ];
  });

  const [activityLog, setActivityLog] = useState(() => {
    const cached = localStorage.getItem('nexora_activity_log');
    return cached ? JSON.parse(cached) : [
      { action: "Pushed frontend code to staging", time: "2 hours ago", author: "Alex R." },
      { action: "Client approved wireframes", time: "Yesterday", author: "Nova Corp" },
      { action: "Paid Invoice INV-001", time: "2 days ago", author: "Nova Corp" }
    ];
  });

  const [supportTickets, setSupportTickets] = useState(() => {
    const cached = localStorage.getItem('nexora_support_tickets');
    return cached ? JSON.parse(cached) : DEFAULT_PROJECT_DATA.supportTickets;
  });

  const [activeChat, setActiveChat] = useState('#general-project');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(() => {
    const cached = localStorage.getItem('nexora_chat');
    if (cached) return JSON.parse(cached);
    return {
      '#general-project': [
        { sender: "Milan", text: "Welcome to the project portal! Let's use this thread for main project updates.", time: "Oct 1, 10:00 AM" },
        { sender: "Gaurav", text: "Sprint 2 report is published under deliverables. Velocity looks good.", time: "Oct 3, 2:15 PM" }
      ],
      '#design-feed': [
        { sender: "Abhishek", text: "Uploaded Design System v2. Ready for layout reviews.", time: "Oct 2, 4:00 PM" }
      ],
      '#dev-updates': [
        { sender: "Milan", text: "Stripe checkout integrated in staging dev. Awaiting API keys.", time: "Oct 4, 11:30 AM" }
      ],
      'Milan': [
        { sender: "Milan", text: "Hey Alex! How is the checkout flow layout looking to you?", time: "Oct 4, 9:00 AM" }
      ],
      'Abhishek': [
        { sender: "Abhishek", text: "Hi Alex, please let me know when you review the Figma file.", time: "Oct 3, 5:00 PM" }
      ],
      'Gaurav': [
        { sender: "Gaurav", text: "Hi, let me know if you need to schedule a progress sync call this week.", time: "Oct 3, 11:00 AM" }
      ]
    };
  });
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [terminalLogs, setTerminalLogs] = useState([
    "nexora@nova-corp:~$ ./deploy.sh",
    "Compiling Quantum UI components...",
    "Optimizing performance... [100%]",
    "✓ Zero-lag architecture deployed.",
  ]);
  const logIndexRef = useRef(0);

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, data: null });
  const [selectedMilestone, setSelectedMilestone] = useState(3);
  const [signature, setSignature] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [payProgress, setPayProgress] = useState('');

  // LocalStorage state syncing
  useEffect(() => {
    localStorage.setItem('nexora_auth', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('nexora_user', userProfile ? JSON.stringify(userProfile) : '');
    localStorage.setItem('nexora_tab', activeTab);
  }, [isAuthenticated, userProfile, activeTab]);

  useEffect(() => {
    localStorage.setItem('nexora_action_items', JSON.stringify(actionItems));
  }, [actionItems]);

  useEffect(() => {
    localStorage.setItem('nexora_billing', JSON.stringify(billing));
  }, [billing]);

  useEffect(() => {
    localStorage.setItem('nexora_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('nexora_activity_log', JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem('nexora_support_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem('nexora_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Terminal Line Append Interval
  useEffect(() => {
    if (!isAuthenticated || activeTab !== 'overview') return;
    const interval = setInterval(() => {
      setTerminalLogs(prev => {
        const nextLine = LOG_POOL[logIndexRef.current % LOG_POOL.length];
        logIndexRef.current += 1;
        const newLogs = [...prev, nextLine];
        if (newLogs.length > 13) {
          newLogs.shift();
        }
        return newLogs;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeChat, isTyping]);

  const completedActionsCount = actionItems.filter(item => item.completed).length;
  const currentVelocity = 94 + (completedActionsCount * 2);

  const openModal = (type, data) => setModalConfig({ isOpen: true, type, data });
  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setIsCardFlipped(false);
    setIsPaying(false);
    setPayProgress('');
    setSignature('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoginLoading(true);
      setTimeout(() => {
        setIsLoginLoading(false);
        setIsAuthenticated(true);
        setUserProfile({
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email: email,
          picture: null
        });
        toast.success("Welcome back to Nexora!");
      }, 1200);
    }
  };

  const toggleActionItem = (id) => {
    setActionItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newCompleted = !item.completed;
          if (newCompleted) {
            toast.success(`Approved: "${item.task}"`);
            confetti({
              particleCount: 100,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#00F5FF', '#7B2FFF', '#00FF87']
            });
            const newLog = {
              action: `Completed Action "${item.task}"`,
              time: "Just now",
              author: userProfile ? userProfile.name : "Client"
            };
            setActivityLog(prevLogs => [newLog, ...prevLogs]);
          }
          return { ...item, completed: newCompleted };
        }
        return item;
      });
    });
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      toast.error("Please fill out checkout credentials.");
      return;
    }

    setIsPaying(true);
    const steps = [
      "Contacting billing portal...",
      "Encrypting transaction details...",
      "Authorizing invoice settlement...",
      "Updating client ledger..."
    ];

    let step = 0;
    setPayProgress(steps[step]);

    const stepInterval = setInterval(() => {
      step += 1;
      if (step < steps.length) {
        setPayProgress(steps[step]);
      } else {
        clearInterval(stepInterval);
        setIsPaying(false);
        setBilling(prev => ({
          ...prev,
          paid: "$25,000",
          outstanding: "$0",
          paidNum: 25000,
          outstandingNum: 0
        }));

        setInvoices(prev => prev.map(inv => inv.id === "INV-002" ? { ...inv, status: "Paid", date: "Just now" } : inv));

        const newLog = {
          action: "Settled Invoice INV-002 ($10,000)",
          time: "Just now",
          author: userProfile ? userProfile.name : "Client"
        };
        setActivityLog(prevLogs => [newLog, ...prevLogs]);

        confetti({
          particleCount: 160,
          spread: 80,
          origin: { y: 0.65 },
          colors: ['#00F5FF', '#7B2FFF', '#00FF87', '#FF6B35']
        });

        toast.success("Invoice settled successfully!");
        closeModal();
      }
    }, 1000);
  };

  const handleTicketReply = (ticketId, replyText) => {
    if (!replyText.trim()) return;

    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const updated = [...t.messages, { sender: "Client", text: replyText }];
        setTimeout(() => {
          setSupportTickets(prevTickets => prevTickets.map(ticket => {
            if (ticket.id === ticketId) {
              return {
                ...ticket,
                messages: [...ticket.messages, { sender: "Agent", text: "Got it! Our team has flagged this update and is currently reviewing the specifications." }]
              };
            }
            return ticket;
          }));
          toast.success("Support desk reply received.");
        }, 2200);
        return { ...t, messages: updated };
      }
      return t;
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: "You",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), userMsg]
    }));

    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const isChannel = activeChat.startsWith('#');
      const responder = isChannel
        ? (activeChat === '#general-project' ? 'Milan' : activeChat === '#design-feed' ? 'Abhishek' : 'Milan')
        : activeChat;

      let replyText = "";
      if (responder === 'Milan') {
        replyText = "Thanks for verifying! I'll wrap up deployment configuration setup. Once Stripe production keys are loaded, we are good to launch.";
      } else if (responder === 'Abhishek') {
        replyText = "Appreciate the update. I am polishing grid alignments and interactive elements. Let me know if you would like me to push new frames.";
      } else if (responder === 'Gaurav') {
        replyText = "Got your note. I'll log these details directly into our sprint review trackers. We are right on schedule for tomorrow's demo.";
      }

      const teamMsg = {
        sender: responder,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), teamMsg]
      }));

      toast(`Message from ${responder}`, { icon: '💬' });
    }, 2200);
  };

  const handleSignDocument = () => {
    if (!signature.trim()) {
      toast.error("Please insert your e-signature details.");
      return;
    }
    toast.success("Agreement signed successfully!");
    confetti({
      particleCount: 70,
      spread: 60,
      colors: ['#00F5FF', '#7B2FFF']
    });

    const newLog = {
      action: "Signed Deliverable Contract Agreement",
      time: "Just now",
      author: userProfile ? userProfile.name : "Client"
    };
    setActivityLog(prevLogs => [newLog, ...prevLogs]);
    closeModal();
  };

  const renderModalContent = () => {
    const { type, data } = modalConfig;
    if (type === 'actionItem' && data) {
      const isChecked = actionItems.find(item => item.id === data.id)?.completed;
      return (
        <div className="space-y-4 text-white">
          <div className="flex justify-between items-center bg-[#13131a] p-4 rounded-xl border border-white/5">
            <span className="text-sm text-gray-400">Due: <span className="text-accent-secondary font-bold font-mono">{data.due}</span></span>
            <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-gray-300">Assignee: {data.assignee}</span>
          </div>
          <h4 className="font-bold text-lg text-white mt-4">{data.task}</h4>
          <p className="text-gray-400 leading-relaxed text-sm">{data.details}</p>
          <button
            onClick={() => {
              toggleActionItem(data.id);
              closeModal();
            }}
            className={`w-full py-3.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-6 ${isChecked ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-accent-primary hover:bg-cyan-400 text-black shadow-lg shadow-accent-primary/20'}`}
          >
            {isChecked ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
            {isChecked ? 'Mark as Incomplete' : 'Approve & Mark as Complete'}
          </button>
        </div>
      );
    }

    if (type === 'teamMember' && data) {
      return (
        <div className="flex flex-col items-center text-center space-y-4 text-white">
          <div className="relative">
            <img src={data.avatar} alt={data.name} className="w-24 h-24 rounded-full border-4 border-[#13131a] object-cover shadow-lg" onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${data.name}&background=7B2FFF&color=fff`} />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-[#0d0d12] bg-green-500 shadow-md" />
          </div>
          <div>
            <h4 className="text-2xl font-bold tracking-tight">{data.name}</h4>
            <p className="text-accent-violet font-semibold text-sm">{data.role}</p>
          </div>
          <div className="w-full bg-[#13131a] border border-white/5 rounded-2xl p-5 text-left space-y-3 mt-4">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-accent-primary" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Activity className="w-4 h-4 text-accent-violet" />
              <span>Status: <span className="text-green-400 font-bold">{data.status}</span></span>
            </div>
          </div>
          <div className="w-full flex gap-3 mt-4">
            <button
              onClick={() => {
                setActiveTab('messages');
                setActiveChat(data.name);
                closeModal();
              }}
              className="w-full py-3.5 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Message Directly
            </button>
          </div>
        </div>
      );
    }

    if (type === 'file' && data) {
      const isContract = data.name.includes("Agreement") || data.name.includes("SOW");
      return (
        <div className="space-y-6 text-center text-white">
          <div className="w-20 h-20 bg-accent-primary/10 rounded-2xl border border-accent-primary/20 flex items-center justify-center mx-auto">
            <FileText className="w-10 h-10 text-accent-primary" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-1 tracking-tight">{data.name}</h4>
            <p className="text-gray-400 text-sm">{data.type} Document • {data.size}</p>
          </div>
          <div className="flex gap-3">
            {isContract ? (
              <button
                onClick={() => {
                  closeModal();
                  openModal('signDoc', data);
                }}
                className="flex-1 py-3.5 bg-accent-violet hover:bg-purple-600 border border-white/10 text-white font-bold rounded-xl transition-all"
              >
                Sign SOW Siganoff
              </button>
            ) : (
              <button onClick={closeModal} className="flex-1 py-3.5 bg-[#13131a] hover:bg-[#1f1f2e] border border-white/10 text-white font-bold rounded-xl transition-all">
                Preview File
              </button>
            )}
            <button
              onClick={() => {
                toast.success(`Downloaded: ${data.name}`);
                closeModal();
              }}
              className="flex-1 py-3.5 bg-accent-primary hover:bg-cyan-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      );
    }

    if (type === 'signDoc' && data) {
      return (
        <div className="space-y-4 text-white text-left">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold font-mono">Contract Sign-off</p>
          <h4 className="text-lg font-bold text-white mb-2">{data.name}</h4>
          <div className="bg-[#13131a] border border-white/5 rounded-xl p-4 text-xs text-gray-400 leading-relaxed max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <p className="mb-2 font-bold text-white">NEXORA STUDIO CLIENT SERVICE SOW</p>
            <p className="mb-2">This Statement of Work specifies the deployment parameters for the Nova Corp E-Commerce Replatforming system. By signing below, the client agrees to the terms and authorizes development completion of Phase 3.</p>
            <p className="mb-2">All assets will be pushed to server configurations. Outstanding payments are processed upon milestone sign-offs. Payment schedules follow the payment policies outlined in Nexora terms.</p>
          </div>
          <div className="space-y-2 mt-4">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Type Signature to Authorize</label>
            <input
              type="text"
              placeholder="e.g. Alex Client"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="w-full bg-[#13131a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-primary transition-all font-mono"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={closeModal} className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white font-bold transition-all">Cancel</button>
            <button
              onClick={handleSignDocument}
              disabled={!signature.trim()}
              className="flex-1 py-3 bg-accent-primary hover:bg-cyan-400 disabled:opacity-50 text-black font-bold rounded-xl transition-all shadow-lg"
            >
              Sign Electronically
            </button>
          </div>
        </div>
      );
    }

    if (type === 'ticket' && data) {
      const activeTicket = supportTickets.find(t => t.id === data.id);
      return (
        <div className="space-y-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500">Ticket ID: {activeTicket.id}</span>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${activeTicket.status === 'Open' ? 'bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
              {activeTicket.status}
            </span>
          </div>
          <h4 className="font-bold text-lg text-white mb-2">{activeTicket.subject}</h4>

          <div className="space-y-3 bg-[#13131a] border border-white/5 p-4 rounded-2xl max-h-56 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col">
            {activeTicket.messages.map((msg, i) => (
              <div key={i} className={`flex flex-col max-w-[80%] ${msg.sender === 'Client' ? 'self-end items-end' : 'self-start items-start'}`}>
                <span className="text-[9px] text-gray-500 mb-1">{msg.sender === 'Client' ? 'You' : 'Agent'}</span>
                <div className={`px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'Client' ? 'bg-accent-primary text-black rounded-br-sm' : 'bg-[#1f1f2e] text-white border border-white/5 rounded-bl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {activeTicket.status === 'Open' && (
            <form onSubmit={(e) => {
              e.preventDefault();
              const inputField = e.target.elements.reply;
              handleTicketReply(activeTicket.id, inputField.value);
              inputField.value = '';
            }} className="relative mt-4">
              <input
                name="reply"
                type="text"
                required
                placeholder="Type a reply to our agents..."
                className="w-full bg-[#13131a] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-accent-primary transition-all text-white"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg text-accent-primary transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      );
    }

    if (type === 'payment') {
      return (
        <form onSubmit={handleCardPayment} className="space-y-4 text-white text-left">
          {/* Card Mockup Showcase (Zero Lag Flipper) */}
          <div className="w-full h-48 [perspective:1000px] mb-6">
            <motion.div
              animate={{ rotateY: isCardFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full h-full relative [transform-style:preserve-3d]"
            >
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-br from-[#1a1a2e] to-[#0f0c1b] border border-white/15 flex flex-col justify-between [backface-visibility:hidden] shadow-xl">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-8 bg-amber-500/20 border border-amber-500/30 rounded-md flex items-center justify-center">
                    <div className="w-8 h-6 bg-yellow-500/40 rounded-sm" />
                  </div>
                  <span className="text-white/40 font-bold text-lg italic">VISA</span>
                </div>
                <div className="text-xl font-mono tracking-widest text-white mt-4">
                  {cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">Card Holder</div>
                    <div className="text-sm font-mono text-white truncate max-w-[150px]">{cardName || "ALEX CLIENT"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/40 uppercase">Expires</div>
                    <div className="text-sm font-mono text-white">{cardExpiry || "MM/YY"}</div>
                  </div>
                </div>
              </div>
              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-br from-[#0f0c1b] to-[#1a1a2e] border border-white/15 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl">
                <div className="w-full h-10 bg-black -mx-6 mt-2" />
                <div className="flex justify-end items-center mt-4">
                  <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-end px-3">
                    <span className="text-sm font-mono text-white font-bold">{cardCvv || "•••"}</span>
                  </div>
                </div>
                <div className="text-[10px] text-white/30 text-right mt-4 leading-none">
                  Secure Checkout. Transacted via Nexora Systems.
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Card Number</label>
              <input
                type="text"
                maxLength="19"
                placeholder="4111 2222 3333 4444"
                value={cardNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                  const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                  setCardNumber(formatted);
                }}
                className="w-full bg-[#13131a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-primary transition-all font-mono"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Cardholder Name</label>
              <input
                type="text"
                placeholder="Alex Client"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="w-full bg-[#13131a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-primary transition-all font-mono"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Expiration Date</label>
                <input
                  type="text"
                  maxLength="5"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length > 2) {
                      val = val.substring(0, 2) + '/' + val.substring(2);
                    }
                    setCardExpiry(val);
                  }}
                  className="w-full bg-[#13131a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-primary transition-all font-mono"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">CVV Code</label>
                <input
                  type="text"
                  maxLength="3"
                  placeholder="123"
                  value={cardCvv}
                  onFocus={() => setIsCardFlipped(true)}
                  onBlur={() => setIsCardFlipped(false)}
                  onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-[#13131a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-primary transition-all font-mono"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPaying}
              className="w-full py-4 bg-accent-primary hover:bg-cyan-400 disabled:opacity-50 text-black font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              {isPaying ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>{payProgress}</span>
                </div>
              ) : (
                <>
                  <CardIcon className="w-5 h-5" />
                  <span>Pay Invoice INV-002 ($10,000)</span>
                </>
              )}
            </button>
          </div>
        </form>
      );
    }
    return null;
  };

  // --- OUT-OF-AUTH SIGN-IN PORTAL ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040406] flex relative overflow-hidden text-white font-sans selection:bg-accent-primary selection:text-black">
        <Helmet><title>Client Portal Sign In | Nexora</title></Helmet>

        <ParticleBackground />

        {/* Brand Left Visual Sidebar */}
        <div className="hidden lg:flex w-1/2 relative bg-[#07070a]/60 border-r border-white/10 flex-col justify-between p-16 z-10 backdrop-blur-3xl">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/logo/favicon.png" alt="Nexora" className="w-9 h-9" />
              <span className="font-display font-black text-2xl tracking-[0.15em] text-white">NEXORA</span>
            </Link>
          </div>

          <div className="relative z-10 flex flex-col justify-center items-center py-10 w-full flex-grow">
            {/* Visual core radar */}
            <div className="relative w-80 h-80 flex items-center justify-center bg-[#07070a]/40 rounded-full border border-white/5">
              <div className="absolute inset-0 rounded-full border border-dashed border-accent-primary/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-64 h-64 rounded-full border border-white/5 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-dashed border-accent-violet/20 animate-[spin_25s_linear_infinite_reverse]" />
              </div>
              <div className="absolute w-44 h-44 rounded-full border border-white/5 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.08)]"
                >
                  <Laptop className="w-6 h-6 text-accent-primary" />
                </motion.div>
              </div>
            </div>

            <div className="max-w-lg mt-10 text-center">
              <h1 className="text-4xl font-display font-black text-white leading-tight mb-4 tracking-tight">
                Enter Your <span className="text-accent-primary">Pulse Center.</span>
              </h1>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Unlock real-time transparency. Verify engineering performance speed, view SOW deliverables, authorize pending pipelines, and directly coordinate updates with lead developers.
              </p>
            </div>
          </div>

          <div className="relative z-10 text-xs text-gray-600 font-mono">
            <span>SECURE GATEWAY V2.1.0 • ENCRYPTED PIPELINE</span>
          </div>
        </div>

        {/* Credentials Form Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10 bg-[#040406]/75 backdrop-blur-2xl">
          <Link to="/" className="lg:hidden absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
            <ChevronRight className="w-4 h-4 rotate-180" /> Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-[#07070a]/65 p-8 rounded-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-md relative"
          >
            <div className="absolute top-[-1px] left-10 w-28 h-[2px] bg-gradient-to-r from-accent-primary via-accent-violet to-transparent" />

            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Access Client Portal</h2>
              <p className="text-gray-400 text-xs">Authorize to open development tracking board</p>
            </div>

            <GoogleOAuthProvider clientId="MOCK_GOOGLE_CLIENT_ID">
              <GoogleLoginButton onLoginSuccess={(userInfo) => {
                setUserProfile(userInfo);
                setIsAuthenticated(true);
                toast.success("Welcome back to Nexora!");
              }} />
            </GoogleOAuthProvider>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">OR SECURITY KEY</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Client Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-accent-primary transition-all text-sm font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secret Phrase</label>
                  <a href="#" className="text-[9px] font-bold text-accent-primary hover:underline uppercase tracking-widest">Forgot?</a>
                </div>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-white focus:outline-none focus:border-accent-primary transition-all text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoginLoading || !email || !password}
                className="w-full mt-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl px-4 py-3.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg text-sm"
              >
                {isLoginLoading ? (
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Pulse Board</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-gray-500">
              New client? <Link to="/#contact" className="text-accent-primary font-bold hover:underline">Launch a project SOW</Link>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- LOGGED-IN PORTAL DASHBOARD (VIBRANT GLOWING GLASSMORPHIC) ---
  const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group overflow-hidden ${active ? 'bg-accent-primary/10 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      title={label}
    >
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary shadow-[0_0_8px_#00F5FF]" />
      )}
      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-accent-primary' : 'group-hover:text-white transition-colors'}`} />
      <span className="hidden md:block text-sm tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#040407] text-white font-sans flex relative selection:bg-accent-primary selection:text-black overflow-hidden">
      <Helmet><title>Nexora Pulse Dashboard</title></Helmet>

      <ParticleBackground />

      {/* Glow layers */}
      <div className="fixed top-[-20%] left-[-20%] w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-[-25%] right-[-15%] w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-[160px] pointer-events-none" />

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={
          modalConfig.type === 'actionItem' ? 'Action Approval' :
            modalConfig.type === 'teamMember' ? 'Team Member Profile' :
              modalConfig.type === 'file' ? 'File Storage Deliverable' :
                modalConfig.type === 'ticket' ? 'Live Support Desk' :
                  modalConfig.type === 'signDoc' ? 'E-Signature Gateway' :
                    'Secure Payment Terminal'
        }
      >
        {renderModalContent()}
      </Modal>

      {/* Sidebar navigation */}
      <aside className="w-20 md:w-64 fixed left-0 top-0 bottom-0 bg-[#07070a]/80 border-r border-white/10 z-40 flex flex-col justify-between py-8 px-4 backdrop-blur-xl">
        <div className="w-full flex flex-col items-center md:items-stretch">
          <Link to="/" className="flex items-center gap-3 md:px-4 mb-10 shrink-0">
            <img src="/logo/favicon.png" alt="Nexora" className="w-8 h-8 shrink-0 hover:rotate-45 transition-transform duration-500" />
            <span className="hidden md:block font-display font-black text-xl tracking-[0.15em] text-white">NEXORA</span>
          </Link>

          <nav className="flex flex-col gap-2 w-full">
            <SidebarItem icon={LayoutDashboard} label="Canvas View" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon={FileText} label="Invoices & Contracts" active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} />
            <SidebarItem icon={CheckCircle2} label="Milestones" active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')} />
            <SidebarItem icon={MessageCircle} label="Communication" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
          </nav>
        </div>

        {/* Live Stream and Logout controls block */}
        <div className="w-full flex flex-col gap-5 pt-6 border-t border-white/10 shrink-0">
          <div className="hidden md:block">
            <DevWebcam />
          </div>

          <button onClick={() => {
            setIsAuthenticated(false);
            toast("Signed out successfully.");
          }} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all text-gray-400 hover:text-red-400 hover:bg-red-500/10 group">
            <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400" />
            <span className="hidden md:block font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main dashboard core content */}
      <main className="flex-1 ml-20 md:ml-64 relative z-10 min-h-screen overflow-y-auto pb-16 flex flex-col">

        {/* Dashboard Header section */}
        <header className="pt-10 pb-6 px-8 lg:px-12 flex justify-between items-start max-w-[1500px] w-full mx-auto shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d12]/80 border border-white/10 text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00FF87] shadow-[0_0_8px_#00FF87] animate-pulse" />
              Pulse Engine Active
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-1 text-white">
              Welcome, {userProfile ? userProfile.name.split(' ')[0] : 'Client'}
            </h1>
            <p className="text-sm text-gray-400 font-light">
              Connected live pipeline canvas for <span className="text-white font-medium">{DEFAULT_PROJECT_DATA.client}</span>.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 bg-[#07070a]/60 border border-white/10 rounded-full p-2 pr-6 shadow-md backdrop-blur-md">
            {userProfile && userProfile.picture ? (
              <img src={userProfile.picture} alt="Profile" className="w-10 h-10 rounded-full border border-white/10 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-accent-violet/30 flex items-center justify-center font-bold text-lg border border-accent-violet/50 text-white">
                {(userProfile ? userProfile.name[0] : 'C').toUpperCase()}
              </div>
            )}
            <div className="text-left text-sm">
              <div className="font-bold text-white leading-tight">{userProfile ? userProfile.name : 'Client'}</div>
              <div className="text-xs text-gray-500 leading-tight">{userProfile ? userProfile.email : 'client@company.com'}</div>
            </div>
          </div>
        </header>

        {/* Tab Router pages */}
        <div className="px-8 lg:px-12 max-w-[1500px] w-full mx-auto flex-grow">
          <AnimatePresence mode="wait">

            {/* TAB: CANVAS VIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Upper Project header card (Bento Grid layout) */}
                <div className="bg-[#07070a]/60 border border-white/10 rounded-3xl p-8 lg:p-10 relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse" />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                    <div className="flex-1 text-left">
                      <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Project Thread</h2>
                      <h3 className="text-2xl lg:text-3xl font-display font-black leading-tight mb-8 text-white">{DEFAULT_PROJECT_DATA.project}</h3>

                      <div className="flex flex-wrap gap-4">
                        <div className="bg-[#0d0d12]/60 rounded-2xl px-5 py-4 border border-white/5 flex-grow min-w-[140px]">
                          <div className="text-gray-500 text-xs mb-1.5 uppercase font-bold tracking-wider">Status</div>
                          <div className="text-base font-bold flex items-center gap-2 text-white">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-primary shadow-[0_0_8px_rgba(0,245,255,0.6)] animate-pulse" />
                            Phase 3 Active
                          </div>
                        </div>
                        <div className="bg-[#0d0d12]/60 rounded-2xl px-5 py-4 border border-white/5 flex-grow min-w-[140px]">
                          <div className="text-gray-500 text-xs mb-1.5 uppercase font-bold tracking-wider">Estimated Launch</div>
                          <div className="text-base font-bold text-white flex items-center gap-2">
                            <Clock className="w-4 h-4 text-accent-violet" />
                            <span>Oct 8</span>
                          </div>
                        </div>
                        <div className="bg-[#0d0d12]/60 rounded-2xl px-5 py-4 border border-white/5 flex-grow min-w-[140px]">
                          <div className="text-gray-500 text-xs mb-1.5 uppercase font-bold tracking-wider">Engine Velocity</div>
                          <div className="text-base font-bold text-green-400 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-green-400" />
                            <span>{currentVelocity}/100</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Circle & Radar Performance components side-by-side */}
                    <div className="flex items-center gap-8 shrink-0 flex-wrap md:flex-nowrap">
                      {/* Interactive Radar Chart */}
                      <RadarPerformanceChart />

                      {/* Progress Circle Arc */}
                      <div className="relative w-36 h-36 shrink-0 flex items-center justify-center bg-black/20 rounded-full p-2 border border-white/5">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#00F5FF"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray="263.9"
                            initial={{ strokeDashoffset: 263.9 }}
                            animate={{ strokeDashoffset: 263.9 * (1 - (currentVelocity / 150)) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_8px_#00F5FF]"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-display font-black text-white">{Math.round((currentVelocity / 150) * 100)}%</span>
                          <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Pipeline</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checklist and console logs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Spotlight Card: Action Items */}
                  <SpotlightCard className="p-6 lg:p-8 text-left">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                        <CheckSquare className="w-5 h-5 text-accent-primary" /> Action Items
                      </h3>
                      {actionItems.filter(i => !i.completed).length > 0 ? (
                        <span className="bg-accent-secondary/15 text-accent-secondary text-[10px] font-black px-3 py-1 rounded-full border border-accent-secondary/30 uppercase tracking-widest font-mono">
                          {actionItems.filter(i => !i.completed).length} Pending
                        </span>
                      ) : (
                        <span className="bg-[#00FF87]/15 text-[#00FF87] text-[10px] font-black px-3 py-1 rounded-full border border-[#00FF87]/30 uppercase tracking-widest font-mono">
                          Cleared
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {actionItems.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${item.completed ? 'bg-white/[0.02] border-white/5 opacity-60' : 'bg-[#0d0d12]/60 border-white/5 hover:border-white/20 hover:bg-[#13131a]/80'}`}
                        >
                          <div className="flex items-center gap-4 flex-grow mr-2" onClick={() => toggleActionItem(item.id)}>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${item.completed ? 'border-accent-primary bg-accent-primary text-black' : 'border-gray-600 group-hover:border-accent-primary'}`}>
                              {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className={`text-sm font-medium transition-all ${item.completed ? 'line-through text-gray-500' : 'text-gray-300 group-hover:text-white'}`}>
                              {item.task}
                            </span>
                          </div>
                          <button
                            onClick={() => openModal('actionItem', item)}
                            className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all text-xs flex items-center gap-1 font-mono uppercase tracking-wider"
                          >
                            Details
                          </button>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>

                  {/* Spotlight Card: Pipeline console */}
                  <SpotlightCard className="p-6 lg:p-8 text-left">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                        <Terminal className="w-5 h-5 text-gray-400" /> Pipeline Console
                      </h3>
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                    </div>
                    <div className="font-mono text-xs text-gray-400 space-y-2 h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden bg-[#040407] p-5 rounded-2xl border border-white/5 flex-grow">
                      {terminalLogs.map((log, i) => {
                        let colorClass = "text-gray-400";
                        if (log.includes("~$")) colorClass = "text-accent-violet font-bold";
                        else if (log.includes("✓")) colorClass = "text-green-400 font-bold";
                        else if (log.includes("PASS")) colorClass = "text-green-400";
                        else if (log.includes("System health")) colorClass = "text-accent-primary";
                        return <div key={i} className={colorClass}>{log}</div>;
                      })}
                    </div>
                  </SpotlightCard>
                </div>

                {/* Daily Audio Briefing & Activity log split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
                  {/* Daily Voice brief player */}
                  <AudioBriefing />

                  {/* Spotlight Card: Pipeline feeds */}
                  <SpotlightCard className="p-6 lg:p-8 text-left">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                        <History className="w-5 h-5 text-accent-violet" /> Pipeline Feed
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {activityLog.slice(0, 3).map((log, i) => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                              <Activity className="w-4 h-4 text-accent-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white tracking-tight">{log.action}</div>
                              <div className="text-[11px] text-gray-500">by {log.author}</div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 font-mono">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              </motion.div>
            )}

            {/* TAB: INVOICES & CONTRACTS */}
            {activeTab === 'invoices' && (
              <motion.div
                key="invoices"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-[#07070a]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-violet/5 rounded-full blur-2xl pointer-events-none" />
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Contract Budget</p>
                    <p className="text-3xl font-display font-black text-white">{billing.totalBudget}</p>
                  </div>
                  <div className="bg-[#07070a]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FF87]/5 rounded-full blur-2xl pointer-events-none" />
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Settled</p>
                    <p className="text-3xl font-display font-black text-green-400">{billing.paid}</p>
                  </div>
                  <div className="bg-[#07070a]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-secondary/5 rounded-full blur-2xl pointer-events-none" />
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Outstanding</p>
                    <p className="text-3xl font-display font-black text-accent-secondary">{billing.outstanding}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                  <div className="lg:col-span-2 bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-md">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white mb-6">
                      <Receipt className="w-5 h-5 text-accent-primary" /> Invoice Ledger
                    </h3>
                    <div className="space-y-4">
                      {invoices.map((inv) => (
                        <div key={inv.id} className="p-5 rounded-2xl bg-[#0d0d12]/60 border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-bold text-white">{inv.id}</div>
                              <div className="text-xs text-gray-500">Issued: {inv.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="font-mono text-base font-bold text-white">{inv.amount}</div>
                              <div className="mt-1">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${inv.status === 'Paid' ? 'bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/20' : 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20'}`}>
                                  {inv.status}
                                </span>
                              </div>
                            </div>
                            {inv.status === 'Pending' ? (
                              <button
                                onClick={() => openModal('payment')}
                                className="px-5 py-2.5 bg-accent-primary hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-md text-xs uppercase tracking-wider"
                              >
                                Pay Now
                              </button>
                            ) : (
                              <button
                                onClick={() => toast.success(`Receipt downloaded for ${inv.id}`)}
                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all text-xs flex items-center gap-1 font-mono uppercase tracking-wider"
                              >
                                Receipt
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-md">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white mb-6">
                      <FileCheck className="w-5 h-5 text-accent-violet" /> Agreements
                    </h3>
                    <div className="space-y-4">
                      {DEFAULT_PROJECT_DATA.recentFiles.slice(0, 2).map((file, i) => (
                        <div
                          key={i}
                          onClick={() => openModal('file', file)}
                          className="p-4 rounded-xl bg-[#0d0d12]/60 border border-white/5 hover:border-white/20 transition-all cursor-pointer group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-8 h-8 rounded-lg bg-accent-violet/10 border border-accent-violet/20 text-accent-violet flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                              PDF
                            </div>
                            <div className="overflow-hidden">
                              <div className="font-semibold text-xs text-white truncate group-hover:text-accent-primary transition-colors">{file.name}</div>
                              <div className="text-[10px] text-gray-500 mt-0.5">{file.size}</div>
                            </div>
                          </div>
                          <Download className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB: TIMELINE MILESTONES */}
            {activeTab === 'milestones' && (
              <motion.div
                key="milestones"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
              >
                <div className="lg:col-span-2 bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-md">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-white mb-8">
                    <Clock className="w-5 h-5 text-accent-primary" /> Project Milestones
                  </h3>

                  <div className="relative pl-8 border-l border-white/10 space-y-8 ml-2">
                    {DEFAULT_PROJECT_DATA.timeline.map((phase) => {
                      const isActive = phase.id === selectedMilestone;
                      const isComplete = phase.status === 'completed';
                      const isInProgress = phase.status === 'in-progress';

                      return (
                        <div
                          key={phase.id}
                          onClick={() => setSelectedMilestone(phase.id)}
                          className={`relative cursor-pointer transition-all ${isActive ? 'scale-[1.01]' : 'opacity-70 hover:opacity-100'}`}
                        >
                          <div className={`absolute top-1.5 -left-[41px] w-6 h-6 rounded-full border-4 border-[#040407] flex items-center justify-center transition-all ${isComplete ? 'bg-[#00FF87]' : isInProgress ? 'bg-accent-primary animate-pulse' : 'bg-gray-800'}`}>
                            {isComplete && <Check className="w-3 h-3 text-black stroke-[3]" />}
                          </div>

                          <div className={`p-5 rounded-2xl border transition-all ${isActive ? 'bg-[#0d0d12]/85 border-accent-primary/50 shadow-md shadow-accent-primary/5' : 'bg-[#0d0d12]/40 border-white/5'}`}>
                            <div className="flex justify-between items-start gap-4 mb-2">
                              <div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">Phase {phase.id}</span>
                                <h4 className="font-bold text-white text-base mt-0.5 tracking-tight">{phase.title}</h4>
                              </div>
                              <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${isComplete ? 'bg-[#00FF87]/15 text-[#00FF87]' : isInProgress ? 'bg-accent-primary/15 text-accent-primary' : 'bg-white/5 text-gray-500'}`}>
                                {phase.status}
                              </span>
                            </div>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-lg">{phase.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  {(() => {
                    const phase = DEFAULT_PROJECT_DATA.timeline.find(t => t.id === selectedMilestone);
                    const leadInfo = DEFAULT_PROJECT_DATA.team.find(t => t.name === phase.lead);
                    return (
                      <div className="bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-md">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Milestone Details</p>
                        <h3 className="text-xl font-bold text-white tracking-tight mb-4">{phase.title}</h3>

                        <div className="space-y-6 mt-6">
                          <div className="pb-4 border-b border-white/5">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Date Window</span>
                            <div className="text-sm font-semibold text-white mt-1">October 1 - {phase.date}</div>
                          </div>

                          <div className="pb-4 border-b border-white/5">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Owner Lead</span>
                            <div className="flex items-center gap-3 mt-2">
                              <img src={leadInfo?.avatar} alt={phase.lead} className="w-8 h-8 rounded-full border border-white/10" onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${phase.lead}&background=7B2FFF&color=fff`} />
                              <div>
                                <div className="text-xs font-bold text-white">{phase.lead}</div>
                                <div className="text-[10px] text-gray-500">{leadInfo?.role}</div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Deliverables</span>
                            {phase.deliverables && phase.deliverables.length > 0 ? (
                              <div className="space-y-2 mt-2">
                                {phase.deliverables.map((doc, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5 text-xs text-gray-300">
                                    <span className="truncate">{doc}</span>
                                    <button
                                      onClick={() => toast.success(`Downloaded: ${doc}`)}
                                      className="p-1 hover:bg-white/10 rounded text-accent-primary"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500 mt-2 italic">Awaiting phase deliverables</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}

            {/* TAB: COMMUNICATION THREAD */}
            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-[#07070a]/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md flex h-[620px] max-w-[1200px] mx-auto text-left"
              >
                {/* Channels Sidebar list */}
                <div className="w-64 border-r border-white/10 bg-[#0d0d12]/40 flex flex-col p-4 shrink-0">
                  <div className="mb-6">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-3 px-2">Project Channels</span>
                    <div className="space-y-1">
                      {['#general-project', '#design-feed', '#dev-updates'].map((chan) => (
                        <button
                          key={chan}
                          onClick={() => setActiveChat(chan)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${activeChat === chan ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                        >
                          {chan}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-3 px-2">Direct Messages</span>
                    <div className="space-y-1.5">
                      {DEFAULT_PROJECT_DATA.team.map((member) => (
                        <button
                          key={member.name}
                          onClick={() => setActiveChat(member.name)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center gap-3 border ${activeChat === member.name ? 'bg-accent-violet/10 text-white border-accent-violet/30' : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'}`}
                        >
                          <div className="relative">
                            <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full object-cover border border-white/10" onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=7B2FFF&color=fff`} />
                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#0d0d12]" />
                          </div>
                          <div>
                            <div className="font-bold">{member.name}</div>
                            <div className="text-[9px] text-gray-500 font-light truncate max-w-[120px]">{member.role}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Messages feeds view */}
                <div className="flex-1 flex flex-col bg-[#050508]/40 overflow-hidden relative">
                  <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#07070a]/60">
                    <div>
                      <h4 className="font-bold text-white text-sm">{activeChat}</h4>
                      <span className="text-[10px] text-gray-500">Pipeline Communication thread</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:hidden flex flex-col">
                    {(chatMessages[activeChat] || []).map((msg, i) => (
                      <div key={i} className={`flex flex-col max-w-[70%] ${msg.sender === 'You' ? 'self-end items-end' : 'self-start items-start'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] text-gray-500 font-bold">{msg.sender === 'You' ? 'You' : msg.sender}</span>
                          <span className="text-[8px] text-gray-500">{msg.time}</span>
                        </div>
                        <div className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${msg.sender === 'You' ? 'bg-accent-primary text-black rounded-br-sm font-semibold' : 'bg-[#13131a] text-white border border-white/5 rounded-bl-sm'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="self-start flex flex-col items-start max-w-[70%]">
                        <span className="text-[9px] text-gray-500 font-bold mb-1">{activeChat.startsWith('#') ? 'Team' : activeChat} is typing</span>
                        <div className="px-4 py-3 bg-[#13131a] rounded-2xl rounded-bl-sm border border-white/5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-[#07070a]/60 flex gap-3 relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={`Send a message to ${activeChat}...`}
                      className="flex-1 bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent-primary transition-all pr-12"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="p-3 bg-accent-primary hover:bg-cyan-400 disabled:opacity-50 text-black font-bold rounded-xl transition-all shadow-md"
                    >
                      <SendHorizontal className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Dashboard Crew, Deliverables & Helpdesk section */}
        <div className="px-8 lg:px-12 max-w-[1500px] w-full mx-auto mt-8 shrink-0 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Project Crew */}
            <div className="bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2 text-white mb-4">
                  <Users className="w-4 h-4 text-accent-violet" /> Project Crew
                </h3>
                <div className="space-y-3">
                  {DEFAULT_PROJECT_DATA.team.map((member, i) => (
                    <div
                      key={i}
                      onClick={() => openModal('teamMember', member)}
                      className="flex items-center gap-3 cursor-pointer p-1.5 -mx-1.5 rounded-xl hover:bg-white/5 transition-all group"
                    >
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-white/10" onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=7B2FFF&color=fff`} />
                      <div className="flex-1 overflow-hidden">
                        <div className="text-xs font-bold text-white group-hover:text-accent-primary transition-colors">{member.name}</div>
                        <div className="text-[10px] text-gray-500 truncate">{member.role}</div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2 text-white mb-4">
                  <File className="w-4 h-4 text-accent-secondary" /> Deliverables
                </h3>
                <div className="space-y-3">
                  {DEFAULT_PROJECT_DATA.recentFiles.map((file, i) => (
                    <div
                      key={i}
                      onClick={() => openModal('file', file)}
                      className="flex items-center justify-between p-2 bg-[#0d0d12]/40 rounded-xl border border-white/5 cursor-pointer hover:border-white/15 transition-all group"
                    >
                      <span className="text-xs text-gray-300 group-hover:text-accent-primary transition-colors truncate max-w-[180px]">{file.name}</span>
                      <Download className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Helpdesk */}
            <div className="bg-[#07070a]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2 text-white mb-4">
                  <HelpCircle className="w-4 h-4 text-accent-primary" /> Project Helpdesk
                </h3>
                <div className="space-y-3">
                  {supportTickets.map((ticket, i) => (
                    <div
                      key={i}
                      onClick={() => openModal('ticket', ticket)}
                      className="p-3 bg-[#0d0d12]/40 border border-white/5 rounded-xl cursor-pointer hover:border-white/15 transition-all flex justify-between items-center"
                    >
                      <div className="overflow-hidden mr-2">
                        <div className="text-xs font-bold text-gray-300 truncate">{ticket.subject}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{ticket.id}</div>
                      </div>
                      <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${ticket.status === 'Open' ? 'bg-accent-secondary/15 text-accent-secondary border-accent-secondary/25' : 'bg-green-500/15 text-green-400 border-green-500/25'}`}>
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
