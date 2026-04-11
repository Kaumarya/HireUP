// ─── Student Messages Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Send, Paperclip, Phone, Video, MoreVertical, Check } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Technical Recruiter',
    company: 'TechCorp Inc.',
    avatar: 'SJ',
    lastMessage: 'Hi Aryan! I reviewed your profile and would like to schedule an interview for the React Developer position.',
    time: '2 min ago',
    unread: 2,
    online: true,
    status: 'interview_requested'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Senior Developer',
    company: 'StartupHub',
    avatar: 'MC',
    lastMessage: 'Your application looks great! When would you be available for a technical discussion?',
    time: '1 hour ago',
    unread: 1,
    online: false,
    status: 'application_reviewed'
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'HR Manager',
    company: 'FinTech Solutions',
    avatar: 'ED',
    lastMessage: 'Thank you for your interest in the Full Stack position. We\'d like to move forward with your application.',
    time: '3 hours ago',
    unread: 0,
    online: true,
    status: 'shortlisted'
  },
  {
    id: 4,
    name: 'David Kumar',
    role: 'Engineering Lead',
    company: 'CloudScale',
    avatar: 'DK',
    lastMessage: 'Your portfolio is impressive! Do you have experience with microservices architecture?',
    time: '1 day ago',
    unread: 0,
    online: false,
    status: 'initial_contact'
  }
];

const mockMessages = [
  {
    id: 1,
    sender: 'recruiter',
    text: 'Hi Aryan! I came across your profile on HireUP and I\'m impressed with your React experience.',
    time: '10:30 AM'
  },
  {
    id: 2,
    sender: 'me',
    text: 'Thank you for reaching out! I\'m definitely interested in opportunities at TechCorp.',
    time: '10:32 AM'
  },
  {
    id: 3,
    sender: 'recruiter',
    text: 'Great! We have an opening for a React Developer position. Would you be available for an interview this week?',
    time: '10:33 AM'
  },
  {
    id: 4,
    sender: 'me',
    text: 'Yes, I\'m available! Thursday or Friday would work well for me.',
    time: '10:35 AM'
  },
  {
    id: 5,
    sender: 'recruiter',
    text: 'Perfect! I\'ve scheduled you for Thursday at 2 PM. You\'ll receive a calendar invite shortly.',
    time: '10:36 AM'
  },
  {
    id: 6,
    sender: 'recruiter',
    text: 'Hi Aryan! I reviewed your profile and would like to schedule an interview for the React Developer position.',
    time: '2 min ago'
  }
];

export default function StudentMessages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'interview_requested': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'application_reviewed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'shortlisted': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'initial_contact': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
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
              Messages
            </h1>
            <p className="text-text-muted text-lg">
              Connect with recruiters and track your application conversations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="glass-card rounded-2xl">
                {/* Search */}
                <div className="p-4 border-b border-bg-border">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-green" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary placeholder-text-dim"
                    />
                  </div>
                </div>

                {/* Conversations */}
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ backgroundColor: 'rgba(34,197,94,0.05)' }}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b border-bg-border cursor-pointer transition-all ${
                        selectedConversation.id === conversation.id ? 'bg-accent-green/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green font-display font-bold">
                            {conversation.avatar}
                          </div>
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green rounded-full border-2 border-bg-card"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-display font-semibold text-text-primary truncate">
                              {conversation.name}
                            </h3>
                            <span className="text-xs text-text-dim">{conversation.time}</span>
                          </div>
                          <p className="text-xs text-accent-green mb-1">{conversation.role}</p>
                          <p className="text-xs text-text-muted mb-2">{conversation.company}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-text-muted truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread > 0 && (
                              <span className="bg-accent-green text-bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-display font-bold">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                          <div className="mt-2">
                            <span className={`text-xs border px-2 py-0.5 rounded-full ${getStatusColor(conversation.status)}`}>
                              {conversation.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-bg-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green font-display font-bold">
                        {selectedConversation.avatar}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-text-primary">
                          {selectedConversation.name}
                        </h3>
                        <p className="text-xs text-accent-green">
                          {selectedConversation.role} at {selectedConversation.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors">
                        <Phone size={18} className="text-text-dim" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors">
                        <Video size={18} className="text-text-dim" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors">
                        <MoreVertical size={18} className="text-text-dim" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {mockMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        msg.sender === 'me' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
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
                    <button className="p-2 rounded-lg hover:bg-bg-elevated transition-colors">
                      <Paperclip size={18} className="text-text-dim" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-bg-elevated border border-bg-border rounded-xl px-4 py-2.5 focus:border-accent-green/50 focus:outline-none transition-all text-text-primary placeholder-text-dim"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2.5 rounded-xl bg-accent-green text-white hover:bg-accent-green/90 transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
