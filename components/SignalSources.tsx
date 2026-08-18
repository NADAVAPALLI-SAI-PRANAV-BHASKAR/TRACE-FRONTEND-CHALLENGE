export function SignalSources() {
  const sources = [
    {
      name: "GitHub",
      category: "Deployments",
      icon: "📦",
      example: "v2.8.1 release tagged",
      timeOffset: "-4m",
    },
    {
      name: "Logs",
      category: "Telemetry",
      icon: "📜",
      example: "504 Gateway Timeouts",
      timeOffset: "-2m",
    },
    {
      name: "Alerts",
      category: "Monitoring",
      icon: "🔔",
      example: "p95 > 2s threshold",
      timeOffset: "-1m",
    },
    {
      name: "Database",
      category: "Infrastructure",
      icon: "🗄️",
      example: "Pool exhausted (184/200)",
      timeOffset: "-2m",
    },
    {
      name: "Engineer",
      category: "Human Action",
      icon: "👩‍💻",
      example: "Rollback executed",
      timeOffset: "+0m",
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-5xl mx-auto py-16 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 mb-4">
          <span>Conceptual Integration Topology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Five dashboards. One incident.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          Production doesn&apos;t break in one place. Trace connects the signals so you don&apos;t have to.
        </p>
      </div>

      {/* Visual Ingestion Stream */}
      <div className="relative rounded-xl border border-neutral-200 bg-white/70 p-6 dark:border-neutral-800 dark:bg-neutral-950/60 shadow-sm">
        {/* Source cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {sources.map((src, i) => (
            <div
              key={i}
              className="flex flex-col justify-between p-3 rounded-lg border border-neutral-200/80 bg-neutral-50/70 dark:border-neutral-800 dark:bg-neutral-900/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{src.icon}</span>
                  <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400">{src.timeOffset}</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                  {src.name}
                </div>
                <div className="text-[11px] text-neutral-500 font-mono">{src.category}</div>
              </div>
              <div className="mt-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 truncate">
                {src.example}
              </div>
            </div>
          ))}
        </div>

        {/* Convergence flow connector */}
        <div className="my-5 flex flex-col items-center justify-center">
          <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-[11px] font-mono text-neutral-500 my-1">
            <span>Correlated via temporal anchors & service topology</span>
          </div>
          <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />
        </div>

        {/* Unified result timeline banner */}
        <div className="rounded-lg border border-emerald-300/80 bg-emerald-50/40 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-sm font-mono">
              TR
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                Unified Trace Chronological Story
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                Correlated root cause pinpointed: <code className="font-mono text-neutral-800 dark:text-neutral-200 bg-neutral-200/60 dark:bg-neutral-800 px-1 py-0.5 rounded">v2.8.1 pool exhaustion</code>
              </div>
            </div>
          </div>
          <div className="font-mono text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            One correlated incident timeline
          </div>
        </div>
      </div>
    </section>
  );
}
