"use client"

import { AnimatePresence, motion } from "framer-motion"
import { PortalProvider, usePortal } from "@/lib/portal-context"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { CommandPalette } from "@/components/command-palette"
import { RequestModal } from "@/components/request-modal"
import { OverviewPage } from "@/components/pages/overview-page"
import { AssetVaultPage } from "@/components/pages/asset-vault-page"
import { BillingPage } from "@/components/pages/billing-page"
import { MessagesPage } from "@/components/pages/messages-page"
import { SettingsPage } from "@/components/pages/settings-page"

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

function PageRouter() {
  const { activePage } = usePortal()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={activePage} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        {activePage === "overview" && <OverviewPage />}
        {activePage === "assets" && <AssetVaultPage />}
        {activePage === "billing" && <BillingPage />}
        {activePage === "messages" && <MessagesPage />}
        {activePage === "settings" && <SettingsPage />}
      </motion.div>
    </AnimatePresence>
  )
}

function Portal() {
  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Animated grid background */}
      <div className="animated-grid" aria-hidden="true" />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <TopNavbar />

        <main
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6"
          id="main-content"
        >
          <div className="max-w-6xl mx-auto">
            <PageRouter />
          </div>
        </main>
      </div>

      {/* Overlays */}
      <CommandPalette />
      <RequestModal />
    </div>
  )
}

export default function Home() {
  return (
    <PortalProvider>
      <Portal />
    </PortalProvider>
  )
}
