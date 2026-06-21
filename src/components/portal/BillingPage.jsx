import React, { useState, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { WalletCards, AlertCircle, CheckCircle2, Zap, ArrowRight, Receipt, Activity, Download } from 'lucide-react';

const InteractiveInvoice = ({ invoice }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rX = -((mouseY / height) - 0.5) * 20;
    const rY = ((mouseX / width) - 0.5) * 20;
    
    setRotate({ x: rX, y: rY });
    setGlare({ 
      x: (mouseX / width) * 100, 
      y: (mouseY / height) * 100,
      opacity: 1 
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  if (!invoice) {
    return (
      <div className="text-gray-500 text-center py-6 bg-[#030407]/40 border border-white/[0.04] rounded-2xl w-full">
        No active invoices to display.
      </div>
    );
  }

  const isPaid = invoice.status === 'paid';
  const amountFormatted = parseFloat(invoice.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="mt-8 flex flex-col xl:flex-row gap-12 items-center bg-[#030407]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="flex-1 space-y-5 relative z-10">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border ${
          isPaid 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
        }`}>
          {isPaid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
          {isPaid ? 'Paid in Full' : 'Pending Payment'}
        </div>
        <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight">{invoice.description || 'Project Invoice'}</h3>
        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
          Invoice #{invoice.invoice_number || invoice.id} for the development and deliverables of this project phase.
        </p>
        <div className="pt-4 flex items-center gap-4">
          <button className="group relative flex items-center justify-center gap-2 rounded-xl bg-white/[0.05] border border-white/[0.1] px-5 py-3 text-xs font-bold text-gray-300 transition-all hover:bg-white/[0.1] hover:text-white hover:border-white/20 active:scale-95 overflow-hidden">
            <Download className="h-4 w-4 text-blue-400 group-hover:-translate-y-0.5 transition-transform" />
            <span className="relative z-10">Download PDF</span>
          </button>
          {!isPaid && (
            <button className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 text-xs font-black transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-95 border border-blue-400/30">
              <span className="relative z-10 uppercase tracking-wider">Pay Invoice</span>
            </button>
          )}
        </div>
      </div>

      <div 
        className="relative w-full max-w-md aspect-[1.6/1] [perspective:1000px] cursor-pointer shrink-0 z-10 group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <m.div
          ref={cardRef}
          animate={{ rotateX: rotate.x, rotateY: rotate.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full rounded-2xl p-7 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#030407] to-black text-white shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between border border-white/[0.15] group-hover:border-white/30 transition-colors"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div 
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              mixBlendMode: 'overlay'
            }}
          />
          
          <div className="flex justify-between items-start relative z-20" style={{ transform: "translateZ(30px)" }}>
            <div>
              <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase block mb-1">Total Amount</span>
              <span className="text-3xl font-black tracking-tighter text-white">${amountFormatted}</span>
            </div>
            <div className="w-12 h-8 rounded bg-gradient-to-tr from-[#e5e7eb] to-[#9ca3af] flex flex-col justify-between p-1.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)] opacity-90 border border-gray-400">
               <div className="flex gap-0.5">
                  <div className="w-2 h-2 bg-gray-500/50 rounded-[2px]" />
                  <div className="w-2 h-2 bg-gray-500/50 rounded-[2px]" />
               </div>
               <div className="h-0.5 bg-gray-500/50 rounded" />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none" style={{ transform: "translateZ(15px)" }}>
            <Zap className="w-48 h-48" />
          </div>

          <div className="flex justify-between items-end relative z-20" style={{ transform: "translateZ(40px)" }}>
            <div className="space-y-1.5">
              <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Invoice Number</div>
              <div className="text-sm font-black tracking-widest text-gray-200">{invoice.invoice_number || 'INV-001'}</div>
            </div>
            <div className="text-right space-y-1.5">
              <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">{isPaid ? 'Date Paid' : 'Due Date'}</div>
              <div className={`text-sm font-bold tracking-wider ${isPaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isPaid 
                  ? new Date(invoice.paid_date || new Date()).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                  : new Date(invoice.due_date || new Date()).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                }
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

const BillingPage = ({ invoices }) => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const activeInvoice = (invoices || []).find(inv => inv.id === selectedInvoiceId) ||
    (invoices || []).find(inv => inv.status !== 'paid' && inv.status !== 'cancelled') ||
    (invoices || [])[0] ||
    null;

  useEffect(() => {
    if (invoices && invoices.length > 0 && !selectedInvoiceId) {
      const firstUnpaid = invoices.find(inv => inv.status !== 'paid' && inv.status !== 'cancelled');
      if (firstUnpaid) {
        setSelectedInvoiceId(firstUnpaid.id);
      } else {
        setSelectedInvoiceId(invoices[0].id);
      }
    }
  }, [invoices, selectedInvoiceId]);

  const totalPaid = (invoices || [])
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);

  const hasUnpaid = (invoices || []).some(inv => inv.status !== 'paid' && inv.status !== 'cancelled');

  const formattedTotalPaid = totalPaid.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const totalCents = (totalPaid % 1).toFixed(2).substring(2);

  const sparklineValues = invoices && invoices.length > 0 
    ? [...invoices].reverse().map(inv => {
        const val = parseFloat(inv.amount || 0);
        return Math.min(100, Math.max(20, (val / 15000) * 100));
      })
    : [30, 45, 20, 65, 80, 50, 100];

  return (
    <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="portal-page p-6 lg:p-10 max-w-[1600px] mx-auto w-full space-y-10">
      {/* Hero Header Area */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/20 via-[#030407] to-blue-900/20 border border-white/[0.05] p-8 md:p-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase">
                <WalletCards className="w-3.5 h-3.5" />
                Billing & Finances
              </div>
            </m.div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Invoices & Payments
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
              Secure ledger of all project invoices, payment history, and financial documents.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
           {/* Total Value Card */}
           <div className="bg-[#030407]/60 backdrop-blur-2xl border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />
             <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Total Value Delivered</h3>
             <div className="flex items-baseline gap-1 mb-3">
               <span className="text-5xl font-black tracking-tighter text-white">${formattedTotalPaid}</span>
               <span className="text-lg font-bold text-emerald-400">.{totalCents}</span>
             </div>
             {hasUnpaid ? (
               <p className="text-xs font-bold text-amber-400 flex items-center gap-2 px-3 py-2 bg-amber-500/10 rounded-lg border border-amber-500/20 mt-4">
                 <AlertCircle className="w-4 h-4 animate-pulse" /> Pending invoices require attention
               </p>
             ) : (
               <p className="text-xs font-bold text-emerald-400 flex items-center gap-2 px-3 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 mt-4">
                 <CheckCircle2 className="w-4 h-4" /> All invoices paid in full
               </p>
             )}
             
             <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-end justify-between h-24 gap-2 relative z-10">
               {sparklineValues.map((val, i) => (
                 <m.div 
                   key={i} 
                   initial={{ height: 0 }}
                   animate={{ height: `${val}%` }}
                   transition={{ duration: 0.8, delay: i * 0.05 }}
                   className="w-full bg-emerald-500/20 hover:bg-emerald-400/40 rounded-t-md transition-colors cursor-pointer relative group/bar"
                 >
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white text-black text-[10px] font-bold px-2 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-30">
                       INV-{i + 1}
                     </div>
                 </m.div>
               ))}
             </div>
           </div>
           
           {/* Enterprise Retainer Upsell */}
           <div className="bg-gradient-to-br from-indigo-900/40 via-[#030407] to-blue-900/20 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
             <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-indigo-500/20 group-hover:scale-110 transition-transform duration-500" />
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-3">
                 <h3 className="text-lg font-black text-white">Nexoraa Enterprise</h3>
                 <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 rounded border border-indigo-500/20">Pro</span>
               </div>
               <p className="text-sm text-gray-400 mb-6 leading-relaxed">Upgrade to a retainer model to streamline billing, receive bulk discounts, and lock in priority development hours.</p>
               <button className="w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-indigo-500/50 px-4 py-3.5 rounded-xl font-bold transition-all shadow-inner text-xs uppercase tracking-wider">
                 View Retainer Plans
               </button>
             </div>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Invoice Details</h3>
            </div>
            {activeInvoice ? (
              <InteractiveInvoice invoice={activeInvoice} />
            ) : (
              <div className="text-center py-16 bg-[#030407]/40 border border-white/[0.05] rounded-3xl backdrop-blur-md">
                <WalletCards className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">No active invoices found.</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Billing History</h3>
            <div className="space-y-4">
              {(invoices || []).map((inv, i) => {
                const amountFormatted = parseFloat(inv.amount || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                const isPaid = inv.status === 'paid';
                const isSelected = activeInvoice?.id === inv.id;

                return (
                  <m.div 
                    key={inv.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedInvoiceId(inv.id)}
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl transition-all duration-300 cursor-pointer border ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_10px_30px_rgba(59,130,246,0.1)] -translate-y-1'
                        : 'bg-[#030407]/60 hover:bg-white/[0.04] border-white/[0.05] hover:border-white/[0.1] backdrop-blur-xl hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-5 mb-4 sm:mb-0">
                      <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner ${
                        isSelected 
                          ? 'bg-blue-500/20 border-blue-400 scale-105'
                          : 'bg-white/[0.02] border-white/[0.08] group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:scale-105'
                      }`}>
                        <Receipt className={`w-6 h-6 transition-colors ${
                          isSelected ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{inv.description || 'Consulting Services'}</h4>
                          <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded border ${
                            isPaid
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : inv.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {inv.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded-md">{inv.invoice_number || inv.id}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Issued {inv.issue_date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-6 pl-16 sm:pl-0">
                      <span className={`text-xl font-black tracking-tighter transition-colors ${
                        isSelected ? 'text-blue-400' : 'text-white group-hover:text-blue-300'
                      }`}>{amountFormatted}</span>
                      <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isSelected 
                          ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                          : 'bg-white/[0.03] text-gray-400 group-hover:text-white group-hover:bg-blue-500'
                      }`}>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default BillingPage;
