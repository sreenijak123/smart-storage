import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import AddItem from './components/pages/AddItem';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import FAQ from './components/pages/FAQ';
import Help from './components/pages/Help';
import Profile from './components/pages/Profile';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import Terms from './components/pages/Terms';
import Favorites from './components/pages/Favorites';
import Summary from './components/pages/Summary'; // Import Summary component
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  return (
    <Router>
      <div className="App">
        <nav>
          <a href="/">Home</a>
          <a href="/add-item">Add Item</a>
          <a href="/profile">Profile</a>
          <a href="/help">Help</a>
          <a href="/about-us">About Us</a>
          <a href="/faq">FAQ</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/favorites">Favorites</a>
          <a href="/summary">Summary</a> 
          <a href="/terms">Terms & Conditions</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/summary" element={<Summary />} /> {/* Route for Summary */}
          <Route path="/terms" element={<Terms />} />
          {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
