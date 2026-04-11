// ─── All Candidates Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CandidateCard from '../components/ui/CandidateCard';
import { mockCandidates } from '../data/mockData.js';

export default function AllCandidates() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    available: false,
    verified: false,
    minScore: 0,
    roles: []
  });

  const filteredCandidates = mockCandidates.filter(c => {
    // Search filter
    const matchesSearch = !query || 
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
      c.role.toLowerCase().includes(query.toLowerCase());
    
    // Availability filter
    const matchesAvailability = !filters.available || c.available;
    
    // Verified filter
    const matchesVerified = !filters.verified || c.verified;
    
    // Score filter
    const matchesScore = c.score >= filters.minScore;
    
    // Role filter
    const matchesRole = filters.roles.length === 0 || filters.roles.includes(c.role);
    
    return matchesSearch && matchesAvailability && matchesVerified && matchesScore && matchesRole;
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
            className="text-center mb-12"
          >
            <Link 
              to="/recruiter-dashboard" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            
            <h1 className="font-display font-bold text-4xl text-text-primary mb-4">
              All Candidates
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Browse through our complete talent pool of {mockCandidates.length} qualified candidates
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-bg-card rounded-2xl p-6 border border-bg-border mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-green" />
                <input
                  type="text"
                  placeholder="Search by name, skills, or role..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary placeholder-text-dim"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  showFilters || filters.available || filters.verified || filters.minScore > 0 || filters.roles.length > 0
                    ? 'bg-accent-green/10 text-accent-green border-accent-green/25'
                    : 'bg-bg-elevated border border-bg-border text-text-muted hover:text-accent-green hover:border-accent-green/30'
                }`}
              >
                <Filter size={18} />
                Filters
                {(filters.available || filters.verified || filters.minScore > 0 || filters.roles.length > 0) && (
                  <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                )}
              </button>
            </div>

            {/* Filter Dropdown */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-bg-elevated border border-bg-border rounded-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Available Filter */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.available}
                      onChange={(e) => setFilters({...filters, available: e.target.checked})}
                      className="w-4 h-4 text-accent-green border-bg-border rounded focus:ring-accent-green/25"
                    />
                    <span className="text-sm text-text-primary">Available Now</span>
                  </label>

                  {/* Verified Filter */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.verified}
                      onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                      className="w-4 h-4 text-accent-green border-bg-border rounded focus:ring-accent-green/25"
                    />
                    <span className="text-sm text-text-primary">Verified Only</span>
                  </label>

                  {/* Score Filter */}
                  <div>
                    <label className="text-sm text-text-primary mb-1 block">Min Score: {filters.minScore}</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={filters.minScore}
                      onChange={(e) => setFilters({...filters, minScore: parseInt(e.target.value)})}
                      className="w-full h-2 bg-bg-border rounded-lg appearance-none cursor-pointer accent-accent-green"
                    />
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({ available: false, verified: false, minScore: 0, roles: [] })}
                      className="text-sm text-accent-green hover:underline transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="font-display font-bold text-2xl text-accent-green">{filteredCandidates.length}</p>
                <p className="text-xs text-text-dim">Total Candidates</p>
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-2xl text-accent-green">
                  {filteredCandidates.filter(c => c.available).length}
                </p>
                <p className="text-xs text-text-dim">Available Now</p>
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-2xl text-accent-green">
                  {filteredCandidates.filter(c => c.verified).length}
                </p>
                <p className="text-xs text-text-dim">Verified</p>
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-2xl text-accent-green">
                  {Math.round(filteredCandidates.reduce((acc, c) => acc + c.score, 0) / filteredCandidates.length)}
                </p>
                <p className="text-xs text-text-dim">Avg Score</p>
              </div>
            </div>
          </motion.div>

          {/* Candidates Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredCandidates.map((candidate, i) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <CandidateCard candidate={candidate} />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredCandidates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-dim text-lg mb-4">No candidates match your search.</p>
              <button
                onClick={() => setQuery('')}
                className="text-accent-green hover:underline transition-colors"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
