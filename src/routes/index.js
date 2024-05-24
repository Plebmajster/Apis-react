import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/dashboard'; // Correct path

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Dashboard/dashboard',
    element: <Dashboard />,
  },
]);
