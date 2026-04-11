// ─── Footer Component ─────────────────────────────────────────────────────────
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const footerLinks = {
  Product: ['Find Jobs', 'Post a Job', 'AI Matching', 'Skill Tests', 'Resume Builder'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer() {
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
      navigate('/dashboard');
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
    <footer className="bg-bg-card border-t border-bg-border mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
                  <Zap size={15} className="text-bg-primary fill-bg-primary" />
                </div>
                <div className="absolute inset-0 bg-accent-green rounded-lg blur-md opacity-40" />
              </div>
              <span className="font-display font-bold text-xl text-text-primary">
                Hire<span className="text-accent-green">UP</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-5 max-w-xs">
              The next-generation hiring platform connecting top student talent with forward-thinking companies.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <button key={i} className="w-9 h-9 bg-bg-elevated border border-bg-border rounded-lg flex items-center justify-center text-text-muted hover:text-accent-green hover:border-accent-green/40 transition-all">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-display font-semibold text-text-primary text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-text-muted text-sm hover:text-accent-green transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-bg-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-text-dim text-xs">© 2025 HireUP Technologies. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            <p className="text-text-dim text-xs">All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
