import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import Summarizer from './components/Summarizer.jsx';
import ImageCaptioner from './components/ImageCaptioner.jsx';
import Translator from './components/Translator.jsx';
import CodeExplainer from './components/CodeExplainer.jsx';
import VisualQA from './components/VisualQA.jsx';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [activeView, setActiveView] = useState('summarizer');
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('ai-tools-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [viewingHistoryItem, setViewingHistoryItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('ai-tools-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item) => {
    const newHistoryItem = { id: uuidv4(), ...item, date: new Date() };
    setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
  };

  const handleHistoryClick = (item) => {
    // // --- DEBUG LOG ---
    // console.log("History item clicked in App.jsx:", item); 
    
    const viewNameMap = {
      'Summarizer': 'summarizer',
      'Captioner': 'captioner',
      'Translator': 'translator',
      'Code Explainer': 'codeExplainer',
      'Visual Q&A': 'visualQA'
    };
    const viewName = viewNameMap[item.type];
    
    setActiveView(viewName);
    setViewingHistoryItem(item);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        history={history}
        onHistoryClick={handleHistoryClick}
      />
      <div className="flex-grow flex flex-col">
        <Navbar currentView={activeView} />
        <main className="flex-grow flex items-center justify-center p-8">
          {activeView === 'summarizer' && <Summarizer addToHistory={addToHistory} viewingHistoryItem={viewingHistoryItem} />}
          {activeView === 'captioner' && <ImageCaptioner addToHistory={addToHistory} viewingHistoryItem={viewingHistoryItem} />}
          {activeView === 'translator' && <Translator addToHistory={addToHistory} viewingHistoryItem={viewingHistoryItem} />}
          {activeView === 'codeExplainer' && <CodeExplainer addToHistory={addToHistory} viewingHistoryItem={viewingHistoryItem} />}
          {activeView === 'visualQA' && <VisualQA addToHistory={addToHistory} viewingHistoryItem={viewingHistoryItem} />}
        </main>
      </div>
    </div>
  );
}

export default App;