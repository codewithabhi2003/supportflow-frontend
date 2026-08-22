import { Sparkles } from 'lucide-react';

export default function AIInsights({ aiInsights }) {
  const { analyzedCount, total, topCategory, highPriorityOpen } = aiInsights;
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-text-primary">
        <Sparkles size={16} className="text-primary" /> AI Insights
      </h2>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">AI-analyzed tickets</span>
          <span className="font-medium text-text-primary">{analyzedCount} of {total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Most common category</span>
          <span className="font-medium text-text-primary">{topCategory}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">High priority open tickets</span>
          <span className="font-medium text-priority-high">{highPriorityOpen}</span>
        </div>
      </div>
    </div>
  );
}
