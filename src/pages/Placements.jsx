// ─── Placements Page ───────────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, Award } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { SectionHeader } from '../components/ui/index';
import { mockPlacements } from '../data/mockData.js';
import PlacementCard from '../components/ui/PlacementCard';

export default function Placements() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A0A',
      color: '#E5E7EB',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <Navbar />
      
      <main style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', paddingHorizontal: '1.5rem' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <Link 
              to="/" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: '#9CA3AF', 
                textDecoration: 'none',
                marginBottom: '2rem',
                transition: 'color 0.2s'
              }}
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#E5E7EB',
              marginBottom: '1.5rem'
            }}>
              Our <span style={{ color: '#22C55E' }}>Success Stories</span>
            </h1>
            <p style={{
              color: '#9CA3AF',
              fontSize: '1.25rem',
              maxWidth: '48rem',
              margin: '0 auto',
              lineHeight: 1.75
            }}>
              Discover how talented students from across the country landed their dream jobs through HireUP. 
              These are real success stories from our platform.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-accent-green mb-1">500+</div>
                <div className="text-text-muted text-sm">Placements</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-accent-green mb-1">4.8★</div>
                <div className="text-text-muted text-sm">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-accent-green mb-1">50+</div>
                <div className="text-text-muted text-sm">Companies</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-accent-green mb-1">95%</div>
                <div className="text-text-muted text-sm">Success Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 mb-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-accent-green/10 text-accent-green border border-accent-green/30 rounded-lg text-sm font-medium transition-all hover:bg-accent-green/20">
                  All Companies
                </button>
                <button className="px-4 py-2 bg-bg-elevated text-text-muted border border-bg-border rounded-lg text-sm font-medium transition-all hover:text-text-primary hover:bg-bg-card">
                  Google
                </button>
                <button className="px-4 py-2 bg-bg-elevated text-text-muted border border-bg-border rounded-lg text-sm font-medium transition-all hover:text-text-primary hover:bg-bg-card">
                  Microsoft
                </button>
                <button className="px-4 py-2 bg-bg-elevated text-text-muted border border-bg-border rounded-lg text-sm font-medium transition-all hover:text-text-primary hover:bg-bg-card">
                  NVIDIA
                </button>
                <button className="px-4 py-2 bg-bg-elevated text-text-muted border border-bg-border rounded-lg text-sm font-medium transition-all hover:text-text-primary hover:bg-bg-card">
                  More...
                </button>
              </div>
              <div className="text-text-muted text-sm">
                Showing <span className="text-text-primary font-semibold">{mockPlacements.length}</span> placements
              </div>
            </div>
          </motion.div>

          {/* Placements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPlacements.map((placement, i) => (
              <motion.div
                key={placement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <PlacementCard placement={placement} />
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <button className="btn-secondary px-8 py-4 text-base">
              Load More Success Stories
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
