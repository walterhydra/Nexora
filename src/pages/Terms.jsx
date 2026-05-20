import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-500 mb-12">Last Updated: May 2026</p>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">1. Agreement to Terms</h2>
            <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Nexora Studio ("we," "us," or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
            <p>You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the applicable jurisdiction.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">3. User Representations</h2>
            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms and Conditions; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (6) you will not use the Site for any illegal or unauthorized purpose; and (7) your use of the Site will not violate any applicable law or regulation.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">4. Services and Pricing</h2>
            <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the services available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the services will be accurate, complete, reliable, current, or free of other errors.</p>
            <p>All pricing is subject to change. We reserve the right to modify or discontinue any service at any time for any reason.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">5. Prohibited Activities</h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">6. User Generated Contributions</h2>
            <p>The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").</p>
            
            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">7. Limitation of Liability</h2>
            <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site, even if we have been advised of the possibility of such damages.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">8. Governing Law</h2>
            <p>These Terms shall be governed by and defined following the laws of the jurisdiction in which our business operates. Nexora Studio and yourself irrevocably consent that the courts of the applicable jurisdiction shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">9. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
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
