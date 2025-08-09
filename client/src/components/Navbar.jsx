import React from 'react';
import { FaBars } from 'react-icons/fa';

function Navbar({ currentView, onMenuClick }) {
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
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-white hover:text-gray-300 transition-colors"
          onClick={onMenuClick}
        >
          <FaBars size={20} />
        </button>
        
        {/* Desktop titles */}
        <div className="flex items-center gap-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">AI Tools</h1>
          <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
          <h2 className="hidden sm:block text-lg sm:text-xl font-semibold text-gray-300">{getTitle()}</h2>
        </div>
        
        {/* Mobile title */}
        <h2 className="sm:hidden text-lg font-semibold text-gray-300">{getTitle()}</h2>
      </div>
    </div>
  );
}

export default Navbar;