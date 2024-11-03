// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import AddItem from './components/pages/AddItem';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile'; // Import the Profile component
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/add-item" element={isAuthenticated ? <AddItem /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} /> {/* New Profile route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
