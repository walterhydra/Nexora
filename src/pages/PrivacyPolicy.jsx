import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-accent-blue/5 to-transparent -z-10" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-12">Last Updated: May 2026</p>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">1. Introduction</h2>
            <p>Welcome to Nexora Studio ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
            <p>When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">2. Information We Collect</h2>
            <p>The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect can include the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Name and Contact Data:</strong> We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
              <li><strong>Credentials:</strong> We collect passwords, password hints, and similar security information used for authentication and account access.</li>
              <li><strong>Payment Data:</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number and the security code associated with your payment instrument.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">3. How We Use Your Information</h2>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To fulfill and manage your orders, payments, returns, and exchanges made through the Website.</li>
              <li>To deliver services to the user.</li>
              <li>To respond to user inquiries/offer support to users.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">4. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share and disclose your information in the following situations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Compliance with Laws:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              <li><strong>Vital Interests and Legal Rights:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
              <li><strong>Vendors, Consultants and Other Third-Party Service Providers:</strong> We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">5. Cookies and Similar Technologies</h2>
            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">6. Data Retention</h2>
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">7. Your Privacy Rights</h2>
            <p>In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information.</p>
            
            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">8. Updates To This Policy</h2>
            <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">9. Contact Us</h2>
            <p>If you have questions or comments about this policy, you may email us or by post to:</p>
            <p className="font-mono mt-4">
              Nexora Studio<br />
              Legal Department<br />
              contact@nexora.studio
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
