// src/pages/AddItem.js
import React, { useState } from 'react';
import { saveItem } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { speak } from '../utils/voice';


const AddItem = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem({ name, category, location });
    speak(`${name} added to storage.`);

    navigate('/');
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
