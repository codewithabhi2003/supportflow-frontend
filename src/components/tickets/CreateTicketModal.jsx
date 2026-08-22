import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { ticketService } from '../../services/ticketService';

const EMPTY = { customerName: '', customerEmail: '', subject: '', description: '' };

export default function CreateTicketModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.customerName.trim()) next.customerName = 'Customer name is required';
    else if (form.customerName.length > 100) next.customerName = 'Max 100 characters';

    if (!form.customerEmail.trim()) next.customerEmail = 'Customer email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.customerEmail)) next.customerEmail = 'Enter a valid email';

    if (!form.subject.trim()) next.subject = 'Subject is required';
    else if (form.subject.length < 5) next.subject = 'At least 5 characters';
    else if (form.subject.length > 200) next.subject = 'Max 200 characters';

    if (!form.description.trim()) next.description = 'Description is required';
    else if (form.description.trim().length < 20) next.description = 'At least 20 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await ticketService.create(form);
      toast.success(`Ticket ${res.data.data.ticketId} created!`);
      setForm(EMPTY);
      setErrors({});
      onCreated?.();
      onClose();
    } catch (err) {
      toast.error(err.message);
      // Keep modal open with the values the user already typed
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create Ticket">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="customerName"
          label="Customer Name"
          value={form.customerName}
          onChange={update('customerName')}
          error={errors.customerName}
          maxLength={100}
          placeholder="Jane Doe"
        />
        <Input
          id="customerEmail"
          label="Customer Email"
          type="email"
          value={form.customerEmail}
          onChange={update('customerEmail')}
          error={errors.customerEmail}
          placeholder="jane@example.com"
        />
        <Input
          id="subject"
          label="Subject"
          value={form.subject}
          onChange={update('subject')}
          error={errors.subject}
          maxLength={200}
          placeholder="Order hasn't arrived"
        />
        <Textarea
          id="description"
          label="Description"
          value={form.description}
          onChange={update('description')}
          error={errors.description}
          rows={5}
          placeholder="Describe the issue in detail (min 20 characters)..."
        />
        <div className="mt-1 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Create Ticket
          </Button>
        </div>
      </form>
    </Modal>
  );
}
