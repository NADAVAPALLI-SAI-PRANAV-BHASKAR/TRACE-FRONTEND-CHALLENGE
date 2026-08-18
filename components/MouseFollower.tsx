"use client";

import { useEffect, useState } from "react";

export function MouseFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth trailing spring animation
  useEffect(() => {
    let animationFrameId: number;

    const animateFollower = () => {
      setFollowerPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.22,
          y: prev.y + dy * 0.22,
        };
      });
      animationFrameId = requestAnimationFrame(animateFollower);
    };

    animationFrameId = requestAnimationFrame(animateFollower);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block" aria-hidden="true">
      {/* Precision inner dot */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 pointer-events-none"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isClicking ? 0.7 : 1})`,
          width: "6px",
          height: "6px",
          backgroundColor: isHovered ? "rgb(245, 158, 11)" : "rgb(245, 158, 11)",
          boxShadow: isHovered
            ? "0 0 10px rgba(245, 158, 11, 0.8), 0 0 4px rgba(245, 158, 11, 0.9)"
            : "0 0 6px rgba(245, 158, 11, 0.5)",
        }}
      />

      {/* Trailing ambient radar ring */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-all duration-200 ease-out"
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0) scale(${
            isClicking ? 0.75 : isHovered ? 1.6 : 1
          })`,
          width: "32px",
          height: "32px",
          borderColor: isHovered ? "rgba(245, 158, 11, 0.6)" : "rgba(245, 158, 11, 0.28)",
          backgroundColor: isHovered ? "rgba(245, 158, 11, 0.08)" : "transparent",
          backdropFilter: isHovered ? "blur(1px)" : "none",
        }}
      />
    </div>
  );
}
