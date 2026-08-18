"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-[#faf9f5]/85 backdrop-blur-md dark:border-neutral-800 dark:bg-black/85">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand wordmark */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-bold tracking-wider text-neutral-900 dark:text-neutral-50"
          >
            <span className="font-mono text-lg font-black tracking-widest">TRACE</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
              Demo Environment
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <a href="#incident-preview" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Product
            </a>
            <a href="#how-it-works" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              Features
            </a>
          </nav>
        </div>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#incident-preview"
            className="hidden sm:inline-flex items-center justify-center rounded-md bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Explore demo
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800 focus:outline-none"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-[#faf9f5] px-4 pt-2 pb-4 dark:border-neutral-800 dark:bg-black">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#incident-preview"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              Product
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              How it works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#incident-preview"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-neutral-900 py-2 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              Explore demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
