"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Detects which section is currently in view on the left side.
 * Returns the active section id so the phone can switch screens.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      let active = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(`section-${id}`);
        if (el && el.offsetTop <= scrollPos) {
          active = id;
        }
      }

      setActiveSection(active);
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(update);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return activeSection;
}
