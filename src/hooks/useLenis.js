import { useEffect } from 'react';
import { initScroll, destroyScroll } from '../utils/scroll';

export function useLenis() {
  useEffect(() => {
    initScroll();
    return () => {
      destroyScroll();
    };
  }, []);
}
