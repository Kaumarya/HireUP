// ─── Premium Plan Page ───────────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star, Zap, Shield, Users, Crown, TrendingUp, BarChart2, Sparkles, Award } from 'lucide-react';
import LandingNavbar from '../components/layout/LandingNavbar';
import Footer from '../components/layout/Footer';

export default function PremiumPlan() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A0A',
      color: '#E5E7EB',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <LandingNavbar />

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '4rem', paddingHorizontal: '1.5rem' }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute',
          width: '24rem',
          height: '24rem',
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-6rem',
          left: '-5rem',
          opacity: 0.6
        }} />
        <div style={{
          position: 'absolute',
          width: '20rem',
          height: '20rem',
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-2rem',
          right: 0,
          opacity: 0.4
        }} />

        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.3,
            backgroundImage: 'linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <Link 
              to="/student-dashboard" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: '#9CA3AF', 
                textDecoration: 'none',
                fontSize: '0.875rem',
                marginBottom: '2rem'
              }}
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>

            <div style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 50%, #EF4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#E5E7EB',
              lineHeight: 1.05,
              marginBottom: '1.5rem'
            }}>
              Premium Plan
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                color: '#9CA3AF', 
                fontSize: '1.125rem', 
                lineHeight: 1.75,
                maxWidth: '48rem',
                margin: '0 auto 2rem'
              }}
            >
              The ultimate career acceleration package. Get everything you need to land your dream job with exclusive premium features.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '2rem',
              color: '#E5E7EB',
              marginBottom: '1rem'
            }}>
              Elite Features
            </h2>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                icon: CheckCircle,
                title: 'Everything in Pro +',
                description: 'All Pro features included',
                color: '#F59E0B'
              },
              {
                icon: Sparkles,
                title: 'AI Resume Builder',
                description: 'AI-powered resume optimization',
                color: '#8B5CF6'
              },
              {
                icon: TrendingUp,
                title: 'Interview Coaching',
                description: '1-on-1 interview preparation sessions',
                color: '#3B82F6'
              },
              {
                icon: BarChart2,
                title: 'Career Insights',
                description: 'Advanced career path analytics',
                color: '#22C55E'
              },
              {
                icon: Award,
                title: 'Certification Prep',
                description: 'Premium certification preparation tools',
                color: '#10B981'
              },
              {
                icon: Crown,
                title: 'Exclusive Opportunities',
                description: 'Access to exclusive job opportunities',
                color: '#6366F1'
              },
              {
                icon: Shield,
                title: 'Guaranteed Interviews',
                description: 'Guaranteed interview opportunities',
                color: '#EF4444'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '1rem',
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  background: `${feature.color}15`,
                  border: `1px solid ${feature.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  color: '#E5E7EB',
                  marginBottom: '0.5rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Link 
              to="/upgrade-payment?plan=premium&code=111111"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 50%, #EF4444 100%)',
                color: '#FFFFFF',
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(245,158,11,0.3)'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(245,158,11,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Award size={20} />
              Upgrade to Premium - Free
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
