import React, { useState, useEffect } from 'react'; // Import useEffect
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import Summarizer from './components/Summarizer.jsx';
import ImageCaptioner from './components/ImageCaptioner.jsx';
import Translator from './components/Translator.jsx';
import CodeExplainer from './components/CodeExplainer.jsx';
import VisualQA from './components/VisualQA.jsx';
import { v4 as uuidv4 } from 'uuid'; // We'll need a library for unique IDs

function App() {
  const [activeView, setActiveView] = useState('summarizer');
  
  // 1. Initialize history state from localStorage or an empty array
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('ai-tools-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // 2. Use useEffect to save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ai-tools-history', JSON.stringify(history));
  }, [history]);

  // 3. Function to add a new item to the history
  const addToHistory = (item) => {
    // Create a new history item with a unique ID and date
    const newHistoryItem = { id: uuidv4(), ...item, date: new Date() };
    setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Pass history down to the Sidebar */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        history={history}
      />

      <div className="flex-grow flex flex-col">
        <Navbar currentView={activeView} />

        <main className="flex-grow flex items-center justify-center p-8">
          {/* Pass addToHistory function down to each tool */}
          {activeView === 'summarizer' && <Summarizer addToHistory={addToHistory} />}
          {activeView === 'captioner' && <ImageCaptioner addToHistory={addToHistory} />}
          {activeView === 'translator' && <Translator addToHistory={addToHistory} />}
          {activeView === 'codeExplainer' && <CodeExplainer addToHistory={addToHistory} />}
          {activeView === 'visualQA' && <VisualQA addToHistory={addToHistory} />}
        </main>
      </div>
    </div>
  );
}

export default App;