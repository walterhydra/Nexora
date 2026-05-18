import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  Zap, 
  Code, 
  Shield, 
  Sparkles, 
  Layers, 
  Users, 
  Clock, 
  Activity, 
  HelpCircle,
  Building,
  Flame,
  FileSpreadsheet
} from 'lucide-react';

const features = [
  { 
    id: 'custom_design', 
    title: 'Bespoke 3D & UI', 
    description: 'Award-winning interactive 3D WebGL visuals, shaders, and complex kinetic animations.', 
    time: 21, 
    basePrice: 180, 
    basePriceINR: 15000, 
    tech: ['Three.js', 'WebGL', 'GSAP', 'GLSL Shaders'], 
    icon: Sparkles 
  },
  { 
    id: 'ecommerce', 
    title: 'E-Commerce Engine', 
    description: 'High-volume product storefronts, deep global cart pipelines, and complex Stripe integration.', 
    time: 14, 
    basePrice: 100, 
    basePriceINR: 8000, 
    tech: ['Stripe Custom', 'Cart Engine', 'Inventory API', 'GraphQL'], 
    icon: Calculator 
  },
  { 
    id: 'ai_integration', 
    title: 'AI & Agentic Workflows', 
    description: 'Autonomous LLM agent orchestration, semantic search, and optimized vector pipelines.', 
    time: 14, 
    basePrice: 150, 
    basePriceINR: 12000, 
    tech: ['OpenAI/Claude API', 'VectorDB', 'LangChain', 'Prompt Caching'], 
    icon: Zap 
  },
  { 
    id: 'backend_system', 
    title: 'Custom Cloud Backend', 
    description: 'Enterprise serverless microservices infrastructure, secure databases, and distributed caching.', 
    time: 21, 
    basePrice: 200, 
    basePriceINR: 16000, 
    tech: ['Node.js/Python', 'PostgreSQL', 'Redis', 'AWS/GCP'], 
    icon: Code 
  },
  { 
    id: 'security', 
    title: 'Enterprise Security & SLA', 
    description: 'Comprehensive compliance modeling, active security sandboxes, and advanced single-sign-on (SSO).', 
    time: 7, 
    basePrice: 75, 
    basePriceINR: 6000, 
    tech: ['OAuth2 / OIDC', 'JWT Audit', 'Penetration Testing', 'ISO 27001'], 
    icon: Shield 
  },
];

const scaleTiers = [
  {
    id: 'startup',
    name: 'Startup MVP',
    multiplier: 1.0,
    description: 'Focus on core features & fast execution.',
    icon: Layers,
    team: [
      { role: 'Lead Full-Stack Engineer', count: 1 },
      { role: 'UI/UX Designer', count: 1 },
      { role: 'Product Manager', count: 0.5 }
    ]
  },
  {
    id: 'scaleup',
    name: 'Scaleup Growth',
    multiplier: 1.5,
    description: 'High-performance specs, animations, SLA testing.',
    icon: Activity,
    team: [
      { role: 'Senior Frontend Engineer', count: 1 },
      { role: 'Senior Backend Engineer', count: 1 },
      { role: 'Creative 3D Designer', count: 1 },
      { role: 'Dedicated Project Manager', count: 1 },
      { role: 'QA & Reliability Analyst', count: 0.5 }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Tier',
    multiplier: 2.5,
    description: 'High-availability clusters, extreme compliance SLAs.',
    icon: Building,
    team: [
      { role: 'Solutions Architect', count: 1 },
      { role: 'Senior Frontend Engineer', count: 2 },
      { role: 'Senior Backend Engineer', count: 2 },
      { role: 'Creative Director', count: 1 },
      { role: 'Dedicated Scrum Lead', count: 1 },
      { role: 'Senior QA Specialist', count: 1 },
      { role: 'DevOps & Systems Engineer', count: 1 }
    ]
  }
];

// Beautiful custom React Animated Counter for smooth premium price ticking
function AnimatedPrice({ value, currency }) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    let start = displayValue;
    let end = value;
    if (start === end) return;
    
    let duration = 350; // ms
    let startTime = null;
    
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      let progress = timestamp - startTime;
      let percentage = Math.min(progress / duration, 1);
      
      // easeOutQuad curve
      let ease = percentage * (2 - percentage);
      let current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    }
    
    requestAnimationFrame(animate);
  }, [value]);

  if (currency === 'USD') {
    return `$${displayValue.toLocaleString('en-US')}`;
  } else {
    return `₹${displayValue.toLocaleString('en-IN')}`;
  }
}

export default function Configurator() {
  const [selected, setSelected] = useState(['custom_design']); // Default bespoke 3D
  const [selectedScale, setSelectedScale] = useState('startup');
  const [currency, setCurrency] = useState('INR'); // Default to INR

  const toggleFeature = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    let days = 14; // Base architecture setup: 2 weeks
    let basePriceUSD = 180; // Base starting price
    let basePriceINR = 15000; // Base starting price INR
    let selectedModulesCostUSD = 0;
    let selectedModulesCostINR = 0;
    let complexity = 1;

    selected.forEach(id => {
      const feat = features.find(f => f.id === id);
      if (feat) {
        days += feat.time;
        selectedModulesCostUSD += feat.basePrice;
        selectedModulesCostINR += feat.basePriceINR;
        complexity += 1;
      }
    });

    const scaleInfo = scaleTiers.find(s => s.id === selectedScale);
    const multiplier = scaleInfo ? scaleInfo.multiplier : 1.0;

    // Base discount for bundled items (3 or more modules gives a 10% discount on modules)
    const isBundled = selected.length >= 3;
    const bundleDiscountUSD = isBundled ? Math.round(selectedModulesCostUSD * 0.1) : 0;
    const bundleDiscountINR = isBundled ? Math.round(selectedModulesCostINR * 0.1) : 0;

    const subtotalUSD = basePriceUSD + selectedModulesCostUSD - bundleDiscountUSD;
    const subtotalINR = basePriceINR + selectedModulesCostINR - bundleDiscountINR;

    // Apply scale multiplier to totals
    const finalPriceUSD = Math.round(subtotalUSD * multiplier);
    const finalPriceINR = Math.round(subtotalINR * multiplier);

    const weeks = Math.ceil(days / 7);

    // Complexity mapping
    let finalComplexity = complexity;
    if (selectedScale === 'scaleup') finalComplexity += 1;
    if (selectedScale === 'enterprise') finalComplexity += 2;
    finalComplexity = Math.min(finalComplexity, 6);
    
    return {
      days,
      weeks,
      basePriceUSD,
      basePriceINR,
      modulesCostUSD: selectedModulesCostUSD,
      modulesCostINR: selectedModulesCostINR,
      bundleDiscountUSD,
      bundleDiscountINR,
      priceUSD: finalPriceUSD,
      priceINR: finalPriceINR,
      complexity: finalComplexity,
      multiplier,
      isBundled
    };
  };

  const estimate = calculateEstimate();

  const getWhatsAppLink = () => {
    const selectedScaleName = scaleTiers.find(s => s.id === selectedScale)?.name || selectedScale;
    const selectedFeats = selected.map(id => features.find(f => f.id === id)).filter(Boolean);
    const selectedList = selectedFeats.map(f => `• ${f.title}`).join('\n');
    const timeline = `${estimate.weeks} Weeks`;
    const formattedAmt = currency === 'USD' ? `$${estimate.priceUSD.toLocaleString()}` : `₹${estimate.priceINR.toLocaleString('en-IN')}`;
    
    const message = `Hey Nexora! 🚀\n\nI have configured our system engineering specs using the live estimator:\n\n📊 *Project Tier:* ${selectedScaleName}\n📋 *Engineered Capabilities:*\n${selectedList}\n\n📊 *Estimate Details:*\n- *Timeline:* ${timeline}\n- *Currency:* ${currency}\n- *Dynamically Calibrated Price:* ${formattedAmt}\n- *Architecture Complexity:* ${estimate.complexity > 4 ? 'Enterprise / Complex' : estimate.complexity > 2 ? 'Growth / Moderate' : 'Starter / Linear'}\n\nLet's coordinate on engineering the roadmap!`;
    return `https://wa.me/917383303388?text=${encodeURIComponent(message)}`;
  };

  const getEmailLink = () => {
    const selectedScaleName = scaleTiers.find(s => s.id === selectedScale)?.name || selectedScale;
    const selectedFeats = selected.map(id => features.find(f => f.id === id)).filter(Boolean);
    const selectedList = selectedFeats.map(f => `- ${f.title}`).join('\n');
    const timeline = `${estimate.weeks} Weeks`;
    const formattedAmt = currency === 'USD' ? `$${estimate.priceUSD.toLocaleString()}` : `₹${estimate.priceINR.toLocaleString('en-IN')}`;

    const subject = `Engineering Configuration Estimate: ${timeline} Roadmap`;
    const body = `Hey Nexora Team! 🚀\n\nI just designed our premium project architecture using your interactive config deck:\n\n📊 Project Scale Tier: ${selectedScaleName}\n📋 Selected Capabilities:\n${selectedList}\n\n📊 Estimate details:\n- Timeline: ${timeline}\n- Pricing Index: ${currency}\n- Dynamic calibrated investment: ${formattedAmt}\n- Architectural complexity level: ${estimate.complexity > 4 ? 'Enterprise' : estimate.complexity > 2 ? 'Growth' : 'Starter'}\n\nLet's schedule a technical discovery call to review these specifications!\n\nBest regards,\n[Your Name]`;

    return `https://mail.google.com/mail/?view=cm&fs=1&to=nexoraa.works@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Extract allocated team based on scale
  const currentScaleInfo = scaleTiers.find(s => s.id === selectedScale) || scaleTiers[0];
  const allocatedTeam = currentScaleInfo.team;

  return (
    <section id="configurator" className="py-28 px-6 relative bg-black border-y border-white/5 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,245,255,0.02),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,95,86,0.01),_transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-3 py-1 rounded-full mb-4 inline-block">
            Interactive Scoper
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-5 tracking-tight">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Vision</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Select standard core blueprints, toggling custom capabilities to dynamically calibrate estimated timelines, specialized staff allocations, and investment ranges.
          </p>
        </div>

        {/* Global Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Scoping Blueprint Elements (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Scale selector */}
            <div className="p-6 rounded-2xl bg-[#0A0A0E] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 blur-[30px] pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-mono font-bold text-accent-primary uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-ping" />
                    1. Select Project Scale Tier
                  </h3>
                  <p className="text-[11px] text-white/40 mt-1">Calibrates architectural complexity, SLA coverage, and engineer allocations.</p>
                </div>
                <div className="flex bg-white/5 rounded-full p-0.5 border border-white/10 self-start md:self-auto">
                  {scaleTiers.map((tier) => {
                    const ScaleIcon = tier.icon;
                    const isScaleActive = selectedScale === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedScale(tier.id)}
                        className={`px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all duration-300 ${
                          isScaleActive 
                            ? 'bg-accent-primary text-black shadow-lg shadow-accent-primary/20 scale-105' 
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <ScaleIcon size={12} />
                        <span className="hidden sm:inline">{tier.name}</span>
                        <span className="sm:hidden">{tier.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Tier Highlights */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {scaleTiers.map((tier) => {
                  const isScaleActive = selectedScale === tier.id;
                  return (
                    <div 
                      key={tier.id}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        isScaleActive 
                          ? 'bg-white/[0.03] border-accent-primary/30' 
                          : 'bg-transparent border-white/5 opacity-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                        {isScaleActive && <Check size={12} className="text-accent-primary" />}
                        {tier.name}
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed">{tier.description}</p>
                      <div className="text-[9px] font-mono text-accent-primary mt-2">
                        Multiplier: {tier.multiplier}x
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Capability blueprint modules */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-accent-primary uppercase tracking-wider flex items-center gap-2 px-1">
                <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-ping" />
                2. Select Custom Scope Modules
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => {
                  const isSelected = selected.includes(feature.id);
                  const Icon = feature.icon;
                  
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden group flex flex-col justify-between min-h-[220px] select-none
                        ${isSelected 
                          ? 'bg-white/5 border-accent-primary/45 shadow-[0_0_30px_rgba(0,245,255,0.06)]' 
                          : 'bg-[#0A0A0E] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                        }`}
                    >
                      <div className="w-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-lg transition-colors ${isSelected ? 'bg-accent-primary/20 text-accent-primary animate-pulse' : 'bg-white/5 text-white/40 group-hover:text-white/60'}`}>
                            <Icon size={20} />
                          </div>
                          
                          {/* Animated checkbox circle */}
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300
                            ${isSelected ? 'border-accent-primary bg-accent-primary text-black scale-110 shadow-lg shadow-accent-primary/20' : 'border-white/20'}`}>
                            {isSelected && <Check size={12} strokeWidth={4.5} />}
                          </div>
                        </div>
                        
                        <h4 className="text-base font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">{feature.title}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{feature.description}</p>
                      </div>
                      
                      {/* Tech Stack badges & sprint labels */}
                      <div className="w-full mt-5 pt-3 border-t border-white/5 flex items-center justify-between gap-2 relative z-10">
                        <div className="flex flex-wrap gap-1">
                          {feature.tech.slice(0, 3).map((t, idx) => (
                            <span 
                              key={idx} 
                              className={`text-[8px] font-mono px-1.5 py-0.5 rounded transition-all duration-300
                                ${isSelected 
                                  ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/15' 
                                  : 'bg-white/5 text-white/30 border border-white/5'
                                }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-[9px] font-mono font-medium text-white/30 shrink-0">
                          +{feature.time}d delivery
                        </span>
                      </div>

                      {/* Accent glow on select */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,245,255,0.03),_transparent_70%)] pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Premium Estimator Card (Right 4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            
            <div className="p-8 rounded-3xl bg-[#0A0A0E] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[550px]">
              {/* Top ambient spotlight glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[50px] pointer-events-none" />
              
              <div className="w-full">
                {/* Side Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <FileSpreadsheet size={13} className="text-accent-primary animate-pulse" />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                      Scoping Estimate
                    </h3>
                  </div>
                  
                  {/* Currency switches */}
                  <div className="flex bg-white/5 rounded-full p-0.5 border border-white/10">
                    {['USD', 'INR'].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold transition-all duration-300 ${
                          currency === curr ? 'bg-accent-primary text-black shadow-md' : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Timeline */}
                  <div>
                    <div className="flex justify-between items-center text-xs text-white/40 mb-1">
                      <span>Delivery Target</span>
                      <span className="font-mono text-accent-primary text-[10px]">{estimate.days} Days Total</span>
                    </div>
                    <div className="text-3xl font-display font-bold text-white flex items-end gap-1.5">
                      {estimate.weeks} <span className="text-sm text-white/30 font-sans font-normal lowercase">Weeks Scoped</span>
                    </div>
                    {/* Visual custom tracking bar */}
                    <div className="w-full bg-white/5 h-1 mt-3 rounded-full overflow-hidden relative">
                      <motion.div 
                        className="bg-gradient-to-r from-accent-primary to-accent-secondary h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((estimate.days / 90) * 100, 100)}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Architecture Complexity */}
                  <div>
                    <div className="flex justify-between items-center text-xs text-white/40 mb-2">
                      <span>Systems Architecture Complexity</span>
                      <span className="font-mono text-[9px] text-accent-primary">
                        Level {estimate.complexity}/6
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5, 6].map((level) => {
                        const isFilled = level <= estimate.complexity;
                        return (
                          <div 
                            key={level} 
                            className={`h-2 flex-1 rounded transition-all duration-300 
                              ${isFilled 
                                ? (level > 4 ? 'bg-[#FF5F56]' : level > 2 ? 'bg-[#FFBD2E]' : 'bg-accent-primary') 
                                : 'bg-white/5'
                              }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[9px] font-mono text-white/30 mt-1.5 block">
                      {estimate.complexity > 4 
                        ? '⚡ Enterprise SLA High Availability Architecture' 
                        : estimate.complexity > 2 
                        ? '✨ Custom Scale Systems Integration' 
                        : '💼 Responsive Core Web Architecture'}
                    </span>
                  </div>

                  {/* Project Pod (Allocated Developer Team) */}
                  <div className="pt-5 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs text-white/40 mb-3">
                      <span>Allocated Engineering Pod</span>
                      <span className="text-[10px] font-mono text-accent-primary flex items-center gap-1">
                        <Users size={10} />
                        {allocatedTeam.reduce((sum, member) => sum + member.count, 0)} FTE
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
                      <AnimatePresence mode="popLayout">
                        {allocatedTeam.map((member, i) => (
                          <motion.div
                            key={member.role}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                            className="flex items-center justify-between text-[10px] font-mono bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded"
                          >
                            <span className="text-white/60 flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-accent-primary rounded-full" />
                              {member.role}
                            </span>
                            <span className="text-accent-primary font-bold">{member.count}x</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Pricing Breakdown Invoice */}
                  <div className="pt-5 border-t border-white/5 space-y-2">
                    <div className="text-xs text-white/40 mb-2">Itemized Estimate Breakdown</div>
                    
                    {/* Item 1: Base Engineering Fee */}
                    <div className="flex justify-between text-[10px] font-mono text-white/50">
                      <span>Core Systems Foundation</span>
                      <span>
                        {currency === 'USD' 
                          ? `$${estimate.basePriceUSD.toLocaleString()}` 
                          : `₹${estimate.basePriceINR.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    {/* Item 2: Custom modules subtotal */}
                    {estimate.modulesCostUSD > 0 && (
                      <div className="flex justify-between text-[10px] font-mono text-white/50">
                        <span>Modules Scope ({selected.length} Selected)</span>
                        <span>
                          +{currency === 'USD' 
                            ? `$${estimate.modulesCostUSD.toLocaleString()}` 
                            : `₹${estimate.modulesCostINR.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                    )}

                    {/* Item 3: Package bundle discount */}
                    {estimate.isBundled && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-between text-[10px] font-mono text-green-500 bg-green-500/5 px-1.5 py-0.5 rounded border border-green-500/10"
                      >
                        <span className="flex items-center gap-1">
                          <Flame size={10} className="animate-bounce" />
                          3+ Module Bundle Discount (-10%)
                        </span>
                        <span>
                          -{currency === 'USD' 
                            ? `$${estimate.bundleDiscountUSD.toLocaleString()}` 
                            : `₹${estimate.bundleDiscountINR.toLocaleString('en-IN')}`}
                        </span>
                      </motion.div>
                    )}

                    {/* Item 4: Scale Tier Adjustment multiplier */}
                    {estimate.multiplier > 1 && (
                      <div className="flex justify-between text-[10px] font-mono text-accent-primary bg-accent-primary/5 px-1.5 py-0.5 rounded border border-accent-primary/10">
                        <span>{selectedScale === 'scaleup' ? 'Scaleup Capacity (+50%)' : 'Enterprise SLA (+150%)'}</span>
                        <span>
                          x{estimate.multiplier}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Main Starting Price Range with animated counters */}
                  <div className="pt-6 border-t border-white/5">
                    <div className="text-xs text-white/40 mb-1">Dynamically Calibrated Baseline</div>
                    <div className="text-4xl font-display font-bold text-white flex items-baseline gap-1">
                      <AnimatedPrice value={currency === 'USD' ? estimate.priceUSD : estimate.priceINR} currency={currency} />
                      <span className="text-xs font-mono text-white/30 font-normal">+</span>
                    </div>
                    <span className="text-[9px] font-mono text-white/20 block mt-1 leading-normal">
                      *Calculated calibration reflecting standard modular sprints, project pod sizing, and compliance tiers.
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 w-full border-t border-white/5 pt-4">
                <div className="flex flex-col gap-2.5">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#00FF00]/10 border border-[#00FF00]/25 text-[#00FF00] hover:bg-[#00FF00]/20 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer active:scale-95 text-center"
                    style={{ textShadow: '0 0 10px rgba(0,255,0,0.1)' }}
                  >
                    <span>Request Discovery via WhatsApp</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <a
                    href={getEmailLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 text-white hover:bg-white/[0.08] py-3 rounded-xl font-mono text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer active:scale-95 text-center"
                  >
                    <span>Receive PDF Proposal via Email</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                
                <p className="text-[8px] text-white/20 text-center mt-4">
                  *Scoping represents an engineering model. Definite estimates are calibrated during detailed technical discovery.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

