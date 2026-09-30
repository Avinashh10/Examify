import Link from "next/link";
import { navigationLinks } from "./navigation";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-md text-lg font-bold tracking-tight text-navy transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white"
            >
              E
            </span>
            Examify
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            A focused online examination platform for practice, assessment, and
            learning at your own pace.
          </p>
        </div>

        <div className="md:justify-self-end">
          <h2 className="text-sm font-semibold text-navy">Quick Links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="rounded-sm text-sm text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Examify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
