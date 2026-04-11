// ─── Recruiter Settings Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Settings, Save, Building, Briefcase, Users, TrendingUp, Award } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

export default function RecruiterSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    // Profile
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Technical Recruiter',
    department: 'Human Resources',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    bio: 'Passionate about connecting talented individuals with their dream opportunities. Specialized in tech recruitment with 8+ years of experience.',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'techcorp.com/careers',
    
    // Privacy
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    allowMessages: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    newApplications: true,
    interviewReminders: true,
    weeklyDigest: true,
    candidateAlerts: true,
    
    // Password
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    console.log('Recruiter settings saved:', formData);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar role="recruiter" />
      
      <main className="pt-24 pb-16 md:ml-60">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
              Settings
            </h1>
            <p className="text-text-muted text-lg">
              Manage your recruiter profile, privacy, and notification preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="glass-card rounded-2xl p-4">
                <nav className="space-y-1">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'company', label: 'Company', icon: Building },
                    { id: 'privacy', label: 'Privacy', icon: Shield },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                    { id: 'account', label: 'Account', icon: Settings },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-accent-green/10 text-accent-green'
                          : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
                      }`}
                    >
                      <tab.icon size={18} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl p-6">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-4">
                      Profile Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Department
                        </label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({...formData, department: e.target.value})}
                          className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Bio
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Company Settings */}
                {activeTab === 'company' && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-4">
                      Company Information
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                          className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Company Website
                        </label>
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-bg-elevated rounded-xl">
                      <h3 className="font-medium text-text-primary mb-3">Recruiting Stats</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent-green">247</div>
                          <div className="text-sm text-text-muted">Total Hires</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">18</div>
                          <div className="text-sm text-text-muted">Avg Days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">94%</div>
                          <div className="text-sm text-text-muted">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">4.8</div>
                          <div className="text-sm text-text-muted">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-4">
                      Privacy Settings
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Profile Visibility</h3>
                          <p className="text-sm text-text-muted">Control who can see your recruiter profile</p>
                        </div>
                        <select
                          value={formData.profileVisibility}
                          onChange={(e) => setFormData({...formData, profileVisibility: e.target.value})}
                          className="px-4 py-2 bg-bg-card border border-bg-border rounded-xl text-text-primary"
                        >
                          <option value="public">Public</option>
                          <option value="candidates">Candidates Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Show Email</h3>
                          <p className="text-sm text-text-muted">Display email on your profile</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, showEmail: !formData.showEmail})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.showEmail ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.showEmail ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Show Phone</h3>
                          <p className="text-sm text-text-muted">Display phone number on your profile</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, showPhone: !formData.showPhone})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.showPhone ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.showPhone ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Allow Messages</h3>
                          <p className="text-sm text-text-muted">Let candidates send you messages</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, allowMessages: !formData.allowMessages})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.allowMessages ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.allowMessages ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-4">
                      Notification Preferences
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Email Notifications</h3>
                          <p className="text-sm text-text-muted">Receive updates via email</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, emailNotifications: !formData.emailNotifications})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.emailNotifications ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Push Notifications</h3>
                          <p className="text-sm text-text-muted">Receive browser notifications</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, pushNotifications: !formData.pushNotifications})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.pushNotifications ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">New Applications</h3>
                          <p className="text-sm text-text-muted">Get notified about new candidate applications</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, newApplications: !formData.newApplications})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.newApplications ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.newApplications ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Interview Reminders</h3>
                          <p className="text-sm text-text-muted">Get reminders for scheduled interviews</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, interviewReminders: !formData.interviewReminders})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.interviewReminders ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.interviewReminders ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Weekly Digest</h3>
                          <p className="text-sm text-text-muted">Receive weekly summary of recruiting activity</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, weeklyDigest: !formData.weeklyDigest})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.weeklyDigest ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.weeklyDigest ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Candidate Alerts</h3>
                          <p className="text-sm text-text-muted">Get notified about matching candidates</p>
                        </div>
                        <button
                          onClick={() => setFormData({...formData, candidateAlerts: !formData.candidateAlerts})}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            formData.candidateAlerts ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            formData.candidateAlerts ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analytics Settings */}
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-4">
                      Analytics Preferences
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Share Anonymous Data</h3>
                          <p className="text-sm text-text-muted">Help improve platform with anonymous usage data</p>
                        </div>
                        <button className="w-12 h-6 rounded-full transition-colors bg-accent-green">
                          <div className="w-5 h-5 bg-white rounded-full transition-transform translate-x-6" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Performance Reports</h3>
                          <p className="text-sm text-text-muted">Receive monthly performance reports</p>
                        </div>
                        <button className="w-12 h-6 rounded-full transition-colors bg-accent-green">
                          <div className="w-5 h-5 bg-white rounded-full transition-transform translate-x-6" />
                        </button>
                      </div>

                      <div className="p-4 bg-bg-elevated rounded-xl">
                        <h3 className="font-medium text-text-primary mb-3">Recent Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-muted">Application Response Rate</span>
                            <span className="text-sm font-semibold text-accent-green">87%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-muted">Time to Hire</span>
                            <span className="text-sm font-semibold text-blue-400">18 days</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-text-muted">Offer Acceptance</span>
                            <span className="text-sm font-semibold text-purple-400">92%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-4">
                      Account Settings
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-text-primary mb-4">Change Password</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={formData.currentPassword}
                              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                              className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={formData.newPassword}
                              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                              className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                              className="w-full px-4 py-2.5 bg-bg-elevated border border-bg-border rounded-xl focus:border-accent-green/50 focus:outline-none transition-all text-text-primary"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-bg-border pt-6">
                        <h3 className="font-medium text-text-primary mb-4">Account Management</h3>
                        <div className="space-y-3">
                          <button className="px-4 py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors">
                            Export Recruiting Data
                          </button>
                          <button className="px-4 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/20 transition-colors ml-3">
                            Download Reports
                          </button>
                          <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors ml-3">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-bg-border">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-green text-white rounded-xl font-display font-semibold hover:bg-accent-green/90 transition-colors"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
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
