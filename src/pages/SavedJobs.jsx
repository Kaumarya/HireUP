// ─── Saved Jobs Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Bookmark, Check, MapPin, Briefcase, Clock, DollarSign, Filter, ExternalLink } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const mockSavedJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $180k',
    posted: '2 days ago',
    deadline: '2024-03-15',
    description: 'We are looking for an experienced Frontend Developer to join our growing team...',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    saved: true,
    category: 'Engineering'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Design Studio',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $130k',
    posted: '5 days ago',
    deadline: '2024-03-20',
    description: 'Join our creative team to design beautiful and functional user interfaces...',
    requirements: ['Figma', 'Adobe Creative Suite', 'UI/UX', '3+ years experience'],
    saved: true,
    category: 'Design'
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'AI Solutions',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$140k - $200k',
    posted: '1 week ago',
    deadline: '2024-03-25',
    description: 'Looking for a Data Scientist to help us build cutting-edge ML models...',
    requirements: ['Python', 'Machine Learning', 'TensorFlow', 'PhD preferred'],
    saved: true,
    category: 'Data Science'
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'Growth Co.',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$80k - $120k',
    posted: '3 days ago',
    deadline: '2024-03-18',
    description: 'Lead our marketing efforts and help us grow our user base...',
    requirements: ['Digital Marketing', 'Analytics', 'Team Leadership', '5+ years experience'],
    saved: true,
    category: 'Marketing'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $170k',
    posted: '4 days ago',
    deadline: '2024-03-22',
    description: 'Help us build and maintain scalable cloud infrastructure...',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    saved: true,
    category: 'Engineering'
  }
];

export default function SavedJobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);

  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, saved: !job.saved } : job
      ).filter(job => job.saved) // Only keep saved jobs
    );
  };

  const categories = ['all', ...new Set(mockSavedJobs.map(job => job.category))];
  const types = ['all', 'Full-time', 'Part-time', 'Contract', 'Remote'];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      
      <main className="pt-24 pb-16 md:ml-60">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
              Saved Jobs
            </h1>
            <p className="text-text-muted text-lg">
              Manage your saved job opportunities and applications
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="glass-card rounded-2xl p-6 text-center">
              <Check size={32} className="text-accent-green mx-auto mb-3" />
              <h3 className="font-display font-bold text-2xl text-text-primary">{savedJobs.length}</h3>
              <p className="text-sm text-text-dim">Saved Jobs</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <Clock size={32} className="text-accent-green mx-auto mb-3" />
              <h3 className="font-display font-bold text-2xl text-text-primary">
                {savedJobs.filter(job => {
                  const postedDate = new Date(job.posted);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return postedDate > weekAgo;
                }).length}
              </h3>
              <p className="text-sm text-text-dim">New This Week</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <Briefcase size={32} className="text-accent-green mx-auto mb-3" />
              <h3 className="font-display font-bold text-2xl text-text-primary">
                {new Set(savedJobs.map(job => job.category)).size}
              </h3>
              <p className="text-sm text-text-dim">Categories</p>
            </div>
          </motion.div>

          {/* Filters */}
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
                  placeholder="Search saved jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary placeholder-text-dim"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-3 bg-bg-elevated border border-bg-border rounded-xl text-text-primary focus:border-accent-green/50 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 bg-bg-elevated border border-bg-border rounded-xl text-text-primary focus:border-accent-green/50 focus:outline-none"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Jobs Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all relative"
              >
                {/* Save Button */}
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-bg-elevated transition-colors"
                >
                  {job.saved ? (
                    <Check size={20} className="text-accent-green fill-current" />
                  ) : (
                    <Bookmark size={20} className="text-text-dim" />
                  )}
                </button>

                <div className="mb-4">
                  <h3 className="font-display font-semibold text-xl text-text-primary mb-2 pr-8">
                    {job.title}
                  </h3>
                  <p className="text-lg font-medium text-accent-green mb-1">{job.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-dim">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Posted {job.posted}
                    </span>
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>

                <p className="text-text-muted text-sm mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-text-primary mb-2">Key Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-bg-elevated text-text-dim rounded-lg text-xs"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="px-2 py-1 bg-bg-elevated text-text-dim rounded-lg text-xs">
                        +{job.requirements.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-accent-green text-white rounded-xl font-medium hover:bg-accent-green/90 transition-colors">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 bg-bg-elevated border border-bg-border text-text-primary rounded-xl hover:bg-bg-border transition-colors">
                    <ExternalLink size={18} />
                  </button>
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
              <Bookmark size={48} className="text-text-dim mx-auto mb-4" />
              <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
                No saved jobs found
              </h3>
              <p className="text-text-dim mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setTypeFilter('all');
                }}
                className="text-accent-green hover:underline transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
