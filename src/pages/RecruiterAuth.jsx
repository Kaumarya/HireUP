// ─── Recruiter Authentication Page ───────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';

const CREDENTIALS = {
  email: 'aryan222@gmail.com',
  password: '222222'
};

export default function RecruiterAuth() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔐 Recruiter login attempt:', formData.email);
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (formData.email === CREDENTIALS.email && formData.password === CREDENTIALS.password) {
        console.log('✅ Recruiter credentials match');
        // Store auth state and user info
        const userName = formData.email.split('@')[0]; // Extract name from email
        localStorage.setItem('userType', 'recruiter');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', userName); // Store the actual user name
        localStorage.setItem('userEmail', formData.email);
        
        console.log('🏠 Redirecting to recruiter dashboard');
        navigate('/recruiter-dashboard');
      } else {
        console.error('❌ Invalid credentials');
        setError('Invalid credentials. Use aryan222@gmail.com / 222222');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.3,
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-bg-primary fill-bg-primary" />
            </div>
            <span className="font-display font-bold text-2xl text-text-primary">
              Hire<span className="text-blue-400">UP</span>
            </span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-text-primary mb-2">Recruiter Sign In</h1>
          <p className="text-text-muted">Access your recruiter dashboard and hire top talent</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-8 border border-blue-500/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: '#E5E7EB', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.875rem',
                    paddingBottom: '0.875rem',
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.75rem',
                    color: '#E5E7EB',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: '#E5E7EB', marginBottom: '0.5rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '3rem',
                    paddingTop: '0.875rem',
                    paddingBottom: '0.875rem',
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.75rem',
                    color: '#E5E7EB',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#6B7280',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Demo Credentials */}
            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <p className="text-xs font-display font-semibold text-blue-400 mb-2">Demo Credentials:</p>
              <p className="text-xs text-text-muted">Email: aryan222@gmail.com</p>
              <p className="text-xs text-text-muted">Password: 222222</p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              onClick={() => {
                console.log('🖱️ Recruiter button clicked directly');
                // Direct form submission
                const event = new Event('submit', { cancelable: true });
                const form = document.querySelector('form');
                if (form) {
                  form.dispatchEvent(event);
                }
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0.75rem',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1
              }}
            >
              {isLoading ? (
                <div style={{ 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  border: '2px solid #FFFFFF', 
                  borderTop: '2px solid transparent', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite' 
                }} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Don't have an account?{' '}
              <Link to="/auth/recruiter" className="text-blue-400 hover:underline font-medium">
                Sign up here
              </Link>
            </p>
            <Link to="/" className="text-sm text-text-muted hover:text-blue-400 transition-colors inline-flex items-center gap-1 mt-3">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
