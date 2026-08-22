export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
          <Icon size={22} />
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {message && <p className="mt-1 text-sm text-text-secondary">{message}</p>}
      </div>
      {action}
    </div>
  );
}
