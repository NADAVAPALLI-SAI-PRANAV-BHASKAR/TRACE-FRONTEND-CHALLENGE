export function FeatureGrid() {
  const features = [
    {
      title: "Understand what changed",
      description:
        "Connect deployments and infrastructure events to the moment an incident begins.",
      tag: "Root Cause Correlation",
      icon: "🔍",
      metricSnippet: "Deploy @ 14:28 ➔ Pool Exhaustion @ 14:31",
    },
    {
      title: "Follow the timeline",
      description:
        "See the sequence of events instead of jumping between unrelated dashboards.",
      tag: "Chronological Feed",
      icon: "⏱️",
      metricSnippet: "Alerts, logs & actions in 1 synchronized stream",
    },
    {
      title: "Share the context",
      description:
        "Give everyone the same incident story when it's time to investigate.",
      tag: "Shared War Room Truth",
      icon: "🤝",
      metricSnippet: "Auto-generated post-incident timeline report",
    },
  ];

  return (
    <section id="features" className="w-full max-w-5xl mx-auto py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          From scattered signals to one clear timeline.
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Eliminate manual correlation across disjointed dashboards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950/70 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xl">{feat.icon}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                  {feat.tag}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {feat.title}
              </h3>
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feat.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
              <div className="font-mono text-[11px] text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/60 p-2 rounded border border-neutral-200/60 dark:border-neutral-800/60 truncate">
                {feat.metricSnippet}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
