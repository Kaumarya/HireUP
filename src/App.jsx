// ─── App.jsx — Routing ────────────────────────────────────────────────────────
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProvider } from './contexts/UserContext';
import { StudentUserProvider } from './contexts/StudentUserContext';
import { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import TestComponent from './components/TestComponent';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import JobDiscovery from './pages/JobDiscovery';
import RecruiterDashboard from './pages/RecruiterDashboard';
import StudentAuth from './pages/StudentAuth';
import RecruiterAuth from './pages/RecruiterAuth';
import GetStarted from './pages/GetStarted';
import Placements from './pages/Placements';
import AllCandidates from './pages/AllCandidates';
import Applications from './pages/Applications';
import Pricing from './pages/Pricing';
import JobPosts from './pages/JobPosts';
import Interviews from './pages/Interviews';
import Analytics from './pages/Analytics';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import RecruiterSettings from './pages/RecruiterSettings';
import TestTaking from './pages/TestTaking';
import Certificate from './components/Certificate';
import ApiTest from './components/ApiTest';
import SavedJobs from './pages/SavedJobs';
import StudentMessages from './pages/StudentMessages';
import StudentSettings from './pages/StudentSettings';
import Roadmap from './pages/Roadmap';
import RecruiterPricing from './pages/RecruiterPricing';
import SkillTests from './pages/SkillTests';
import VoiceInterview from './pages/VoiceInterview';
import BasicPlan from './pages/BasicPlan';
import ProPlan from './pages/ProPlan';
import PremiumPlan from './pages/PremiumPlan';
import UpgradePayment from './pages/UpgradePayment';
import RecruiterUpgradePayment from './pages/RecruiterUpgradePayment';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/placements" element={<Placements />} />
            
            {/* Student Routes with Student Context */}
            <Route path="/student-auth" element={
              <StudentUserProvider>
                <StudentAuth />
              </StudentUserProvider>
            } />
            <Route path="/student-dashboard" element={
              <StudentUserProvider>
                <StudentDashboard />
              </StudentUserProvider>
            } />
            <Route path="/student-profile" element={
              <StudentUserProvider>
                <StudentProfile />
              </StudentUserProvider>
            } />
            <Route path="/job-discovery" element={
              <StudentUserProvider>
                <JobDiscovery />
              </StudentUserProvider>
            } />
            <Route path="/skill-tests" element={
              <StudentUserProvider>
                <SkillTests />
              </StudentUserProvider>
            } />
            <Route path="/roadmap" element={
              <StudentUserProvider>
                <Roadmap />
              </StudentUserProvider>
            } />
            <Route path="/test-taking" element={
              <StudentUserProvider>
                <TestTaking />
              </StudentUserProvider>
            } />
            <Route path="/voice-interview" element={
              <StudentUserProvider>
                <VoiceInterview />
              </StudentUserProvider>
            } />
            <Route path="/api-test" element={
              <StudentUserProvider>
                <ApiTest />
              </StudentUserProvider>
            } />
            <Route path="/saved-jobs" element={
              <StudentUserProvider>
                <SavedJobs />
              </StudentUserProvider>
            } />
            <Route path="/student-messages" element={
              <StudentUserProvider>
                <StudentMessages />
              </StudentUserProvider>
            } />
            <Route path="/student-settings" element={
              <StudentUserProvider>
                <StudentSettings />
              </StudentUserProvider>
            } />
            <Route path="/basic-plan" element={
              <StudentUserProvider>
                <BasicPlan />
              </StudentUserProvider>
            } />
            <Route path="/pro-plan" element={
              <StudentUserProvider>
                <ProPlan />
              </StudentUserProvider>
            } />
            <Route path="/premium-plan" element={
              <StudentUserProvider>
                <PremiumPlan />
              </StudentUserProvider>
            } />
            <Route path="/upgrade-payment" element={
              <StudentUserProvider>
                <UpgradePayment />
              </StudentUserProvider>
            } />
            
            {/* Recruiter Routes with General User Context */}
            <Route path="/recruiter-auth" element={
              <UserProvider>
                <RecruiterAuth />
              </UserProvider>
            } />
            <Route path="/recruiter-dashboard" element={
              <UserProvider>
                <RecruiterDashboard />
              </UserProvider>
            } />
            <Route path="/all-candidates" element={
              <UserProvider>
                <AllCandidates />
              </UserProvider>
            } />
            <Route path="/applications" element={
              <StudentUserProvider>
                <Applications />
              </StudentUserProvider>
            } />
            <Route path="/pricing" element={
              <StudentUserProvider>
                <Pricing />
              </StudentUserProvider>
            } />
            <Route path="/recruiter-pricing" element={
              <UserProvider>
                <RecruiterPricing />
              </UserProvider>
            } />
            <Route path="/recruiter-upgrade-payment" element={
              <UserProvider>
                <RecruiterUpgradePayment />
              </UserProvider>
            } />
            <Route path="/job-posts" element={
              <UserProvider>
                <JobPosts />
              </UserProvider>
            } />
            <Route path="/interviews" element={
              <UserProvider>
                <Interviews />
              </UserProvider>
            } />
            <Route path="/analytics" element={
              <UserProvider>
                <Analytics />
              </UserProvider>
            } />
            <Route path="/messages" element={
              <UserProvider>
                <Messages />
              </UserProvider>
            } />
            {/* Redirect students from recruiter messages to student messages */}
            <Route path="/student-messages" element={
              <StudentUserProvider>
                <StudentMessages />
              </StudentUserProvider>
            } />
            <Route path="/settings" element={
              <UserProvider>
                <RecruiterSettings />
              </UserProvider>
            } />
            {/* Redirect students from recruiter settings to student settings */}
            <Route path="/student-settings" element={
              <StudentUserProvider>
                <StudentSettings />
              </StudentUserProvider>
            } />
          </Routes>
        </AnimatePresence>
        <ScrollToTop />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
