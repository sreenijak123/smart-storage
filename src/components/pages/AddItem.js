// src/pages/AddItem.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const AddItem = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState(null);

  const handleFileChange = (event) => {
    setLocation(event.target.files[0]);
  };

  const handleAddItem = () => {
    alert(`Item added: ${name}, ${category}, ${type}`);
  };

  const handleUpload = () => {
    if (location) {
      alert(`File "${location.name}" uploaded successfully!`);
      // Add file upload logic here if necessary, such as sending the file to a server
    } else {
      alert("Please choose a file to upload.");
    }
  };

  return (
    <div className="add-item-container">
      <header className="header">
        <div className="logo">LOGO</div>
        <h1>SMART STORAGE SYSTEM</h1>
      </header>

      <div className="add-item-form">
        <h2>ADD ITEMS</h2>

        <label>NAME:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <label>CATEGORY:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
        </select>

        <label>TYPE:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Image">IMG</option>
          <option value="Video">VIDEO</option>
          <option value="Document">DOC</option>
        </select>

        <label>LOCATION:</label>
        <input type="file" onChange={handleFileChange} />

        <button className="upload-button" onClick={handleUpload}>UPLOAD</button>
        
        <button className="add-item-button" onClick={handleAddItem}>ADD ITEM</button>
      </div>
    </div>
  );
};

export default AddItem;
