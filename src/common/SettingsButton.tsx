import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import './SettingsButton.scss'

const SettingsButton = ({ serverUrl, setServerUrl }) => {
  const [settings, setSettings] = useState({
    isSettingsOpen: false,
    isScanning: false,
    cameraError: ''
  });

  const handleScan = (data) => {
    if (data) {
      setServerUrl(data.text);
      setSettings((prevSettings) => ({
        ...prevSettings,
        isScanning: false
      }));
    }
  };

  const handleSaveServerUrl = () => {
    localStorage.setItem('serverUrl', serverUrl);
    setSettings((prevSettings) => ({
      ...prevSettings,
      isSettingsOpen: false
    }));
  };

  const handleError = (err) => {
    console.error(err);
    setSettings((prevSettings) => ({
      ...prevSettings,
      cameraError: 'Prosím povoľte prístup ku kamere.'
    }));
  };

  return (
    <>
      <div
        className='settingsBox'
        onClick={() =>
          setSettings((prevSettings) => ({
            ...prevSettings,
            isSettingsOpen: true
          }))
        }
      >
        <img src='/obr/gear.png' alt='Settings' />
      </div>

      {settings.isSettingsOpen && (
        <div className='settings-modal'>
          <div className='settings-content'>
            <h2>Nastavenia</h2>
            <input
              name='url'
              type='text'
              placeholder='Zadajte URL adresu'
              value={serverUrl}
              onChange={(event) => setServerUrl(event.target.value)}
            />
            <div className='settings-buttons'>
              <button onClick={handleSaveServerUrl}>Uložiť</button>
              <button
                onClick={() =>
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    isSettingsOpen: false
                  }))
                }
              >
                Zatvoriť
              </button>
              <button
                onClick={() =>
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    isScanning: !prevSettings.isScanning
                  }))
                }
              >
                QR
              </button>
            </div>
            {settings.isScanning && (
              <div className='qrReaderContainer'>
                {navigator.mediaDevices ? (
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%', borderRadius: '15px' }}
                    constraints={{ video: { facingMode: 'environment' } }}
                  />
                ) : (
                  <p className='error'>Zapnite prístup ku kamere.</p>
                )}
                {settings.cameraError && <p className='error'>{settings.cameraError}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsButton;
