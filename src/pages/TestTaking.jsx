// ─── Test Taking Page ───────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronLeft, CheckCircle, AlertCircle, Award, BarChart3, Loader2, RefreshCw } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Certificate from '../components/Certificate';
import questionGenerator from '../services/questionGenerator.js';
import { useStudentUser } from '../contexts/StudentUserContext';

// Get available subjects dynamically
const availableSubjects = questionGenerator.getAvailableSubjects();

// Create testConfig from available subjects
const testConfig = availableSubjects.reduce((acc, subject, index) => {
  acc[index + 1] = {
    title: subject.name,
    duration: subject.duration,
    difficulty: subject.difficulty
  };
  return acc;
}, {});

export default function TestTaking() {
  const navigate = useNavigate();
  const location = useLocation();
  const testId = location.state?.testId || 1;
  const { fullName: candidateName } = useStudentUser();
  const test = testConfig[testId];
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => { loadQuestions(); }, [testId]);
  
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const generatedQuestions = await questionGenerator.generateQuestions(test.title);
      
      if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error('No questions were generated');
      }
      
      setQuestions(generatedQuestions);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Failed to load questions. Please check your API configuration and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateQuestions = async () => {
    try {
      setIsRegenerating(true);
      questionGenerator.clearCache();
      const newQuestions = await questionGenerator.generateQuestions(test.title);
      
      if (!Array.isArray(newQuestions) || newQuestions.length === 0) {
        throw new Error('No questions were generated');
      }
      
      setQuestions(newQuestions);
      setAnswers({});
      setCurrentQuestion(0);
      setTimeLeft(test.duration * 60);
      setIsSubmitted(false);
      setShowResults(false);
      setShowCertificate(false);
    } catch (err) {
      console.error('Error regenerating questions:', err);
      setError('Failed to regenerate questions. Please try again.');
    } finally {
      setIsRegenerating(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = useCallback(() => {
    if (!questions || questions.length === 0) return { score: 0, correct: 0, total: 0 };
    
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) correct++;
    });
    
    const score = Math.round((correct / questions.length) * 100);
    return { score, correct, total: questions.length };
  }, [answers, questions]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const getTimeColor = () => {
    if (timeLeft < 300) return 'text-red-600';
    if (timeLeft < 600) return 'text-yellow-600';
    return 'text-accent-green';
  };

  const getProgress = () => {
    const answered = Object.keys(answers).length;
    return (answered / questions.length) * 100;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Sidebar />
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={48} className="animate-spin text-accent-green" />
          <h2 className="font-display font-bold text-2xl text-text-primary">Generating AI Questions...</h2>
          <p className="text-text-muted text-center max-w-md">
            Using AI to generate personalized questions for your assessment...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Sidebar />
        <div className="flex flex-col items-center gap-4 max-w-md">
          <AlertCircle size={48} className="text-red-500" />
          <h2 className="font-display font-bold text-2xl text-text-primary">AI Question Generation Failed</h2>
          <p className="text-text-muted text-center">{error}</p>
          <div className="flex gap-2">
            <button onClick={loadQuestions} className="px-4 py-2 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90">
              Try Again
            </button>
            <button onClick={() => navigate('/skill-tests')} className="px-4 py-2 bg-bg-elevated border border-bg-border text-text-primary rounded-lg font-medium hover:bg-bg-border">
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showCertificate) {
    const results = calculateScore();
    const completedAt = new Date().toLocaleDateString();
    
    return (
      <div>
        <button onClick={() => setShowCertificate(false)} className="fixed top-24 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-bg-border text-text-primary rounded-lg font-medium hover:bg-bg-border">
          <ArrowLeft size={20} />
          Back to Results
        </button>
        <Certificate testName={test.title} score={results.score} completedAt={completedAt} candidateName={candidateName} testId={testId} />
      </div>
    );
  }

  if (showResults) {
    const results = calculateScore();
    const passed = results.score >= 60;

    return (
      <div className="min-h-screen bg-bg-primary">
        <Sidebar />
        <Navbar />
        
        <main className="pt-24 pb-16 md:ml-60">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <div className="mb-6">
                {passed ? (
                  <div className="w-24 h-24 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={48} className="text-accent-green" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={48} className="text-red-600" />
                  </div>
                )}
              </div>
              
              <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
                {passed ? 'Congratulations!' : 'Test Completed'}
              </h1>
              <p className="text-text-muted text-lg mb-8">{test.title}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Award size={20} className="text-accent-green" />
                    <h3 className="font-display font-semibold text-text-primary">Your Score</h3>
                  </div>
                  <p className={`font-display font-bold text-3xl ${passed ? 'text-accent-green' : 'text-red-600'}`}>
                    {results.score}%
                  </p>
                  <p className="text-sm text-text-dim mt-1">{results.correct} out of {results.total} correct</p>
                </div>
                
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock size={20} className="text-accent-green" />
                    <h3 className="font-display font-semibold text-text-primary">Time Taken</h3>
                  </div>
                  <p className="font-display font-bold text-3xl text-accent-green">
                    {formatTime(test.duration * 60 - timeLeft)}
                  </p>
                  <p className="text-sm text-text-dim mt-1">Completed time</p>
                </div>
                
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 size={20} className="text-accent-green" />
                    <h3 className="font-display font-semibold text-text-primary">Status</h3>
                  </div>
                  <p className={`font-display font-bold text-3xl ${passed ? 'text-accent-green' : 'text-red-600'}`}>
                    {passed ? 'Passed' : 'Failed'}
                  </p>
                  <p className="text-sm text-text-dim mt-1">{passed ? 'Great job!' : 'Try again to improve'}</p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 mb-8">
                <h3 className="font-display font-semibold text-xl text-text-primary mb-4">Review Your Answers</h3>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const userAnswer = answers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <div key={question.id} className="border-b border-bg-border last:border-0 pb-4 last:pb-0">
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCorrect ? 'bg-accent-green/20 text-accent-green' : 'bg-red-500/20 text-red-600'
                          }`}>
                            {isCorrect ? '✓' : '✗'}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-text-primary mb-2">
                              Question {index + 1}: {question.question}
                            </p>
                            <div className="grid grid-cols-1 gap-2 mb-2">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className={`p-2 rounded-lg text-sm ${
                                  optIndex === question.correctAnswer 
                                    ? 'bg-accent-green/20 text-accent-green border border-accent-green/50'
                                    : optIndex === userAnswer && !isCorrect
                                    ? 'bg-red-500/20 text-red-600 border border-red-500/50'
                                    : 'bg-bg-elevated text-text-muted'
                                }`}>
                                  {option}
                                  {optIndex === question.correctAnswer && ' ✓ Correct'}
                                  {optIndex === userAnswer && !isCorrect && ' ✗ Your answer'}
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-text-dim italic">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={() => navigate('/skill-tests')} className="px-6 py-3 bg-bg-elevated border border-bg-border text-text-primary rounded-lg font-medium hover:bg-bg-border">
                  Back to Tests
                </button>
                {passed && (
                  <button onClick={() => setShowCertificate(true)} className="px-6 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90">
                    View Certificate
                  </button>
                )}
                <button onClick={() => window.location.reload()} className="px-6 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90">
                  Retake Test
                </button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = getProgress();

  if (!question || questions.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Sidebar />
        <div className="glass-card rounded-2xl p-8 max-w-md">
          <h2 className="font-display font-bold text-xl text-text-primary mb-4">No Questions Available</h2>
          <button onClick={loadQuestions} className="mt-4 w-full px-4 py-2 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90">
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <Navbar />
      
      <main className="pt-24 pb-16 md:ml-60">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigate('/skill-tests')} className="flex items-center gap-2 text-text-muted hover:text-text-primary">
                <ArrowLeft size={20} />
                <span>Back to Tests</span>
              </button>
              
              <div className={`flex items-center gap-2 font-display font-semibold ${getTimeColor()}`}>
                <Clock size={20} />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-2xl text-text-primary">{test.title}</h1>
                <button
                  onClick={regenerateQuestions}
                  disabled={isRegenerating}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-bg-elevated border border-bg-border text-text-primary rounded-lg hover:bg-bg-border disabled:opacity-50"
                >
                  <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
                  {isRegenerating ? 'Regenerating...' : 'New Questions'}
                </button>
              </div>
              <span className="text-text-muted">Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            
            <div className="w-full bg-bg-border rounded-full h-2">
              <motion.div className="bg-accent-green h-2 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-text-dim mt-2">{Object.keys(answers).length} of {questions.length} questions answered</p>
          </motion.div>

          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="glass-card rounded-2xl p-8 mb-6">
            <h2 className="font-display font-semibold text-xl text-text-primary mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    answers[question.id] === index
                      ? 'border-accent-green bg-accent-green/10 text-accent-green'
                      : 'border-bg-border bg-bg-elevated text-text-primary hover:border-accent-green/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers[question.id] === index ? 'border-accent-green bg-accent-green' : 'border-bg-border'
                    }`}>
                      {answers[question.id] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                currentQuestion === 0
                  ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
                  : 'bg-bg-elevated border border-bg-border text-text-primary hover:bg-bg-border'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 5))}
                disabled={currentQuestion === 0}
                className="w-8 h-8 rounded-lg bg-bg-elevated border border-bg-border text-text-primary hover:bg-bg-border disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex gap-1">
                {questions.slice(Math.max(0, currentQuestion - 2), Math.min(questions.length, currentQuestion + 3)).map((_, index) => {
                  const actualIndex = Math.max(0, currentQuestion - 2) + index;
                  return (
                    <button
                      key={actualIndex}
                      onClick={() => setCurrentQuestion(actualIndex)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        actualIndex === currentQuestion
                          ? 'bg-accent-green text-white'
                          : answers[questions[actualIndex].id] !== undefined
                          ? 'bg-accent-green/20 text-accent-green border border-accent-green/50'
                          : 'bg-bg-elevated text-text-muted hover:bg-bg-border'
                      }`}
                    >
                      {actualIndex + 1}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 5))}
                disabled={currentQuestion === questions.length - 1}
                className="w-8 h-8 rounded-lg bg-bg-elevated border border-bg-border text-text-primary hover:bg-bg-border disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <ChevronLeft size={16} className="rotate-180" />
              </button>
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length === 0 || isLoading || isRegenerating}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                  Object.keys(answers).length === 0 || isLoading || isRegenerating
                    ? 'bg-bg-elevated text-text-muted cursor-not-allowed'
                    : 'bg-accent-green text-white hover:bg-accent-green/90'
                }`}
              >
                Submit Test
                <CheckCircle size={20} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isLoading || isRegenerating}
                className="flex items-center gap-2 px-6 py-3 bg-bg-elevated border border-bg-border text-text-primary rounded-lg font-medium hover:bg-bg-border disabled:opacity-50"
              >
                Next
                <ChevronLeft size={20} className="rotate-180" />
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
