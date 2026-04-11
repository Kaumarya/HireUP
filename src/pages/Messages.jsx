// ─── Messages Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Send, Paperclip, Phone, Video, MoreVertical, Check } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const mockConversations = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'React Developer',
    avatar: 'PS',
    lastMessage: 'Thank you for the opportunity! I\'m excited about this role.',
    time: '2 min ago',
    unread: 2,
    online: true,
    status: 'interview_scheduled'
  },
  {
    id: 2,
    name: 'Rahul Nair',
    role: 'ML Engineer',
    avatar: 'RN',
    lastMessage: 'I have updated my portfolio with recent projects.',
    time: '1 hour ago',
    unread: 0,
    online: true,
    status: 'under_review'
  },
  {
    id: 3,
    name: 'Sneha Patel',
    role: 'Full Stack Developer',
    avatar: 'SP',
    lastMessage: 'Looking forward to our discussion tomorrow!',
    time: '3 hours ago',
    unread: 1,
    online: false,
    status: 'interview_scheduled'
  },
  {
    id: 4,
    name: 'Amit Kumar',
    role: 'Product Designer',
    avatar: 'AK',
    lastMessage: 'The design samples are attached for your review.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    status: 'offer_extended'
  },
  {
    id: 5,
    name: 'Kavita Reddy',
    role: 'Marketing Manager',
    avatar: 'KR',
    lastMessage: 'Can we reschedule the interview to next week?',
    time: '2 days ago',
    unread: 3,
    online: false,
    status: 'screening'
  }
];

const mockMessages = [
  { id: 1, sender: 'candidate', text: 'Hi! I saw your job posting for React Developer position.', time: '10:00 AM' },
  { id: 2, sender: 'me', text: 'Hello! Thanks for your interest. I\'ve reviewed your profile and it looks great.', time: '10:15 AM' },
  { id: 3, sender: 'candidate', text: 'That\'s wonderful to hear! I have 5 years of experience in React development.', time: '10:20 AM' },
  { id: 4, sender: 'me', text: 'Excellent! Would you be available for a technical interview this week?', time: '10:30 AM' },
  { id: 5, sender: 'candidate', text: 'Thank you for the opportunity! I\'m excited about this role.', time: '10:45 AM' }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredConversations = mockConversations.filter(conv => {
    const matchesSearch = !searchQuery || 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || conv.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'interview_scheduled': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'offer_extended': return 'bg-green-100 text-green-800';
      case 'screening': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'interview_scheduled': return 'Interview Scheduled';
      case 'under_review': return 'Under Review';
      case 'offer_extended': return 'Offer Extended';
      case 'screening': return 'Screening';
      default: return 'Unknown';
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Add message to conversation
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 h-[calc(100vh-8rem)]">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <Link 
                to="/recruiter-dashboard" 
                className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-2"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </Link>
              <h1 className="font-display font-bold text-3xl text-text-primary">
                Messages
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-dim">
                {mockConversations.filter(c => c.unread > 0).reduce((acc, c) => acc + c.unread, 0)} unread messages
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl h-[calc(100%-6rem)] flex"
          >
            {/* Conversations List */}
            <div className="w-80 border-r border-bg-border flex flex-col">
              {/* Search and Filter */}
              <div className="p-4 border-b border-bg-border">
                <div className="relative mb-3">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-bg-elevated border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none text-sm text-text-primary placeholder-text-dim"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-elevated border border-bg-border rounded-lg text-sm text-text-primary focus:border-accent-green/50 focus:outline-none"
                >
                  <option value="all">All Candidates</option>
                  <option value="screening">Screening</option>
                  <option value="under_review">Under Review</option>
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="offer_extended">Offer Extended</option>
                </select>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ backgroundColor: 'rgba(34, 197, 94, 0.05)' }}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 border-b border-bg-border cursor-pointer transition-all ${
                      selectedConversation.id === conv.id ? 'bg-accent-green/5 border-l-4 border-l-accent-green' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center text-sm font-semibold text-accent-green">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-primary"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display font-semibold text-sm text-text-primary truncate">
                            {conv.name}
                          </h4>
                          <span className="text-xs text-text-dim">{conv.time}</span>
                        </div>
                        <p className="text-xs text-text-dim mb-2">{conv.role}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-text-muted truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-accent-green text-white text-xs rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(conv.status)}`}>
                          {getStatusText(conv.status)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-bg-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-green/20 flex items-center justify-center text-sm font-semibold text-accent-green">
                        {selectedConversation.avatar}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-text-primary">{selectedConversation.name}</h3>
                        <p className="text-sm text-text-dim">{selectedConversation.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-text-muted hover:text-accent-green hover:bg-accent-green/10 rounded-lg transition-all">
                        <Phone size={18} />
                      </button>
                      <button className="p-2 text-text-muted hover:text-accent-green hover:bg-accent-green/10 rounded-lg transition-all">
                        <Video size={18} />
                      </button>
                      <button className="p-2 text-text-muted hover:text-accent-green hover:bg-accent-green/10 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          msg.sender === 'me'
                            ? 'bg-accent-green text-white'
                            : 'bg-bg-elevated text-text-primary'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 ${
                            msg.sender === 'me' ? 'text-white/70' : 'text-text-dim'
                          }`}>
                            <span className="text-xs">{msg.time}</span>
                            {msg.sender === 'me' && (
                              <Check size={14} />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-bg-border">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-text-muted hover:text-accent-green hover:bg-accent-green/10 rounded-lg transition-all">
                        <Paperclip size={20} />
                      </button>
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary placeholder-text-dim"
                      />
                      <button
                        onClick={sendMessage}
                        className="p-2 bg-accent-green text-white rounded-xl hover:bg-accent-green/90 transition-colors"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-text-dim text-lg">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
