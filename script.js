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

function addBookToLibrary() {}
function displayBook(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

  const bookTextWrap = document.createElement("div");
  bookTextWrap.classList.add("bookTextWrap");
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

  addNewBooksBtn.before(bookDiv);
}

const dialog = document.querySelector("#dialog");
const closeDialog = document.querySelector("#closeDialog");
const addNewBooksBtn = document.querySelector(".add-book");

addNewBooksBtn.addEventListener("click", () => {
  dialog.showModal();
});
closeDialog.addEventListener("click", () => {
  dialog.close();
});
const myLibrary = [];
myLibrary.push(new Book("The Hobbit", "Tolkien", 295, true));
myLibrary.push(new Book("Last Wish", "Andrzej Sapkowski", 332, false));
for (book of myLibrary) {
  displayBook(book);
}
