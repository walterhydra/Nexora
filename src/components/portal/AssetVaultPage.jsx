import React from 'react';
import { m } from 'framer-motion';
import { Layers3, CheckCircle2, Download, FolderKanban, Eye, Sparkles, Box } from 'lucide-react';

const AssetVaultPage = ({ deliverables = [] }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const getFileIconColor = (fileType) => {
    const type = (fileType || '').toLowerCase();
    if (type === 'pdf') return 'red';
    if (type === 'zip') return 'cyan';
    if (type === 'png' || type === 'jpg') return 'emerald';
    return 'indigo';
  };

  const hasDynamicData = deliverables && deliverables.length > 0;
  
  const finalizedList = hasDynamicData
    ? deliverables.filter(d => d.status === 'delivered' || d.status === 'approved').map(d => ({
        name: d.title,
        size: d.file_type === 'pdf' ? '4.2 MB' : d.file_type === 'zip' ? '12.8 MB' : '18.5 MB',
        date: d.created_at ? new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'Oct 12',
        type: d.file_type || 'file',
        color: getFileIconColor(d.file_type)
      }))
    : [
        { name: "Brand_Guidelines_vFinal.pdf", size: "4.2 MB", date: "Oct 12", type: "pdf", color: "red" },
        { name: "Logo_Package_All_Formats.zip", size: "12.8 MB", date: "Oct 12", type: "zip", color: "cyan" },
        { name: "Brand_Pattern_Assets.png", size: "8.5 MB", date: "Oct 11", type: "png", color: "emerald" },
        { name: "UI_Design_System.fig", size: "18.5 MB", date: "Oct 10", type: "fig", color: "indigo" }
      ];

  const wipList = hasDynamicData
    ? deliverables.filter(d => d.status === 'pending' || d.status === 'revision').map(d => ({
        name: d.title,
        size: d.file_type === 'pdf' ? '1.2 MB' : '8.1 MB',
        date: d.created_at ? new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'Today',
        type: d.file_type || 'fig',
        color: getFileIconColor(d.file_type)
      }))
    : [
        { name: "Homepage_Draft_v2.fig", size: "8.1 MB", date: "Today", type: "fig", color: "indigo" },
        { name: "Copywriting_Wireframe.pdf", size: "1.2 MB", date: "Yesterday", type: "pdf", color: "red" }
      ];

  return (
    <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="portal-page p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-10">
      {/* Hero Header Area */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/20 via-[#030407] to-teal-900/10 border border-white/[0.05] p-8 md:p-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 tracking-[0.2em] uppercase">
                <Box className="w-3.5 h-3.5" />
                Asset Vault
              </div>
            </m.div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Your Digital Assets
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
              Secure storage for your final deliverables and design source files. Everything is organized, version-controlled, and ready for production.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button className="group relative flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.08] px-5 py-3 text-xs font-bold text-gray-300 transition-all hover:bg-white/[0.08] hover:text-white hover:border-white/20 active:scale-95 overflow-hidden">
              <span className="relative z-10">Request Asset</span>
            </button>
            <button className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 text-xs font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 overflow-hidden border border-emerald-400/30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Download className="w-4 h-4 relative z-10" />
              <span className="relative z-10 uppercase tracking-wider">Download All (24.5 MB)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Approved Final Assets */}
        <m.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Finalized Assets</h2>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Production Ready</span>
            </div>
            <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] text-gray-400 text-xs font-bold">
              {finalizedList.length}
            </div>
          </div>

          {finalizedList.map((file, i) => (
            <m.div key={i} variants={item} className="group relative overflow-hidden bg-[#030407]/60 backdrop-blur-xl border border-white/[0.05] hover:border-emerald-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(16,185,129,0.1)] cursor-pointer hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner transition-transform duration-300 group-hover:scale-110
                    ${file.color === 'red' ? 'bg-gradient-to-br from-red-500/10 to-rose-500/5 text-red-400 border border-red-500/20' : 
                      file.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/5 text-cyan-400 border border-cyan-500/20' : 
                      file.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/5 text-emerald-400 border border-emerald-500/20' : 
                      'bg-gradient-to-br from-indigo-500/10 to-purple-500/5 text-indigo-400 border border-indigo-500/20'}`}
                  >
                    .{file.type}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight mb-1">{file.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono bg-white/[0.03] px-2 py-0.5 rounded-md">{file.size}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] text-gray-500 uppercase tracking-[0.1em] font-medium">Vaulted {file.date}</span>
                    </div>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-full bg-white/[0.03] group-hover:bg-emerald-500 group-hover:text-black text-gray-400 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110">
                  <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Work In Progress */}
        <m.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5">
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-lg">
              <FolderKanban className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Work In Progress</h2>
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                In Review
              </span>
            </div>
            <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] text-gray-400 text-xs font-bold">
              {wipList.length}
            </div>
          </div>

          {wipList.map((file, i) => (
            <m.div key={i} variants={item} className="group relative overflow-hidden bg-[#030407]/60 backdrop-blur-xl border border-white/[0.05] hover:border-indigo-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(99,102,241,0.1)] cursor-pointer hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner transition-transform duration-300 group-hover:scale-110
                    ${file.color === 'red' ? 'bg-gradient-to-br from-red-500/10 to-rose-500/5 text-red-400 border border-red-500/20' : 
                      file.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/5 text-cyan-400 border border-cyan-500/20' : 
                      file.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/5 text-emerald-400 border border-emerald-500/20' : 
                      'bg-gradient-to-br from-indigo-500/10 to-purple-500/5 text-indigo-400 border border-indigo-500/20'}`}
                  >
                    .{file.type}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight mb-1">{file.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono bg-white/[0.03] px-2 py-0.5 rounded-md">{file.size}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] text-gray-500 uppercase tracking-[0.1em] font-medium">Updated {file.date}</span>
                    </div>
                  </div>
                </div>
                <button className="w-12 h-12 rounded-full bg-white/[0.03] group-hover:bg-indigo-500 group-hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </m.div>
  );
};

export default AssetVaultPage;
