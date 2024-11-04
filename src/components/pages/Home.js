// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItems } from '../utils/storage';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { QRCodeCanvas } from 'qrcode.react';
import { speak } from '../utils/voice';
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setItems(getItems());
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

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const toggleLargeText = () => {
    document.body.classList.toggle('large-text');
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? item.category === categoryFilter : true)
  );

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">LOGO</div>
        <h1>SMART STORAGE SYSTEM</h1>
        <Link to="/profile" className="profile">PROFILE</Link> {/* Profile link added */}
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <ul>
            <li onClick={() => setCategoryFilter('')}>ALL CATEGORIES</li>
            <li><Link to="/add-item" className="profile">ADD ITEM</Link> {/* Profile link added */}
            </li>
            <li>
              <input 
                type="text" 
                placeholder="SEARCH ITEM BY NAME" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </li>
            <li onClick={SpeechRecognition.startListening}>START VOICE SEARCH</li>
            <li onClick={SpeechRecognition.stopListening}>STOP VOICE SEARCH</li>
            <li onClick={handleVoiceSearch}>SEARCH WITH VOICE</li>
            <li onClick={toggleHighContrast}>CONTRAST</li>
            <li onClick={toggleLargeText}>TEXT SIZE</li>
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

            <h3>LAPTOP</h3>
            <div className="item-icons">
              {filteredItems.filter(item => item.category === 'Laptop').map((item, index) => (
                <div key={index} className="item-icon">
                  {item.type === 'Image' && <span>IMG</span>}
                  {item.type === 'PDF' && <span>DOC</span>}
                  {item.type === 'Video' && <span>VID</span>}
                  <QRCodeCanvas value={JSON.stringify(item)} size={64} />
                  <button onClick={() => speak(`Item: ${item.name}, located in ${item.location}`)}>
                    Voice Feedback
                  </button>
                </div>
              ))}
            </div>
            
            <h3>MOBILE</h3>
            <div className="item-icons">
              {filteredItems.filter(item => item.category === 'Mobile').map((item, index) => (
                <div key={index} className="item-icon">
                  {item.type === 'Image' && <span>IMG</span>}
                  {item.type === 'PDF' && <span>DOC</span>}
                  {item.type === 'Video' && <span>VID</span>}
                  <QRCodeCanvas value={JSON.stringify(item)} size={64} />
                  <button onClick={() => speak(`Item: ${item.name}, located in ${item.location}`)}>
                    Voice Feedback
                  </button>
                </div>
              ))}
            </div>
          </div>

          <ul>
            {filteredItems.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - {item.category} (Located in: {item.location})
                <QRCodeCanvas value={JSON.stringify(item)} size={64} />
                <button onClick={() => speak(`Item: ${item.name}, located in ${item.location}`)}>
                  Voice Feedback
                </button>
              </li>
            ))}
          </ul>
          
          {listening && <p>Listening for commands...</p>}
        </main>
      </div>
    </div>
  );
};

export default Home;
