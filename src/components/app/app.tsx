import React from 'react';
import logo from '../../logo.svg';
import appStyles from './app.module.css';

function App() {
  return (
    <div className={appStyles.App}>
      <header className={appStyles.AppHeader}>
        <img src={logo} className={appStyles.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={appStyles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
