import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Code2, Radio, Sparkles, Target, X, Zap } from 'lucide-react';
import { FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';
import { team } from '../../constants/team';

const posterMap = {
  Milan: '/team/intro-milan.png',
  'Gaurav Thakur': '/team/intro-gaurav.png',
  'Alis Patel': '/team/intro-alis.png',
  'Abhishek Jha': '/team/intro-abhishek.png',
  'Stany Gregor': '/team/intro-stany.png',
  Divyansh: '/team/intro-divyansh.png',
  'Rajkumar Shah': '/team/intro-rajkumar.png',
  'Riya Sharma': '/team/intro-riya.png'
};

const memberNotes = {
  Milan: 'Vision, product direction, and full-stack architecture.',
  'Gaurav Thakur': 'Reliable mobile products and backend systems.',
  'Alis Patel': 'Full-stack delivery, infrastructure, and DevOps.',
  'Abhishek Jha': 'Scalable backend foundations and clean architecture.',
  'Stany Gregor': 'Responsive, polished, production-ready web builds.',
  Divyansh: 'Focused web engineering and practical problem solving.',
  'Rajkumar Shah': 'Robust web systems built to perform and scale.',
  'Riya Sharma': 'Content strategy, digital branding, and engagement.'
};

const memberIntroductions = {
  Milan: 'Milan leads Nexoraa with a builder-first mindset, combining product vision with hands-on engineering. He turns ambitious ideas into focused digital products that are clear, scalable, and ready to create meaningful business impact.',
  'Gaurav Thakur': 'Gaurav brings technical leadership and systems thinking to every build. He transforms complex requirements into reliable mobile and backend architectures that remain fast, maintainable, and prepared for growth.',
  'Alis Patel': 'Alis connects the full product lifecycle, from application logic to infrastructure and deployment. His work keeps ambitious platforms stable, efficient, and production-ready from the first release onward.',
  'Abhishek Jha': 'Abhishek builds the dependable foundations behind digital products. His focus on backend architecture, clean systems, and thoughtful technical decisions helps products scale without losing clarity.',
  'Stany Gregor': 'Stany turns product ideas into polished web experiences. He combines clean implementation with an eye for usability, ensuring every interface feels responsive, intentional, and ready for real users.',
  Divyansh: 'Divyansh brings energy, precision, and practical problem solving to web development. He focuses on creating modern digital experiences that are fast, useful, and built around genuine user needs.',
  'Rajkumar Shah': 'Rajkumar engineers robust web systems with performance and future growth in mind. He brings disciplined execution to every sprint and builds solutions designed to evolve with the businesses they support.',
  'Riya Sharma': 'Riya gives Nexoraa its digital voice. Through thoughtful content, brand storytelling, and audience insight, she turns technical work into meaningful communication that builds attention, trust, and connection.'
};

const panelColors = [
  '#0758f5',
  '#db2777',
  '#7c3aed',
  '#e5484d',
  '#d97706',
  '#0891b2',
  '#2563eb',
  '#00a98f'
];

function SocialLink({ href, label, children }) {
  if (!href || href === '#') return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={(event) => event.stopPropagation()}
      className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-black/25 text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
    >
      {children}
    </a>
  );
}

export default function Team() {
  const teamMembers = team.filter((member) => !member.isCTA);
  const hiringCard = team.find((member) => member.isCTA);
  const [activeId, setActiveId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const selectedMember = teamMembers.find((member) => member.id === selectedId);

  useEffect(() => {
    if (!selectedMember) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedId(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <section id="team" className="relative overflow-hidden bg-[#f2f3f5] py-24 text-gray-950 dark:bg-[#050505] dark:text-white md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 md:px-6">
        <m.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-10 grid gap-8 border-b border-black/10 pb-10 dark:border-white/10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-accent-blue">
              <Radio size={15} className="animate-pulse" />
              Crew spectrum
            </div>
            <h2 className="max-w-5xl text-5xl font-display font-black leading-[0.92] md:text-7xl lg:text-8xl">
              Different minds. <span className="text-accent-blue">One build rhythm.</span>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Explore the Nexoraa crew. Each panel represents a specialist who shapes strategy, technology, delivery, or brand momentum.
            </p>
            <div className="mt-6 flex items-center gap-5 border-t border-black/10 pt-5 dark:border-white/10">
              <div>
                <div className="text-2xl font-black">{String(teamMembers.length).padStart(2, '0')}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Core members</div>
              </div>
              <div className="h-10 w-px bg-black/10 dark:bg-white/10" />
              <div>
                <div className="text-2xl font-black">01</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shared mission</div>
              </div>
            </div>
          </div>
        </m.header>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          onMouseLeave={() => setActiveId(null)}
          className="flex min-h-[760px] flex-col gap-2 overflow-hidden bg-black p-2 shadow-[0_24px_80px_rgba(15,23,42,0.22)] lg:min-h-[650px] lg:flex-row"
        >
          {teamMembers.map((member, index) => {
            const isActive = activeId === member.id;
            const firstName = member.name.split(' ')[0];
            const poster = posterMap[member.name];

            return (
              <m.article
                key={member.id}
                layout
                onMouseEnter={() => setActiveId(member.id)}
                onFocus={() => setActiveId(member.id)}
                onClick={() => {
                  setActiveId(member.id);
                  setSelectedId(member.id);
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${member.name}`}
                aria-expanded={isActive}
                animate={{ flex: isActive ? 6 : 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                className="group relative min-h-[82px] cursor-pointer overflow-hidden border border-white/10 bg-[#111318] outline-none lg:min-w-[72px]"
              >
                <img
                  src={poster || member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="1000"
                  className={`absolute inset-0 h-full w-full transition-all duration-[600ms] ease-out ${
                    poster ? 'object-contain bg-white' : `object-cover ${member.imageClass || 'object-top'}`
                  } ${isActive || poster ? 'grayscale-0' : 'grayscale'}`}
                  style={{
                    transform: `scale(${isActive ? 1 : poster ? 1.04 : 1.12})`,
                    opacity: isActive ? 1 : 0
                  }}
                />
                <m.div
                  className="absolute inset-0"
                  animate={{
                    backgroundColor: isActive ? 'rgba(0,0,0,0.24)' : panelColors[index]
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <m.div
                      key="active"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.12 }}
                      className="absolute inset-0 flex min-w-[280px] flex-col justify-between p-5 text-white md:p-7"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="inline-flex items-center gap-2 border border-white/20 bg-black/25 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur">
                          <Code2 size={13} />
                          Active profile
                        </div>
                        <span className="font-mono text-xs text-white/70">{String(index + 1).padStart(2, '0')}</span>
                      </div>

                      <div>
                        <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-accent-blue">{member.role}</div>
                        <h3 className="max-w-xl text-5xl font-display font-black leading-[0.9] md:text-7xl">{member.name}</h3>
                        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
                          {memberNotes[member.name]}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {member.specialty.split('+').map((skill) => (
                            <span key={skill} className="border border-white/20 bg-black/25 px-3 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                        <div className="mt-7 flex gap-2">
                          <SocialLink href={member.links?.github} label={`${member.name} on GitHub`}>
                            <FiGithub size={18} />
                          </SocialLink>
                          <SocialLink href={member.links?.linkedin} label={`${member.name} on LinkedIn`}>
                            <FiLinkedin size={18} />
                          </SocialLink>
                          {member.links?.portfolio && (
                            <SocialLink href={member.links.portfolio} label={`${member.name} Portfolio`}>
                              <FiGlobe size={18} />
                            </SocialLink>
                          )}
                          <span className="ml-2 inline-flex items-center gap-2 border border-white/20 bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-black">
                            Full introduction <ArrowUpRight size={15} />
                          </span>
                        </div>
                      </div>
                    </m.div>
                  ) : (
                    <m.div
                      key="inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-between px-5 text-white lg:flex-col lg:py-6"
                    >
                      <span className="font-mono text-xs text-white/75">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-black uppercase tracking-[0.18em] lg:[writing-mode:vertical-rl] lg:rotate-180">
                        {firstName}
                      </span>
                      <span className="h-2 w-2 bg-white" />
                    </m.div>
                  )}
                </AnimatePresence>
              </m.article>
            );
          })}

          {hiringCard && (
            <m.a
              layout
              href={hiringCard.links.apply}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveId('hiring')}
              onFocus={() => setActiveId('hiring')}
              animate={{ flex: activeId === 'hiring' ? 6 : 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              className="group relative min-h-[82px] min-w-0 overflow-hidden border border-red-400/30 bg-[#dc2626] outline-none lg:min-w-[72px]"
            >
              <m.img
                src={hiringCard.image}
                alt=""
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
                className="absolute inset-0 h-full w-full object-cover"
                animate={{
                  opacity: activeId === 'hiring' ? 0.4 : 0,
                  scale: activeId === 'hiring' ? 1.05 : 1
                }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <AnimatePresence mode="wait">
                {activeId === 'hiring' ? (
                  <m.div
                    key="hiring-active"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 }}
                    className="absolute inset-0 flex min-w-[280px] flex-col justify-between p-5 text-white md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex items-center gap-2 border border-white/20 bg-black/25 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur">
                        <Sparkles size={13} />
                        Open seat
                      </div>
                      <span className="font-mono text-xs text-white/70">09</span>
                    </div>

                    <div>
                      <div className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-red-300">Join Nexoraa Studio</div>
                      <h3 className="max-w-2xl text-5xl font-display font-black leading-[0.9] md:text-7xl">
                        Add your spectrum to ours.
                      </h3>
                      <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
                        {hiringCard.specialty}
                      </p>
                      <span className="mt-7 inline-flex items-center gap-2 border border-white/20 bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-red-700 transition-colors group-hover:bg-red-950 group-hover:text-white">
                        View open roles <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </m.div>
                ) : (
                  <m.div
                    key="hiring-inactive"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-between px-5 text-white lg:flex-col lg:py-6"
                  >
                    <span className="font-mono text-xs text-white/75">09</span>
                    <span className="text-sm font-black uppercase tracking-[0.18em] lg:[writing-mode:vertical-rl] lg:rotate-180">
                      Join us
                    </span>
                    <Sparkles size={14} />
                  </m.div>
                )}
              </AnimatePresence>
            </m.a>
          )}
        </m.div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md md:p-6"
          >
            <m.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedMember.name} full introduction`}
              className="relative grid max-h-[94vh] w-full max-w-6xl overflow-y-auto bg-[#090b10] text-white shadow-[0_30px_120px_rgba(0,0,0,0.65)] lg:grid-cols-[0.88fr_1.12fr]"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close introduction"
                className="absolute right-3 top-3 z-30 inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-black/60 text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
              >
                <X size={20} />
              </button>

              <div className="relative min-h-[420px] overflow-hidden bg-white lg:min-h-[720px]">
                <img
                  src={posterMap[selectedMember.name] || selectedMember.image}
                  alt={`${selectedMember.name} introduction poster`}
                  loading="lazy"
                  decoding="async"
                  width="1920"
                  height="1080"
                  className={`absolute inset-0 h-full w-full ${
                    posterMap[selectedMember.name]
                      ? 'object-contain'
                      : `object-cover ${selectedMember.imageClass || 'object-top'}`
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 border border-white/20 bg-black/60 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur">
                  Nexoraa core member / {String(selectedMember.id).padStart(2, '0')}
                </div>
              </div>

              <div className="flex flex-col p-6 md:p-9 lg:p-12">
                <div className="border-b border-white/10 pb-8">
                  <div className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-accent-blue">
                    {selectedMember.role}
                  </div>
                  <h3 className="max-w-2xl text-5xl font-display font-black leading-[0.9] md:text-7xl">
                    Meet {selectedMember.name}.
                  </h3>
                  <p className="mt-7 text-lg leading-relaxed text-white/65">
                    {memberIntroductions[selectedMember.name]}
                  </p>
                </div>

                <div className="grid gap-px border-b border-white/10 bg-white/10 sm:grid-cols-2">
                  <div className="bg-[#090b10] py-6 pr-5">
                    <Target size={20} className="text-accent-blue" />
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Primary focus</div>
                    <div className="mt-2 font-bold">{selectedMember.specialty}</div>
                  </div>
                  <div className="bg-[#090b10] py-6 sm:pl-5">
                    <Zap size={20} className="text-accent-blue" />
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Team impact</div>
                    <div className="mt-2 font-bold">{memberNotes[selectedMember.name]}</div>
                  </div>
                </div>

                <div className="py-7">
                  <div className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Expertise</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialty.split('+').map((skill) => (
                      <span key={skill} className="border border-white/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white/80">
                        {skill.trim()}
                      </span>
                    ))}
                    <span className="border border-white/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white/80">
                      Production delivery
                    </span>
                    <span className="border border-white/15 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white/80">
                      Remote collaboration
                    </span>
                  </div>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Working principle</div>
                    <div className="mt-2 font-bold text-white/85">Build clearly. Deliver confidently.</div>
                  </div>
                  <div className="flex gap-2">
                    <SocialLink href={selectedMember.links?.github} label={`${selectedMember.name} on GitHub`}>
                      <FiGithub size={18} />
                    </SocialLink>
                    <SocialLink href={selectedMember.links?.linkedin} label={`${selectedMember.name} on LinkedIn`}>
                      <FiLinkedin size={18} />
                    </SocialLink>
                    {selectedMember.links?.portfolio && (
                      <SocialLink href={selectedMember.links.portfolio} label={`${selectedMember.name} Portfolio`}>
                        <FiGlobe size={18} />
                      </SocialLink>
                    )}
                  </div>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
