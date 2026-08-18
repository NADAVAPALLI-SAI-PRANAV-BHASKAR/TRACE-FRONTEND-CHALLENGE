"use client";

import { LatencyDataPoint } from "@/data/incident";

interface LatencyChartProps {
  data: LatencyDataPoint[];
  selectedEventId?: string;
  onSelectEvent?: (eventId: string) => void;
}

// Color palette mapping to perfectly synchronize with Timeline and Signal Boxes
const EVENT_COLORS: Record<string, { fill: string; stroke: string; glow: string; label: string; textClass: string; badgeClass: string }> = {
  "evt-1": {
    fill: "rgb(59, 130, 246)", // Blue (Deploy)
    stroke: "#ffffff",
    glow: "rgba(59, 130, 246, 0.4)",
    label: "Deploy",
    textClass: "text-blue-600 dark:text-blue-400",
    badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
  },
  "evt-2": {
    fill: "rgb(245, 158, 11)", // Amber (Database)
    stroke: "#ffffff",
    glow: "rgba(245, 158, 11, 0.4)",
    label: "Database",
    textClass: "text-amber-600 dark:text-amber-400",
    badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  },
  "evt-3": {
    fill: "rgb(239, 68, 68)", // Red (Alert / Peak)
    stroke: "#ffffff",
    glow: "rgba(239, 68, 68, 0.4)",
    label: "Alert",
    textClass: "text-red-600 dark:text-red-400",
    badgeClass: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30",
  },
  "evt-4": {
    fill: "rgb(168, 85, 247)", // Purple (Engineer Rollback)
    stroke: "#ffffff",
    glow: "rgba(168, 85, 247, 0.4)",
    label: "Rollback",
    textClass: "text-purple-600 dark:text-purple-400",
    badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
  },
  "evt-5": {
    fill: "rgb(16, 185, 129)", // Emerald (Recovery)
    stroke: "#ffffff",
    glow: "rgba(16, 185, 129, 0.4)",
    label: "Resolved",
    textClass: "text-emerald-600 dark:text-emerald-400",
    badgeClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  },
};

export function LatencyChart({ data, selectedEventId, onSelectEvent }: LatencyChartProps) {
  const maxLatency = Math.max(...data.map((d) => d.latencyMs));
  const minLatency = Math.min(...data.map((d) => d.latencyMs));
  const graphAreaHeight = 78;
  const totalSvgHeight = 112;
  const chartWidth = 500;
  const paddingX = 24;
  const paddingY = 12;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (chartWidth - paddingX * 2);
    // Invert y: high latency is near the top
    const normalizedY = (d.latencyMs - minLatency) / (maxLatency - minLatency || 1);
    const y = graphAreaHeight - paddingY - normalizedY * (graphAreaHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[idx - 1];
    const cpx1 = prev.x + (pt.x - prev.x) / 2;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (pt.x - prev.x) / 2;
    const cpy2 = pt.y;
    return `${acc} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area under the curve
  const areaD = `${pathD} L ${points[points.length - 1].x} ${graphAreaHeight} L ${points[0].x} ${graphAreaHeight} Z`;

  const activePoint = points.find((pt) => pt.eventId && pt.eventId === selectedEventId);

  return (
    <div className="w-full rounded-xl border border-neutral-200/90 bg-neutral-900/[0.02] p-3.5 dark:border-neutral-800 dark:bg-neutral-900/40 transition-all duration-200">
      {/* Header telemetry and sync pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-2.5">
        <div className="flex items-center gap-2 font-mono flex-wrap">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">HTTP p95 Latency</span>
          <span className="text-neutral-400 dark:text-neutral-600 hidden xs:inline">|</span>
          <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[10px] sm:text-[11px]">
            Peak: <strong className="text-red-600 dark:text-red-400 font-bold">2,340ms</strong> · Baseline: 140ms
          </span>
        </div>

        {/* Dynamic active event synchronization pill */}
        {activePoint?.eventId && EVENT_COLORS[activePoint.eventId] && (
          <div
            className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium border transition-all duration-300 self-start sm:self-auto max-w-full truncate ${
              EVENT_COLORS[activePoint.eventId].badgeClass
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ backgroundColor: EVENT_COLORS[activePoint.eventId].fill }}
            />
            <span className="truncate">
              Active: <strong className="font-bold">{activePoint.label || EVENT_COLORS[activePoint.eventId].label}</strong> ({activePoint.time} · {activePoint.latencyMs}ms)
            </span>
          </div>
        )}
      </div>

      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${chartWidth} ${totalSvgHeight}`}
          className="w-full h-auto overflow-visible select-none"
          aria-label="API Latency trend chart with exact-aligned timestamp nodes"
          role="img"
        >
          <defs>
            {/* Rich gradient coordinated with severity levels */}
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.28" />
              <stop offset="45%" stopColor="rgb(245, 158, 11)" stopOpacity="0.18" />
              <stop offset="85%" stopColor="rgb(59, 130, 246)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing filter for highlighted/selected nodes */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* SLA Threshold Reference Line (2000ms) */}
          <line
            x1={paddingX}
            y1={graphAreaHeight - paddingY - ((2000 - minLatency) / (maxLatency - minLatency)) * (graphAreaHeight - paddingY * 2)}
            x2={chartWidth - paddingX}
            y2={graphAreaHeight - paddingY - ((2000 - minLatency) / (maxLatency - minLatency)) * (graphAreaHeight - paddingY * 2)}
            stroke="currentColor"
            strokeDasharray="4 3"
            className="text-red-400/50 dark:text-red-500/50"
            strokeWidth="1"
          />
          <text
            x={chartWidth - paddingX - 4}
            y={graphAreaHeight - paddingY - ((2000 - minLatency) / (maxLatency - minLatency)) * (graphAreaHeight - paddingY * 2) - 4}
            textAnchor="end"
            className="fill-red-500 dark:fill-red-400 text-[8px] font-mono opacity-80"
          >
            SLA Breach (&gt;2,000ms)
          </text>

          {/* Fill under trend */}
          <path d={areaD} fill="url(#latencyGradient)" />

          {/* Active selection vertical cursor beacon */}
          {activePoint && (
            <g className="transition-all duration-300">
              <line
                x1={activePoint.x}
                y1={paddingY - 4}
                x2={activePoint.x}
                y2={graphAreaHeight + 8}
                stroke={activePoint.eventId && EVENT_COLORS[activePoint.eventId] ? EVENT_COLORS[activePoint.eventId].fill : "rgba(245, 158, 11, 0.6)"}
                strokeWidth="1.5"
                strokeDasharray="2 2"
                opacity="0.75"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="10"
                fill={activePoint.eventId && EVENT_COLORS[activePoint.eventId] ? EVENT_COLORS[activePoint.eventId].glow : "rgba(245, 158, 11, 0.3)"}
                className="animate-pulse"
              />
            </g>
          )}

          {/* Trend Line with gradient color feeling */}
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-amber-500 dark:text-amber-400"
          />

          {/* Synchronized Event Nodes */}
          {points.map((pt, i) => {
            const hasEvent = Boolean(pt.eventId);
            const isSelected = pt.eventId && pt.eventId === selectedEventId;
            const config = pt.eventId ? EVENT_COLORS[pt.eventId] : null;

            if (pt.highlight || hasEvent) {
              const nodeColor = config?.fill || (pt.highlight ? "rgb(239, 68, 68)" : "rgb(245, 158, 11)");

              return (
                <g
                  key={i}
                  className="cursor-pointer group"
                  onClick={() => pt.eventId && onSelectEvent?.(pt.eventId)}
                >
                  {/* Invisible generous hit target to prevent mouse jitter/vibration */}
                  <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                  {/* Ping animation on peak or selected - pointer-events-none to prevent mouse flickering */}
                  {(pt.highlight || isSelected) && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? "9" : "7"}
                      fill={nodeColor}
                      opacity="0.35"
                      className="animate-ping pointer-events-none"
                    />
                  )}

                  {/* Node Body with smooth radius transition without SVG origin distortion */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? "6" : hasEvent ? "4.5" : "3.5"}
                    fill={nodeColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "2" : "1.5"}
                    className="dark:stroke-neutral-900 shadow-sm transition-all duration-150 group-hover:stroke-width-[2.5px] group-hover:brightness-110 pointer-events-none"
                  />
                </g>
              );
            }

            return null;
          })}
          {/* Exact-aligned Axis Timestamps and Node Labels inside SVG */}
          {points.map((pt, i) => {
            const hasEvent = Boolean(pt.eventId);
            const isSelected = pt.eventId && pt.eventId === selectedEventId;
            const config = pt.eventId ? EVENT_COLORS[pt.eventId] : null;

            // Only render timestamp labels for start, end, and incident events
            if (i === 0 || i === points.length - 1 || hasEvent) {
              const labelColor = isSelected
                ? config?.fill || "#ffffff"
                : config
                ? config.fill
                : "currentColor";

              return (
                <g
                  key={`label-${i}`}
                  className={hasEvent ? "cursor-pointer" : "pointer-events-none"}
                  onClick={() => pt.eventId && onSelectEvent?.(pt.eventId)}
                >
                  {/* Subtle connecting tick mark directly below dot */}
                  {hasEvent && (
                    <line
                      x1={pt.x}
                      y1={graphAreaHeight - paddingY + 4}
                      x2={pt.x}
                      y2={graphAreaHeight + 4}
                      stroke={isSelected ? config?.fill || "currentColor" : "currentColor"}
                      strokeWidth={isSelected ? 1.5 : 1}
                      strokeDasharray={isSelected ? undefined : "2 2"}
                      opacity={isSelected ? 0.8 : 0.25}
                      className={isSelected ? "" : "text-neutral-400 dark:text-neutral-600"}
                    />
                  )}

                  {/* Primary Timestamp directly under dot X */}
                  <text
                    x={pt.x}
                    y={graphAreaHeight + 17}
                    textAnchor="middle"
                    className={`font-mono transition-all duration-150 select-none ${
                      isSelected
                        ? "font-bold text-[10.5px]"
                        : hasEvent
                        ? "font-semibold text-[9.5px] hover:opacity-100"
                        : "text-[8.5px] fill-neutral-400 dark:fill-neutral-600"
                    }`}
                    fill={hasEvent ? labelColor : undefined}
                    opacity={isSelected ? 1 : hasEvent ? 0.9 : 0.5}
                  >
                    {pt.time}
                  </text>

                  {/* Secondary Label (Deploy, DB, Alert, etc.) */}
                  {hasEvent && config && (
                    <text
                      x={pt.x}
                      y={graphAreaHeight + 28}
                      textAnchor="middle"
                      className={`font-mono text-[8.5px] transition-all duration-150 select-none ${
                        isSelected ? "font-bold" : "font-medium"
                      }`}
                      fill={labelColor}
                      opacity={isSelected ? 1 : 0.8}
                    >
                      {config.label}
                    </text>
                  )}
                </g>
              );
            }

            return null;
          })}
        </svg>
      </div>
    </div>
  );
}
