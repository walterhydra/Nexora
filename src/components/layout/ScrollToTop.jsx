import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getScroll } from '../../utils/scroll';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getScroll();
    if (lenis) {
      // Instantly scroll Lenis to the top of the page on route change
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
