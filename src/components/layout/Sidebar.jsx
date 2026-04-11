// ─── Sidebar Component ────────────────────────────────────────────────────────
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, User, Brain, Bookmark,
  MessageSquare, Settings, Zap, ChevronRight, Bell, LogOut, Search,
  Users, Briefcase, Calendar, BarChart2, Map
} from 'lucide-react';

const studentLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/student-dashboard' },
  { icon: Search, label: 'Find Jobs', href: '/job-discovery' },
  { icon: FileText, label: 'My Applications', href: '/applications', badge: 2 },
  { icon: User, label: 'Portfolio', href: '/student-profile' },
  { icon: Brain, label: 'Skill Tests', href: '/skill-tests' },
  { icon: Map, label: 'Roadmap', href: '/roadmap' },
  { icon: Bookmark, label: 'Saved Jobs', href: '/saved-jobs', badge: 5 },
  { icon: MessageSquare, label: 'Messages', href: '/student-messages', badge: 3 },
  { icon: Settings, label: 'Settings', href: '/student-settings' },
];

const recruiterLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '/recruiter-dashboard' },
  { icon: Users, label: 'Candidates', href: '/all-candidates', badge: 847 },
  { icon: Briefcase, label: 'Job Posts', href: '/job-posts', badge: 12 },
  { icon: Calendar, label: 'Interviews', href: '/interviews', badge: 23 },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: MessageSquare, label: 'Messages', href: '/messages', badge: 8 },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar({ role = 'student' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const links = role === 'recruiter' ? recruiterLinks : studentLinks;

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <aside className="hidden md:flex flex-col w-60 min-h-screen bg-bg-card border-r border-bg-border pt-20 pb-6 px-3 fixed left-0 top-0 z-40">
      {/* Brand */}
      <Link to={role === 'student' ? '/student-dashboard' : '/recruiter-dashboard'} className="px-3 flex items-center gap-2 hover:opacity-80 transition-opacity -mt-12">
        <div className="relative">
          <div className="w-7 h-7 bg-accent-green rounded-md flex items-center justify-center">
            <Zap size={14} className="text-bg-primary fill-bg-primary" />
          </div>
          <div className="absolute inset-0 bg-accent-green rounded-md blur-sm opacity-50" />
        </div>
        <span className="font-display font-bold text-lg text-text-primary">
          Hire<span className="text-accent-green">UP</span>
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 mt-8">
        {links.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.href;
          return (
            <Link key={item.label} to={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-150 group cursor-pointer ${
                  active
                    ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} className={active ? 'text-accent-green' : 'text-current'} />
                  <span className="text-sm font-body">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs bg-accent-green text-bg-primary rounded-full w-5 h-5 flex items-center justify-center font-display font-bold">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-4 mx-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 group"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Bottom Section */}
      {role === 'student' ? (
        <div className="mt-4 mx-1">
          <Link 
            to="/pricing" 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent-green to-emerald-600 text-bg-primary font-display font-semibold text-sm hover:from-accent-green/90 hover:to-emerald-600/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Zap size={16} />
            <span>Upgrade to Pro</span>
          </Link>
        </div>
      ) : (
        <div className="mt-4 mx-1 p-4 rounded-xl bg-accent-green/5 border border-accent-green/20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-display font-semibold text-text-primary">TechCorp Inc.</p>
              <p className="text-xs text-text-muted">Pro Plan</p>
            </div>
          </div>
          <div className="w-full h-2 bg-bg-border rounded-full overflow-hidden mb-3">
            <div className="h-full bg-accent-green rounded-full" style={{ width: '68%' }} />
          </div>
          <p className="text-xs text-text-dim mb-3">8/12 job posts used</p>
          <Link 
            to="/recruiter-pricing" 
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent-green text-bg-primary font-display font-semibold text-xs hover:bg-accent-green/90 transition-all duration-200"
          >
            <Zap size={14} />
            <span>Upgrade Plan</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
