import StatusBadge from '../tickets/StatusBadge';
import PriorityBadge from '../tickets/PriorityBadge';
import CategoryBadge from '../tickets/CategoryBadge';

export default function TicketHeader({ ticket }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <span className="inline-block rounded-md bg-primary-soft px-2 py-1 text-xs font-semibold text-primary">
        {ticket.ticketId}
      </span>
      <h1 className="mt-2 text-xl font-semibold text-text-primary">{ticket.subject}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
        <CategoryBadge category={ticket.category} />
      </div>
    </div>
  );
}
