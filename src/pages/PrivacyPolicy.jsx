import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState('section-1');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleScroll = () => {
      const sections = [
        'section-1',
        'section-2',
        'section-3',
        'section-4',
        'section-5',
        'section-6',
        'section-7',
        'section-8',
      ];

      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  const navItems = [
    { id: 'section-1', label: '1. Information We Collect' },
    { id: 'section-2', label: '2. How We Use Information' },
    { id: 'section-3', label: '3. WhatsApp AI Assistant' },
    { id: 'section-4', label: '4. Third-Party Providers' },
    { id: 'section-5', label: '5. Retention & Security' },
    { id: 'section-6', label: '6. Your Privacy Rights' },
    { id: 'section-7', label: '7. Changes to This Policy' },
    { id: 'section-8', label: '8. Contact Us' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-[#070709] text-gray-800 dark:text-gray-200 transition-colors duration-300 font-quicksand">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Document Header */}
        <m.header 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-gray-200 dark:border-white/10 pb-8 mb-10"
        >
          <p className="text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-[#00F5FF] mb-2">
            Legal & Privacy Documentation
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">
            <span className="font-semibold text-gray-900 dark:text-gray-200">NEXORAA Studio</span>
            <span>•</span>
            <span>Last Updated: November 14, 2026</span>
          </div>

          <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
            At NEXORAA Studio, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, process, and protect information when you visit our website, contact us, or interact with our WhatsApp AI Assistant.
          </p>
        </m.header>

        {/* 2-Column Balanced Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Left Sticky Sidebar (Table of Contents) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 self-start space-y-6">
            <div className="border border-gray-200/80 dark:border-white/10 rounded-2xl p-5 bg-gray-50/50 dark:bg-white/[0.01]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                On This Page
              </h3>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeId === item.id
                        ? 'text-cyan-600 dark:text-[#00F5FF] font-bold bg-cyan-50 dark:bg-white/[0.05]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-gray-200/80 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white">Privacy Inquiries</p>
                <p>Have questions about your data?</p>
                <a
                  href="mailto:contact@nexoraa.works"
                  className="text-cyan-600 dark:text-[#00F5FF] hover:underline font-semibold block pt-1"
                >
                  contact@nexoraa.works
                </a>
              </div>
            </div>
          </aside>

          {/* Right Main Text Column */}
          <m.article 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-8 xl:col-span-9 space-y-10 text-[15px] sm:text-base leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {/* 1. Information We Collect */}
            <section id="section-1" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                1. Information We Collect
              </h2>
              <p>Depending on how you interact with us, we may collect:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Your name and contact information, including your WhatsApp phone number and email address.</li>
                <li>Messages and inquiries you send to NEXORAA Studio.</li>
                <li>Information you voluntarily share about your business, project requirements, or service interests.</li>
                <li>Technical information necessary to operate and secure our website and communication services.</li>
              </ul>
            </section>

            {/* 2. How We Use Your Information */}
            <section id="section-2" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                2. How We Use Your Information
              </h2>
              <p>We use personal information to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Respond to customer inquiries and provide support.</li>
                <li>Share information about our website development, application development, branding, and design services.</li>
                <li>Understand project requirements and prepare quotations.</li>
                <li>Operate and improve our customer communication systems.</li>
                <li>Maintain security and comply with applicable legal obligations.</li>
              </ul>
            </section>

            {/* 3. WhatsApp AI Assistant */}
            <section id="section-3" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                3. WhatsApp AI Assistant
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>NEXORAA Studio uses an AI-powered assistant to help respond to WhatsApp inquiries.</li>
                <li>Messages may be processed through WhatsApp Business Platform, workflow automation services, and AI technology providers to generate relevant responses.</li>
                <li>AI-generated responses may not always be accurate. Customers may request human assistance when needed.</li>
              </ul>
            </section>

            {/* 4. Third-Party Service Providers */}
            <section id="section-4" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                4. Third-Party Service Providers
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>We may use service providers, including Meta's WhatsApp Business Platform, n8n, and Google AI services, to support our communications and operations.</li>
                <li>Information shared with these providers is processed according to their applicable terms, privacy practices, and our service arrangements.</li>
              </ul>
            </section>

            {/* 5. Data Retention and Security */}
            <section id="section-5" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                5. Data Retention and Security
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>We aim to retain personal information only for as long as reasonably necessary for the purposes described in this policy or as required by applicable law.</li>
                <li>We use reasonable technical and organizational safeguards to protect personal information. However, no electronic communication or storage system can guarantee absolute security.</li>
              </ul>
            </section>

            {/* 6. Your Privacy Rights */}
            <section id="section-6" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                6. Your Privacy Rights
              </h2>
              <p>
                Subject to applicable law, you may contact us to request access to, correction of, or deletion of your personal information, or to raise concerns about how it is handled.
              </p>
            </section>

            {/* 7. Changes to This Policy */}
            <section id="section-7" className="scroll-mt-28 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any updates will be published on this page with a revised date.
              </p>
            </section>

            {/* 8. Contact Us */}
            <section id="section-8" className="scroll-mt-28 space-y-3 pt-6 border-t border-gray-200 dark:border-white/10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white">
                8. Contact Us
              </h2>
              <p>For privacy-related inquiries, contact:</p>
              <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 p-5 rounded-xl text-sm space-y-1.5 text-gray-700 dark:text-gray-300">
                <p><strong className="text-gray-950 dark:text-white font-semibold">NEXORAA Studio</strong></p>
                <p>Website: <a href="https://nexoraa.works" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-[#00F5FF] hover:underline font-semibold">https://nexoraa.works</a></p>
                <p>Email: <a href="mailto:contact@nexoraa.works" className="text-cyan-600 dark:text-[#00F5FF] hover:underline font-semibold">contact@nexoraa.works</a></p>
              </div>
            </section>
          </m.article>

        </div>

      </div>
    </div>
  );
}
