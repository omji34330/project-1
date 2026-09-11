import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '../../utils/constants';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-night-900/70">
      <nav className="section flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-glow">
            <Leaf size={18} />
          </span>
          <span className="font-display text-lg font-semibold text-night-900 dark:text-white">
            {SITE.name}
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
                    : 'text-night-700/80 hover:text-emerald-700 dark:text-emerald-100/70 dark:hover:text-emerald-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-600/20 text-night-800 dark:border-white/10 dark:text-emerald-100 md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/20 bg-white/80 backdrop-blur-xl dark:border-white/5 dark:bg-night-900/90 md:hidden"
          >
            <div className="section flex flex-col gap-1 py-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
                        : 'text-night-700/80 dark:text-emerald-100/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
