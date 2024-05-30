import React, { useEffect, useState } from 'react';
import './dashboard.scss';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = '/';
    }

    const updateDateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();

      setCurrentTime(time);
      setCurrentDate(date);
    };

    updateDateTime(); // Initial call to set the time and date immediately
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    window.location.href = '/';
  };

  return (
    <div className='section_dash'>
      <div className='dashboard_container'>
        <button className='logout_button' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='section_vnutro'>
        <div className='time_date'>
          <p className='time'>{currentTime}</p>
          <p className='date'>{currentDate} | <img className='pin' src='/obr/pin.png' alt='pin'></img></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
