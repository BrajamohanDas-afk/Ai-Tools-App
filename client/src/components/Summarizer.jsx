import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../config/api';

function Summarizer({ addToHistory, viewingHistoryItem }) {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  // This effect runs when a history item is clicked
  useEffect(() => {
    if (viewingHistoryItem && viewingHistoryItem.type === 'Summarizer') {
      const queryText = viewingHistoryItem.query.replace(/\.\.\.$/, '');
      setText(queryText);
      setSummary(viewingHistoryItem.result);
    }
  }, [viewingHistoryItem]);

  const handleSummarize = async () => {
    if (!text) return;
    setLoading(true);
    setSummary('');    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/summarize`, { text });
      const newSummary = response.data.summary;
      setSummary(newSummary);

      addToHistory({
        type: 'Summarizer',
        query: text.substring(0, 40) + '...',
        result: newSummary,
      });

    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary('Failed to summarize text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl mb-4 text-center">Text Summarizer</h2>
      <textarea
        className="w-full h-32 sm:h-48 p-3 bg-gray-700 rounded-md border border-gray-600 text-sm sm:text-base resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to summarize..."
      ></textarea>
      <button
        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 sm:py-3 px-4 rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        onClick={handleSummarize}
        disabled={loading || !text.trim()}
      >
        {loading ? 'Summarizing...' : 'Summarize Text'}
      </button>
      {summary && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-lg sm:text-xl mb-2">Summary:</h3>
          <p className="text-gray-300 whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;