import React, { useState } from 'react';
import axios from 'axios';

// 1. Receive the addToHistory function as a prop
function ImageCaptioner({ addToHistory }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCaption = async () => {
    if (!file) {
      alert('Please select an image first.');
      return;
    }
    setLoading(true);
    setCaption('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result.split(',')[1];
      const mimeType = file.type;
      try {
        const response = await axios.post('http://localhost:3000/caption', {
          image: base64data,
          mimeType: mimeType,
        });
        const newCaption = response.data.caption;
        setCaption(newCaption);

        // 2. Call addToHistory with the result
        addToHistory({
          type: 'Captioner',
          query: file.name, // Use the image filename as the query
          result: newCaption,
        });

      } catch (error) {
        console.error('Error generating caption:', error);
        setCaption('Failed to generate caption.');
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-center">Image Captioner</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {preview && (
        <div className="mt-4 text-center">
          <img src={preview} alt="Selected preview" className="max-w-full max-h-80 inline-block rounded-md" />
        </div>
      )}
      <button
        onClick={handleCaption}
        disabled={loading}
        className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md transition-transform hover:scale-105"
      >
        {loading ? 'Generating...' : 'Generate Caption'}
      </button>
      {caption && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md">
          <h3 className="text-xl mb-2">Caption:</h3>
          <p className="text-gray-300">{caption}</p>
        </div>
      )}
    </div>
  );
}

export default ImageCaptioner;