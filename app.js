const bookBtn = document.getElementById("book-btn");
const formSection = document.querySelector(".form-section");
const closeBtn = document.querySelector("#close-btn");
const addBtn = document.querySelector("#add-btn");
const modal = document.getElementById("modal");
let bookInput = document.querySelectorAll("input");
const librarySec = document.getElementById("library-section");

let libraryArray = localStorage.getItem("books")
  ? JSON.parse(localStorage.getItem("books"))
  : [];

localStorage.setItem("books", JSON.stringify(libraryArray));
const data = JSON.parse(localStorage.getItem("books"));

//Book object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

bookBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //Form validation
  if (
    bookInput[0].value.length > 0 &&
    bookInput[1].value.length > 0 &&
    bookInput[2].value.length > 0
  ) {
    getArr(libraryArray);
    localStorage.setItem("books", JSON.stringify(libraryArray));
    adddBook(createBook(bookInput));
    modal.style.display = "none";
    formSection.reset();
  } else {
    alert(
      `Book ${bookInput[0].placeholder}, ${bookInput[1].placeholder} or ${bookInput[2].placeholder} cannot be empty`
    );
  }
});

//Create book function based on input
function createBook(bookInput) {
  let book = new Book(
    bookInput[0].value,
    bookInput[1].value,
    bookInput[2].value,
    bookInput[3].checked
  );
  return book;
}

function getArr(libraryArray) {
  let book = createBook(bookInput);

  libraryArray.push(book);

  return libraryArray;
}

function adddBook(book) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const title = document.createElement("h1");
  title.textContent = book.title;

  const author = document.createElement("h3");
  author.setAttribute("class", "author");
  author.textContent = `by ${book.author}`;

  const pages = document.createElement("h3");
  pages.setAttribute("class", "pages");
  pages.textContent = `${book.pages} pages`;

  const read = document.createElement("button");
  read.setAttribute("class", "read-btn");
  read.textContent = book.read ? "Read" : "Not Read";
  read.style.backgroundColor = book.read ? "#36ff00" : "#ff0000";

  read.addEventListener("click", () => {
    book.read = !book.read;
    read.textContent = book.read ? "Read" : "Not Read";
    read.style.backgroundColor = book.read ? "#36ff00" : "#ff0000";
  });

  const remove = document.createElement("button");
  remove.textContent = "Remove";

  //remove book from page and localStorage
  remove.addEventListener("click", () => {
    librarySec.removeChild(card);
    libraryArray.splice(libraryArray.indexOf(book), 1);
    //Updating the local storage
    localStorage.setItem("books", JSON.stringify(libraryArray));
  });

  librarySec.appendChild(card);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(remove);
}

data.forEach((book) => {
  adddBook(book);
});
