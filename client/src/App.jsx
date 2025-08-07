import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import Summarizer from './components/Summarizer.jsx';
import ImageCaptioner from './components/ImageCaptioner.jsx';
import Translator from './components/Translator.jsx';
import CodeExplainer from './components/CodeExplainer.jsx';
import VisualQA from './components/VisualQA.jsx';

function App() {
  const [activeView, setActiveView] = useState('summarizer');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex-grow flex flex-col">
        <Navbar currentView={activeView} />

        <main className="flex-grow flex items-center justify-center p-8">
          {/* Conditional rendering for all 5 components */}
          {activeView === 'summarizer' && <Summarizer />}
          {activeView === 'captioner' && <ImageCaptioner />}
          {activeView === 'translator' && <Translator />}
          {activeView === 'codeExplainer' && <CodeExplainer />}
          {activeView === 'visualQA' && <VisualQA />}
        </main>
      </div>
    </div>
  );
}

export default App;