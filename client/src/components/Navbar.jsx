import React from 'react';

function Navbar({ currentView }) {
  const getTitle = () => {
    switch (currentView) {
      case 'summarizer':
        return 'Text Summarizer';
      case 'captioner':
        return 'Image Captioner';
      case 'translator':
        return 'Language Translator';
      case 'codeExplainer':
        return 'Code Explainer';
      case 'visualQA':
        return 'Visual Q&A';
      default:
        return 'AI Tools';
    }
  };

  return (
    <div className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-md">
      {/* Group the titles on the left side */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-white">AI Tools</h1>
        <div className="w-px h-6 bg-gray-600"></div> {/* This is a subtle vertical line separator */}
        <h2 className="text-xl font-semibold text-gray-300">{getTitle()}</h2>
      </div>

      {/* Button on the right side */}
      {/* <div>
        <button className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
          Upgrade
        </button>
      </div> */}
    </div>
  );
}

export default Navbar;