import { formatDate } from '../../utils/formatDate';

// Derived timeline — no separate activity collection. See DB design notes:
// createdAt, aiAnalyzedAt, note.createdAt(s), and updatedAt are enough.
export default function ActivityTimeline({ ticket }) {
  const events = [
    { label: 'Ticket created', date: ticket.createdAt },
    ...(ticket.aiAnalyzed
      ? [{ label: 'AI analysis completed', date: ticket.aiAnalyzedAt }]
      : []),
    ...(ticket.notes || []).map((n) => ({ label: 'Note added', date: n.createdAt })),
    { label: 'Last updated', date: ticket.updatedAt },
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">Activity</h2>
      <ul className="flex flex-col gap-3">
        {events.map((e, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <div>
              <p className="text-text-primary">{e.label}</p>
              <p className="text-xs text-text-muted">{formatDate(e.date)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
