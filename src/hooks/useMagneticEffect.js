import { useEffect } from 'react';
import gsap from 'gsap';

export function useMagneticEffect(sensorRef, targetRef) {
  useEffect(() => {
    const sensor = sensorRef.current;
    // Fallback to sensor if targetRef is not provided
    const target = targetRef ? targetRef.current : sensor;
    if (!sensor || !target) return;

    target.style.willChange = 'transform';

    const xTo = gsap.quickTo(target, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(target, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    let rect = null;

    const handleMouseEnter = () => {
      rect = sensor.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      if (!rect) rect = sensor.getBoundingClientRect();
      const { clientX, clientY } = e;
      const { height, width, left, top } = rect;
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.2); // Adjust multiplier for stronger/weaker effect (max ±8px ideally)
      yTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      rect = null;
      xTo(0);
      yTo(0);
    };

    sensor.addEventListener("mouseenter", handleMouseEnter);
    sensor.addEventListener("mousemove", handleMouseMove);
    sensor.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      target.style.willChange = 'auto';
      sensor.removeEventListener("mouseenter", handleMouseEnter);
      sensor.removeEventListener("mousemove", handleMouseMove);
      sensor.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sensorRef, targetRef]);
}
