export const statusStyles = {
  Open:          { color: 'var(--status-open)',     bg: 'var(--status-open-bg)' },
  'In Progress': { color: 'var(--status-progress)', bg: 'var(--status-progress-bg)' },
  Closed:        { color: 'var(--status-closed)',   bg: 'var(--status-closed-bg)' },
};

export const priorityStyles = {
  High:   { color: 'var(--priority-high)', bg: 'var(--priority-high-bg)' },
  Medium: { color: 'var(--priority-med)',  bg: 'var(--priority-med-bg)' },
  Low:    { color: 'var(--priority-low)',  bg: 'var(--priority-low-bg)' },
};

export const STATUSES = ['Open', 'In Progress', 'Closed'];
export const PRIORITIES = ['Low', 'Medium', 'High'];
export const CATEGORIES = ['Delivery', 'Payment', 'Refund', 'Account', 'Product', 'Technical', 'Other'];
