// src/pages/LessonDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockLessonDetails, LessonDetail } from '../data/mockLessonDetails'; // Adjusted path
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const LessonDetailPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  // Mock progress
  const [progress, setProgress] = useState(30); // Example progress

  useEffect(() => {
    if (lessonId && mockLessonDetails[lessonId]) {
      setLesson(mockLessonDetails[lessonId]);
      // Reset state for new lesson
      setSelectedAnswer(null);
      setQuizFeedback(null);
      setIsCorrectAnswer(false);
      setProgress(Math.floor(Math.random() * 50) + 20); // Random progress for demo
    } else {
      setLesson(null); // Handle lesson not found
    }
  }, [lessonId]);

  const handleQuizSubmit = () => {
    if (!lesson?.quiz || !selectedAnswer) return;
    if (selectedAnswer === lesson.quiz.correctOptionId) {
      setQuizFeedback('correct');
      setIsCorrectAnswer(true);
      setProgress(prev => Math.min(prev + 30, 100)); // Increase progress
    } else {
      setQuizFeedback('incorrect');
      setIsCorrectAnswer(false);
    }
  };

  if (!lesson) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold">Lesson not found!</h1>
        <Link to="/lessons" className="text-learn-easy-blue hover:underline mt-4 inline-block">
          Back to Lessons
        </Link>
      </div>
    );
  }

  const { title, content, quiz, prevLessonId, nextLessonId } = lesson;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-learn-easy-green h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1 text-center">{progress}% Complete</p>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{title}</h1>

      {/* Lesson Content */}
      <div className="prose prose-lg max-w-none mb-8 space-y-4">
        {content.map((item, index) => {
          if (item.type === 'text') {
            return <p key={index}>{item.value}</p>;
          }
          if (item.type === 'code') {
            return (
              <pre key={index} className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm">
                <code>{item.value}</code>
              </pre>
            );
          }
          if (item.type === 'diagram') {
            return (
              <div key={index} className="my-4 p-6 bg-gray-100 border border-gray-300 rounded-md text-center">
                <p className="text-gray-500 italic">{item.value}</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Quiz Section */}
      {quiz && (
        <div className="my-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{quiz.question}</h2>
          <div className="space-y-3 mb-4">
            {quiz.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-3 rounded-md border cursor-pointer transition-all duration-150 ease-in-out
                                  ${selectedAnswer === option.id ? (quizFeedback === 'correct' ? 'bg-green-100 border-green-500' : quizFeedback === 'incorrect' ? 'bg-red-100 border-red-500' : 'bg-blue-100 border-learn-easy-blue') : 'bg-gray-50 hover:bg-gray-100 border-gray-300'}`}
              >
                <input
                  type="radio"
                  name="quizOption"
                  value={option.id}
                  checked={selectedAnswer === option.id}
                  onChange={() => { setSelectedAnswer(option.id); setQuizFeedback(null); setIsCorrectAnswer(false); }}
                  className="opacity-0 w-0 h-0 fixed"
                  disabled={quizFeedback !== null}
                />
                {option.text}
                {selectedAnswer === option.id && quizFeedback === 'correct' && <CheckCircleIcon className="h-5 w-5 text-green-500 ml-auto" />}
                {selectedAnswer === option.id && quizFeedback === 'incorrect' && <XCircleIcon className="h-5 w-5 text-red-500 ml-auto" />}
              </label>
            ))}
          </div>
          <button
            onClick={handleQuizSubmit}
            disabled={!selectedAnswer || quizFeedback !== null}
            className="bg-learn-easy-blue text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-80 disabled:bg-gray-400"
          >
            Check Answer
          </button>
          {quizFeedback === 'correct' && <p className="text-green-600 mt-2">Correct! Well done.</p>}
          {quizFeedback === 'incorrect' && <p className="text-red-600 mt-2">Not quite. Try reviewing the material.</p>}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-10">
        {prevLessonId ? (
          <Link
            to={`/lessons/${prevLessonId}`}
            className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Previous
          </Link>
        ) : <div /> /* Placeholder for alignment */}
        {nextLessonId && (
          <button
            onClick={() => navigate(`/lessons/${nextLessonId}`)}
            className={`flex items-center bg-learn-easy-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-80
                            ${isCorrectAnswer && quizFeedback === 'correct' ? 'animate-bounce-short' : ''}`}
            // disabled={quiz && !isCorrectAnswer} // Optionally disable if quiz must be passed
          >
            Next Lesson
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
