import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.post('https://wbk9apxoa0.execute-api.ap-south-1.amazonaws.com/explain-code', { code });
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
    <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl mb-2">Paste Your Code Snippet:</h3>
      <textarea
        className="w-full h-64 p-2 bg-gray-700 rounded-md border border-gray-600 font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-transform hover:scale-105"
        onClick={handleExplain}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Explain Code'}
      </button>
      {explanation && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-xl mb-2">Explanation:</h3>
          <pre className="text-gray-300 whitespace-pre-wrap font-sans">{explanation}</pre>
        </div>
      )}
    </div>
  );
}

export default CodeExplainer;