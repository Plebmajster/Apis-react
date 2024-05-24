import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/dashboard.js'; // Correct path

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
