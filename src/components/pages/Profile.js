// src/components/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import CSS file for styling

const Profile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stored user data on component mount
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername) setUsername(storedUsername);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <header className="header">
        <div className="logo">LOGO</div>
        <h1>SMART STORAGE SYSTEM</h1>
        <div className="profile-link">PROFILE</div>
      </header>

      <div className="profile-content">
        <h2>PROFILE</h2>
        <div className="profile-pic-placeholder"></div> {/* Profile picture placeholder */}
        <form onSubmit={handleSave} className="profile-form">
          <label>USER ID:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>PASSWORD EDIT:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Save Changes</button>
        </form>
        <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Profile;
