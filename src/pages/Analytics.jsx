// ─── Analytics Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Briefcase, Calendar, Download, Filter } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = {
    totalApplications: 2847,
    hiredThisMonth: 12,
    avgTimeToHire: 18,
    costPerHire: 4500,
    offerAcceptanceRate: 85,
    sourceOfHire: {
      'LinkedIn': 35,
      'Company Website': 25,
      'Employee Referral': 20,
      'Job Boards': 15,
      'Others': 5
    },
    departmentHiring: {
      'Engineering': 8,
      'Design': 3,
      'Marketing': 4,
      'Sales': 6,
      'HR': 2
    },
    monthlyTrends: [
      { month: 'Jan', applications: 234, hires: 8, interviews: 45 },
      { month: 'Feb', applications: 312, hires: 12, interviews: 62 },
      { month: 'Mar', applications: 289, hires: 10, interviews: 58 },
      { month: 'Apr', applications: 356, hires: 15, interviews: 71 },
      { month: 'May', applications: 423, hires: 18, interviews: 85 },
      { month: 'Jun', applications: 389, hires: 14, interviews: 78 }
    ]
  };

  const StatCard = ({ icon: Icon, label, value, change, changeType, color = '#22C55E' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <Icon size={24} style={{ color }} />
          </div>
          <div>
            <p className="text-sm text-text-dim">{label}</p>
            <p className="font-display font-bold text-2xl text-text-primary">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'positive' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {change}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <Link 
                to="/recruiter-dashboard" 
                className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-4"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </Link>
              <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
                Analytics
              </h1>
              <p className="text-text-muted text-lg">
                Track your recruitment metrics and performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-bg-card border border-bg-border rounded-xl text-text-primary focus:border-accent-green/50 focus:outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-accent-green text-bg-primary rounded-xl font-medium hover:bg-accent-green/90 transition-colors">
                <Download size={18} />
                Export
              </button>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              icon={Users}
              label="Total Applications"
              value={stats.totalApplications.toLocaleString()}
              change="+12%"
              changeType="positive"
            />
            <StatCard
              icon={Briefcase}
              label="Hired This Month"
              value={stats.hiredThisMonth}
              change="+3"
              changeType="positive"
            />
            <StatCard
              icon={Calendar}
              label="Avg Time to Hire"
              value={`${stats.avgTimeToHire} days`}
              change="-2 days"
              changeType="positive"
            />
            <StatCard
              icon={TrendingUp}
              label="Offer Acceptance Rate"
              value={`${stats.offerAcceptanceRate}%`}
              change="+5%"
              changeType="positive"
            />
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Source of Hire Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Source of Hire</h3>
              <div className="space-y-3">
                {Object.entries(stats.sourceOfHire).map(([source, percentage]) => (
                  <div key={source}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-text-muted">{source}</span>
                      <span className="font-display font-semibold text-text-primary">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-accent-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Department Hiring Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Department Hiring</h3>
              <div className="space-y-3">
                {Object.entries(stats.departmentHiring).map(([dept, count]) => (
                  <div key={dept}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-text-muted">{dept}</span>
                      <span className="font-display font-semibold text-text-primary">{count}</span>
                    </div>
                    <div className="h-2 bg-bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / Math.max(...Object.values(stats.departmentHiring))) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Monthly Trends Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Monthly Trends</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-bg-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Month</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Applications</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Interviews</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Hires</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.monthlyTrends.map((month, index) => (
                    <motion.tr
                      key={month.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="border-b border-bg-border last:border-0"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-text-primary">{month.month}</td>
                      <td className="py-3 px-4 text-sm text-text-primary text-right">{month.applications}</td>
                      <td className="py-3 px-4 text-sm text-text-primary text-right">{month.interviews}</td>
                      <td className="py-3 px-4 text-sm text-text-primary text-right">{month.hires}</td>
                      <td className="py-3 px-4 text-sm text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-green/10 text-accent-green">
                          {((month.hires / month.applications) * 100).toFixed(1)}%
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Additional Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
          >
            <div className="glass-card rounded-2xl p-6 text-center">
              <h4 className="font-display font-semibold text-text-primary mb-2">Top Performing Channel</h4>
              <p className="text-2xl font-bold text-accent-green mb-1">LinkedIn</p>
              <p className="text-sm text-text-dim">35% of all hires</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <h4 className="font-display font-semibold text-text-primary mb-2">Fastest Hiring Department</h4>
              <p className="text-2xl font-bold text-accent-green mb-1">Engineering</p>
              <p className="text-sm text-text-dim">15 days avg</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <h4 className="font-display font-semibold text-text-primary mb-2">Cost Efficiency</h4>
              <p className="text-2xl font-bold text-accent-green mb-1">${stats.costPerHire}</p>
              <p className="text-sm text-text-dim">Per hire</p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
