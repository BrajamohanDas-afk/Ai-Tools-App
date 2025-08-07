import Summarizer from './components/Summarizer.jsx';
import ImageCaptioner from './components/ImageCaptioner.jsx';
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 gap-8">
      <h1 className="text-4xl font-bold">AI Assistant</h1>
      <Summarizer />
      <ImageCaptioner />
    </div>
  );
}

export default App;