import React, { useState, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { pricing } from '../../constants/pricing';
import { fadeUp, staggerContainer } from '../../animations/variants';
import MagneticButton from '../ui/MagneticButton';
import { Check, Sparkles, Zap, Shield, Layers, MessageSquare, Code, Cpu, Award, ArrowRight } from 'lucide-react';
import nexoraLogo from '../../assets/nexora-logo.png';

// Custom Mouse Glow Pricing Card
const PricingCard = ({ plan, isAnnual, idx }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Accent mapping per plan
  const themes = {
    1: { // Starter MVP
      glow: "rgba(59, 130, 246, 0.15)", // Blue
      icon: Layers,
      color: "text-blue-400",
      accentBg: "bg-blue-500/10 border-blue-500/20",
      bulletColor: "text-blue-400"
    },
    2: { // Growth Suite
      glow: "rgba(155, 89, 255, 0.15)", // Purple
      icon: Sparkles,
      color: "text-purple-400",
      accentBg: "bg-purple-500/10 border-purple-500/20",
      bulletColor: "text-purple-400"
    },
    3: { // Immersive Scale
      glow: "rgba(244, 63, 94, 0.15)", // Rose
      icon: Zap,
      color: "text-rose-400",
      accentBg: "bg-rose-500/10 border-rose-500/20",
      bulletColor: "text-rose-400"
    },
    4: { // Enterprise
      glow: "rgba(16, 185, 129, 0.15)", // Emerald
      icon: Shield,
      color: "text-emerald-400",
      accentBg: "bg-emerald-500/10 border-emerald-500/20",
      bulletColor: "text-emerald-400"
    }
  };

  const theme = themes[plan.id] || themes[1];
  const PlanIcon = theme.icon;

  return (
    <m.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`group relative rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-500 flex flex-col h-full bg-[#07070b]/60 border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-1.5 shadow-2xl ${
        plan.popular ? 'ring-1 ring-purple-500/30 shadow-[0_0_50px_rgba(155,89,255,0.08)] bg-[#090812]/75' : ''
      }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-[9px] font-mono uppercase tracking-widest text-white px-5 py-1.5 rounded-bl-2xl font-black shadow-lg z-20">
          Popular
        </div>
      )}

      {/* Mouse hover glowing effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${theme.glow}, transparent 55%)`
        }}
      />

      {/* Nexora logo watermark */}
      <img
        src={nexoraLogo}
        alt=""
        className="absolute -right-12 -bottom-12 w-48 h-48 opacity-[0.015] group-hover:opacity-[0.035] transition-all duration-700 pointer-events-none object-contain select-none mix-blend-overlay rotate-12"
      />

      {/* Card content */}
      <div className="p-8 flex-1 flex flex-col relative z-10">
        
        {/* Header Title with logo wrapper */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className={`w-11 h-11 rounded-2xl ${theme.accentBg} flex items-center justify-center border shadow-inner`}>
            <PlanIcon size={20} className={theme.color} />
          </div>
          <div>
            <span className="text-[9px] font-mono tracking-widest uppercase opacity-40 block font-semibold">Nexora Tier</span>
            <h3 className="text-lg font-bold text-white tracking-tight">{plan.name}</h3>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed mb-6 min-h-[40px]">{plan.description}</p>

        {/* Pricing display */}
        <div className="mb-6 pb-6 border-b border-white/[0.06] flex flex-col justify-end">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 mb-1 font-semibold">Investment</span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-display font-black text-white tracking-tight">
              {plan.price === "Custom" 
                ? "Custom" 
                : `₹${isAnnual ? Math.floor(Number(plan.price) * 0.8).toLocaleString('en-IN') : Number(plan.price).toLocaleString('en-IN')}`}
            </span>
            {plan.price !== "Custom" && (
              <span className="text-xs text-gray-400 font-medium">
                {isAnnual ? '/mo' : 'starting'}
              </span>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="flex-1 flex flex-col justify-between">
          <ul className="space-y-3.5 mb-8">
            <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block mb-2 font-semibold">Scope of Services</span>
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-xs leading-normal">
                <Check size={16} className={`${theme.bulletColor} shrink-0 mt-0.5`} />
                <span className="text-gray-300 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Action button */}
          <MagneticButton 
            className={`w-full justify-center py-3.5 text-xs font-black tracking-wide rounded-full border transition-all duration-300 ${
              plan.popular 
                ? 'bg-white text-black hover:bg-neutral-100 border-white shadow-[0_4px_20px_rgba(255,255,255,0.15)]' 
                : 'bg-transparent text-white border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
            }`}
          >
            {plan.price === "Custom" ? "Initiate Consultation" : "Secure Launch"}
          </MagneticButton>
        </div>

      </div>
    </m.div>
  );
};

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const trustFactors = [
    {
      icon: Code,
      title: "100% IP & Code Ownership",
      desc: "Every line of code and design asset is signed over to you. No licensing traps, no vendor lock-in, ever.",
      color: "text-blue-400",
      bg: "bg-blue-500/5 border-blue-500/10"
    },
    {
      icon: MessageSquare,
      title: "Direct Engineer Access",
      desc: "Zero intermediate managers or communication delays. Collaborate directly with senior developers via private Slack.",
      color: "text-purple-400",
      bg: "bg-purple-500/5 border-purple-500/10"
    },
    {
      icon: Cpu,
      title: "95+ Lighthouse Performance",
      desc: "Built using cutting-edge edge architectures. If we don't deliver 95+ score on page speed, we optimize it free.",
      color: "text-rose-400",
      bg: "bg-rose-500/5 border-rose-500/10"
    },
    {
      icon: Award,
      title: "Transparent Retainers",
      desc: "No hidden charges. Predictable billing, simple monthly milestones, and real-time visual progress monitoring.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/5 border-emerald-500/10"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#030305] border-t border-white/[0.05] relative overflow-hidden z-10">
      
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative vertical grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Section Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <m.div variants={fadeUp} className="text-accent-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-accent-primary" /> Transparent Investment
          </m.div>

          <m.h2 variants={fadeUp} className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tight text-white">
            Simple, Premium <span className="text-gradient">Pricing</span>
          </m.h2>
          
          <m.p variants={fadeUp} className="text-sm md:text-base text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            No unexpected fees. Just high-fidelity, world-class execution designed to scale your business assets.
          </m.p>

          {/* Toggle Switch */}
          <m.div variants={fadeUp} className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] p-1.5 rounded-full backdrop-blur-sm">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 relative ${
                !isAnnual ? 'text-black font-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {!isAnnual && (
                <m.div 
                  layoutId="pricing-toggle" 
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 25 }}
                />
              )}
              <span className="relative z-10">Pay per project</span>
            </button>
            
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 relative flex items-center gap-1.5 ${
                isAnnual ? 'text-black font-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {isAnnual && (
                <m.div 
                  layoutId="pricing-toggle" 
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 25 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Retainer
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                  isAnnual ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/20 text-purple-400'
                }`}>-20%</span>
              </span>
            </button>
          </m.div>
        </m.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {pricing.map((plan, idx) => (
            <PricingCard 
              key={plan.id}
              plan={plan}
              isAnnual={isAnnual}
              idx={idx}
            />
          ))}
        </div>

        {/* Value Guarantees / Trust Factors Bento Grid */}
        <div className="border-t border-white/[0.06] pt-20">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight mb-2">
              The Nexora <span className="text-gradient">Quality Standard</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto">
              Every package comes built with industry-leading practices and architectural guarantees.
            </p>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFactors.map((factor, idx) => {
              const FactorIcon = factor.icon;
              return (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`p-6 rounded-2xl border ${factor.bg} backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:border-white/[0.1]`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <FactorIcon size={18} className={factor.color} />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 tracking-tight">{factor.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">{factor.desc}</p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
