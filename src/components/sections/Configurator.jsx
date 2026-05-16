import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, ArrowRight, Zap, Code, Shield, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const features = [
  { id: 'custom_design', title: 'Bespoke 3D & UI', description: 'Award-winning visuals, WebGL, and complex animations.', time: 14, basePrice: 4000, icon: Sparkles },
  { id: 'ecommerce', title: 'E-Commerce Engine', description: 'Stripe integration, product catalogs, and cart systems.', time: 10, basePrice: 3000, icon: Calculator },
  { id: 'ai_integration', title: 'AI Integration', description: 'Custom LLM chatbots, automated workflows.', time: 7, basePrice: 2500, icon: Zap },
  { id: 'backend_system', title: 'Custom Backend', description: 'Node.js/Python infrastructure and database architecture.', time: 14, basePrice: 4500, icon: Code },
  { id: 'security', title: 'Enterprise Security', description: 'Advanced auth, penetration testing, compliance.', time: 5, basePrice: 1500, icon: Shield },
];

export default function Configurator() {
  const [selected, setSelected] = useState(['custom_design']); // Default one selected

  const toggleFeature = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    let days = 7; // Base setup time
    let price = 3000; // Base starting price
    let complexity = 1;

    selected.forEach(id => {
      const feat = features.find(f => f.id === id);
      if (feat) {
        days += feat.time;
        price += feat.basePrice;
        complexity += 1;
      }
    });

    const weeks = Math.ceil(days / 7);
    
    return { days, weeks, price, complexity };
  };

  const estimate = calculateEstimate();

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
                  className={`relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden group
                    ${isSelected 
                      ? 'bg-white/5 border-accent-primary/50 shadow-[0_0_30px_rgba(0,245,255,0.1)]' 
                      : 'bg-[#0A0A0E] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                >
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
                  <p className="text-sm text-white/40">{feature.description}</p>
                  
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
            <div className="sticky top-32 p-8 rounded-3xl bg-[#0A0A0E] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-[50px] pointer-events-none" />
              
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-8 border-b border-white/5 pb-4">
                System Estimate
              </h3>

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

                <div className="pt-6 border-t border-white/5">
                  <div className="text-sm text-white/40 mb-1">Starting Range</div>
                  <div className="text-4xl font-display font-bold text-white">
                    ${(estimate.price / 1000).toFixed(1)}k+
                  </div>
                </div>

                <MagneticButton className="w-full mt-8 bg-white text-black py-4 rounded-full font-bold flex items-center justify-center gap-2 group hover:bg-white/90 transition-colors">
                  Submit Configuration
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                
                <p className="text-[10px] text-white/30 text-center mt-4">
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
