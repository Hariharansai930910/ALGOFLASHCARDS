import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import CategoryBadge from './CategoryBadge';
import ProgressBar from './ProgressBar';
import StudyControls from './StudyControls';
import { sampleProblems } from '../data/sampleData';

const LeetCodeFlashcards = ({ topicId = "dp-1d", onBackToHome }) => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [studyMode, setStudyMode] = useState(false);
  const [problemStatus, setProblemStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  
  // Define our available categories
  const categories = ["All", "Easy", "Medium", "Hard", "Array", "String", "DP"];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you'd fetch problems from an API or file
        // For this demo, we'll use our sample problems
        const topicProblems = sampleProblems[topicId] || sampleProblems['dp-1d'];
        
        // Initialize problem status for each problem
        const initialStatus = {};
        topicProblems.forEach(problem => {
          initialStatus[problem.id] = { mastered: false, needsPractice: false };
        });
        
        setProblems(topicProblems);
        setFilteredProblems(topicProblems);
        setProblemStatus(initialStatus);
        setLoading(false);
      } catch (error) {
        console.error("Error loading problems:", error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [topicId]);

  // Filter problems based on category and search term
  useEffect(() => {
    let filtered = [...problems];
    
    // Apply category filter
    if (activeCategory !== "All") {
      if (["Easy", "Medium", "Hard"].includes(activeCategory)) {
        filtered = filtered.filter(problem => problem.difficulty === activeCategory);
      }
      // Could add more category filters here (Array, String, etc.)
    }
    
    // Apply search filter
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(problem => 
        problem.title.toLowerCase().includes(search) || 
        problem.problem.toLowerCase().includes(search)
      );
    }
    
    setFilteredProblems(filtered);
    
    // Reset to first problem when filters change
    setCurrentProblemIndex(0);
    setIsFlipped(false);
  }, [activeCategory, problems, searchTerm]);
  
  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
    setCurrentProblemIndex((prevIndex) => (prevIndex + 1) % filteredProblems.length);
  };

  const handlePrevious = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
    setCurrentProblemIndex((prevIndex) => (prevIndex - 1 + filteredProblems.length) % filteredProblems.length);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };
  
  const toggleStudyMode = () => {
    setStudyMode(!studyMode);
    // Reset flip state when toggling study mode
    setIsFlipped(false);
  };
  
  const handleMarkEasy = (e) => {
    e.stopPropagation();
    const currentProblem = filteredProblems[currentProblemIndex];
    
    setProblemStatus(prev => ({
      ...prev,
      [currentProblem.id]: { 
        ...prev[currentProblem.id],
        mastered: true,
        needsPractice: false
      }
    }));
    
    // Move to next problem
    handleNext();
  };
  
  const handleMarkHard = (e) => {
    e.stopPropagation();
    const currentProblem = filteredProblems[currentProblemIndex];
    
    setProblemStatus(prev => ({
      ...prev,
      [currentProblem.id]: { 
        ...prev[currentProblem.id],
        mastered: false,
        needsPractice: true
      }
    }));
    
    // Move to next problem
    handleNext();
  };
  
  // Calculate stats for progress display
  const calculateStats = () => {
    const total = filteredProblems.length;
    const mastered = filteredProblems.filter(
      p => problemStatus[p.id]?.mastered
    ).length;
    const needsPractice = filteredProblems.filter(
      p => problemStatus[p.id]?.needsPractice
    ).length;
    
    return { total, mastered, needsPractice };
  };
  
  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading problems...</p>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">No problems found for this topic.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <button 
            onClick={onBackToHome}
            className="mb-4 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium flex items-center"
          >
            ← Back to Topics
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {topicId === 'dp-1d' ? '1D Dynamic Programming' :
             topicId === 'dp-2d' ? '2D Dynamic Programming' :
             topicId === 'arrays' ? 'Arrays & Hashing' :
             topicId === 'two-pointers' ? 'Two Pointers' :
             topicId === 'sliding-window' ? 'Sliding Window' :
             topicId === 'binary-search' ? 'Binary Search' :
             topicId === 'linked-list' ? 'Linked Lists' :
             topicId === 'trees' ? 'Trees' :
             topicId === 'tries' ? 'Tries' :
             topicId === 'heaps' ? 'Priority Queue / Heap' :
             topicId === 'backtracking' ? 'Backtracking' :
             topicId === 'graphs' ? 'Graphs' :
             topicId === 'greedy' ? 'Greedy' :
             topicId === 'intervals' ? 'Intervals' :
             topicId === 'math' ? 'Math & Geometry' :
             topicId === 'bit-manipulation' ? 'Bit Manipulation' :
             topicId === 'stack' ? 'Stack' :
             topicId === 'design' ? 'Design' :
             'LeetCode'} Flashcards
          </h1>
          <p className="text-gray-600 mb-6">Master algorithm patterns with these interactive flashcards</p>
          
          {/* Search bar */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search by problem title or description..." 
              />
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map(category => (
              <CategoryBadge 
                key={category}
                category={category} 
                active={activeCategory === category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
          
          {/* Study mode toggle */}
          <div className="flex justify-center mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <span className="mr-3 text-sm font-medium text-gray-700">Browse</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={studyMode}
                  onChange={toggleStudyMode}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Study Mode</span>
            </label>
          </div>
          
          {/* Progress bar for study mode */}
          {studyMode && (
            <div className="mb-4 max-w-xl mx-auto">
              <ProgressBar current={stats.mastered} total={stats.total} />
              <div className="flex justify-between text-sm text-gray-600">
                <div>Mastered: {stats.mastered}</div>
                <div>Need Practice: {stats.needsPractice}</div>
                <div>Remaining: {stats.total - stats.mastered - stats.needsPractice}</div>
              </div>
            </div>
          )}
        </header>
        
        <div className="relative">
          {/* Problem counter */}
          <div className="text-center mb-4 text-gray-600">
            Problem {currentProblemIndex + 1} of {filteredProblems.length}
          </div>
          
          {/* Flashcard */}
          {filteredProblems.length > 0 && (
            <FlashCard 
              problem={filteredProblems[currentProblemIndex]} 
              flipped={isFlipped} 
              onFlip={toggleFlip}
              topicId={topicId}
            />
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button 
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <button 
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Study controls */}
          {studyMode && (
            <StudyControls 
              onMarkEasy={handleMarkEasy} 
              onMarkHard={handleMarkHard}
              disabled={!isFlipped} // Only enable after seeing the solution
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeFlashcards;