"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/components/useActiveSection";

// Full DOM order — the hook picks the last section whose top has passed.
const SECTION_ORDER = [
  "opening", "hero", "problem", "status", "sync", "connect",
  "world", "ripples", "live", "syncspace", "pulse", "connections",
  "chats", "privacy", "maps", "maya",
  "ecosystem", "social", "final",
];

const NAV_ITEMS = [
  { label: "Status", id: "status", icon: "●" },
  { label: "Chats", id: "chats", icon: "💬" },
  { label: "Network", id: "world", icon: "◎" },
  { label: "Ripples", id: "ripples", icon: "◉" },
  { label: "Live", id: "live", icon: "●" },
  { label: "Sync Space", id: "syncspace", icon: "◈" },
  { label: "Pulse", id: "pulse", icon: "♥" },
  { label: "Maps", id: "maps", icon: "📍" },
  { label: "Maya", id: "maya", icon: "✦" },
];

const PIXEL_COLS = 20;
const PIXEL_ROWS = 3;

// Deterministic jitter — Math.random() during render is a purity violation.
const pixelNoise = (r: number, c: number, salt: number) => {
  const x = Math.sin(r * 127.1 + c * 311.7 + salt * 74.7) * 43758.5453;
  return x - Math.floor(x);
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_ORDER);

  useEffect(() => {
    const update = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, p)));
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const activeTab = NAV_ITEMS.find((t) => t.id === activeSection);

  // Pixel grid for dissolve effect — regenerated on tab change
  const pixels = useMemo(() => {
    const arr: { id: string; delay: number }[] = [];
    const seed = activeSection.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
    for (let r = 0; r < PIXEL_ROWS; r++) {
      for (let c = 0; c < PIXEL_COLS; c++) {
        arr.push({
          id: `${r}-${c}`,
          delay: pixelNoise(r, c, seed) * 0.12,
        });
      }
    }
    return arr;
  }, [activeSection]);

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress * 100}%` }} />

      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-500" style={{ padding: scrolled ? "0.6rem 1rem" : "1.25rem 1rem" }}>
        <div
          className="mx-auto flex items-center justify-between transition-all duration-500"
          style={{
            maxWidth: scrolled ? "560px" : "1200px",
            background: scrolled ? "rgba(10, 4, 24, 0.88)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none",
            border: scrolled ? "1px solid rgba(167, 139, 250, 0.2)" : "none",
            borderRadius: scrolled ? "9999px" : "0",
            padding: scrolled ? "0.4rem 0.4rem 0.4rem 1.5rem" : "0",
            boxShadow: scrolled ? "0 8px 40px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-105 flex-shrink-0"
            aria-label="Syncup — back to top"
          >
            <div className="h-3 w-3 rounded-full pulse-glow" style={{ background: "var(--purple-bright)", boxShadow: "0 0 18px rgba(167,139,250,1)" }} />
            <span className="text-lg font-bold tracking-tight text-white">Syncup</span>
          </button>

          {/* Desktop nav — pixel dissolve tab (same as phone) */}
          <div className="hidden md:flex items-center" style={{ position: "relative" }}>
            <AnimatePresence>
              {activeTab ? (
                <motion.div
                  key={activeTab.id}
                  className="nav-pixel-tab"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Pixel grid — matrix dissolve */}
                  <div className="nav-pixel-grid">
                    {pixels.map((p) => (
                      <motion.div
                        key={p.id}
                        className="nav-pixel-box"
                        initial={{ opacity: 0, scale: 0, y: -3 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 5 }}
                        transition={{ delay: p.delay, duration: 0.18, ease: "easeOut" }}
                      />
                    ))}
                  </div>

                  {/* Tab content — icon + label */}
                  <motion.button
                    onClick={() => scrollTo(activeTab.id)}
                    className="nav-pixel-content"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.04, duration: 0.2 }}
                  >
                    <span className="nav-pixel-icon">{activeTab.icon}</span>
                    <span className="nav-pixel-label">{activeTab.label}</span>
                  </motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {mobileOpen ? (
                  <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu — pixel dissolve style */}
        {mobileOpen && (
          <div className="md:hidden mx-auto mt-2 rounded-2xl p-2 flex flex-col gap-1" style={{ maxWidth: "340px", background: "rgba(10, 4, 24, 0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(167, 139, 250, 0.2)" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold rounded-xl text-left transition-all"
                style={{
                  color: activeSection === item.id ? "#fff" : "var(--fg-muted)",
                  background: activeSection === item.id ? "linear-gradient(135deg, rgba(109,40,217,0.3), rgba(139,92,246,0.25))" : "transparent",
                  border: activeSection === item.id ? "1px solid rgba(196,181,253,0.25)" : "1px solid transparent",
                }}
              >
                <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
