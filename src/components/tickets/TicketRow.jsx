import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';
import { timeAgo } from '../../utils/formatDate';

// Renders only <td> cells — the parent <tr> (with its hover/border styling
// and entrance animation) is owned by TicketTable so we don't nest <tr>s.
export default function TicketRow({ ticket }) {
  return (
    <>
      <td className="px-4 py-3">
        <Link to={`/tickets/${ticket.ticketId}`} className="text-sm font-medium text-primary hover:underline">
          {ticket.ticketId}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm text-text-primary">{ticket.customerName}</td>
      <td className="max-w-xs truncate px-4 py-3 text-sm text-text-secondary">{ticket.subject}</td>
      <td className="px-4 py-3"><CategoryBadge category={ticket.category} /></td>
      <td className="px-4 py-3"><PriorityBadge priority={ticket.priority} /></td>
      <td className="px-4 py-3"><StatusBadge status={ticket.status} /></td>
      <td className="px-4 py-3 text-sm text-text-muted">{timeAgo(ticket.createdAt)}</td>
      <td className="px-4 py-3 text-right">
        <Link
          to={`/tickets/${ticket.ticketId}`}
          className="text-xs font-medium text-primary hover:underline"
        >
          View
        </Link>
      </td>
    </>
  );
}
