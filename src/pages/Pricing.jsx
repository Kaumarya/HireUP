// ─── Pricing Plans Page ───────────────────────────────────────────────────────
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Star, Zap, Crown, Sparkles, ArrowRight, Search, Shield, Award } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      period: 'Free',
      price: '₹0',
      description: 'Perfect for getting started',
      icon: Sparkles,
      color: '#6B7280',
      features: [
        '5 job applications per month',
        'Basic profile visibility',
        'AI job matching (limited)',
        'Resume builder (basic)',
        'Email support'
      ],
      notIncluded: [
        'Priority visibility',
        'Advanced AI features',
        'Interview preparation',
        'Salary insights'
      ],
      popular: false,
      buttonText: 'Current Plan'
    },
    {
      name: 'Professional',
      period: 'Monthly',
      price: '₹299',
      description: 'Most popular for active job seekers',
      icon: Zap,
      color: '#22C55E',
      features: [
        'Unlimited job applications',
        'Enhanced profile visibility',
        'Advanced AI job matching',
        'Professional resume builder',
        'Interview preparation tools',
        'Salary insights & benchmarks',
        'Priority email support',
        'Skill assessment tests'
      ],
      notIncluded: [
        '1-on-1 career coaching',
        'Premium profile features'
      ],
      popular: true,
      buttonText: 'Upgrade Now'
    },
    {
      name: 'Career Pro',
      period: 'Yearly',
      price: '₹2,999',
      originalPrice: '₹3,588',
      description: 'Best value for serious career growth',
      icon: Crown,
      color: '#3B82F6',
      features: [
        'Everything in Professional',
        '1-on-1 career coaching (2 sessions)',
        'Premium profile features',
        'LinkedIn profile optimization',
        'Negotiation training',
        'Priority customer support',
        'Career progression tracking',
        'Exclusive job opportunities'
      ],
      notIncluded: [],
      popular: false,
      buttonText: 'Best Value'
    },
    {
      name: 'Lifetime',
      period: 'One-time',
      price: '₹9,999',
      originalPrice: '₹35,880',
      description: 'Lifetime access to all features',
      icon: Star,
      color: '#8B5CF6',
      features: [
        'Everything in Career Pro',
        'Lifetime access to all features',
        'Unlimited career coaching',
        'Exclusive networking events',
        'Personal brand development',
        'VIP support channel',
        'Early access to new features',
        'Lifetime updates & improvements'
      ],
      notIncluded: [],
      popular: false,
      buttonText: 'Get Lifetime Access'
    }
  ];

  const handleUpgrade = (planName) => {
    // Handle upgrade logic here
    console.log(`Upgrading to ${planName} plan`);
    
    // Navigate to appropriate payment page based on plan
    switch (planName) {
      case 'Professional':
        window.location.href = '/upgrade-payment?plan=pro&code=111111';
        break;
      case 'Career Pro':
        window.location.href = '/upgrade-payment?plan=premium&code=111111';
        break;
      case 'Lifetime':
        window.location.href = '/upgrade-payment?plan=premium&code=111111';
        break;
      case 'Starter':
        // Don't navigate for starter plan (current plan)
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
              to="/student-dashboard" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            
            <div className="mb-8">
              <h1 className="font-display font-bold text-4xl text-text-primary mb-4">
                Choose Your Career Plan
              </h1>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">
                Unlock powerful features to accelerate your job search and career growth
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-12 text-sm text-text-muted mb-8">
              <div className="flex items-center gap-3">
                <Check size={18} className="text-accent-green flex-shrink-0" />
                <span className="font-medium">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={18} className="text-accent-green flex-shrink-0" />
                <span className="font-medium">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={18} className="text-accent-green flex-shrink-0" />
                <span className="font-medium">Secure payment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      
      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
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
                    
                    {plan.originalPrice && (
                      <div className="text-text-dim text-sm line-through">
                        Was {plan.originalPrice}
                      </div>
                    )}
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
                        ? 'bg-bg-elevated border border-bg-border text-text-muted cursor-not-allowed'
                        : 'bg-bg-elevated border border-bg-border text-text-primary hover:border-accent-green/30 hover:text-accent-green'
                    }`}
                    disabled={plan.name === 'Starter'}
                  >
                    {plan.buttonText}
                    {plan.name !== 'Starter' && <ArrowRight size={16} />}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-2xl text-text-primary text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "Can I change or cancel my plan anytime?",
                  a: "Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the next billing cycle."
                },
                {
                  q: "What's included in the 30-day guarantee?",
                  a: "If you're not satisfied with any paid plan, you can request a full refund within 30 days of purchase, no questions asked."
                },
                {
                  q: "Do you offer student discounts?",
                  a: "Yes! We offer a 50% discount for students with valid .edu email addresses. Contact support for details."
                },
                {
                  q: "How does the lifetime access work?",
                  a: "Lifetime access gives you all current and future features forever, including all updates and new tools we develop."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 border border-bg-border"
                >
                  <h3 className="font-display font-semibold text-text-primary mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
