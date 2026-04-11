// ─── Landing Navbar Component ────────────────────────────────────────────────────────
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Zap } from 'lucide-react';

const navLinks = [];

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg-card/80 backdrop-blur-xl border-b border-bg-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={(e) => {
              // If we're already on the home page, scroll to top
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-accent-green rounded-md flex items-center justify-center">
                <Zap size={16} className="text-bg-primary fill-bg-primary" />
              </div>
              <div className="absolute inset-0 bg-accent-green rounded-md blur-sm opacity-50" />
            </div>
            <span className="font-display font-bold text-xl text-text-primary">
              Hire<span className="text-accent-green">UP</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/get-started" className="btn-primary text-sm py-2 px-5 flex items-center gap-1.5">
              Get Started <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-accent-green transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 bg-bg-card border border-bg-border rounded-2xl p-4 space-y-1"
            >
              <div className="pt-2 border-t border-bg-border flex flex-col gap-2">
                <Link to="/get-started" onClick={() => setMenuOpen(false)} className="btn-primary text-center text-sm">
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
