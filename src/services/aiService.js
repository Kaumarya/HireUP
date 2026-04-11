// ─── AI Service for Roadmap Generation ─────────────────────────────────────
import axios from 'axios';
import API_CONFIG from '../config/api';

class AIService {
  constructor() {
    // Use centralized API config
    this.apiKey = API_CONFIG.GROQ_API_KEY;
    this.baseURL = API_CONFIG.GROQ_BASE_URL;
  }

  // Test function to verify API key
  async testConnection() {
    try {
      console.log('Testing Groq API connection...');
      const response = await axios.post(`${this.baseURL}/chat/completions`, {
        model: API_CONFIG.MODEL,
        messages: [
          {
            role: 'user',
            content: 'Respond with just "API working"'
          }
        ],
        max_tokens: 10
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API Test Response:', response.data);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('API Test Failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async generateRoadmap(jobTitle) {
    const maxRetries = API_CONFIG.ROADMAP_GENERATION.RETRY_ATTEMPTS;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🗺️ Roadmap generation attempt ${attempt}/${maxRetries} for: ${jobTitle}`);
        
        const prompt = this.createRoadmapPrompt(jobTitle);
        
        console.log('📡 Making API call to:', this.baseURL);
        console.log('🤖 Using model:', API_CONFIG.MODEL);
        console.log('🔑 API Key exists:', !!this.apiKey);
        console.log('🔑 API Key length:', this.apiKey?.length || 0);
        
        const response = await axios.post(`${this.baseURL}/chat/completions`, {
          model: (attempt > 1) ? API_CONFIG.BACKUP_MODEL : API_CONFIG.MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are an expert career guidance AI that creates personalized learning roadmaps. ALWAYS respond with valid JSON only. No explanations, no markdown, no text outside JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: API_CONFIG.ROADMAP_GENERATION.TEMPERATURE,
          max_tokens: API_CONFIG.ROADMAP_GENERATION.MAX_TOKENS
        }, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('✅ API Response received');
        let aiResponse = response.data.choices[0].message.content.trim();
        console.log('📄 AI Response Content:', aiResponse);
        
        // Clean the response - remove any markdown or extra text
        aiResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Try to parse JSON, if it fails, try to fix common issues
        try {
          const parsed = JSON.parse(aiResponse);
          console.log('✅ Successfully parsed AI response');
          return parsed;
        } catch (parseError) {
          console.log('❌ JSON parse failed, attempting to fix...');
          console.log('Parse error:', parseError.message);
          
          // Try to fix incomplete JSON
          let fixedResponse = aiResponse;
          
          // Remove any leading/trailing text that's not JSON
          const jsonStart = fixedResponse.indexOf('{');
          const jsonEnd = fixedResponse.lastIndexOf('}');
          
          if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            fixedResponse = fixedResponse.substring(jsonStart, jsonEnd + 1);
          }
          
          // Count opening and closing braces
          const openBraces = (fixedResponse.match(/\{/g) || []).length;
          const closeBraces = (fixedResponse.match(/\}/g) || []).length;
          const missingBraces = openBraces - closeBraces;
          
          if (missingBraces > 0) {
            fixedResponse += '}'.repeat(missingBraces);
          }
          
          // Fix missing quotes around property names
          fixedResponse = fixedResponse.replace(/(\w+):/g, '"$1":');
          
          // Fix trailing commas
          fixedResponse = fixedResponse.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
          
          try {
            const parsed = JSON.parse(fixedResponse);
            console.log('✅ Successfully parsed fixed AI response');
            return parsed;
          } catch (secondParseError) {
            console.log('❌ Even fixed JSON failed to parse');
            if (attempt === maxRetries) {
              throw new Error(`Failed to parse AI response after ${maxRetries} attempts: ${secondParseError.message}`);
            }
          }
        }
      } catch (error) {
        console.error(`❌ Roadmap generation attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          console.error('🚨 All roadmap generation attempts failed');
          const errorMessage = error.response?.data?.error?.message || 
                           error.message || 
                           error.response?.statusText || 
                           'Unknown error occurred';
          throw new Error(`AI Generation Failed: ${errorMessage}`);
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  createRoadmapPrompt(jobTitle) {
    return `Generate a comprehensive 12-month learning roadmap for "${jobTitle}".
    
Create a JSON response with this exact structure:
{
  "title": "${jobTitle}",
  "totalDuration": "12 Months",
  "phases": [
    {
      "id": 1,
      "name": "Foundation Phase",
      "duration": "Months 1-3",
      "level": "Beginner",
      "description": "Build fundamental skills for ${jobTitle}",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"],
      "resources": ["Resource 1", "Resource 2", "Resource 3", "Resource 4", "Resource 5"],
      "projects": ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"],
      "status": "unlocked",
      "progress": 0
    },
    {
      "id": 2,
      "name": "Core Development Phase",
      "duration": "Months 4-6",
      "level": "Intermediate",
      "description": "Master core ${jobTitle} concepts and practices",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"],
      "resources": ["Resource 1", "Resource 2", "Resource 3", "Resource 4", "Resource 5"],
      "projects": ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"],
      "status": "locked",
      "progress": 0
    },
    {
      "id": 3,
      "name": "Advanced Skills Phase",
      "duration": "Months 7-9",
      "level": "Advanced",
      "description": "Develop advanced expertise in ${jobTitle}",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"],
      "resources": ["Resource 1", "Resource 2", "Resource 3", "Resource 4", "Resource 5"],
      "projects": ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"],
      "status": "locked",
      "progress": 0
    },
    {
      "id": 4,
      "name": "Mastery Phase",
      "duration": "Months 10-12",
      "level": "Expert",
      "description": "Achieve mastery and specialize in advanced ${jobTitle} topics",
      "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
      "resources": ["Resource 1", "Resource 2", "Resource 3", "Resource 4"],
      "projects": ["Project 1", "Project 2", "Project 3", "Project 4"],
      "status": "locked",
      "progress": 0
    }
  ],
  "currentPhase": 1,
  "overallProgress": 0
}

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON - no additional text, no explanations, no markdown
2. Generate 6-8 specific, actionable skills per phase
3. Provide 5-7 practical resources per phase
4. List 5-6 real-world projects per phase
5. Make skills progressively harder (Basic → Intermediate → Advanced → Expert)
6. Focus on hands-on, practical applications over theory
7. Include actual industry tools and software names`;
  }

  async generatePhaseTest(jobTitle, phaseName, difficulty) {
    const maxRetries = 3;
    const baseDelay = 6000; // 6 seconds base delay for better rate limit handling
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📝 Test generation attempt ${attempt}/${maxRetries} for: ${phaseName}`);
        
        // Add delay before retry
        if (attempt > 1) {
          const delay = baseDelay * attempt;
          console.log(`⏳ Waiting ${delay/1000}s before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        const prompt = this.createTestPrompt(jobTitle, phaseName, difficulty);
        
        // Add randomization for variety
        const randomSeed = Math.random().toString(36).substring(7);
        const enhancedPrompt = `${prompt}

IMPORTANT: Generate completely unique questions. Use random seed: ${randomSeed}. Focus on practical knowledge for ${phaseName}.`;
        
        console.log('📡 Sending test generation request...');
        
        const response = await axios.post(`${this.baseURL}/chat/completions`, {
          model: (attempt > 1) ? API_CONFIG.BACKUP_MODEL : API_CONFIG.MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are an expert assessment creator. Generate valid JSON only, no explanations or markdown.'
            },
            {
              role: 'user',
              content: enhancedPrompt
            }
          ],
          temperature: API_CONFIG.QUESTION_GENERATION.TEMPERATURE,
          max_tokens: API_CONFIG.QUESTION_GENERATION.MAX_TOKENS
        }, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('✅ Test API Response received');
        let aiResponse = response.data.choices[0].message.content.trim();
        console.log('📄 Test AI Response Content:', aiResponse);
        
        // Clean the response
        aiResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Try to parse JSON
        try {
          const parsed = JSON.parse(aiResponse);
          console.log('✅ Successfully parsed test response');
          return parsed;
        } catch (parseError) {
          console.log('❌ JSON parse failed for test:', parseError.message);
          if (attempt === maxRetries) {
            throw new Error(`Failed to parse test AI response: ${parseError.message}`);
          }
          continue;
        }
        
      } catch (error) {
        console.error(`❌ Test generation attempt ${attempt} failed:`, error.response?.data || error.message);
        
        // Check for rate limiting specifically
        if (error.response?.status === 429) {
          console.log('🚫 Rate limited, will retry with delay...');
          if (attempt === maxRetries) {
            console.log('🚨 All test generation attempts failed due to rate limiting');
            throw new Error('API rate limit exceeded. Please try again in a few minutes.');
          }
          continue;
        }
        
        if (attempt === maxRetries) {
          console.error('🚨 All test generation attempts failed');
          throw new Error(`Test generation failed: ${error.response?.data?.error?.message || error.message}`);
        }
      }
    }
  }

  createTestPrompt(jobTitle, phaseId, difficulty) {
    const questionCount = 15;
    const duration = difficulty === 'beginner' ? '45 mins' : difficulty === 'intermediate' ? '45 mins' : '60 mins';
    const passingScore = difficulty === 'beginner' ? 70 : difficulty === 'intermediate' ? 75 : 80;

    return `Generate a ${difficulty}-level assessment test for "${jobTitle}" - Phase ${phaseId}.

Create a JSON response with this structure:
{
  "id": "test-${phaseId}",
  "title": "${jobTitle} - Phase ${phaseId} Assessment",
  "difficulty": "${difficulty}",
  "duration": "${duration}",
  "passingScore": ${passingScore},
  "questions": [
    {
      "id": "q-1",
      "question": "Specific question about ${jobTitle} ${difficulty} concepts",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0
    }
  ],
  "status": "available"
}

Generate exactly ${questionCount} questions that are:
1. Specific to ${jobTitle} and the ${difficulty} level
2. Cover key concepts for Phase ${phaseId}
3. Have realistic, plausible options
4. Include only one correct answer per question (0, 1, 2, or 3)

CRITICAL REQUIREMENTS:
1. Return ONLY valid JSON - no explanations, no markdown, no text outside JSON
2. Ensure all brackets and braces are properly closed
3. All questions must be complete with options and correctAnswer
4. correctAnswer must be a number between 0-3
5. Do not cut off the response - ensure complete JSON structure`;
  }

  async generateResponse(prompt) {
    try {
      console.log('🎤 Generating AI response for voice interview...');
      
      const response = await axios.post(`${this.baseURL}/chat/completions`, {
        model: API_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an experienced technical interviewer conducting a mock interview. Be encouraging, professional, and concise.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ AI response generated for interview');
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('❌ Failed to generate AI response:', error.response?.data || error.message);
      throw error;
    }
  }

  async generateQuestions(prompt) {
    try {
      console.log('🎤 Generating interview questions...');
      
      const response = await axios.post(`${this.baseURL}/chat/completions`, {
        model: API_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert at generating interview questions. Always return valid JSON arrays only. No explanations, no markdown, no extra text.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent output
        max_tokens: 800 // Increased tokens for longer responses
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ AI questions generated');
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('❌ Failed to generate AI questions:', error.response?.data || error.message);
      throw error;
    }
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }
}

export default new AIService();
