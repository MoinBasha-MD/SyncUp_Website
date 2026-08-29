"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [phase, setPhase] = useState(0); // 0=loading, 1=welcome, 2=done
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar fills up
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 40);

    // Phase transitions
    const t1 = setTimeout(() => setPhase(1), 1800); // "Welcome to Syncup"
    const t2 = setTimeout(() => setHidden(true), 2800); // fade out

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      {/* Phone device — iPhone 17 Pro style */}
      <div className="loader-phone">
        {/* Glow behind phone */}
        <div className="loader-phone-glow" />

        {/* Phone body */}
        <div className="loader-phone-body">
          {/* Side buttons */}
          <div className="loader-phone-btn loader-phone-btn-vol" />
          <div className="loader-phone-btn loader-phone-btn-pwr" />

          {/* Screen */}
          <div className="loader-phone-screen">
            {/* Dynamic Island / notch */}
            <div className="loader-phone-island" />

            {/* Status bar */}
            <div className="loader-phone-status">
              <span>9:41</span>
              <span className="loader-phone-status-icons">
                <span style={{ fontSize: "0.7rem" }}>📶</span>
                <span style={{ fontSize: "0.7rem" }}>🔋</span>
              </span>
            </div>

            {/* Content area */}
            <div className="loader-phone-content">
              {phase === 0 ? (
                <>
                  {/* Syncup logo — pulsing orb */}
                  <div className="loader-logo-wrap">
                    <div className="loader-logo-orb" />
                    <div className="loader-logo-ring" />
                    <div className="loader-logo-ring loader-logo-ring-2" />
                  </div>
                  <div className="loader-logo-text">Syncup</div>
                  <div className="loader-logo-sub">is loading for you</div>

                  {/* Progress bar */}
                  <div className="loader-progress-track">
                    <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="loader-progress-pct">{progress}%</div>
                </>
              ) : (
                <>
                  {/* Welcome screen */}
                  <div className="loader-welcome-logo">
                    <div className="loader-logo-orb loader-logo-orb-done" />
                  </div>
                  <div className="loader-welcome-title">Welcome to</div>
                  <div className="loader-welcome-name">Syncup</div>
                  <div className="loader-welcome-tag">One life. One rhythm. One sync.</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
