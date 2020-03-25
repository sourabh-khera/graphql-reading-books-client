import React from 'react';
import './style.css';

const renderBookInfo = ({bookDetail}) => {
  if(Object.keys(bookDetail).length){
  return (
    <div className='info-container'>
     <h4 className='book-heading'>{bookDetail.name}</h4>
     <div className='book-details'>{bookDetail.genre}</div>
     <div className='book-details'>{bookDetail.author && bookDetail.author.name}</div>
     <div className='book-details'>All books by this author</div>
     <ul className='book-details'>
       {
        bookDetail.author && bookDetail.author.books.map((item, idx) => <li key={idx}>{item.name}</li>)
       }
     </ul>
    </div>
  )
 } else {
   return <div className='alternate-message'>No books selected...</div>;
 }
};

export default React.memo(renderBookInfo);