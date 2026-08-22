import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import EmptyState from '../common/EmptyState';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#14B8A6'];

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-text-primary">{name}</p>
      <p className="text-text-secondary">{value} ticket{value === 1 ? '' : 's'}</p>
    </div>
  );
}

export default function CategoryPieChart({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <h2 className="mb-1 text-sm font-semibold text-text-primary">Category Breakdown</h2>
      <p className="mb-4 text-xs text-text-muted">Ticket volume by category</p>

      {!data.length ? (
        <EmptyState icon={PieIcon} title="No tickets yet" message="Category breakdown will appear here." />
      ) : (
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={72}
                paddingAngle={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--bg-card)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
