// ─── Student Dashboard ────────────────────────────────────────────────────────
import { motion } from 'framer-motion';
import {
  Bell, Search, Zap, TrendingUp, Sparkles, ChevronRight,
  LayoutDashboard, FileText, User, Brain, Bookmark,
  MessageSquare, Settings, BarChart2, Clock, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { TalentScore, ProgressBar, StatusBadge, SkillBadge } from '../components/ui/index';
import JobCard from '../components/ui/JobCard';
import { mockStudent, mockJobs, mockApplications, recommendedSkills } from '../data/mockData.js';

// AI Match Card
function AIMatchCard({ job }) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'rgba(34,197,94,0.4)' }}
      className="glass-card rounded-xl p-4 flex items-center gap-3 transition-all duration-200 cursor-pointer group"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-display font-bold flex-shrink-0"
        style={{ background: `${job.companyColor}18`, border: `1px solid ${job.companyColor}35`, color: job.companyColor }}
      >
        {job.companyInitial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-display font-semibold text-text-primary group-hover:text-accent-green transition-colors truncate">{job.title}</p>
        <p className="text-xs text-text-muted">{job.company} · {job.location}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs font-display font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-lg">{job.match}%</span>
        <span className="text-xs text-text-dim">{job.salary}</span>
      </div>
    </motion.div>
  );
}

// Stat card
function DashStat({ icon: Icon, label, value, change, color = '#22C55E' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="glass-card rounded-2xl p-5 hover:border-accent-green/25 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Icon size={16} style={{ color }} />
        </div>
        {change && (
          <span className="text-xs font-body text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-full">
            {change}
          </span>
        )}
      </div>
      <p className="font-display font-bold text-2xl text-text-primary mb-1">{value}</p>
      <p className="text-text-muted text-xs">{label}</p>
    </motion.div>
  );
}

export default function StudentDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <Sidebar role="student" />

      {/* Main Content */}
      <main className="flex-1 md:ml-60 p-6 pt-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-text-muted text-sm">Good morning 👋</p>
            <h1 className="font-display font-bold text-2xl text-text-primary">Welcome back, Aryan</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-bg-card border border-bg-border rounded-xl px-4 py-2.5 w-64 text-sm text-text-muted">
              <Search size={14} />
              <span>Search jobs, skills...</span>
            </div>
            {/* Notifications */}
            <button className="relative w-10 h-10 bg-bg-card border border-bg-border rounded-xl flex items-center justify-center text-text-muted hover:text-accent-green hover:border-accent-green/30 transition-all">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-green rounded-full" />
            </button>
            {/* Avatar */}
            <Link to="/student-profile">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-green/30 to-accent-green-dim/20 border border-accent-green/30 flex items-center justify-center font-display font-bold text-accent-green text-sm cursor-pointer hover:shadow-glow-sm transition-all">
                AM
              </div>
            </Link>
          </div>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          {/* ── Stats Row ─────────────────────────────────── */}
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <DashStat icon={FileText} label="Applications Sent" value="14" change="+3 this week" />
            <DashStat icon={MessageSquare} label="Interview Invites" value="3" change="+1 today" color="#6366F1" />
            <DashStat icon={Sparkles} label="AI Job Matches" value="28" change="Updated now" color="#F59E0B" />
            <DashStat icon={Bookmark} label="Saved Jobs" value="9" color="#3B82F6" />
          </motion.div>

          {/* ── Two-column middle ─────────────────────────── */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* AI Job Matches */}
            <motion.div variants={item} className="lg:col-span-2 glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-accent-green" />
                  <h2 className="font-display font-semibold text-text-primary">AI Job Matches</h2>
                </div>
                <Link to="/job-discovery" className="text-xs text-accent-green hover:underline flex items-center gap-1">
                  View all <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-2.5">
                {mockJobs.slice(0, 4).map((job) => (
                  <AIMatchCard key={job.id} job={job} />
                ))}
              </div>
            </motion.div>

            {/* Profile Completion + Talent Score */}
            <motion.div variants={item} className="space-y-4">
              {/* Talent Score */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <TalentScore score={mockStudent.talentScore} size="lg" />
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">Talent Score</p>
                    <p className="font-display font-bold text-text-primary text-lg">{mockStudent.talentScore}/100</p>
                    <p className="text-xs text-accent-green flex items-center gap-1">
                      <TrendingUp size={10} /> +4 this month
                    </p>
                  </div>
                </div>
                <p className="text-xs text-text-muted">Your profile ranks in the top <span className="text-accent-green font-semibold">8%</span> of candidates.</p>
              </div>

              {/* Profile Completion */}
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-sm text-text-primary">Profile Completion</h3>
                  <span className="text-accent-green font-display font-bold text-sm">{mockStudent.profileCompletion}%</span>
                </div>
                <ProgressBar value={mockStudent.profileCompletion} label="Overall" />
                <div className="mt-3 space-y-1">
                  {[
                    { label: 'Add Work Experience', done: false },
                    { label: 'Upload Resume', done: true },
                    { label: 'Add 2 more Projects', done: false },
                    { label: 'Verify Skills', done: true },
                  ].map(({ label, done }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center ${done ? 'bg-accent-green border-accent-green' : 'border-text-dim'}`}>
                        {done && <span className="text-bg-primary text-[8px] font-bold">✓</span>}
                      </div>
                      <span className={`text-xs ${done ? 'text-text-dim line-through' : 'text-text-muted'}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Recommended Skills + Recent Applications ──── */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recommended Skills */}
            <motion.div variants={item} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={16} className="text-accent-green" />
                <h2 className="font-display font-semibold text-text-primary">Recommended Skills</h2>
              </div>
              <div className="space-y-3">
                {recommendedSkills.map((skill, i) => (
                  <div key={skill.name} className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl hover:border hover:border-accent-green/20 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent-green/10 rounded-lg flex items-center justify-center text-xs font-display font-bold text-accent-green">{i + 1}</div>
                      <div>
                        <p className="text-sm font-body text-text-primary">{skill.name}</p>
                        <p className="text-xs text-text-muted">Demand: <span className="text-accent-green">{skill.demand}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-dim mb-1">Profile match</p>
                      <p className="text-sm font-display font-bold text-text-primary">{skill.match}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Applications */}
            <motion.div variants={item} className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-accent-green" />
                  <h2 className="font-display font-semibold text-text-primary">My Applications</h2>
                </div>
                <span className="tag">4 active</span>
              </div>
              <div className="space-y-3">
                {mockApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display font-bold"
                        style={{ background: `${app.color}18`, color: app.color, border: `1px solid ${app.color}30` }}
                      >
                        {app.company[0]}
                      </div>
                      <div>
                        <p className="text-sm font-body text-text-primary">{app.job}</p>
                        <p className="text-xs text-text-muted">{app.company} · {app.date}</p>
                      </div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
