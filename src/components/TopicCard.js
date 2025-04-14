import React from 'react';

const TopicCard = ({ topic, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 ${topic.isHot ? 'border-2 border-orange-300' : ''}`}
      onClick={() => onClick(topic)}
    >
      <div className={`${topic.color} h-3`}></div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800">{topic.name}</h3>
          {topic.isNew && (
            <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">NEW</span>
          )}
          {topic.isHot && (
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full">🔥 HOT</span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-2">
          {topic.id === 'heaps' ? 
            'Learn priority queue operations and heap-based algorithms.' :
           topic.id === 'greedy' ? 
            'Master choosing the locally optimal choice at each step.' :
           topic.id === 'graphs' ?
            'Explore traversal, connectivity, and pathfinding in graphs.' :
           topic.id === 'bit-manipulation' ?
            'Learn bit-level operations to solve problems efficiently.' :
           topic.id === 'binary-search' ?
            'Master the divide-and-conquer approach to search efficiently.' :
           topic.id === 'dp-1d' ?
            'Learn to solve problems by breaking them into overlapping subproblems.' :
            'Master algorithms to ace your technical interviews.'}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-500 text-sm">{topic.count} Problems</span>
          <div className="flex items-center text-blue-600 text-sm font-medium">
            Start Practicing
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;