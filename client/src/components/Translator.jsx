import React, { useState } from 'react';
import axios from 'axios';

function Translator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText) return;
    setLoading(true);
    setOutputText('');
    try {
      const response = await axios.post('http://localhost:3000/translate', { 
        text: inputText,
        language: targetLanguage 
      });
      setOutputText(response.data.translation);
    } catch (error) {
      console.error("Error translating text:", error);
      setOutputText('Failed to translate text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl mb-2">Your Text:</h3>
          <textarea
            className="w-full h-64 p-2 bg-gray-700 rounded-md border border-gray-600"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-xl mb-2">Translation:</h3>
          <textarea
            className="w-full h-64 p-2 bg-gray-700 rounded-md border border-gray-600"
            value={outputText}
            readOnly
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md p-2"
        >
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Japanese</option>
          <option>Hindi</option>
        </select>
        <button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-transform hover:scale-105"
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </div>
  );
}

export default Translator;