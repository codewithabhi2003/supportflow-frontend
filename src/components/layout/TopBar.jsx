export default function TopBar({ title, subtitle, actions }) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-surface px-8 py-5">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
