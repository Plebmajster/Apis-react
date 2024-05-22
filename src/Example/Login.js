import React, { useState } from 'react';
import './Login.css';
import QRREACT from 'react-qr-scanner';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Logged in as ${username}`);
    if (password) {
      onLogin(); // Call the onLogin function passed from App.js
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleScan = (data) => {
    if (data) {
      console.log('Scanned data:', data);
      setIsScanning(false); // Stop scanning after successful scan
    }
  };

  const isFormValid = username && password;

  const handleSettingsClick = () => {
    // Open settings modal
    setIsSettingsOpen(true);
  };

  return (
    <div className="App">
      <header className="App_header">
        <div className='hore'><p className='top_text'>Web reader mobile 1.4.2</p></div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className='forma'>
              <div className="input-container">
                <img src='obr/user.png' alt='User Icon' className='input-icon' />
                <input
                  className='input'
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder='Používateľské meno'
                />
              </div>
              <div className="input-container">
                <img src='obr/padlock.png' alt='Password Icon' className='input-icon' />
                <input
                  className='input input_heslo'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Heslo'
                />
                <img
                  src={showPassword ? 'obr/eye.png' : 'obr/hidden.png'}
                  alt="Toggle Password Visibility"
                  className="toggle-password"
                  onClick={toggleShowPassword}
                />
              </div>
              <label className='automaticky'>
                Prihlasit Automaticky
                <input type='checkbox'></input>
              </label>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`submit-button ${!isFormValid ? 'disabled' : ''}`}>
                Prihlásiť
              </button>
            </div>
          </form>
        </div>
        <div className='setting' onClick={handleSettingsClick}>
          <img className='cog' src="obr/cog.png" alt="Settings" />
        </div>

        {isSettingsOpen && (
          <div className="settings-modal">
            <div className="settings-content">
              <h2>Settings</h2>
              <input
                className='cogserver'
                type="text"
                placeholder='Enter server URL'
                value={serverUrl}
                onChange={(event) => setServerUrl(event.target.value)}
              />
              <div className="settings-buttons">
                <button onClick={() => { /* Save the URL logic here */ }}>Save</button>
                <button onClick={() => setIsSettingsOpen(false)}>Close</button>
                {navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? (
                  <button onClick={() => setIsScanning(!isScanning)}>Scan QR Code</button>
                ) : (
                  <p>QR Code scanning is not supported in this environment.</p>
                )}
              </div>
              {isScanning && (
                <QRREACT
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Login;
