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
  