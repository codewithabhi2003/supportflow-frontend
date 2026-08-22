import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Ticket, Users, BarChart2, Settings, LogOut, X } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tickets', label: 'Tickets', icon: Ticket },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

// `open`/`onClose` only matter below the lg breakpoint — on lg+ the sidebar
// is always visible and these props are effectively ignored (see the
// lg:translate-x-0 / lg:static overrides below).
export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop — click to close. Never rendered on lg+. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col
          border-r border-border bg-sidebar transition-transform duration-200 ease-out
          lg:static lg:z-auto lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div>
            <p className="text-base font-bold text-text-primary">SupportFlow</p>
            <p className="text-xs text-text-muted">AI-powered support</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1 text-text-muted hover:bg-hover hover:text-text-primary lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
            return (
              <NavLink key={to} to={to} className="relative" onClick={onClose}>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-lg bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-text-secondary hover:bg-hover'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border px-3 py-4">
          <ThemeToggle />

          <Link
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-hover"
          >
            <Avatar name={user?.name} size={32} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="truncate text-xs text-text-muted">{user?.email}</p>
            </div>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-text-muted hover:bg-hover hover:text-priority-high"
          >
            <LogOut size={13} /> Log out
          </button>

          <p className="px-2 text-xs text-text-muted">SupportFlow v1.0</p>
        </div>
      </aside>
    </>
  );
}