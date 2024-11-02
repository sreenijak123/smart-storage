// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getItems } from '../utils/storage';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { QRCodeCanvas } from 'qrcode.react';
import { speak } from '../utils/voice';

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setItems(getItems());
  }, []);

  // Voice search handling
  const handleVoiceSearch = () => {
    setSearchTerm(transcript);
    resetTranscript();
  };

  // Accessibility features
  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const toggleLargeText = () => {
    document.body.classList.toggle('large-text');
  };

  // Filter items based on search term and category
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? item.category === categoryFilter : true)
  );

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div>
      <h2>Smart Storage Item Catalog</h2>

      {/* Voice command buttons */}
      <button onClick={SpeechRecognition.startListening}>
        Start Voice Search
      </button>
      <button onClick={SpeechRecognition.stopListening}>
        Stop Voice Search
      </button>
      <button onClick={handleVoiceSearch}>Search with Voice</button>

      {/* Accessibility buttons */}
      <button onClick={toggleHighContrast}>Toggle High Contrast</button>
      <button onClick={toggleLargeText}>Toggle Large Text</button>

      {/* Search and filter options */}
      <input 
        type="text" 
        placeholder="Search by name..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <select onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        {[...new Set(items.map(item => item.category))].map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      {/* Filtered Items List */}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> - {item.category} (Located in: {item.location})
            {/* QR Code for each item */}
            <QRCodeCanvas value={JSON.stringify(item)} size={64} />
            <button onClick={() => speak(`Item: ${item.name}, located in ${item.location}`)}>
              Voice Feedback
            </button>
          </li>
        ))}
      </ul>

      {/* Voice command listening status */}
      {listening && <p>Listening for commands...</p>}
    </div>
  );
};

export default Home;
