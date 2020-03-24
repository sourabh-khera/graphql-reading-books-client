import React, { Component } from 'react';
import axios from 'axios';
import BookList from '../../component/book_list';
import Heading from '../../component/heading';
import BookInfo from '../../component/book_info';
import AddBook from '../add_book';
import { getListOfBooks, getSpecificBookDetail } from '../../queries';


import './style.css';

class BooksLibrary extends Component {

  state = { id: undefined, bookAdded: false, booksList: [], bookDetail: {} }

  async componentDidMount() {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: getListOfBooks()
    });
    const { data: { data: { books } } } = response;
    this.setState({ booksList: books })
  }

  handleBookClick = async id => {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: getSpecificBookDetail(id)
    });
    const { data: { data: { book } } } = response;
    this.setState({ bookDetail: book })
  }

  updateBookAdded = (added, bookAdded) => {
    const {booksList} = this.state
    if (added) {
      const tempList = [...booksList];
      tempList.push(bookAdded);
      this.setState({booksList: tempList});
    }
  }

  render() {
    const { id, bookAdded, booksList, bookDetail } = this.state;
    return (
      <div className='division-container'>
        <div className='left-division'>
          <Heading />
          <BookList handleClick={this.handleBookClick} bookAdded={bookAdded} booksList={booksList} />
          <AddBook updateBookAdded={this.updateBookAdded} />
        </div>
        <div className='right-division'>
          <BookInfo bookDetail={bookDetail} />
        </div>
      </div>
    );
  }
}

export default BooksLibrary; 