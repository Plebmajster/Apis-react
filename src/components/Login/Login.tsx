import React, { useState, useEffect } from 'react';
import './Login.scss';
import { authentification } from '../../api/apiCalls.ts';
import SettingsButton from '../../common/SettingsButton.tsx';

const Login = () => {
  const [formData, setFormData] = useState({
    _username: '',
    _password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    wrongLogin: '',
    autoLogin: false
  });

  const [serverUrl, setServerUrl] = useState(localStorage.getItem('serverUrl') || '');

  useEffect(() => {
    const storedUsername = localStorage.getItem('autoLoginUsername');
    const storedAutoLogin = localStorage.getItem('autoLogin') === 'true';

    if (storedUsername) {
      setFormData({
        _username: storedUsername,
        _password: ''
      });
    }
    if (storedAutoLogin)
      setLoginData((prevData) => ({
        ...prevData,
        autoLogin: storedAutoLogin
      }));
  }, []);

  const isFormValid = formData._password && formData._username;

  const handleInputChange = (event) => {
    const { value } = event.target;
    const a = '_';
    setFormData({
      ...formData,
      [a + event.target.id]: value
    });
    setLoginData((prevData) => ({
      ...prevData,
      wrongLogin: ''
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authentification(formData, serverUrl);

      if (!response.ok) {
        console.debug('Failed to authenticate:', response.statusText);
        throw new Error('Failed to authenticate');
      }

      console.debug('Authentication successful:');
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/Dashboard';

      if (loginData.autoLogin) {
        localStorage.setItem('autoLoginUsername', formData._username);
        localStorage.setItem('autoLogin', 'true');
      } else {
        localStorage.removeItem('autoLoginUsername');
        localStorage.setItem('autoLogin', 'false');
      }
    } catch (error) {
      setLoginData((prevData) => ({
        ...prevData,
        wrongLogin: 'Zlé prihlasovacie meno alebo heslo!'
      }));
      console.error('Error during authentication:', error);
    }
  };

  localStorage.setItem('isAuthenticated', 'false');

  return (
    <>
     
      <div className='top-text'>
        <h1>webReader mobile 1.4.2</h1>
      </div>
      <div className='login-container'>
        {serverUrl && <p className='shownServerURL'>{serverUrl}</p>}
        <form onSubmit={handleSubmit}>
          <div className='form-group-username'>
            <img className='username-icon' src={'/obr/user.png'} alt='Username' />
            <input
              autoComplete='name'
              name='username'
              type='text'
              placeholder='Prihlasovacie meno'
              id='username'
              value={formData._username}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group-password'>
            <img className='password-icon' src={'/obr/padlock.png'} alt='Password' />
            <input
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Heslo'
              id='password'
              value={formData._password}
              onChange={handleInputChange}
            />
            <button
              type='button'
              className='show-password-btn'
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? '/obr/hidden.png' : '/obr/eye.png'}
                alt={showPassword ? 'Hide password' : 'Show password'}
              />
            </button>
          </div>
          <div className='autoSign'>
            <h4>Prihlásiť automaticky</h4>
            <input
              type='checkbox'
              name='checkbox'
              checked={loginData.autoLogin}
              onChange={() =>
                setLoginData((prevData) => ({
                  ...prevData,
                  autoLogin: !prevData.autoLogin
                }))
              }
            />
          </div>
          <button type='submit' className='confirmButton' disabled={!isFormValid}>
            PRIHLÁSIŤ
          </button>
          <div className='loginError'>
            {loginData.wrongLogin && <p className='wrongLoginError'>{loginData.wrongLogin}</p>}
          </div>
        </form>
      </div>
      <SettingsButton serverUrl={serverUrl} setServerUrl={setServerUrl} />
    </>
  );
};

export default Login;
