import React from 'react';

const CategoryBadge = ({ category, active, onClick }) => {
  const baseClasses = "px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors";
  const activeClasses = active 
    ? "bg-blue-600 text-white" 
    : "bg-blue-100 text-blue-800 hover:bg-blue-200";
  
  return (
    <span 
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
