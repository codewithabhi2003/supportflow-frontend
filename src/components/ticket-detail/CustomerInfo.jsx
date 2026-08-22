export default function CustomerInfo({ ticket }) {
  const initial = ticket.customerName?.charAt(0).toUpperCase() || '?';
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">Customer</h2>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
          {initial}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{ticket.customerName}</p>
          <p className="text-sm text-text-secondary">{ticket.customerEmail}</p>
        </div>
      </div>
    </div>
  );
}
