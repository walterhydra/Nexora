import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ShieldAlert, CreditCard, Building2, Globe, 
  ArrowRight, ShieldCheck, Zap, Lock, Terminal, Activity
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

export default function PaymentPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#02000a] text-gray-100 relative overflow-hidden font-sans">
      {/* Deep Space Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#02000a] to-[#02000a] -z-20" />
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-0 left-0 w-full h-[200vh] opacity-30 -z-10 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-accent-violet/10 rounded-full blur-[150px]" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32 mt-10 relative"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 mb-8 backdrop-blur-md"
          >
            <Activity className="text-accent-blue" size={14} />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-blue">Investment Architecture</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-black mb-8 tracking-tighter leading-none">
            The Nexora <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-indigo-400 to-accent-violet">
              Protocol
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            World-class engineering requires elite operational standards. Our financial architecture is built for speed, transparency, and mutual protection.
          </p>
        </motion.div>

        {/* Engagement Models */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
            <Zap className="text-accent-blue" size={28} />
            <h2 className="text-3xl md:text-4xl font-display font-bold">Engagement Models</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard Protocol */}
            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl" />
              <div className="relative h-full bg-[#0a0a14]/80 backdrop-blur-xl p-10 rounded-[2rem] border border-white/5 hover:border-accent-blue/30 transition-colors duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue to-transparent opacity-50" />
                
                <h3 className="text-3xl font-display font-bold mb-3 text-white">Standard Execution</h3>
                <p className="text-gray-400 mb-10 font-medium">Engineered for 7-day rapid deployments and high-impact websites.</p>
                
                <div className="relative">
                  {/* Timeline connecting line */}
                  <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-blue via-white/10 to-white/10" />
                  
                  <div className="space-y-10 relative z-10">
                    <div className="flex gap-6">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-accent-blue/20 border border-accent-blue/30 text-accent-blue flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                        50%
                      </div>
                      <div className="pt-2">
                        <h4 className="text-xl font-bold text-white mb-2">System Initiation</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">Secures your project slot and triggers the immediate start of design and engineering sprints.</p>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-bold text-xl group-hover:bg-accent-blue/10 group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all duration-500">
                        50%
                      </div>
                      <div className="pt-2">
                        <h4 className="text-xl font-bold text-white mb-2">Final Handover</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">Required upon staging server approval, prior to source code delivery and live domain push.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enterprise Protocol */}
            <motion.div variants={itemVariants} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl" />
              <div className="relative h-full bg-[#0a0a14]/80 backdrop-blur-xl p-10 rounded-[2rem] border border-white/5 hover:border-accent-violet/30 transition-colors duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-violet to-transparent opacity-50" />
                
                <h3 className="text-3xl font-display font-bold mb-3 text-white">Enterprise Protocol</h3>
                <p className="text-gray-400 mb-10 font-medium">Architected for large-scale SaaS platforms and multi-phase applications.</p>
                
                <div className="relative">
                  {/* Timeline connecting line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-violet via-white/10 to-white/10" />
                  
                  <div className="space-y-8 relative z-10">
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-accent-violet/20 border border-accent-violet/30 text-accent-violet flex items-center justify-center font-bold shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                        30%
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-white mb-1">Architecture Kickoff</h4>
                        <p className="text-gray-400 text-sm">Post-agreement signing & discovery.</p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-bold group-hover:bg-accent-violet/10 group-hover:text-accent-violet group-hover:border-accent-violet/30 transition-all duration-500">
                        40%
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-white mb-1">Alpha Milestone</h4>
                        <p className="text-gray-400 text-sm">Upon delivery of core functional backend & UI.</p>
                      </div>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-bold group-hover:bg-accent-violet/10 group-hover:text-accent-violet group-hover:border-accent-violet/30 transition-all duration-500">
                        30%
                      </div>
                      <div className="pt-2">
                        <h4 className="text-lg font-bold text-white mb-1">Production Release</h4>
                        <p className="text-gray-400 text-sm">Before final deployment to production servers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Non-Negotiable Standards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-32 max-w-5xl mx-auto"
        >
          <div className="bg-[#05050a] border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Terminal size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <Lock className="text-red-400" size={28} />
              <h2 className="text-3xl md:text-4xl font-display font-bold">Non-Negotiable Directives</h2>
            </div>
            
            <div className="space-y-4 relative z-10">
              {[
                {
                  title: "Zero-Start Protocol",
                  desc: "Absolutely no engineering, design drafts, or 'test codes' commence until the initial system payment is verified in our ledgers."
                },
                {
                  title: "Codebase Quarantine",
                  desc: "All development happens on Nexora secure staging servers. Source code, IP transfers, and live domain deployments are quarantined until 100% ledger clearance."
                },
                {
                  title: "Phase-Locked Revisions",
                  desc: "Project progression and active revision cycles are strictly bound to their respective payment phases. We do not advance to Phase B if Phase A is unresolved."
                }
              ].map((rule, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="md:w-1/3 shrink-0">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                      {rule.title}
                    </h4>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Global Commerce & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-32">
          
          {/* Payment Gateways */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-[#0a0a14]/50 backdrop-blur-lg p-10 rounded-[2rem] border border-white/5"
          >
            <h3 className="text-2xl font-display font-bold mb-8 text-white flex items-center gap-3">
              <Globe className="text-emerald-400" size={24} /> Global Commerce Channels
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <h4 className="font-bold text-white mb-1">International</h4>
                <p className="text-xs text-gray-400">Stripe / PayPal / Wise / Crypto</p>
              </div>
              
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard size={20} />
                </div>
                <h4 className="font-bold text-white mb-1">India Protocol</h4>
                <p className="text-xs text-gray-400">UPI / GPay / PhonePe / Paytm</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group sm:col-span-2">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  <Building2 size={20} />
                </div>
                <h4 className="font-bold text-white mb-1">Corporate Wire</h4>
                <p className="text-xs text-gray-400">Direct Bank Transfer (NEFT / IMPS / RTGS / SWIFT)</p>
              </div>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-gradient-to-br from-accent-blue/10 to-transparent p-10 rounded-[2rem] border border-accent-blue/20 relative overflow-hidden flex flex-col justify-center"
          >
            <div className="mb-6">
              <ShieldCheck className="w-12 h-12 text-accent-blue" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 text-white">The Guarantee</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We deliver world-class digital products under impossible deadlines. 
              <br/><br/>
              This strict financial protocol ensures our engineering fleet remains 100% focused on architectural excellence, eliminating administrative friction and protecting both entities throughout the development lifecycle.
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#0a0a14] to-[#0f0f1a] p-12 md:p-20 rounded-[3rem] border border-white/10 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent-blue/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-violet">Initiate?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              If our operational protocols align with your standards, we are ready to engineer your digital empire.
            </p>
            
            <div className="flex justify-center">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <MagneticButton className="bg-white text-black hover:bg-gray-100 px-8 py-4 font-bold text-lg rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Execute Protocol <ArrowRight size={20} />
                </MagneticButton>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
