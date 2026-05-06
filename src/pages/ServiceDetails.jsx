import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { services } from '../constants/services';
import { Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link as LinkIcon, TrendingUp, ArrowLeft, CheckCircle2, Zap, Shield, Clock } from 'lucide-react';
import GlowCard from '../components/ui/GlowCard';
import ScrambleText from '../components/ui/ScrambleText';

const iconMap = {
  Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link: LinkIcon, TrendingUp
};

const processSteps = [
  { title: "Strategy", desc: "We define the roadmap and goals.", icon: <Zap size={18} /> },
  { title: "Design", desc: "Crafting a premium visual identity.", icon: <Palette size={18} /> },
  { title: "Develop", desc: "Building with top-tier engineering.", icon: <Rocket size={18} /> },
  { title: "Launch", desc: "Deploying to the world securely.", icon: <Shield size={18} /> }
];

export default function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-display">Service Not Found</h1>
          <Link to="/" className="text-accent-primary hover:underline font-mono">Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon];

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      
      {/* Noise Texture Overaly */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-12 group font-mono text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit to Main Deck</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center text-accent-blue border border-white/10 shadow-[0_0_20px_rgba(0,245,255,0.1)]">
                  <Icon size={28} />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight tracking-tighter">
                <ScrambleText text={service.title} />
              </h1>

              <div className="flex items-center gap-6 mb-12 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Clock size={16} className="text-accent-blue" />
                  <span className="text-sm font-mono text-gray-400">7-Day Delivery</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Shield size={16} className="text-accent-purple" />
                  <span className="text-sm font-mono text-gray-400">Fixed Pricing</span>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-16 font-light">
                {service.details}
              </p>

              {/* What's Included Section */}
              <div className="mb-20">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-accent-primary" />
                  What's Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.deliverables.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-primary/30 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <CheckCircle2 size={20} className="text-accent-primary mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-white font-bold mb-1">{item}</div>
                          <div className="text-sm text-gray-500 leading-relaxed">Full implementation with industry standards and performance optimization.</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* The Process */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-accent-blue" />
                  Our Process
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {processSteps.map((step, i) => (
                    <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-accent-blue">
                        {step.icon}
                      </div>
                      <div className="font-bold text-sm mb-1">{step.title}</div>
                      <div className="text-[10px] text-gray-600 uppercase tracking-tighter">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar / CTA (4 cols) */}
          <div className="lg:col-span-4 sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GlowCard className="p-8 backdrop-blur-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <div className="relative z-10">
                  <div className="mb-10">
                    <span className="text-gray-500 text-xs uppercase tracking-[0.2em] font-mono">Investment</span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-5xl font-bold text-white tracking-tighter">{service.price}</span>
                      <span className="text-gray-500 text-sm font-mono">/project</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href={`https://wa.me/917567097891?text=Hello Milan! I am interested in your ${service.title} service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-accent-primary hover:bg-accent-primary/90 text-black font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(180,118,255,0.3)] hover:shadow-[0_0_40px_rgba(180,118,255,0.5)] active:scale-95"
                    >
                      Secure Booking
                      <Rocket size={18} />
                    </a>
                    <button 
                      onClick={() => navigate('/')}
                      className="w-full py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all hover:border-white/20 active:scale-95"
                    >
                      Compare Packages
                    </button>
                  </div>

                  <div className="mt-12 pt-10 border-t border-white/10">
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono mb-6">Built With</div>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-gray-300 text-xs font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 p-4 rounded-xl bg-accent-blue/5 border border-accent-blue/20">
                    <div className="text-[10px] text-accent-blue font-bold uppercase tracking-widest mb-1">Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-gray-400">Accepting new projects</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
