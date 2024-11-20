// src/pages/Settings.js
import React from 'react';

const Settings = () => {
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={() => setTheme('light')}>Light Theme</button>
      <button onClick={() => setTheme('dark')}>Dark Theme</button>
    </div>
  );
};

export default Settings;
