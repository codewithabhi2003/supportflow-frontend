import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import { Users } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';

// Aggregates unique customers from the ticket list client-side, per the
// "bonus" spec — no dedicated /api/customers endpoint exists yet.
export default function Customers() {
  const { tickets, loading } = useDashboard();
  const navigate = useNavigate();

  const customers = useMemo(() => {
    const map = new Map();
    for (const t of tickets) {
      const key = t.customerEmail;
      if (!map.has(key)) {
        map.set(key, { email: key, name: t.customerName, total: 0, Open: 0, 'In Progress': 0, Closed: 0 });
      }
      const c = map.get(key);
      c.total += 1;
      c[t.status] = (c[t.status] || 0) + 1;
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [tickets]);

  return (
    <>
      <TopBar title="Customers" subtitle="Unique customers derived from tickets" />
      <div className="p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size={28} /></div>
        ) : customers.length === 0 ? (
          <EmptyState icon={Users} title="No customers yet" message="Customers appear here once tickets are created." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Open</th>
                  <th className="px-4 py-3">In Progress</th>
                  <th className="px-4 py-3">Closed</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c.email}
                    onClick={() => navigate(`/tickets?search=${encodeURIComponent(c.email)}`)}
                    className="cursor-pointer border-b border-border last:border-0 hover:bg-hover"
                  >
                    <td className="px-4 py-3 text-sm text-text-primary">{c.email}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-text-primary">{c.total}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{c.Open || 0}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{c['In Progress'] || 0}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{c.Closed || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}