// frontend/src/App.jsx - FINAL CLEAN & MODERN DESIGN

import { useState } from 'react';
import axios from 'axios';

const emotions = [
    { emoji: '😊', name: 'Happy' }, { emoji: '😢', name: 'Sad' },
    { emoji: '😡', name: 'Angry' }, { emoji: '😌', name: 'Calm' },
    { emoji: '😔', name: 'Lonely' }, { emoji: '😰', name: 'Stressed' },
];

function App() {
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('Story');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true); setError(''); setResult(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiUrl}/generate`, {
        emotion: selectedEmotion.name, desc: description, style: style,
      });
      if (response.data.error) { setError(response.data.error); }
      else { setResult(response.data); }
    } catch (err) { setError('Failed to connect to the backend. Is the Python server running?'); }
    finally { setIsLoading(false); }
  };

  const handleSpeak = () => {
    if (result && result.content && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(result.content);
      window.speechSynthesis.speak(utterance);
    } else { alert("Sorry, your browser does not support text-to-speech."); }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-text-main">
            Emotional Storyteller
          </h1>
          <p className="text-text-light mt-4 text-xl">Your personal AI companion for creative expression.</p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-8">
            <div>
              <label className="block mb-3 text-lg font-semibold text-text-main">1. How are you feeling today?</label>
              <div className="flex flex-wrap gap-3">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.name}
                    onClick={() => setSelectedEmotion(emotion)}
                    className={`w-16 h-16 text-4xl rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4
                      ${selectedEmotion.name === emotion.name
                        ? 'bg-teal-deep text-white ring-teal-deep/30'
                        : 'bg-cream hover:bg-gray-200'
                      }`}
                  >
                    {emotion.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block mb-3 text-lg font-semibold text-text-main">
                2. What's on your mind? (optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share a thought, a feeling, a memory..."
                className="w-full p-4 bg-cream border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-deep focus:outline-none transition text-lg"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label htmlFor="style" className="block mb-3 text-lg font-semibold text-text-main">
                3. Choose a creative style
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-4 bg-cream border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-deep focus:outline-none transition text-lg"
              >
                <option>Story</option>
                <option>Poem</option>
                <option>Motivational Quote</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-4 text-xl font-bold bg-coral-warm text-white rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-coral-warm/30"
            >
              {isLoading ? 'Creating...' : '✨ Generate My Story'}
            </button>
          </div>
        </main>

        {isLoading && (
          <div className="text-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-coral-warm mx-auto"></div>
            <p className="mt-4 text-lg text-text-light">Your AI is thinking...</p>
          </div>
        )}
        {error && (
          <div className="mt-8 p-6 bg-red-100 text-red-700 border border-red-300 rounded-xl shadow-subtle animate-fade-in-up">
            <strong className="font-bold">An error occurred:</strong> {error}
          </div>
        )}
        
        {result && (
          <div className="mt-10 bg-white p-6 sm:p-8 rounded-2xl shadow-medium animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-deep to-blue-soft mb-4">{result.title}</h2>
            <p className="text-text-main whitespace-pre-wrap text-xl leading-relaxed">{result.content}</p>
            <div className="mt-6 border-t border-gray-200 pt-5">
              <button
                onClick={handleSpeak}
                className="px-6 py-3 bg-blue-soft text-white rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-lg shadow-lg shadow-blue-soft/30"
                title="Listen to the story"
              >
                🎧 Listen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;