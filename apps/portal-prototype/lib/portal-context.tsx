"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Page = "overview" | "assets" | "billing" | "messages" | "settings"

interface PortalContextType {
  activePage: Page
  setActivePage: (page: Page) => void
  commandOpen: boolean
  setCommandOpen: (open: boolean) => void
  notifOpen: boolean
  setNotifOpen: (open: boolean) => void
  requestModalOpen: boolean
  setRequestModalOpen: (open: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const PortalContext = createContext<PortalContextType | null>(null)

export function PortalProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<Page>("overview")
  const [commandOpen, setCommandOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [requestModalOpen, setRequestModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <PortalContext.Provider
      value={{
        activePage,
        setActivePage,
        commandOpen,
        setCommandOpen,
        notifOpen,
        setNotifOpen,
        requestModalOpen,
        setRequestModalOpen,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </PortalContext.Provider>
  )
}

export function usePortal() {
  const ctx = useContext(PortalContext)
  if (!ctx) throw new Error("usePortal must be used within PortalProvider")
  return ctx
}
