// ─── Applications Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, MapPin, ExternalLink, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { mockApplications } from '../data/mockData.js';

export default function Applications() {
  const [filter, setFilter] = useState('all');

  const filteredApplications = filter === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Interview':
        return <Calendar size={16} className="text-accent-green" />;
      case 'Applied':
        return <Clock size={16} className="text-yellow-500" />;
      case 'Shortlisted':
        return <CheckCircle size={16} className="text-blue-500" />;
      case 'Rejected':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertCircle size={16} className="text-text-dim" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview':
        return 'bg-accent-green/10 text-accent-green border-accent-green/25';
      case 'Applied':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/25';
      case 'Shortlisted':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/25';
      case 'Rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/25';
      default:
        return 'bg-bg-elevated text-text-muted border-bg-border';
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
              to="/student-dashboard" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold text-3xl text-text-primary mb-2">
                  My Applications
                </h1>
                <p className="text-text-muted">
                  Track your job applications and interview status
                </p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-2xl text-accent-green">{mockApplications.length}</p>
                <p className="text-xs text-text-dim">Total Applications</p>
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {['all', 'Applied', 'Shortlisted', 'Interview', 'Rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-display font-medium transition-all ${
                  filter === f
                    ? 'bg-accent-green text-bg-primary'
                    : 'bg-bg-card text-text-muted hover:text-text-primary border border-bg-border'
                }`}
              >
                {f === 'all' ? 'All' : f}
                {f !== 'all' && (
                  <span className="ml-2 text-xs bg-bg-elevated px-1.5 py-0.5 rounded-full">
                    {mockApplications.filter(app => app.status === f).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Applications List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredApplications.map((application, i) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-accent-green/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Job Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0"
                        style={{ 
                          background: application.color || '#4285F4',
                          border: `1px solid ${application.color || '#4285F4'}30`
                        }}
                      >
                        {application.company.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-xl text-text-primary mb-1">
                          {application.job}
                        </h3>
                        <div className="flex items-center gap-3 text-text-muted text-sm mb-2">
                          <span className="font-medium">{application.company}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>Bangalore</span>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            {application.status}
                          </div>
                          <div className="flex items-center gap-1 text-text-dim text-xs">
                            <Calendar size={12} />
                            Applied {application.date}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-bg-border">
                      <div>
                        <p className="text-xs text-text-dim mb-1">Application Type</p>
                        <p className="text-sm font-medium text-text-primary">Direct Application</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-dim mb-1">Expected Response</p>
                        <p className="text-sm font-medium text-text-primary">Within 7 days</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-dim mb-1">Match Score</p>
                        <p className="text-sm font-medium text-accent-green">87%</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 rounded-lg bg-bg-elevated border border-bg-border text-text-muted hover:text-accent-green hover:border-accent-green/30 transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredApplications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText size={48} className="mx-auto text-text-dim mb-4" />
              <h3 className="font-display font-semibold text-text-primary mb-2">
                No {filter === 'all' ? '' : filter.toLowerCase()} applications
              </h3>
              <p className="text-text-muted mb-6">
                {filter === 'all' 
                  ? "You haven't applied to any jobs yet. Start exploring opportunities!"
                  : `You don't have any ${filter.toLowerCase()} applications.`
                }
              </p>
              {filter === 'all' && (
                <Link to="/jobs" className="btn-primary">
                  Find Jobs
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
