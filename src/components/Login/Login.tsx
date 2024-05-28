import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './Login.scss';
import QRREACT from 'react-qr-scanner';
import { API_CONNECT } from '../../constants/constants.ts';

const Login = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [serverUrl, setServerUrl] = useState<string>(localStorage.getItem('serverUrl') || '');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [autoLogin, setAutoLogin] = useState<boolean>(localStorage.getItem('autoLogin') === 'true');
  const [wrongLogin, setWrongLogin] = useState<boolean>(false);

  const [formData, setFormData] = useState<{ _username: string; _password: string }>({
    _username: localStorage.getItem('username') || '',
    _password: '',
  });

  useEffect(() => {
  if (autoLogin) {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);
    setFormData(prevFormData => ({
      ...prevFormData,
      _username: storedUsername,
    }));
  }
}, [autoLogin]);


  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setFormData({
      ...formData,
      _username: event.target.value,
    });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setFormData({
      ...formData,
      _password: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_CONNECT}/system/api/v1/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) {
        setWrongLogin(true);
        console.log('Authentication failed:', response.statusText);
      } else {
        setWrongLogin(false);
        console.log('Authentication successful');
        window.location.href = serverUrl;
      }
      // Save the username in localStorage after successful authentication
      if (autoLogin) {
        localStorage.setItem('username', username);
      }
    } catch (error) {
      setWrongLogin(true);
      console.log('Error during authentication:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleError = (error: any) => {
    console.log(error);
  };

  const handleScan = (data: any) => {
    if (data) {
      console.log('Scanned data:', data);
      setServerUrl(data.text);
      setIsScanning(false);
    }
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSaveUrl = () => {
    localStorage.setItem('serverUrl', serverUrl);
    setIsSettingsOpen(false);
  };

  const handleAutoLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAutoLogin(isChecked);
    localStorage.setItem('autoLogin', isChecked.toString());
    if (isChecked) {
      localStorage.setItem('username', username);
      setFormData({
        _username: username,
        _password: password,
      });
    } else {
      localStorage.removeItem('username');
      setUsername('');
      setFormData({
        _username: '',
        _password: '',
      });
    }
  };
  

  const isFormValid = formData._username && formData._password;

  return (
    <div className="App">
      <header className="App_header">
        <div className="hore">
          <p className="top_text">Web reader mobile 1.4.2</p>
        </div>
        <div>
          <p className="url">{serverUrl}</p>
        </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="forma">
              <div className="input_container">
                <img src="obr/user.png" alt="User Icon" className="input_icon" />
                <input
                  name='input'
                  className="input"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Používateľské meno"
                />
              </div>
              <div className="input_container">
                <img src="obr/padlock.png" alt="Password Icon" className="input_icon" />
                <input
                  name='input'
                  className="input input_heslo"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Heslo"
                />
                <img
                  src={showPassword ? 'obr/eye.png' : 'obr/hidden.png'}
                  alt="Toggle Password Visibility"
                  className="toggle_password"
                  onClick={toggleShowPassword}
                />
              </div>
              <label className="automaticky">
                Prihlásiť Automaticky
                <input
                  name='input'
                  type="checkbox"
                  checked={autoLogin}
                  onChange={handleAutoLoginChange}
                />
              </label>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`submit_button ${!isFormValid ? 'disabled' : ''}`}
              >
                Prihlásiť
              </button>
              {wrongLogin && (
                <div className="error_message">
                  Nesprávne meno alebo heslo.
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="setting" onClick={handleSettingsClick}>
          <img className="cog" src="obr/gear.png" alt="Settings" />
        </div>

        {isSettingsOpen && (
          <div className="settings_modal">
            <div className="settings_content">
              <h2>Nastavenia</h2>
              <input
                className="cog_settings"
                type="text"
                placeholder="Zadaj URL"
                value={serverUrl}
                onChange={(event) => setServerUrl(event.target.value)}
              />
              <div className="settings_buttons">
                <button onClick={handleSaveUrl}>Uložiť</button>
                <button onClick={() => setIsSettingsOpen(false)}>Zavrieť</button>
                {navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' ? (
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
};

export default Login;
