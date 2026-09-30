"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationLinks } from "./navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: (typeof navigationLinks)[number]["href"]) =>
    href === "/"
      ? pathname === "/"
      : href === "/exams"
        ? pathname === "/exams" || pathname.startsWith("/exam/")
        : false;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 shadow-sm backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md text-lg font-bold tracking-tight text-navy transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          onClick={() => setMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white shadow-sm"
          >
            E
          </span>
          Examify
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigationLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? "bg-blue-50 text-primary"
                    : "text-muted hover:bg-slate-50 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-navy transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-xl leading-none">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </nav>

      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="border-t border-border bg-surface px-4 py-3 md:hidden"
      >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
            {navigationLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    active
                      ? "bg-blue-50 text-primary"
                      : "text-muted hover:bg-slate-50 hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
      </div>
    </header>
  );
}
