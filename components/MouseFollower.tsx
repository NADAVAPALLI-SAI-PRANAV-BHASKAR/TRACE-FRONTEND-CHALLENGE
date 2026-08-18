"use client";

import { useEffect, useRef, useState } from "react";

export function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -200, y: -200 });
  const glowPos = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const glowRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest('[role="button"]') ||
        target?.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth linear interpolation (lerp) animation loop for 60-120hz silky tracking
    let animId: number;
    const updateMotion = () => {
      // Fast responsive dot
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.45;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.45;

      // Soft weighted ambient spotlight
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.12;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updateMotion);
    };

    animId = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block" aria-hidden="true">
      {/* Ambient soft backlight spotlight */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 ${
          isHovered
            ? "w-80 h-80 bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent blur-3xl opacity-90 scale-110"
            : "w-64 h-64 bg-gradient-to-tr from-amber-500/8 via-amber-400/5 to-transparent blur-2xl opacity-60 scale-100"
        } ${isClicking ? "scale-90 opacity-100" : ""}`}
      />

      {/* Sleek precision lens cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200"
      >
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
            isHovered
              ? "w-9 h-9 border border-amber-500/50 bg-amber-500/10 backdrop-blur-[2px] shadow-[0_0_15px_rgba(245,158,11,0.35)]"
              : "w-6 h-6 border border-neutral-400/40 dark:border-neutral-600/50 bg-white/20 dark:bg-white/5 backdrop-blur-[1px]"
          } ${isClicking ? "scale-75 bg-amber-500/25 border-amber-500" : ""}`}
        >
          {/* Micro center optical dot */}
          <div
            className={`rounded-full transition-all duration-150 ${
              isHovered
                ? "w-1.5 h-1.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)]"
                : "w-1 h-1 bg-neutral-900/80 dark:bg-neutral-100/90"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

