import React, { useState } from 'react';
import './Example/Login.css';
import Login from './Example/Login';

function Home() {
  return <div>Welcome to the Home Page!</div>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
