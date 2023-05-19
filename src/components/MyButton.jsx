import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/add-book');
  };

  return (
    <button className='btn btn-primary'  style={{ backgroundColor: '#f2f2f2',color: 'black'}} onClick={handleClick}>Go to Add Book</button>
  );
};

export default MyButton;