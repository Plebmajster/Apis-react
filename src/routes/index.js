import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Dashboard/Login/Login.js';
import Dashboard from '../components/Dashboard/dashboard.js'; // Correct path

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
