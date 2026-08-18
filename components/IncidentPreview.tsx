"use client";

import { IncidentData } from "@/data/incident";
import { LatencyChart } from "./LatencyChart";
import { Timeline } from "./Timeline";

interface IncidentPreviewProps {
  incident: IncidentData;
}

export function IncidentPreview({ incident }: IncidentPreviewProps) {
  const isInvestigating = incident.status === "Investigating";

  return (
    <section
      id="demo-incident"
      aria-label="Interactive incident timeline preview"
      className="w-full max-w-5xl mx-auto rounded-xl border border-neutral-200/90 bg-white/95 shadow-sm p-4 sm:p-6 dark:border-neutral-800 dark:bg-neutral-950/90"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-neutral-500">{incident.id}</span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {incident.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
            Demo Incident Data
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium border ${
              isInvestigating
                ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isInvestigating ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
              }`}
            />
            {incident.status}
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            {incident.severity}
          </span>
          <span className="text-neutral-600 dark:text-neutral-400">{incident.timestamp}</span>
        </div>
      </div>

      {/* Incident metadata banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-mono">
        <div>
          <span className="text-neutral-600 dark:text-neutral-400">Target Service:</span>{" "}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{incident.service}</span>
        </div>
        <div>
          <span className="text-neutral-600 dark:text-neutral-400">Duration:</span>{" "}
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">{incident.duration}</span>
        </div>
        <div className="sm:text-right">
          <span className="text-neutral-600 dark:text-neutral-400">Impact:</span>{" "}
          <span className="text-neutral-800 dark:text-neutral-200">{incident.impact}</span>
        </div>
      </div>

      {/* Latency Visualization */}
      <div className="mt-4">
        <LatencyChart data={incident.latencyData} />
      </div>

      {/* Unified Timeline Centerpiece */}
      <Timeline events={incident.timeline} />
    </section>
  );
}
