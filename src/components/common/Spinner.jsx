export default function Spinner({ size = 20, className = '' }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-primary border-t-transparent ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
