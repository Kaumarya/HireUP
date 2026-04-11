// ─── Question Generator Service ───────────────────────────────────────────────────────
import API_CONFIG from '../config/api.js';

const SUBJECT_CONFIGS = {
  // Technical Subjects
  'React Development Assessment': {
    topics: ['React Hooks', 'State Management', 'Component Lifecycle', 'React Router', 'JSX', 'Props vs State', 'Context API', 'Performance Optimization'],
    difficulty: 'intermediate',
    duration: 45
  },
  'JavaScript Fundamentals': {
    topics: ['ES6+', 'Data Structures', 'Functions', 'DOM Manipulation', 'Async/Await', 'Closures', 'Prototypes', 'Event Loop'],
    difficulty: 'beginner',
    duration: 30
  },
  'Python Programming': {
    topics: ['OOP', 'Decorators', 'Async Programming', 'Data Structures', 'List Comprehensions', 'Error Handling', 'Modules', 'Generators'],
    difficulty: 'advanced',
    duration: 60
  },
  'Node.js Backend Development': {
    topics: ['Express.js', 'Middleware', 'REST APIs', 'Database Integration', 'Authentication', 'Error Handling', 'Testing', 'Performance'],
    difficulty: 'intermediate',
    duration: 45
  },
  'HTML & CSS Mastery': {
    topics: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Responsive Design', 'Animations', 'Accessibility', 'CSS Variables', 'Modern Layouts'],
    difficulty: 'beginner',
    duration: 30
  },
  'TypeScript Development': {
    topics: ['Type System', 'Interfaces', 'Generics', 'Decorators', 'Modules', 'Advanced Types', 'Config', 'Integration with JS'],
    difficulty: 'intermediate',
    duration: 45
  },
  'Vue.js Development': {
    topics: ['Vue Components', 'Vue Router', 'Vuex', 'Composition API', 'Directives', 'Reactivity', 'Lifecycle', 'Performance'],
    difficulty: 'intermediate',
    duration: 45
  },
  'Angular Development': {
    topics: ['Components', 'Services', 'Dependency Injection', 'RxJS', 'Routing', 'Forms', 'HTTP Client', 'Testing'],
    difficulty: 'advanced',
    duration: 60
  },
  'Database Management': {
    topics: ['SQL Queries', 'Database Design', 'Normalization', 'Indexes', 'Transactions', 'NoSQL', 'MongoDB', 'PostgreSQL'],
    difficulty: 'intermediate',
    duration: 45
  },
  'DevOps & Cloud': {
    topics: ['Docker', 'Kubernetes', 'CI/CD', 'AWS Services', 'Cloud Architecture', 'Monitoring', 'Infrastructure as Code', 'Security'],
    difficulty: 'advanced',
    duration: 60
  },
  
  // Creative Subjects
  'UI/UX Design Principles': {
    topics: ['Design Thinking', 'User Research', 'Wireframing', 'Prototyping', 'Color Theory', 'Typography', 'Layout Principles', 'Design Systems'],
    difficulty: 'intermediate',
    duration: 45
  },
  'Graphic Design Fundamentals': {
    topics: ['Visual Hierarchy', 'Color Theory', 'Typography', 'Composition', 'Branding', 'Digital Tools', 'Print Design', 'Web Design'],
    difficulty: 'beginner',
    duration: 30
  },
  'Video Production & Editing': {
    topics: ['Storyboarding', 'Camera Techniques', 'Lighting', 'Audio Recording', 'Video Editing', 'Color Grading', 'Motion Graphics', 'Export Settings'],
    difficulty: 'intermediate',
    duration: 45
  },
  'Content Creation Strategy': {
    topics: ['Content Planning', 'Social Media Strategy', 'SEO Basics', 'Audience Engagement', 'Content Marketing', 'Analytics', 'Brand Voice', 'Monetization'],
    difficulty: 'beginner',
    duration: 30
  },
  'Photography Essentials': {
    topics: ['Camera Basics', 'Composition', 'Lighting', 'Photo Editing', 'Portrait Photography', 'Landscape Photography', 'Post-Processing', 'Portfolio Building'],
    difficulty: 'intermediate',
    duration: 45
  },
  
  // Business Subjects
  'Digital Marketing': {
    topics: ['SEO/SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Analytics', 'PPC Advertising', 'Marketing Strategy', 'Conversion Optimization'],
    difficulty: 'intermediate',
    duration: 45
  },
  'Project Management': {
    topics: ['Agile Methodologies', 'Scrum Framework', 'Risk Management', 'Resource Planning', 'Stakeholder Management', 'Timeline Management', 'Communication', 'Tools'],
    difficulty: 'intermediate',
    duration: 45
  },
  'Business Analysis': {
    topics: ['Requirements Gathering', 'Process Modeling', 'Data Analysis', 'Stakeholder Analysis', 'Business Process Improvement', 'Documentation', 'Validation', 'Communication'],
    difficulty: 'advanced',
    duration: 60
  },
  'Financial Management': {
    topics: ['Financial Statements', 'Budgeting', 'Investment Analysis', 'Risk Management', 'Financial Planning', 'Cash Flow Management', 'Cost Analysis', 'Reporting'],
    difficulty: 'advanced',
    duration: 60
  },
  'Human Resources Management': {
    topics: ['Recruitment', 'Employee Relations', 'Performance Management', 'Compensation', 'Training & Development', 'HR Policies', 'Labor Laws', 'Organizational Development'],
    difficulty: 'intermediate',
    duration: 45
  }
};

class QuestionGenerator {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 30 * 60 * 1000; // 30 minutes
  }

  async generateQuestions(testName) {
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`� Question generation attempt ${attempt}/${maxRetries} for: ${testName}`);
        console.log('🔑 API Key configured:', !!API_CONFIG.GROQ_API_KEY);

        // Validate API key
        if (!API_CONFIG.GROQ_API_KEY || API_CONFIG.GROQ_API_KEY.trim() === '') {
          throw new Error('API key is required for question generation. Please configure your Groq API key.');
        }

        const subjectConfig = SUBJECT_CONFIGS[testName];
        if (!subjectConfig) {
          throw new Error(`No subject configuration found for: ${testName}`);
        }

        const prompt = this.createPrompt(testName, subjectConfig);
        
        // Add randomness to prompt for variety
        const randomSeed = Math.random().toString(36).substring(7);
        const enhancedPrompt = `${prompt}

IMPORTANT: Generate completely unique and different questions. Use random seed: ${randomSeed}. Focus on different aspects of the topics than previous questions. Generate exactly 15 questions as specified.`
        
        console.log('� Sending request to Groq API...');
        console.log('🤖 Model:', attempt > 1 ? API_CONFIG.BACKUP_MODEL : API_CONFIG.MODEL);
        console.log('🎲 Random seed:', randomSeed);
        console.log('🔑 API URL:', API_CONFIG.GROQ_BASE_URL);
        
        const response = await fetch(`${API_CONFIG.GROQ_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_CONFIG.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: attempt > 1 ? API_CONFIG.BACKUP_MODEL : API_CONFIG.MODEL,
            messages: [
              {
                role: 'system',
                content: 'You are an expert educator who creates high-quality multiple-choice questions for skill assessments. Always respond with valid JSON only, no explanations or markdown.'
              },
              {
                role: 'user',
                content: enhancedPrompt
              }
            ],
            temperature: API_CONFIG.QUESTION_GENERATION.TEMPERATURE,
            max_tokens: API_CONFIG.QUESTION_GENERATION.MAX_TOKENS
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API request failed:', response.status, response.statusText);
          console.error('❌ Error response body:', errorText);
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        console.log('✅ API request successful');
        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        
        if (!content) {
          throw new Error('No content received from API');
        }

        console.log('📄 Raw AI response:', content);

        // Parse JSON response
        let questions;
        try {
          // Clean up the response to extract JSON
          const jsonMatch = content.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            questions = JSON.parse(jsonMatch[0]);
          } else {
            questions = JSON.parse(content);
          }
        } catch (parseError) {
          console.error('Failed to parse AI response:', parseError);
          console.log('Raw response:', content);
          if (attempt === maxRetries) {
            throw new Error('Failed to parse AI-generated questions. Please try again.');
          }
          continue; // Retry
        }

        // Validate and format questions
        const formattedQuestions = questions.map((q, index) => ({
          id: index + 1,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        }));

        // Ensure we have exactly 15 questions
        if (formattedQuestions.length !== 15) {
          console.warn(`⚠️  Expected 15 questions, got ${formattedQuestions.length}`);
        }

        console.log(`✅ Successfully generated ${formattedQuestions.length} questions`);
        return formattedQuestions;

      } catch (error) {
        console.error(`❌ Question generation attempt ${attempt} failed:`, error.message);
        
        if (attempt === maxRetries) {
          console.error('🚨 All question generation attempts failed');
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  createPrompt(testName, config) {
    return `Generate 15 multiple-choice questions about ${testName}. 

Topics to cover: ${config.topics.join(', ')}
Difficulty level: ${config.difficulty}

Each question must have:
- A clear, specific question about the topics
- 4 plausible options (A, B, C, D) with only one correct answer
- The correct answer index (0, 1, 2, or 3)
- A brief explanation of why the correct answer is right

Return ONLY a JSON array with this exact format:
[
  {
    "question": "Your question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Explanation of why this answer is correct"
  }
]

Requirements:
1. All questions must be relevant to ${testName}
2. Questions should test practical knowledge, not just theory
3. Options should be realistic and plausible
4. Explanations should be educational and helpful
5. Generate exactly 15 questions
6. Return valid JSON only, no additional text`;
  }

  clearCache() {
    this.cache.clear();
  }

  getCacheStatus() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Get all available subjects
  getAvailableSubjects() {
    return Object.keys(SUBJECT_CONFIGS).map(key => ({
      name: key,
      ...SUBJECT_CONFIGS[key]
    }));
  }
}

export default new QuestionGenerator();
