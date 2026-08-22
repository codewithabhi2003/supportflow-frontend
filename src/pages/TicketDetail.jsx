import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, WifiOff, SearchX } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import TicketHeader from '../components/ticket-detail/TicketHeader';
import CustomerInfo from '../components/ticket-detail/CustomerInfo';
import AIAnalysis from '../components/ticket-detail/AIAnalysis';
import StatusManager from '../components/ticket-detail/StatusManager';
import NotesSection from '../components/ticket-detail/NotesSection';
import ActivityTimeline from '../components/ticket-detail/ActivityTimeline';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useTicketDetail } from '../hooks/useTicketDetail';
import { formatDate } from '../utils/formatDate';
import { useState } from 'react';

export default function TicketDetail() {
  const { ticketId } = useParams();
  const { ticket, loading, notFound, unreachable, aiTimedOut, refetch, triggerAnalysis, updateStatus, addNote } =
    useTicketDetail(ticketId);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      await triggerAnalysis();
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size={28} />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-8">
        <EmptyState
          icon={SearchX}
          title="Ticket not found"
          message={`We couldn't find ticket ${ticketId}.`}
          action={
            <Link to="/tickets">
              <Button>Back to Tickets</Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (unreachable || !ticket) {
    return (
      <div className="p-8">
        <EmptyState
          icon={WifiOff}
          title="This ticket isn't available right now"
          message="We couldn't reach the server. Try again in a moment."
          action={<Button onClick={refetch}>Retry</Button>}
        />
      </div>
    );
  }

  return (
    <>
      <TopBar
        title={ticket.ticketId}
        subtitle={ticket.subject}
        actions={
          <Link to="/tickets" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
            <ArrowLeft size={15} /> Back to Tickets
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <TicketHeader ticket={ticket} />
          <CustomerInfo ticket={ticket} />

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold text-text-primary">Customer Issue</h2>
            <p className="text-sm leading-relaxed text-text-secondary">{ticket.description}</p>
          </div>

          <AIAnalysis
            ticket={ticket}
            aiTimedOut={aiTimedOut}
            onAnalyze={handleAnalyze}
            analyzing={analyzing}
          />

          <NotesSection notes={ticket.notes || []} onAddNote={addNote} />
        </div>

        <div className="flex flex-col gap-6">
          <StatusManager ticket={ticket} onUpdateStatus={updateStatus} />

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-text-primary">Ticket Info</h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Created</span>
                <span className="text-text-primary">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Last Updated</span>
                <span className="text-text-primary">{formatDate(ticket.updatedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">AI Status</span>
                <span className="text-text-primary">{ticket.aiAnalyzed ? 'Analyzed' : 'Pending'}</span>
              </div>
            </div>
          </div>

          <ActivityTimeline ticket={ticket} />
        </div>
      </div>
    </>
  );
}
