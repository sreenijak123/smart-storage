import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/pages/Home';
import AddItem from './components/pages/AddItem';
import Register from './components/pages/Register'; // Import Registration page
import Login from './components/pages/Login'; // Import Login page
import FAQ from './components/pages/FAQ';
import Help from './components/pages/Help';
import Profile from './components/pages/Profile';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import Terms from './components/pages/Terms';
import Favorites from './components/pages/Favorites';
import Summary from './components/pages/Summary';
import './App.css';

// Mock function to check authentication status
const isAuthenticated = () => {
    return localStorage.getItem('authToken'); // Example: Check for a stored token
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
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
                    <a href="/register">Register</a> {/* Add Register link */}
                    <a href="/login">Login</a> {/* Add Login link */}
                    <a href="/terms">Terms & Conditions</a>
                </nav>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-item"
                        element={
                            <ProtectedRoute>
                                <AddItem />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/help"
                        element={
                            <ProtectedRoute>
                                <Help />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/about-us"
                        element={
                            <ProtectedRoute>
                                <AboutUs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/faq"
                        element={
                            <ProtectedRoute>
                                <FAQ />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/contact-us"
                        element={
                            <ProtectedRoute>
                                <ContactUs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <ProtectedRoute>
                                <Favorites />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/summary"
                        element={
                            <ProtectedRoute>
                                <Summary />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/terms"
                        element={
                            <ProtectedRoute>
                                <Terms />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch-all Route */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
