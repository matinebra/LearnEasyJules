// src/pages/OnboardingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
  correctAnswer: string; // Not used for level assessment in this mock, but good for future
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: 'What is React primarily used for?',
    options: [
      { value: 'a', label: 'Building user interfaces' },
      { value: 'b', label: 'Managing databases' },
      { value: 'c', label: 'Server-side logic' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 2,
    text: 'Which of the following is a version control system?',
    options: [
      { value: 'a', label: 'Photoshop' },
      { value: 'b', label: 'Git' },
      { value: 'c', label: 'Node.js' },
    ],
    correctAnswer: 'b',
  },
  {
    id: 3,
    text: 'What does API stand for?',
    options: [
      { value: 'a', label: 'Application Programming Interface' },
      { value: 'b', label: 'Automated Program Interaction' },
      { value: 'c', label: 'Algorithmic Process Integration' },
    ],
    correctAnswer: 'a',
  },
];

const OnboardingPage: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const handleOptionChange = (questionId: number, optionValue: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted answers:', answers);

    // Mock level assessment (very basic)
    let correctCount = 0;
    quizQuestions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) {
            correctCount++;
        }
    });

    let level = 'Beginner';
    if (correctCount === 3) {
      level = 'Advanced';
    } else if (correctCount >= 1) {
      level = 'Intermediate';
    }

    alert(`Onboarding complete! Your assessed level is: ${level}. Redirecting to home page.`);
    // In a real app, you'd save this level to user profile
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-learn-easy-blue mb-8">
          Welcome to LearnEasy!
        </h1>
        <p className="text-center text-gray-700 mb-6">
          Answer these few questions to help us tailor your learning experience.
        </p>
        <form onSubmit={handleSubmit}>
          {quizQuestions.map((question) => (
            <div key={question.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-lg mb-3">{question.id}. {question.text}</p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 rounded-md border cursor-pointer transition-all duration-150 ease-in-out
                                      ${answers[question.id] === option.value
                                        ? 'bg-learn-easy-green border-learn-easy-green text-white'
                                        : 'bg-white hover:bg-gray-50 border-gray-300'}`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={() => handleOptionChange(question.id, option.value)}
                      className="opacity-0 w-0 h-0 fixed" // Hide actual radio, style label
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            disabled={Object.keys(answers).length !== quizQuestions.length}
            className="w-full bg-learn-easy-blue hover:bg-opacity-80 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
          >
            Complete Onboarding & Start Learning
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
