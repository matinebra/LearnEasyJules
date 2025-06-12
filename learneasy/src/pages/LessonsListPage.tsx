// src/pages/LessonsListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, ArrowRightIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Lesson {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const allLessons: Lesson[] = [
  { id: 'js-basics', title: 'JavaScript for Beginners', category: 'Frontend', description: 'Get started with the web\'s most popular language.', difficulty: 'Beginner' },
  { id: 'html-css', title: 'HTML & CSS Fundamentals', category: 'Frontend', description: 'Learn the building blocks of web pages.', difficulty: 'Beginner' },
  { id: 'react-intro', title: 'Introduction to React', category: 'Frontend', description: 'Build dynamic user interfaces with React.', difficulty: 'Intermediate' },
  { id: 'node-express', title: 'Node.js & Express API', category: 'Backend', description: 'Create powerful backend services.', difficulty: 'Intermediate' },
  { id: 'python-ds', title: 'Data Structures in Python', category: 'Algorithms', description: 'Understand fundamental data structures.', difficulty: 'Intermediate' },
  { id: 'sys-design-intro', title: 'Intro to System Design', category: 'System Design', description: 'Learn the fundamentals of designing scalable systems.', difficulty: 'Advanced' },
  { id: 'rest-api', title: 'Understanding REST APIs', category: 'Backend', description: 'Deep dive into REST principles and best practices.', difficulty: 'Advanced' },
  { id: 'git-collab', title: 'Git and Collaboration', category: 'Tools', description: 'Master version control for team projects.', difficulty: 'Beginner' },
];

const LessonsListPage: React.FC = () => {
  // Mock search/filter states - not functional yet
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...new Set(allLessons.map(lesson => lesson.category))];

  // Mock filtering logic
  const filteredLessons = allLessons.filter(lesson => {
    return (
      (selectedCategory === 'All' || lesson.category === selectedCategory) &&
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4 md:p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center">
          <BookOpenIcon className="h-10 w-10 mr-3 text-learn-easy-blue" />
          Explore All Lessons
        </h1>
        <p className="text-gray-600 mt-1">Find your next learning adventure.</p>
      </div>

      {/* Filter and Search Bar - Mockup */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="search-lessons" className="sr-only">Search Lessons</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search-lessons"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-learn-easy-blue focus:border-learn-easy-blue sm:text-sm"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
            <select
              id="category-filter"
              className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-learn-easy-blue focus:border-learn-easy-blue sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-learn-easy-blue hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-learn-easy-blue">
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 md:hidden" />
            <span className="hidden md:inline">Filters</span> {/* Show text on larger screens */}
          </button>
        </div>
      </div>

      {/* Lessons Grid */}
      {filteredLessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Link to={`/lessons/${lesson.id}`} key={lesson.id} className="block group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out h-full flex flex-col">
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-learn-easy-blue group-hover:text-learn-easy-green">{lesson.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${
                      lesson.difficulty === 'Beginner' ? 'bg-green-400' :
                      lesson.difficulty === 'Intermediate' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{lesson.category}</p>
                  <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                </div>
                <div className="mt-auto">
                  <span className="text-learn-easy-green group-hover:underline font-medium flex items-center">
                    Start Lesson <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No lessons found matching your criteria.</p>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default LessonsListPage;
