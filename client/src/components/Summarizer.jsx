import React, { useState } from 'react';
import axios from 'axios';

function Summarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) return;
    setLoading(true);
    setSummary('');

    try {
      const response = await axios.post('http://localhost:3000/summarize', { text });
      setSummary(response.data.summary);
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
        className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="10"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-gray-500"
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