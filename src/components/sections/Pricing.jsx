import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pricing } from '../../constants/pricing';
import { fadeUp, staggerContainer } from '../../animations/variants';
import MagneticButton from '../ui/MagneticButton';
import GlowCard from '../ui/GlowCard';
import { Check, X } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            No hidden fees. No surprise charges. Just world-class execution.
          </motion.p>

          {/* Toggle */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-black dark:text-white' : 'text-gray-500'}`}>Pay per project</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 rounded-full bg-gray-200 dark:bg-white/10 p-1 transition-colors hover:bg-gray-300 dark:hover:bg-white/20 relative"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-accent-blue transition-transform duration-300 shadow-md ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-black dark:text-white' : 'text-gray-500'}`}>Retainer <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full ml-1">-20%</span></span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricing.map((plan, idx) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative ${plan.popular ? 'md:-translate-y-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="bg-gradient-to-r from-accent-blue to-accent-purple text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              
              <GlowCard className={`h-full p-8 flex flex-col ${plan.popular ? 'border-accent-blue/50 ring-1 ring-accent-blue/50' : ''}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6 flex items-baseline">
                  <span className="text-4xl font-display font-bold">
                    {plan.price === "Custom" 
                      ? "Custom" 
                      : `₹${isAnnual ? Math.floor(Number(plan.price) * 0.8).toLocaleString('en-IN') : Number(plan.price).toLocaleString('en-IN')}`}
                  </span>
                  {plan.price !== "Custom" && <span className="text-gray-500 ml-2"> {isAnnual ? '/mo' : 'starting'}</span>}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check size={18} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded && plan.notIncluded.map((feature, i) => (
                    <li key={`not-${i}`} className="flex items-start gap-3 text-sm opacity-50">
                      <X size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton className={`w-full justify-center ${plan.popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white dark:bg-white/10 dark:hover:bg-white/20'}`}>
                  {plan.price === "Custom" ? "Let's Talk" : "Get Started"}
                </MagneticButton>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
