import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../config/api';

function CodeExplainer({ addToHistory, viewingHistoryItem }) {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  // This effect runs when a history item is clicked
  useEffect(() => {
    if (viewingHistoryItem && viewingHistoryItem.type === 'Code Explainer') {
      const queryCode = viewingHistoryItem.query.replace(/\.\.\.$/, '');
      setCode(queryCode);
      setExplanation(viewingHistoryItem.result);
    }
  }, [viewingHistoryItem]);

  const handleExplain = async () => {
    if (!code) return;
    setLoading(true);
    setExplanation('');
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/explain-code`, { code });
      const newExplanation = response.data.explanation;
      setExplanation(newExplanation);
      addToHistory({
        type: 'Code Explainer',
        query: code.substring(0, 40) + '...',
        result: newExplanation,
      });
    } catch (error) {
      console.error("Error explaining code:", error);
      setExplanation('Failed to explain code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl mb-4 text-center">Code Explainer</h2>
      <h3 className="text-lg sm:text-xl mb-2">Paste Your Code Snippet:</h3>
      <textarea
        className="w-full h-48 sm:h-64 p-3 bg-gray-700 rounded-md border border-gray-600 font-mono text-sm sm:text-base resize-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here and I'll explain it..."
      />
      <button
        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 sm:py-3 px-4 rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        onClick={handleExplain}
        disabled={loading || !code.trim()}
      >
        {loading ? 'Analyzing...' : 'Explain Code'}
      </button>
      {explanation && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-lg sm:text-xl mb-2">Explanation:</h3>
          <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed overflow-x-auto">{explanation}</pre>
        </div>
      )}
    </div>
  );
}

export default CodeExplainer;