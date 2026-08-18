export function FooterCTA() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white/50 dark:border-neutral-800 dark:bg-black/50 py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 mb-4">
          <span>Interactive Frontend Demo</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Your next incident already has a story.
        </h2>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Start with the timeline. Find the cause.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#incident-preview"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Explore the demo →
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">TRACE</span>
            <span>·</span>
            <span>Incident observability demo</span>
          </div>
          <div>
            <span>production incident timeline</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
