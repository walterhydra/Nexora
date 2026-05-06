import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedCounter({ end, duration = 2, prefix = "", suffix = "", className = "" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [stage, setStage] = useState(0); // 0: "---", 1: counting, 2: done
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView && stage === 0) {
      setTimeout(() => setStage(1), 300); // short flash
    }
  }, [inView, stage]);

  useEffect(() => {
    if (stage === 1) {
      let startTimestamp = null;
      let animationFrameId;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setStage(2);
        }
      };
      
      animationFrameId = window.requestAnimationFrame(step);
      
      return () => {
        if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [stage, end, duration]);

  return (
    <div ref={ref} className={`flex items-center ${className}`}>
      {stage === 0 && <span>---</span>}
      {stage >= 1 && (
        <span>
          {prefix}{count.toLocaleString()}{suffix}
        </span>
      )}
    </div>
  );
}
