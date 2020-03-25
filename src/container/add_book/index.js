import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { getAuthors, addNewBook } from '../../queries';

import './style.css';

const AddBook = ({updateBookAdded}) => {
  const [ authors, setAuthors ] = useState([]);
  const [ authorInfo, setAuthoInfo ] = useState({bookName: '', genre: ''});
  const [ genre, setGenre ] = useState('');
  const [ authorId, setAuthorId ] = useState(undefined);
 
  const fetchAuthors = async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
     query: getAuthors()
    });
    const { data:{data: {authors}} } = response;
    setAuthors(authors);
    setAuthorId(authors[0]._id);
  }

  useEffect(() => {
   fetchAuthors();
  }, []);

  const handleChange = e => {
    const {name, value} = e.target;
    setAuthoInfo({...authorInfo, [name]: value});
  }

  const handleAddButton = async () => {
    const response = await axios.post('http://localhost:4000/graphql', {
      query: addNewBook(authorInfo.bookName, authorInfo.genre, authorId),
    });
    const {data:{data:{addBook}}} = response;
    if(addBook){
      updateBookAdded(true, addBook);
    } else {
      updateBookAdded(false);
    }
    setAuthoInfo({bookName: '', genre: ''});
  }

  const handleDropDown = e => {
    setAuthorId(e.target.value);
  }

  const renderAuthors = authors.length ? authors.map((item, idx)=><option key={idx} value={item._id}>{item.name}</option>) : [];
  return (
    <div className='add-book-container'>
      <div className='add-book-left'>
        <span><i className='fas fa-plus-circle add-button' onClick={()=>handleAddButton()}></i></span>
      </div>
      <div className='add-book-right'>
        <div className='field'>
          <div className='field-left'>
          <label>Book name:</label>             
          </div>
          <div className='field-right'>
          <input type='text' name='bookName' value={authorInfo.bookName} onChange={(e)=>handleChange(e)} />             
          </div>
        </div>
        <div className='field'>
          <div className='field-left'>
            <label>Genre:</label>             
          </div>
          <div className='field-right'>
            <input type='text' name='genre' value={authorInfo.genre} onChange={(e)=>handleChange(e)} />             
          </div>
        </div>
        <div className='field'>
          <div className='field-left'>
            <label>Author:</label>             
          </div>
          <div className='field-right'>
            <select className='select-option' onChange={(e)=>handleDropDown(e)}>
              {renderAuthors}
            </select>
          </div>
        </div>
      </div>         
    </div> 
  );
}

export default React.memo(AddBook);