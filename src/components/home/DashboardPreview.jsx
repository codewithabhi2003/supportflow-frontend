import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Inbox, CircleDot, Flame } from 'lucide-react';

// Static mock data purely for the marketing hero — not fetched from
// anywhere. Colors are var(--...) references, so this automatically
// matches whatever theme (light/dark) is currently active, same as the
// real dashboard's charts.
const growthMock = [
  { v: 1 }, { v: 1 }, { v: 1 }, { v: 2 }, { v: 2 }, { v: 3 },
  { v: 3 }, { v: 5 }, { v: 8 }, { v: 10 }, { v: 12 }, { v: 13 },
];

const categoryMock = [
  { name: 'Payment', value: 1 },
  { name: 'Delivery', value: 2 },
  { name: 'Other', value: 2 },
];

const CATEGORY_COLORS = ['#6366F1', '#EC4899', '#10B981'];

const kpis = [
  { label: 'Total', value: 5, icon: Inbox, tint: 'var(--primary)' },
  { label: 'Open', value: 2, icon: CircleDot, tint: 'var(--status-open)' },
  { label: 'High', value: 2, icon: Flame, tint: 'var(--priority-high)' },
];

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-md rounded-2xl border border-border bg-card p-4 shadow-md sm:p-5"
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-priority-high" />
        <span className="h-2.5 w-2.5 rounded-full bg-priority-med" />
        <span className="h-2.5 w-2.5 rounded-full bg-status-closed" />
      </div>

      {/* Mini KPI row */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-border bg-input p-2.5 text-left">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-wide text-text-muted">{k.label}</p>
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full"
                style={{ backgroundColor: `${k.tint}1A`, color: k.tint }}
              >
                <k.icon size={9} />
              </span>
            </div>
            <p className="mt-1 text-base font-semibold text-text-primary">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Mini growth chart + category donut, mirroring the real dashboard layout */}
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3 rounded-lg border border-border bg-input p-2.5">
          <p className="mb-1 text-[10px] font-medium text-text-muted">Ticket Growth</p>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthMock} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="heroGrowthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--primary)"
                  strokeWidth={1.5}
                  fill="url(#heroGrowthFill)"
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-2 rounded-lg border border-border bg-input p-2.5">
          <p className="mb-1 text-[10px] font-medium text-text-muted">Categories</p>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryMock} dataKey="value" innerRadius={16} outerRadius={28} paddingAngle={3}>
                  {categoryMock.map((_, i) => (
                    <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} stroke="var(--bg-input)" strokeWidth={1.5} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mini recent-tickets rows */}
      <div className="mt-2 rounded-lg border border-border bg-input p-2.5">
        <p className="mb-1.5 text-[10px] font-medium text-text-muted">Recent Tickets</p>
        <div className="flex flex-col gap-1.5">
          {[
            { id: 'TKT-005', status: 'Closed', color: 'var(--status-closed)' },
            { id: 'TKT-004', status: 'Open', color: 'var(--status-open)' },
            { id: 'TKT-003', status: 'Open', color: 'var(--status-open)' },
          ].map((t) => (
            <div key={t.id} className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-primary">{t.id}</span>
              <span
                className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase"
                style={{ color: t.color, backgroundColor: `${t.color}1A` }}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}