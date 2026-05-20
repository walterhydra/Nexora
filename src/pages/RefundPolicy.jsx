import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RefundPolicy() {
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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Refund Policy</h1>
          <p className="text-gray-500 mb-12">Last Updated: May 2026</p>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-300">
            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">1. General Overview</h2>
            <p>At Nexora Studio, we strive to ensure that our clients are 100% satisfied with our digital development services. Because we provide high-end, custom digital products and dedicate significant time and resources from the moment a project begins, our refund policy is strictly defined.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">2. Service Cancellation & Refunds</h2>
            <p>Due to the nature of our rapid 7-day development cycles and bespoke engineering processes, refunds are granted under the following specific conditions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Before Project Kickoff:</strong> If you decide to cancel your project before any work has commenced (typically within 24 hours of payment and before the official onboarding call), you are eligible for a full refund minus any payment processing fees.</li>
              <li><strong>During the Development Phase:</strong> Once the project has officially started and resources have been allocated, we do not offer full refunds. Partial refunds may be considered on a case-by-case basis at our sole discretion, based on the amount of work completed.</li>
              <li><strong>Upon Delivery:</strong> We do not offer refunds once the final product (website, application, or automation) has been delivered. We ensure client satisfaction through revisions as agreed upon in the project scope.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">3. Subscription Services</h2>
            <p>If you are enrolled in any of our maintenance, hosting, or ongoing support subscription plans:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may cancel your subscription at any time.</li>
              <li>Cancellations will take effect at the end of the current billing cycle.</li>
              <li>We do not provide refunds or credits for any partial subscription periods or unused services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">4. Revisions and Satisfaction Guarantee</h2>
            <p>We work closely with you during the development process to ensure the product meets your requirements. If the delivered product does not meet the specifications outlined in the original project scope, we will provide the necessary revisions to correct the issues without additional charge, provided they fall within the agreed-upon scope.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">5. Non-Refundable Items</h2>
            <p>The following items and services are strictly non-refundable:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Domain name registrations and renewals</li>
              <li>Third-party software licenses or API costs incurred on your behalf</li>
              <li>Custom illustration or branding assets once approved</li>
              <li>Expedited delivery fees</li>
            </ul>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">6. Process for Requesting a Refund</h2>
            <p>To request a refund under the eligible conditions, please contact our billing department in writing. We will review your request and process eligible refunds within 7-10 business days. Refunds will be issued to the original payment method used.</p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-8">7. Contact Us</h2>
            <p>If you have any questions concerning our refund policy, please contact us at:</p>
            <p className="font-mono mt-4">
              Nexora Studio<br />
              Billing Department<br />
              billing@nexora.studio
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
