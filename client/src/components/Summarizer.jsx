import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    setSummary('');
    try {
      const response = await axios.post('https://wbk9apxoa0.execute-api.ap-south-1.amazonaws.com/summarize', { text });
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
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-center">Text Summarizer</h2>
      <textarea
        className="w-full h-48 p-2 bg-gray-700 rounded-md border border-gray-600"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here to summarize..."
      ></textarea>
      <button
        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-transform hover:scale-105"
        onClick={handleSummarize}
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize Text'}
      </button>
      {summary && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-xl mb-2">Summary:</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;