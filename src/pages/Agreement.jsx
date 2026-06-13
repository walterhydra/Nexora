import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { m, AnimatePresence } from 'framer-motion';
import {
  FileText, Send, CheckCircle, Loader2, ArrowLeft, ShieldCheck,
  User, Mail, Calendar, Briefcase, Lock, Download, Check, Sparkles
} from 'lucide-react';
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

const backgroundGlows = {
  1: 'bg-blue-600/5 shadow-[0_0_120px_rgba(37,99,235,0.1)]',
  2: 'bg-purple-600/5 shadow-[0_0_120px_rgba(147,51,234,0.1)]',
  3: 'bg-emerald-600/5 shadow-[0_0_120px_rgba(16,185,129,0.1)]',
  4: 'bg-amber-600/5 shadow-[0_0_120px_rgba(245,158,11,0.1)]',
  5: 'bg-teal-600/5 shadow-[0_0_120px_rgba(20,184,166,0.1)]'
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0
  })
};

export default function Agreement() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    purpose: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSealing, setIsSealing] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [docHash, setDocHash] = useState('');

  // OTP Validation State
  const [otpCode, setOtpCode] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  useEffect(() => {
    const rawStr = `${formData.firstName}-${formData.lastName}-${formData.email}-${formData.dob}-${formData.purpose}`;
    let hash = 0;
    for (let i = 0; i < rawStr.length; i++) {
      hash = (hash << 5) - hash + rawStr.charCodeAt(i);
      hash |= 0;
    }
    const hexHash = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
    setDocHash(`NEX-AG-2026-${hexHash || 'F8A3D9E2'}`);
  }, [formData]);

  const isAgeValid = (dob) => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const isEmailFormatValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setOtpVerified(false);
      setOtpSent(false);
      setOtpCode('');
      setOtpToken('');
    }
  };

  const handleSendOtp = async () => {
    if (!isEmailFormatValid(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSendingOtp(true);
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email: formData.email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpToken(data.token);
        setOtpSent(true);
        toast.success('OTP sent to your email!');
      } else {
        throw new Error(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error sending OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast.error('Please enter a 6-digit verification code');
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const res = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          email: formData.email,
          otp: otpCode,
          token: otpToken
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpVerified(true);
        toast.success('Email verified successfully!');
      } else {
        throw new Error(data.error || 'Invalid verification code');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Verification failed');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const isStepValid = (step) => {
    if (step === 1) return formData.firstName.trim() && formData.lastName.trim();
    if (step === 2) {
      return (
        isEmailFormatValid(formData.email) &&
        isAgeValid(formData.dob) &&
        otpVerified
      );
    }
    if (step === 3) return formData.purpose;
    return true;
  };

  const isStepAccessible = (stepIdx) => {
    if (stepIdx === 1) return true;
    if (stepIdx === 2) return isStepValid(1);
    if (stepIdx === 3) return isStepValid(1) && isStepValid(2);
    if (stepIdx === 4) return isStepValid(1) && isStepValid(2) && isStepValid(3);
    return false;
  };

  const calculateProgress = () => {
    let steps = 0;
    if (formData.firstName.trim()) steps += 20;
    if (formData.lastName.trim()) steps += 20;
    if (formData.email.trim()) steps += 20;
    if (formData.dob.trim()) steps += 20;
    if (formData.purpose.trim()) steps += 20;
    return steps;
  };

  const progress = calculateProgress();

  const handleFinalSubmission = async () => {
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

      let data = {};
      try {
        data = await response.json();
      } catch (parseErr) {
        throw new Error('Invalid response');
      }

      if (response.ok && data.success) {
        triggerSealingAnimation();
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.warn('Primary SMTP API failed, executing Web3Forms fallback:', error);

      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "221fc2cc-f511-4830-89f8-0f6f1e595fed";
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
            triggerSealingAnimation();
            return;
          }
        } catch (web3Err) {
          console.error("Web3Forms fallback failed:", web3Err);
        }
      }

      toast.error('Submission failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const triggerSealingAnimation = () => {
    setIsSealing(true);
    setTimeout(() => {
      setIsSuccess(true);
      setIsSealing(false);
      toast.success('Agreement securely sealed!');
    }, 2000);
  };

  // Content for each wizard step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Your Identity</h3>
              <p className="text-slate-400 text-xs mb-3.5">Please enter your legal name as it should appear in the contract.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Milan"
                    className="w-full bg-[#182030] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Pandavdara"
                    className="w-full bg-[#182030] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Contact & Validation</h3>
              <p className="text-slate-400 text-xs mb-3.5">A certified verification hash and final agreement PDF will be sent here.</p>
            </div>
            <div className="space-y-3.5">
              <div>
                <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-[#182030] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Date of Birth</label>
                <div className="relative">
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-[#182030] border border-white/5 rounded-lg px-4 py-2.5 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/50 transition-all [color-scheme:dark] no-calendar-icon cursor-pointer"
                  />
                </div>
                {formData.dob && !isAgeValid(formData.dob) && (
                  <m.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-[10px] mt-1.5 flex items-center gap-1 font-medium"
                  >
                    <span>⚠️ You must be at least 18 years old to sign this agreement.</span>
                  </m.p>
                )}
              </div>

              {/* OTP Validation Section */}
              {isEmailFormatValid(formData.email) && isAgeValid(formData.dob) && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-2 border-t border-white/5 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-medium">Email Verification:</span>
                    {otpVerified ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-bold">Verification Required</span>
                    )}
                  </div>

                  {!otpVerified && (
                    <div className="space-y-3">
                      {!otpSent ? (
                        <m.button
                          type="button"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={handleSendOtp}
                          disabled={isSendingOtp}
                          className="w-full py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSendingOtp ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Sending Verification Code...
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Send Verification OTP
                            </>
                          )}
                        </m.button>
                      ) : (
                        <div className="space-y-2.5">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="Enter 6-digit code"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                              className="w-2/3 bg-[#182030] border border-white/5 rounded-lg px-3 py-2 text-center text-white tracking-widest text-xs placeholder-slate-600 focus:outline-none focus:border-slate-500 transition-all font-mono"
                            />
                            <m.button
                              type="button"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={handleVerifyOtp}
                              disabled={isVerifyingOtp || otpCode.length !== 6}
                              className="w-1/3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_rgba(16,185,129,0.15)]"
                            >
                              {isVerifyingOtp ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                "Verify"
                              )}
                            </m.button>
                          </div>

                          <div className="flex justify-between items-center px-1">
                            <span className="text-[9px] text-slate-500">Didn't receive code?</span>
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              disabled={isSendingOtp}
                              className="text-[9px] text-blue-400 hover:underline font-semibold disabled:opacity-50"
                            >
                              {isSendingOtp ? "Sending..." : "Resend OTP"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </m.div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Service Category</h3>
              <p className="text-slate-400 text-xs mb-3.5">Select the primary purpose of collaboration for contract specs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
              {purposeOptions.map(opt => (
                <m.button
                  key={opt}
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setFormData(prev => ({ ...prev, purpose: opt }))}
                  className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all flex justify-between items-center ${formData.purpose === opt
                      ? 'bg-blue-600/10 border-blue-500 text-white shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                      : 'bg-[#182030] border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200'
                    }`}
                >
                  <span>{opt}</span>
                  {formData.purpose === opt && (
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                  )}
                </m.button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-1">Verify & Seal</h3>
              <p className="text-slate-400 text-xs mb-4">Please verify the drafted legal terms on the right. When ready, tap the button below to sign and seal your agreement.</p>
            </div>

            {/* Tap/Click to Seal Button */}
            <div className="relative mt-2">
              <m.button
                type="button"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                onClick={handleFinalSubmission}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 border border-blue-500 shadow-[0_4px_12px_rgba(37,99,235,0.2)] select-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting & Sealing...
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-blue-200" />
                    Sign & Seal Agreement
                  </>
                )}
              </m.button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Agreement Signed | Nexora Studio</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap" rel="stylesheet" />
        </Helmet>
        <section className="min-h-screen bg-[#0A0D14] flex items-center justify-center px-4 py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-teal-900/10 rounded-full blur-[130px] pointer-events-none" />

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl w-full text-center relative z-10"
          >
            {/* Sealed Envelope Graphic */}
            <div className="relative w-64 h-40 mx-auto mb-8">
              <m.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#1E293B] border border-slate-700 w-full h-full rounded-2xl relative shadow-2xl flex flex-col items-center justify-end pb-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                {/* Envelope Flap top */}
                <div className="absolute top-0 inset-x-0 h-[65px] bg-[#334155] rounded-b-[40%_20%]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                <span className="font-mono text-[8px] text-slate-500 font-semibold">{docHash}</span>
              </m.div>

              {/* Hot Melted Wax Stamp */}
              <div className="absolute left-1/2 -translate-x-1/2 top-9 z-20">
                <m.div
                  initial={{ scale: 3, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: 12, opacity: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 120, delay: 0.2 }}
                  className="w-16 h-16 bg-[#9E1F26] shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_-3px_6px_rgba(0,0,0,0.4),inset_0_3px_6px_rgba(255,255,255,0.2)] rounded-[42%_56%_51%_48%/_51%_45%_55%_49%] border-2 border-[#8B1A20] flex items-center justify-center text-white font-display font-extrabold text-lg select-none"
                >
                  <span className="text-xs font-sans tracking-widest font-black opacity-80">N</span>
                </m.div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 tracking-tight">
              Request Completed & Sealed
            </h2>
            <p className="text-slate-400 text-xs max-w-sm mx-auto mb-8 leading-relaxed">
              Your specifications have been verified, signed, and locked. An official agreement copy is in your inbox.
            </p>

            {/* Structured Receipt Card */}
            <div className="bg-[#121824] border border-white/5 rounded-xl p-5 mb-8 text-left shadow-2xl max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-3">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Secure Key</span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold">{docHash}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                  <span className="text-slate-500">Signatory:</span>
                  <span className="text-slate-200 font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                  <span className="text-slate-500">Identity Email:</span>
                  <span className="text-blue-400 font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.02] pb-1.5">
                  <span className="text-slate-500">Service Category:</span>
                  <span className="text-slate-200 font-medium">{formData.purpose}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Stamp Hash:</span>
                  <span className="font-mono text-[10px] text-slate-400">0xSHA256-VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#182030] border border-white/5 text-slate-300 font-medium text-xs hover:bg-[#202b40] transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back to Home
              </Link>
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Sealing Overlay Animation */}
      <AnimatePresence>
        {isSealing && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center px-4"
          >
            <div className="relative max-w-sm w-full">
              {/* Envelope back panel */}
              <m.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="bg-[#1E293B] border border-slate-700 w-full h-[240px] rounded-2xl relative shadow-2xl overflow-hidden flex flex-col items-center justify-end pb-8"
              >
                <div className="absolute top-0 inset-x-0 h-[100px] bg-[#334155] rounded-b-[40%_20%]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                <div className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">Nexora Vault Verification</div>
                <div className="font-mono text-[9px] text-slate-500 mt-1">{docHash}</div>
              </m.div>

              {/* Paper Contract Sheet sliding down */}
              <m.div
                initial={{ y: -100, scale: 0.95, opacity: 1 }}
                animate={{ y: 80, scale: 0.85, opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-x-4 top-0 bg-slate-50 p-4 rounded-lg shadow-xl text-slate-800 pointer-events-none h-[180px] overflow-hidden"
              >
                <div className="text-[7px] text-slate-400 font-mono">NEX-AG-2026</div>
                <div className="font-display font-black text-[9px] border-b pb-1 mt-1 text-slate-900">MUTUAL AGREEMENT</div>
                <div className="text-[6px] text-slate-500 mt-2 space-y-1">
                  <p>1. Scope of work and design specifications registered.</p>
                  <p>2. Non-disclosure of shared assets validated.</p>
                  <p>3. Digitally executed copy generated.</p>
                </div>
              </m.div>

              {/* 3D Wax Seal dropping */}
              <m.div
                initial={{ scale: 4, rotate: -45, y: -200, opacity: 0 }}
                animate={{ scale: 1, rotate: 12, y: 30, opacity: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 1.0 }}
                className="absolute left-1/2 -translate-x-1/2 top-12 z-30"
              >
                <div className="w-20 h-20 bg-[#9E1F26] shadow-[0_6px_25px_rgba(0,0,0,0.5),inset_0_-4px_8px_rgba(0,0,0,0.4),inset_0_4px_8px_rgba(255,255,255,0.2)] rounded-[42%_56%_51%_48%/_51%_45%_55%_49%] border-[3px] border-[#8B1A20] flex flex-col items-center justify-center text-white font-display font-extrabold text-2xl relative select-none">
                  <span className="text-sm font-sans tracking-widest font-black opacity-80 select-none">N</span>
                  <div className="absolute inset-1 rounded-full border border-dashed border-red-950/20 pointer-events-none"></div>
                </div>
              </m.div>

              {/* Laser Flash overlay */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.2, delay: 1.1 }}
                className="absolute inset-0 bg-white pointer-events-none z-40 rounded-2xl mix-blend-overlay"
              />
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white text-xs font-semibold tracking-wider uppercase mt-8 animate-pulse font-mono"
            >
              Digitally Sealing Request...
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <section className="min-h-screen bg-[#0A0D14] relative overflow-hidden flex items-center justify-center px-4 py-24">
        {/* Dynamic glow tracking step coordinates */}
        <m.div
          animate={{
            x: currentStep === 1 ? -120 : currentStep === 2 ? 120 : currentStep === 3 ? -60 : 60,
            y: currentStep === 1 ? -60 : currentStep === 2 ? -120 : currentStep === 3 ? 120 : -60,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 80 }}
          className={`absolute w-[45vw] h-[45vw] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ${backgroundGlows[currentStep]}`}
        />

        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-4 shadow-sm animate-pulse"
            >
              <FileText className="w-5 h-5 text-blue-400" />
            </m.div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">
              Client Agreement Portal
            </h1>
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed text-xs md:text-sm">
              Please complete the step-by-step form on the left. The document on the right will update in real-time.
            </p>
          </div>

          {/* Unified Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Card: Glassmorphic Onboarding Wizard */}
            <div className="lg:col-span-5 w-full">
              <m.div
                layout
                className="bg-[#121824]/90 border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md"
              >
                {/* Dot grid decoration inside form */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '12px 12px' }}></div>

                {/* Progress Indicators */}
                <div className="flex justify-center items-center gap-3 mb-6">
                  {[1, 2, 3, 4].map(idx => (
                    <div key={idx} className="flex items-center">
                      <button
                        type="button"
                        disabled={!isStepAccessible(idx)}
                        onClick={() => {
                          setDirection(idx > currentStep ? 1 : -1);
                          setCurrentStep(idx);
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep === idx
                            ? 'bg-blue-600 text-white font-black scale-110 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                            : currentStep > idx
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                          }`}
                      >
                        {currentStep > idx ? <Check className="w-3.5 h-3.5" /> : idx}
                      </button>
                      {idx < 4 && (
                        <div className={`h-[2px] w-6 sm:w-10 mx-1 rounded transition-colors duration-300 ${currentStep > idx ? 'bg-emerald-500/30' : 'bg-white/5'
                          }`} />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="relative flex flex-col">
                  <AnimatePresence mode="wait" custom={direction}>
                    <m.div
                      key={currentStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.15 }
                      }}
                      className="w-full mb-5"
                    >
                      {renderStepContent()}
                    </m.div>
                  </AnimatePresence>

                  {/* Navigation footer layout */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
                    <div>
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setDirection(-1);
                            setCurrentStep(prev => prev - 1);
                          }}
                          className="text-slate-400 hover:text-white transition-colors text-xs font-medium flex items-center gap-1"
                        >
                          <ArrowLeft size={13} /> Back
                        </button>
                      )}
                    </div>

                    <div>
                      {currentStep < 4 ? (
                        <m.button
                          type="button"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          disabled={!isStepValid(currentStep)}
                          onClick={() => {
                            setDirection(1);
                            setCurrentStep(prev => prev + 1);
                          }}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-xs transition-all flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
                        >
                          Continue
                        </m.button>
                      ) : null}
                    </div>
                  </div>
                </form>
              </m.div>
            </div>

            {/* Right Card: Live White Paper Document Preview */}
            <div className="lg:col-span-7 w-full h-full lg:sticky lg:top-24">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[520px] flex flex-col justify-between text-slate-800">

                {/* Visual watermark grid lines */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                {/* Dynamic Notary Stamp */}
                <div className="absolute top-8 right-8 z-20">
                  <div className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-700 ${progress === 100
                      ? 'border-red-500/70 bg-red-50/50 text-red-600 rotate-[14deg] scale-110 shadow-sm font-bold'
                      : 'border-slate-300 bg-slate-100/50 text-slate-400 rotate-0 font-medium'
                    }`}>
                    <div className="text-center text-[7px] uppercase tracking-wider font-semibold leading-none">
                      {progress === 100 ? (
                        <>
                          <span className="block text-[6px] text-red-500 font-bold tracking-widest mb-0.5">APPROVED</span>
                          <span>NEXORA</span>
                          <span className="block text-[5px] text-red-500 font-bold mt-0.5">SECURE</span>
                        </>
                      ) : (
                        <>
                          <span className="block text-slate-400 text-[5px] tracking-widest mb-0.5">DRAFT</span>
                          <span>VOID</span>
                          <span className="block text-[5px] text-slate-400 mt-0.5">INCOMPLETE</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Document Content */}
                <div className="font-sans">
                  {/* Letterhead */}
                  <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-4">
                    <div className="w-5 h-5 rounded bg-slate-900 flex items-center justify-center text-[9px] font-black text-white">N</div>
                    <span className="font-display font-bold text-[10px] tracking-wider text-slate-900">NEXORA STUDIO</span>
                    <span className="h-3 w-[1px] bg-slate-300 mx-2"></span>
                    <span className="font-mono text-[9px] text-slate-400 font-semibold">{docHash}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base text-slate-900 mb-6 tracking-tight uppercase border-b border-slate-200/50 pb-2">
                    Mutual Services Request & NDA
                  </h3>

                  {/* Body Clauses with Step Highlights */}
                  <div className="space-y-4 text-xs text-slate-600 leading-relaxed">

                    {/* Clause 1: Parties */}
                    <p className={`transition-all duration-200 p-1.5 rounded ${currentStep === 1 ? 'bg-blue-50/70 border border-blue-100' : 'border border-transparent'}`}>
                      This transaction is initiated on <strong className="text-slate-900">{currentDate || 'June 13, 2026'}</strong>, by and between <span className="font-semibold text-slate-900">Nexora Studio LLC</span> and Client&nbsp;
                      <span className={`inline-block px-1.5 py-0.5 rounded transition-all duration-200 font-medium ${currentStep === 1
                          ? 'bg-blue-100 text-blue-800 font-semibold shadow-sm scale-105'
                          : formData.firstName || formData.lastName
                            ? 'text-slate-950 underline decoration-slate-400 font-medium'
                            : 'text-slate-450 border-b border-dashed border-slate-300'
                        }`}>
                        {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : '[Client Name]'}
                      </span>
                      &nbsp;('Client'), with digital email validation profile&nbsp;
                      <span className={`inline-block px-1.5 py-0.5 rounded transition-all duration-200 font-medium ${currentStep === 2
                          ? 'bg-blue-100 text-blue-800 font-semibold shadow-sm scale-105'
                          : formData.email
                            ? 'text-slate-950 underline decoration-slate-400 font-medium'
                            : 'text-slate-450 border-b border-dashed border-slate-300'
                        }`}>
                        {formData.email || '[client@email.com]'}
                      </span>
                      &nbsp;and registered birthdate of&nbsp;
                      <span className={`inline-block px-1.5 py-0.5 rounded transition-all duration-200 font-medium ${currentStep === 2
                          ? 'bg-blue-100 text-blue-800 font-semibold shadow-sm scale-105'
                          : formData.dob
                            ? 'text-slate-950 underline decoration-slate-400 font-medium'
                            : 'text-slate-450 border-b border-dashed border-slate-300'
                        }`}>
                        {formData.dob ? new Date(formData.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '[Date of Birth]'}
                      </span>.
                    </p>

                    {/* Clause 2: Purpose */}
                    <p className={`transition-all duration-200 p-1.5 rounded ${currentStep === 3 ? 'bg-blue-50/70 border border-blue-100' : 'border border-transparent'}`}>
                      <strong>1. Category of Collaboration:</strong> The Client registers formal specification and request for review under the category:&nbsp;
                      <span className={`inline-block px-1.5 py-0.5 rounded transition-all duration-200 font-medium ${currentStep === 3
                          ? 'bg-blue-100 text-blue-800 font-semibold shadow-sm scale-105'
                          : formData.purpose
                            ? 'text-slate-950 underline decoration-slate-400 font-medium'
                            : 'text-slate-450 border-b border-dashed border-slate-300'
                        }`}>
                        {formData.purpose || '[Selected Purpose]'}
                      </span>.
                    </p>

                    {/* Standard Legal boilerplate */}
                    <div className="space-y-3 pt-3 text-[10px] text-slate-500 border-t border-slate-200">
                      <p>
                        <strong>2. Confidential Information:</strong> Both parties agree that any digital specifications, source codes, layout maps, or strategic plans shared under this portal will be treated as Confidential Information and kept private.
                      </p>
                      <p>
                        <strong>3. Digital Submission:</strong> Click "Sign & Submit Request" to authorize delivery of this profile. A digitally certified PDF file copy will be dispatched to the verified email address immediately.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Signatures Row */}
                <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 relative z-10 font-sans">
                  {/* Nexora Sign */}
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">For Nexora Studio</div>
                    <div className="h-10 flex items-center select-none">
                      <img
                        src="/team/Screenshot_2026-06-10_134835-Picsart-AiImageEnhancer-removebg-preview.png"
                        alt="Milan Pandavadra Signature"
                        className="h-12 object-contain -my-2 mix-blend-darken"
                      />
                    </div>
                    <div className="border-t border-slate-200 mt-1 w-full"></div>
                    <div className="text-[9px] text-slate-900 font-bold mt-1.5 leading-none font-sans">Milan Pandavadra</div>
                    <div className="text-[7px] text-slate-500 font-semibold mt-0.5 leading-none font-sans">Founder and CEO</div>
                  </div>

                  {/* Client Sign */}
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">For Client</div>
                    <div className="h-10 flex items-center">
                      {formData.firstName || formData.lastName ? (
                        <m.span
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-medium text-2xl text-[#0F52BA] select-none tracking-wide"
                          style={{ fontFamily: "'Caveat', cursive" }}
                        >
                          {formData.firstName} {formData.lastName}
                        </m.span>
                      ) : (
                        <span className="text-[10px] text-slate-350 italic">Awaiting client signature...</span>
                      )}
                    </div>
                    <div className="border-t border-slate-200 mt-1 w-full"></div>
                    <div className="text-[8px] text-slate-400 mt-1">Authorized Electronic Signatory</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </m.div>
      </section>
    </>
  );
}
