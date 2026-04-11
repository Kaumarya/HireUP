// ─── Interviews Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Clock, Users, Video, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const mockInterviews = [
  {
    id: 1,
    candidate: 'Priya Sharma',
    role: 'React Developer',
    type: 'Technical',
    date: '2024-02-10',
    time: '11:00 AM',
    duration: '45 min',
    location: 'Video Call',
    status: 'scheduled',
    interviewer: 'John Doe',
    notes: 'Focus on React hooks and state management'
  },
  {
    id: 2,
    candidate: 'Rahul Nair',
    role: 'ML Engineer',
    type: 'Final Round',
    date: '2024-02-10',
    time: '2:30 PM',
    duration: '60 min',
    location: 'On-site',
    status: 'scheduled',
    interviewer: 'Jane Smith',
    notes: 'Cultural fit and team collaboration'
  },
  {
    id: 3,
    candidate: 'Sneha Patel',
    role: 'Full Stack Developer',
    type: 'HR Round',
    date: '2024-02-10',
    time: '4:00 PM',
    duration: '30 min',
    location: 'Video Call',
    status: 'scheduled',
    interviewer: 'HR Team',
    notes: 'Salary expectations and notice period'
  },
  {
    id: 4,
    candidate: 'Amit Kumar',
    role: 'Product Designer',
    type: 'Portfolio Review',
    date: '2024-02-09',
    time: '3:00 PM',
    duration: '60 min',
    location: 'Video Call',
    status: 'completed',
    interviewer: 'Design Team',
    notes: 'Strong portfolio, good communication'
  },
  {
    id: 5,
    candidate: 'Kavita Reddy',
    role: 'Marketing Manager',
    type: 'Technical',
    date: '2024-02-09',
    time: '10:00 AM',
    duration: '45 min',
    location: 'Video Call',
    status: 'cancelled',
    interviewer: 'Marketing Lead',
    notes: 'Candidate cancelled, reschedule needed'
  }
];

export default function Interviews() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredInterviews = mockInterviews.filter(interview => {
    const matchesSearch = !query || 
      interview.candidate.toLowerCase().includes(query.toLowerCase()) ||
      interview.role.toLowerCase().includes(query.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(query.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    
    const today = new Date();
    const interviewDate = new Date(interview.date);
    const matchesDate = 
      dateFilter === 'all' ||
      (dateFilter === 'today' && interviewDate.toDateString() === today.toDateString()) ||
      (dateFilter === 'upcoming' && interviewDate > today) ||
      (dateFilter === 'past' && interviewDate < today);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return <Calendar size={16} className="text-blue-500" />;
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/recruiter-dashboard" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
              Interviews
            </h1>
            <p className="text-text-muted text-lg">
              Manage and track all interview schedules
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">Today</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">
                {mockInterviews.filter(i => new Date(i.date).toDateString() === new Date().toDateString()).length}
              </p>
              <p className="text-sm text-text-dim mt-1">Scheduled interviews</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">This Week</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">
                {mockInterviews.filter(i => {
                  const interviewDate = new Date(i.date);
                  const today = new Date();
                  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                  return interviewDate >= today && interviewDate <= weekFromNow;
                }).length}
              </p>
              <p className="text-sm text-text-dim mt-1">Upcoming interviews</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">Completed</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">
                {mockInterviews.filter(i => i.status === 'completed').length}
              </p>
              <p className="text-sm text-text-dim mt-1">This month</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">Candidates</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">
                {mockInterviews.filter(i => i.status === 'scheduled').length}
              </p>
              <p className="text-sm text-text-dim mt-1">In pipeline</p>
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-green" />
                <input
                  type="text"
                  placeholder="Search by candidate, role, or interviewer..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary placeholder-text-dim"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl text-text-primary focus:border-accent-green/50 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl text-text-primary focus:border-accent-green/50 focus:outline-none"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Interviews List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display font-semibold text-xl text-text-primary">{interview.candidate}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(interview.status)}`}>
                        {getStatusIcon(interview.status)}
                        {interview.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-text-dim mb-1">Role</p>
                        <p className="text-sm font-medium text-text-primary">{interview.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-dim mb-1">Type</p>
                        <p className="text-sm font-medium text-text-primary">{interview.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-dim mb-1">Date & Time</p>
                        <p className="text-sm font-medium text-text-primary">
                          {new Date(interview.date).toLocaleDateString()} at {interview.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-text-dim mb-1">Duration</p>
                        <p className="text-sm font-medium text-text-primary">{interview.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        {interview.location === 'Video Call' ? <Video size={14} /> : <MapPin size={14} />}
                        {interview.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {interview.interviewer}
                      </span>
                    </div>
                    
                    {interview.notes && (
                      <div className="mt-3 p-3 bg-bg-elevated rounded-lg">
                        <p className="text-sm text-text-dim">
                          <span className="font-medium text-text-primary">Notes:</span> {interview.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {interview.status === 'scheduled' && (
                      <>
                        <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                          Join Call
                        </button>
                        <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}
                    {interview.status === 'completed' && (
                      <button className="px-3 py-1.5 bg-accent-green/10 text-accent-green rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors">
                        View Feedback
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredInterviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-dim text-lg mb-4">No interviews found matching your criteria.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                className="text-accent-green hover:underline transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
