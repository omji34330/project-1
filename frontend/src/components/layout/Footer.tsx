import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-white/60 dark:border-white/5 dark:bg-night-900/60">
      <div className="section grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Leaf size={18} />
            </span>
            <span className="font-display text-lg font-semibold text-night-900 dark:text-white">
              {SITE.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-night-700/70 dark:text-emerald-100/60">
            An AI-driven monitoring and forecasting platform that turns live weather signals into
            actionable solar, wind and battery decisions for a cleaner, more resilient grid.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-night-900 dark:text-white">Navigate</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-night-700/70 transition-colors hover:text-emerald-700 dark:text-emerald-100/60 dark:hover:text-emerald-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-night-900 dark:text-white">
            Smart India Hackathon 2026
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-night-700/70 dark:text-emerald-100/60">
            <li>Problem Statement: {SITE.problemStatementId}</li>
            <li>Theme: {SITE.theme}</li>
            <li>Category: {SITE.category}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 py-6 dark:border-white/5">
        <p className="section text-center text-xs text-night-700/60 dark:text-emerald-100/40">
          © {new Date().getFullYear()} {SITE.name} · Built for {SITE.event}
        </p>
      </div>
    </footer>
  );
}
