import React from 'react';
import { motion } from 'framer-motion';
import { team } from '../../constants/team';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const MemberCard = ({ member, index }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.2 }}
      className="glass rounded-2xl p-6 flex flex-col items-center group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-primary/5 opacity-40 transition-opacity duration-500" />
      
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-accent-primary/30 transition-colors duration-500 relative z-10 flex items-center justify-center bg-white/5">
        {!imageError ? (
          <img 
            src={member.image} 
            alt={member.name} 
            className={`w-full h-full object-cover transition-all duration-500 ${member.imageClass || 'object-center'}`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-accent-primary bg-accent-primary/10">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 relative z-10">{member.name}</h3>
      <p className="text-accent-primary mb-6 relative z-10 font-medium">{member.role}</p>
      
      <div className="flex gap-4 relative z-10">
        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <LinkedinIcon className="w-5 h-5" />
        </a>
        <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <GithubIcon className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
};

export default function Team() {
  return (
    <section className="py-32 bg-bg-primary relative z-10 overflow-hidden" id="team">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-accent-violet/5 rounded-[100%] blur-[120px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Meet The <span className="text-gradient">Team</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            The minds behind the magic. We are a collective of creators, engineers, and visionaries.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, index) => (
            <div key={member.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-sm">
              <MemberCard member={member} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
