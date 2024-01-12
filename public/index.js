const myLibrary = [
  {
    title: "Bob's Life",
    author: "Bob Stanley",
    page: 255,
    status: "read",
    reading: "reading",
  },
];

// Run Functions
openCloseForm();

function Book(title, author, page, status, reading) {
  // the constructor...
  (this.title = title),
    (this.author = author),
    (this.page = page),
    (this.status = status),
    (this.reading = reading);
}

function addBookToLibrary(
  title = "test",
  author = "test",
  page = 300,
  status = "test",
  reading = "reading"
) {
  // do stuff here
  let newBook = new Book(title, author, page, status, reading);

  // add book to library

  if (!isDuplicateBook(newBook)) {
    myLibrary.push(newBook);
    console.log("Book added successfully!");
  } else {
    console.log("This book already exists in the library.");
  }
}

// Function to check if Book already exist in the library
function isDuplicateBook(newBook) {
  return myLibrary.find(
    (book) => book.title === newBook.title && book.author === newBook.author
  );
}

// Function to handle Open and close functionality of the form modal
function openCloseForm() {
  const addBtn = document.getElementById("addbtn"),
    formContainer = document.getElementById("form-container");

  addBtn.addEventListener("click", () => {
    //close Form
    if (addBtn.classList.contains("rotate-45")) {
      addBtn.classList.remove("rotate-45");
      formContainer.classList.add("-right-full");
      formContainer.classList.remove("right-0");
    }

    //opens Form
    else {
      addBtn.classList.add("rotate-45");
      formContainer.classList.add("right-0");
      formContainer.classList.remove("-right-full");
    }
  });
}

// Function to get form inputs
function getInputs() {
  const formInputs = document.getElementById("add-form");
  let title = "";
  let author = "";
  let page = 0;
  let status = "";
  let reading = "";

  // listen for submit action
  formInputs.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    title = document.getElementById("title").value; // title
    author = document.getElementById("author").value; // author
    page = document.getElementById("page").value; // page

    // Logic for handling true and false values of the status checkbox
    let isStatusChecked = document.getElementById("status").checked;

    if (isStatusChecked === true) {
      status = "read";
    } else {
      status = "not read";
    } // status

    // Logic for handling true and false values of the reading checkbox
    let isReadingChecked = document.getElementById("reading").checked;

    if (isReadingChecked === true) {
      reading = "reading";
    } else {
      reading = "not started";
    }

    console.log(reading);

    addBookToLibrary(title, author, page, status, reading);
    // updateLibraryshelve(myLibrary);
  });
}

// Function to handle and update library cards
function updateLibraryshelve(library) {

  const libraryContainer = document.getElementById("library-container");
  libraryContainer.innerHTML = ""; // Clear all elements from Library Container
    
  library.forEach((book, index) => {
    createLibraryCard(book, index, libraryContainer);
  });
}

// Function creates the library cards
function createLibraryCard(book, index, libraryContainer) {
  // library Card
  let libraryCard = document.createElement("div");
  libraryCard.classList.add(
    "flex",
    "flex-col",
    "rounded-md",
    "shadow-md",
    "hover:shadow-lg",
    "p-4",
    "relative",
    "min-w-80",
    "overflow-hidden",
    "transition-all"
  );

  libraryCard.id = index;
  console.log(libraryCard.id);

  // Inner Container of the Library Card
  let cardInnerContainer = document.createElement("div");
  cardInnerContainer.classList.add("flex", "gap-4", "mb-6");

  // book SVG markup 
  let bookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 fill-red-600" id="book-svg_${index}">
    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
  </svg>`;

  // Add book SVG markup to CardInnerContainer
  cardInnerContainer.innerHTML = bookSvg;

  // Container for title author and page
  let titleAuthorPageContainer = document.createElement('div');
  titleAuthorPageContainer.classList.add(
    'flex',
    'flex-col',
    'gap-4'
  )

  // Span element for the book title
  let titleSpan = document.createElement('span'); 
  titleSpan.classList.add(
    'font-medium',
    'text-xl',
    'capitalize'
  )

  // Add current book title
  titleSpan.textContent = book.title;

  // p element for book's author
  let authorP = document.createElement('p');
  authorP.classList.add(
    'font-light',
    'text-gray-600',
    'text-base',
    'ml-1'
  )

  // Add current book author
  authorP.textContent = book.author;

  // Div element for book page
  let divPage = document.createElement('div');
  
  // Add current book page
  divPage.textContent = `Pages: ${book.page}`;

  titleAuthorPageContainer.appendChild(titleSpan); // append title as child
  titleAuthorPageContainer.appendChild(authorP); // append title as child
  titleAuthorPageContainer.appendChild(divPage); // append title as child

  cardInnerContainer.appendChild(titleAuthorPageContainer); // append title author page Container as child



  // div element for Reading status
  let readingDiv = document.createElement('div');
  readingDiv.id = `reading-${index}`;
  readingDiv.classList.add(
    'text-white',
    'bg-red-600',
    'absolute',
    'top-0',
    'right-0',
    'p-2',
    'rounded-bl-md',
    'motion-safe:animate-pulse'
  )

  checkReading(book, readingDiv);
  console.log(readingDiv, readingDiv.textContent);
  
}


// function to check reading status of a book
function checkReading (book, div) {
    if (book.reading === 'reading') {
        if (div.classList.contains('bg-orange-600')) {
            div.classList.remove('bg-orange-600');
            div.classList.add('bg-red-600');
            div.content = book.reading;
            console.log(book.reading);
        } else {
            div.classList.add('bg-red-600');
            div.content = book.reading;
            console.log(book.reading);
        }
    } 
    
    else if (book.reading === 'not started') {
        if (div.classList.contains('bg-red-600')) {
            div.classList.remove('bg-red-600');
            div.classList.add('bg-orange-600');
            div.content = book.reading
            console.log(book.reading);
        } else {
            div.classList.add('bg-orange-600');
            div.content = book.reading
            console.log(book.reading);
        }
    }
}

let textDiv = document.getElementById('inprogress');
