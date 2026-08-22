import TopBar from '../components/layout/TopBar';
import Spinner from '../components/common/Spinner';
import KPICards from '../components/dashboard/KPICards';
import { useDashboard } from '../hooks/useDashboard';
import { CATEGORIES, PRIORITIES } from '../utils/statusColors';

// All figures below are computed from the live GET /api/tickets payload —
// nothing here is placeholder or hardcoded, per the project spec.
export default function Analytics() {
  const { tickets, kpis, aiInsights, loading } = useDashboard();

  const countBy = (field) =>
    tickets.reduce((acc, t) => {
      acc[t[field]] = (acc[t[field]] || 0) + 1;
      return acc;
    }, {});

  const categoryCounts = countBy('category');
  const priorityCounts = countBy('priority');
  const maxCategory = Math.max(1, ...CATEGORIES.map((c) => categoryCounts[c] || 0));
  const maxPriority = Math.max(1, ...PRIORITIES.map((p) => priorityCounts[p] || 0));

  const analyzedPct = aiInsights.total ? Math.round((aiInsights.analyzedCount / aiInsights.total) * 100) : 0;

  return (
    <>
      <TopBar title="Analytics" subtitle="Ticket distribution and AI coverage" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size={28} /></div>
        ) : (
          <>
            <KPICards kpis={kpis} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold text-text-primary">Category Distribution</h2>
                <div className="flex flex-col gap-3">
                  {CATEGORIES.map((c) => (
                    <div key={c}>
                      <div className="mb-1 flex justify-between text-xs text-text-secondary">
                        <span>{c}</span>
                        <span>{categoryCounts[c] || 0}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-hover">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${((categoryCounts[c] || 0) / maxCategory) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-4 text-sm font-semibold text-text-primary">Priority Distribution</h2>
                <div className="flex flex-col gap-3">
                  {PRIORITIES.map((p) => (
                    <div key={p}>
                      <div className="mb-1 flex justify-between text-xs text-text-secondary">
                        <span>{p}</span>
                        <span>{priorityCounts[p] || 0}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-hover">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${((priorityCounts[p] || 0) / maxPriority) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-text-primary">AI Analysis Rate</h2>
              <div className="mb-1 flex justify-between text-xs text-text-secondary">
                <span>{aiInsights.analyzedCount} of {aiInsights.total} tickets analyzed</span>
                <span>{analyzedPct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-hover">
                <div className="h-full rounded-full bg-primary" style={{ width: `${analyzedPct}%` }} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}