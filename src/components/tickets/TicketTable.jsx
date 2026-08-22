import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import TicketRow from './TicketRow';
import EmptyState from '../common/EmptyState';
import Spinner from '../common/Spinner';
import Button from '../common/Button';

export default function TicketTable({ tickets, loading, onCreateClick }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-card py-20">
        <Spinner size={28} />
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <EmptyState
        icon={Inbox}
        title="No tickets yet"
        message="Create your first support ticket to get started."
        action={<Button onClick={onCreateClick}>+ Create Ticket</Button>}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            <th className="px-4 py-3">Ticket ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <motion.tr
              key={t.ticketId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
              className="border-b border-border last:border-0 hover:bg-hover"
            >
              <TicketRow ticket={t} />
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
