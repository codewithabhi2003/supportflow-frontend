import { useState } from 'react';
import toast from 'react-hot-toast';
import Select from '../common/Select';
import Button from '../common/Button';
import StatusBadge from '../tickets/StatusBadge';
import { STATUSES } from '../../utils/statusColors';

export default function StatusManager({ ticket, onUpdateStatus }) {
  const [pending, setPending] = useState(ticket.status);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    if (pending === ticket.status) return;
    setSaving(true);
    try {
      await onUpdateStatus(pending);
      toast.success(`Status updated to ${pending}`);
    } catch (err) {
      toast.error(err.message);
      setPending(ticket.status);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">Status</h2>
      <div className="mb-3">
        <StatusBadge status={ticket.status} />
      </div>
      <Select
        value={pending}
        onChange={(e) => setPending(e.target.value)}
        options={STATUSES}
        className="w-full"
      />
      <Button
        onClick={handleUpdate}
        loading={saving}
        disabled={pending === ticket.status}
        className="mt-3 w-full"
      >
        Update Status
      </Button>
    </div>
  );
}
