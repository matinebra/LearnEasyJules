// src/pages/CodingChallengePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // useLocation to get challengeId from state if passed
import { mockCodingChallenges, CodingChallenge, TestCase } from '../data/mockCodingChallenges';
import { PlayIcon, CheckIcon, ArrowPathIcon, LightBulbIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const supportedLanguages = ['javascript', 'python'];

const CodingChallengePage: React.FC = () => {
  const { challengeId: challengeIdFromParams } = useParams<{ challengeId: string }>();
  const location = useLocation();
  // Prefer challengeId from location state (passed from Home page link) or use param, default to 'two-sum'
  const challengeId = location.state?.challengeId || challengeIdFromParams || 'two-sum';

  const [challenge, setChallenge] = useState<CodingChallenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);
  const [results, setResults] = useState<TestCase[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'testcases' | 'explanation'>('testcases');


  useEffect(() => {
    const currentChallenge = mockCodingChallenges[challengeId];
    if (currentChallenge) {
      setChallenge(currentChallenge);
      setUserCode(currentChallenge.defaultCode[selectedLanguage] || '');
      setResults([]); // Reset results when challenge changes
      setShowExplanation(false);
      setActiveTab('testcases');
    } else {
      setChallenge(null); // Handle challenge not found
    }
  }, [challengeId, selectedLanguage]);

  const handleRunCode = () => {
    console.log("Running code:", userCode, "Language:", selectedLanguage);
    // Mock run: show first test case as passed, rest as pending
    if (challenge) {
      const mockRunResults = challenge.testCases.map((tc, index) => ({
        ...tc,
        actualOutput: index === 0 ? tc.expectedOutput : 'Pending...',
        passed: index === 0 ? true : undefined,
      }));
      setResults(mockRunResults);
      setActiveTab('testcases');
      setShowExplanation(false);
    }
  };

  const handleSubmitCode = () => {
    console.log("Submitting code:", userCode, "Language:", selectedLanguage);
    // Mock submission: randomly pass/fail some test cases
    if (challenge) {
      const mockSubmissionResults = challenge.testCases.map(tc => {
        const passes = Math.random() > 0.3; // ~70% chance of passing
        return {
          ...tc,
          actualOutput: passes ? tc.expectedOutput : `Error: Expected ${tc.expectedOutput}, got something else.`,
          passed: passes,
        };
      });
      setResults(mockSubmissionResults);
      setShowExplanation(true); // Show explanation after submission
      setActiveTab('testcases');
    }
  };

  const handleResetCode = () => {
    if (challenge) {
      setUserCode(challenge.defaultCode[selectedLanguage] || '');
    }
  };

  if (!challenge) {
    return <div className="p-10 text-center text-xl">Coding Challenge not found!</div>;
  }

  return (
    // This component is rendered within MainLayout, which has its own padding.
    // The flex container here will try to take full available height within MainLayout's main content area.
    <div className="flex flex-col md:flex-row h-full bg-gray-100">
      {/* Left Panel: Problem Description & Test Cases/Explanation */}
      <div className="w-full md:w-1/2 p-4 overflow-y-auto bg-gray-50 md:border-r md:border-gray-200">
        <h1 className="text-2xl font-bold text-learn-easy-blue mb-4">{challenge.title}</h1>
        {/* Using prose-sm for smaller text, max-w-none to override prose width constraints */}
        <div className="prose prose-sm max-w-none mb-6 text-gray-700" dangerouslySetInnerHTML={{ __html: challenge.description.replace(/\n/g, '<br/>') }} />

        <div className="mb-4">
          <h3 className="font-semibold mb-1 text-gray-700">Examples:</h3>
          {challenge.examples.map((ex, i) => (
            <div key={i} className="text-xs bg-gray-100 p-2 rounded mb-2 border border-gray-200">
              <p><strong>Input:</strong> {ex.input}</p>
              <p><strong>Output:</strong> {ex.output}</p>
              {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-1 text-gray-700">Constraints:</h3>
          <ul className="list-disc list-inside text-xs text-gray-600">
            {challenge.constraints.map((c, i) => <li key={i} dangerouslySetInnerHTML={{__html: c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)}
          </ul>
        </div>
         {/* Tabs for Test Cases / Explanation */}
        <div className="border-b border-gray-300">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('testcases')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'testcases' ? 'border-learn-easy-blue text-learn-easy-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Test Cases
            </button>
            {showExplanation && (
              <button
                onClick={() => setActiveTab('explanation')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'explanation' ? 'border-learn-easy-blue text-learn-easy-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Explanation <LightBulbIcon className="h-4 w-4 inline mb-0.5" />
              </button>
            )}
          </nav>
        </div>

        {activeTab === 'testcases' && (
          <div className="mt-4 space-y-2">
            {results.length > 0 ? results.map((res, i) => (
              <div key={i} className={`p-3 rounded text-xs shadow-sm ${res.passed === true ? 'bg-green-50 border-green-200' : res.passed === false ? 'bg-red-50 border-red-200' : 'bg-gray-100 border-gray-200'} border`}>
                <p className="font-semibold flex justify-between items-center">
                  Test Case {i + 1}
                  <span className={`${res.passed === true ? 'text-green-600' : res.passed === false ? 'text-red-600' : 'text-gray-500'}`}>
                    {res.passed === true ? 'Passed ✅' : res.passed === false ? 'Failed ❌' : 'Pending...'}
                  </span>
                </p>
                <p className="mt-1">Input: <code className="text-xs bg-gray-200 p-0.5 rounded">{res.input}</code></p>
                <p>Expected: <code className="text-xs bg-gray-200 p-0.5 rounded">{res.expectedOutput}</code></p>
                {res.actualOutput && res.passed === false && <p>Got: <code className="text-xs bg-red-200 p-0.5 rounded">{res.actualOutput}</code></p>}
              </div>
            )) : challenge.testCases.map((tc, i) => (
                 <div key={i} className="p-3 rounded text-xs bg-gray-100 border border-gray-200 shadow-sm">
                    <p className="font-semibold">Test Case {i + 1}</p>
                    <p className="mt-1">Input: <code className="text-xs bg-gray-200 p-0.5 rounded">{tc.input}</code></p>
                 </div>
            ))}
          </div>
        )}

        {activeTab === 'explanation' && showExplanation && (
          <div className="mt-4 prose prose-sm max-w-none text-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Solution Explanation</h2>
            {challenge.explanation.text.map((p, i) => <p key={i} className="mb-2">{p}</p>)}
            {challenge.explanation.diagram && (
              <div className="my-4 p-4 bg-gray-200 border border-gray-300 rounded-md text-center">
                <p className="text-gray-600 italic">{challenge.explanation.diagram}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Panel: Code Editor & Controls */}
      <div className="w-full md:w-1/2 p-4 flex flex-col bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="relative">
            <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-md py-1.5 pl-3 pr-7 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-learn-easy-blue focus:border-learn-easy-blue shadow-sm"
            >
                {supportedLanguages.map(lang => <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>)}
            </select>
            <ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button onClick={handleResetCode} className="text-xs text-gray-600 hover:text-learn-easy-blue flex items-center">
            <ArrowPathIcon className="h-4 w-4 mr-1" /> Reset
          </button>
        </div>

        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder="Write your code here..."
          className="flex-grow w-full p-3 border border-gray-300 rounded-md resize-none font-mono text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-learn-easy-blue shadow-sm"
          spellCheck="false"
        />
        <div className="mt-4 flex items-center justify-end space-x-3">
          <button
            onClick={handleRunCode}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md flex items-center text-sm shadow-sm"
          >
            <PlayIcon className="h-5 w-5 mr-1" /> Run
          </button>
          <button
            onClick={handleSubmitCode}
            className="bg-learn-easy-green hover:bg-opacity-80 text-white font-medium py-2 px-4 rounded-md flex items-center text-sm shadow-sm"
          >
            <CheckIcon className="h-5 w-5 mr-1" /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingChallengePage;
