import React, { useState } from 'react';
import "./fitsize.css";
const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div>
      <span className={rating >= 1 ? 'star filled' : 'star'} onClick={() => handleClick(1)}></span>
      <span className={rating >= 2 ? 'star filled' : 'star'} onClick={() => handleClick(2)}></span>
      <span className={rating >= 3 ? 'star filled' : 'star'} onClick={() => handleClick(3)}></span>
      <span className={rating >= 4 ? 'star filled' : 'star'} onClick={() => handleClick(4)}></span>
      <span className={rating >= 5 ? 'star filled' : 'star'} onClick={() => handleClick(5)}></span>
    </div>
  );
};

export default Rating;
