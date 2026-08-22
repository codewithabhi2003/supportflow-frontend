import { Link } from 'react-router-dom';
import StatusBadge from '../tickets/StatusBadge';
import PriorityBadge from '../tickets/PriorityBadge';
import EmptyState from '../common/EmptyState';
import { timeAgo } from '../../utils/formatDate';
import { Inbox } from 'lucide-react';

export default function RecentTickets({ tickets }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">Recent Tickets</h2>
      {tickets.length === 0 ? (
        <EmptyState icon={Inbox} title="No tickets yet" message="New tickets will show up here." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                <th className="py-2">ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Status</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.ticketId} className="border-b border-border last:border-0 hover:bg-hover">
                  <td className="whitespace-nowrap py-2.5">
                    <Link to={`/tickets/${t.ticketId}`} className="text-sm font-medium text-primary hover:underline">
                      {t.ticketId}
                    </Link>
                  </td>
                  <td className="py-2.5 text-sm text-text-primary">{t.customerName}</td>
                  <td className="max-w-[220px] truncate py-2.5 text-sm text-text-secondary">{t.subject}</td>
                  <td className="whitespace-nowrap py-2.5"><StatusBadge status={t.status} /></td>
                  <td className="whitespace-nowrap py-2.5"><PriorityBadge priority={t.priority} /></td>
                  <td className="whitespace-nowrap py-2.5 text-sm text-text-muted">{timeAgo(t.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}