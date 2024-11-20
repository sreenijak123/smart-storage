// src/utils/voice.js
export const speak = (text) => {
  console.log("Speaking:", text);  // Debugging line
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Speech synthesis is not supported in this browser.');
  }
};
