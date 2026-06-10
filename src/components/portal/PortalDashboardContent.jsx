import React from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';
import { usePortal } from './PortalContext';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import OverviewPage from './OverviewPage';
import AssetVaultPage from './AssetVaultPage';
import BillingPage from './BillingPage';
import MessagesPage from './MessagesPage';
import SettingsPage from './SettingsPage';

export default function PortalDashboardContent({
  clientInfo,
  projects,
  milestones,
  invoices,
  deliverables,
  messages,
  setMessages,
  handleSendMessage,
  handleSignOut
}) {
  const { activePage: activeTab, setActivePage: setActiveTab } = usePortal();

  return (
    <div className="flex h-screen w-full bg-[#030407] overflow-hidden font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Sidebar 
        clientInfo={clientInfo} 
        onSignOut={handleSignOut} 
      />
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        <TopNavbar clientInfo={clientInfo} />
        
        <div data-lenis-prevent="true" className="h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden client-portal-scrollbar relative w-full">
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full min-h-full"
            >
              {activeTab === 'overview' && (
                <OverviewPage 
                  clientInfo={clientInfo} 
                  projects={projects} 
                  milestones={milestones}
                  invoices={invoices}
                />
              )}
              {activeTab === 'projects' && (
                <OverviewPage 
                  clientInfo={clientInfo} 
                  projects={projects} 
                  milestones={milestones}
                  invoices={invoices}
                />
              )}
              {activeTab === 'deliverables' && (
                <AssetVaultPage 
                  deliverables={deliverables} 
                />
              )}
              {activeTab === 'invoices' && (
                <BillingPage 
                  invoices={invoices} 
                />
              )}
              {activeTab === 'messages' && (
                <MessagesPage 
                  messages={messages} 
                  onSendMessage={handleSendMessage} 
                  clientInfo={clientInfo} 
                  projects={projects} 
                  invoices={invoices} 
                  milestones={milestones} 
                />
              )}
              {activeTab === 'settings' && (
                <SettingsPage 
                  clientInfo={clientInfo} 
                />
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
