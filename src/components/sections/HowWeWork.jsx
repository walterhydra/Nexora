import React from 'react';

const steps = [
  { 
    day: "0", 
    title: "Discovery Call", 
    desc: "We understand your goals, audience, and deadline in a 30-min WhatsApp/Zoom call.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    day: "1-2", 
    title: "Design Sprint", 
    desc: "Wireframes → Hi-fi Figma mockups. You approve before a single line of code.",
    gridClass: "md:col-span-2 md:row-span-2",
    featured: true
  },
  { 
    day: "2-5", 
    title: "Live Build Access", 
    desc: "You get a private preview URL. Watch your product being built in real time.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    day: "5-6", 
    title: "Testing & Revisions", 
    desc: "Cross-device testing, bug fixes, your feedback — up to 3 revision rounds.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    day: "7", 
    title: "Deploy & Handoff", 
    desc: "We launch. You get: repo access, code ownership cert, deploy credentials.",
    gridClass: "md:col-span-2 md:row-span-1",
    highlight: true
  }
];

export default function HowWeWork() {
  return (
    <section id="howwework" className="py-24 px-6 md:px-12 bg-[#070709] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-violet/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center md:text-left mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
            From Idea to Live — <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">In 7 Days</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            A transparent, asymmetric bento grid process that keeps you in control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-fr">
          {steps.map((step, i) => {
            return (
              <div 
                key={i} 
                className={`${step.gridClass} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`relative h-full w-full rounded-2xl overflow-hidden p-[1px] bg-gradient-to-tr ${
                  step.highlight 
                    ? 'from-accent-primary via-accent-secondary to-accent-violet' 
                    : step.featured
                    ? 'from-accent-secondary/40 to-transparent'
                    : 'from-white/10 to-transparent'
                }`}>
                  <div className={`relative h-full w-full rounded-[15px] p-8 bg-[#0D0D12]/90 hover:bg-[#13131A]/90 transition-all duration-500 backdrop-blur-sm flex flex-col justify-between group`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl border ${step.featured ? 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/30' : 'bg-accent-primary/10 text-accent-primary border-accent-primary/20'}`}>
                          {i + 1}
                        </div>
                        <div className={`text-sm font-mono px-3 py-1 rounded-full border ${step.featured ? 'text-accent-secondary bg-accent-secondary/10 border-accent-secondary/20' : 'text-accent-violet bg-accent-violet/10 border-accent-violet/20'}`}>
                          Day {step.day}
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold mb-4 ${step.featured ? 'text-white text-3xl' : 'text-gray-100'}`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-base md:text-lg">
                        {step.desc}
                      </p>
                    </div>
                    
                    {step.featured && (
                      <div className="mt-8 w-full h-48 bg-gradient-to-tr from-accent-secondary/5 to-transparent border border-accent-secondary/10 rounded-xl overflow-hidden flex items-center justify-center p-4 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,53,0.08),transparent)] pointer-events-none"></div>
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-accent-secondary animate-ping"></span>
                            <span className="font-mono text-xs font-bold tracking-widest text-accent-secondary uppercase">Active Sprint</span>
                          </div>
                          <div className="flex items-end h-16 gap-1">
                            <span className="w-2 bg-accent-primary rounded-t animate-pulse h-12 duration-1000"></span>
                            <span className="w-2 bg-accent-secondary rounded-t animate-pulse h-16 duration-700"></span>
                            <span className="w-2 bg-accent-violet rounded-t animate-pulse h-8 duration-500"></span>
                            <span className="w-2 bg-accent-primary rounded-t animate-pulse h-14 duration-300"></span>
                            <span className="w-2 bg-accent-secondary rounded-t animate-pulse h-6 duration-800"></span>
                            <span className="w-2 bg-accent-violet rounded-t animate-pulse h-12 duration-600"></span>
                            <span className="w-2 bg-accent-primary rounded-t animate-pulse h-16 duration-400"></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
