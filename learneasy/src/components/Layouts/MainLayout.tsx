// src/components/Layouts/MainLayout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-learn-easy-blue text-white p-4 text-center">
        LearnEasy App
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> {/* Child routes will render here */}
      </main>
      <footer className="bg-gray-200 p-4 sticky bottom-0">
        <nav className="flex justify-around">
          <Link to="/" className="text-learn-easy-blue hover:text-learn-easy-green">Home</Link>
          <Link to="/lessons" className="text-learn-easy-blue hover:text-learn-easy-green">Lessons</Link>
          <Link to="/code" className="text-learn-easy-blue hover:text-learn-easy-green">Code</Link>
          <Link to="/profile" className="text-learn-easy-blue hover:text-learn-easy-green">Profile</Link>
        </nav>
      </footer>
    </div>
  );
};

export default MainLayout;
