// ─── Student User Context ───────────────────────────────────────────────────────
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const StudentUserContext = createContext();

// Custom hook to use student user context
export const useStudentUser = () => {
  const context = useContext(StudentUserContext);
  if (!context) {
    throw new Error('useStudentUser must be used within a StudentUserProvider');
  }
  return context;
};

// Student User Provider component
export const StudentUserProvider = ({ children }) => {
  // Get student info from localStorage (set during student authentication)
  const getStudentUserInfo = () => {
    const storedProfile = localStorage.getItem('studentProfile');
    const storedName = localStorage.getItem('studentName');
    const storedEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');
    
    let profile = null;
    if (storedProfile) {
      try {
        profile = JSON.parse(storedProfile);
      } catch (err) {
        console.error('Error parsing student profile:', err);
      }
    }
    
    // Return student info if available, otherwise return guest
    return {
      name: storedName || 'Guest User',
      email: storedEmail || 'guest@example.com',
      role: userType || 'guest',
      profile: profile
    };
  };

  const [studentUser, setStudentUser] = useState(getStudentUserInfo());

  // Update student user info function
  const updateStudentUser = (newUserInfo) => {
    const updatedUser = { ...studentUser, ...newUserInfo };
    setStudentUser(updatedUser);
    
    // Update localStorage as well
    if (newUserInfo.name) localStorage.setItem('studentName', newUserInfo.name);
    if (newUserInfo.profile) localStorage.setItem('studentProfile', JSON.stringify(newUserInfo.profile));
  };

  // Listen for authentication changes
  useEffect(() => {
    const handleStorageChange = () => {
      setStudentUser(getStudentUserInfo());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Convenience getters
  const value = {
    studentUser,
    updateStudentUser,
    name: studentUser.name,
    email: studentUser.email,
    role: studentUser.role,
    profile: studentUser.profile,
    firstName: studentUser.profile?.firstName || '',
    lastName: studentUser.profile?.lastName || '',
    fullName: studentUser.name,
    studentId: studentUser.profile?.id || '',
    course: studentUser.profile?.course || '',
    year: studentUser.profile?.year || '',
    skills: studentUser.profile?.skills || []
  };

  return (
    <StudentUserContext.Provider value={value}>
      {children}
    </StudentUserContext.Provider>
  );
};

export default StudentUserContext;
