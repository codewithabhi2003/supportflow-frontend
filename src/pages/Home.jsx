import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Zap,
  BarChart3,
  Search,
  MessageSquareText,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardPreview from '../components/home/DashboardPreview';

const features = [
  {
    icon: Zap,
    title: 'AI Ticket Intelligence',
    description:
      'Every ticket is automatically summarized, categorized, and prioritized — with a suggested reply ready to send.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description:
      'Track ticket growth, category breakdowns, and team performance from a dashboard that updates as tickets come in.',
  },
  {
    icon: Search,
    title: 'Instant Search & Filters',
    description:
      'Find any ticket in seconds by customer, status, priority, or category — no more digging through inboxes.',
  },
  {
    icon: MessageSquareText,
    title: 'Built for Teams',
    description:
      'Internal notes, status tracking, and a full activity timeline keep your whole team aligned on every ticket.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-base">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-base font-bold text-text-primary">
          <Sparkles size={20} className="text-primary" />
          SupportFlow
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
                Go to Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary">
                Sign in
              </Link>
              <Link to="/register">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-primary-soft blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
            {/* Text content — first in the DOM (reads naturally on mobile,
                good for accessibility), visually moved to the right on
                desktop via lg:order-2. */}
            <div className="flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-text-secondary shadow-sm"
              >
                <Sparkles size={13} className="text-primary" />
                Powered by Groq AI &amp; n8n automation
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="show"
                custom={1}
                variants={fadeUp}
                className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl"
              >
                Customer support,
                <br />
                <span className="text-primary">supercharged by AI.</span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="show"
                custom={2}
                variants={fadeUp}
                className="mt-6 max-w-xl text-base text-text-secondary sm:text-lg"
              >
                SupportFlow triages every ticket the moment it arrives — summarizing,
                categorizing, and drafting a reply automatically, so your team spends
                time solving problems instead of reading through them.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                custom={3}
                variants={fadeUp}
                className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
              >
                <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                  <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-dark">
                    {isAuthenticated ? `Continue as ${user?.name?.split(' ')[0] || 'you'}` : 'Get Started Free'}
                    <ArrowRight size={16} />
                  </button>
                </Link>
                {!isAuthenticated && (
                  <Link to="/login">
                    <button className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-hover">
                      Sign in
                    </button>
                  </Link>
                )}
              </motion.div>

              <motion.p
                initial="hidden"
                animate="show"
                custom={4}
                variants={fadeUp}
                className="mt-4 text-xs text-text-muted"
              >
                No credit card required · Set up in minutes
              </motion.p>
            </div>

            {/* Real mini-dashboard preview — order-1 on desktop (left side).
                Uses actual Recharts components wired to the same CSS
                variables as the real dashboard, so it follows light/dark
                mode automatically instead of being a static mockup. */}
            <div className="flex justify-center lg:order-1 lg:justify-start">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-xl text-center"
        >
          <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Everything your support team needs
          </h2>
          <p className="mt-2 text-sm text-text-secondary sm:text-base">
            From first response to resolution, SupportFlow keeps every ticket moving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <f.icon size={18} />
              </span>
              <h3 className="text-sm font-semibold text-text-primary">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-secondary"
        >
          {['No credit card required', 'Set up in minutes', 'Built on MERN + n8n'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-status-closed" /> {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-text-muted sm:flex-row">
          <span className="flex items-center gap-1.5 font-medium text-text-secondary">
            <Sparkles size={14} className="text-primary" /> SupportFlow
          </span>
          <span>© {new Date().getFullYear()} SupportFlow. AI-powered customer support CRM.</span>
        </div>
      </footer>
    </div>
  );
}