// ─── Job Posts Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Briefcase, Edit, Trash2, Eye, Users, Calendar, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const mockJobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    status: 'active',
    applicants: 45,
    views: 234,
    posted: '2 days ago',
    deadline: '2024-02-15'
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Hybrid',
    status: 'active',
    applicants: 32,
    views: 189,
    posted: '5 days ago',
    deadline: '2024-02-20'
  },
  {
    id: 3,
    title: 'Marketing Manager',
    department: 'Marketing',
    type: 'Full-time',
    location: 'On-site',
    status: 'draft',
    applicants: 0,
    views: 0,
    posted: '1 day ago',
    deadline: '2024-02-25'
  }
];

export default function JobPosts() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !query || 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.department.toLowerCase().includes(query.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
                Job Posts
              </h1>
              <p className="text-text-muted text-lg">
                Manage your job listings and track applications
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-accent-green text-bg-primary rounded-xl font-display font-semibold hover:bg-accent-green/90 transition-colors"
            >
              <Plus size={20} />
              Post New Job
            </motion.button>
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
                <Briefcase size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">Total Jobs</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">{mockJobs.length}</p>
              <p className="text-sm text-text-dim mt-1">Active listings</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">Total Applicants</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">
                {mockJobs.reduce((acc, job) => acc + job.applicants, 0)}
              </p>
              <p className="text-sm text-text-dim mt-1">Across all jobs</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Eye size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">Total Views</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">
                {mockJobs.reduce((acc, job) => acc + job.views, 0)}
              </p>
              <p className="text-sm text-text-dim mt-1">Job post views</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} className="text-accent-green" />
                <h3 className="font-display font-semibold text-text-primary">Avg. Time to Fill</h3>
              </div>
              <p className="font-display font-bold text-3xl text-accent-green">18</p>
              <p className="text-sm text-text-dim mt-1">Days</p>
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
                  placeholder="Search jobs by title or department..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary placeholder-text-dim"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'active', 'draft'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      statusFilter === status
                        ? 'bg-accent-green/10 text-accent-green border-accent-green/25'
                        : 'text-text-muted border border-bg-border hover:text-text-primary'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Jobs List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-semibold text-xl text-text-primary">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.department}
                      </span>
                      <span>{job.type}</span>
                      <span>{job.location}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Posted {job.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Deadline: {job.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-accent-green" />
                        <span className="text-sm font-medium text-text-primary">{job.applicants}</span>
                        <span className="text-sm text-text-dim">applicants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-accent-green" />
                        <span className="text-sm font-medium text-text-primary">{job.views}</span>
                        <span className="text-sm text-text-dim">views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-text-muted hover:text-accent-green hover:bg-accent-green/10 rounded-lg transition-all">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-text-muted hover:text-accent-green hover:bg-accent-green/10 rounded-lg transition-all">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-dim text-lg mb-4">No jobs found matching your criteria.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setStatusFilter('all');
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
