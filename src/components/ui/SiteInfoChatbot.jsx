// ─── Site Info Chatbot Component ─────────────────────────────────────────────
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, Sparkles, 
  ChevronDown, ChevronUp, HelpCircle, BookOpen, 
  Users, Briefcase, Zap, Shield, BarChart2
} from 'lucide-react';

export default function SiteInfoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hi! I'm your HireUp assistant. I can help you with information about our platform. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced chatbot responses with detailed information
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Platform overview
    if (input.includes('what is') || input.includes('about') || input.includes('platform')) {
      return "🚀 **HireUp** is a cutting-edge AI-powered career platform revolutionizing how students and professionals connect with their dream opportunities.\n\n**Key Features:**\n• 🤖 Advanced AI matching algorithms\n• 📚 Personalized learning roadmaps\n• 🧪 Comprehensive skill assessments\n• 📊 Real-time progress tracking\n• 🤝 Direct recruiter connections\n• 🏆 Placement success tracking\n\n**Our Mission:** We bridge the gap between talent and opportunity by using intelligent technology to create perfect matches between candidates and employers, ensuring everyone finds their ideal career path.";
    }
    
    // For students detailed - check BEFORE general features
    if (input.includes('student') || (input.includes('candidate') && !input.includes('recruiter')) || input.includes('job seeker') || input.includes('learn') || input.includes('roadmap for me')) {
      return "🎓 **Complete Student Experience on HireUp:**\n\n**🗺️ Personalized Roadmaps:**\n• Phase-by-phase learning paths\n• Customized based on your career goals\n• Includes recommended resources and projects\n• Timeline with achievable milestones\n\n**🧪 Skill Assessment System:**\n• AI-generated tests for each skill\n• Progressive difficulty levels\n• Instant feedback and explanations\n• Performance analytics and insights\n\n**💼 Job Matching Process:**\n• Profile optimization with AI suggestions\n• Smart matching based on skills and preferences\n• Direct connections to hiring managers\n• Application status tracking\n\n**📚 Learning Resources:**\n• Curated content for each skill\n• Hands-on project recommendations\n• Industry-relevant tutorials\n• Peer learning communities\n\n**📊 Progress Tracking:**\n• Real-time skill development metrics\n• Achievement badges and certificates\n• Performance comparisons with industry standards\n• Personalized recommendations for improvement\n\nStart your journey today and let AI guide you to your dream career!";
    }
    
    // For recruiters detailed - check BEFORE general features
    if (input.includes('recruiter') || input.includes('employer') || input.includes('company') || input.includes('hiring') || input.includes('talent acquisition') || (input.includes('candidate') && (input.includes('manage') || input.includes('screen') || input.includes('hire')))) {
      return "🏢 **Enterprise Recruiter Solutions:**\n\n**🤖 AI-Powered Matching:**\n• 95% accuracy in candidate-job matching\n• Reduces screening time by 80%\n• Matches based on skills, experience, and cultural fit\n• Continuous learning from hiring patterns\n\n**👥 Candidate Management:**\n• Advanced filtering with 50+ criteria\n• Unified candidate profiles with all information\n• Collaborative evaluation tools\n• Automated communication workflows\n\n**📊 Analytics & Insights:**\n• Real-time hiring pipeline metrics\n• Diversity and inclusion analytics\n• Time-to-hire optimization insights\n• Cost-per-hire tracking\n\n**💼 Job Posting Tools:**\n• AI-optimized job descriptions\n• Multi-channel job distribution\n• Applicant tracking system (ATS)\n• Interview scheduling automation\n\n**🔧 Integration Capabilities:**\n• HR system integrations (Workday, SAP)\n• Calendar sync (Outlook, Google)\n• Communication tools (Slack, Teams)\n• Custom API access\n\n**📈 Results:**\n• 60% faster hiring process\n• 40% improvement in quality of hire\n• 50% reduction in recruitment costs\n\nTransform your hiring process with intelligent automation!";
    }
    
    // Features detailed - check AFTER specific user types
    if (input.includes('features') || input.includes('offer') || input.includes('what can')) {
      return "✨ **HireUp Comprehensive Features:**\n\n**🎯 For Job Seekers:**\n• AI-powered career path recommendations\n• Personalized skill development roadmaps\n• Interactive skill assessment tests\n• Real-time job matching based on profile\n• Application tracking and analytics\n• Interview preparation tools\n• Resume optimization suggestions\n\n**🏢 For Recruiters:**\n• Advanced candidate filtering system\n• AI-driven candidate-job matching\n• Automated screening processes\n• Interview scheduling tools\n• Analytics dashboard with insights\n• Talent pipeline management\n• Collaborative hiring workflows\n\n**📈 Advanced Analytics:**\n• Skill gap analysis\n• Market trend insights\n• Salary benchmarking\n• Success rate tracking";
    }
    
    // Roadmap feature detailed
    if (input.includes('roadmap') || input.includes('learning path')) {
      return "🗺️ **AI-Powered Learning Roadmaps:**\n\n**🎯 Personalization:**\n• Analyzes your current skills and career goals\n• Creates customized learning paths\n• Adapts based on your progress and market trends\n\n**📚 Structured Learning:**\n• 4-6 progressive phases per career path\n• Each phase includes specific skills and projects\n• Estimated timelines and milestones\n• Prerequisites and dependencies clearly mapped\n\n**🧪 Integrated Assessments:**\n• Skill tests at the end of each phase\n• Practical projects to demonstrate mastery\n• Peer review and feedback systems\n• Industry-recognized certifications\n\n**📈 Progress Tracking:**\n• Real-time dashboards showing skill development\n• Achievement badges and milestone celebrations\n• Comparison with industry benchmarks\n• Personalized recommendations for improvement\n\n**🔄 Continuous Updates:**\n• Roadmaps update based on industry changes\n• New skills added as market demands evolve\n• Integration with emerging technologies\n\n**🎓 Career Paths Available:**\n• Software Development (Frontend, Backend, Full Stack)\n• Data Science & Machine Learning\n• Cloud Computing & DevOps\n• Product Management & UX Design\n• Digital Marketing & Sales\n\nStart with a free assessment and get your personalized roadmap today!";
    }
    
    // How it works detailed
    if (input.includes('how') || input.includes('work') || input.includes('start')) {
      return "🔧 **Getting Started with HireUp - Simple 4-Step Process:**\n\n**📝 Step 1: Create Your Profile (5 minutes)**\n• Sign up with email or LinkedIn\n• Complete your professional profile\n• Add your skills, experience, and career goals\n• Upload your resume (optional)\n\n**🎯 Step 2: AI Assessment & Roadmap Generation**\n• Take our comprehensive skill assessment\n• AI analyzes your strengths and areas for improvement\n• Receive your personalized learning roadmap\n• Get matched with suitable career opportunities\n\n**📚 Step 3: Learn & Develop**\n• Follow your customized learning path\n• Complete recommended courses and projects\n• Take skill tests to validate your learning\n• Earn certificates and badges\n\n**💼 Step 4: Get Hired!**\n• Apply to matched opportunities with one click\n• Connect directly with hiring managers\n• Track your application progress\n• Receive interview preparation support\n\n**⚡ Premium Features:**\n• Priority matching with top companies\n• Advanced analytics and insights\n• Personal career coaching\n• Exclusive access to unlisted jobs\n\n**🎯 Success Rate:** 87% of users land their dream job within 3 months!\n\nReady to transform your career? Get started in just 5 minutes!";
    }
    
    // Pricing detailed
    if (input.includes('price') || input.includes('cost') || input.includes('free')) {
      return "💰 **HireUp Pricing Plans:**\n\n**🆓 Free Plan (Perfect for getting started)**\n• ✅ Complete professional profile\n• ✅ Basic skill assessment (5 skills)\n• ✅ Access to 3 learning roadmaps\n• ✅ Apply to up to 10 jobs per month\n• ✅ Basic progress tracking\n• 💳 **Cost: $0/month**\n\n**💎 Professional Plan ($19/month)**\n• ✅ Everything in Free, plus:\n• ✅ Unlimited skill assessments\n• ✅ Access to all learning roadmaps\n• ✅ Unlimited job applications\n• ✅ Advanced analytics dashboard\n• ✅ AI-powered resume optimization\n• ✅ Interview preparation tools\n• ✅ Priority customer support\n\n**🏢 Enterprise Plan (Custom pricing)**\n• ✅ Everything in Professional, plus:\n• ✅ Team collaboration tools\n• ✅ Advanced hiring analytics\n• ✅ Custom integrations\n• ✅ Dedicated account manager\n• ✅ White-label options\n• ✅ API access\n• 📞 **Contact for custom pricing**\n\n**🎓 Student Discount:** 50% off Professional plan with valid student ID\n\n**💳 Flexible Billing:** Monthly or annual billing (save 20% with annual)\n\n**🔄 30-Day Money-Back Guarantee** on all paid plans\n\nStart free today, upgrade when you're ready to accelerate your career!";
    }
    
    // Skills/Tests detailed
    if (input.includes('skills') || input.includes('test') || input.includes('assessment')) {
      return "🧪 **Advanced Skill Assessment System:**\n\n**🎯 Comprehensive Coverage:**\n• 500+ skills across 20+ industries\n• Technical skills (Programming, Cloud, Data)\n• Soft skills (Communication, Leadership)\n• Domain-specific skills (Finance, Marketing, etc.)\n\n**📊 Assessment Methodology:**\n• Adaptive difficulty based on your responses\n• Multiple question formats (MCQ, coding, practical)\n• Time-based and project-based assessments\n• Real-world problem scenarios\n\n**🔍 Detailed Analytics:**\n• Skill proficiency scores (0-100)\n• Comparison with industry benchmarks\n• Strength and weakness analysis\n• Learning recommendations\n• Progress tracking over time\n\n**📝 Test Features:**\n• Instant results and explanations\n• Personalized study material suggestions\n• Retake options after improvement period\n• Shareable certificates for social media\n\n**🏆 Certification Levels:**\n• Beginner (0-40%)\n• Intermediate (41-70%)\n• Advanced (71-90%)\n• Expert (91-100%)\n\n**🔄 Continuous Updates:**\n• Questions updated based on industry trends\n• New skills added monthly\n• Feedback-driven improvements\n\n**📈 Success Metrics:**\n• 92% of users improve their scores within 2 weeks\n• 85% report better interview performance\n• 78% receive job offers based on certified skills\n\nValidate your skills today and stand out from the competition!";
    }
    
    // Contact/Support detailed
    if (input.includes('contact') || input.includes('support') || input.includes('help')) {
      return "📞 **Comprehensive Support System:**\n\n**💬 Live Chat Support**\n• ⏰ Available: Mon-Fri, 9AM-9PM EST\n• ⚡ Average response time: 2 minutes\n• 🎯 Get instant help with technical issues\n\n**📧 Email Support**\n• 📧 support@hireup.com\n• ⏰ 24/7 availability\n• ⏱️ Response within 4 hours\n• 📎 Attach screenshots for better assistance\n\n**📱 Phone Support**\n• 📞 1-800-HIREUP (447-387)\n• ⏰ Mon-Fri, 9AM-6PM EST\n• 🇺🇸 US-based support team\n• 🎧 Toll-free number\n\n**📚 Self-Service Resources**\n• 📖 Comprehensive help center\n• 🎥 Video tutorials (100+ videos)\n• 📄 Detailed documentation\n• ❓ FAQ section with 500+ answers\n\n**🏢 Enterprise Support**\n• 🎯 Dedicated account manager\n• 📞 Priority support line\n• 🚀 24/7 emergency support\n• 📋 Custom training sessions\n\n**🌍 Social Media**\n• 🐦 Twitter: @HireUp\n• 💼 LinkedIn: /company/hireup\n• 📷 Instagram: @hireup_careers\n• 🎥 YouTube: HireUp Official\n\n**🎓 Community Forum**\n• 💬 Peer-to-peer support\n• 🎯 Expert moderators\n• 🏆 Monthly challenges\n• 📚 Learning resources\n\n**🚨 Emergency Issues**\n• 📧 emergency@hireup.com\n• ⏰ 24/7 monitoring\n• ⚡ Immediate response for critical issues\n\nWe're committed to your success! Reach out anytime - we're here to help you thrive in your career journey.";
    }
    
    // Default enhanced response
    return "💡 **I'm here to help you with comprehensive information about HireUp!**\n\n**🎯 Popular Topics:**\n• 🚀 Platform overview and features\n• 👥 Student benefits and tools\n• 🏢 Recruiter solutions\n• 🗺️ AI learning roadmaps\n• 🧪 Skill assessment system\n• 💰 Pricing and plans\n• � Support and contact\n\n**💬 Ask me about:**\n• \"How does HireUp work?\"\n• \"What features are available for students?\"\n• \"Tell me about recruiter tools\"\n• \"How do AI roadmaps work?\"\n• \"What are the pricing plans?\"\n• \"How can I contact support?\"\n\n**✨ I provide detailed, reliable answers to help you make the most of HireUp!**\n\nWhat specific aspect would you like to explore in detail?";
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { icon: Sparkles, text: "How it works", query: "How does HireUp work?" },
    { icon: Users, text: "For students", query: "What features are available for students?" },
    { icon: Briefcase, text: "For recruiters", query: "What can recruiters do on HireUp?" },
    { icon: BookOpen, text: "Roadmaps", query: "Tell me about AI roadmaps" },
    { icon: Zap, text: "Features", query: "What features does HireUp offer?" },
    { icon: HelpCircle, text: "Support", query: "How can I contact support?" }
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent-green text-white rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-bg-card border border-bg-border rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-green to-emerald-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">HireUp Assistant</h3>
                    <p className="text-xs opacity-90">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 bg-accent-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-accent-green" />
                        </div>
                      )}
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl px-4 py-2 ${
                          message.type === 'user' 
                            ? 'bg-accent-green text-white' 
                            : 'bg-bg-elevated text-text-primary border border-bg-border'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        </div>
                        <p className="text-xs text-text-dim mt-1 px-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-8 h-8 bg-accent-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-accent-green" />
                      </div>
                      <div className="bg-bg-elevated text-text-primary border border-bg-border rounded-2xl px-4 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-text-dim rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-text-dim rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-text-dim rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions - Always Show */}
                <div className="px-4 pb-2">
                  <p className="text-xs text-text-muted mb-2">Quick questions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputValue(action.query);
                          setTimeout(sendMessage, 100);
                        }}
                        className="flex items-center gap-2 p-2 bg-bg-elevated border border-bg-border rounded-lg hover:bg-bg-hover transition-colors text-xs"
                      >
                        <action.icon size={14} className="text-accent-green" />
                        {action.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-bg-border">
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => {
                        setMessages([{
                          id: Date.now(),
                          type: 'bot',
                          text: "👋 Hi! I'm your HireUp assistant. I can help you with information about our platform. What would you like to know?",
                          timestamp: new Date()
                        }]);
                        setInputValue('');
                      }}
                      className="flex-1 px-3 py-1.5 bg-bg-elevated border border-bg-border rounded-lg hover:bg-bg-hover transition-colors text-xs text-text-primary flex items-center justify-center gap-2"
                    >
                      <Sparkles size={12} className="text-accent-green" />
                      New Chat
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about HireUp..."
                      className="flex-1 px-4 py-2 bg-bg-elevated border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={inputValue.trim() === '' || isTyping}
                      className="w-10 h-10 bg-accent-green text-white rounded-lg flex items-center justify-center hover:bg-accent-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
