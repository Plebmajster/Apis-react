import React, { useEffect, useState } from 'react';
import './dashboard.scss';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='dashboard'>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <img className='user_img' src='/obr/user.png' alt='user' onClick={toggleSidebar} />
      </div>
      <div className={`overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={toggleSidebar}></div>
      <div className='dashboard_container'>
        <button className='sidebar_toggle' onClick={toggleSidebar}>
          <img className='user_img' src='/obr/user.png' alt='user'/>
        </button>
        <button className='logout_button' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='section_vnutro'>
        <div className='time_date_section'>
          <p className='time'>{currentTime}</p>
          <p className='date'>
            {currentDate} | <img className='pin_img' src='/obr/pin.png' alt='pin' />
          </p>
        </div>
        <div className='praca_odchod_section'>
          <img className='history_img' src='/obr/history.png' alt='history' />
          <p className='praca_odchod_text'>Praca / Odchod</p>
          <div className='cas_datum_prichodu'>
            <p className='cas_prichodu'>16:33:10 /</p>
            <p className='datum_prichodu'>27.05.2024</p>
          </div>
          <button className='button_poznamka'>Pridať Poznámku</button>
        </div>
        <div className='poznamka_section'>
          <div className='poznamka_dokopy'>
            <img className='poznamka_img' src='/obr/message.png' alt='poznamka_img' />
            <p className='poznamka_text'>Poznámka</p>
          </div>
          <textarea className='input_poznamka'></textarea>
        </div>
        <div className='praca_section'>
          <p className='praca_text'>Práca</p>
          <div className='praca_buttons'>
            <button className='prichod_button'>
              <p className='inside_button_text'>Príchod</p>
            </button>
            <button className='odchod_button'>
              <p className='inside_button_text'>Odchod</p>
            </button>
          </div>
        </div>
        <div className='tabs_section'>
          <div className='tabs'>
            <img className='tabs_sluzobne_img' src='/obr/briefcase.png' alt='sluzobne' />
            <div className='tabs_medzera'>
              <p className='tabs_text'>Služobne</p>
              <button className='tabs_zaciatok_button'>Začiatok</button>
              <button className='tabs_koniec_button'>Koniec</button>
            </div>
          </div>
          <div className='tabs'>
            <img className='tabs_sluzobne_img' src='/obr/door.png' alt='sukromne' />
            <div className='tabs_medzera'>
              <p className='tabs_text'>Súkromne</p>
              <button className='tabs_zaciatok_button'>Začiatok</button>
              <button className='tabs_koniec_button'>Koniec</button>
            </div>
          </div>
          <div className='tabs'>
            <img className='tabs_sluzobne_img' src='/obr/hospital-bed.png' alt='lekar' />
            <div className='tabs_medzera'>
              <p className='tabs_text'>Lekár</p>
              <button className='tabs_zaciatok_button'>Začiatok</button>
              <button className='tabs_koniec_button'>Koniec</button>
            </div>
          </div>
          <div className='tabs'>
            <img className='tabs_sluzobne_img' src='/obr/door.png' alt='paragraf' />
            <div className='tabs_medzera'>
              <p className='tabs_text'>Paragraf</p>
              <button className='tabs_zaciatok_button'>Začiatok</button>
              <button className='tabs_koniec_button'>Koniec</button>
            </div>
          </div>
          <div className='tabs'>
            <img className='tabs_sluzobne_img' src='/obr/medical.png' alt='posta' />
            <div className='tabs_medzera'>
              <p className='tabs_text'>Pošta</p>
              <button className='tabs_zaciatok_button'>Začiatok</button>
              <button className='tabs_koniec_button'>Koniec</button>
            </div>
          </div>
          <div className='tabs'>
            <img className='tabs_sluzobne_img' src='/obr/briefcase.png' alt='sluzobna_cesta' />
            <div className='tabs_medzera'>
              <p className='tabs_text'>Služobná cesta</p>
              <button className='tabs_zaciatok_button'>Začiatok</button>
              <button className='tabs_koniec_button'>Koniec</button>
            </div>
          </div>
          <div className='tabs'>
            <img className='tabs_sluzobne_img' src='/obr/door.png' alt='sprevadzanie' />
            <div className='tabs_medzera'>
              <p className='tabs_text'>Sprevádzania člena rodiny</p>
              <button className='tabs_zaciatok_button'>Začiatok</button>
              <button className='tabs_koniec_button'>Koniec</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
