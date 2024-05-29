import React, { useEffect } from 'react';
import './dashboard.scss';

const Dashboard = () => {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    window.location.href = '/';
  };

  return (
    <div className='dashboard-container'>
      <h1>Insane Dashboard</h1>
      <button className='logout-button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
