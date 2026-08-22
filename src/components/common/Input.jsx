export default function Input({ label, error, className = '', id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-lg border bg-input px-3 py-2 text-sm text-text-primary
          placeholder:text-text-muted outline-none transition-colors
          focus:border-primary focus:ring-2 focus:ring-primary-ring
          disabled:cursor-not-allowed disabled:opacity-60
          ${error ? 'border-priority-high' : 'border-border'} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-priority-high">{error}</span>}
    </div>
  );
}
