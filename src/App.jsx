import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import { useLenis } from './hooks/useLenis';
import { Toaster } from 'react-hot-toast';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// UI Components
import ContextCursor from './components/ui/ContextCursor';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import CookieBanner from './components/ui/CookieBanner';
import LoadingScreen from './components/ui/LoadingScreen';

// Pages
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import NotFound from './pages/NotFound';
import ClientPortal from './pages/ClientPortal';

// Initial Loading Fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black">
    <div className="w-12 h-12 border-4 border-gray-200 dark:border-white/10 border-t-accent-blue rounded-full animate-spin" />
  </div>
);

// Animated Routes Component to handle location
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service/:slug" element={<ServiceDetails />} />
      <Route path="/portal" element={<ClientPortal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppContent() {
  // Initialize Lenis Smooth Scroll
  useLenis();
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/portal');

  return (
    <>
      <Helmet>
        <title>Nexora Studio | 7-Day Web & App Development</title>
        <meta name="description" content="We build world-class websites, apps, automations, and digital products in 7 days. High-converting design meets top-tier engineering." />
        <meta property="og:title" content="Nexora Studio | 7-Day Web & App Development" />
        <meta property="og:description" content="We build world-class websites, apps, automations, and digital products in 7 days." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {!isPortal && <ScrollProgress />}
      {!isPortal && <ContextCursor />}
      {!isPortal && <Navbar />}
      
      <AnimatedRoutes />

      {!isPortal && <Footer />}
      {!isPortal && <WhatsAppButton />}
      {!isPortal && <BackToTop />}
      {!isPortal && <CookieBanner />}
      
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
      />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading screen on every page load/refresh
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 3.5 seconds for initial narrative animation load
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
      <CursorProvider>
        {loading ? (
          <LoadingScreen />
        ) : (
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        )}
      </CursorProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
