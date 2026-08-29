"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/**
 * Interactive 3D Phone — drag to rotate, scroll/pinch to scale.
 * Uses pointer events + requestAnimationFrame for smooth spring physics.
 * The phone stays fixed on the right side; content is passed as children.
 */

interface Phone3DProps {
  children: React.ReactNode;
  screenKey: string; // changes when screen content changes — triggers enter animation
}

export function Phone3D({ children, screenKey }: Phone3DProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Target rotation/scale (what the user is dragging toward)
  // Less rotation on mobile for better readability
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1024;
  const initialRotX = isMobile ? 2 : 4;
  const initialRotY = isMobile ? -8 : -15;
  const targetRot = useRef({ x: initialRotX, y: initialRotY });
  // Current rotation/scale (smoothed toward target)
  const currentRot = useRef({ x: initialRotX, y: initialRotY });
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  // Drag state
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef(0);

  // Idle auto-rotate
  const idleTime = useRef(0);

  // Animation loop
  useEffect(() => {
    let raf: number;

    const animate = () => {
      // Idle auto-rotation when not dragging
      if (!dragging.current) {
        idleTime.current += 0.016;
        if (idleTime.current > 2) {
          // Gentle sway — less on mobile
          const mobile = window.innerWidth <= 1024;
          const baseY = mobile ? -8 : -15;
          const swayY = mobile ? 4 : 8;
          const baseX = mobile ? 2 : 4;
          const swayX = mobile ? 2 : 3;
          targetRot.current.y = baseY + Math.sin(idleTime.current * 0.3) * swayY;
          targetRot.current.x = baseX + Math.sin(idleTime.current * 0.2) * swayX;
        }
      } else {
        idleTime.current = 0;
      }

      // Spring interpolation
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.08;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.08;
      currentScale.current += (targetScale.current - currentScale.current) * 0.1;

      if (phoneRef.current) {
        const s = currentScale.current;
        phoneRef.current.style.transform = `scale(${s}) rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Native wheel listener (non-passive) so preventDefault works for zoom
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.06 : 0.06;
      targetScale.current = Math.max(0.6, Math.min(2, targetScale.current + delta));
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, []);

  // Pointer drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    idleTime.current = 0;
    if (stageRef.current) stageRef.current.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    targetRot.current.y += dx * 0.5;
    targetRot.current.x -= dy * 0.5;

    // Clamp rotation
    targetRot.current.x = Math.max(-45, Math.min(45, targetRot.current.x));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragging.current = false;
    if (stageRef.current) stageRef.current.releasePointerCapture(e.pointerId);
  }, []);

  // Touch pinch to scale
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      lastPinchDist.current = dist;
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      if (lastPinchDist.current > 0) {
        const delta = (dist - lastPinchDist.current) * 0.005;
        targetScale.current = Math.max(0.5, Math.min(1.8, targetScale.current + delta));
      }
      lastPinchDist.current = dist;
    }
  }, []);

  return (
    <div
      ref={stageRef}
      className="phone-stage"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <div className="phone-3d-glow" />
      <div ref={phoneRef} className="phone-3d">
        {/* 3D side panels for depth illusion */}
        <div className="phone-3d-side phone-3d-side-left" />
        <div className="phone-3d-side phone-3d-side-right" />

        {/* Screen content */}
        <div className="phone-notch" />
        <div className="phone-screen" key={screenKey}>
          <div className="phone-status-bar">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span style={{ fontSize: "0.6rem" }}>📶</span>
              <span style={{ fontSize: "0.6rem" }}>🔋</span>
            </span>
          </div>
          <div className="phone-screen-enter" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {children}
          </div>
        </div>
      </div>
      <div className="phone-hint">Drag to rotate · Scroll to zoom</div>
    </div>
  );
}
