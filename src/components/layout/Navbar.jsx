// ─── Navbar Component ─────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X, Bell, Settings, LogOut, ChevronRight } from 'lucide-react';
import { navLinks } from '../../data/mockData';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    const userType = localStorage.getItem('userType');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (location.pathname === '/') {
      // On landing page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isAuthenticated && userType === 'student') {
      // Student side, go to dashboard
      navigate('/student-dashboard');
    } else if (isAuthenticated && userType === 'recruiter') {
      // Recruiter side, go to recruiter dashboard
      navigate('/recruiter-dashboard');
    } else {
      // Not authenticated or other cases, go to landing page
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-bg-card/80 backdrop-blur-md border border-bg-border rounded-2xl px-8 py-4">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all">
              <Zap size={16} className="text-bg-primary fill-bg-primary" />
            </div>
            <div className="absolute inset-0 bg-accent-green rounded-lg blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
          </div>
          <span className="font-display font-bold text-xl text-text-primary">
            Hire<span className="text-accent-green">UP</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                location.pathname === link.href
                  ? 'text-accent-green bg-accent-green/10'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
              }`}
            >
              {link.label}
            </Link>
          ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-all"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
