// ─── API Test Component ───────────────────────────────────────────────────────
import { useState } from 'react';
import questionGenerator from '../services/questionGenerator.js';
import API_CONFIG from '../config/api.js';

export default function ApiTest() {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testApi = async () => {
    try {
      setStatus('testing');
      setError(null);
      
      console.log('🧪 Testing API...');
      console.log('🔑 API Key exists:', !!API_CONFIG.OPENROUTER_API_KEY);
      console.log('🔑 API Key length:', API_CONFIG.OPENROUTER_API_KEY?.length || 0);
      
      const questions = await questionGenerator.generateQuestions('React Development Assessment');
      
      console.log('✅ Test successful:', questions);
      setResult(questions);
      setStatus('success');
    } catch (err) {
      console.error('❌ Test failed:', err);
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-8">
      <div className="glass-card rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-6">
          API Test Dashboard
        </h1>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg">
            <span className="text-text-primary">API Key Status:</span>
            <span className={`font-medium ${API_CONFIG.OPENROUTER_API_KEY ? 'text-accent-green' : 'text-red-500'}`}>
              {API_CONFIG.OPENROUTER_API_KEY ? '✅ Configured' : '❌ Missing'}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg">
            <span className="text-text-primary">Model:</span>
            <span className="text-accent-green">{API_CONFIG.MODEL}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg">
            <span className="text-text-primary">Test Status:</span>
            <span className={`font-medium ${
              status === 'success' ? 'text-accent-green' : 
              status === 'error' ? 'text-red-500' : 
              status === 'testing' ? 'text-yellow-500' : 'text-text-muted'
            }`}>
              {status === 'success' ? '✅ Success' : 
               status === 'error' ? '❌ Error' : 
               status === 'testing' ? '🔄 Testing...' : '⏸️ Idle'}
            </span>
          </div>
        </div>

        <button
          onClick={testApi}
          disabled={status === 'testing'}
          className="w-full px-6 py-3 bg-accent-green text-white rounded-lg font-medium hover:bg-accent-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {status === 'testing' ? 'Testing...' : 'Test AI Question Generation'}
        </button>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg mb-4">
            <p className="text-red-500 font-medium">Error:</p>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-text-primary">
              Generated Questions ({result.length}):
            </h3>
            {result.map((q, index) => (
              <div key={index} className="p-4 bg-bg-elevated rounded-lg">
                <p className="font-medium text-text-primary mb-2">
                  Q{index + 1}: {q.question}
                </p>
                <div className="space-y-1">
                  {q.options.map((opt, optIndex) => (
                    <p key={optIndex} className={`text-sm ${
                      optIndex === q.correctAnswer ? 'text-accent-green' : 'text-text-muted'
                    }`}>
                      {optIndex === q.correctAnswer ? '✅' : '○'} {opt}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-text-dim mt-2 italic">
                  {q.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
