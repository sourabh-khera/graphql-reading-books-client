import React from 'react';

import './style.css';

const renderBooksList = ({ handleClick, booksList }) => {
  return <div>{booksList && booksList.length && booksList.map((item, idx) => <button key={idx} onClick={() => handleClick(item._id)}className='list-button'>{item.name}</button>)}</div>;
};

export default renderBooksList;