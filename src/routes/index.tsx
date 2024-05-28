import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login/Login.tsx';
import Dashboard from '../components/Dashboard/dashboard.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);
