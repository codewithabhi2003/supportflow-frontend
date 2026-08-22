import { useEffect, useState } from 'react';
import { ticketService } from '../services/ticketService';

// Dashboard has no dedicated aggregation endpoint, so it derives KPIs,
// recent tickets, and chart data from GET /api/tickets client-side.
//
// If the backend is unreachable (network error) or returns an error, we
// deliberately do NOT surface a scary error banner here — the dashboard
// should always render its normal shell, just with empty/zero data, so a
// backend hiccup never looks broken to the person using it.
export const useDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const res = await ticketService.getAll({ limit: 200, page: 1 });
        if (!cancelled) setTickets(res.data.data);
      } catch (err) {
        if (!cancelled) {
          console.warn('Dashboard: falling back to empty state —', err.message);
          setTickets([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const kpis = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    closed: tickets.filter((t) => t.status === 'Closed').length,
    highPriority: tickets.filter((t) => t.priority === 'High').length,
  };

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const analyzedCount = tickets.filter((t) => t.aiAnalyzed).length;

  const categoryCounts = tickets.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  const highPriorityOpen = tickets.filter(
    (t) => t.priority === 'High' && t.status !== 'Closed'
  ).length;

  // Pie chart data: ticket volume by category
  const categoryBreakdown = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  // Growth chart data: tickets created per day, last 14 days (fills in zero days)
  const growth = (() => {
    const days = 14;
    const buckets = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      buckets[key] = 0;
    }

    tickets.forEach((t) => {
      const key = new Date(t.createdAt).toISOString().slice(0, 10);
      if (key in buckets) buckets[key] += 1;
    });

    return Object.entries(buckets).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count,
    }));
  })();

  return {
    tickets,
    kpis,
    recentTickets,
    aiInsights: { analyzedCount, total: tickets.length, topCategory, highPriorityOpen },
    categoryBreakdown,
    growth,
    loading,
  };
};
