import { useState } from 'react';
import toast from 'react-hot-toast';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { formatDate } from '../../utils/formatDate';

export default function NotesSection({ notes, onAddNote }) {
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!text.trim()) return;
    setSaving(true);
    try {
      await onAddNote(text.trim());
      setText('');
      toast.success('Note added');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">Internal Notes</h2>

      {notes.length === 0 ? (
        <p className="mb-4 text-sm text-text-muted">No notes yet.</p>
      ) : (
        <div className="mb-4 flex flex-col gap-3">
          {notes.map((note) => (
            <div key={note._id} className="rounded-lg bg-input p-3">
              <p className="text-sm text-text-primary">{note.noteText}</p>
              <p className="mt-1 text-xs text-text-muted">{formatDate(note.createdAt)}</p>
            </div>
          ))}
        </div>
      )}

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add an internal note..."
        rows={3}
      />
      <Button onClick={handleAdd} loading={saving} disabled={!text.trim()} className="mt-2">
        Add Note
      </Button>
    </div>
  );
}
