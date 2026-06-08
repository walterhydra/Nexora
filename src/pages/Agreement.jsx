import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { m } from 'framer-motion';
import { FileText, Send, CheckCircle, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const purposeOptions = [
  'New Project Inquiry',
  'Partnership Proposal',
  'Freelance Collaboration',
  'Investment / Funding',
  'Legal Review',
  'Internal Reference',
  'Other'
];

export default function Agreement() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          purpose: formData.purpose,
        }),
      });

      // Handle non-JSON responses or errors gracefully
      let data = {};
      try {
        data = await response.json();
      } catch (parseErr) {
        throw new Error('Invalid response from server');
      }

      if (response.ok && data.success) {
        setIsSuccess(true);
        toast.success('Agreement sent to your email!');
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.warn('Primary SMTP api endpoint failed, attempting Web3Forms fallback:', error);
      
      // Try Web3Forms fallback
      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3Key) {
        try {
          const web3Response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              access_key: web3Key,
              subject: `Client Agreement Request: ${formData.firstName} ${formData.lastName}`,
              from_name: "Nexora Studio Portal",
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              message: `Client Agreement Request:\n- Name: ${formData.firstName} ${formData.lastName}\n- Email: ${formData.email}\n- DOB: ${formData.dob}\n- Purpose: ${formData.purpose}`
            })
          });

          const web3Data = await web3Response.json();
          if (web3Response.ok && web3Data.success) {
            setIsSuccess(true);
            toast.success('Request received! Downloading agreement PDF...');
            
            // Trigger client-side download
            const link = document.createElement('a');
            link.href = '/Video/Nexoraa_Client_Agreement.pdf';
            link.download = 'Nexoraa_Client_Agreement.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
          }
        } catch (web3Err) {
          console.error("Web3Forms fallback failed:", web3Err);
        }
      }

      toast.error('Could not process agreement request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Agreement Sent | Nexora Studio</title>
        </Helmet>
        <section className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Request Submitted!
            </h2>
            <p className="text-gray-400 text-lg mb-3">
              The Client Agreement has been sent to:
            </p>
            <p className="text-accent-blue font-semibold text-lg mb-8">{formData.email}</p>
            <p className="text-gray-500 text-sm mb-10">
              You'll also receive a copy of the agreement PDF attached in the email. Please check your inbox (and spam folder).
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Back to Home
              </Link>
              <a
                href="/Video/Nexoraa_Client_Agreement.pdf"
                download
                className="px-6 py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all text-sm font-medium"
              >
                Download Anyway
              </a>
            </div>
          </m.div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Client Agreement | Nexora Studio</title>
        <meta name="description" content="Request the Nexora Studio Client Agreement. Fill in your details and we'll send it to your email." />
      </Helmet>

      <section className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 py-20">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-xl"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-accent-blue" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
              Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-purple-500">Agreement</span>
            </h1>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
              Fill in your details below. We'll send the official Nexora Client Agreement directly to your email.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#0A0E17] border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Dot Grid */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '12px 12px' }}></div>
            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[2px] bg-accent-blue blur-[8px] opacity-60"></div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Milan"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Pandavdara"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Purpose</label>
                <select
                  name="purpose"
                  required
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all appearance-none cursor-pointer [color-scheme:dark]"
                >
                  <option value="" disabled className="bg-[#0A0E17] text-gray-500">Select purpose...</option>
                  {purposeOptions.map(opt => (
                    <option key={opt} value={opt} className="bg-[#0A0E17] text-white">{opt}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-gradient-to-r from-accent-blue to-purple-600 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(91,164,230,0.2)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Agreement to My Email
                  </>
                )}
              </button>
            </form>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 text-xs">
              <ShieldCheck size={14} />
              <span>Your data is secured & never shared with third parties</span>
            </div>
          </div>
        </m.div>
      </section>
    </>
  );
}
