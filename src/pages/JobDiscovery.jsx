// ─── Job Discovery Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, X, ChevronDown } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import JobCard from '../components/ui/JobCard';
import { mockJobs } from '../data/mockData.js';

const locations = ['All Locations', 'Bangalore', 'Delhi', 'Mumbai', 'Hyderabad', 'Pune', 'Remote'];
const jobTypes = ['All', 'Full-time', 'Internship', 'Part-time', 'Contract'];
const experienceLevels = ['Any', 'Fresher', '1-2 years', '3-5 years', '5+ years'];

function FilterSection({ title, options, selected, onChange }) {
  return (
    <div className="mb-5">
      <p className="text-xs font-display font-semibold text-text-muted uppercase tracking-wider mb-2.5">{title}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${
              selected === opt
                ? 'bg-accent-green/10 text-accent-green border border-accent-green/25'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function JobDiscovery() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [jobType, setJobType] = useState('All');
  const [experience, setExperience] = useState('Any');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = mockJobs.filter((job) => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = location === 'All Locations' || job.location === location || (location === 'Remote' && job.remote);
    const matchType = jobType === 'All' || job.type === jobType;
    const matchRemote = !remoteOnly || job.remote;
    return matchSearch && matchLocation && matchType && matchRemote;
  });

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-60 p-6 pt-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="font-display font-bold text-2xl text-text-primary mb-1">Job Discovery</h1>
          <p className="text-text-muted text-sm">AI-matched opportunities for your profile · <span className="text-accent-green">{filteredJobs.length} results</span></p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-3 bg-bg-card border border-bg-border rounded-xl px-4 py-3 focus-within:border-accent-green/50 focus-within:shadow-glow-sm transition-all">
            <Search size={16} className="text-text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder="Search jobs, companies, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-text-primary text-sm placeholder-text-dim outline-none font-body"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-text-dim hover:text-text-muted">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`md:hidden flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-body transition-all ${
              showFilters ? 'bg-accent-green/10 border-accent-green/30 text-accent-green' : 'bg-bg-card border-bg-border text-text-muted'
            }`}
          >
            <Filter size={15} />
          </button>
        </div>

        <div className="flex gap-6">
          {/* ── Filters Panel ──────────────────────────── */}
          <aside className={`flex-shrink-0 w-56 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="glass-card rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-semibold text-text-primary text-sm">Filters</p>
                <button
                  onClick={() => { setLocation('All Locations'); setJobType('All'); setExperience('Any'); setRemoteOnly(false); }}
                  className="text-xs text-accent-green hover:underline"
                >
                  Reset
                </button>
              </div>

              <FilterSection title="Location" options={locations} selected={location} onChange={setLocation} />
              <FilterSection title="Job Type" options={jobTypes} selected={jobType} onChange={setJobType} />
              <FilterSection title="Experience" options={experienceLevels} selected={experience} onChange={setExperience} />

              {/* Remote toggle */}
              <div className="flex items-center justify-between py-2 mb-4">
                <span className="text-sm text-text-muted">Remote Only</span>
                <button
                  onClick={() => setRemoteOnly(!remoteOnly)}
                  className={`w-10 h-5 rounded-full transition-all relative ${remoteOnly ? 'bg-accent-green' : 'bg-bg-border'}`}
                >
                  <motion.div
                    animate={{ x: remoteOnly ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="w-4 h-4 bg-white rounded-full absolute top-0.5"
                  />
                </button>
              </div>

              {/* Salary range */}
              <div className="mb-4">
                <p className="text-xs font-display font-semibold text-text-muted uppercase tracking-wider mb-2.5">Salary Range</p>
                <input
                  type="range"
                  min="0" max="50" defaultValue="40"
                  className="w-full accent-[#22C55E] bg-bg-border rounded-lg"
                />
                <div className="flex justify-between text-xs text-text-dim mt-1">
                  <span>₹0</span>
                  <span>₹50 LPA</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Jobs Grid ──────────────────────────────── */}
          <div className="flex-1">
            {filteredJobs.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid sm:grid-cols-2 xl:grid-cols-2 gap-5"
              >
                {filteredJobs.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-bg-card rounded-2xl flex items-center justify-center mb-4 border border-bg-border">
                  <Search size={24} className="text-text-dim" />
                </div>
                <p className="font-display font-semibold text-text-primary mb-2">No jobs found</p>
                <p className="text-text-muted text-sm">Try adjusting your filters or search term</p>
                <button onClick={() => { setSearch(''); setLocation('All Locations'); setJobType('All'); setRemoteOnly(false); }} className="mt-4 btn-secondary text-sm">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
