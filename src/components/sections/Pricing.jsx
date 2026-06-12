import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { pricing } from '../../constants/pricing';
import { fadeUp, staggerContainer } from '../../animations/variants';
import MagneticButton from '../ui/MagneticButton';
import GlowCard from '../ui/GlowCard';
import { Check, X } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [messageText, setMessageText] = useState('');

  const handleGetStarted = (plan) => {
    const calculatedPrice = plan.price === "Custom" 
      ? "Custom" 
      : `₹${isAnnual ? Math.floor(Number(plan.price) * 0.8).toLocaleString('en-IN') : Number(plan.price).toLocaleString('en-IN')}${isAnnual ? '/mo' : ''}`;

    let msg = '';
    if (plan.price === "Custom") {
      msg = `Hi Milan! 🚀 I'm interested in the ${plan.name} plan. We are looking for custom enterprise-grade engineering at scale. Let's connect to discuss our requirements!`;
    } else {
      msg = `Hi Milan! 🚀 I'm interested in getting started with the ${plan.name} plan (${calculatedPrice}) for our project. Let's connect and discuss the next steps!`;
    }

    setSelectedPlan(plan);
    setMessageText(msg);
  };

  return (
    <section id="pricing" className="py-16 bg-white dark:bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <m.h2 variants={fadeUp} className="text-3xl md:text-4xl font-display font-bold mb-3">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </m.h2>
          <m.p variants={fadeUp} className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            No hidden fees. No surprise charges. Just world-class execution.
          </m.p>

          {/* Toggle */}
          <m.div variants={fadeUp} className="flex items-center justify-center gap-3">
            <span className={`text-xs font-medium ${!isAnnual ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Pay per project</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-gray-200 dark:bg-white/10 p-0.5 transition-colors hover:bg-gray-300 dark:hover:bg-white/20 relative animate-none"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-accent-blue transition-transform duration-300 shadow-md ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-xs font-medium ${isAnnual ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Retainer <span className="text-[10px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-full ml-1 font-bold">-20%</span></span>
          </m.div>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricing.map((plan, idx) => (
            <m.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative ${plan.popular ? 'md:-translate-y-2' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="bg-gradient-to-r from-accent-blue to-accent-purple text-gray-900 dark:text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              
              <GlowCard className={`h-full p-6 flex flex-col ${plan.popular ? 'border-accent-blue/50 ring-1 ring-accent-blue/50' : ''}`}>
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                
                <div className="mb-4 flex items-baseline">
                  <span className="text-3xl font-display font-bold">
                    {plan.price === "Custom" 
                      ? "Custom" 
                      : `₹${isAnnual ? Math.floor(Number(plan.price) * 0.8).toLocaleString('en-IN') : Number(plan.price).toLocaleString('en-IN')}`}
                  </span>
                  {plan.price !== "Custom" && <span className="text-xs text-gray-500 dark:text-gray-400 ml-1.5"> {isAnnual ? '/mo' : 'starting'}</span>}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs">
                      <Check size={15} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded && plan.notIncluded.map((feature, i) => (
                    <li key={`not-${i}`} className="flex items-start gap-2.5 text-xs opacity-50">
                      <X size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton 
                  onClick={() => handleGetStarted(plan)}
                  className={`w-full justify-center text-xs py-2 ${plan.popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-white dark:bg-black text-gray-900 dark:text-white dark:bg-white/10 dark:hover:bg-white/20'}`}
                >
                  {plan.price === "Custom" ? "Let's Talk" : "Get Started"}
                </MagneticButton>
              </GlowCard>
            </m.div>
          ))}
        </div>
      </div>

      {/* Pricing Contact Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedPlan(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Content */}
            <m.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0b0c10]/95 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-left"
            >
              {/* Accent ambient glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-accent-blue/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-accent-purple/15 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-1 rounded-full hover:bg-white/5"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-blue font-mono font-bold block mb-1">
                  Configure Request
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white">
                  {selectedPlan.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Choose how you would like to send your project request to Milan.
                </p>
              </div>

              {/* Message Area */}
              <div className="mb-8">
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  Your Customized Message:
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm text-white/95 placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all resize-none leading-relaxed font-light"
                  placeholder="Write your custom message here..."
                />
              </div>

              {/* Action Channels */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/917567097891?text=${encodeURIComponent(messageText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </a>

                {/* Email */}
                <a
                  href={`mailto:milan@nexora.studio?subject=${encodeURIComponent(`Inquiry for ${selectedPlan.name}`)}&body=${encodeURIComponent(messageText)}`}
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  Send via Email
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
