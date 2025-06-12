// src/data/mockLessonDetails.ts
export interface LessonQuizOption {
  id: string;
  text: string;
}

export interface LessonQuiz {
  question: string;
  options: LessonQuizOption[];
  correctOptionId: string;
  type: 'multiple-choice' | 'fill-in-the-blank'; // For now, only MC
}

export interface LessonDetail {
  id: string;
  title: string;
  content: Array<{ type: 'text' | 'code' | 'diagram'; value: string }>;
  quiz?: LessonQuiz;
  nextLessonId?: string;
  prevLessonId?: string;
}

export const mockLessonDetails: Record<string, LessonDetail> = {
  'js-basics': {
    id: 'js-basics',
    title: 'JavaScript for Beginners',
    content: [
      { type: 'text', value: 'JavaScript is a versatile programming language primarily used for web development. It allows you to add interactivity to websites.' },
      { type: 'text', value: 'Variables are used to store data. You can declare variables using `var`, `let`, or `const`.' },
      { type: 'code', value: 'let message = "Hello, World!";\nconsole.log(message);' },
      { type: 'text', value: 'Functions are blocks of code designed to perform a particular task.' },
      { type: 'diagram', value: 'Diagram: JS Execution Model (Placeholder)' },
    ],
    quiz: {
      question: 'Which keyword is used to declare a variable that cannot be reassigned?',
      options: [
        { id: 'a', text: 'var' },
        { id: 'b', text: 'let' },
        { id: 'c', text: 'const' },
      ],
      correctOptionId: 'c',
      type: 'multiple-choice',
    },
    nextLessonId: 'html-css',
    prevLessonId: undefined,
  },
  'rest-api': {
    id: 'rest-api',
    title: 'Understanding REST APIs',
    content: [
      { type: 'text', value: 'A REST API (Representational State Transfer Application Programming Interface) is an architectural style for designing networked applications.' },
      { type: 'text', value: 'It relies on a stateless, client-server, cacheable communications protocol — in virtually all cases, the HTTP protocol.' },
      { type: 'code', value: 'GET /users/123 HTTP/1.1\nHost: api.example.com\nAccept: application/json' },
      { type: 'diagram', value: 'Diagram: Client-Server REST Interaction (Placeholder)' },
      { type: 'text', value: 'Common HTTP methods include GET, POST, PUT, DELETE.' },
    ],
    quiz: {
      question: 'Which HTTP method is typically used to retrieve data from a server?',
      options: [
        { id: 'a', text: 'POST' },
        { id: 'b', text: 'GET' },
        { id: 'c', text: 'DELETE' },
      ],
      correctOptionId: 'b',
      type: 'multiple-choice',
    },
    nextLessonId: 'sys-design-intro',
    prevLessonId: 'react-intro', // Example
  },
  // Add more lesson details as needed
};
