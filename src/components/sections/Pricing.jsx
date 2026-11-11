import React, { useState, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { pricingTiers } from '../../constants/pricing';
import { Check, ArrowRight, X } from 'lucide-react';

const tiers = [
  { key: 'starter', label: 'Starter' },
  { key: 'intermediate', label: 'Intermediate' },
  { key: 'growth', label: 'Growth' },
  { key: 'enterprise', label: 'Enterprise' },
];

const PricingCard = React.memo(({ plan, isPopular, onGetStarted }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--card-mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--card-my', `${e.clientY - rect.top}px`);
  };

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between py-7 px-6 sm:py-8 sm:px-7 min-h-[460px] sm:min-h-[490px] rounded-xl transition-all duration-300 ${
        isPopular
          ? 'bg-white dark:bg-[#0c0c12] border-2 border-black dark:border-white shadow-[0_16px_45px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_rgba(255,255,255,0.08)] md:-translate-y-2'
          : 'bg-white dark:bg-[#09090d] border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/25'
      }`}
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
    >
      {/* MOST POPULAR Floating Badge - Positioned outside the shine overflow so it's 100% visible */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
          <span 
            className="bg-black dark:bg-white text-white dark:text-black text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-sm tracking-[0.18em] shadow-lg block text-center whitespace-nowrap"
            style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
          >
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Shine Effects: Contained inside this inner rounded wrapper so card overflow stays visible */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl z-0">
        {isHovered && (
          <>
            <div
              className="absolute -inset-px"
              style={{
                background: `radial-gradient(320px circle at var(--card-mx, 50%) var(--card-my, 50%), rgba(255, 255, 255, 0.08), transparent 65%)`,
              }}
            />
            <div 
              className="absolute -top-[50%] -bottom-[50%] -left-[100%] w-[100%] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transform -skew-x-12 animate-[card-shine-sweep_0.75s_ease-out_forwards]" 
            />
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-col flex-1 justify-between h-full">
        <div>
          {/* Title */}
          <h3 
            className="text-[17px] sm:text-[19px] font-bold text-gray-950 dark:text-white tracking-tight mb-1.5"
            style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
          >
            {plan.name}
          </h3>

          {/* Price & Duration */}
          <div className="flex items-baseline gap-1.5 mb-3.5">
            <span 
              className="text-2xl sm:text-[30px] font-bold tracking-tight text-gray-950 dark:text-white"
              style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
            >
              {plan.price}
            </span>
            <span 
              className="text-[11px] sm:text-xs text-gray-400 dark:text-white/40 font-normal"
              style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
            >
              / {plan.duration}
            </span>
          </div>

          {/* Subtle Hairline Divider */}
          <div className="w-full h-px bg-black/[0.06] dark:bg-white/[0.08] mb-5" />

          {/* Features list */}
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-gray-600 dark:text-white/70">
                <Check size={14} className="text-gray-900 dark:text-white shrink-0 mt-0.5" strokeWidth={2.2} />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="pt-4 mt-auto">
          <button
            onClick={() => onGetStarted(plan)}
            className={`w-full py-2.5 px-3.5 rounded-lg font-semibold text-xs sm:text-[13px] tracking-wide flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              isPopular
                ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/85 dark:hover:bg-white/90 shadow-sm'
                : 'border border-black/15 dark:border-white/15 bg-white dark:bg-transparent text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
          >
            <span>Get Started</span>
            <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </m.div>
  );
});

export default function Pricing() {
  const [activeTier, setActiveTier] = useState('starter');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [messageText, setMessageText] = useState('');

  const currentPlans = pricingTiers[activeTier] || pricingTiers.starter;

  const handleGetStarted = (plan) => {
    const calculatedPrice = plan.price === 'Custom' 
      ? 'Custom Enterprise scope' 
      : `${plan.price} (turnaround: ${plan.duration})`;

    const msg = `Hi Milan! 🚀 I'm interested in the "${plan.name}" plan (${calculatedPrice}) under the ${activeTier.toUpperCase()} tier for our project. Let's connect and discuss the next steps!`;

    setSelectedPlan(plan);
    setMessageText(msg);
  };

  return (
    <section 
      id="pricing" 
      className="py-20 md:py-28 px-5 sm:px-6 bg-[#040406] dark:bg-[#040406] relative overflow-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
    >
      {/* Background Ambience - Hardware GPU Accelerated Radial Glow */}
      <div 
        className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none transform-gpu"
        style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-10 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none transform-gpu"
        style={{ background: 'radial-gradient(circle, rgba(123, 47, 255, 0.05) 0%, transparent 70%)' }}
      />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,4,6,1)_100%),_linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-35" />

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        
        {/* Category Tag */}
        <span 
          className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-gray-400 dark:text-white/45 mb-3 block"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          PRICING
        </span>

        {/* Section Heading - Enlarged as requested */}
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white mb-3.5 leading-[1.14]"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          Transparent Pricing. No Surprises.
        </h2>

        {/* Section Subtitle - Enlarged as requested */}
        <p 
          className="text-sm sm:text-base md:text-[17px] text-gray-400 dark:text-white/65 max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          Every quote includes a line-by-line breakdown. No hidden charges. No surprise billings. Ever.
        </p>

        {/* Trust Badges Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-7 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-xs sm:text-[13px] text-gray-600 dark:text-white/70 mb-9">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-gray-900 dark:text-white" strokeWidth={2.4} />
            <span className="font-medium">7-Day Delivery Guaranteed</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Check size={14} className="text-gray-900 dark:text-white" strokeWidth={2.4} />
            <span className="font-medium">100% Code Ownership</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Check size={14} className="text-gray-900 dark:text-white" strokeWidth={2.4} />
            <span className="font-medium">Free Quote in 24 Hours</span>
          </div>
        </div>

        {/* Tier Tabs Switcher - Enlarged as requested */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.04] dark:bg-[#0e0e16] shadow-sm gap-1">
            {tiers.map((t) => {
              const isActive = activeTier === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTier(t.key)}
                  className={`px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm md:text-[15px] font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                      : 'text-gray-400 dark:text-white/60 hover:text-black dark:hover:text-white'
                  }`}
                  style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="max-w-[1020px] mx-auto pt-2">
          <AnimatePresence mode="wait">
            <m.div
              key={activeTier}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 text-left items-stretch"
            >
              {currentPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  isPopular={plan.popular}
                  onGetStarted={handleGetStarted}
                />
              ))}
            </m.div>
          </AnimatePresence>
        </div>

        {/* Bottom Note */}
        <p 
          className="text-[11px] sm:text-xs text-gray-400 dark:text-white/45 mt-9"
          style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
        >
          * Starting prices. Exact quote within 24 hours — free, no obligation.
        </p>

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
              className="relative w-full max-w-md bg-[#0b0c10]/95 border border-white/10 rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-left"
              style={{ fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif' }}
            >
              {/* Accent ambient glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-accent-primary/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-accent-violet/10 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-1 rounded-full hover:bg-white/5"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="mb-5">
                <span className="text-[9.5px] uppercase tracking-[0.2em] text-white/50 font-bold block mb-1">
                  Configure Request · {activeTier.toUpperCase()}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedPlan.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Choose how you would like to send your project request to Milan.
                </p>
              </div>

              {/* Message Area */}
              <div className="mb-6">
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Your Customized Message:
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-white/95 placeholder-gray-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all resize-none leading-relaxed"
                  placeholder="Write your custom message here..."
                />
              </div>

              {/* Action Channels */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/917567097891?text=${encodeURIComponent(messageText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.25)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Send via WhatsApp</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:milan@nexoraa.studio?subject=${encodeURIComponent(`Inquiry for ${selectedPlan.name} (${activeTier})`)}&body=${encodeURIComponent(messageText)}`}
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span>Send via Email</span>
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
