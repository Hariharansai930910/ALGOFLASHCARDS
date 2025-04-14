import React, { useState } from 'react';
import LeetCodeFlashcards from './components/LeetCodeFlashcards';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };
  
  const handleBackToHome = () => {
    setSelectedTopic(null);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {selectedTopic ? (
        <LeetCodeFlashcards 
          topicId={selectedTopic.id} 
          onBackToHome={handleBackToHome}
        />
      ) : (
        <HomePage onTopicSelect={handleTopicSelect} />
      )}
    </div>
  );
}

export default App;