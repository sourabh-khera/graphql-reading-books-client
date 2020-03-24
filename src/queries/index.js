
export const getListOfBooks = () => {
  return `
    {
      books {
        _id,
        name
      }
    }
  `
};

export const getSpecificBookDetail = (id) => {
  return `
   {
     book(bookId: "${id}"){
       name,
       genre,
       author {
         name,
         books {
           name
         }
       }
     }
   }
  `
};

export const getAuthors = () => {
  return `
    {
      authors {
        _id,
        name
      }
    }
  `
};

export const addNewBook = (bookName, genre, authorId) => {
  return `
    mutation {
      addBook(bookInput: {name: "${bookName}", genre: "${genre}", authorId: "${authorId}"}){
         _id,
         name 
      }
    }
  `
};