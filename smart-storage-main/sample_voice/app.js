// Function to initialize dummy data in localStorage
function addDummyData() {
    const items = {
      Phones: ["iPhone 12", "Samsung Galaxy S21", "Google Pixel 5", "OnePlus 8"],
      Laptops: ["MacBook Pro", "Dell XPS 13", "HP Spectre x360", "Lenovo ThinkPad X1"]
    };
    localStorage.setItem("items", JSON.stringify(items));
  }
  
  // Call addDummyData once to ensure data is in localStorage
  if (!localStorage.getItem("items")) {
    addDummyData();
  }
  
  // Function to get items from localStorage
  function getItems() {
    return JSON.parse(localStorage.getItem("items")) || {};
  }
  
  // Function to display search results
  function displayResults(results) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = ""; // Clear previous results
  
    if (Object.keys(results).length === 0) {
      resultsList.innerHTML = "<li>No results found</li>";
    } else {
      for (const [category, items] of Object.entries(results)) {
        const categoryHeader = document.createElement("h3");
        categoryHeader.textContent = category;
        resultsList.appendChild(categoryHeader);
  
        items.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          resultsList.appendChild(li);
        });
      }
    }
  }
  
  // Function to perform text-based search
  function searchItems() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const items = getItems();
    const filteredResults = {};
  
    for (const [category, itemList] of Object.entries(items)) {
      const filteredItems = itemList.filter(item => item.toLowerCase().includes(searchInput));
      if (filteredItems.length > 0) {
        filteredResults[category] = filteredItems;
      }
    }
    displayResults(filteredResults);
  }
  
  // Function to perform voice-based search
  function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search not supported on this browser. Please use Chrome.");
      return;
    }
  
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.start();
  
    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript.toLowerCase();
      document.getElementById("searchInput").value = voiceInput; // Display the recognized text
      searchItems(); // Perform search with the recognized text
    };
  
    recognition.onerror = (event) => {
      alert("Error occurred in recognition: " + event.error);
    };
  }
  