// ─── Phase Test Modal Component ─────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, 
  Brain, Trophy, Target, Timer
} from 'lucide-react';

export default function PhaseTestModal({ 
  phase, 
  test, 
  isOpen, 
  onClose, 
  onComplete 
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isOpen && test) {
      // Convert duration to seconds (e.g., "30 mins" -> 1800)
      const durationMinutes = parseInt(test.duration.split(' ')[0]);
      setTimeLeft(durationMinutes * 60);
      setCurrentQuestion(0);
      setAnswers({});
      setIsSubmitted(false);
      setScore(0);
    }
  }, [isOpen, test]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    test.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / test.questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    
    setTimeout(() => {
      onComplete(phase.id, finalScore);
      onClose();
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  if (!isOpen || !test) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-bg-primary rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-bg-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-bold text-xl text-text-primary mb-1">
                  {test.title}
                </h2>
                <p className="text-text-muted text-sm">
                  {phase.name} • {test.difficulty} Level
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-bg-elevated rounded-lg transition-colors"
              >
                <X size={20} className="text-text-muted" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">
                  Question {currentQuestion + 1} of {test.questions.length}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-text-muted">
                    Answered: {answeredCount}/{test.questions.length}
                  </span>
                  <div className={`flex items-center gap-1 ${
                    timeLeft < 300 ? 'text-red-400' : 'text-text-muted'
                  }`}>
                    <Timer size={14} />
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              <div className="w-full h-2 bg-bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-green to-accent-green-light rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {!isSubmitted ? (
              <div className="space-y-6">
                {/* Question */}
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain size={16} className="text-accent-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-text-primary text-lg mb-2">
                        {test.questions[currentQuestion].question}
                      </h3>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 pl-11">
                    {test.questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(test.questions[currentQuestion].id, index)}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          answers[test.questions[currentQuestion].id] === index
                            ? 'border-accent-green bg-accent-green/5 text-accent-green'
                            : 'border-bg-border hover:border-accent-green/30 text-text-primary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            answers[test.questions[currentQuestion].id] === index
                              ? 'border-accent-green bg-accent-green'
                              : 'border-text-dim'
                          }`}>
                            {answers[test.questions[currentQuestion].id] === index && (
                              <div className="w-2 h-2 bg-bg-primary rounded-full" />
                            )}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Results */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {score >= test.passingScore ? (
                    <Trophy size={40} className="text-accent-green" />
                  ) : (
                    <AlertCircle size={40} className="text-orange-400" />
                  )}
                </div>
                
                <h3 className="font-display font-bold text-2xl text-text-primary mb-2">
                  {score >= test.passingScore ? 'Congratulations!' : 'Keep Learning!'}
                </h3>
                
                <p className="text-text-muted text-lg mb-6">
                  Your Score: <span className={`font-bold ${score >= test.passingScore ? 'text-accent-green' : 'text-orange-400'}`}>
                    {score}%
                  </span>
                </p>
                
                <div className="bg-bg-elevated rounded-xl p-4 max-w-md mx-auto">
                  <p className="text-text-muted text-sm">
                    {score >= test.passingScore 
                      ? 'You have successfully completed this phase and unlocked the next level!'
                      : `You need ${test.passingScore}% to pass. Review the material and try again.`
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {!isSubmitted && (
            <div className="border-t border-bg-border p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 bg-bg-elevated border border-bg-border rounded-lg text-text-muted hover:text-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                {currentQuestion === test.questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={answeredCount < test.questions.length}
                    className="px-6 py-2 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Target size={16} />
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-accent-green text-bg-primary rounded-lg font-medium hover:bg-accent-green/90 transition-colors flex items-center gap-2"
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
