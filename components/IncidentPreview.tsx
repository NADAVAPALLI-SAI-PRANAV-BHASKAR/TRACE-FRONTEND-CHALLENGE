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

  // Dynamically derive the active event status based on which tab/node is selected
  const activeEvent = incident.timeline.find((e) => e.id === selectedEventId) || incident.timeline[0];

  const getEventStatusConfig = (eventId: string, defaultStatus: string) => {
    if (incident.status === "Resolved") {
      return {
        status: "Resolved",
        badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shadow-sm hover:shadow-emerald-500/10",
        dotStyle: "bg-emerald-500",
        pulsing: false,
      };
    }

    switch (eventId) {
      case "evt-1": // Deploy
        return {
          status: "Deployed",
          badgeStyle: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 shadow-sm hover:shadow-blue-500/10",
          dotStyle: "bg-blue-500",
          pulsing: false,
        };
      case "evt-2": // Database
        return {
          status: "Investigating",
          badgeStyle: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 shadow-sm hover:shadow-amber-500/10",
          dotStyle: "bg-amber-500",
          pulsing: true,
        };
      case "evt-3": // Alert
        return {
          status: "Triggered (P1)",
          badgeStyle: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800 shadow-sm hover:shadow-red-500/10",
          dotStyle: "bg-red-500",
          pulsing: true,
        };
      case "evt-4": // Engineer Rollback
        return {
          status: "Mitigating",
          badgeStyle: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 shadow-sm hover:shadow-purple-500/10",
          dotStyle: "bg-purple-500",
          pulsing: true,
        };
      case "evt-5": // Resolved
        return {
          status: "Resolved",
          badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shadow-sm hover:shadow-emerald-500/10",
          dotStyle: "bg-emerald-500",
          pulsing: false,
        };
      default:
        return {
          status: defaultStatus,
          badgeStyle: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 shadow-sm hover:shadow-amber-500/10",
          dotStyle: "bg-amber-500",
          pulsing: true,
        };
    }
  };

  const statusConfig = getEventStatusConfig(selectedEventId, incident.status);

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
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full font-medium border transition-all duration-300 transform hover:scale-105 cursor-default ${statusConfig.badgeStyle}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${statusConfig.dotStyle} ${
                statusConfig.pulsing ? "animate-pulse" : ""
              }`}
            />
            <span>{statusConfig.status}</span>
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
            {incident.severity}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">
            Aug 18 · {activeEvent?.time || "14:32"} UTC
          </span>
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
