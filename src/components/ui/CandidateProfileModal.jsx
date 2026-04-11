// ─── Candidate Profile Modal Component ─────────────────────────────────────────────
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Mail, Phone, Calendar, FolderOpen, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import { SkillBadge, TalentScore, VerifiedBadge } from './index';

export default function CandidateProfileModal({ 
  candidate, 
  isOpen, 
  onClose 
}) {
  if (!isOpen || !candidate) return null;

  const initials = candidate.name.split(' ').map(n => n[0]).join('');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative glass-card rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              console.log('Close button clicked!');
              onClose();
            }}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-bg-elevated border border-bg-border flex items-center justify-center hover:bg-bg-hover transition-colors z-10"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-text-muted"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>

          {/* Header Section */}
          <div className="flex items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-green/30 to-accent-green-dim/20 border border-accent-green/30 flex items-center justify-center font-display font-bold text-accent-green text-3xl">
                {initials}
              </div>
              {candidate.available && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-green rounded-full border-3 border-bg-card" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <h2 className="font-display font-bold text-3xl text-text-primary">
                  {candidate.name}
                </h2>
                {candidate.verified && <VerifiedBadge />}
              </div>
              <p className="text-text-muted text-lg mb-3">{candidate.role}</p>
              <div className="flex items-center gap-4 text-text-dim">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {candidate.email || 'contact@example.com'}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {candidate.phone || '+1 234 567 8900'}
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              <TalentScore score={candidate.score} size="large" />
              <p className="text-sm text-text-muted mt-2">Match Score</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-bg-elevated rounded-2xl p-4 text-center">
              <FolderOpen size={24} className="text-accent-green mx-auto mb-2" />
              <p className="text-sm text-text-dim mb-1">Projects</p>
              <p className="text-xl font-display font-bold text-text-primary">{candidate.projects}</p>
            </div>
            <div className="bg-bg-elevated rounded-2xl p-4 text-center">
              <Calendar size={24} className="text-accent-green mx-auto mb-2" />
              <p className="text-sm text-text-dim mb-1">Experience</p>
              <p className="text-xl font-display font-bold text-text-primary">{candidate.experience}</p>
            </div>
            <div className="bg-bg-elevated rounded-2xl p-4 text-center">
              <Briefcase size={24} className="text-accent-green mx-auto mb-2" />
              <p className="text-sm text-text-dim mb-1">Position</p>
              <p className="text-xl font-display font-bold text-text-primary">{candidate.level || 'Senior'}</p>
            </div>
            <div className="bg-bg-elevated rounded-2xl p-4 text-center">
              <Award size={24} className="text-accent-green mx-auto mb-2" />
              <p className="text-sm text-text-dim mb-1">Rating</p>
              <div className="flex items-center justify-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <p className="text-xl font-display font-bold text-text-primary">{candidate.rating || '4.8'}</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h3 className="font-display font-semibold text-xl text-text-primary mb-4">About</h3>
            <p className="text-text-muted leading-relaxed">
              {candidate.bio || `Experienced ${candidate.role} with a passion for creating innovative solutions. 
              Proven track record of delivering high-quality projects and collaborating effectively with cross-functional teams. 
              Strong problem-solving skills and commitment to continuous learning and professional development.`}
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="font-display font-semibold text-xl text-text-primary mb-4">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {candidate.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="font-display font-semibold text-xl text-text-primary mb-4">Experience</h3>
            <div className="space-y-4">
              {candidate.experienceDetails?.map((exp, index) => (
                <div key={index} className="bg-bg-elevated rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-display font-semibold text-text-primary">{exp.position}</h4>
                    <span className="text-sm text-text-muted">{exp.duration}</span>
                  </div>
                  <p className="text-accent-green mb-2">{exp.company}</p>
                  <p className="text-text-muted text-sm">{exp.description}</p>
                </div>
              )) || (
                <div className="bg-bg-elevated rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-display font-semibold text-text-primary">Senior {candidate.role}</h4>
                    <span className="text-sm text-text-muted">2020 - Present</span>
                  </div>
                  <p className="text-accent-green mb-2">Tech Company Inc.</p>
                  <p className="text-text-muted text-sm">
                    Leading development of scalable applications and mentoring junior developers.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="font-display font-semibold text-xl text-text-primary mb-4">Education</h3>
            <div className="bg-bg-elevated rounded-2xl p-5">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-display font-semibold text-text-primary">
                  {candidate.education?.degree || 'Bachelor of Science in Computer Science'}
                </h4>
                <span className="text-sm text-text-muted">{candidate.education?.year || '2016 - 2020'}</span>
              </div>
              <p className="text-accent-green mb-2">{candidate.education?.university || 'Tech University'}</p>
              <p className="text-text-muted text-sm">
                {candidate.education?.description || 'Graduated with honors. Specialized in software engineering and data structures.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-bg-border">
            <button
              onClick={onClose}
              className="flex-1 btn-secondary py-3 px-6"
            >
              Close Profile
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 btn-primary py-3 px-6"
            >
              Invite Interview
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
