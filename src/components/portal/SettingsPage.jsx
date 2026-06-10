import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Settings, LogOut, Bell, Shield, Key, Sliders, Smartphone, Mail, Lock } from 'lucide-react';

const SettingsPage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    marketing: false
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'emerald' },
    { id: 'security', label: 'Security', icon: Shield, color: 'blue' },
    { id: 'apikeys', label: 'API Keys', icon: Key, color: 'purple' },
    { id: 'preferences', label: 'Preferences', icon: Sliders, color: 'amber' }
  ];

  return (
    <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="portal-page p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-8">
      {/* Hero Header Area */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/20 via-[#030407] to-gray-900/20 border border-white/[0.05] p-8 md:p-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                <Settings className="w-3.5 h-3.5" />
                Account Settings
              </div>
            </m.div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Preferences & Security
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
              Manage your account settings, control notifications, and secure your profile. Ensure your experience is tailored to your workflow.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-4 lg:col-span-3 space-y-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-medium group relative overflow-hidden ${
                  isActive 
                    ? 'bg-white/[0.05] border-white/[0.1] text-white shadow-lg' 
                    : 'bg-transparent border-transparent hover:bg-white/[0.02] text-gray-400 hover:text-gray-300'
                } border`}
              >
                {isActive && (
                  <m.div layoutId="activeTabIndicator" className="absolute left-0 top-0 w-1 h-full bg-white" />
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-colors ${
                  isActive 
                    ? `bg-${tab.color}-500/20 text-${tab.color}-400` 
                    : `bg-white/[0.03] text-gray-500 group-hover:bg-${tab.color}-500/10 group-hover:text-${tab.color}-400`
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'notifications' && (
              <m.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#030407]/60 backdrop-blur-3xl border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none" />
                
                <div className="relative z-10 mb-8 pb-6 border-b border-white/[0.05]">
                  <h2 className="text-xl font-bold text-white tracking-tight mb-2">Notification Preferences</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">Choose what updates you want to receive and how you receive them.</p>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shadow-inner">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Email Notifications</h4>
                        <p className="text-xs text-gray-400 mt-1">Receive project updates and invoices via email.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleToggle('email')}
                      className={`w-14 h-8 rounded-full transition-colors relative shadow-inner ${notifications.email ? 'bg-emerald-500' : 'bg-gray-800 border border-gray-700'}`}
                    >
                      <m.div 
                        layout
                        className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-md"
                        initial={false}
                        animate={{ left: notifications.email ? '2rem' : '0.25rem' }}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shadow-inner">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Push Notifications</h4>
                        <p className="text-xs text-gray-400 mt-1">Get instant alerts in your browser for messages.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleToggle('push')}
                      className={`w-14 h-8 rounded-full transition-colors relative shadow-inner ${notifications.push ? 'bg-emerald-500' : 'bg-gray-800 border border-gray-700'}`}
                    >
                      <m.div 
                        layout
                        className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-md"
                        initial={false}
                        animate={{ left: notifications.push ? '2rem' : '0.25rem' }}
                      />
                    </button>
                  </div>
                </div>
              </m.div>
            )}

            {activeTab === 'security' && (
              <m.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#030407]/60 backdrop-blur-3xl border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none" />
                <div className="relative z-10 mb-8 pb-6 border-b border-white/[0.05]">
                  <h2 className="text-xl font-bold text-white tracking-tight mb-2">Security Settings</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">Protect your account and manage active sessions.</p>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shadow-inner shrink-0">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Password</h4>
                        <p className="text-xs text-gray-400 mt-1">Last changed 3 months ago.</p>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-sm font-bold text-white border border-white/[0.1] transition-colors whitespace-nowrap">
                      Update Password
                    </button>
                  </div>
                </div>
              </m.div>
            )}
            
            {/* Fallbacks for other tabs */}
            {(activeTab === 'apikeys' || activeTab === 'preferences') && (
              <m.div
                key="other"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#030407]/60 backdrop-blur-3xl border border-white/[0.05] rounded-3xl p-8 flex items-center justify-center min-h-[300px]"
              >
                <div className="text-center">
                  <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-300">Section Under Construction</h3>
                  <p className="text-sm text-gray-500 mt-2">Check back later for these settings.</p>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          {/* Danger Zone */}
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-red-950/30 to-[#030407] border border-red-500/20 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-lg font-bold text-red-400 mb-2">Danger Zone</h2>
                <p className="text-sm text-red-400/70 max-w-md leading-relaxed">
                  Logout of your account securely. You will need to authenticate again with magic link or password to access your project vault.
                </p>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-4 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-white border border-red-500/30 hover:border-red-500/50 rounded-xl font-black transition-all shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] shrink-0 group/btn"
              >
                <LogOut className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
                SIGN OUT SECURELY
              </button>
            </div>
          </m.div>
        </div>
      </div>
    </m.div>
  );
};

export default SettingsPage;
