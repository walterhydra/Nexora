import React, { useEffect } from 'react';
import { m } from 'framer-motion';

export default function PrivacyPolicy() {
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
            Privacy Policy
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
          {/* 1. Introduction */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              1. Introduction
            </h2>
            <p>Welcome to Nexoraa Studio ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
            <p>When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it.</p>
          </section>

          {/* 2. Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              2. Information We Collect
            </h2>
            <p>The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect can include the following:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Name and Contact Data:</strong> We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
              <li><strong>Credentials:</strong> We collect passwords, password hints, and similar security information used for authentication and account access.</li>
              <li><strong>Payment Data:</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument.</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              3. How We Use Your Information
            </h2>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To fulfill and manage your orders, payments, returns, and exchanges made through the Website.</li>
              <li>To deliver services to the user.</li>
              <li>To respond to user inquiries/offer support to users.</li>
            </ul>
          </section>

          {/* 4. Will Your Information Be Shared With Anyone? */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              4. Information Sharing
            </h2>
            <p>We share and disclose your information in compliance with legal thresholds:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Compliance with Laws:</strong> We disclose your information where legally required to comply with applicable local and federal laws, governmental audits, or judicial proceedings.</li>
              <li><strong>Vital Rights:</strong> We share data where necessary to investigate, prevent, or address suspected policy breaches, security risks, fraud, or threats to physical protection.</li>
              <li><strong>Consultants and Third-Party Providers:</strong> We share information exclusively with authorized vendors who require data access to perform billing or code hosting operations.</li>
            </ul>
          </section>

          {/* 5. Cookies and Similar Technologies */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              5. Cookies and Tracking
            </h2>
            <p>We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific details regarding tracking methods and opt-out routes are provided in our Cookie Policy.</p>
          </section>

          {/* 6. Data Retention */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              6. Data Retention
            </h2>
            <p>We retain personal data strictly for as long as active user contracts require. In cases where tax, regulatory, or administrative ledgers require archive maintenance, data is preserved under isolation states.</p>
          </section>

          {/* 7. Your Privacy Rights */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              7. Your Privacy Rights
            </h2>
            <p>In accordance with GDPR/EEA legal directives, users possess direct rights of access, rectification, erasure, and database portability. Under certain circumstances, you may also object directly to data processing workflows.</p>
          </section>

          {/* 8. Contact Us */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-950 dark:text-white flex items-center gap-2">
              8. Legal Contact Directives
            </h2>
            <p>If you have questions or comments about this policy, you may email us or contact us at:</p>
            <div className="bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-6 rounded-2xl inline-block text-sm text-gray-800 dark:text-gray-300">
              <strong className="block text-gray-950 dark:text-white mb-1">Nexoraa Studio</strong>
              Legal Department<br />
              contact@nexoraa.works
            </div>
          </section>
        </m.article>
      </div>
    </div>
  );
}
