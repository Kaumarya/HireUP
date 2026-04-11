// ─── Roadmap Page ───────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Target, BookOpen, Code, Award, Briefcase, TrendingUp, 
  Clock, Star, Zap, ChevronRight, Search, Sparkles, Loader2, CheckCircle,
  FileText, Play, Lock, Unlock, Calendar, Brain, Trophy, AlertCircle
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import PhaseTestModal from '../components/PhaseTestModal';
import aiService from '../services/aiService';

export default function Roadmap() {
  const [designation, setDesignation] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [testResults, setTestResults] = useState({});

  const popularDesignations = [
    // Technical Roles
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Data Scientist', 'Machine Learning Engineer', 'DevOps Engineer',
    'Product Manager', 'UX Designer', 'Mobile App Developer',
    'Cloud Engineer', 'Cybersecurity Analyst', 'Blockchain Developer',
    'Game Developer', 'AI Researcher', 'Software Architect',
    // Non-Technical Roles
    'Accountant', 'Financial Analyst', 'Marketing Manager', 'HR Manager',
    'Sales Manager', 'Business Analyst', 'Digital Marketing Specialist',
    'Investment Banker', 'Consultant', 'Operations Manager',
    // Creative Roles
    'Content Creator', 'YouTuber', 'Graphic Designer', 'Video Editor',
    'Photographer', 'Writer', 'Music Producer', 'Podcaster',
    'Social Media Manager', 'UI Designer', 'Fashion Designer'
  ];

  const generateAIRoadmap = async (designation) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Generate roadmap first
      const roadmapData = await aiService.generateRoadmap(designation);
      console.log('📍 Generated roadmap:', roadmapData);
      
      // Then generate tests sequentially to avoid rate limiting
      const phasesWithTests = [];
      for (let index = 0; index < roadmapData.phases.length; index++) {
        const phase = roadmapData.phases[index];
        
        // Add delay between each test generation to avoid rate limiting
        if (index > 0) {
          await new Promise(resolve => setTimeout(resolve, 8000)); // 8 second delay
        }
        
        try {
          console.log(`📝 Generating test for phase ${index + 1}...`);
          const test = await aiService.generatePhaseTest(designation, phase.name, phase.level);
          phasesWithTests.push({
            ...phase,
            test: test
          });
        } catch (testError) {
          console.error(`❌ Test generation failed for phase ${index + 1}:`, testError);
          // Continue with a fallback test object for this phase
          phasesWithTests.push({
            ...phase,
            test: {
              id: `test-fallback-${phase.id}`,
              title: `${designation} - ${phase.name} Assessment`,
              difficulty: phase.level,
              duration: '45 mins',
              passingScore: 75,
              questions: [],
              status: 'unavailable'
            }
          });
        }
      }
      
      const enrichedRoadmap = {
        ...roadmapData,
        phases: phasesWithTests
      };
      
      setRoadmap(enrichedRoadmap);
      localStorage.setItem('currentRoadmap', JSON.stringify(enrichedRoadmap));
      console.log('✅ Complete roadmap with tests generated');
      
      return enrichedRoadmap;
      
    } catch (err) {
      console.error('❌ Roadmap generation failed:', err);
      setError(err.message || 'Failed to generate roadmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  
  const generateRoadmap = async () => {
    if (!designation.trim()) {
      setError('Please enter a job designation');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Generate roadmap using AI (API key is already set in aiService)
      const aiGeneratedRoadmap = await generateAIRoadmap(designation);
      setRoadmap(aiGeneratedRoadmap);
      setCompletedPhases([]);
      setTestResults({});
    } catch (err) {
      setError(err.message || 'Failed to generate roadmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startPhaseTest = (phaseId) => {
    setSelectedPhase(phaseId);
  };

  const closeTestModal = () => {
    setSelectedPhase(null);
  };

  const completePhaseTest = (phaseId, score) => {
    const phase = roadmap.phases.find(p => p.id === phaseId);
    const passed = score >= phase.test.passingScore;
    
    setTestResults(prev => ({
      ...prev,
      [phaseId]: { score, passed, completedAt: new Date() }
    }));
    
    if (passed) {
      setCompletedPhases(prev => [...prev, phaseId]);
      
      // Unlock next phase
      setRoadmap(prev => ({
        ...prev,
        phases: prev.phases.map(p => 
          p.id === phaseId + 1 ? { ...p, status: 'unlocked' } : p
        ),
        currentPhase: phaseId + 1,
        overallProgress: ((phaseId) / prev.phases.length) * 100
      }));
    }
    
    setSelectedPhase(null);
  };

  const getPhaseStatus = (phase) => {
    if (completedPhases.includes(phase.id)) return 'completed';
    if (phase.status === 'unlocked') return 'current';
    return 'locked';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-accent-green';
      case 'completed': return 'bg-blue-500';
      case 'locked': return 'bg-bg-border';
      default: return 'bg-bg-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current': return <Zap size={16} className="text-white" />;
      case 'completed': return <CheckCircle size={16} className="text-white" />;
      case 'locked': return <Lock size={16} className="text-text-dim" />;
      default: return <div className="w-4 h-4 border-2 border-text-dim rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex">
      <Sidebar role="student" />

      <main className="flex-1 md:ml-60 p-6 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to={roadmap ? "#" : "/student-dashboard"}
            onClick={(e) => {
              if (roadmap) {
                e.preventDefault();
                setRoadmap(null);
                setDesignation('');
              }
            }}
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            {roadmap ? 'Back to Roadmap Generation' : 'Back to Dashboard'}
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-4xl text-text-primary mb-4">
              Career Roadmap Generator
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Get a personalized step-by-step learning path powered by AI to achieve your career goals
            </p>
          </div>
        </motion.div>

        {/* Input Section */}
        {!roadmap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target size={32} className="text-accent-green" />
                </div>
                <h2 className="font-display font-semibold text-text-primary text-xl mb-2">
                  What's Your Career Goal?
                </h2>
                <p className="text-text-muted">
                  Enter your dream job role and get a personalized roadmap
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g., Frontend Developer, Data Scientist..."
                    className="w-full pl-12 pr-4 py-4 bg-bg-elevated border border-bg-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && generateRoadmap()}
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={generateRoadmap}
                  disabled={isLoading}
                  className="w-full py-4 bg-accent-green text-bg-primary rounded-xl font-display font-semibold hover:bg-accent-green/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating AI Roadmap...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate AI Roadmap
                    </>
                  )}
                </button>
              </div>

              {/* Popular Designations */}
              <div className="mt-8">
                <p className="text-text-muted text-sm mb-3 text-center">Popular career paths:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularDesignations.map((role) => (
                    <button
                      key={role}
                      onClick={() => setDesignation(role)}
                      className="px-3 py-1.5 bg-bg-elevated border border-bg-border rounded-lg text-sm text-text-muted hover:text-accent-green hover:border-accent-green/30 transition-all"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Roadmap Display */}
        <AnimatePresence>
          {roadmap && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* Roadmap Header */}
              <div className="glass-card rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display font-bold text-2xl text-text-primary mb-2">
                      {roadmap.title} Roadmap
                    </h2>
                    <p className="text-text-muted flex items-center gap-2">
                      <Calendar size={16} />
                      Total Duration: {roadmap.totalDuration}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setRoadmap(null);
                      setDesignation('');
                    }}
                    className="px-4 py-2 bg-bg-elevated border border-bg-border rounded-lg text-text-muted hover:text-text-primary transition-colors"
                  >
                    Generate New
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-text-muted">Overall Progress</span>
                    <span className="text-accent-green font-medium">{Math.round(roadmap.overallProgress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent-green to-accent-green-light rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${roadmap.overallProgress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Roadmap Phases */}
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-bg-border" />

                {/* Phases */}
                <div className="space-y-8">
                  {roadmap.phases.map((phase, index) => {
                    const phaseStatus = getPhaseStatus(phase);
                    const testResult = testResults[phase.id];
                    
                    return (
                      <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex gap-6"
                      >
                        {/* Phase Number */}
                        <div className={`w-16 h-16 rounded-full ${getStatusColor(phaseStatus)} flex items-center justify-center flex-shrink-0 z-10 shadow-lg`}>
                          {getStatusIcon(phaseStatus)}
                        </div>

                        {/* Phase Content */}
                        <div className="flex-1 pb-8">
                          <div className="glass-card rounded-2xl p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-display font-semibold text-text-primary text-lg">
                                    {phase.name}
                                  </h3>
                                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                    phase.level === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                                    phase.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                                    phase.level === 'Advanced' ? 'bg-orange-500/10 text-orange-400' :
                                    'bg-purple-500/10 text-purple-400'
                                  }`}>
                                    {phase.level}
                                  </span>
                                  {phaseStatus === 'completed' && (
                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium flex items-center gap-1">
                                      <Trophy size={12} /> Completed
                                    </span>
                                  )}
                                </div>
                                <p className="text-text-muted text-sm mb-3">{phase.description}</p>
                                <div className="flex items-center gap-4 text-sm text-text-dim">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {phase.duration}
                                  </div>
                                  {testResult && (
                                    <div className="flex items-center gap-1">
                                      <Trophy size={14} className={testResult.passed ? 'text-accent-green' : 'text-red-400'} />
                                      <span className={testResult.passed ? 'text-accent-green' : 'text-red-400'}>
                                        Score: {testResult.score}%
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {phaseStatus !== 'locked' && (
                                <ChevronRight size={20} className="text-text-dim" />
                              )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Skills */}
                              <div>
                                <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                                  <Brain size={16} className="text-accent-green" />
                                  Skills to Learn
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {phase.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-lg text-sm"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Resources */}
                              <div>
                                <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                                  <BookOpen size={16} className="text-blue-400" />
                                  Learning Resources
                                </h4>
                                <ul className="space-y-1">
                                  {phase.resources.map((resource) => (
                                    <li key={resource} className="text-text-muted text-sm flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                      {resource}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Projects */}
                            <div className="mt-6 pt-4 border-t border-bg-border">
                              <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                                <Code size={16} className="text-purple-400" />
                                Practice Projects
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {phase.projects.map((project) => (
                                  <span
                                    key={project}
                                    className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-sm"
                                  >
                                    {project}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Test Section */}
                            <div className="mt-6 pt-4 border-t border-bg-border">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                                    <FileText size={16} className="text-orange-400" />
                                    Phase Assessment
                                  </h4>
                                  <p className="text-text-muted text-sm">
                                    {phase.test?.questions?.length || 0} questions • {phase.test?.duration || 'N/A'} • Passing: {phase.test?.passingScore || 'N/A'}%
                                  </p>
                                </div>
                                
                                {phaseStatus === 'completed' && testResult && (
                                  <div className="text-right">
                                    <div className={`text-lg font-bold ${testResult.passed ? 'text-accent-green' : 'text-red-400'}`}>
                                      {testResult.score}%
                                    </div>
                                    <div className={`text-xs ${testResult.passed ? 'text-accent-green' : 'text-red-400'}`}>
                                      {testResult.passed ? 'Passed' : 'Failed'}
                                    </div>
                                  </div>
                                )}
                                
                                {phaseStatus === 'current' && !testResult && phase.test?.status !== 'unavailable' && (
                                  <button
                                    className="px-4 py-2 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-green/90 transition-colors flex items-center gap-2"
                                  >
                                    <Play size={16} />
                                    Start Test
                                  </button>
                                )}
                                
                                {phaseStatus === 'current' && phase.test?.status === 'unavailable' && (
                                  <div className="px-4 py-2 bg-bg-elevated border border-bg-border rounded-lg text-text-dim flex items-center gap-2">
                                    <AlertCircle size={16} />
                                    Test Unavailable
                                  </div>
                                )}
                                
                                {phaseStatus === 'locked' && (
                                  <div className="px-4 py-2 bg-bg-elevated border border-bg-border rounded-lg text-text-dim flex items-center gap-2">
                                    <Lock size={16} />
                                    Locked
                                  </div>
                                )}
                                
                                {phaseStatus === 'current' && testResult && !testResult.passed && phase.test?.status !== 'unavailable' && (
                                  <button
                                    className="px-4 py-2 bg-orange-500 text-bg-primary rounded-lg font-medium hover:bg-orange-500/90 transition-colors flex items-center gap-2"
                                  >
                                    <Play size={16} />
                                    Retake Test
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Test Modal */}
        {selectedPhase && (
          <PhaseTestModal
            phase={roadmap.phases.find(p => p.id === selectedPhase)}
            test={roadmap.phases.find(p => p.id === selectedPhase)?.test}
            isOpen={!!selectedPhase}
            onClose={closeTestModal}
            onComplete={completePhaseTest}
          />
        )}
      </main>
    </div>
  );
}
