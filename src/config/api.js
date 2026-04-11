// ─── API Configuration ───────────────────────────────────────────────────────

// ⚠️  IMPORTANT: Using Groq API
const API_CONFIG = {
  // 🔒 GROQ API KEY - Now loaded from environment variables
  GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
  
  // API Configuration - Using Groq
  GROQ_BASE_URL: 'https://api.groq.com/openai/v1',
  MODEL: 'llama-3.1-8b-instant', // Groq's fast model
  
  // Alternative model if needed
  BACKUP_MODEL: 'llama-3.1-8b-instant',
  
  // Question Generation Settings
  QUESTION_GENERATION: {
    TEMPERATURE: 0.7, // Balanced for consistency and variety
    MAX_TOKENS: 3000, // Increased for 15 questions
    QUESTIONS_PER_TEST: 15 // Updated to match our requirement
  },
  
  // Roadmap Generation Settings
  ROADMAP_GENERATION: {
    TEMPERATURE: 0.3, // Lower for consistent JSON
    MAX_TOKENS: 2000, // Enough for roadmap JSON
    RETRY_ATTEMPTS: 3 // Number of retry attempts
  }
};

// Validation
export const validateApiKey = () => {
  if (!API_CONFIG.GROQ_API_KEY || API_CONFIG.GROQ_API_KEY.trim() === '') {
    console.warn('⚠️  Groq API key is missing. Please add it in your .env file');
    return false;
  }
  if (!API_CONFIG.GROQ_API_KEY.startsWith('gsk_')) {
    console.warn('⚠️  Invalid Groq API key format. Should start with "gsk_"');
    return false;
  }
  return true;
};

export default API_CONFIG;
