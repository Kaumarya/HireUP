// ─── Student Settings Page ───────────────────────────────────────────────────────
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Settings, Save } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

export default function StudentSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'Aryan',
    lastName: 'Mehta',
    email: 'aryan.mehta@university.edu',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    headline: 'Full-Stack Developer & ML Enthusiast',
    bio: 'Passionate about building scalable web apps and exploring AI/ML frontiers.',
    university: 'IIT Delhi',
    degree: 'B.Tech Computer Science',
    graduationYear: '2024',
    linkedin: 'linkedin.com/in/aryanmehta',
    github: 'github.com/aryanmehta',
    portfolio: 'aryanmehta.dev',
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    emailNotifications: true,
    pushNotifications: false,
    applicationUpdates: true,
    interviewReminders: true,
    newJobAlerts: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    console.log('Settings saved:', formData);
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
            <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
              Settings
            </h1>
            <p className="text-text-muted text-lg">
              Manage your profile, privacy, and notification preferences
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
                    { id: 'privacy', label: 'Privacy', icon: Shield },
                    { id: 'notifications', label: 'Notifications', icon: Bell },
                    { id: 'appearance', label: 'Appearance', icon: Palette },
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
                          <p className="text-sm text-text-muted">Control who can see your profile</p>
                        </div>
                        <select
                          value={formData.profileVisibility}
                          onChange={(e) => setFormData({...formData, profileVisibility: e.target.value})}
                          className="px-4 py-2 bg-bg-card border border-bg-border rounded-xl text-text-primary"
                        >
                          <option value="public">Public</option>
                          <option value="recruiters">Recruiters Only</option>
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
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <h2 className="font-display font-semibold text-xl text-text-primary mb-4">
                      Appearance Settings
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                        <div>
                          <h3 className="font-medium text-text-primary">Theme</h3>
                          <p className="text-sm text-text-muted">Choose your preferred theme</p>
                        </div>
                        <select className="px-4 py-2 bg-bg-card border border-bg-border rounded-xl text-text-primary">
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                          <option value="auto">Auto</option>
                        </select>
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
