import { statusStyles } from '../../utils/statusColors';

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.Open;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
      style={{ color: style.color, backgroundColor: style.bg }}
    >
      {status}
    </span>
  );
}
