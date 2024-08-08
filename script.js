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
  displayBook(newBook);
}
function displayBook(book) {
  bookCounter += 1;
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
  read.textContent = `Read: ${book.read}`;
  bookTextWrap.appendChild(read);

  bookDiv.addEventListener("click", removeBookFromLibrary);
  addNewBooksBtn.before(bookDiv);
}

function removeBookFromLibrary(event) {
  bookCounter -= 1;

  const currentIconId = event.target.id;
  const currentBookNumber = currentIconId.charAt(0);
  const selectorOfCurrentBook = `.book[data-index-in-library="${currentBookNumber}"]`;
  const currentBook = document.querySelector(selectorOfCurrentBook);
  currentBook.remove();
  myLibrary.splice(currentBookNumber, 1);
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
