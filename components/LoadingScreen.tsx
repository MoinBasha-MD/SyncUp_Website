"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => Math.min(d + 1, 6));
    }, 250);
    const timer = setTimeout(() => setHidden(true), 2200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      <svg width="140" height="100" viewBox="0 0 140 100">
        {Array.from({ length: dots }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const cx = 70 + Math.cos(angle) * 35;
          const cy = 50 + Math.sin(angle) * 25;
          return (
            <g key={i}>
              {i > 0 && (
                <line
                  x1={70}
                  y1={50}
                  x2={cx}
                  y2={cy}
                  stroke="rgba(139,92,246,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill="#a78bfa"
                style={{ filter: "drop-shadow(0 0 6px rgba(167,139,250,0.9))" }}
              />
            </g>
          );
        })}
        <circle
          cx="70"
          cy="50"
          r="4"
          fill="#c4b5fd"
          style={{ filter: "drop-shadow(0 0 10px rgba(196,181,253,1))" }}
        />
      </svg>
      <div className="loading-text">Syncing experience...</div>
    </div>
  );
}
