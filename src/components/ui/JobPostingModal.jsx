// ─── Job Posting Modal Component ─────────────────────────────────────────────
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Briefcase, MapPin, DollarSign, Clock, Users, FileText, 
  Calendar, Award, Target, Building, CheckCircle, AlertCircle
} from 'lucide-react';

export default function JobPostingModal({ 
  isOpen, 
  onClose,
  onSubmit 
}) {
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    location: '',
    workType: 'onsite', // onsite, remote, hybrid
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    skills: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience level is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        jobTitle: '',
        department: '',
        location: '',
        workType: 'onsite',
        experience: '',
        salary: '',
        description: '',
        requirements: '',
        benefits: '',
        skills: ''
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative glass-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-bg-elevated border border-bg-border flex items-center justify-center hover:bg-bg-hover transition-colors z-10"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-text-muted"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center">
                <Briefcase size={24} className="text-accent-green" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-text-primary">Post New Job</h2>
                <p className="text-text-muted">Create a new job posting to attract qualified candidates</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-bg-elevated rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
                <FileText size={20} className="text-accent-green" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim ${
                      errors.jobTitle ? 'border-red-400' : ''
                    }`}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  {errors.jobTitle && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.jobTitle}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim ${
                      errors.department ? 'border-red-400' : ''
                    }`}
                    placeholder="e.g. Engineering"
                  />
                  {errors.department && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.department}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim ${
                      errors.location ? 'border-red-400' : ''
                    }`}
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Work Type
                  </label>
                  <select
                    name="workType"
                    value={formData.workType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary"
                  >
                    <option value="onsite">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Experience Level *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary ${
                      errors.experience ? 'border-red-400' : ''
                    }`}
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5-10 years)</option>
                    <option value="lead">Lead/Principal (10+ years)</option>
                  </select>
                  {errors.experience && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Salary Range
                  </label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim"
                      placeholder="e.g. 80,000 - 120,000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-bg-elevated rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-text-primary mb-4 flex items-center gap-2">
                <Target size={20} className="text-accent-green" />
                Job Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim resize-none ${
                      errors.description ? 'border-red-400' : ''
                    }`}
                    placeholder="Provide a detailed description of the role, responsibilities, and what the candidate will be doing..."
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Requirements *
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim resize-none ${
                      errors.requirements ? 'border-red-400' : ''
                    }`}
                    placeholder="List the required qualifications, skills, and experience for this role..."
                  />
                  {errors.requirements && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.requirements}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Benefits & Perks
                  </label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim resize-none"
                    placeholder="Health insurance, 401k, flexible hours, remote work options, etc..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Required Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-bg-card border border-bg-border rounded-lg focus:border-accent-green/50 focus:outline-none focus:ring-2 focus:ring-accent-green/10 transition-all text-text-primary placeholder-text-dim"
                    placeholder="e.g. JavaScript, React, Node.js, MongoDB (comma separated)"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-bg-border">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary py-3 px-6"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 btn-primary py-3 px-6 flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                Post Job
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
