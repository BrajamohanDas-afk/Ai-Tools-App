import React from 'react';
import { FaFileAlt, FaImage, FaLanguage, FaCode, FaQuestionCircle, FaTimes } from 'react-icons/fa';

// 1. Receive the onHistoryClick function as a prop
function Sidebar({ activeView, setActiveView, history, onHistoryClick, isOpen, onClose }) {

  const groupedHistory = history.reduce((acc, item) => {
    // ... (this part stays the same)
    const type = item.type || 'General';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {});

  const getLinkClassName = (viewName) => {
    // ... (this part stays the same)
    let baseClasses = "w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 flex items-center gap-3";
    if (activeView === viewName) {
      return `${baseClasses} bg-gray-700 font-semibold`;
    }
    return baseClasses;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-gray-800 text-white p-4 flex-col border-r border-gray-700">
        <nav className="flex flex-col gap-2">
          <button className={getLinkClassName('summarizer')} onClick={() => setActiveView('summarizer')}> 
            <FaFileAlt /> Text Summarizer 
          </button>
          <button className={getLinkClassName('captioner')} onClick={() => setActiveView('captioner')}> 
            <FaImage /> Image Captioner 
          </button>
          <button className={getLinkClassName('translator')} onClick={() => setActiveView('translator')}> 
            <FaLanguage /> Translator 
          </button>
          <button className={getLinkClassName('codeExplainer')} onClick={() => setActiveView('codeExplainer')}> 
            <FaCode /> Code Explainer 
          </button>
          <button className={getLinkClassName('visualQA')} onClick={() => setActiveView('visualQA')}> 
            <FaQuestionCircle /> Visual Q&A 
          </button>
        </nav>

        <div className="mt-8 pt-4 border-t border-gray-700 flex-grow overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-400 px-4 mb-2">History</h2>
          {Object.keys(groupedHistory).length > 0 ? (
            Object.entries(groupedHistory).map(([groupName, items]) => (
              <div key={groupName} className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 px-4 uppercase">{groupName}</h3>
                <ul className="mt-1">
                  {items.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <button 
                        className="w-full text-left text-sm text-gray-300 px-4 py-1.5 truncate hover:bg-gray-700 rounded-md"
                        onClick={() => onHistoryClick(item)}
                      >
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

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">AI Tools</h1>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <button className={getLinkClassName('summarizer')} onClick={() => setActiveView('summarizer')}> 
              <FaFileAlt /> Text Summarizer 
            </button>
            <button className={getLinkClassName('captioner')} onClick={() => setActiveView('captioner')}> 
              <FaImage /> Image Captioner 
            </button>
            <button className={getLinkClassName('translator')} onClick={() => setActiveView('translator')}> 
              <FaLanguage /> Translator 
            </button>
            <button className={getLinkClassName('codeExplainer')} onClick={() => setActiveView('codeExplainer')}> 
              <FaCode /> Code Explainer 
            </button>
            <button className={getLinkClassName('visualQA')} onClick={() => setActiveView('visualQA')}> 
              <FaQuestionCircle /> Visual Q&A 
            </button>
          </nav>

          <div className="mt-8 pt-4 border-t border-gray-700 flex-grow overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-400 px-4 mb-2">History</h2>
            {Object.keys(groupedHistory).length > 0 ? (
              Object.entries(groupedHistory).map(([groupName, items]) => (
                <div key={groupName} className="mb-4">
                  <h3 className="text-xs font-bold text-gray-500 px-4 uppercase">{groupName}</h3>
                  <ul className="mt-1">
                    {items.slice(0, 5).map((item) => (
                      <li key={item.id}>
                        <button 
                          className="w-full text-left text-sm text-gray-300 px-4 py-1.5 truncate hover:bg-gray-700 rounded-md"
                          onClick={() => onHistoryClick(item)}
                        >
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
      </div>
    </>
  );
}

export default Sidebar;