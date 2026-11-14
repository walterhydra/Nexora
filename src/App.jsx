import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import { useLenis } from './hooks/useLenis';
import { Toaster } from 'react-hot-toast';
import { LazyMotion, domMax } from 'framer-motion';

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

// Lazy Loaded Heavy Widgets
const NovaWidget = lazy(() => import('./components/ui/NovaWidget'));

// Pages (Home is direct for instant initial render, others lazy-loaded)
import Home from './pages/Home';
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));
const InvoiceSystem = lazy(() => import('./pages/InvoiceSystem'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const PaymentPolicy = lazy(() => import('./pages/PaymentPolicy'));
const Projects = lazy(() => import('./pages/Projects'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Agreement = lazy(() => import('./pages/Agreement'));
const SystemBoot = lazy(() => import('./pages/SystemBoot'));
const CompanyPortal = lazy(() => import('./pages/CompanyPortal'));

// Initial Loading Fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black">
    <div className="w-12 h-12 border-4 border-gray-200 dark:border-white/10 border-t-accent-blue rounded-full animate-spin" />
  </div>
);

function AnimatedRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service/:slug" element={<ServiceDetails />} />
        <Route path="/portal" element={<ClientPortal />} />
        <Route path="/invoice-system" element={<InvoiceSystem />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<CaseStudyDetail />} />
        <Route path="/contact" element={<SystemBoot />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/payment-policy" element={<PaymentPolicy />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/system-boot" element={<SystemBoot />} />
        <Route path="/start-project" element={<SystemBoot />} />
        <Route path="/company-portal" element={<CompanyPortal />} />
        <Route path="/team-portal" element={<CompanyPortal />} />
        <Route path="/company-dashboard" element={<CompanyPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function AppContent() {
  // Initialize Lenis Smooth Scroll
  useLenis();
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/portal') ||
                   location.pathname.startsWith('/invoice-system') ||
                   location.pathname.startsWith('/system-boot') ||
                   location.pathname.startsWith('/start-project') ||
                   location.pathname.startsWith('/company-portal') ||
                   location.pathname.startsWith('/team-portal') ||
                   location.pathname.startsWith('/company-dashboard');

  return (
    <LazyMotion features={domMax}>
      <ScrollToTop />
      <Helmet>
        <title>Nexoraa Studio | 7-Day Web & App Development</title>
        <meta name="description" content="We build world-class websites, apps, automations, and digital products in 7 days. High-converting design meets top-tier engineering." />
        <meta property="og:title" content="Nexoraa Studio | 7-Day Web & App Development" />
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
      {!isPortal && (
        <Suspense fallback={null}>
          <NovaWidget />
        </Suspense>
      )}

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

const MemoizedAppContent = React.memo(AppContent);

function App() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    window.isLoaderActive = true;
    
    // Show loading screen on initial load
    const timer1 = setTimeout(() => {
      setLoading(false);
      setIsExiting(true);
      
      // Wait for exit transition to complete before removing from DOM
      const timer2 = setTimeout(() => {
        setShowLoader(false);
        window.isLoaderActive = false;
      }, 800);
      
      return () => clearTimeout(timer2);
    }, 1000);
    return () => clearTimeout(timer1);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <CursorProvider>
          <BrowserRouter>
            <MemoizedAppContent />
            {showLoader && <LoadingScreen isExiting={isExiting} />}
          </BrowserRouter>
        </CursorProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
