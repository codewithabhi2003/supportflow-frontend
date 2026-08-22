import { Link } from 'react-router-dom';
import { LogOut, UserCog } from 'lucide-react';
import TopBar from '../components/layout/TopBar';
import ThemeToggle from '../components/common/ThemeToggle';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <>
      <TopBar title="Settings" subtitle="App preferences" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="max-w-md rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-text-primary">Appearance</h2>
          <ThemeToggle />
        </div>

        <div className="max-w-md rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-text-primary">Account</h2>
          <div className="flex items-center gap-3">
            <Avatar name={user?.name} size={44} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="truncate text-sm text-text-secondary">{user?.email}</p>
              <span className="mt-1 inline-block rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
            <Link to="/profile">
              <Button variant="secondary">
                <UserCog size={14} /> Manage Profile
              </Button>
            </Link>
            <Button variant="ghost" onClick={logout} className="text-priority-high hover:bg-priority-high-bg">
              <LogOut size={14} /> Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}