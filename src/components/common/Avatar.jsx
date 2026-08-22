import { getInitials, getAvatarColor } from '../../utils/avatar';

export default function Avatar({ name, size = 36, className = '' }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundColor: getAvatarColor(name || '?'),
      }}
    >
      {getInitials(name)}
    </div>
  );
}
