import React from 'react';

const StudyControls = ({ onMarkEasy, onMarkHard, disabled }) => {
  return (
    <div className={`flex justify-center gap-4 mt-4 ${disabled ? 'opacity-50' : ''}`}>
      <button
        onClick={onMarkHard}
        disabled={disabled}
        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg font-medium disabled:cursor-not-allowed"
      >
        Need Practice 😓
      </button>
      <button
        onClick={onMarkEasy}
        disabled={disabled}
        className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium disabled:cursor-not-allowed"
      >
        Got It! 🎉
      </button>
    </div>
  );
};

export default StudyControls;