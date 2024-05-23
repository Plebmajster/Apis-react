import React, { useState, useEffect } from 'react';
import './Login.css';
import QRREACT from 'react-qr-scanner';
import { API_CONNECT } from '../constants/constants';

function Login({ onLogin }) {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState(localStorage.getItem('serverUrl') || '');
  const [isScanning, setIsScanning] = useState(false);
  const [autoLogin, setAutoLogin] = useState(localStorage.getItem('autoLogin') === 'true');

  const [formData, setFormData] = useState({
    _username: '',
    _password: '',
  })
  useEffect(() => {
    if (autoLogin) {
      setUsername(localStorage.getItem('username') || '');
      setPassword(localStorage.getItem('password') || '');
    }
  }, [autoLogin]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setFormData({
      ...formData,
      _username: event.target.value
    });
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormData({
      ...formData,
      _password: event.target.value
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch (`${API_CONNECT}/system/api/v1/auth`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
      });
  
      if(!response.ok){
        console.debug('Authentication failed:', response.statusText)
      }
  
      console.debug('Authentication successful')
      onLogin()
    } catch (error) {
        console.error('Error during authentication:', error)
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

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSaveUrl = () => {
    localStorage.setItem('serverUrl', serverUrl);
    setIsSettingsOpen(false);
  };

  const handleAutoLoginChange = (event) => {
    const isChecked = event.target.checked;
    setAutoLogin(isChecked);
    localStorage.setItem('autoLogin', isChecked);
    if (isChecked) {
      setFormData({
        ...formData,
        _username: username,
        _password: password
      });
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    } else {
      setFormData({
        ...formData,
        _username: '',
        _password: ''
      });
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  };
  console.log("Username:", formData._username);
console.log("Password:", formData._password);

  const isFormValid =  formData._username && formData._password;

  return (
    <div className="App">
      <header className="App_header">
        <div className='hore'><p className='top_text'>Web reader mobile 1.4.2</p></div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className='forma'>
              <div className="input_container">
                <img src='obr/user.png' alt='User Icon' className='input_icon' />
                <input
                  className='input'
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder='Používateľské meno'
                />
              </div>
              <div className="input_container">
                <img src='obr/padlock.png' alt='Password Icon' className='input_icon' />
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
                  className="toggle_password"
                  onClick={toggleShowPassword}
                />
              </div>
              <label className='automaticky'>
                Prihlásiť Automaticky
                <input
                  type='checkbox'
                  checked={autoLogin}
                  onChange={handleAutoLoginChange}
                />
              </label>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`submit_button ${!isFormValid ? 'disabled' : ''}`}>
                Prihlásiť
              </button>
            </div>
          </form>
        </div>
        <div className='setting' onClick={handleSettingsClick}>
          <img className='cog' src="obr/cog.png" alt="Settings" />
        </div>

        {isSettingsOpen && (
          <div className="settings_modal">
            <div className="settings_content">
              <h2>Nastavenia</h2>
              <input
                className='cog_server'
                type="text"
                placeholder='Zadaj URL'
                value={serverUrl}
                onChange={(event) => setServerUrl(event.target.value)}
              />
              <div className="settings_buttons">
                <button onClick={handleSaveUrl}>Uložiť</button>
                <button onClick={() => setIsSettingsOpen(false)}>Zavrieť</button>
                {navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? (
                  <button onClick={() => setIsScanning(!isScanning)}>QR kód</button>
                ) : (
                  <p>Skenovanie QR kódu nie je povolené!</p>
                )}
              </div>
              {isScanning && (
                <QRREACT
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%', borderRadius: '15px' }}
                  constraints={{ video: { facingMode: 'environment' } }}
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