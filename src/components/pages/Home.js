import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { QRCodeCanvas } from 'qrcode.react';
import { speak } from '../utils/voice';
import { getItems } from '../utils/storage';

import './Home.css';

const ItemCard = ({ item }) => (
  <div className="item-icon">
    {item.type === 'Image' && <span>IMG</span>}
    {item.type === 'PDF' && <span>DOC</span>}
    {item.type === 'Video' && <span>VID</span>}
    <QRCodeCanvas value={JSON.stringify(item)} size={64} />
    <button onClick={() => speak(`Item: ${item.name}, located in ${item.location}`)}>
      Voice Feedback
    </button>
  </div>
);

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const items = getItems();
    console.log("Items loaded from storage:", items);  // Debugging line
    setItems(items);
  }, []);

  const handleVoiceSearch = () => {
    if (transcript) {
      setSearchTerm(transcript);
      speak(`Searching for ${transcript}`);
      resetTranscript();
    } else {
      alert("No voice input detected. Please try again.");
    }
  };

  // Custom voice search function using Web Speech API (from the sample website code)
  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search not supported on this browser. Please use Chrome.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript.toLowerCase();
      setSearchTerm(voiceInput);  // Set voice input to search term
    };

    recognition.onerror = (event) => {
      alert("Error occurred in recognition: " + event.error);
    };
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? item.category === categoryFilter : true)
  );

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">LOGO</div>
        <h1>SMART STORAGE SYSTEM</h1>
        <Link to="/profile" className="profile">PROFILE</Link>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <ul>
            <li onClick={() => setCategoryFilter('')}>ALL CATEGORIES</li>
            <li><Link to="/add-item" className="profile">ADD ITEM</Link></li>
            <li>
              <input 
                type="text" 
                placeholder="SEARCH ITEM BY NAME" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </li>
            <li onClick={startVoiceSearch}>🎤 START VOICE SEARCH</li>
            {/* <li onClick={handleVoiceSearch}>SEARCH WITH VOICE</li> */}
            <li onClick={() => document.body.classList.toggle('high-contrast')}>CONTRAST</li>
            <li onClick={() => document.body.classList.toggle('large-text')}>TEXT SIZE</li>
          </ul>
        </aside>

        <main className="content">
          <h2>WELCOME USER</h2>

          <div className="category-section">
            <select onChange={(e) => setCategoryFilter(e.target.value)} defaultValue="">
              <option value="">All Categories</option>
              {[...new Set(items.map(item => item.category))].map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            <div className="item-icons">
              {filteredItems.filter(item => item.category === 'Laptop').map((item, index) => (
                <ItemCard key={index} item={item} />
              ))}
            </div>

            <div className="item-icons">
              {filteredItems.filter(item => item.category === 'Mobile').map((item, index) => (
                <ItemCard key={index} item={item} />
              ))}
            </div>
          </div>

          {listening && <p>Listening for commands...</p>}
        </main>
      </div>
    </div>
  );
};

export default Home;
