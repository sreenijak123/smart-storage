import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve registered user data from localStorage
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    // Validate credentials
    if (registeredUser && registeredUser.username === username && registeredUser.password === password) {
      localStorage.setItem('authToken', 'your_token_here'); // Store authentication token
      alert('Login successful!');
      window.location.href = '/'; // Redirect to the home page
    } else {
      alert('Invalid credentials'); // Show error if validation fails
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
