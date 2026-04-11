// ─── JobCard Component ────────────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { MapPin, Bookmark, ExternalLink, Users } from 'lucide-react';
import { SkillBadge, MatchScore } from './index';

export default function JobCard({ job, variant = 'default' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(34,197,94,0.1)' }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-2xl p-5 hover:border-accent-green/30 transition-all duration-300 group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Company Logo */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0"
            style={{ background: `${job.companyColor}22`, border: `1px solid ${job.companyColor}40`, color: job.companyColor }}
          >
            {job.companyInitial}
          </div>
          <div>
            <h3 className="font-display font-semibold text-text-primary text-base group-hover:text-accent-green transition-colors">
              {job.title}
            </h3>
            <p className="text-text-muted text-sm">{job.company}</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-bg-elevated text-text-dim hover:text-accent-green transition-all">
          <Bookmark size={15} />
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 mb-4 text-xs text-text-muted">
        <div className="flex items-center gap-1">
          <MapPin size={11} />
          {job.location}
        </div>
        <div className="flex items-center gap-1">
          <Users size={11} />
          {job.applicants} applicants
        </div>
        <span className="ml-auto text-text-dim">{job.posted}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tags.map((tag) => (
          <SkillBadge key={tag} skill={tag} />
        ))}
        <span className={`text-xs px-2 py-0.5 rounded-md border ${
          job.remote
            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            : 'bg-text-dim/10 text-text-dim border-text-dim/20'
        }`}>
          {job.remote ? 'Remote' : 'Onsite'}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-bg-border">
        <div>
          <p className="font-display font-bold text-text-primary text-sm">{job.salary}</p>
          <p className="text-text-dim text-xs">{job.type}</p>
        </div>
        <div className="flex items-center gap-2">
          <MatchScore score={job.match} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-xs py-1.5 px-4"
          >
            Apply
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
