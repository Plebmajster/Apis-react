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

        <div className='time_date_section'>
          <p className='time'>{currentTime}</p>
          <p className='date'>{currentDate} | <img className='pin_img' src='/obr/pin.png' alt='pin'></img></p>
        </div>

        <div className='praca_odchod_section'>
          <img className='history_img' src='/obr/history.png' alt='history'></img>
          <p className='praca_odchod_text'>Praca / Odchod</p>
            <div className='cas_datum_prichodu'>
              <p className='cas_prichodu'>16:33:10 /</p>
              <p className='datum_prichodu'>27.05.2024</p>
            </div>
            <button className='button_poznamka'>
              Pridať Poznámku
            </button>
        </div>

        <div className='poznamka_section'>
          <div className='poznamka_dokopy'>
          <img className='poznamka_img' src='/obr/message.png' alt='poznamka_img'></img>
          <p className='poznamka_text'>Poznámka</p>
          </div>
          <textarea className='input_poznamka'></textarea>
        </div>

        <div className='praca_section'>
          <p className='praca_text'>Práca</p>
          <div className='praca_buttons'>
            <button className='prichod_button'><p className='inside_button_text'>Príchod</p></button>
            <button className='odchod_button'><p className='inside_button_text'>Odchod</p></button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
