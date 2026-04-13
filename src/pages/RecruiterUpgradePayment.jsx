// ─── Recruiter Upgrade Payment Page ───────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Crown, Zap, Star, Shield, Building, Users, Briefcase, Headphones } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function RecruiterUpgradePayment() {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const plan = searchParams.get('plan') || 'starter';
  const upgradeCode = searchParams.get('code') || '';

  const planDetails = {
    starter: {
      name: 'Starter Plan',
      price: '₹1,999/month',
      color: '#6B7280',
      icon: Building,
      features: [
        'Up to 3 active job postings',
        'Basic candidate search',
        'Applicant tracking system',
        'Email support',
        'Company profile page',
        'Basic analytics dashboard'
      ]
    },
    professional: {
      name: 'Professional Plan',
      price: '₹4,999/month',
      color: '#22C55E',
      icon: Users,
      features: [
        'Up to 10 active job postings',
        'Advanced candidate search & filters',
        'AI-powered candidate matching',
        'Priority email & chat support',
        'Enhanced company branding',
        'Advanced analytics & reports',
        'Team collaboration tools',
        'Custom application forms'
      ]
    },
    business: {
      name: 'Business Plan',
      price: '₹9,999/month',
      color: '#3B82F6',
      icon: Briefcase,
      features: [
        'Unlimited job postings',
        'Premium AI matching algorithms',
        'Dedicated account manager',
        'Priority phone & email support',
        'Advanced company branding',
        'Custom analytics dashboards',
        'Advanced team collaboration',
        'ATS integrations',
        'Background check integration',
        'Custom workflows'
      ]
    },
    enterprise: {
      name: 'Enterprise Plan',
      price: 'Custom',
      color: '#8B5CF6',
      icon: Crown,
      features: [
        'Everything in Business, plus:',
        'White-label recruitment platform',
        'Custom API development',
        'On-premise deployment option',
        'Dedicated success team',
        'Custom security & compliance',
        'Advanced reporting & BI',
        'Multi-tenant architecture',
        'Custom integrations',
        'SLA guarantees',
        'Training & onboarding',
        '24/7 premium support'
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
      // Get current recruiter data
      const recruiterEmail = localStorage.getItem('recruiterEmail');
      const currentPlan = localStorage.getItem('recruiterPlan') || 'free';

      // Update recruiter plan and features
      localStorage.setItem('recruiterPlan', plan);
      localStorage.setItem('recruiterUpgradedAt', new Date().toISOString());
      localStorage.setItem('recruiterFeatures', JSON.stringify(currentPlan.features));

      // Update recruiter profile with new features
      const recruiterProfile = JSON.parse(localStorage.getItem('recruiterProfile') || '{}');
      recruiterProfile.plan = plan;
      recruiterProfile.features = currentPlan.features;
      recruiterProfile.upgraded = true;
      localStorage.setItem('recruiterProfile', JSON.stringify(recruiterProfile));

      setIsProcessing(false);
      setIsSuccess(true);

      // Redirect to recruiter dashboard after 2 seconds
      setTimeout(() => {
        navigate('/recruiter-dashboard');
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
      <Navbar />

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
              to="/recruiter-pricing" 
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
                  Activate Upgrade
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
