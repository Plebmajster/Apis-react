import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const isFormValid = username && password;

  return (
    <div className="App">
      <header className="App_header">
        <div className='hore'><p className='top_text'>Web reader mobile 1.4.2</p></div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className='forma'>
              <input
                className='input input_meno'
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder='Používateľské meno'
              />
              <input
                className='input input_heslo'
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder='Heslo'
              />
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
      </header>
    </div>
  );
}

export default Login;
