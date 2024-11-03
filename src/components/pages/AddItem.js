// src/pages/AddItem.js
import React, { useState } from 'react';
import { saveItem } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { speak } from '../utils/voice';

const AddItem = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState(''); // New state for item type
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem({ name, category, location, type }); // Save item with new type property
    speak(`${name} added to storage.`);
    navigate('/');
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label>Category:</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
        />

        <label>Location:</label>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        />

        {/* Dropdown for Type Selection */}
        <label>Type:</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          required
        >
          <option value="">Select Type</option>
          <option value="Image">Image</option>
          <option value="PDF">PDF</option>
          <option value="Video">Video</option>
        </select>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
