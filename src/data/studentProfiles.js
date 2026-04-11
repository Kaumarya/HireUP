// ─── Student Profiles Database ───────────────────────────────────────────────────────
// This would typically come from a backend API, but for demo purposes we'll store it here

export const STUDENT_PROFILES = {
  'aryan111@gmail.com': {
    id: 'STU001',
    firstName: 'Aryan',
    lastName: 'Mehta',
    email: 'aryan111@gmail.com',
    phone: '+91 98765 43210',
    course: 'Computer Science',
    year: '3rd Year',
    skills: ['React', 'JavaScript', 'Python', 'Node.js'],
    avatar: null
  },
  'student2@example.com': {
    id: 'STU002',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'student2@example.com',
    phone: '+91 87654 32109',
    course: 'Information Technology',
    year: '2nd Year',
    skills: ['Java', 'SQL', 'HTML', 'CSS'],
    avatar: null
  },
  'student3@example.com': {
    id: 'STU003',
    firstName: 'Rahul',
    lastName: 'Verma',
    email: 'student3@example.com',
    phone: '+91 76543 21098',
    course: 'Computer Science',
    year: '4th Year',
    skills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
    avatar: null
  }
};

// Function to get student profile by email
export const getStudentProfile = (email) => {
  return STUDENT_PROFILES[email] || null;
};

// Function to get student's full name
export const getStudentFullName = (email) => {
  const profile = getStudentProfile(email);
  if (profile) {
    return `${profile.firstName} ${profile.lastName}`;
  }
  return email.split('@')[0]; // Fallback to email username
};

// Function to check if email belongs to a student
export const isStudentEmail = (email) => {
  return email in STUDENT_PROFILES;
};
