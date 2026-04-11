// ─── Recruiter Dashboard ─────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Bell, Plus, Briefcase, Users, Calendar, TrendingUp, TrendingDown,
  BarChart2, Zap, Filter, ChevronRight, CheckCircle, Clock,
  Star, LayoutDashboard, Settings, MessageSquare, FileText, LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CandidateCard from '../components/ui/CandidateCard';
import Sidebar from '../components/layout/Sidebar';
import JobPostingModal from '../components/ui/JobPostingModal';
import { mockCandidates, mockStats } from '../data/mockData.js';

// Compact Stat Card
function CompactStat({ icon: Icon, label, value, change, color = '#22C55E' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-card border border-bg-border rounded-xl p-4 hover:border-accent-green/20 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium">{label}</p>
            <p className="text-lg font-bold text-text-primary">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium ${change > 0 ? 'text-accent-green' : 'text-red-400'}`}>
            {change > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Compact Job Row
function CompactJobRow({ title, apps, stage, daysLeft }) {
  return (
    <div className="flex items-center justify-between p-3 bg-bg-card border border-bg-border rounded-lg hover:border-accent-green/20 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-accent-green/10 rounded-lg flex items-center justify-center">
          <Briefcase size={14} className="text-accent-green" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-text-primary truncate">{title}</p>
          <p className="text-xs text-text-muted">{stage}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted">{apps}</span>
        <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-500 rounded-full">{daysLeft}</span>
      </div>
    </div>
  );
}

// Compact Activity Item
function CompactActivity({ icon: Icon, text, time, color }) {
  return (
    <div className="flex items-start gap-3 p-2">
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}20` }}>
        <Icon size={12} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-primary truncate">{text}</p>
        <p className="text-xs text-text-dim">{time}</p>
      </div>
    </div>
  );
}

const activeJobs = [
  { title: 'Frontend Engineer', apps: 47, stage: 'Reviewing', daysLeft: '5d' },
  { title: 'Product Designer', apps: 32, stage: 'Screening', daysLeft: '3d' },
  { title: 'Backend Developer', apps: 28, stage: 'Interviews', daysLeft: '2d' },
];

const recentActivities = [
  { icon: Users, text: '5 new candidates applied', time: '2m ago', color: '#22C55E' },
  { icon: Calendar, text: 'Interview with Priya S.', time: '1h ago', color: '#3B82F6' },
  { icon: CheckCircle, text: 'Offer accepted by Raj K.', time: '3h ago', color: '#8B5CF6' },
  { icon: MessageSquare, text: '3 new messages', time: '5h ago', color: '#F59E0B' },
];

export default function RecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const navigate = useNavigate();

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = !searchQuery || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    switch (activeFilter) {
      case 'available':
        return matchesSearch && candidate.available;
      case 'verified':
        return matchesSearch && candidate.verified;
      case 'score80':
        return matchesSearch && candidate.score >= 80;
      case 'topTalent':
        return matchesSearch && candidate.score >= 90 && candidate.verified;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <Sidebar role="recruiter" />

      {/* Main Content */}
      <main className="flex-1 md:ml-60">
        {/* Enhanced Header */}
        <header className="bg-bg-card border-b border-bg-border">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-6 mb-3">
                  <h1 className="text-3xl font-bold text-text-primary">Welcome back, John!</h1>
                  <span className="px-3 py-1.5 bg-accent-green/10 text-accent-green text-sm font-medium rounded-full">
                    Pro Plan
                  </span>
                </div>
                <p className="text-base text-text-muted">
                  TechCorp Inc.
                </p>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                {/* Search Bar */}
                <div className="relative flex-shrink-0">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-bg-elevated border border-bg-border rounded-lg text-sm focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim w-48 lg:w-64"
                  />
                </div>

                {/* Notifications */}
                <div className="relative flex-shrink-0">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2.5 rounded-lg bg-bg-elevated border border-bg-border hover:bg-bg-border transition-colors"
                  >
                    <Bell size={18} className="text-text-dim" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 bg-bg-card border border-bg-border rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
                      <div className="p-4 border-b border-bg-border">
                        <h3 className="font-semibold text-text-primary">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {[
                          { icon: Users, text: '5 new candidates applied to Frontend Engineer', time: '2m ago', color: '#22C55E' },
                          { icon: Calendar, text: 'Interview with Priya Sharma starts in 1 hour', time: '1h ago', color: '#3B82F6' },
                          { icon: CheckCircle, text: 'Offer accepted by Raj Kumar', time: '3h ago', color: '#8B5CF6' },
                          { icon: MessageSquare, text: '3 new messages from candidates', time: '5h ago', color: '#F59E0B' },
                        ].map((notif, i) => (
                          <div key={i} className="p-3 hover:bg-bg-elevated transition-colors border-b border-bg-border last:border-b-0">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${notif.color}20` }}>
                                <notif.icon size={14} style={{ color: notif.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-text-primary line-clamp-2">{notif.text}</p>
                                <p className="text-xs text-text-dim mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-bg-border">
                        <button className="w-full text-center text-sm text-accent-green hover:text-accent-green/80 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="relative flex-shrink-0">
                  <button 
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-bg-elevated border border-bg-border hover:bg-bg-border transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-green to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">JA</span>
                    </div>
                    <ChevronRight size={14} className="text-text-dim" />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-56 bg-bg-card border border-bg-border rounded-xl shadow-xl z-50">
                      <div className="p-4 border-b border-bg-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">JA</span>
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary">John Anderson</p>
                            <p className="text-xs text-text-muted">john@techcorp.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-bg-elevated transition-colors">
                          <Settings size={16} className="text-text-dim" />
                          Settings
                        </Link>
                        <Link to="/analytics" className="flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-bg-elevated transition-colors">
                          <BarChart2 size={16} className="text-text-dim" />
                          Analytics
                        </Link>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="px-8 py-5 bg-gradient-to-r from-accent-green/5 to-emerald-600/5 border-t border-bg-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-accent-green" />
                  <span className="text-base text-text-primary">
                    <span className="font-semibold">847</span> Total Candidates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-accent-green" />
                  <span className="text-base text-text-primary">
                    <span className="font-semibold">12</span> Active Jobs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-accent-green" />
                  <span className="text-base text-text-primary">
                    <span className="font-semibold">23</span> Interviews Today
                  </span>
                </div>
              </div>
              <div className="text-base text-text-muted">
                Last updated: <span className="text-text-primary font-medium">2 minutes ago</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <CompactStat icon={Users} label="Candidates" value={mockStats.totalCandidates} change={12} />
            <CompactStat icon={Briefcase} label="Active Jobs" value={mockStats.activeJobs} change={8} />
            <CompactStat icon={Calendar} label="Interviews" value={mockStats.interviewsToday} change={-3} />
            <CompactStat icon={TrendingUp} label="Hiring Rate" value={`${mockStats.hiringRate}%`} change={15} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Candidate Discovery */}
              <div className="bg-bg-card border border-bg-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">AI Candidate Discovery</h2>
                    <p className="text-xs text-text-muted">Smart matching based on job requirements</p>
                  </div>
                  <button className="p-1.5 rounded-lg bg-bg-elevated border border-bg-border hover:bg-bg-border transition-colors">
                    <Filter size={14} className="text-text-dim" />
                  </button>
                </div>

                {/* Filter Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'available', label: 'Available' },
                    { id: 'verified', label: 'Verified' },
                    { id: 'score80', label: 'Score 80+' },
                    { id: 'topTalent', label: 'Top Talent' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        activeFilter === filter.id
                          ? 'bg-accent-green text-white'
                          : 'bg-bg-elevated text-text-muted hover:text-text-primary'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Candidates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {filteredCandidates.slice(0, 6).map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>

                <div className="mt-3 text-center">
                  <Link to="/all-candidates" className="inline-flex items-center gap-1 text-accent-green hover:text-accent-green/80 transition-colors text-xs font-medium">
                    View All <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Active Jobs */}
              <div className="bg-bg-card border border-bg-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text-primary">Active Jobs</h3>
                  <Link to="/job-posts" className="text-accent-green hover:text-accent-green/80 text-xs">
                    View all
                  </Link>
                </div>
                <div className="space-y-2">
                  {activeJobs.map((job, index) => (
                    <CompactJobRow key={index} {...job} />
                  ))}
                </div>
                <button 
                  onClick={() => {
                    console.log('Post New Job clicked!');
                    setShowJobModal(true);
                  }}
                  className="w-full mt-3 py-2 bg-accent-green text-white rounded-lg text-sm font-medium hover:bg-accent-green/90 transition-colors"
                >
                  Post New Job
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-bg-card border border-bg-border rounded-xl p-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Activity</h3>
                <div className="space-y-1">
                  {recentActivities.map((activity, index) => (
                    <CompactActivity key={index} {...activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Job Posting Modal */}
      <JobPostingModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        onSubmit={(jobData) => {
          console.log('Job submitted:', jobData);
          // Here you would typically send the data to your backend
          alert('Job posted successfully!');
          setShowJobModal(false);
        }}
      />
    </div>
  );
}
