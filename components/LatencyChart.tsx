"use client";

import { LatencyDataPoint } from "@/data/incident";

interface LatencyChartProps {
  data: LatencyDataPoint[];
}

export function LatencyChart({ data }: LatencyChartProps) {
  const maxLatency = Math.max(...data.map((d) => d.latencyMs));
  const minLatency = Math.min(...data.map((d) => d.latencyMs));
  const chartHeight = 80;
  const chartWidth = 500;
  const paddingX = 24;
  const paddingY = 12;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (chartWidth - paddingX * 2);
    // Invert y: high latency is near the top
    const normalizedY = (d.latencyMs - minLatency) / (maxLatency - minLatency || 1);
    const y = chartHeight - paddingY - normalizedY * (chartHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    // Simple smooth curve control point
    const prev = points[idx - 1];
    const cpx1 = prev.x + (pt.x - prev.x) / 2;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (pt.x - prev.x) / 2;
    const cpy2 = pt.y;
    return `${acc} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${pt.x} ${pt.y}`;
  }, "");

  // Area under the curve
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - 4} L ${points[0].x} ${chartHeight - 4} Z`;

  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-neutral-900/[0.02] p-3 dark:border-neutral-800 dark:bg-neutral-900/40">
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
        <div className="flex items-center gap-2 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>HTTP p95 Latency</span>
        </div>
        <div className="font-mono text-neutral-600 dark:text-neutral-400">
          Peak: <span className="font-semibold text-neutral-900 dark:text-neutral-100">2,340ms</span> · Baseline: 140ms
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-20 overflow-visible"
          preserveAspectRatio="none"
          aria-label="API Latency trend chart showing spike to 2340 milliseconds at 14:32 UTC followed by recovery"
          role="img"
        >
          <defs>
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.25" />
              <stop offset="40%" stopColor="rgb(245, 158, 11)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Threshold reference line at 2000ms */}
          <line
            x1={paddingX}
            y1={chartHeight - paddingY - ((2000 - minLatency) / (maxLatency - minLatency)) * (chartHeight - paddingY * 2)}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY - ((2000 - minLatency) / (maxLatency - minLatency)) * (chartHeight - paddingY * 2)}
            stroke="currentColor"
            strokeDasharray="3 3"
            className="text-red-400/40 dark:text-red-500/40"
            strokeWidth="1"
          />

          {/* Fill */}
          <path d={areaD} fill="url(#latencyGradient)" />

          {/* Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-amber-500 dark:text-amber-400"
          />

          {/* Event Dots */}
          {points.map((pt, i) => {
            if (pt.highlight) {
              return (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="6" className="fill-red-500/30 animate-ping" />
                  <circle cx={pt.x} cy={pt.y} r="4" className="fill-red-500 stroke-white dark:stroke-neutral-900 stroke-2" />
                </g>
              );
            }
            if (pt.label) {
              return (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="3"
                  className="fill-neutral-700 dark:fill-neutral-300 stroke-white dark:stroke-neutral-900 stroke-1"
                />
              );
            }
            return null;
          })}
        </svg>
      </div>

      {/* Axis timestamps */}
      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-1 px-1">
        <span>14:20</span>
        <span className="text-amber-600 dark:text-amber-400 font-medium">14:28 (Deploy)</span>
        <span className="text-red-600 dark:text-red-400 font-semibold">14:32 (Alert)</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">14:36 (Restored)</span>
        <span>14:38</span>
      </div>
    </div>
  );
}
