// ─── Recruiter Pricing Plans Page ───────────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Star, Zap, Crown, Building, Users, Briefcase, BarChart3, Shield, Headphones, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function RecruiterPricing() {
  const plans = [
    {
      name: 'Starter',
      period: 'Monthly',
      price: '₹1,999',
      description: 'Perfect for small businesses and startups',
      icon: Building,
      color: '#6B7280',
      features: [
        'Up to 3 active job postings',
        'Basic candidate search',
        'Applicant tracking system',
        'Email support',
        'Company profile page',
        'Basic analytics dashboard'
      ],
      notIncluded: [
        'Advanced AI matching',
        'Priority support',
        'Custom branding',
        'Team collaboration',
        'API access'
      ],
      popular: false,
      buttonText: 'Choose Plan'
    },
    {
      name: 'Professional',
      period: 'Monthly',
      price: '₹4,999',
      description: 'Ideal for growing companies',
      icon: Users,
      color: '#22C55E',
      features: [
        'Up to 10 active job postings',
        'Advanced candidate search & filters',
        'AI-powered candidate matching',
        'Priority email & chat support',
        'Enhanced company branding',
        'Advanced analytics & reports',
        'Team collaboration tools',
        'Custom application forms'
      ],
      notIncluded: [
        'Dedicated account manager',
        'White-label solutions',
        'Custom integrations',
        'Advanced security features'
      ],
      popular: true,
      buttonText: 'Most Popular'
    },
    {
      name: 'Business',
      period: 'Monthly',
      price: '₹9,999',
      description: 'Best for medium to large enterprises',
      icon: Briefcase,
      color: '#3B82F6',
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
      ],
      notIncluded: [
        'White-label platform',
        'Custom API development',
        'On-premise deployment'
      ],
      popular: false,
      buttonText: 'Scale Up'
    },
    {
      name: 'Enterprise',
      period: 'Custom',
      price: 'Custom',
      description: 'Tailored solutions for large organizations',
      icon: Crown,
      color: '#8B5CF6',
      features: [
        'Everything in Business',
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
      ],
      notIncluded: [],
      popular: false,
      buttonText: 'Contact Sales'
    }
  ];

  const handleUpgrade = (planName) => {
    // Handle upgrade logic here
    console.log(`Upgrading to ${planName} plan`);
    
    // Navigate to appropriate payment page based on plan
    switch (planName) {
      case 'Starter':
        window.location.href = '/recruiter-upgrade-payment?plan=starter&code=111111';
        break;
      case 'Professional':
        window.location.href = '/recruiter-upgrade-payment?plan=professional&code=111111';
        break;
      case 'Business':
        window.location.href = '/recruiter-upgrade-payment?plan=business&code=111111';
        break;
      case 'Enterprise':
        window.location.href = '/recruiter-upgrade-payment?plan=enterprise&code=111111';
        break;
      default:
        console.log('Unknown plan:', planName);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Link 
              to="/recruiter-dashboard" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            
            <div className="mb-8">
              <h1 className="font-display font-bold text-4xl text-text-primary mb-4">
                Recruiter Pricing Plans
              </h1>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                Powerful recruitment solutions designed to help you find the perfect candidates faster
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-accent-green" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-accent-green" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-accent-green" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative glass-card rounded-2xl p-6 hover:border-accent-green/30 transition-all ${
                    plan.popular ? 'ring-2 ring-accent-green/50 shadow-glow-md' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-accent-green text-bg-primary px-3 py-1 rounded-full text-xs font-display font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                         style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}30` }}>
                      <Icon size={24} style={{ color: plan.color }} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-text-muted text-sm mb-4">{plan.description}</p>
                    
                    <div className="mb-2">
                      <span className="font-display font-bold text-3xl text-text-primary">{plan.price}</span>
                      <span className="text-text-muted text-sm ml-1">/{plan.period.toLowerCase()}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check size={16} className="text-accent-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-primary">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 opacity-50">
                        <X size={16} className="text-text-dim flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-muted">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleUpgrade(plan.name)}
                    className={`w-full py-3 rounded-xl font-display font-semibold transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-accent-green text-bg-primary hover:bg-accent-green/90 shadow-glow-sm'
                        : plan.name === 'Starter'
                        ? 'bg-bg-elevated border border-bg-border text-text-primary hover:border-accent-green/30 hover:text-accent-green'
                        : 'bg-bg-elevated border border-bg-border text-text-primary hover:border-accent-green/30 hover:text-accent-green'
                    }`}
                  >
                    {plan.buttonText}
                    {plan.name !== 'Enterprise' && <ArrowRight size={16} />}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-bg-card rounded-2xl border border-bg-border p-8 mb-16"
          >
            <h2 className="text-2xl font-display font-bold text-text-primary mb-8 text-center">
              Why Choose HireUP for Recruiters?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} className="text-accent-green" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">AI-Powered Matching</h3>
                <p className="text-sm text-text-muted">Advanced algorithms that find the perfect candidates for your roles 10x faster</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 size={24} className="text-accent-green" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">Advanced Analytics</h3>
                <p className="text-sm text-text-muted">Deep insights into your recruitment funnel and hiring performance</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-accent-green" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">Enterprise Security</h3>
                <p className="text-sm text-text-muted">Bank-level security and compliance with data protection regulations</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center bg-gradient-to-r from-accent-green/10 to-emerald-600/10 rounded-2xl p-8 border border-accent-green/20"
          >
            <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
              Ready to Transform Your Recruitment?
            </h2>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              Join thousands of companies that have reduced their time-to-hire by 60% with HireUP
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-accent-green text-bg-primary px-6 py-3 rounded-xl font-display font-semibold hover:bg-accent-green/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-bg-elevated border border-bg-border text-text-primary px-6 py-3 rounded-xl font-display font-semibold hover:bg-bg-border transition-all duration-200"
              >
                <Headphones size={16} />
                Talk to Sales
              </button>
            </div>
            <p className="text-xs text-text-muted mt-3">No credit card required • 14-day free trial • Cancel anytime</p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
