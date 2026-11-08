import React, { useEffect } from 'react';
import { m } from 'framer-motion';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#f8fafc] dark:bg-[#0A0A0B] text-gray-800 dark:text-gray-300 transition-colors duration-300 font-sans relative overflow-hidden">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Document Header */}
        <m.header 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-gray-200 dark:border-white/10 pb-8 mb-12"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#00F5FF]">
            Legal Documentation
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-950 dark:text-white tracking-tight mt-3">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-mono">
            Last Updated: July 2, 2026
          </p>
        </m.header>

        {/* Document Body */}
        <m.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-gray dark:prose-invert max-w-none space-y-10 text-base leading-relaxed text-gray-600 dark:text-gray-400"
        >
          {/* 1. Agreement to Terms */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              1. Agreement to Terms
            </h2>
            <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Nexoraa Studio ("we," "our," or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
            <p>You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>
          </section>

          {/* 2. Intellectual Property Rights */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              2. Intellectual Property Rights
            </h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the applicable jurisdiction.</p>
          </section>

          {/* 3. User Representations */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              3. User Representations
            </h2>
            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms and Conditions; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (6) you will not use the Site for any illegal or unauthorized purpose; and (7) your use of the Site will not violate any applicable law or regulation.</p>
          </section>

          {/* 4. Services and Pricing */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              4. Services & Financial Directive
            </h2>
            <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the services available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the services will be accurate, complete, reliable, current, or free of other errors.</p>
            <p>All pricing is subject to change. We reserve the right to modify or discontinue any service at any time for any reason.</p>
          </section>

          {/* 5. Prohibited Activities */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              5. Prohibited Activities
            </h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
          </section>

          {/* 6. User Generated Contributions */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              6. User Contributions
            </h2>
            <p>The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").</p>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              7. Limitation of Liability
            </h2>
            <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages.</p>
          </section>

          {/* 8. Governing Law */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              8. Governing Jurisdiction
            </h2>
            <p>These Terms shall be governed by and defined following the laws of the jurisdiction in which our business operates. Nexoraa Studio and yourself irrevocably consent that the courts of the applicable jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
          </section>

          {/* 9. Contact Us */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              9. Official Contact
            </h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
            <div className="bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-6 rounded-2xl inline-block text-sm text-gray-800 dark:text-gray-300">
              <strong className="block text-gray-950 dark:text-white mb-1">Nexoraa Studio</strong>
              Legal Department<br />
              contact@nexoraa.studio
            </div>
          </section>
        </m.article>
      </div>
    </div>
  );
}
