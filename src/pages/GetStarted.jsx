// ─── Get Started Page ───────────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, ArrowRight, Zap, Star, TrendingUp, Shield, CheckCircle } from 'lucide-react';

export default function GetStarted() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A0A',
      color: '#E5E7EB',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.3,
        backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '2rem', paddingBottom: '1.5rem', paddingHorizontal: '1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link 
            to="/" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '2rem', 
                height: '2rem', 
                backgroundColor: '#22C55E', 
                borderRadius: '0.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Zap size={16} style={{ color: '#0A0A0A', fill: '#0A0A0A' }} />
              </div>
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: '#22C55E', 
                borderRadius: '0.5rem', 
                filter: 'blur(0.5rem)', 
                opacity: 0.4 
              }} />
            </div>
            <span style={{ 
              fontFamily: "'Syne', sans-serif", 
              fontWeight: 700, 
              fontSize: '1.25rem', 
              color: '#E5E7EB' 
            }}>
              Hire<span style={{ color: '#22C55E' }}>UP</span>
            </span>
          </Link>
          
          <Link 
            to="/" 
            style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '0.875rem' }}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display font-bold text-5xl text-text-primary mb-6">
              Choose Your Path
            </h1>
            <p className="text-text-muted text-xl leading-relaxed max-w-2xl mx-auto">
              Join thousands of students finding their dream jobs and recruiters hiring top talent
            </p>
          </motion.div>

          {/* Cards Container */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(34,197,94,0.15)' }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative glass-card rounded-3xl p-8 border border-accent-green/20 hover:border-accent-green/40 transition-all duration-300">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-accent-green/20 to-accent-green/10 border-2 border-accent-green/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User size={36} className="text-accent-green" />
                </div>

                {/* Content */}
                <h2 className="font-display font-bold text-3xl text-text-primary mb-4">
                  Student / Job Seeker
                </h2>
                
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  Find your dream job with AI-powered matching, verified skill profiles, and personalized career recommendations.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    { icon: Star, text: 'AI-powered job matching' },
                    { icon: Shield, text: 'Verified skill profiles' },
                    { icon: TrendingUp, text: 'Career growth tracking' },
                    { icon: CheckCircle, text: 'Direct recruiter access' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon size={16} className="text-accent-green flex-shrink-0" />
                      <span className="text-text-muted">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link to="/student-auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
                  >
                    Sign In as Student <ArrowRight size={18} />
                  </motion.button>
                </Link>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-accent-green/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">50,000+ Students</span>
                    <span className="text-accent-green font-semibold">4.8★ Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recruiter Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(59,130,246,0.15)' }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative glass-card rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={36} className="text-blue-400" />
                </div>

                {/* Content */}
                <h2 className="font-display font-bold text-3xl text-text-primary mb-4">
                  Recruiter / Company
                </h2>
                
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  Hire top talent from leading universities with intelligent matching, streamlined interviews, and data-driven hiring decisions.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    { icon: Star, text: 'Access to 50,000+ candidates' },
                    { icon: Shield, text: 'Verified talent pool' },
                    { icon: TrendingUp, text: 'Advanced analytics' },
                    { icon: CheckCircle, text: 'AI-powered screening' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon size={16} className="text-blue-400 flex-shrink-0" />
                      <span className="text-text-muted">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link to="/recruiter-auth">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 text-lg py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-display font-bold transition-all duration-300"
                  >
                    Sign In as Recruiter <ArrowRight size={18} />
                  </motion.button>
                </Link>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-blue-500/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">1,200+ Companies</span>
                    <span className="text-blue-400 font-semibold">4.9★ Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="flex items-center justify-center gap-8 text-text-muted text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-accent-green" />
                <span>Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-accent-green" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-accent-green" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
