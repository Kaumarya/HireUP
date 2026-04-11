// ─── Student Authentication Page ────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Zap } from 'lucide-react';
import { getStudentProfile, getStudentFullName } from '../data/studentProfiles';

const CREDENTIALS = {
  email: 'aryan111@gmail.com',
  password: '111111'
};

export default function StudentAuth() {
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
    console.log('🔐 Student login form submitted!');
    console.log('📧 Email:', formData.email);
    console.log('🔑 Password:', formData.password);
    
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (formData.email === CREDENTIALS.email && formData.password === CREDENTIALS.password) {
        console.log('✅ Student credentials match');
        // Get student profile
        const studentProfile = getStudentProfile(formData.email);
        
        if (studentProfile) {
          console.log('👤 Student profile found:', studentProfile);
          // Store complete student info
          localStorage.setItem('userType', 'student');
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
          localStorage.setItem('studentName', `${studentProfile.firstName} ${studentProfile.lastName}`);
          
          console.log('🏠 Redirecting to student dashboard');
          navigate('/student-dashboard');
        } else {
          console.error('❌ Student profile not found');
          setError('Student profile not found');
        }
      } else {
        console.error('❌ Invalid credentials');
        setError('Invalid credentials. Use aryan111@gmail.com / 111111');
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
        backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '28rem' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link 
            to="/" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', textDecoration: 'none', color: 'inherit' }}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div style={{ 
              width: '2.5rem', 
              height: '2.5rem', 
              backgroundColor: '#22C55E', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Zap size={20} style={{ color: '#0A0A0A', fill: '#0A0A0A' }} />
            </div>
            <span style={{ 
              fontFamily: "'Syne', sans-serif", 
              fontWeight: 700, 
              fontSize: '1.5rem', 
              color: '#E5E7EB' 
            }}>
              Hire<span style={{ color: '#22C55E' }}>UP</span>
            </span>
          </Link>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '1.875rem',
            color: '#E5E7EB',
            marginBottom: '0.5rem'
          }}>Student Sign In</h1>
          <p style={{ color: '#9CA3AF' }}>Access your student dashboard and find opportunities</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                  type={showPassword ? "text" : "password"}
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
            <div className="p-4 bg-accent-green/5 border border-accent-green/20 rounded-xl">
              <p className="text-xs font-display font-semibold text-accent-green mb-2">Demo Credentials:</p>
              <p className="text-xs text-text-muted">Email: aryan111@gmail.com</p>
              <p className="text-xs text-text-muted">Password: 111111</p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              onClick={() => {
                console.log('🖱️ Button clicked directly');
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
                backgroundColor: '#22C55E',
                color: '#0A0A0A',
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
                  border: '2px solid #0A0A0A', 
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
              <Link to="/auth/student" className="text-accent-green hover:underline font-medium">
                Sign up here
              </Link>
            </p>
            <Link to="/" className="text-sm text-text-muted hover:text-accent-green transition-colors inline-flex items-center gap-1 mt-3">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
