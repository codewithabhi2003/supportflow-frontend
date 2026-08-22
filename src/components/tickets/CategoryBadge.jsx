export default function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
      {category}
    </span>
  );
}
