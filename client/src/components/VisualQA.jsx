import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VisualQA({ addToHistory, viewingHistoryItem }) {
  // // --- DEBUG LOG ---
  // console.log("VisualQA component receiving props:", viewingHistoryItem);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (viewingHistoryItem && viewingHistoryItem.type === 'Visual Q&A') {
      // // --- DEBUG LOG ---
      // console.log("useEffect in VisualQA is running and updating state.");

      setPreview('');
      setFile(null);
      setQuestion(viewingHistoryItem.query);
      setAnswer(viewingHistoryItem.result);
    }
  }, [viewingHistoryItem]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAsk = async () => {
    // ... (rest of the function is the same)
    if (!file || !question) {
      alert('Please select an image and ask a question.');
      return;
    }
    setLoading(true);
    setAnswer('');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result.split(',')[1];
      const mimeType = file.type;
      try {
        const response = await axios.post('https://wbk9apxoa0.execute-api.ap-south-1.amazonaws.com/visual-qa', {
          image: base64data,
          mimeType: mimeType,
          question: question
        });
        const newAnswer = response.data.answer;
        setAnswer(newAnswer);
        addToHistory({
          type: 'Visual Q&A',
          query: question,
          result: newAnswer,
        });
      } catch (error) {
        console.error('Error with Visual Q&A:', error);
        setAnswer('Failed to get an answer.');
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    // ... (the JSX part is the same)
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {preview && <img src={preview} alt="Preview" className="mt-4 rounded-lg max-h-80 mx-auto" />}
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the image..."
        className="mt-4 w-full p-2 bg-gray-700 rounded-md border border-gray-600"
      />
      <button
        onClick={handleAsk}
        disabled={loading || !file || !question}
        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-transform hover:scale-105 disabled:bg-gray-500"
      >
        {loading ? 'Thinking...' : 'Ask Question'}
      </button>
      {answer && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-xl mb-2">Answer:</h3>
          <p className="text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default VisualQA;