import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, X, ShieldAlert, CreditCard, Building2, Globe, 
  AlertCircle, ArrowRight, ShieldCheck 
} from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

export default function PaymentPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/10 via-black to-black -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <CreditCard className="text-accent-blue" size={14} />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Billing Protocol</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tight">
            Payment <span className="text-accent-blue">Policy</span> & Rules
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Clear, transparent, and firm billing structures. We believe that good business is built on clear expectations.
          </p>
        </motion.div>

        {/* Split Cards: Payment Structures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Standard Projects Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[40px] border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />
            
            <h3 className="text-3xl font-bold mb-2 text-white">Standard Projects</h3>
            <p className="text-gray-400 mb-8 font-medium">For most 7-day websites and web apps.</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">50% Advance</h4>
                  <p className="text-sm text-gray-400">Required before any work begins.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">50% Final</h4>
                  <p className="text-sm text-gray-400">Paid before final handover & domain push.</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
            </div>
          </motion.div>

          {/* Large/Complex Projects Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-[40px] border border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-pink-500" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full" />
            
            <h3 className="text-3xl font-bold mb-2 text-white">Complex Projects</h3>
            <p className="text-gray-400 mb-8 font-medium">For large-scale enterprise portals and multi-phase apps.</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-white">30% Kickoff</h4>
                  <p className="text-xs text-gray-400">After agreement signing</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">1</div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-white">40% Milestone</h4>
                  <p className="text-xs text-gray-400">Mid-project development review</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-white">30% Final</h4>
                  <p className="text-xs text-gray-400">Before delivery & deployment</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">3</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strict Rules Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10">
            <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <ShieldAlert className="text-red-400" size={32} /> Strict Boundaries
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-red-500/20 text-red-500 p-1 rounded-full"><X size={16} strokeWidth={3} /></div>
                <div>
                  <p className="text-xl font-bold text-white mb-1">No work starts without advance payment</p>
                  <p className="text-gray-400">We do not provide free mockups, drafts, or "test" codes before the initial payment is cleared.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-red-500/20 text-red-500 p-1 rounded-full"><X size={16} strokeWidth={3} /></div>
                <div>
                  <p className="text-xl font-bold text-white mb-1">No final files shared before last payment</p>
                  <p className="text-gray-400">The project is hosted on our staging servers for your review. Source code and domain handover only occurs after 100% payment clearance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-500/20 text-green-500 p-1 rounded-full"><Check size={16} strokeWidth={3} /></div>
                <div>
                  <p className="text-xl font-bold text-white mb-1">Revisions are tied to payment phases</p>
                  <p className="text-gray-400">Revisions and progression to the next development phase only begin after the payment for the current phase has been cleared.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods & Why This Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          
          {/* Payment Methods */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-3xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Accepted Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">UPI</h4>
                  <p className="text-sm text-gray-400">GPay, PhonePe, Paytm (India Only)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Bank Transfer</h4>
                  <p className="text-sm text-gray-400">NEFT / IMPS / RTGS</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">International</h4>
                  <p className="text-sm text-gray-400">PayPal / Wise / Stripe</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why This Policy */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-3xl border border-white/10 bg-accent-blue/5 flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="mb-6">
              <ShieldCheck className="w-16 h-16 text-accent-blue opacity-80" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Why This Policy?</h3>
            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              We deliver world-class digital products in incredibly tight deadlines. This payment structure ensures our engineering team is fully committed to your project without financial distractions, while protecting both you (the client) and us (the agency) throughout the development cycle.
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-20 rounded-[40px] border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-transparent" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              Ready to <span className="text-accent-blue">Start?</span> Let's Talk.
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              If our terms align with your expectations, we are ready to build your next digital empire.
            </p>
            
            <div className="flex justify-center">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                <MagneticButton className="bg-[#25D366] text-white hover:bg-[#20bd5a] px-8 py-4 font-bold text-lg rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                  Chat on WhatsApp
                </MagneticButton>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
