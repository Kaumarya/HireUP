// ─── Student Profile Page ─────────────────────────────────────────────────────
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Github, Linkedin, ExternalLink, Star, Edit3,
  Briefcase, Code, Award, User, Shield, TrendingUp, Zap
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { TalentScore, SkillBadge, ProgressBar, VerifiedBadge } from '../components/ui/index';
import { mockStudent, mockProjects } from '../data/mockData.js';

const tabs = ['About', 'Projects', 'Skills', 'Experience', 'Certifications'];

// Project card
function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(34,197,94,0.12)' }}
      className="glass-card rounded-2xl p-5 hover:border-accent-green/30 transition-all group"
    >
      {/* Project color banner */}
      <div
        className="w-full h-28 rounded-xl mb-4 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}08)`, border: `1px solid ${project.color}25` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Code size={36} style={{ color: project.color, opacity: 0.4 }} />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-bg-card/80 rounded-full px-2 py-1 text-xs text-text-muted">
          <Star size={10} className="text-accent-green fill-accent-green" />
          {project.stars}
        </div>
      </div>

      <h3 className="font-display font-bold text-text-primary mb-1.5 group-hover:text-accent-green transition-colors">{project.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed mb-3">{project.description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map((t) => <SkillBadge key={t} skill={t} />)}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-bg-border">
        <span className="text-xs text-text-dim">Personal Project</span>
        <a href={project.github} className="flex items-center gap-1.5 text-xs text-accent-green hover:underline font-body">
          <Github size={12} /> View on GitHub
        </a>
      </div>
    </motion.div>
  );
}

// Skill level bar
function SkillRow({ skill, level }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="text-sm text-text-primary w-28 flex-shrink-0">{skill}</span>
      <div className="flex-1 h-1.5 bg-bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-green to-accent-green-light rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs text-text-muted w-8 text-right">{level}%</span>
    </div>
  );
}

const experienceItems = [
  {
    role: 'Frontend Intern',
    company: 'Zepto',
    duration: 'Jun 2024 – Sep 2024',
    desc: 'Built React components for the consumer app, improving page load by 23%. Worked closely with the design team.',
    color: '#8B5CF6',
  },
  {
    role: 'Open Source Contributor',
    company: 'Mozilla Firefox',
    duration: 'Jan 2024 – Ongoing',
    desc: 'Fixed 12+ bugs and contributed to the DevTools extension. PRs merged into main branch.',
    color: '#F59E0B',
  },
];

const certs = [
  { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services', year: '2024', color: '#F59E0B' },
  { name: 'Meta React Developer', org: 'Meta', year: '2024', color: '#3B82F6' },
  { name: 'TensorFlow Developer', org: 'Google', year: '2023', color: '#EA4335' },
];

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('About');

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-60 p-6 pt-8">
        {/* ── Profile Header ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-7 mb-6 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute top-0 left-0 right-0 h-32"
            style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.03) 100%)' }}
          />
          <div className="absolute top-4 right-4 z-10">
            <button className="flex items-center gap-2 text-xs text-text-muted hover:text-accent-green transition-colors bg-bg-elevated/90 backdrop-blur-sm border border-bg-border rounded-lg px-3 py-2 shadow-sm">
              <Edit3 size={12} /> Edit Profile
            </button>
          </div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-green/40 to-accent-green-dim/20 border-2 border-accent-green/30 flex items-center justify-center font-display font-bold text-accent-green text-3xl shadow-glow-sm">
                AM
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-green rounded-full border-2 border-bg-card flex items-center justify-center">
                <span className="text-bg-primary text-[8px] font-bold">✓</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="font-display font-bold text-2xl text-text-primary">{mockStudent.name}</h1>
                <VerifiedBadge />
              </div>
              <p className="text-text-muted mb-2">{mockStudent.headline}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-dim">
                <span className="flex items-center gap-1"><MapPin size={12} /> {mockStudent.location}</span>
                <a href="#" className="flex items-center gap-1 hover:text-accent-green transition-colors"><Github size={12} /> GitHub</a>
                <a href="#" className="flex items-center gap-1 hover:text-accent-green transition-colors"><Linkedin size={12} /> LinkedIn</a>
              </div>
            </div>

            {/* Talent Score */}
            <div className="flex flex-col items-center">
              <TalentScore score={mockStudent.talentScore} size="lg" />
              <p className="text-xs text-text-muted mt-1">Talent Score</p>
              <p className="text-xs text-accent-green flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={9} /> Top 8% of candidates
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="relative mt-6 pt-5 border-t border-bg-border grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: 'Experience', value: mockStudent.experience },
              { label: 'Projects', value: '3' },
              { label: 'Skills', value: '6' },
              { label: 'Applications', value: '14' },
              { label: 'Profile Views', value: '284' },
              { label: 'Education', value: 'B.Tech' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-display font-bold text-text-primary text-lg">{value}</p>
                <p className="text-xs text-text-dim">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tabs ──────────────────────────────────────── */}
        <div className="flex gap-1 bg-bg-card border border-bg-border rounded-2xl p-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-fit py-2.5 px-5 rounded-xl text-sm font-display font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-accent-green/15 text-accent-green border border-accent-green/25 shadow-glow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab Content ───────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'About' && (
              <div className="glass-card rounded-2xl p-6">
                <h2 className="font-display font-semibold text-text-primary mb-3">Bio</h2>
                <p className="text-text-muted leading-relaxed mb-6">{mockStudent.bio}</p>
                <h2 className="font-display font-semibold text-text-primary mb-3">Education</h2>
                <div className="flex items-center gap-3 p-4 bg-bg-elevated rounded-xl">
                  <div className="w-10 h-10 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center text-blue-400 font-display font-bold text-sm">II</div>
                  <div>
                    <p className="font-body font-medium text-text-primary">B.Tech in Computer Science</p>
                    <p className="text-text-muted text-sm">IIT Delhi · 2021 – 2025</p>
                  </div>
                  <span className="ml-auto tag">CGPA 8.7</span>
                </div>
              </div>
            )}

            {activeTab === 'Projects' && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {mockProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-5 border-dashed border-accent-green/20 flex flex-col items-center justify-center gap-2 text-text-dim hover:text-accent-green hover:border-accent-green/40 transition-all cursor-pointer min-h-[200px]"
                >
                  <div className="w-10 h-10 rounded-xl border border-dashed border-current flex items-center justify-center text-xl font-light">+</div>
                  <p className="text-sm font-body">Add a project</p>
                </motion.div>
              </div>
            )}

            {activeTab === 'Skills' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-text-primary mb-4">Technical Skills</h3>
                  <div className="space-y-1">
                    <SkillRow skill="React.js" level={92} />
                    <SkillRow skill="Node.js" level={85} />
                    <SkillRow skill="Python" level={78} />
                    <SkillRow skill="TypeScript" level={74} />
                    <SkillRow skill="MongoDB" level={68} />
                    <SkillRow skill="TensorFlow" level={60} />
                  </div>
                </div>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-text-primary mb-4">All Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Python', 'TensorFlow', 'TypeScript', 'MongoDB', 'Redux', 'REST APIs', 'Git', 'Docker', 'SQL', 'AWS'].map((s) => (
                      <SkillBadge key={s} skill={s} size="lg" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Experience' && (
              <div className="glass-card rounded-2xl p-6 space-y-5">
                {experienceItems.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                        style={{ background: `${exp.color}18`, border: `1px solid ${exp.color}35`, color: exp.color }}
                      >
                        {exp.company[0]}
                      </div>
                      {i < experienceItems.length - 1 && <div className="w-px flex-1 bg-bg-border mt-3" />}
                    </div>
                    <div className="flex-1 pb-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display font-semibold text-text-primary">{exp.role}</p>
                          <p className="text-text-muted text-sm">{exp.company}</p>
                        </div>
                        <span className="text-xs text-text-dim bg-bg-elevated rounded-lg px-2.5 py-1">{exp.duration}</span>
                      </div>
                      <p className="text-text-muted text-sm mt-2 leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Certifications' && (
              <div className="grid md:grid-cols-3 gap-4">
                {certs.map((cert) => (
                  <div key={cert.name} className="glass-card rounded-2xl p-5 hover:border-accent-green/25 transition-all">
                    <div
                      className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center font-display font-bold text-xl"
                      style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30`, color: cert.color }}
                    >
                      {cert.org[0]}
                    </div>
                    <p className="font-display font-semibold text-text-primary text-sm mb-1">{cert.name}</p>
                    <p className="text-text-muted text-xs">{cert.org}</p>
                    <div className="mt-3 pt-3 border-t border-bg-border flex items-center justify-between">
                      <span className="text-xs text-text-dim">{cert.year}</span>
                      <span className="tag">Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

          </div>
  );
}
