import { useEffect, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Menu, Sparkles } from 'lucide-react';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-base">
      {/* Fixed sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex min-h-screen flex-col lg:ml-64">
        {/* Mobile header */}
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-1.5 text-text-secondary hover:bg-hover"
          >
            <Menu size={20} />
          </button>

          <span className="flex items-center gap-1.5 text-sm font-bold text-text-primary">
            <Sparkles size={15} className="text-primary" />
            SupportFlow
          </span>
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{ duration: 3500 }}
      />
    </div>
  );
}