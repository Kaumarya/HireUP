// ─── Voice Interview Page ───────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Mic, MicOff, Volume2, VolumeX, Send, Play, Pause, 
  RotateCcw, CheckCircle, AlertCircle, Clock, User, Bot, Sparkles
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import aiService from '../services/aiService.js';

export default function VoiceInterview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { interviewId } = location.state || {};
  
  // Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(1);
  
  // Interview State
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  
  // Refs
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Fix for stale closures in speech recognition
  const handleUserResponseRef = useRef(null);
  
  // Mock interview data - now only contains descriptions for AI generation
  const interviewData = {
    101: {
      title: 'Technical Interview - Full Stack',
      description: 'full-stack development covering frontend technologies like React, JavaScript, CSS, backend development with Node.js, databases, REST APIs, cloud deployment, DevOps practices, code quality, and system architecture'
    },
    102: {
      title: 'Frontend Developer Interview',
      description: 'frontend development including modern JavaScript (ES6+), React and component design, CSS frameworks and methodologies, web performance optimization, state management, responsive design, cross-browser compatibility, frontend testing, accessibility, build tools and bundlers'
    },
    103: {
      title: 'JavaScript Deep Dive',
      description: 'advanced JavaScript concepts including closures, the this keyword, promises and async/await, the event loop, variable declarations (let/const/var), memory management, decorators, higher-order functions, performance optimization, and modern JavaScript frameworks'
    },
    104: {
      title: 'Behavioral Interview',
      description: 'behavioral questions about teamwork, handling difficult team members, meeting tight deadlines, learning from mistakes, task prioritization, learning new technologies, taking initiative, handling constructive criticism, mentoring colleagues, and work-life balance'
    },
    105: {
      title: 'System Design Interview',
      description: 'system design and architecture including URL shortening services, messaging systems, social media platforms, ride-sharing apps, video streaming services, payment processing systems, e-commerce scalability, real-time collaboration tools, recommendation engines, and microservices architecture'
    },
    106: {
      title: 'Python Developer Interview',
      description: 'Python programming including Python 2 vs 3 differences, the GIL and performance, memory management, decorators and real-world usage, data structures (lists/tuples/sets), exception handling, frameworks like Django and Flask, performance optimization, generators and iterators, and virtual environments'
    }
  };
  
  const currentInterview = interviewData[interviewId] || interviewData[101];
  
  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          setTranscript(transcript);
          // Call the current ref version of handleUserResponse to avoid stale closures
          if (handleUserResponseRef.current) {
            handleUserResponseRef.current(transcript);
          }
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
  }, []);
  
  // Generate interview questions using AI
  const generateInterviewQuestions = async () => {
    setIsGeneratingQuestions(true);
    
    // Add randomness for unique questions
    const randomSeed = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    
    const prompt = `Generate 10 unique interview questions for a ${currentInterview.title}. Random seed: ${randomSeed}. Timestamp: ${timestamp}.

Topic areas: ${currentInterview.description}

CRITICAL: Return ONLY a JSON array - no other text, no explanations, no markdown.

Format: ["Question 1 here", "Question 2 here", "Question 3 here", ...]

Make questions:
1. Open-ended and conversational
2. Progressive difficulty (easy → hard)
3. Realistic for actual interviews
4. Specific to the role/topic
5. UNIQUE and different from standard interview questions

Example: ["What's your approach to...", "Describe a situation where...", "How would you handle..."]

Your response must start with [ and end with ] - nothing else!`;
    
    try {
      const response = await aiService.generateQuestions(prompt);
      
      // Clean the response
      let cleanResponse = response.trim();
      
      // Remove any markdown or extra text
      cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Find JSON array in the response
      const jsonStart = cleanResponse.indexOf('[');
      const jsonEnd = cleanResponse.lastIndexOf(']');
      
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd + 1);
      }
      
      // Parse the JSON response
      let questions = [];
      try {
        questions = JSON.parse(cleanResponse);
        
        // Validate that we got an array with questions
        if (!Array.isArray(questions) || questions.length === 0) {
          throw new Error('Invalid question array');
        }
        
        // Ensure we have exactly 10 questions
        while (questions.length < 10) {
          questions.push("Tell me more about your experience in this area.");
        }
        
      } catch (parseError) {
        console.error('Failed to parse AI questions:', parseError);
        throw parseError;
      }
      
      setGeneratedQuestions(questions);
      console.log('SUCCESSFULLY GENERATED AI QUESTIONS:', questions.length);
      return questions;
    } catch (error) {
      console.error('Error generating questions:', error);
      console.log('USING FALLBACK QUESTIONS DUE TO ERROR');
      // Fallback questions
      const fallbackQuestions = [
        "Tell me about your relevant experience for this position.",
        "What technical challenges have you faced recently?",
        "How do you approach problem-solving in your work?",
        "Describe a project you're proud of and why.",
        "How do you stay updated with industry trends?",
        "What's your experience with team collaboration?",
        "How do you handle tight deadlines or pressure?",
        "What motivates you in your professional work?",
        "Where do you see yourself in 5 years?",
        "Do you have any questions for me?"
      ];
      setGeneratedQuestions(fallbackQuestions);
      return fallbackQuestions;
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Start interview
  const startInterview = async () => {
    console.log('=== startInterview START ===');
    setIsInterviewStarted(true);
    
    // Show loading message while generating questions
    const loadingMessage = {
      id: Date.now(),
      type: 'ai',
      text: "Generating personalized interview questions for you... This will take just a moment.",
      timestamp: new Date()
    };
    setMessages([loadingMessage]);
    speakText("Generating personalized interview questions for you. This will take just a moment.");
    
    try {
      // Generate questions using AI
      const questions = await generateInterviewQuestions();
      
      // Explicitly set the generated questions state
      console.log('Setting generatedQuestions state with', questions.length, 'questions');
      setGeneratedQuestions(questions);
      
      // Remove loading message and start with first question
      setMessages([]);
      const firstQuestion = questions[0];
      setCurrentQuestion(firstQuestion);
      
      // Add AI message with first question
      const aiMessage = {
        id: Date.now(),
        type: 'ai',
        text: firstQuestion,
        timestamp: new Date()
      };
      
      setMessages([aiMessage]);
      speakText(firstQuestion);
      
      console.log('✅ Interview started successfully!');
      console.log('Final state check:');
      console.log('  - generatedQuestions.length:', questions.length);
      console.log('=== startInterview END ===');
    } catch (error) {
      console.error('Failed to start interview:', error);
      setIsInterviewStarted(false);
      setMessages([{
        id: Date.now(),
        type: 'ai',
        text: "Sorry, I couldn't generate questions. Please try again.",
        timestamp: new Date()
      }]);
    }
  };
  
  // Handle user response
  const handleUserResponse = async (userText) => {
    console.log('=== handleUserResponse START ===');
    console.log('User text:', userText);
    console.log('Current question index:', questionIndex);
    console.log('Generated questions length:', generatedQuestions.length);
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setTranscript('');
    
    // Generate AI response using Groq
    try {
      console.log('Generating AI response...');
      const response = await generateAIResponse(userText, currentQuestion);
      console.log('AI response generated:', response);
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the response
      console.log('Speaking AI response...');
      speakText(response);
      
      // Simple delay before moving to next question (3 seconds)
      console.log('Setting timeout to move to next question...');
      setTimeout(() => {
        console.log('Timeout triggered - calling moveToNextQuestion');
        moveToNextQuestion();
      }, 3000);
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback response
      const fallbackResponse = "Thank you for your response. That's helpful to know. Let's continue with the next question.";
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: fallbackResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      speakText(fallbackResponse);
      
      console.log('Using fallback response - setting timeout to move to next question...');
      setTimeout(() => {
        console.log('Fallback timeout triggered - calling moveToNextQuestion');
        moveToNextQuestion();
      }, 2000);
    }
    console.log('=== handleUserResponse END ===');
  };
  
  // Generate AI response using Groq
  const generateAIResponse = async (userResponse, question) => {
    const prompt = `You are an experienced technical interviewer conducting a mock interview. 
    The candidate was asked: "${question}". 
    The candidate responded: "${userResponse}". 

    Provide ONLY a brief, natural follow-up response that:
    1. Acknowledges their answer briefly and professionally
    2. Is honest - if they don't know or give a weak answer, be professional but don't say "great job"
    3. Does NOT repeat the question
    4. Does NOT ask the next question
    5. Is conversational and friendly
    6. Is under 30 words
    
    Response:`;
    
    try {
      const response = await aiService.generateResponse(prompt);
      return response;
    } catch (error) {
      console.error('Groq API error:', error);
      return "Thank you for sharing that. I've noted your response.";
    }
  };
  
  // Move to next question
  const moveToNextQuestion = () => {
    console.log('=== moveToNextQuestion START ===');
    console.log('Current question index:', questionIndex);
    console.log('Generated questions length:', generatedQuestions.length);
    
    const nextIndex = questionIndex + 1;
    console.log('Calculated next index:', nextIndex);
    
    if (nextIndex < generatedQuestions.length) {
      console.log('✅ Moving to next question - index', nextIndex);
      // Add a delay before showing next question
      setTimeout(() => {
        console.log('Setting question index to:', nextIndex);
        setQuestionIndex(nextIndex);
        
        const nextQuestion = generatedQuestions[nextIndex];
        console.log('Next question text:', nextQuestion);
        setCurrentQuestion(nextQuestion);
        
        // Add next question as AI message
        const aiMessage = {
          id: Date.now(),
          type: 'ai',
          text: nextQuestion,
          timestamp: new Date()
        };
        
        console.log('Adding next question to messages');
        setMessages(prev => [...prev, aiMessage]);
        
        // Speak the next question after a short delay
        setTimeout(() => {
          console.log('Speaking next question');
          speakText(nextQuestion);
        }, 500);
      }, 1000);
    } else {
      console.log('❌ No more questions - ending interview');
      console.log('This should only happen after all questions are answered');
      // End interview
      setTimeout(() => {
        console.log('Calling endInterview()');
        endInterview();
      }, 1000);
    }
    console.log('=== moveToNextQuestion END ===');
  };
  
  // End interview and evaluate performance
  const endInterview = async () => {
    console.log('=== endInterview START ===');
    
    // Add evaluation message
    const evaluatingMessage = {
      id: Date.now(),
      type: 'ai',
      text: "Interview completed! Please wait a moment while I evaluate your overall performance and calculate your score...",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, evaluatingMessage]);
    speakText("Interview completed! Please wait a moment while I evaluate your overall performance and calculate your score.");

    try {
      // Prepare messages for evaluation (exclude the current evaluation message)
      const conversationHistory = messages
        .filter(m => m.id !== evaluatingMessage.id)
        .map(m => `${m.type.toUpperCase()}: ${m.text}`)
        .join('\n');

      const evaluationPrompt = `You are an expert technical recruiter. Evaluate the following mock interview transcript:
      
      ${conversationHistory}
      
      Provide a fair evaluation of the candidate's performance.
      CRITICAL: Return ONLY a JSON object with this exact structure:
      {
        "score": number (0-100),
        "feedback": "string summarizing strengths and areas for improvement",
        "analysis": "string detailing why they got this score"
      }
      
      If the candidate answered "I don't know" or gave very short/poor answers to most questions, the score must be low (0-40).
      If they were excellent, it should be 85-100.
      
      Response MUST be valid JSON only.`;

      const aiEvaluationResponse = await aiService.generateResponse(evaluationPrompt);
      
      // Clean and parse the response
      let cleanResponse = aiEvaluationResponse.trim();
      cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Find JSON object
      const jsonStart = cleanResponse.indexOf('{');
      const jsonEnd = cleanResponse.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd + 1);
      }
      
      const evaluationResult = JSON.parse(cleanResponse);
      
      setIsInterviewEnded(true);
      setScore(evaluationResult.score || 0);
      setFeedback(evaluationResult.feedback || "Thank you for completing the interview.");
      
      // Add final feedback message
      const finalMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: `Your final score is ${evaluationResult.score}%. ${evaluationResult.feedback}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, finalMessage]);
      speakText(`Your final score is ${evaluationResult.score} percent. ${evaluationResult.feedback}`);

    } catch (error) {
      console.error('Failed to evaluate interview:', error);
      setIsInterviewEnded(true);
      // Fallback if AI fails
      const fallbackScore = 0; // Better to default to lower if we couldn't evaluate
      setScore(fallbackScore);
      setFeedback("Sorry, I had trouble analyzing your interview. Based on my notes, more preparation is needed.");
    }
    
    console.log('=== endInterview END ===');
  };
  
  // Update the ref whenever handleUserResponse changes
  useEffect(() => {
    handleUserResponseRef.current = handleUserResponse;
  }, [handleUserResponse]);
  
  // Text to speech
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = volume;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Toggle listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };
  
  // Stop speaking
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  // Restart interview
  const restartInterview = () => {
    setMessages([]);
    setQuestionIndex(0);
    setCurrentQuestion('');
    setIsInterviewStarted(false);
    setIsInterviewEnded(false);
    setFeedback('');
    setScore(0);
    setTranscript('');
    setGeneratedQuestions([]);
  };
  
  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      
      <main className="pt-24 pb-16 md:ml-60">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => navigate('/skill-tests')}
                  className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-4"
                >
                  <ArrowLeft size={18} />
                  Back to Skill Tests
                </button>
                <h1 className="font-display font-bold text-3xl text-text-primary mb-2">
                  {currentInterview.title}
                </h1>
                <p className="text-text-muted">
                  AI-Powered Voice Interview
                </p>
              </div>
              
              {isInterviewStarted && (
                <div className="flex items-center gap-4">
                  <div className="text-sm text-text-dim">
                    Question {questionIndex + 1} of {generatedQuestions.length || 10}
                  </div>
                  <button
                    onClick={restartInterview}
                    className="flex items-center gap-2 px-4 py-2 bg-bg-elevated border border-bg-border rounded-lg text-sm font-medium hover:bg-bg-border transition-colors"
                  >
                    <RotateCcw size={16} />
                    Restart Interview
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Interview Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl"
          >
            {!isInterviewStarted ? (
              // Start Interview Screen
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-accent-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mic size={40} className="text-accent-green" />
                </div>
                <h2 className="font-display font-bold text-2xl text-text-primary mb-4">
                  Ready to Start Your Interview?
                </h2>
                <p className="text-text-muted mb-8 max-w-md mx-auto">
                  This AI-powered interview will generate <strong>unique questions</strong> based on the interview type you selected. 
                  Each interview is different and tailored to the specific role.
                </p>
                
                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center gap-3 text-left p-4 bg-bg-elevated rounded-lg">
                    <CheckCircle size={18} className="text-accent-green flex-shrink-0" />
                    <span className="text-sm text-text-primary">Use Chrome or Edge for best experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-left p-4 bg-bg-elevated rounded-lg">
                    <CheckCircle size={18} className="text-accent-green flex-shrink-0" />
                    <span className="text-sm text-text-primary">Allow microphone access when prompted</span>
                  </div>
                  <div className="flex items-center gap-2 text-left p-4 bg-bg-elevated rounded-lg">
                    <CheckCircle size={18} className="text-accent-green flex-shrink-0" />
                    <span className="text-sm text-text-primary">AI generates unique questions every time</span>
                  </div>
                </div>
                
                <button
                  onClick={startInterview}
                  disabled={isGeneratingQuestions}
                  className={`mt-8 flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-colors ${
                    isGeneratingQuestions 
                      ? 'bg-bg-border text-text-dim cursor-not-allowed' 
                      : 'bg-accent-green text-white hover:bg-accent-green/90'
                  }`}
                >
                  {isGeneratingQuestions ? (
                    <>
                      <div className="w-5 h-5 border-2 border-text-dim border-t-accent-green rounded-full animate-spin"></div>
                      Generating Questions...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Start Interview
                    </>
                  )}
                </button>
              </div>
            ) : (
              // Interview Interface
              <div className="flex flex-col h-96">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.type === 'ai' && (
                          <div className="w-8 h-8 bg-accent-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot size={16} className="text-accent-green" />
                          </div>
                        )}
                        
                        <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-1' : ''}`}>
                          <div className={`p-3 rounded-2xl ${
                            message.type === 'user' 
                              ? 'bg-accent-green text-white' 
                              : 'bg-bg-elevated text-text-primary'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                          <p className="text-xs text-text-dim mt-1 px-1">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                        
                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-bg-border rounded-full flex items-center justify-center flex-shrink-0 order-2">
                            <User size={16} className="text-text-dim" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Current transcript */}
                  {transcript && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-end"
                    >
                      <div className="max-w-xs lg:max-w-md order-1">
                        <div className="p-3 rounded-2xl bg-bg-border border border-accent-green/30 text-text-primary">
                          <p className="text-sm leading-relaxed">{transcript}</p>
                        </div>
                        <p className="text-xs text-text-dim mt-1 px-1">
                          Speaking...
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-bg-border rounded-full flex items-center justify-center flex-shrink-0 order-2">
                        <User size={16} className="text-text-dim" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Controls */}
                <div className="border-t border-bg-border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Microphone Button */}
                      <button
                        onClick={toggleListening}
                        disabled={isInterviewEnded}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-accent-green text-white hover:bg-accent-green/90'
                        } ${isInterviewEnded ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                      
                      {/* Volume Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={stopSpeaking}
                          disabled={!isSpeaking}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isSpeaking 
                              ? 'bg-bg-elevated text-text-primary hover:bg-bg-border' 
                              : 'text-text-dim opacity-50'
                          }`}
                        >
                          {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                      
                      <div className="text-sm text-text-dim">
                        {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Click mic to respond'}
                      </div>
                    </div>
                    
                    {isInterviewEnded && (
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-text-dim">Final Score</p>
                          <p className="font-display font-bold text-xl text-accent-green">{score}%</p>
                        </div>
                        <button
                          onClick={() => navigate('/skill-tests')}
                          className="flex items-center gap-2 px-4 py-2 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90 transition-colors"
                        >
                          Finish Interview
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Instructions */}
          {!isInterviewStarted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 glass-card rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4">
                How It Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-green font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Click Start</h4>
                    <p className="text-sm text-text-muted">Begin the interview and allow microphone access</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-green font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Speak Naturally</h4>
                    <p className="text-sm text-text-muted">Answer questions by speaking to your microphone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-green font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Get Feedback</h4>
                    <p className="text-sm text-text-muted">AI responds instantly and provides feedback</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
