import React, {Component} from 'react';
import axios from 'axios';
import { getAuthors, addNewBook } from '../../queries';

import './style.css';

class AddBook extends Component {
  state = {
    authors: [],
    bookName: '',
    genre: '',
    authorId: undefined,
  }
 
  async componentDidMount() {
    const response = await axios.post('http://localhost:4000/graphql', {
     query: getAuthors()
    });
    const { data:{data: {authors}} } = response;
    this.setState({authors, authorId: authors[0]._id})
  }
  
  handleChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleAddButton = async () => {
    const { bookName, genre, authorId } = this.state;

    const response = await axios.post('http://localhost:4000/graphql', {
      query: addNewBook(bookName, genre, authorId),
    });
    const {data:{data:{addBook}}} = response;
    if(addBook){
      this.props.updateBookAdded(true, addBook);
    } else {
      this.props.updateBookAdded(false);
    }
    this.setState({bookName: '', genre: ''});
  }

  handleDropDown = e => {
    this.setState({authorId: e.target.value});
  }

  render(){
    const { authors, bookName, genre } = this.state;
    const renderAuthors = authors.length ? authors.map((item, idx)=><option key={idx} value={item._id}>{item.name}</option>) : [];
    return (
     <div className='add-book-container'>
       <div className='add-book-left'>
         <span><i className='fas fa-plus-circle add-button' onClick={this.handleAddButton}></i></span>
       </div>
       <div className='add-book-right'>
         <div className='field'>
           <div className='field-left'>
           <label>Book name:</label>             
           </div>
           <div className='field-right'>
           <input type='text' name='bookName' value={bookName} onChange={this.handleChange} />             
           </div>
         </div>
         <div className='field'>
           <div className='field-left'>
             <label>Genre:</label>             
           </div>
           <div className='field-right'>
             <input type='text' name='genre' value={genre} onChange={this.handleChange} />             
           </div>
         </div>
         <div className='field'>
           <div className='field-left'>
             <label>Author:</label>             
           </div>
           <div className='field-right'>
              <select className='select-option' onChange={this.handleDropDown}>
                {renderAuthors}
              </select>
           </div>
         </div>
       </div>         
     </div> 
    );
  }
}

export default AddBook;