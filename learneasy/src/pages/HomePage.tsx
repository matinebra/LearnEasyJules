// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, PencilSquareIcon, FireIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; // Using outline icons

// Mock data for suggested lessons
const suggestedLessons = [
  { id: 'sys-design-intro', title: 'Intro to System Design', category: 'System Design', description: 'Learn the fundamentals of designing scalable systems.' },
  { id: 'rest-api', title: 'Understanding REST APIs', category: 'Backend', description: 'Deep dive into REST principles and best practices.' },
  { id: 'js-basics', title: 'JavaScript for Beginners', category: 'Frontend', description: 'Get started with the web\'s most popular language.' },
];

// Mock data for daily challenge
const dailyChallenge = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
};

const userStreak = 5; // Mock streak

const HomePage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome back, Learner!</h1>
        <p className="text-gray-600 mt-1">Ready to tackle something new today?</p>
      </div>

      {/* Streak Counter */}
      <div className="bg-gradient-to-r from-learn-easy-yellow to-learn-easy-green p-6 rounded-xl shadow-lg text-center">
        <div className="flex items-center justify-center text-white">
          <FireIcon className="h-10 w-10 mr-3" />
          <span className="text-3xl font-bold">{userStreak} Days Streak!</span>
        </div>
        <p className="text-white mt-1">Keep the flame alive! 🔥</p>
      </div>

      {/* Suggested Lessons Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <BookOpenIcon className="h-7 w-7 mr-2 text-learn-easy-blue" />
          Suggested Lessons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedLessons.map((lesson) => (
            <Link to={`/lessons/${lesson.id}`} key={lesson.id} className="block group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-learn-easy-blue group-hover:text-learn-easy-green mb-2">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{lesson.category}</p>
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
      </div>

      {/* Daily Coding Challenge Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <PencilSquareIcon className="h-7 w-7 mr-2 text-learn-easy-blue" />
          Daily Coding Challenge
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out">
          <h3 className="text-xl font-semibold text-learn-easy-blue mb-2">{dailyChallenge.title}</h3>
          <p className="text-sm text-gray-500 mb-4">Difficulty: {dailyChallenge.difficulty}</p>
          <Link
            to="/code" // Assuming '/code' is the route for the coding challenge page
            state={{ challengeId: dailyChallenge.id }} // Optional: pass challenge id
            className="inline-block bg-learn-easy-green hover:opacity-80 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Start Challenge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
