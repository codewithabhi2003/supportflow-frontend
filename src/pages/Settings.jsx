import TopBar from '../components/layout/TopBar';
import ThemeToggle from '../components/common/ThemeToggle';

export default function Settings() {
  return (
    <>
      <TopBar title="Settings" subtitle="App preferences" />
      <div className="flex flex-col gap-6 p-8">
        <div className="max-w-md rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-text-primary">Appearance</h2>
          <ThemeToggle />
        </div>

        <div className="max-w-md rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-text-primary">About</h2>
          <p className="text-sm text-text-secondary">SupportFlow v1.0</p>
          <p className="mt-1 text-xs text-text-muted">AI-powered customer support CRM</p>
        </div>

        <div className="max-w-md rounded-xl border border-dashed border-border bg-card p-5">
          <h2 className="mb-1 text-sm font-semibold text-text-primary">Coming soon</h2>
          <p className="text-sm text-text-muted">
            Authentication, notification preferences, and workspace settings.
          </p>
        </div>
      </div>
    </>
  );
}
