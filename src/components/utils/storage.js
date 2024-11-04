// src/utils/storage.js

// src/utils/storage.js
export const getItems = () => {
  const items = localStorage.getItem('items');
  return items ? JSON.parse(items) : [];
};

export const saveItem = (item) => {
  const items = getItems();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
};

// Utility function to retrieve a specific item by name (optional, for convenience)
export const getItemByName = (name) => {
  const items = getItems();
  return items.find(item => item.name === name);
};


// User-related functions
export const getUserProfile = () => {
  const userProfile = localStorage.getItem('userProfile');
  return userProfile ? JSON.parse(userProfile) : null;
};

export const saveUserProfile = (profile) => {
  localStorage.setItem('userProfile', JSON.stringify(profile));
};

export const registerUser = (username, password) => {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
};

export const authenticateUser = (username, password) => {
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');
  return username === storedUsername && password === storedPassword;
};
