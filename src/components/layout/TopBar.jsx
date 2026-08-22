export default function TopBar({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="truncate text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}