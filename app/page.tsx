"use client";

import { useState, useEffect } from "react";
import { DEMO_INCIDENT, NOMINAL_EASTER_EGG_INCIDENT } from "@/data/incident";
import { Navbar } from "@/components/Navbar";
import { IncidentPreview } from "@/components/IncidentPreview";
import { SignalSources } from "@/components/SignalSources";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FooterCTA } from "@/components/FooterCTA";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function Home() {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [incidentId, setIncidentId] = useState("INC-8492");

  // Rotate random simulated incident numbers
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setIncidentId(`INC-${randomNum}`);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Konami code hook: ↑ ↑ ↓ ↓ ← → ← → B A
  useKonamiCode(() => {
    setEasterEggActive((prev) => !prev);
  });

  const baseIncident = easterEggActive ? NOMINAL_EASTER_EGG_INCIDENT : DEMO_INCIDENT;
  const incident = {
    ...baseIncident,
    id: easterEggActive ? "SYS-NOMINAL" : incidentId,
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-neutral-900 selection:bg-neutral-900 selection:text-white dark:bg-black dark:text-neutral-100 dark:selection:bg-neutral-100 dark:selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <main className="w-full">
        <section className="relative px-4 pt-8 pb-6 sm:px-6 md:pt-12 lg:pt-14 max-w-4xl lg:max-w-5xl mx-auto text-center">
          {/* Subtle live indicator badge with rotating incident number */}
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono bg-amber-500/10 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 mb-5 border border-amber-500/30 dark:border-amber-400/25 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-neutral-600 dark:text-neutral-400 shrink-0">Simulated Incident:</span>
            <span className="font-bold tracking-wider text-amber-950 dark:text-amber-200 bg-amber-200/50 dark:bg-amber-900/50 px-1.5 py-0.5 rounded font-mono transition-all duration-300">
              {incident.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 max-w-3xl lg:max-w-4xl mx-auto leading-[1.18] sm:leading-[1.14]">
            When production breaks, see the story — not the noise.
          </h1>

          <p className="mt-4 sm:mt-5 text-xs sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Trace connects deploys, alerts, logs, and infrastructure events into one clear incident timeline, so your team can understand what changed and act faster.
          </p>

          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto">
            <a
              href="#incident-preview"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-neutral-900 px-5 py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-sm"
            >
              Explore the demo
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white/60 px-5 py-2.5 text-xs sm:text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              See how it works
            </a>
          </div>

          {/* Easter egg indicator banner if toggled */}
          {easterEggActive && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-mono transition-opacity duration-300 max-w-full">
              <span className="truncate">🎮 Easter Egg Active: All systems nominal (Press sequence again to toggle)</span>
            </div>
          )}
        </section>

        {/* Section 3 & 4: Incident Product Preview with Centerpiece Interactive Timeline */}
        <section id="incident-preview" className="px-3 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-6xl mx-auto">
          <IncidentPreview incident={incident} />
        </section>

        {/* Section 5: Five Dashboards One Incident */}
        <SignalSources />

        {/* Section 6: Feature Section */}
        <FeatureGrid />

        {/* Section 7: Final CTA & Footer */}
        <FooterCTA />
      </main>
    </div>
  );
}
