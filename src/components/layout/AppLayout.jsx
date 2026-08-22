import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen bg-base">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
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
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </div>
  );
}
