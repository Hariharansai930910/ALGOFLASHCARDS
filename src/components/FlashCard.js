import React, { useState } from 'react';

const FlashCard = ({ problem, flipped, onFlip, topicId = "dp-1d" }) => {
  if (!problem) return null;
  
  const [showHint, setShowHint] = useState(false);
  
  // Determine difficulty color
  const difficultyColor = {
    "Easy": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Hard": "bg-red-100 text-red-800"
  }[problem.difficulty] || "bg-blue-100 text-blue-800";
  
  // Map topicId to display name and color
  const topicMap = {
    'dp-1d': { name: 'DP', color: 'bg-blue-100 text-blue-800' },
    'dp-2d': { name: 'DP', color: 'bg-blue-100 text-blue-800' },
    'arrays': { name: 'Arrays', color: 'bg-green-100 text-green-800' },
    'two-pointers': { name: '2 Pointers', color: 'bg-yellow-100 text-yellow-800' },
    'sliding-window': { name: 'Sliding', color: 'bg-orange-100 text-orange-800' },
    'binary-search': { name: 'Binary', color: 'bg-red-100 text-red-800' },
    'linked-list': { name: 'Linked', color: 'bg-purple-100 text-purple-800' },
    'trees': { name: 'Trees', color: 'bg-emerald-100 text-emerald-800' },
    'tries': { name: 'Tries', color: 'bg-sky-100 text-sky-800' },
    'heaps': { name: 'Heap', color: 'bg-lime-100 text-lime-800' },
    'backtracking': { name: 'Backtracking', color: 'bg-amber-100 text-amber-800' },
    'graphs': { name: 'Graphs', color: 'bg-fuchsia-100 text-fuchsia-800' },
    'greedy': { name: 'Greedy', color: 'bg-teal-100 text-teal-800' },
    'intervals': { name: 'Intervals', color: 'bg-cyan-100 text-cyan-800' },
    'math': { name: 'Math', color: 'bg-rose-100 text-rose-800' },
    'bit-manipulation': { name: 'Bits', color: 'bg-violet-100 text-violet-800' },
    'stack': { name: 'Stack', color: 'bg-pink-100 text-pink-800' },
    'design': { name: 'Design', color: 'bg-gray-100 text-gray-800' }
  };
  
  const topic = topicMap[topicId] || { name: 'Algo', color: 'bg-blue-100 text-blue-800' };
  
  const handleHintClick = (e) => {
    e.stopPropagation(); // Prevent card flip
    setShowHint(!showHint);
  };
  
  return (
    <div 
      className="w-full max-w-xl mx-auto h-96 cursor-pointer relative"
      onClick={onFlip}
    >
      <div className={`relative w-full h-full transition-all duration-500 ${
        flipped ? 'opacity-0 absolute' : 'opacity-100'
      }`}>
        {/* Front of card */}
        <div className="w-full h-full bg-white rounded-xl shadow-xl p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">#{problem.id}. {problem.title}</h2>
            <div className="flex space-x-2">
              <span className={`text-sm px-2 py-1 rounded-full ${difficultyColor}`}>
                {problem.difficulty}
              </span>
              <span className={`text-sm px-2 py-1 rounded-full ${topic.color}`}>
                {topic.name}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4 h-64 overflow-y-auto">
            <h3 className="font-semibold text-gray-800 mb-2">Problem:</h3>
            <p className="text-gray-700 mb-4">{problem.problem}</p>
            
            <button 
              className="mt-4 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-md text-sm font-medium flex items-center"
              onClick={handleHintClick}
            >
              {showHint ? "Hide Hint" : "Show Hint"} 
              <span className="ml-1">💡</span>
            </button>
            
            {showHint && (
              <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-gray-700 font-medium">{problem.hint}</p>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500 text-sm">
            Click to flip for solution
          </div>
        </div>
      </div>
      
      <div className={`relative w-full h-full transition-all duration-500 ${
        flipped ? 'opacity-100' : 'opacity-0 absolute'
      }`}>
        {/* Back of card */}
        <div className="w-full h-full bg-white rounded-xl shadow-xl p-6 overflow-auto">
          <div className="mb-4 bg-blue-50 p-3 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1 text-lg">✅ One-liner:</h3>
            <p className="text-gray-700">{problem.oneLiner || "Use dynamic programming to solve this step by step."}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1 text-lg flex items-center">
              <span className="mr-2">👶</span> Explanation for beginners:
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              {problem.forKids && problem.forKids.length > 0 ? (
                problem.forKids.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))
              ) : (
                <li>Break the problem into smaller subproblems that are easier to solve.</li>
              )}
            </ul>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1 text-lg flex items-center">
              <span className="mr-2">🧠</span> Mnemonics:
            </h3>
            <ul className="list-disc pl-5 text-gray-700">
              {problem.mnemonics && problem.mnemonics.filter(m => m !== "---").map((mnemonic, idx) => (
                <li key={idx}>{mnemonic}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1 text-lg">💻 Solution:</h3>
            <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm shadow-inner">
              <code>{problem.solution}</code>
            </pre>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-2 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-1">⏱️ Time:</h3>
              <p className="text-gray-700 text-sm">{problem.timeComplexity}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-1">🧠 Space:</h3>
              <p className="text-gray-700 text-sm">{problem.spaceComplexity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;