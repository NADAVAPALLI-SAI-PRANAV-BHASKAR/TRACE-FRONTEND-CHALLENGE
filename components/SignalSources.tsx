export function SignalSources() {
  const sources = [
    {
      name: "GitHub",
      category: "Deployments",
      icon: "📦",
      example: "v2.8.1 release tagged",
      timeOffset: "-4m (14:28)",
      color: "border-blue-500/30 bg-blue-500/5 hover:border-blue-500/60 dark:border-blue-400/25",
      badge: "text-blue-700 bg-blue-100/70 dark:text-blue-300 dark:bg-blue-950/60",
      dot: "bg-blue-500",
    },
    {
      name: "Database",
      category: "Infrastructure",
      icon: "🗄️",
      example: "Pool exhausted (184/200)",
      timeOffset: "-2m (14:31)",
      color: "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60 dark:border-amber-400/25",
      badge: "text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-950/60",
      dot: "bg-amber-500",
    },
    {
      name: "Alerts",
      category: "Monitoring",
      icon: "🔔",
      example: "p95 > 2s threshold",
      timeOffset: "-1m (14:32)",
      color: "border-red-500/30 bg-red-500/5 hover:border-red-500/60 dark:border-red-400/25",
      badge: "text-red-700 bg-red-100/70 dark:text-red-300 dark:bg-red-950/60",
      dot: "bg-red-500",
    },
    {
      name: "Engineer",
      category: "Human Action",
      icon: "👩‍💻",
      example: "Rollback executed",
      timeOffset: "+0m (14:34)",
      color: "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60 dark:border-purple-400/25",
      badge: "text-purple-700 bg-purple-100/70 dark:text-purple-300 dark:bg-purple-950/60",
      dot: "bg-purple-500",
    },
    {
      name: "Health",
      category: "Recovery",
      icon: "✓",
      example: "Baseline latency restored",
      timeOffset: "+2m (14:36)",
      color: "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/60 dark:border-emerald-400/25",
      badge: "text-emerald-700 bg-emerald-100/70 dark:text-emerald-300 dark:bg-emerald-950/60",
      dot: "bg-emerald-500",
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-5xl mx-auto py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 mb-3 sm:mb-4 border border-neutral-200 dark:border-neutral-700">
          <span>Conceptual Integration Topology</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Five dashboards. One incident.
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          Production doesn&apos;t break in one place. Trace connects the signals so you don&apos;t have to.
        </p>
      </div>

      {/* Visual Ingestion Stream */}
      <div className="relative rounded-xl border border-neutral-200/90 bg-white/70 p-4 sm:p-6 dark:border-neutral-800 dark:bg-neutral-950/60 shadow-sm">
        {/* Source cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {sources.map((src, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between p-3.5 rounded-lg border transition-all duration-200 ${src.color}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl">{src.icon}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
                    <span className={`w-1.5 h-1.5 rounded-full ${src.dot}`} />
                    {src.timeOffset}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                    {src.name}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${src.badge}`}>
                    {src.category}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200/60 dark:border-neutral-800/60 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
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
