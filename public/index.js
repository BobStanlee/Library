const libraryContainer = document.getElementById("library-container");

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
updateLibraryshelve(myLibrary);
getInputs();


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

    addBookToLibrary(title, author, page, status, reading);
    updateLibraryshelve(myLibrary);

    formInputs.reset();
  });
}



// Function to handle and update library cards
function updateLibraryshelve(library) {

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
    "w-96",
    "overflow-hidden",
    "transition-all",
    "max-w"
  );

  libraryCard.id = index; //add id of current index

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

  // call checkReading Function
  checkReading(book, readingDiv);

  // div element for delete
  let deleteBtn = document.createElement('div');
  deleteBtn.classList.add(
    'self-end',
    'p-3',
    'rounded-full',
    'bg-gray-400',
    'shadow-md',
    'hover:shadow-lg', 
    'hover:scale-110',
    'transition-all',
    'hover:ani',
    'delete-btn',
  )

  let deleteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 fill-red-600">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
              </svg>`;
            
  deleteBtn.innerHTML = deleteSvg;

  libraryCard.appendChild(cardInnerContainer); //append cardInnerContainer as a child
  libraryCard.appendChild(readingDiv); //append readingDiv as a child
  libraryCard.appendChild(deleteBtn); //append deleteBtn as a child

  libraryContainer.appendChild(libraryCard);
}


// function to check reading status of a book
function checkReading (book, div) {
    if (book.reading === 'reading') {
        if (div.classList.contains('bg-orange-600')) {
            div.classList.remove('bg-orange-600');
            div.classList.add('bg-red-600');
            div.textContent = book.reading;
        } else {
            div.classList.add('bg-red-600');
            div.textContent = book.reading;
        }
    } 
    
    else if (book.reading === 'not started') {
        if (div.classList.contains('bg-red-600')) {
            div.classList.remove('bg-red-600');
            div.classList.add('bg-orange-600');
            div.textContent = book.reading
        } else {
            div.classList.add('bg-orange-600');
            div.textContent = book.reading
        }
    }
}

// Delete function
function deleteBook(index) {
  libraryData.splice(index, 1);

  updateLibraryshelve(myLibrary);
}

// function delete button
function deleteBtn (){
  let allDeletebtn = document.querySelectorAll('.delete-btn');

  allDeletebtn.forEach(delBtn => {
    delBtn.addEventListener("click", () => {
      let card = delBtn.parentElement;
      let index = card.id;

      deleteBook()
    })
  })
}