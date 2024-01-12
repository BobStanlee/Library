const myLibrary = [
    {
        title: "Bob's Life", 
        author: 'Bob Stanley', 
        page: 255,
        status: 'read',
        reading: 'reading'
    }
];

// Run Functions
openCloseForm();

function Book(title, author, page, status, reading) {
  // the constructor...
  this.title = title,
  this.author = author,
  this.page = page,
  this.status = status,
  this.reading = reading
}

function addBookToLibrary(title='test', author='test', page=300, status='test', reading='reading') {
  // do stuff here
  let newBook = new Book(title, author, page, status, reading);

  // add book to library

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

// Function to handle Open and close functionality of the form modal
function openCloseForm () {
    const addBtn = document.getElementById('addbtn'),
          formContainer = document.getElementById('form-container');
          
    addBtn.addEventListener('click', () => {
        //close Form
        if (addBtn.classList.contains('rotate-45')) {
            addBtn.classList.remove('rotate-45');
            formContainer.classList.add('-right-full');
            formContainer.classList.remove('right-0');
        } 
        
        //opens Form
        else {
            addBtn.classList.add('rotate-45');
            formContainer.classList.add('right-0');
            formContainer.classList.remove('-right-full')
        }
    })
}

// Function to get form inputs
function getInputs () {
    const formInputs = document.getElementById('add-form');
    let title = '';
    let author = '';
    let page = 0;
    let status = '';
    let reading = '';
    
    // listen for submit action
    formInputs.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        title = document.getElementById('title').value; // title
        author = document.getElementById('author').value; // author
        page = document.getElementById('page').value; // page

        // Logic for handling true and false values of the status checkbox
        let isStatusChecked = document.getElementById('status').checked;
        
        if (isStatusChecked === true) {
            status = 'read';
        } else {
            status = 'not read';
        }// status

        // Logic for handling true and false values of the reading checkbox
        let isReadingChecked = document.getElementById('reading').checked;

        if (isReadingChecked === true) {
            reading = 'reading';
        } else {
            reading = 'not started';
        }
        
        addBookToLibrary(title, author, page, status, reading);
        console.log(myLibrary);
    })
}

//