import { Sparkles } from 'lucide-react';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import CopyButton from '../common/CopyButton';
import PriorityBadge from '../tickets/PriorityBadge';
import CategoryBadge from '../tickets/CategoryBadge';

export default function AIAnalysis({ ticket, aiTimedOut, onAnalyze, analyzing }) {
  const analyzed = ticket.aiAnalyzed;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
          <Sparkles size={16} className="text-primary" /> AI Analysis
        </h2>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            analyzed ? 'bg-status-closed-bg text-status-closed' : 'bg-status-progress-bg text-status-progress'
          }`}
        >
          {analyzed ? 'Analyzed' : 'Pending'}
        </span>
      </div>

      {analyzed ? (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Summary</p>
            <p className="mt-1 text-sm text-text-primary">{ticket.aiSummary}</p>
          </div>
          <div className="flex gap-2">
            <CategoryBadge category={ticket.category} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Suggested Reply</p>
              <CopyButton text={ticket.aiSuggestedReply} />
            </div>
            <div className="rounded-lg border border-border bg-input p-3 font-mono text-xs leading-relaxed text-text-primary">
              {ticket.aiSuggestedReply}
            </div>
          </div>
        </div>
      ) : aiTimedOut ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-text-secondary">AI analysis unavailable for this ticket.</p>
          <Button onClick={onAnalyze} loading={analyzing}>
            <Sparkles size={14} /> Analyze with AI
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Spinner size={16} /> AI is analyzing this ticket...
          </div>
          <Button onClick={onAnalyze} loading={analyzing} variant="secondary">
            <Sparkles size={14} /> Analyze with AI
          </Button>
        </div>
      )}
    </div>
  );
}
