import React, { useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Item A', category: 'Category 1' },
    { id: 2, name: 'Item B', category: 'Category 2' },
  ]);

  return (
    <div>
      <h2>Favorite Items</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((item) => (
            <li key={item.id}>
              {item.name} - {item.category}
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite items added yet.</p>
      )}
    </div>
  );
};

export default Favorites;

