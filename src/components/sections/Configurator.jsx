import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, ArrowRight, Zap, Code, Shield, Sparkles } from 'lucide-react';

const features = [
  { id: 'custom_design', title: 'Bespoke 3D & UI', description: 'Award-winning visuals, WebGL, and complex animations.', time: 14, basePrice: 4000, basePriceINR: 330000, tech: ['Three.js', 'WebGL', 'GSAP'], icon: Sparkles },
  { id: 'ecommerce', title: 'E-Commerce Engine', description: 'Stripe integration, product catalogs, and cart systems.', time: 10, basePrice: 3000, basePriceINR: 250000, tech: ['Stripe', 'Cart System', 'Inventory API'], icon: Calculator },
  { id: 'ai_integration', title: 'AI Integration', description: 'Custom LLM chatbots, automated workflows.', time: 7, basePrice: 2500, basePriceINR: 210000, tech: ['OpenAI/Claude', 'VectorDB', 'LangChain'], icon: Zap },
  { id: 'backend_system', title: 'Custom Backend', description: 'Node.js/Python infrastructure and database architecture.', time: 14, basePrice: 4500, basePriceINR: 375000, tech: ['Node.js', 'PostgreSQL', 'Redis'], icon: Code },
  { id: 'security', title: 'Enterprise Security', description: 'Advanced auth, penetration testing, compliance.', time: 5, basePrice: 1500, basePriceINR: 125000, tech: ['OAuth2', 'JWT', 'ISO27001'], icon: Shield },
];

export default function Configurator() {
  const [selected, setSelected] = useState(['custom_design']); // Default one selected
  const [currency, setCurrency] = useState('INR'); // Default to Indian Rupees as requested

  const toggleFeature = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    let days = 7; // Base setup time
    let priceUSD = 3000; // Base starting price USD
    let priceINR = 250000; // Base starting price INR
    let complexity = 1;

    selected.forEach(id => {
      const feat = features.find(f => f.id === id);
      if (feat) {
        days += feat.time;
        priceUSD += feat.basePrice;
        priceINR += feat.basePriceINR;
        complexity += 1;
      }
    });

    const weeks = Math.ceil(days / 7);
    
    return { days, weeks, priceUSD, priceINR, complexity };
  };

  const estimate = calculateEstimate();

  const formatPrice = () => {
    if (currency === 'USD') {
      return `$${(estimate.priceUSD / 1000).toFixed(1)}k+`;
    } else {
      // Lakh formatting for premium Indian context: e.g. ₹5.8L+
      return `₹${(estimate.priceINR / 100000).toFixed(1)}L+`;
    }
  };

  const getWhatsAppLink = () => {
    const selectedFeats = selected.map(id => features.find(f => f.id === id)).filter(Boolean);
    const selectedList = selectedFeats.map(f => `• ${f.title}`).join('\n');
    const timeline = `${estimate.weeks} Weeks`;
    const priceVal = formatPrice();
    const formattedAmt = currency === 'USD' ? `$${estimate.priceUSD.toLocaleString()}` : `₹${estimate.priceINR.toLocaleString('en-IN')}`;
    
    const message = `Hey Nexora! 🚀\n\nI have configured our system engineering specs using the live estimator:\n\n📋 *Engineered Capabilities:*\n${selectedList}\n\n📊 *Estimate details:*\n- *Timeline:* ${timeline}\n- *Currency Model:* ${currency}\n- *Estimated starting range:* ${priceVal} (${formattedAmt})\n- *Complexity:* ${estimate.complexity > 4 ? 'Enterprise / Complex' : estimate.complexity > 2 ? 'Growth / Moderate' : 'Starter / Linear'}\n\nLet's coordinate on engineering the roadmap!`;
    return `https://wa.me/917383303388?text=${encodeURIComponent(message)}`;
  };

  const getEmailLink = () => {
    const selectedFeats = selected.map(id => features.find(f => f.id === id)).filter(Boolean);
    const selectedList = selectedFeats.map(f => `- ${f.title}`).join('\n');
    const timeline = `${estimate.weeks} Weeks`;
    const priceVal = formatPrice();
    const formattedAmt = currency === 'USD' ? `$${estimate.priceUSD.toLocaleString()}` : `₹${estimate.priceINR.toLocaleString('en-IN')}`;

    const subject = `Engineering Configuration Estimate: ${timeline} Roadmap`;
    const body = `Hey Nexora Team! 🚀\n\nI just designed our premium project architecture using your interactive config deck:\n\n📋 Selected Capabilities:\n${selectedList}\n\n📊 Estimate details:\n- Timeline: ${timeline}\n- Pricing Index: ${currency}\n- Estimated investment baseline: ${priceVal} (${formattedAmt})\n- Architectural complexity: ${estimate.complexity > 4 ? 'Enterprise' : estimate.complexity > 2 ? 'Growth' : 'Starter'}\n\nLet's schedule a technical discovery call to review these specifications!\n\nBest regards,\n[Your Name]`;

    return `https://mail.google.com/mail/?view=cm&fs=1&to=nexoraa.works@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="py-24 px-6 relative bg-black border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.03),_transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Vision</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            Toggle the modules you need for your project. Our system will calculate a live estimate of the timeline and scale required to engineer your solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Toggles (Left/Center) */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const isSelected = selected.includes(feature.id);
              const Icon = feature.icon;
              
              return (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden group flex flex-col justify-between min-h-[200px]
                    ${isSelected 
                      ? 'bg-white/5 border-accent-primary/50 shadow-[0_0_30px_rgba(0,245,255,0.1)]' 
                      : 'bg-[#0A0A0E] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-lg ${isSelected ? 'bg-accent-primary/20 text-accent-primary' : 'bg-white/5 text-white/40 group-hover:text-white/60'}`}>
                        <Icon size={20} />
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                        ${isSelected ? 'border-accent-primary bg-accent-primary text-black' : 'border-white/20'}`}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                  </div>
                  
                  {/* Glowing tag badges for technologies */}
                  <div className="flex flex-wrap gap-1 mt-4 relative z-10 w-full">
                    {feature.tech.map((t, idx) => (
                      <span 
                        key={idx} 
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-all duration-300
                          ${isSelected 
                            ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' 
                            : 'bg-white/5 text-white/30 border border-white/5 group-hover:border-white/10 group-hover:text-white/50'
                          }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Subtle glow behind selected items */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,245,255,0.05),_transparent_70%)] pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Calculator Output (Right) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 rounded-3xl bg-[#0A0A0E] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[50px] pointer-events-none" />
              
              <div className="w-full">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    System Estimate
                  </h3>
                  <div className="flex bg-white/5 rounded-full p-0.5 border border-white/10">
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold transition-all duration-300 ${
                        currency === 'USD' ? 'bg-accent-primary text-black shadow-md' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      USD
                    </button>
                    <button
                      onClick={() => setCurrency('INR')}
                      className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold transition-all duration-300 ${
                        currency === 'INR' ? 'bg-accent-primary text-black shadow-md' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      INR
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-white/40 mb-1">Estimated Timeline</div>
                    <div className="text-3xl font-display font-bold text-white flex items-end gap-2">
                      {estimate.weeks} <span className="text-lg text-white/40 font-sans font-normal">Weeks</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 mt-3 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-accent-primary h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((estimate.days / 60) * 100, 100)}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/40 mb-1">Complexity Level</div>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5, 6].map((level) => (
                        <div 
                          key={level} 
                          className={`h-2 flex-1 rounded-sm transition-colors duration-300 
                            ${level <= estimate.complexity 
                              ? (level > 4 ? 'bg-[#FF5F56]' : level > 2 ? 'bg-[#FFBD2E]' : 'bg-accent-secondary') 
                              : 'bg-white/5'
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Selected Modules Mini Chips */}
                  <div className="pt-5 border-t border-white/5">
                    <div className="text-xs text-white/40 mb-2.5">Engineered Scope Modules</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.length === 0 ? (
                        <span className="text-[10px] font-mono text-white/20 italic">Select capabilities to configure...</span>
                      ) : (
                        selected.map(id => {
                          const feat = features.find(f => f.id === id);
                          return (
                            <motion.span
                              key={id}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-accent-primary"
                            >
                              {feat ? feat.title : id}
                            </motion.span>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <div className="text-sm text-white/40 mb-0.5">Starting Range</div>
                    <div className="text-4xl font-display font-bold text-white">
                      {formatPrice()}
                    </div>
                    <span className="text-[10px] font-mono text-white/30 block mt-1">
                      Estimated: {currency === 'USD' ? `$${estimate.priceUSD.toLocaleString()}` : `₹${estimate.priceINR.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 w-full border-t border-white/5 pt-4">
                <div className="flex flex-col gap-2.5">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#00FF00]/10 border border-[#00FF00]/25 text-[#00FF00] hover:bg-[#00FF00]/20 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer active:scale-95 text-center"
                    style={{ textShadow: '0 0 10px rgba(0,255,0,0.1)' }}
                  >
                    <span>Deploy via WhatsApp</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={getEmailLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 text-white hover:bg-white/[0.08] py-3 rounded-xl font-mono text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer active:scale-95 text-center"
                  >
                    <span>Deploy via Email</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                
                <p className="text-[9px] text-white/30 text-center mt-4">
                  *This is a dynamic baseline estimate. Final scoping requires a technical discovery call.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
