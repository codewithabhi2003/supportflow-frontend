// Deterministic initials + background color for a user's avatar —
// no image upload/storage needed, just derived from their name.
const PALETTE = [
  '#6366F1', '#EC4899', '#10B981', '#F59E0B',
  '#3B82F6', '#8B5CF6', '#EF4444', '#14B8A6',
];

export const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '?';

export const getAvatarColor = (seed = '') => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
};
