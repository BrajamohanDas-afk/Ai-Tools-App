import React from 'react';
import { FaFileAlt, FaImage, FaLanguage, FaCode, FaQuestionCircle } from 'react-icons/fa';

function Sidebar({ activeView, setActiveView }) {
  const getLinkClassName = (viewName) => {
    let baseClasses = "w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 flex items-center gap-3";
    if (activeView === viewName) {
      return `${baseClasses} bg-gray-700 font-semibold`;
    }
    return baseClasses;
  };

  return (
    // We removed the h1 title from here and adjusted padding
    <div className="w-64 bg-gray-800 text-white p-4 pt-6 flex flex-col border-r border-gray-700">
      <nav className="flex flex-col gap-2">
        <button
          className={getLinkClassName('summarizer')}
          onClick={() => setActiveView('summarizer')}
        >
          <FaFileAlt />
          Text Summarizer
        </button>
        <button
          className={getLinkClassName('captioner')}
          onClick={() => setActiveView('captioner')}
        >
          <FaImage />
          Image Captioner
        </button>
        <button
          className={getLinkClassName('translator')}
          onClick={() => setActiveView('translator')}
        >
          <FaLanguage />
          Translator
        </button>
        <button
          className={getLinkClassName('codeExplainer')}
          onClick={() => setActiveView('codeExplainer')}
        >
          <FaCode />
          Code Explainer
        </button>
        <button
          className={getLinkClassName('visualQA')}
          onClick={() => setActiveView('visualQA')}
        >
          <FaQuestionCircle />
          Visual Q&A
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;