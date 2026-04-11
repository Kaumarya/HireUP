// ─── Settings Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, Save, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Profile
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Technical Recruiter',
    department: 'Human Resources',
    bio: 'Passionate about connecting talented individuals with their dream opportunities.',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newApplications: true,
    interviewReminders: true,
    weeklyDigest: true,
    
    // Privacy
    profileVisibility: 'public',
    showContactInfo: true,
    allowMessages: true,
    twoFactorAuth: false,
    
    // Preferences
    language: 'english',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light'
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSimpleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSettings = () => {
    // Save logic here
    console.log('Settings saved:', formData);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette }
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/recruiter-dashboard" 
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
              Settings
            </h1>
            <p className="text-text-muted text-lg">
              Manage your account settings and preferences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl"
          >
            {/* Tabs */}
            <div className="border-b border-bg-border">
              <div className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 border-b-2 transition-all ${
                        activeTab === tab.id
                          ? 'border-accent-green text-accent-green'
                          : 'border-transparent text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleSimpleChange('firstName', e.target.value)}
                          className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleSimpleChange('lastName', e.target.value)}
                          className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleSimpleChange('email', e.target.value)}
                          className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleSimpleChange('phone', e.target.value)}
                          className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Job Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleSimpleChange('title', e.target.value)}
                          className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Department</label>
                        <select
                          value={formData.department}
                          onChange={(e) => handleSimpleChange('department', e.target.value)}
                          className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                        >
                          <option value="Human Resources">Human Resources</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleSimpleChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary resize-none"
                    />
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full px-4 py-2 pr-10 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-primary"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <h4 className="font-medium text-text-primary">Email Notifications</h4>
                        <p className="text-sm text-text-dim">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.emailNotifications}
                          onChange={(e) => handleSimpleChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-border rounded-full peer peer-checked:bg-accent-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <h4 className="font-medium text-text-primary">Push Notifications</h4>
                        <p className="text-sm text-text-dim">Receive browser push notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.pushNotifications}
                          onChange={(e) => handleSimpleChange('pushNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-border rounded-full peer peer-checked:bg-accent-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <h4 className="font-medium text-text-primary">New Applications</h4>
                        <p className="text-sm text-text-dim">Get notified when new applications are received</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.newApplications}
                          onChange={(e) => handleSimpleChange('newApplications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-border rounded-full peer peer-checked:bg-accent-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <h4 className="font-medium text-text-primary">Interview Reminders</h4>
                        <p className="text-sm text-text-dim">Remind me about upcoming interviews</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interviewReminders}
                          onChange={(e) => handleSimpleChange('interviewReminders', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-border rounded-full peer peer-checked:bg-accent-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Profile Visibility</label>
                      <select
                        value={formData.profileVisibility}
                        onChange={(e) => handleSimpleChange('profileVisibility', e.target.value)}
                        className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                      >
                        <option value="public">Public</option>
                        <option value="internal">Internal Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <h4 className="font-medium text-text-primary">Show Contact Information</h4>
                        <p className="text-sm text-text-dim">Display email and phone to candidates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.showContactInfo}
                          onChange={(e) => handleSimpleChange('showContactInfo', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-border rounded-full peer peer-checked:bg-accent-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <h4 className="font-medium text-text-primary">Allow Messages</h4>
                        <p className="text-sm text-text-dim">Let candidates send you messages</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.allowMessages}
                          onChange={(e) => handleSimpleChange('allowMessages', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-border rounded-full peer peer-checked:bg-accent-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <h4 className="font-medium text-text-primary">Two-Factor Authentication</h4>
                        <p className="text-sm text-text-dim">Add an extra layer of security</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.twoFactorAuth}
                          onChange={(e) => handleSimpleChange('twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-bg-border rounded-full peer peer-checked:bg-accent-green peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Language</label>
                      <select
                        value={formData.language}
                        onChange={(e) => handleSimpleChange('language', e.target.value)}
                        className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Timezone</label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => handleSimpleChange('timezone', e.target.value)}
                        className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                      >
                        <option value="UTC-8">UTC-8 (PST)</option>
                        <option value="UTC-5">UTC-5 (EST)</option>
                        <option value="UTC+0">UTC+0 (GMT)</option>
                        <option value="UTC+5:30">UTC+5:30 (IST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Date Format</label>
                      <select
                        value={formData.dateFormat}
                        onChange={(e) => handleSimpleChange('dateFormat', e.target.value)}
                        className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Theme</label>
                      <select
                        value={formData.theme}
                        onChange={(e) => handleSimpleChange('theme', e.target.value)}
                        className="w-full px-4 py-2 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none text-text-primary"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Save Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={saveSettings}
                  className="flex items-center gap-2 px-6 py-3 bg-accent-green text-bg-primary rounded-xl font-display font-semibold hover:bg-accent-green/90 transition-colors"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
