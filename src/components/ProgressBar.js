import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="text-xs text-gray-500 text-right">{percentage}% complete</div>
    </div>
  );
};

export default ProgressBar;