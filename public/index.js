const myLibrary = [
    {
        title: "Bob's Life", 
        author: 'Bob Stanley', 
        page: 255,
        status: 'read',
    }
];

function Book(title, author, page, status) {
  // the constructor...
  this.title = title,
  this.author = author,
  this.page = page,
  this.status = status
}

function addBookToLibrary(title='test', author='test', page=300, status='test') {
  // do stuff here
  let newBook = new Book(title, author, page, status);

  // add book to library
  console.log(myLibrary); // log before library was updated

  if (!isDuplicateBook(newBook)) {
    myLibrary.push(newBook);
    console.log('Book added successfully!');
    } else {
    console.log('This book already exists in the library.');
    }
}


// Function to check if Book already exist in the library
function isDuplicateBook(newBook) {
    return myLibrary.find(book => (
        book.title === newBook.title && book.author === newBook.author
    ));
}