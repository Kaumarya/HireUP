// ─── CandidateCard Component ──────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, FolderOpen, Calendar } from 'lucide-react';
import { SkillBadge, TalentScore, VerifiedBadge } from './index';
import CandidateProfileModal from './CandidateProfileModal';

export default function CandidateCard({ candidate }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Generate avatar initials
  const initials = candidate.name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(34,197,94,0.12)' }}
        transition={{ duration: 0.2 }}
        className="glass-card rounded-2xl p-7 hover:border-accent-green/30 transition-all duration-300 group min-h-[320px] flex flex-col"
      >
      {/* Header Section */}
      <div className="flex items-start gap-4 mb-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-green/30 to-accent-green-dim/20 border border-accent-green/30 flex items-center justify-center font-display font-bold text-accent-green text-xl">
            {initials}
          </div>
          {candidate.available && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent-green rounded-full border-2 border-bg-card" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="font-display font-semibold text-text-primary group-hover:text-accent-green transition-colors text-xl">
              {candidate.name}
            </h3>
            {candidate.verified && <VerifiedBadge />}
          </div>
          <p className="text-text-muted text-base mb-2">{candidate.role}</p>
          <div className="flex items-center gap-1 text-text-dim text-sm">
            <MapPin size={12} />
            {candidate.location}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-bg-elevated rounded-xl p-3 flex flex-col items-center text-center">
          <FolderOpen size={16} className="text-accent-green mb-2" />
          <p className="text-xs text-text-dim mb-1">Projects</p>
          <p className="text-base font-display font-bold text-text-primary">{candidate.projects}</p>
        </div>
        <div className="bg-bg-elevated rounded-xl p-3 flex flex-col items-center text-center">
          <Calendar size={16} className="text-accent-green mb-2" />
          <p className="text-xs text-text-dim mb-1">Experience</p>
          <p className="text-base font-display font-bold text-text-primary">{candidate.experience}</p>
        </div>
        <div className="bg-bg-elevated rounded-xl p-3 flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center mb-2">
            <span className="text-accent-green font-display font-bold text-sm">⚡</span>
          </div>
          <p className="text-xs text-text-dim mb-1">Match</p>
          <p className="text-base font-display font-bold text-accent-green">{candidate.score}%</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h4 className="text-sm font-display font-semibold text-text-primary mb-3">Key Skills</h4>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 6).map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
          {candidate.skills.length > 6 && (
            <span className="text-xs text-text-muted bg-bg-elevated px-2 py-1 rounded-lg">
              +{candidate.skills.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex gap-2 pt-3 border-t border-bg-border mt-auto">
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="flex-1 btn-secondary text-xs py-2 px-3 min-w-0"
        >
          View Profile
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 btn-primary text-xs py-2 px-3 min-w-0"
        >
          Invite Interview
        </motion.button>
      </div>
    </motion.div>
    
    {/* Profile Modal */}
    <CandidateProfileModal
      candidate={candidate}
      isOpen={isProfileOpen}
      onClose={() => setIsProfileOpen(false)}
    />
    </>
  );
}
