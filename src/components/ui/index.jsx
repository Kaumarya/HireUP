// ─── Reusable UI Components ───────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { ShieldCheck, Star, TrendingUp } from 'lucide-react';

// SkillBadge
export function SkillBadge({ skill, size = 'sm' }) {
  return (
    <span className={`tag inline-flex items-center ${size === 'lg' ? 'text-sm px-3 py-1' : ''}`}>
      {skill}
    </span>
  );
}

// TalentScore
export function TalentScore({ score, size = 'md' }) {
  const radius = size === 'lg' ? 36 : 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const dim = size === 'lg' ? 88 : 70;

  return (
    <div className="relative flex items-center justify-center" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={radius} fill="none" stroke="#1F1F1F" strokeWidth="4" />
        <motion.circle
          cx={dim / 2} cy={dim / 2} r={radius}
          fill="none"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.6))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
        <span className={`font-display font-bold text-accent-green ${size === 'lg' ? 'text-base' : 'text-[10px]'} leading-none`}>{score}</span>
        {size === 'lg' && <span className="text-[9px] text-text-muted leading-none mt-0.5">Score</span>}
      </div>
    </div>
  );
}

// ProgressBar
export function ProgressBar({ value, label, color = '#22C55E' }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-text-muted">{label}</span>
        <span className="text-sm font-display font-semibold text-text-primary">{value}%</span>
      </div>
      <div className="h-1.5 bg-bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// StatusBadge
export function StatusBadge({ status }) {
  const styles = {
    Applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Interview: 'bg-accent-green/10 text-accent-green border-accent-green/20',
    Shortlisted: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
  };
  return (
    <span className={`text-xs font-body border px-2.5 py-1 rounded-full ${styles[status] || styles.Applied}`}>
      {status}
    </span>
  );
}

// VerifiedBadge
export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-accent-green/10 text-accent-green border border-accent-green/20 px-2 py-0.5 rounded-full">
      <ShieldCheck size={11} />
      Verified
    </span>
  );
}

// MatchScore
export function MatchScore({ score }) {
  const color = score >= 85 ? '#22C55E' : score >= 70 ? '#F59E0B' : '#9CA3AF';
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="text-xs font-display font-bold px-2 py-0.5 rounded"
        style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}
      >
        {score}% match
      </div>
    </div>
  );
}

// SectionHeader
export function SectionHeader({ eyebrow, title, subtitle, centered = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <div className="w-4 h-px bg-accent-green" />
          <span className="text-accent-green text-xs font-display font-semibold tracking-widest uppercase">{eyebrow}</span>
          <div className="w-4 h-px bg-accent-green" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-lg max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
