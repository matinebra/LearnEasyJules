// src/routes/index.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';

// Import page components
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import OnboardingPage from '../pages/OnboardingPage';
import LessonsListPage from '../pages/LessonsListPage';
import LessonDetailPage from '../pages/LessonDetailPage';
import CodingChallengePage from '../pages/CodingChallengePage';
import ProfilePage from '../pages/ProfilePage';
import ProgressDashboardPage from '../pages/ProgressDashboardPage';
import RewardsPage from '../pages/RewardsPage';
import SettingsPage from '../pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'lessons', element: <LessonsListPage /> },
      { path: 'lessons/:lessonId', element: <LessonDetailPage /> },
      { path: 'code', element: <CodingChallengePage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'progress', element: <ProgressDashboardPage /> },
      { path: 'rewards', element: <RewardsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/onboarding', element: <OnboardingPage /> },
  // Add other top-level routes if needed (e.g., for pages without the MainLayout)
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
