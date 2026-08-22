import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import Avatar from '../components/common/Avatar';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatDate';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  const dirty = name.trim() !== user?.name;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim() || !dirty) return;
    setSaving(true);
    try {
      await updateProfile(name.trim());
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <TopBar title="Profile" subtitle="Your account details" />
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-lg rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <Avatar name={user?.name} size={64} />
            <div>
              <p className="text-base font-semibold text-text-primary">{user?.name}</p>
              <p className="text-sm text-text-secondary">{user?.email}</p>
              <span className="mt-1 inline-block rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                {user?.role}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
            <Input id="name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input id="email" label="Email" value={user?.email || ''} disabled />

            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>Member since {user?.createdAt ? formatDate(user.createdAt) : '—'}</span>
            </div>

            <Button type="submit" loading={saving} disabled={!dirty} className="w-fit">
              Save changes
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-6 max-w-lg rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="mb-1 text-sm font-semibold text-text-primary">Session</h2>
          <p className="mb-4 text-sm text-text-secondary">Sign out of SupportFlow on this device.</p>
          <Button variant="secondary" onClick={logout}>
            <LogOut size={14} /> Log out
          </Button>
        </motion.div>
      </div>
    </>
  );
}
