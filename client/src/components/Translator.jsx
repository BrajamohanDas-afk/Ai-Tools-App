import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../config/api';

function Translator({ addToHistory, viewingHistoryItem }) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [loading, setLoading] = useState(false);

  // This effect runs when a history item is clicked
  useEffect(() => {
    if (viewingHistoryItem && viewingHistoryItem.type === 'Translator') {
      const queryText = viewingHistoryItem.query.split('... to ')[0];
      setInputText(queryText);
      setOutputText(viewingHistoryItem.result);
    }
  }, [viewingHistoryItem]);

  const handleTranslate = async () => {
    if (!inputText) return;
    setLoading(true);
    setOutputText('');
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/translate`, {
        text: inputText,
        language: targetLanguage
      });
      const newTranslation = response.data.translation;
      setOutputText(newTranslation);
      addToHistory({
        type: 'Translator',
        query: `${inputText.substring(0, 25)}... to ${targetLanguage}`,
        result: newTranslation,
      });
    } catch (error) {
      console.error("Error translating text:", error);
      setOutputText('Failed to translate text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl mb-4 text-center">Language Translator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="text-lg sm:text-xl mb-2">Your Text:</h3>
          <textarea
            className="w-full h-48 sm:h-64 p-3 bg-gray-700 rounded-md border border-gray-600 text-sm sm:text-base resize-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
          />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl mb-2">Translation:</h3>
          <textarea
            className="w-full h-48 sm:h-64 p-3 bg-gray-700 rounded-md border border-gray-600 text-sm sm:text-base resize-none"
            value={outputText}
            readOnly
            placeholder="Translation will appear here..."
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full sm:w-auto bg-gray-700 border border-gray-600 rounded-md p-2 sm:p-3 text-sm sm:text-base"
        >
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
          <option>Hindi</option>
        </select>
        <button
          className="w-full sm:flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 sm:py-3 px-4 rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          onClick={handleTranslate}
          disabled={loading || !inputText.trim()}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </div>
  );
}

export default Translator;