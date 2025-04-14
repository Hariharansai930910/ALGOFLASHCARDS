import React from 'react';
import TopicCard from './TopicCard';
import { topics } from '../data/sampleData';

const HomePage = ({ onTopicSelect }) => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AlgoFlash</h1>
          <p className="text-gray-600 mb-6">Master algorithms with interactive flashcards</p>
        </header>

        {/* Recently Added section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🆕</span> Recently Added
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topics.filter(topic => topic.isNew && topic.available).map((topic) => (
              <TopicCard key={topic.id} topic={topic} onClick={onTopicSelect} />
            ))}
          </div>
        </div>
        
        {/* Most Popular section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🔥</span> Most Popular
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topics.filter(topic => topic.isHot && topic.available).map((topic) => (
              <TopicCard key={topic.id} topic={topic} onClick={onTopicSelect} />
            ))}
          </div>
        </div>
        
        {/* All Topics section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📚</span> All Topics
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topics.filter(topic => topic.available).map((topic) => (
              <TopicCard key={topic.id} topic={topic} onClick={onTopicSelect} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;