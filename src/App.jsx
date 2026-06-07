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
import ScrollToTop from './components/layout/ScrollToTop';

// UI Components
import ContextCursor from './components/ui/ContextCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import CookieBanner from './components/ui/CookieBanner';
import LoadingScreen from './components/layout/LoadingScreen';

// Pages
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import NotFound from './pages/NotFound';
import ClientPortal from './pages/ClientPortal';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';
import Onboarding from './pages/Onboarding';
import PaymentPolicy from './pages/PaymentPolicy';
import Projects from './pages/Projects';

// Initial Loading Fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black">
    <div className="w-12 h-12 border-4 border-gray-200 dark:border-white/10 border-t-accent-blue rounded-full animate-spin" />
  </div>
);

// Animated Routes Component to handle location
import { useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, motion } from 'framer-motion';

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service/:slug" element={<ServiceDetails />} />
      <Route path="/portal" element={<ClientPortal />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/payment-policy" element={<PaymentPolicy />} />
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
    <LazyMotion features={domAnimation}>
      <ScrollToTop />
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
    </LazyMotion>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading screen on every page load/refresh
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds for initial narrative animation load
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
      <CursorProvider>
        <BrowserRouter>
          <AppContent />
          <AnimatePresence>
            {loading && <LoadingScreen key="loader" />}
          </AnimatePresence>
        </BrowserRouter>
      </CursorProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
