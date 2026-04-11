// ─── User Context ───────────────────────────────────────────────────────
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// User Provider component
export const UserProvider = ({ children }) => {
  // Get user info from localStorage (set during authentication)
  const getStoredUserInfo = () => {
    const storedName = localStorage.getItem('userName') || localStorage.getItem('studentName');
    const storedEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType');
    
    return {
      name: storedName || 'Guest User', // Use actual logged-in name
      email: storedEmail || 'guest@example.com',
      role: userType || 'guest'
    };
  };

  const [user, setUser] = useState(getStoredUserInfo());

  // Update user info function
  const updateUser = (newUserInfo) => {
    const updatedUser = { ...user, ...newUserInfo };
    setUser(updatedUser);
    // Update localStorage as well
    if (newUserInfo.name) {
      localStorage.setItem('userName', newUserInfo.name);
      localStorage.setItem('studentName', newUserInfo.name);
    }
    if (newUserInfo.email) localStorage.setItem('userEmail', newUserInfo.email);
  };

  // Listen for authentication changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getStoredUserInfo());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    user,
    updateUser,
    // Convenience getters
    name: user.name,
    email: user.email,
    role: user.role
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
