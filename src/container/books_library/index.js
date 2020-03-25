import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BookList from '../../component/book_list';
import Heading from '../../component/heading';
import BookInfo from '../../component/book_info';
import AddBook from '../add_book';
import { getListOfBooks, getSpecificBookDetail } from '../../queries';


import './style.css';

const  BooksLibrary = () => {
  const [bookAdded, setBookAdded] = useState(false);
  const [booksList, setBooksList] = useState([]);
  const [bookDetail, setBookDetail] = useState({})
  
  const fetchBooksList = async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: getListOfBooks()
    });
    const { data: { data: { books } } } = response;
    setBooksList(books);
  }

  useEffect(() => {
    fetchBooksList();
  }, []);

  const handleBookClick = async id => {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: getSpecificBookDetail(id)
    });
    const { data: { data: { book } } } = response;
    setBookDetail(book);
  }

  const updateBookAdded = useCallback((added, bookAdded) => {
    if (added) {
      const tempList = [...booksList];
      tempList.push(bookAdded);
      setBooksList(tempList);
    }
  }, [booksList]);
  return (
    <div className='division-container'>
      <div className='left-division'>
        <Heading />
        <BookList handleClick={handleBookClick} bookAdded={bookAdded} booksList={booksList} />
        <AddBook updateBookAdded={updateBookAdded} />
      </div>
      <div className='right-division'>
        <BookInfo bookDetail={bookDetail} />
      </div>
    </div>
  );
}

export default BooksLibrary; 