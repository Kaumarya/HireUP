// ─── Upgrade Payment Page ───────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Crown, Zap, Star, Shield } from 'lucide-react';
import LandingNavbar from '../components/layout/LandingNavbar';
import Footer from '../components/layout/Footer';

export default function UpgradePayment() {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const plan = searchParams.get('plan') || 'basic';
  const upgradeCode = searchParams.get('code') || '';

  const planDetails = {
    basic: {
      name: 'Basic Plan',
      price: '₹0',
      color: '#22C55E',
      features: ['5 job applications per month', 'Basic profile visibility', 'AI job matching limited', 'Resume builder basic', 'Email support']
    },
    pro: {
      name: 'Pro Plan',
      price: '₹299/month',
      color: '#3B82F6',
      features: [
        'Unlimited job applications',
        'Enhanced profile visibility',
        'Advanced AI job matching',
        'Professional resume builder',
        'Interview preparation tools',
        'Salary insights & benchmarks',
        'Priority email support',
        'Skill assessment tests'
      ]
    },
    premium: {
      name: 'Premium Plan',
      price: '₹2,999/year',
      color: '#F59E0B',
      features: [
        'Everything in Pro, plus:',
        '1-on-1 career coaching (2 sessions)',
        'Premium profile features',
        'LinkedIn profile optimization',
        'Negotiation training',
        'Priority customer support',
        'Career progression tracking',
        'Exclusive job opportunities',
        'Guaranteed interviews'
      ]
    }
  };

  const currentPlan = planDetails[plan];

  const handleUpgrade = () => {
    if (upgradeCode !== '111111') {
      alert('Invalid upgrade code. Please use code: 111111');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Get current student data
      const studentEmail = localStorage.getItem('userEmail');
      const currentPlan = localStorage.getItem('studentPlan') || 'free';

      // Update student plan and features
      localStorage.setItem('studentPlan', plan);
      localStorage.setItem('studentUpgradedAt', new Date().toISOString());
      localStorage.setItem('studentFeatures', JSON.stringify(currentPlan.features));

      // Update student profile with new features
      const studentProfile = JSON.parse(localStorage.getItem('studentProfile') || '{}');
      studentProfile.plan = plan;
      studentProfile.features = currentPlan.features;
      studentProfile.upgraded = true;
      localStorage.setItem('studentProfile', JSON.stringify(studentProfile));

      setIsProcessing(false);
      setIsSuccess(true);

      // Redirect to student dashboard after 2 seconds
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0A0A0A',
        color: '#E5E7EB',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', maxWidth: '400px' }}
        >
          <div style={{
            width: '5rem',
            height: '5rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <CheckCircle size={40} style={{ color: '#FFFFFF' }} />
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#E5E7EB',
            marginBottom: '1rem'
          }}>
            Upgrade Successful!
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1rem', lineHeight: 1.5, marginBottom: '1rem' }}>
            You have successfully upgraded to the <span style={{ color: currentPlan.color, fontWeight: 600 }}>{currentPlan.name}</span>.
          </p>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.5 }}>
            Redirecting to your dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-body">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        {/* Background orbs */}
        <div className="absolute w-96 h-96 bg-accent-green/5 rounded-full -top-24 -left-20 opacity-60" />
        <div className="absolute w-80 h-80 bg-accent-green/3 rounded-full -top-8 right-0 opacity-40" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30 bg-grid-pattern" />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <Link 
              to="/pricing" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm mb-8"
            >
              <ArrowLeft size={20} />
              Back to Plans
            </Link>

            <div className="text-center">
              <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-accent-green to-accent-green-light bg-clip-text text-transparent">
                Upgrade to {currentPlan.name}
              </h1>
            </div>

                      </motion.div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg mx-auto"
          >
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h3 className="font-display font-semibold text-text-primary text-xl mb-6 text-center">
                Payment Details
              </h3>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-muted">Plan:</span>
                  <span className="text-text-primary font-semibold">{currentPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Price:</span>
                  <span className="text-accent-green font-semibold">{currentPlan.price}</span>
                </div>
              </div>

              <div className="border-t border-bg-border pt-6 mt-6">
                <h4 className="font-display font-semibold text-text-base mb-4">
                  Features You'll Unlock:
                </h4>
                <div className="flex flex-col gap-3">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-accent-green flex-shrink-0" />
                      <span className="text-text-muted text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleUpgrade}
              disabled={isProcessing}
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-semibold transition-all duration-200 ${
                isProcessing 
                  ? 'bg-text-dim cursor-not-allowed' 
                  : 'bg-accent-green text-bg-primary hover:bg-accent-green/90 shadow-glow-sm'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Activate Upgrade - Free
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
