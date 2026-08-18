"use client";

import { useState } from "react";
import { DEMO_INCIDENT, NOMINAL_EASTER_EGG_INCIDENT } from "@/data/incident";
import { Navbar } from "@/components/Navbar";
import { IncidentPreview } from "@/components/IncidentPreview";
import { SignalSources } from "@/components/SignalSources";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FooterCTA } from "@/components/FooterCTA";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function Home() {
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Konami code hook: ↑ ↑ ↓ ↓ ← → ← → B A
  useKonamiCode(() => {
    setEasterEggActive((prev) => !prev);
  });

  const incident = easterEggActive ? NOMINAL_EASTER_EGG_INCIDENT : DEMO_INCIDENT;

  return (
    <div className="min-h-screen bg-[#faf9f5] text-neutral-900 selection:bg-neutral-900 selection:text-white dark:bg-black dark:text-neutral-100 dark:selection:bg-neutral-100 dark:selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <main className="w-full">
        <section className="relative px-4 pt-8 pb-4 sm:px-6 lg:pt-10 max-w-5xl mx-auto text-center">
          {/* Subtle live indicator badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-neutral-200/60 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 mb-4 border border-neutral-300/60 dark:border-neutral-700">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Simulated Incident: <span className="font-semibold text-neutral-900 dark:text-neutral-100">INC-8492</span></span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 max-w-4xl mx-auto leading-[1.15]">
            When production breaks, see the story — not the noise.
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Trace connects deploys, alerts, logs, and infrastructure events into one clear incident timeline, so your team can understand what changed and act faster.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
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
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-mono transition-opacity duration-300">
              <span>🎮 Easter Egg Active: All systems nominal (Press sequence again to toggle)</span>
            </div>
          )}
        </section>

        {/* Section 3 & 4: Incident Product Preview with Centerpiece Interactive Timeline */}
        <section id="incident-preview" className="px-4 py-8 sm:px-6">
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
