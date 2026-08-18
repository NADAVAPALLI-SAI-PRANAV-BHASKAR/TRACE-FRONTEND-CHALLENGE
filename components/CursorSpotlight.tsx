"use client";

import { useEffect, useState } from "react";

export function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with hover support
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    setMounted(true);

    const handlePointerMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  if (!mounted) return null;

  return <div className="cursor-spotlight hidden md:block" aria-hidden="true" />;
}
