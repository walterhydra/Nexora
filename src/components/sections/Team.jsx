import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { team } from '../../constants/team';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const hexColors = [
  '#8B5CF6', // violet
  '#3B82F6', // blue
  '#EC4899', // pink
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // rose
  '#06B6D4'  // cyan
];

const darkBgColors = [
  '#2e1065', // dark violet
  '#1e3a8a', // dark blue
  '#831843', // dark pink
  '#064e3b', // dark emerald
  '#78350f', // dark amber
  '#7f1d1d', // dark rose
  '#164e63'  // dark cyan
];

const TeamMember = ({ member, index, isActive, onMouseEnter, onMouseLeave }) => {
  const colorHex = hexColors[index % hexColors.length];
  const darkColor = darkBgColors[index % darkBgColors.length];

  return (
    <motion.div
      layout
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative h-full min-w-[60px] md:min-w-[80px] border-r border-white/10 group cursor-pointer overflow-hidden"
      animate={{
        flex: isActive ? (window.innerWidth > 768 ? 6 : 10) : 1,
        backgroundColor: isActive ? darkColor : '#0a0a0a'
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 25,
        mass: 0.5
      }}
      style={{ willChange: "flex, background-color" }}
    >
      {/* Background Image Overlay (only visible when expanded) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={member.image} 
              alt="" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center p-6 md:p-12">
        {/* Collapsed State: Vertical Text */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center gap-8">
            <span className="font-mono text-sm text-white/40">{(index + 1).toString().padStart(2, '0')}</span>
            <span className="font-display font-black text-2xl uppercase tracking-widest whitespace-nowrap -rotate-90 origin-center text-white/20 group-hover:text-white/60 transition-colors">
              {member.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Expanded State: Content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row w-full h-full items-center justify-between"
            >
              {/* Info Side */}
              <div className="flex flex-col justify-center max-w-lg">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-mono text-base uppercase tracking-widest mb-4"
                  style={{ color: colorHex }}
                >
                  {(index + 1).toString().padStart(2, '0')} — Core Member
                </motion.span>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter"
                >
                  {member.name}
                </motion.h3>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <p className="text-2xl font-display font-bold text-white/90">{member.role}</p>
                  <p className="text-lg text-gray-400 font-medium max-w-sm leading-relaxed">{member.specialty}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-8 mt-12"
                >
                  {member.isCTA ? (
                    <a 
                      href={member.links.apply} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group/btn relative px-8 py-4 bg-white text-black font-display font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        APPLY NOW
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-violet opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-violet opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                        APPLY NOW
                      </span>
                    </a>
                  ) : (
                    <>
                      {member.links.linkedin && (
                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                          <LinkedinIcon className="w-6 h-6" />
                        </a>
                      )}
                      {member.links.github && member.links.github !== "#" && (
                        <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                          <GithubIcon className="w-6 h-6" />
                        </a>
                      )}
                    </>
                  )}
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
                className="hidden lg:block w-[400px] h-[500px] relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Team() {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <section className="h-screen bg-bg-primary overflow-hidden flex flex-col" id="team">
      <div className="max-w-7xl mx-auto px-6 py-12 flex-shrink-0">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "4rem" }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-accent-primary to-accent-violet mb-6"
            />
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
              Our <span className="text-gradient">Team</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-lg font-medium leading-relaxed">
            A collective of digital craftsmen building the next generation of web experiences.
          </p>
        </div>
      </div>

      <div 
        className="flex-1 flex w-full border-t border-white/10 overflow-hidden"
        onMouseLeave={() => setActiveMember(null)}
      >
        {team.map((member, index) => (
          <TeamMember
            key={member.name}
            member={member}
            index={index}
            isActive={activeMember === index}
            onMouseEnter={() => setActiveMember(index)}
          />
        ))}
      </div>
    </section>
  );
}
