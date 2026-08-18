"use client";

import { useState } from "react";
import { TimelineEvent } from "@/data/incident";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>("evt-2"); // default inspection on database event

  const getBadgeStyles = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "deploy":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
          indicator: "bg-blue-500",
          icon: "🚀",
        };
      case "database":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
          indicator: "bg-amber-500",
          icon: "🗄️",
        };
      case "alert":
        return {
          bg: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
          indicator: "bg-red-500",
          icon: "⚠️",
        };
      case "engineer":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
          indicator: "bg-purple-500",
          icon: "🛠️",
        };
      case "resolved":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
          indicator: "bg-emerald-500",
          icon: "✓",
        };
      default:
        return {
          bg: "bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700",
          indicator: "bg-neutral-500",
          icon: "•",
        };
    }
  };

  const activeEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 w-full mt-4">
      {/* Timeline Stream (Left on Desktop, Top on Mobile) */}
      <div className="lg:col-span-7 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
            Chronological Sequence ({events.length} events)
          </div>
          <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono">
            Click an event to inspect context
          </div>
        </div>

        <div className="relative pl-6 pt-4 space-y-4 before:absolute before:left-2.5 before:top-6 before:bottom-6 before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
          {events.map((event) => {
            const isSelected = event.id === selectedEventId;
            const style = getBadgeStyles(event.type);

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEventId(event.id)}
                aria-pressed={isSelected}
                aria-label={`Inspect event at ${event.time}: ${event.title} - ${event.summary}`}
                className={`w-full text-left group relative rounded-lg border transition-all duration-150 p-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 ${
                  isSelected
                    ? "bg-white dark:bg-neutral-900 border-neutral-900/40 dark:border-neutral-100/40 shadow-sm ring-1 ring-neutral-900/10 dark:ring-neutral-100/10"
                    : "bg-neutral-50/50 hover:bg-white dark:bg-neutral-900/30 dark:hover:bg-neutral-900/80 border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {/* Connecting Node on vertical line */}
                <div
                  className={`absolute -left-[27px] top-4.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-neutral-950 transition-colors ${
                    isSelected ? style.indicator : "bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400"
                  }`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      {event.time}
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wide border ${style.bg}`}
                    >
                      {event.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                    {event.sourceBadge}
                  </span>
                </div>

                <div className="mt-1.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 font-mono truncate">
                  {event.summary}
                </div>

                {/* Mobile contextual preview drawer */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400 lg:hidden">
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2 font-mono text-[11px] uppercase tracking-wider">
                      Event Context:
                    </div>
                    <div className="space-y-2">
                      {event.details.map((d, i) => (
                        <div key={i} className="p-2 rounded bg-neutral-100/60 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 font-mono text-[11px]">
                          <div className="text-neutral-500 font-medium">{d.label}</div>
                          <div className="text-neutral-900 dark:text-neutral-100 font-semibold break-all mt-0.5">{d.value}</div>
                          {d.subtext && (
                            <div className="text-amber-700 dark:text-amber-400 text-[10px] mt-1">{d.subtext}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Context Inspector Panel (Desktop sticky right side) */}
      <div className="hidden lg:flex lg:col-span-5 flex-col">
        <div className="sticky top-20 rounded-lg border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/30">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Context Inspector
            </div>
            <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              {activeEvent.time} UTC
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono uppercase tracking-wide border ${
                  getBadgeStyles(activeEvent.type).bg
                }`}
              >
                {activeEvent.title}
              </span>
              <span className="text-xs font-mono text-neutral-500">via {activeEvent.sourceBadge}</span>
            </div>

            <h4 className="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
              {activeEvent.summary}
            </h4>

            <div className="mt-4 space-y-3">
              {activeEvent.details.map((item, idx) => (
                <div key={idx} className="rounded-md border border-neutral-200/80 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-900/90">
                  <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
                    {item.label}
                  </div>
                  <div className="mt-0.5 text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 break-all">
                    {item.value}
                  </div>
                  {item.subtext && (
                    <div className="mt-1 text-[11px] font-mono text-amber-700 dark:text-amber-300">
                      {item.subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
              <span>Timeline Correlation</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">Automatic link established</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
