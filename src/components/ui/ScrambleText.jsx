import React, { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, delay = 0.3, duration = 1.2, className = "", onComplete }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      let frame = 0;
      const totalFrames = (duration * 1000) / 30; // 30ms per frame
      const length = text.length;

      intervalId = setInterval(() => {
        let currentText = "";
        for (let i = 0; i < length; i++) {
          if (frame / totalFrames > i / length) {
            currentText += text[i];
          } else {
            currentText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplayText(currentText);

        if (frame >= totalFrames) {
          clearInterval(intervalId);
          setDisplayText(text);
          if (onComplete) onComplete();
        }
        frame++;
      }, 30);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, duration, onComplete]);

  return <span className={className}>{displayText}</span>;
}
