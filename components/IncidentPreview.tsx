"use client";

import { useState } from "react";
import { IncidentData } from "@/data/incident";
import { LatencyChart } from "./LatencyChart";
import { Timeline } from "./Timeline";

interface IncidentPreviewProps {
  incident: IncidentData;
}

export function IncidentPreview({ incident }: IncidentPreviewProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>("evt-2");
  const isInvestigating = incident.status === "Investigating";

  return (
    <section
      id="demo-incident"
      aria-label="Interactive incident timeline preview"
      className="w-full max-w-5xl mx-auto rounded-xl border border-neutral-200/90 bg-white/95 shadow-sm p-3.5 sm:p-6 dark:border-neutral-800 dark:bg-neutral-950/90 transition-all"
    >
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="font-mono text-[11px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/80 transition-all duration-300 shrink-0">
            {incident.id}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">/</span>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {incident.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs">
          <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70">
            Demo Data
          </span>
          <span
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full font-medium border transition-all duration-300 transform hover:scale-105 cursor-default ${
              isInvestigating
                ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 shadow-sm hover:shadow-amber-500/10"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shadow-sm hover:shadow-emerald-500/10"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isInvestigating ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
              }`}
            />
            {incident.status}
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
            {incident.severity}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">{incident.timestamp}</span>
        </div>
      </div>

      {/* Incident metadata banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 my-3 sm:my-4 p-2.5 sm:p-3 rounded-lg bg-neutral-50/80 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 text-[11px] sm:text-xs font-mono">
        <div>
          <span className="text-neutral-500 dark:text-neutral-400">Target Service:</span>{" "}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{incident.service}</span>
        </div>
        <div>
          <span className="text-neutral-500 dark:text-neutral-400">Duration:</span>{" "}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{incident.duration}</span>
        </div>
        <div className="sm:col-span-2 md:col-span-1 md:text-right">
          <span className="text-neutral-500 dark:text-neutral-400">Impact:</span>{" "}
          <span className="text-neutral-800 dark:text-neutral-200">{incident.impact}</span>
        </div>
      </div>

      {/* Latency Visualization synchronized with Selected Timeline Event */}
      <div className="mt-4">
        <LatencyChart
          data={incident.latencyData}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
        />
      </div>

      {/* Unified Timeline Centerpiece */}
      <Timeline
        events={incident.timeline}
        selectedEventId={selectedEventId}
        onSelectEvent={setSelectedEventId}
      />
    </section>
  );
}
