import { motion } from 'framer-motion';
import TopBar from '../components/layout/TopBar';
import KPICards from '../components/dashboard/KPICards';
import RecentTickets from '../components/dashboard/RecentTickets';
import GrowthChart from '../components/dashboard/GrowthChart';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import AIInsights from '../components/dashboard/AIInsights';
import Spinner from '../components/common/Spinner';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../hooks/useDashboard';

export default function Dashboard() {
  const { user } = useAuth();
  const { kpis, recentTickets, aiInsights, categoryBreakdown, growth, loading } = useDashboard();

  return (
    <>
      <TopBar title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`} subtitle="Here's what's happening with your tickets" />
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size={28} />
          </div>
        ) : (
          <>
            <KPICards kpis={kpis} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <GrowthChart data={growth} />
              </div>
              <CategoryPieChart data={categoryBreakdown} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="lg:col-span-2"
              >
                <RecentTickets tickets={recentTickets} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <AIInsights aiInsights={aiInsights} />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </>
  );
}