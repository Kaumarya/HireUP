// ─── Skill Tests Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Clock, Users, CheckCircle, AlertCircle, Play, BarChart3, Filter, Award, BookOpen } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import questionGenerator from '../services/questionGenerator.js';

// Get available subjects dynamically
const availableSubjects = questionGenerator.getAvailableSubjects();

// Create test data from available subjects
const mockAvailableTests = availableSubjects.map((subject, index) => ({
  id: index + 1,
  title: subject.name,
  category: getCategory(subject.name),
  duration: `${subject.duration} min`,
  questions: 15,
  difficulty: subject.difficulty,
  takenBy: Math.floor(Math.random() * 500) + 100,
  averageScore: Math.floor(Math.random() * 30) + 60,
  description: getDescription(subject.name),
  topics: subject.topics.slice(0, 4),
  attempts: Math.floor(Math.random() * 3),
  bestScore: Math.floor(Math.random() * 30) + 60,
  type: 'mcq'
}));

// Mock interview data
const mockInterviews = [
  {
    id: 101,
    title: 'Technical Interview - Full Stack',
    category: 'Programming',
    duration: '30 min',
    questions: '10+ questions',
    difficulty: 'Intermediate',
    takenBy: 234,
    averageScore: 75,
    description: 'Comprehensive technical interview covering frontend, backend, and system design',
    topics: ['JavaScript', 'React', 'Node.js', 'Databases'],
    attempts: 2,
    bestScore: 82,
    type: 'interview',
    voiceEnabled: true,
    realTime: true
  },
  {
    id: 102,
    title: 'Frontend Developer Interview',
    category: 'Frontend',
    duration: '25 min',
    questions: '8+ questions',
    difficulty: 'Intermediate',
    takenBy: 189,
    averageScore: 78,
    description: 'Focus on frontend technologies, CSS, React, and modern web development',
    topics: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'],
    attempts: 1,
    bestScore: 88,
    type: 'interview',
    voiceEnabled: true,
    realTime: true
  },
  {
    id: 103,
    title: 'JavaScript Deep Dive',
    category: 'Frontend',
    duration: '20 min',
    questions: '6+ questions',
    difficulty: 'Advanced',
    takenBy: 156,
    averageScore: 71,
    description: 'Advanced JavaScript concepts, closures, async programming, and ES6+',
    topics: ['JavaScript', 'ES6+', 'Async', 'Design Patterns'],
    attempts: 3,
    bestScore: 79,
    type: 'interview',
    voiceEnabled: true,
    realTime: true
  },
  {
    id: 104,
    title: 'Behavioral Interview',
    category: 'Business',
    duration: '15 min',
    questions: '5+ questions',
    difficulty: 'Beginner',
    takenBy: 312,
    averageScore: 83,
    description: 'Common behavioral questions and soft skills assessment',
    topics: ['Communication', 'Teamwork', 'Problem Solving', 'Leadership'],
    attempts: 1,
    bestScore: 91,
    type: 'interview',
    voiceEnabled: true,
    realTime: true
  },
  {
    id: 105,
    title: 'System Design Interview',
    category: 'Backend',
    duration: '35 min',
    questions: '12+ questions',
    difficulty: 'Advanced',
    takenBy: 98,
    averageScore: 68,
    description: 'System design, scalability, architecture patterns and distributed systems',
    topics: ['Architecture', 'Databases', 'Scalability', 'Cloud'],
    attempts: 2,
    bestScore: 74,
    type: 'interview',
    voiceEnabled: true,
    realTime: true
  },
  {
    id: 106,
    title: 'Python Developer Interview',
    category: 'Backend',
    duration: '25 min',
    questions: '8+ questions',
    difficulty: 'Intermediate',
    takenBy: 145,
    averageScore: 76,
    description: 'Python programming, data structures, algorithms and frameworks',
    topics: ['Python', 'Django', 'Data Structures', 'Algorithms'],
    attempts: 1,
    bestScore: 85,
    type: 'interview',
    voiceEnabled: true,
    realTime: true
  }
];

function getCategory(testName) {
  if (testName.includes('React') || testName.includes('JavaScript') || testName.includes('HTML') || testName.includes('CSS') || testName.includes('TypeScript') || testName.includes('Vue') || testName.includes('Angular')) return 'Frontend';
  if (testName.includes('Node') || testName.includes('Python') || testName.includes('Database') || testName.includes('DevOps')) return 'Backend';
  if (testName.includes('Design') || testName.includes('UI/UX') || testName.includes('Graphic') || testName.includes('Video') || testName.includes('Photography')) return 'Design';
  if (testName.includes('Marketing') || testName.includes('Project') || testName.includes('Business') || testName.includes('Financial') || testName.includes('Human Resources')) return 'Business';
  return 'Programming';
}

function getDescription(testName) {
  const descriptions = {
    'React Development Assessment': 'Test your React skills including hooks, state management, and component lifecycle',
    'JavaScript Fundamentals': 'Core JavaScript concepts, data structures, and problem-solving',
    'Python Programming': 'Advanced Python concepts including OOP, decorators, and async programming',
    'Node.js Backend Development': 'Server-side JavaScript with Express, APIs, and database integration',
    'HTML & CSS Mastery': 'Modern web development with semantic HTML and advanced CSS techniques',
    'TypeScript Development': 'Type-safe JavaScript development with advanced type system',
    'Vue.js Development': 'Progressive JavaScript framework with reactivity and composition',
    'Angular Development': 'Full-featured framework for enterprise applications',
    'Database Management': 'SQL and NoSQL database design and optimization',
    'DevOps & Cloud': 'Cloud infrastructure, containerization, and deployment strategies',
    'UI/UX Design Principles': 'User-centered design and interface optimization',
    'Graphic Design Fundamentals': 'Visual communication and digital design principles',
    'Video Production & Editing': 'Professional video creation and post-production',
    'Content Creation Strategy': 'Digital content planning and audience engagement',
    'Photography Essentials': 'Camera techniques and photo editing fundamentals',
    'Digital Marketing': 'Online marketing strategies and campaign management',
    'Project Management': 'Agile methodologies and project execution',
    'Business Analysis': 'Requirements analysis and process improvement',
    'Financial Management': 'Financial planning and investment analysis',
    'Human Resources Management': 'People management and organizational development'
  };
  return descriptions[testName] || 'Comprehensive assessment of key skills and knowledge';
}

const mockTestResults = [
  {
    id: 1,
    testName: 'JavaScript Fundamentals',
    score: 85,
    completedAt: '2024-02-08',
    timeTaken: '25 min',
    status: 'passed',
    rank: 'Top 20%'
  },
  {
    id: 2,
    testName: 'Python Programming',
    score: 72,
    completedAt: '2024-02-06',
    timeTaken: '58 min',
    status: 'passed',
    rank: 'Top 40%'
  }
];

export default function SkillTests() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedView, setSelectedView] = useState('selection'); // 'selection', 'mcq', 'interview'

  const filteredTests = mockAvailableTests.filter(test => {
    const matchesSearch = !searchQuery || 
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || test.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const filteredInterviews = mockInterviews.filter(test => {
    const matchesSearch = !searchQuery || 
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || test.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || test.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-accent-green/10 text-accent-green';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-500';
      case 'Advanced': return 'bg-red-500/10 text-red-500';
      default: return 'bg-bg-border text-text-muted';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent-green';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleStartTest = (testId) => {
    navigate('/test-taking', { state: { testId } });
  };

  const handleStartInterview = (interviewId) => {
    navigate('/voice-interview', { state: { interviewId } });
  };

  const handleMCQClick = () => {
    setSelectedView('mcq');
  };

  const handleInterviewClick = () => {
    setSelectedView('interview');
  };

  const handleBackToSelection = () => {
    setSelectedView('selection');
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      
      <main className="pt-24 pb-16 md:ml-60">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
              Skill Tests
            </h1>
            <p className="text-text-muted text-lg">
              Take skill assessments to showcase your expertise to employers
            </p>
          </motion.div>

          {/* Content based on selection */}
          {selectedView === 'selection' && (
            // Initial Selection View - Two Big Cards
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* MCQ Test Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={handleMCQClick}
                className="glass-card rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-accent-green/30"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-accent-green/20 rounded-2xl flex items-center justify-center mb-6">
                    <BookOpen size={40} className="text-accent-green" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
                    MCQ Test
                  </h2>
                  <p className="text-text-muted text-lg mb-6 leading-relaxed">
                    Test your knowledge with carefully crafted multiple-choice questions across various skills and technologies.
                  </p>
                  <div className="space-y-3 text-left w-full">
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>15 questions per test</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>Multiple difficulty levels</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>Instant results & feedback</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>Track your progress</span>
                    </div>
                  </div>
                  <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-accent-green text-white rounded-xl font-medium hover:bg-accent-green/90 transition-colors">
                    <Play size={18} />
                    Start MCQ Test
                  </button>
                </div>
              </motion.div>

              {/* Mock Interview Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleInterviewClick}
                className="glass-card rounded-3xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-accent-green/30"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-accent-green/20 rounded-2xl flex items-center justify-center mb-6">
                    <Users size={40} className="text-accent-green" />
                  </div>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
                    Mock Interview
                  </h2>
                  <p className="text-text-muted text-lg mb-6 leading-relaxed">
                    Practice real interview scenarios with AI-powered voice conversations and get instant feedback.
                  </p>
                  <div className="space-y-3 text-left w-full">
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>Voice-based conversations</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>Real-time AI responses</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>Multiple interview types</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-dim">
                      <CheckCircle size={18} className="text-accent-green" />
                      <span>Performance analytics</span>
                    </div>
                  </div>
                  <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-accent-green text-white rounded-xl font-medium hover:bg-accent-green/90 transition-colors">
                    <Play size={18} />
                    Start Mock Interview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {selectedView === 'mcq' && (
            // MCQ Tests Full View - With Stats, Tabs, Filters
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Back Button */}
              <button
                onClick={handleBackToSelection}
                className="mb-6 flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={18} />
                Back to selection
              </button>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
              >
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen size={20} className="text-accent-green" />
                    <h3 className="font-display font-semibold text-text-primary">Tests Taken</h3>
                  </div>
                  <p className="font-display font-bold text-3xl text-accent-green">2</p>
                  <p className="text-sm text-text-dim mt-1">Completed assessments</p>
                </div>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Award size={20} className="text-accent-green" />
                    <h3 className="font-display font-semibold text-text-primary">Average Score</h3>
                  </div>
                  <p className="font-display font-bold text-3xl text-accent-green">79%</p>
                  <p className="text-sm text-text-dim mt-1">Across all tests</p>
                </div>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={20} className="text-accent-green" />
                    <h3 className="font-display font-semibold text-text-primary">Time Spent</h3>
                  </div>
                  <p className="font-display font-bold text-3xl text-accent-green">4.5h</p>
                  <p className="text-sm text-text-dim mt-1">Total duration</p>
                </div>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 size={20} className="text-accent-green" />
                    <h3 className="font-display font-semibold text-text-primary">Ranking</h3>
                  </div>
                  <p className="font-display font-bold text-3xl text-accent-green">Top 25%</p>
                  <p className="text-sm text-text-dim mt-1">Average rank</p>
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl"
              >
                <div className="border-b border-bg-border">
                  <div className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('available')}
                      className={`py-4 border-b-2 transition-all ${
                        activeTab === 'available'
                          ? 'border-accent-green text-accent-green'
                          : 'border-transparent text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <span className="font-medium">Available Tests</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('results')}
                      className={`py-4 border-b-2 transition-all ${
                        activeTab === 'results'
                          ? 'border-accent-green text-accent-green'
                          : 'border-transparent text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <span className="font-medium">My Results</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'available' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display font-semibold text-xl text-text-primary">Available Tests</h2>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
                            <input
                              type="text"
                              placeholder="Search tests..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10 pr-4 py-2 bg-bg-elevated border border-bg-border rounded-lg text-sm focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim w-64"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={categoryFilter}
                              onChange={(e) => setCategoryFilter(e.target.value)}
                              className="px-3 py-2 bg-bg-elevated border border-bg-border rounded-lg text-sm focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary"
                            >
                              <option value="all">All Categories</option>
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="Design">Design</option>
                              <option value="Business">Business</option>
                              <option value="Programming">Programming</option>
                            </select>
                            <select
                              value={difficultyFilter}
                              onChange={(e) => setDifficultyFilter(e.target.value)}
                              className="px-3 py-2 bg-bg-elevated border border-bg-border rounded-lg text-sm focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary"
                            >
                              <option value="all">All Levels</option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Tests Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTests.map((test, index) => (
                          <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                                  {test.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                                    {test.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-sm text-text-muted mb-4 line-clamp-2">
                              {test.description}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                              <div className="flex items-center gap-2 text-text-dim">
                                <Clock size={14} />
                                <span>{test.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-text-dim">
                                <AlertCircle size={14} />
                                <span>{test.questions} questions</span>
                              </div>
                              <div className="flex items-center gap-2 text-text-dim">
                                <Users size={14} />
                                <span>{test.takenBy} taken</span>
                              </div>
                              <div className="flex items-center gap-2 text-text-dim">
                                <BarChart3 size={14} />
                                <span>{test.averageScore}% avg</span>
                              </div>
                            </div>

                            {test.attempts > 0 && (
                              <div className="mb-4 p-3 bg-bg-elevated rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-text-dim">Your best score:</span>
                                  <span className={`font-display font-semibold ${getScoreColor(test.bestScore)}`}>
                                    {test.bestScore}%
                                  </span>
                                </div>
                                <div className="text-xs text-text-dim mt-1">
                                  {test.attempts} attempt{test.attempts > 1 ? 's' : ''}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleStartTest(test.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent-green text-white rounded-lg text-sm font-medium hover:bg-accent-green/90 transition-colors"
                              >
                                <Play size={14} />
                                {test.attempts > 0 ? 'Retake Test' : 'Start Test'}
                              </button>
                              <button className="px-3 py-2 bg-bg-elevated border border-bg-border text-text-primary rounded-lg text-sm font-medium hover:bg-bg-border transition-colors">
                                Preview
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'results' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-bg-border">
                              <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Test Name</th>
                              <th className="text-right py-3 px-4 text-sm font-medium text-text-muted">Score</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Time</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date</th>
                              <th className="text-center py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockTestResults.map((result, index) => (
                              <motion.tr
                                key={result.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-bg-border hover:bg-bg-elevated transition-colors"
                              >
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="font-medium text-text-primary">{result.testName}</p>
                                    <p className="text-xs text-text-dim">{result.category}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <span className={`font-display font-semibold ${getScoreColor(result.score)}`}>
                                    {result.score}%
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1 text-sm text-text-dim">
                                    <Clock size={12} />
                                    {result.duration}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-text-dim">
                                  {result.date}
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                    result.status === 'Passed' 
                                      ? 'bg-accent-green/10 text-accent-green' 
                                      : 'bg-red-500/10 text-red-400'
                                  }`}>
                                    <CheckCircle size={10} />
                                    {result.status}
                                  </span>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {selectedView === 'interview' && (
            // Mock Interview View - Start Interview Process
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Back Button */}
              <button
                onClick={handleBackToSelection}
                className="mb-6 flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={18} />
                Back to selection
              </button>

              {/* Interview Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary">Choose Interview Type</h2>
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
                      <input
                        type="text"
                        placeholder="Search interviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-bg-elevated border border-bg-border rounded-lg text-sm focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim w-64"
                      />
                    </div>
                  </div>

                  {/* Interviews Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredInterviews.map((test, index) => (
                      <motion.div
                        key={test.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                              {test.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                                {test.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-text-muted mb-4 line-clamp-2">
                          {test.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-text-dim">
                            <Clock size={14} />
                            <span>{test.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-text-dim">
                            <AlertCircle size={14} />
                            <span>{test.questions}</span>
                          </div>
                          <div className="flex items-center gap-2 text-text-dim">
                            <Users size={14} />
                            <span>{test.takenBy} taken</span>
                          </div>
                          <div className="flex items-center gap-2 text-text-dim">
                            <BarChart3 size={14} />
                            <span>{test.averageScore}% avg</span>
                          </div>
                        </div>

                        {/* Voice indicator for interviews */}
                        <div className="mb-4 p-3 bg-accent-green/10 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                            <span className="text-accent-green font-medium">Voice Interview Available</span>
                          </div>
                          <div className="text-xs text-text-dim mt-1">
                            Real-time AI conversation • Instant feedback
                          </div>
                        </div>

                        {test.attempts > 0 && (
                          <div className="mb-4 p-3 bg-bg-elevated rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-dim">Your best score:</span>
                              <span className={`font-display font-semibold ${getScoreColor(test.bestScore)}`}>
                                {test.bestScore}%
                              </span>
                            </div>
                            <div className="text-xs text-text-dim mt-1">
                              {test.attempts} attempt{test.attempts > 1 ? 's' : ''}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStartInterview(test.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent-green text-white rounded-lg text-sm font-medium hover:bg-accent-green/90 transition-colors"
                          >
                            <Play size={14} />
                            {test.attempts > 0 ? 'Retake Interview' : 'Start Interview'}
                          </button>
                          <button className="px-3 py-2 bg-bg-elevated border border-bg-border text-text-primary rounded-lg text-sm font-medium hover:bg-bg-border transition-colors">
                            Preview
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
