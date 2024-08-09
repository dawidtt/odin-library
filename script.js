function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let readText;
    if (this.read) readText = "not read yet";
    else readText = "already read";
    return console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${readText}.`
    );
  };
}

function addBookToLibrary() {
  const titleInputValue = document.querySelector("#title-input").value;
  const authorInputValue = document.querySelector("#author-input").value;
  const pagesInputValue = document.querySelector("#pages-input").value;
  const readInputValue = document.querySelector("#read-input").checked;

  const newBook = new Book(
    titleInputValue,
    authorInputValue,
    pagesInputValue,
    readInputValue
  );
  myLibrary.push(newBook);
  displayBook(newBook);
}
function displayBook(book) {
  const bookDiv = document.createElement("div");
  bookDiv.dataset.indexInLibrary = bookCounter;
  bookDiv.classList.add("book");

  const icon = document.createElement("img");
  const iconButton = document.createElement("button");
  icon.src = "./images/close.png";
  icon.id = `${bookCounter}-icon`;
  iconButton.appendChild(icon);
  bookDiv.appendChild(iconButton);

  const bookTextWrap = document.createElement("div");
  bookTextWrap.classList.add("book-text-wrap");
  bookDiv.appendChild(bookTextWrap);

  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = `Title: ${book.title}`;
  bookTextWrap.appendChild(title);

  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = `Author: ${book.author}`;
  bookTextWrap.appendChild(author);

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `Pages: ${book.pages}`;
  bookTextWrap.appendChild(pages);

  const read = document.createElement("p");
  read.classList.add("read");
  const readToogleBtn = document.createElement("input");
  readToogleBtn.setAttribute("type", "checkbox");
  readToogleBtn.dataset.indexInLibrary = bookCounter;
  read.textContent = `Read: `;
  if (book.read) readToogleBtn.checked = true;
  else readToogleBtn.checked = false;
  readToogleBtn.addEventListener("input", toogleRead);
  read.appendChild(readToogleBtn);
  bookTextWrap.appendChild(read);

  iconButton.addEventListener("click", removeBookFromLibrary);
  addNewBooksBtn.before(bookDiv);
  bookCounter += 1;
}

function toogleRead(event) {
  console.log(event);
  console.log(myLibrary);

  const indexInLibraryToggle = event.srcElement.dataset.indexInLibrary;
  myLibrary[indexInLibraryToggle].read = event.target.checked;
  console.log(event.target.checked);
  console.log(myLibrary);
}
function removeBookFromLibrary(event) {
  console.log(myLibrary);

  const currentIconId = event.target.id;
  const currentBookNumber = currentIconId.charAt(0);
  const selectorOfCurrentBook = `.book[data-index-in-library="${currentBookNumber}"]`;
  const currentBook = document.querySelector(selectorOfCurrentBook);
  currentBook.remove();
  const allBooks = document.querySelectorAll(".book");
  const allBooksArray = Array.prototype.slice.call(allBooks);
  const allIcons = document.querySelectorAll(".book img");
  const allIconsArray = Array.prototype.slice.call(allIcons);
  const allRead = document.querySelectorAll(".book input");
  const allReadArray = Array.prototype.slice.call(allRead);
  bookCounter = 0;
  for (let i = 0; i < allBooksArray.length; i++) {
    allBooksArray[i].dataset.indexInLibrary = bookCounter;
    allReadArray[i].dataset.indexInLibrary = bookCounter;
    allIconsArray[i].id = `${bookCounter}-icon`;
    bookCounter++;
  }

  myLibrary.splice(currentBookNumber, 1);
  console.log(myLibrary);
}
let bookCounter = 0;
const dialog = document.querySelector("#dialog");
const closeDialog = document.querySelector("#closeDialog");
const confirmNewBook = document.querySelector("#confirmBtn");
const addNewBooksBtn = document.querySelector(".add-book");

addNewBooksBtn.addEventListener("click", () => {
  dialog.showModal();
});
closeDialog.addEventListener("click", () => {
  dialog.close();
});

confirmNewBook.addEventListener("click", preventFromSubmit, false);
confirmNewBook.addEventListener("click", addBookToLibrary);

function preventFromSubmit(event) {
  event.preventDefault();
  dialog.close();
}

const myLibrary = [];
myLibrary.push(new Book("The Hobbit", "Tolkien", 295, true));
myLibrary.push(new Book("Last Wish", "Andrzej Sapkowski", 332, false));
myLibrary.push(new Book("www.1939.com.pl", "Marcin Ciszewski", 333, false));

for (book of myLibrary) {
  displayBook(book);
}
