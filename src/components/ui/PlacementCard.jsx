// ─── PlacementCard Component ────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { MapPin, Star, ExternalLink } from 'lucide-react';

export default function PlacementCard({ placement }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(34,197,94,0.15)' }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-2xl p-6 hover:border-accent-green/30 transition-all duration-300 group cursor-pointer min-h-[320px] flex flex-col flex-1"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0"
            style={{ 
              background: placement.companyColor || '#4285F4',
              border: `1px solid ${placement.companyColor || '#4285F4'}30`
            }}
          >
            {placement.companyInitial}
          </div>
          <div>
            <h3 className="font-display font-semibold text-text-primary text-base group-hover:text-accent-green transition-colors">
              {placement.role}
            </h3>
            <p className="text-text-muted text-sm">{placement.company}</p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={`${i < Math.floor(placement.rating) ? 'fill-accent-green text-accent-green' : 'text-text-dim'} transition-colors`}
            />
          ))}
        </div>
      </div>

      {/* Student Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-green/20 to-accent-green/10 flex items-center justify-center">
            <span className="text-accent-green font-display font-bold text-sm">
              {placement.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-display font-semibold text-text-primary">{placement.studentName}</p>
            <p className="text-text-muted text-sm">{placement.role}</p>
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-2 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{placement.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary">Salary:</span>
            <span>{placement.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary">Placed:</span>
            <span>{placement.placedDate}</span>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="border-t border-accent-green/20 pt-4">
        <p className="text-xs text-text-dim italic mb-2">Company Review</p>
        <p className="text-sm text-text-muted leading-relaxed">"{placement.review}"</p>
      </div>

      {/* Action */}
      <div className="flex items-center gap-2 pt-2">
        <button className="text-accent-green text-sm font-display font-semibold hover:underline transition-colors">
          View Profile
        </button>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={10} 
              className="fill-accent-green text-accent-green"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
