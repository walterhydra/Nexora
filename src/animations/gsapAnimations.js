import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const setupHowWeWorkAnimation = (containerRef, panelsRef) => {
  const container = containerRef.current;
  const panels = panelsRef.current;
  
  if (!container || !panels.length) return;

  // Horizontal scrolling
  const totalWidth = panels.length * 100;
  
  const ctx = gsap.context(() => {
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + container.offsetWidth * panels.length
      }
    });
  }, container);

  return () => ctx.revert(); // Cleanup
};
