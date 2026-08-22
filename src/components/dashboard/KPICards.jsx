import { motion } from 'framer-motion';
import { Inbox, CircleDot, Clock, CheckCircle2, Flame } from 'lucide-react';

const cards = [
  { key: 'total',        label: 'Total Tickets', icon: Inbox,        tint: 'var(--primary)' },
  { key: 'open',         label: 'Open',          icon: CircleDot,    tint: 'var(--status-open)' },
  { key: 'inProgress',   label: 'In Progress',   icon: Clock,        tint: 'var(--status-progress)' },
  { key: 'closed',       label: 'Closed',        icon: CheckCircle2, tint: 'var(--status-closed)' },
  { key: 'highPriority', label: 'High Priority', icon: Flame,        tint: 'var(--priority-high)' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

export default function KPICards({ kpis }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {cards.map((c) => (
        <motion.div
          key={c.key}
          variants={item}
          whileHover={{ y: -2 }}
          className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{c.label}</p>
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: `${c.tint}1A`, color: c.tint }}
            >
              <c.icon size={14} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-text-primary">{kpis[c.key]}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
