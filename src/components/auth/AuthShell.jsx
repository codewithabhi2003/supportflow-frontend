import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

// Shared split-screen shell for Login/Register — a branded gradient panel
// on the left, the form on the right. Keeps both auth pages visually
// consistent without duplicating the layout markup.
export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-base">
      <div
        className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 text-white lg:flex"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex w-fit items-center gap-2 text-lg font-bold hover:opacity-90">
            <Sparkles size={22} /> SupportFlow
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2 className="text-3xl font-semibold leading-tight">
            AI-powered customer support, simplified.
          </h2>
          <p className="mt-3 max-w-sm text-white/80">
            Summaries, categorization, and suggested replies — generated automatically
            for every ticket that comes in.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs text-white/60"
        >
          SupportFlow v1.0
        </motion.p>

        {/* Decorative soft blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <Link
            to="/"
            className="mb-6 flex w-fit items-center gap-1.5 text-sm font-bold text-text-primary lg:hidden"
          >
            <Sparkles size={16} className="text-primary" /> SupportFlow
          </Link>

          <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}