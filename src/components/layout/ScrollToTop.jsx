import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getScroll } from '../../utils/scroll';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly reset scroll to top on every route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const lenis = getScroll();
    if (lenis && lenis.scrollTo) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
