import { createContext, useContext, useState } from "react"

const PortalContext = createContext(null)

export function PortalProvider({ children }) {
  const [activePage, setActivePage] = useState("overview")
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
