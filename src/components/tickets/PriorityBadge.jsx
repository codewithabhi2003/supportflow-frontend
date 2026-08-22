import { priorityStyles } from '../../utils/statusColors';

export default function PriorityBadge({ priority }) {
  const style = priorityStyles[priority] || priorityStyles.Medium;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
      style={{ color: style.color, backgroundColor: style.bg }}
    >
      {priority}
    </span>
  );
}
