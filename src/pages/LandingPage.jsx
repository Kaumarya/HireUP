// ─── Landing Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ArrowRight, Zap, Brain, Shield, BarChart2,
  Users, Briefcase, Star, CheckCircle, Sparkles,
  TrendingUp, Award, Search, BookOpen, User, Play, HelpCircle
} from 'lucide-react';
import LandingNavbar from '../components/layout/LandingNavbar';
import Footer from '../components/layout/Footer';
import SiteInfoChatbot from '../components/ui/SiteInfoChatbot';
import { SectionHeader } from '../components/ui/index';
import { mockPlacements } from '../data/mockData.js';
import PlacementCard from '../components/ui/PlacementCard';

// Add custom animation styles
const animationStyles = `
  @keyframes scroll-x {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-scroll-x {
    animation: scroll-x 30s linear infinite;
    display: flex;
  }
  
  .animate-scroll-x:hover {
    animation-play-state: paused;
  }
`;

// Floating stat card for hero
function StatCard({ label, value, sub, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-card glow-border rounded-2xl px-9 py-8 min-w-[180px]"
    >
      <p className="font-display font-bold text-2xl text-accent-green">{value}</p>
      <p className="text-sm text-text-primary font-body">{label}</p>
      {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
    </motion.div>
  );
}

// Step card for "How it works"
function StepCard({ step, icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(34,197,94,0.15)' }}
      className="glass-card rounded-2xl p-7 hover:border-accent-green/30 transition-all duration-300 text-center group relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-accent-green/50 to-transparent" />
      <div className="w-14 h-14 mx-auto mb-5 bg-accent-green/10 border border-accent-green/20 rounded-2xl flex items-center justify-center group-hover:bg-accent-green/20 group-hover:shadow-glow-sm transition-all">
        <Icon size={24} className="text-accent-green" />
      </div>
      <div className="w-6 h-6 mx-auto mb-3 bg-bg-elevated rounded-full flex items-center justify-center text-xs font-display font-bold text-accent-green border border-accent-green/30">
        {step}
      </div>
      <h3 className="font-display font-bold text-text-primary text-lg mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// Feature item
function FeatureItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-8 h-8 bg-accent-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-accent-green" />
      </div>
      <span className="text-text-primary text-sm">{text}</span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A0A',
      color: '#E5E7EB',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <LandingNavbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="bg-orb w-96 h-96 bg-accent-green/8 top-10 -left-20 opacity-60" style={{ position: 'absolute' }} />
        <div className="bg-orb w-80 h-80 bg-accent-green/6 top-40 right-0 opacity-40" style={{ position: 'absolute' }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#E5E7EB',
                lineHeight: 1.05,
                marginBottom: '1.5rem'
              }}
            >
              Hire Smarter.
              <br />
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 50%, #86EFAC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Get Hired Faster.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-muted text-lg leading-relaxed mb-9 max-w-lg"
            >
              HireUP connects talented students and fresh graduates with innovative companies through AI-powered matching, verified skill profiles, and real-time hiring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8 mb-12"
            >
              {/* Options Container - Horizontal Layout */}
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Student Option */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(34,197,94,0.15)' }}
                  className="glass-card glow-border rounded-3xl p-8 border border-accent-green/20 hover:border-accent-green/40 transition-all duration-300 group flex-1 w-full"
                >
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 bg-accent-green/10 border-2 border-accent-green/30 rounded-2xl flex items-center justify-center group-hover:bg-accent-green/20 group-hover:shadow-glow-sm transition-all duration-300">
                      <User size={28} className="text-accent-green" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-text-primary text-2xl mb-2">Student / Job Seeker</h3>
                      <p className="text-text-muted text-base leading-relaxed">Find your dream job with AI-powered matching and verified skill profiles</p>
                    </div>
                    <Link to="/student-auth" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,197,94,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary flex items-center justify-center gap-3 text-base px-8 py-4 w-full"
                      >
                        Sign In <ArrowRight size={18} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>

                {/* Recruiter Option */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(59,130,246,0.15)' }}
                  className="glass-card rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group flex-1 w-full"
                >
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 group-hover:shadow-glow-sm transition-all duration-300">
                      <Briefcase size={28} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-text-primary text-2xl mb-2">Recruiter / Company</h3>
                      <p className="text-text-muted text-base leading-relaxed">Hire top talent from leading universities with intelligent matching</p>
                    </div>
                    <Link to="/recruiter-auth" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59,130,246,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-3 text-base px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-display font-bold transition-all duration-300 w-full"
                      >
                        Sign In <ArrowRight size={18} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Additional Options */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4"
              >
                <div className="text-text-muted hover:text-accent-green transition-colors font-body text-sm flex items-center gap-2 cursor-pointer">
                  <User size={14} />
                  New student? Create account →
                </div>
                <div className="text-text-muted hover:text-blue-400 transition-colors font-body text-sm flex items-center gap-2 cursor-pointer">
                  <Briefcase size={14} />
                  New company? Create account →
                </div>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {['A', 'R', 'S', 'K', 'P'].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-green/40 to-accent-green-dim/20 border-2 border-bg-primary flex items-center justify-center text-xs font-display font-bold text-accent-green"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-accent-green text-accent-green" />)}
                </div>
                <p className="text-xs text-text-muted">Trusted by 50,000+ students</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Site Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative hidden md:block -mt-40"
          >
            {/* Features Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card glow-border rounded-3xl p-10 shadow-card max-w-lg"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="font-display font-bold text-2xl text-text-primary mb-4">
                  Why Choose HireUP?
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Your AI-powered career platform that connects talent with opportunity
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {[
                  {
                    icon: <Brain size={20} className="text-accent-green" />,
                    title: "AI-Powered Matching",
                    description: "Smart algorithms match you with perfect opportunities"
                  },
                  {
                    icon: <Zap size={20} className="text-accent-green" />,
                    title: "Instant Applications",
                    description: "Apply to multiple jobs with a single click"
                  },
                  {
                    icon: <Shield size={20} className="text-accent-green" />,
                    title: "Verified Profiles",
                    description: "Trustworthy candidates and companies"
                  },
                  {
                    icon: <BarChart2 size={20} className="text-accent-green" />,
                    title: "Career Analytics",
                    description: "Track your progress and success metrics"
                  },
                  {
                    icon: <Users size={20} className="text-accent-green" />,
                    title: "50,000+ Students",
                    description: "Join our growing community"
                  },
                  {
                    icon: <Award size={20} className="text-accent-green" />,
                    title: "Success Stories",
                    description: "Real placements at top companies"
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-bg-elevated/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-text-primary text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-text-muted text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              </motion.div>
          </motion.div>
        </div>

        {/* Floating stats below hero */}
        <div className="relative max-w-7xl mx-auto mt-16 overflow-hidden">
          <style>{animationStyles}</style>
          <div className="flex gap-4 animate-scroll-x">
            {/* First set of cards */}
            <StatCard value="50K+" label="Students Placed" delay={0.4} />
            <StatCard value="10K+" label="Companies" sub="hiring actively" delay={0.5} />
            <StatCard value="94%" label="Match Accuracy" sub="AI-powered" delay={0.6} />
            <StatCard value="48h" label="Avg. Hire Time" sub="industry-leading" delay={0.7} />
            <StatCard value="25K+" label="Active Jobs" delay={0.8} />
            <StatCard value="98%" label="Success Rate" sub="placement guarantee" delay={0.9} />
            <StatCard value="4.8★" label="Avg. Rating" sub="from employers" delay={1.0} />
            <StatCard value="150+" label="Partner Universities" sub="across India" delay={1.1} />
            <StatCard value="500K+" label="Total Applications" delay={1.2} />
            <StatCard value="85%" label="Interview Rate" sub="AI-matched" delay={1.3} />
            <StatCard value="24/7" label="Support" sub="chat & email" delay={1.4} />
            <StatCard value="12+" label="Countries" sub="global reach" delay={1.5} />
            <StatCard value="3M+" label="Salary Data" sub="analyzed" delay={1.6} />
            <StatCard value="99.9%" label="Uptime" sub="platform reliability" delay={1.7} />
            <StatCard value="2M+" label="Skill Tests" sub="completed" delay={1.8} />
            <StatCard value="#1" label="Ranked" sub="in India" delay={1.9} />
            {/* Duplicate cards for continuous scroll */}
            <StatCard value="50K+" label="Students Placed" delay={2.0} />
            <StatCard value="10K+" label="Companies" sub="hiring actively" delay={2.1} />
            <StatCard value="94%" label="Match Accuracy" sub="AI-powered" delay={2.2} />
            <StatCard value="48h" label="Avg. Hire Time" sub="industry-leading" delay={2.3} />
            <StatCard value="25K+" label="Active Jobs" delay={2.4} />
            <StatCard value="98%" label="Success Rate" sub="placement guarantee" delay={2.5} />
            <StatCard value="4.8★" label="Avg. Rating" sub="from employers" delay={2.6} />
            <StatCard value="150+" label="Partner Universities" sub="across India" delay={2.7} />
            <StatCard value="500K+" label="Total Applications" delay={2.8} />
            <StatCard value="85%" label="Interview Rate" sub="AI-matched" delay={2.9} />
            <StatCard value="24/7" label="Support" sub="chat & email" delay={3.0} />
            <StatCard value="12+" label="Countries" sub="global reach" delay={3.1} />
            <StatCard value="3M+" label="Salary Data" sub="analyzed" delay={3.2} />
            <StatCard value="99.9%" label="Uptime" sub="platform reliability" delay={3.3} />
            <StatCard value="2M+" label="Skill Tests" sub="completed" delay={3.4} />
            <StatCard value="#1" label="Ranked" sub="in India" delay={3.5} />
          </div>
        </div>
      </section>

      {/* ── CREATIVE TRANSITION ───────────────────────────────── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 w-40 h-40 bg-accent-green/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-32 h-32 bg-accent-green/5 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-accent-green/20 to-accent-green-dim/10 rounded-2xl"
              />
            </div>
            
            {/* Creative content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-4 h-px bg-accent-green"></div>
                <span className="text-accent-green text-xs font-display font-semibold tracking-widest uppercase">Success Journey</span>
                <div className="w-4 h-px bg-accent-green"></div>
              </div>
              <h2 className="font-display font-bold text-3xl text-text-primary mb-4">
                From Profile to Dream Job
              </h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto mb-6">
                Every success story starts with a single step. Join thousands who've transformed their careers with HireUP's intelligent platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-xl p-4 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center mb-3">
                    <Zap size={24} className="text-accent-green" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary">Start Today</h3>
                  <p className="text-sm text-text-muted">Begin your journey</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-xl p-4 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3">
                    <TrendingUp size={24} className="text-blue-500" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary">Track Progress</h3>
                  <p className="text-sm text-text-muted">Monitor applications</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-xl p-4 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Award size={24} className="text-purple-500" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary">Achieve Goals</h3>
                  <p className="text-sm text-text-muted">Land your dream job</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Simple Process"
            title="How HireUP Works"
            subtitle="Three steps from profile to offer letter."
            centered
          />
          <div className="grid md:grid-cols-3 gap-6">
            <StepCard step="01" icon={User} title="Create Profile" desc="Build your talent profile with skills, projects, and certifications. Let AI score your profile for visibility." delay={0} />
            <StepCard step="02" icon={Brain} title="Get Discovered" desc="Our AI matches you with roles that fit your skill set, location, and career goals — automatically." delay={0.1} />
            <StepCard step="03" icon={Award} title="Get Hired" desc="Apply in one click, track your applications, and receive interview invites directly from top companies." delay={0.2} />
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-bg-card/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Platform Features"
            title="Built for Both Sides of Hiring"
            subtitle="Powerful tools for students and companies alike."
            centered
          />
          <div className="grid md:grid-cols-2 gap-8">
            {/* Students */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 hover:border-accent-green/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent-green/10 rounded-xl flex items-center justify-center">
                  <BookOpen size={18} className="text-accent-green" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-text-primary text-xl">For Students</h3>
                  <p className="text-text-muted text-xs">Launch your career smarter</p>
                </div>
              </div>
              <div className="space-y-1">
                <FeatureItem icon={Sparkles} text="Smart AI job recommendations" />
                <FeatureItem icon={Users} text="Portfolio & project showcase" />
                <FeatureItem icon={TrendingUp} text="Skill verification & badges" />
                <FeatureItem icon={Search} text="Internship & job discovery" />
                <FeatureItem icon={BookOpen} text="Resume builder with AI feedback" />
              </div>
              <motion.button
                  whileHover={{ x: 4 }}
                  className="mt-6 flex items-center gap-2 text-accent-green text-sm font-display font-semibold group-hover:gap-3 transition-all"
                >
                  Create Student Profile <ArrowRight size={14} />
                </motion.button>
            </motion.div>

            {/* Companies */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 hover:border-accent-green/30 transition-all group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent-green/10 rounded-xl flex items-center justify-center">
                  <Briefcase size={18} className="text-accent-green" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-text-primary text-xl">For Companies</h3>
                  <p className="text-text-muted text-xs">Find your next star hire</p>
                </div>
              </div>
              <div className="space-y-1">
                <FeatureItem icon={Search} text="AI-powered talent discovery" />
                <FeatureItem icon={Brain} text="Smart skill & experience filters" />
                <FeatureItem icon={Zap} text="Instant invite-to-interview flow" />
                <FeatureItem icon={Shield} text="Verified & scored candidates" />
                <FeatureItem icon={BarChart2} text="Hiring analytics dashboard" />
              </div>
              <motion.button
                  whileHover={{ x: 4 }}
                  className="mt-6 flex items-center gap-2 text-accent-green text-sm font-display font-semibold group-hover:gap-3 transition-all"
                >
                  Start Hiring <ArrowRight size={14} />
                </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ─────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader
              title="Top Placements"
              subtitle="Our students are getting hired by leading companies."
            />
            <Link to="/placements" className="hidden md:flex items-center gap-1.5 text-accent-green text-sm font-display font-semibold hover:gap-3 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockPlacements.slice(0, 6).map((placement, i) => (
              <PlacementCard key={placement.id} placement={placement} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-12 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 100%)',
              border: '1px solid rgba(34,197,94,0.25)',
            }}
          >
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage: 'radial-gradient(ellipse at center, rgba(34,197,94,0.12) 0%, transparent 70%)',
            }} />
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-accent-green/10 border border-accent-green/25 text-accent-green rounded-full px-4 py-1.5 text-xs font-display font-semibold mb-5"
              >
                <Zap size={11} className="fill-accent-green" /> Join 50,000+ Students
              </motion.div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-text-primary mb-4">
                Your Dream Role is<br />
                <span className="text-accent-green">One Click Away</span>
              </h2>
              <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">
                Create your free profile today and let AI match you to opportunities that fit exactly who you are.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-started">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="btn-primary flex items-center gap-2 text-base px-8 py-4"
                  >
                    Get Started <ChevronRight size={16} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-bg-card">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Everything you need to know about HireUp and how we can help accelerate your career.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "What is HireUp and how does it work?",
                answer: "HireUp is an AI-powered career platform that creates personalized learning roadmaps and matches you with perfect job opportunities. Simply create a profile, take our skill assessment, and get your customized roadmap to your dream career."
              },
              {
                question: "Is HireUp free for students?",
                answer: "Yes! HireUp offers a comprehensive free plan that includes profile creation, basic skill assessments, access to learning roadmaps, and job applications. Premium features are available for those who want advanced analytics and priority matching."
              },
              {
                question: "How accurate are the AI-powered job matches?",
                answer: "Our AI matching algorithm has a 95% accuracy rate, analyzing over 50 data points including skills, experience, preferences, and cultural fit to ensure perfect matches between candidates and opportunities."
              },
              {
                question: "What kind of careers does HireUp support?",
                answer: "We support a wide range of career paths including Software Development, Data Science, Cloud Computing, DevOps, Product Management, UX Design, Digital Marketing, and more. New career paths are added regularly based on market demand."
              },
              {
                question: "How long does it take to create a learning roadmap?",
                answer: "Creating your personalized roadmap takes just 5-10 minutes. After completing your profile and skill assessment, our AI instantly generates a customized learning path with timelines and milestones."
              },
              {
                question: "Can recruiters contact me directly through HireUp?",
                answer: "Yes! Once your profile is complete, recruiters can view your profile and contact you directly if you match their requirements. You have full control over your privacy and can choose who can contact you."
              },
              {
                question: "How do skill assessments work?",
                answer: "Our skill assessments are adaptive tests that evaluate your current proficiency levels. They include multiple-choice questions, practical exercises, and real-world scenarios. You receive instant feedback and personalized learning recommendations."
              },
              {
                question: "What if I'm not satisfied with HireUp?",
                answer: "We offer a 30-day money-back guarantee on all paid plans. Plus, our free plan gives you access to core features so you can try HireUp risk-free before upgrading."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-accent-green/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-green/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle size={16} className="text-accent-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary text-lg mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-text-muted mb-4">
              Still have questions?
            </p>
            <button className="inline-flex items-center gap-2 text-accent-green hover:text-accent-green/80 font-medium">
              Contact our support team <ChevronRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* Chatbot */}
      <SiteInfoChatbot />
    </div>
  );
}
