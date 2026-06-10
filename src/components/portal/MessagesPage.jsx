import React, { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, User, HelpCircle, FileText, PhoneCall, Sparkles } from 'lucide-react';
import { supabase } from "../../lib/supabase";

const MessagesPage = ({ projectId, messages = [], setMessages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !projectId) return;

    setIsSending(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          project_id: projectId,
          sender_id: session?.user?.id || 'client',
          content: newMessage,
          is_from_client: true,
          read: false
        }])
        .select();

      if (error) throw error;
      
      if (data && data.length > 0) {
         setMessages(prev => [...prev, data[0]]);
      }
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSending(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="portal-page p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-8 flex flex-col h-[calc(100vh-80px)]">
      {/* Hero Header Area */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/20 via-[#030407] to-pink-900/10 border border-white/[0.05] p-8 md:p-10 shrink-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 tracking-[0.2em] uppercase">
                <MessageSquare className="w-3.5 h-3.5" />
                Communications
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">Team Online</span>
              </div>
            </m.div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Direct Support Line
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
              Communicate directly with your dedicated development team. We typically respond within 1-2 hours during business hours.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="hidden lg:flex flex-col gap-6 col-span-4">
          <div className="bg-[#030407]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/3 group-hover:bg-purple-500/20 transition-colors duration-700" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">Priority Support</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Your project has been assigned priority routing.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shadow-lg">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block mb-0.5">Status</span>
                      <span className="text-sm font-bold text-white tracking-wide">All Systems Operational</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#030407]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group flex-1">
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3 group-hover:bg-pink-500/20 transition-colors duration-700" />
             <div className="relative z-10">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Actions</h3>
               <div className="space-y-3">
                  <button className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all text-sm font-medium text-gray-300 group/btn">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover/btn:bg-blue-500/20 transition-colors shadow-inner">
                        <HelpCircle className="w-5 h-5" />
                     </div>
                     Request Status Update
                  </button>
                  <button className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all text-sm font-medium text-gray-300 group/btn">
                     <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover/btn:bg-purple-500/20 transition-colors shadow-inner">
                        <PhoneCall className="w-5 h-5" />
                     </div>
                     Schedule Call
                  </button>
                  <button className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all text-sm font-medium text-gray-300 group/btn">
                     <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover/btn:bg-amber-500/20 transition-colors shadow-inner">
                        <FileText className="w-5 h-5" />
                     </div>
                     Share Document
                  </button>
               </div>
             </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-8 bg-[#030407]/80 backdrop-blur-3xl border border-white/[0.05] rounded-3xl flex flex-col h-full overflow-hidden shadow-2xl relative">
          {/* Chat Background Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.03)_0%,transparent_100%)] pointer-events-none" />

          <div className="p-6 border-b border-white/[0.05] bg-white/[0.01] flex items-center gap-4 shrink-0 relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-[2px] shadow-lg">
                <div className="w-full h-full rounded-[14px] bg-[#030407] flex items-center justify-center relative">
                   <Sparkles className="w-5 h-5 text-pink-400" />
                   <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#030407]" />
                </div>
             </div>
             <div>
                <h3 className="font-black text-white text-base tracking-wide">Nexora Core Team</h3>
                <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">Online & Ready</p>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 relative z-10">
            <div className="text-center">
               <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold bg-white/[0.03] border border-white/[0.05] px-4 py-1.5 rounded-full">
                 Secure Channel Established
               </span>
            </div>
            
            <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600/20 to-pink-600/20 border border-pink-500/20 flex items-center justify-center shrink-0 shadow-lg">
                <Sparkles className="w-5 h-5 text-pink-400" />
              </div>
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl rounded-tl-sm p-5 text-sm text-gray-300 max-w-[80%] leading-relaxed shadow-sm">
                <p className="mb-3 font-bold text-white">{getGreeting()},</p>
                <p>Welcome to your dedicated communication channel. This is the fastest way to reach the Nexora team for updates, questions, or feedback regarding your project.</p>
                <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Automated Message</span>
                  <span className="text-[10px] text-gray-500 font-mono">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </m.div>

            {messages && messages.map((msg, i) => {
              const isClient = msg.is_from_client;
              return (
                <m.div 
                  key={msg.id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`flex gap-4 ${isClient ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                    isClient ? 'bg-gradient-to-tr from-blue-600 to-indigo-600' : 'bg-gradient-to-tr from-purple-600/20 to-pink-600/20 border border-pink-500/20'
                  }`}>
                    {isClient ? <span className="text-sm font-black text-white">ME</span> : <Sparkles className="w-5 h-5 text-pink-400" />}
                  </div>
                  <div className={`rounded-2xl p-5 text-sm max-w-[80%] leading-relaxed shadow-sm flex flex-col ${
                    isClient 
                      ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-tr-sm text-white items-end' 
                      : 'bg-white/[0.03] border border-white/[0.05] rounded-tl-sm text-gray-300 items-start'
                  }`}>
                    <p className={isClient ? 'text-right' : ''}>{msg.content}</p>
                    <div className="flex items-center gap-2 mt-3 opacity-60">
                      <span className="text-[10px] font-mono">
                        {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </span>
                      {isClient && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                  </div>
                </m.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-white/[0.05] bg-white/[0.02] shrink-0 relative z-10">
            <form onSubmit={handleSendMessage} className="relative flex items-end gap-3">
              <div className="relative flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full bg-[#030407]/50 border border-white/[0.08] rounded-2xl pl-5 pr-12 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:bg-[#030407]/80 transition-all resize-none max-h-32 min-h-[56px] shadow-inner"
                  rows={1}
                />
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className="w-14 h-14 bg-gradient-to-tr from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 text-white rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-[0_0_20px_rgba(219,39,119,0.3)] disabled:shadow-none hover:scale-105 active:scale-95 border border-pink-400/30 disabled:border-transparent"
              >
                {isSending ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5 ml-1" />
                )}
              </button>
            </form>
            <div className="flex justify-between items-center mt-4">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                End-to-End Encrypted
              </p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Enter to send
              </p>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default MessagesPage;
