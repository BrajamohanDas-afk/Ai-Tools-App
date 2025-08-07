import React from 'react';
import { FaFileAlt, FaImage, FaLanguage, FaCode, FaQuestionCircle } from 'react-icons/fa';

// 1. Receive the history prop
function Sidebar({ activeView, setActiveView, history }) {

  // 2. Group history items by type
  const groupedHistory = history.reduce((acc, item) => {
    const type = item.type || 'General';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});


  const getLinkClassName = (viewName) => {
    // ... (this function stays the same)
    let baseClasses = "w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 flex items-center gap-3";
    if (activeView === viewName) {
      return `${baseClasses} bg-gray-700 font-semibold`;
    }
    return baseClasses;
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col border-r border-gray-700">
      <nav className="flex flex-col gap-2">
        {/* ... (your buttons for the tools stay here) ... */}
        <button className={getLinkClassName('summarizer')} onClick={() => setActiveView('summarizer')}> <FaFileAlt /> Text Summarizer </button>
        <button className={getLinkClassName('captioner')} onClick={() => setActiveView('captioner')}> <FaImage /> Image Captioner </button>
        <button className={getLinkClassName('translator')} onClick={() => setActiveView('translator')}> <FaLanguage /> Translator </button>
        <button className={getLinkClassName('codeExplainer')} onClick={() => setActiveView('codeExplainer')}> <FaCode /> Code Explainer </button>
        <button className={getLinkClassName('visualQA')} onClick={() => setActiveView('visualQA')}> <FaQuestionCircle /> Visual Q&A </button>
      </nav>

      {/* 3. Render the grouped history */}
      <div className="mt-8 pt-4 border-t border-gray-700 flex-grow overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-400 px-4 mb-2">History</h2>
        {Object.keys(groupedHistory).length > 0 ? (
          Object.entries(groupedHistory).map(([groupName, items]) => (
            <div key={groupName} className="mb-4">
              <h3 className="text-xs font-bold text-gray-500 px-4 uppercase">{groupName}</h3>
              <ul className="mt-1">
                {items.slice(0, 5).map((item) => ( // Show latest 5 items per group
                  <li key={item.id}>
                    <button className="w-full text-left text-sm text-gray-300 px-4 py-1.5 truncate hover:bg-gray-700 rounded-md">
                      {item.query}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 px-4">No history yet.</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;