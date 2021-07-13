//Create minor visual effects
let addButton = document.querySelector("#addBookDiv");
let formPopup = document.querySelector("#formPopup");

addButton.addEventListener("mousedown", () => {
  addButton.style.cssText = "color: white; transform: scale(1.1)";
});
addButton.addEventListener("mouseup", () => {
  addButton.style.cssText = "";
});
addButton.addEventListener("click", (e) => {
  formPopup.style.cssText = "display: block";
});

let closeFormPopupButton = document.querySelector("#closeAddBookButton");
closeFormPopupButton.addEventListener("mousedown", () => {
  closeFormPopupButton.style.cssText = "color: white";
});
closeFormPopupButton.addEventListener("mouseup", () => {
  closeFormPopupButton.style.cssText = "";
});
closeFormPopupButton.addEventListener("click", () => {
  formPopup.style.cssText = "display: none";
});

let addBookButton = document.querySelector("#addBookButton");
addBookButton.addEventListener("mousedown", () => {
  addBookButton.style.cssText = "color: white";
});
addBookButton.addEventListener("mouseup", () => {
  addBookButton.style.cssText = "";
});

let deleteLibraryButton = document.querySelector("#deleteLibraryButton");
deleteLibraryButton.addEventListener("mousedown", () => {
  deleteLibraryButton.style.cssText = "color: white";
});
deleteLibraryButton.addEventListener("mouseup", () => {
  deleteLibraryButton.style.cssText = "";
});

/////////////////////////////////////////////////////////////////////////////////
//create an array to hold all book objects and a class to create book objects
//Also create an object to hold stats
let library = [];
let stats = {};
stats.totalBooks = 0;
stats.readBooks = 0;
stats.notReadBooks = 0;
class Book {
  constructor(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
  }
}
function addBookFunction() {
  //get the values of the input forms, create object and push to the array
  let title = document.querySelector("#titleInput").value;
  let author = document.querySelector("#authorInput").value;
  let pages = document.querySelector("#pagesInput").value;
  let readOrNot = document.querySelector("#readOrNotInput").checked;
  let book = new Book(title, author, pages, readOrNot);
  library.push(book);

  //once the input values are received, create the book card to display in our library shelves
  let bookCard = document.createElement("div");
  bookCard.className = "bookCard";
  bookCard.style.cssText = `border: 1px solid grey; background-color: black; display: grid; grid-template-rows: 1fr 1fr 1fr 1fr 1fr; grid-template-columns: 1fr`;
  let bookCardTitle = document.createElement("div");
  bookCardTitle.textContent = title;
  bookCardTitle.style.cssText =
    "display: flex; justify-content: center; align-items: center";
  let bookCardAuthor = document.createElement("div");
  bookCardAuthor.textContent = author;
  bookCardAuthor.style.cssText =
    "display: flex; justify-content: center; align-items: center";
  let bookCardPages = document.createElement("div");
  bookCardPages.textContent = pages;
  bookCardPages.style.cssText =
    "display: flex; justify-content: center; align-items: center";
  let readStatus = document.createElement("div");
  readStatus.style.cssText =
    "display: flex; justify-content: center; align-items: center";
  let labelStatus = document.createElement("label");
  labelStatus.textContent = "Read or not";
  let inputStatus = document.createElement("input");
  inputStatus.type = "checkbox";
  inputStatus.checked = book.readOrNot;
  readStatus.appendChild(labelStatus);
  readStatus.appendChild(inputStatus);
  inputStatus.addEventListener("change", () => {
    if (inputStatus.checked === true) {
      book.readOrNot = true;
      stats.notReadBooks -= 1;
      stats.readBooks += 1;
    } else {
      book.readOrNot = false;
      stats.notReadBooks += 1;
      stats.readBooks -= 1;
    }
    document.querySelector("#readBooksNumber").textContent = stats.readBooks;
    document.querySelector("#notReadBooksNumber").textContent =
      stats.notReadBooks;
  });

  let deleteButtonMini = document.createElement("button");
  deleteButtonMini.textContent = "Delete";
  deleteButtonMini.style.cssText = "background-color: rgb(20, 40, 80)";
  deleteButtonMini.addEventListener("click", (e) => {
    bookCard.remove();
    stats.totalBooks -= 1;
    if (book.readOrNot === true) {
      stats.readBooks -= 1;
    } else {
      stats.notReadBooks -= 1;
    }
    document.querySelector("#totalBooksNumber").textContent = stats.totalBooks;
    document.querySelector("#readBooksNumber").textContent = stats.readBooks;
    document.querySelector("#notReadBooksNumber").textContent =
      stats.notReadBooks;
    library.forEach((e) => {
      if (e.title == book.title && e.author == book.author) {
        library.splice(indexOf(e), 1);
      }
    });
  });
  bookCard.appendChild(bookCardTitle);
  bookCard.appendChild(bookCardAuthor);
  bookCard.appendChild(bookCardPages);
  bookCard.appendChild(readStatus);
  bookCard.appendChild(deleteButtonMini);
  document.querySelector("#booksDiv").appendChild(bookCard);

  //once the book card is created, reset the input form values and hide the form popup
  document.querySelector("#titleInput").value = null;
  document.querySelector("#authorInput").value = null;
  document.querySelector("#pagesInput").value = null;
  document.querySelector("#readOrNotInput").checked = false;
  formPopup.style.cssText = "display: none";

  //get data for stats and display them
  stats.totalBooks += 1;
  if (book.readOrNot === true) {
    stats.readBooks += 1;
  } else {
    stats.notReadBooks += 1;
  }

  document.querySelector("#totalBooksNumber").textContent = stats.totalBooks;
  document.querySelector("#readBooksNumber").textContent = stats.readBooks;
  document.querySelector("#notReadBooksNumber").textContent =
    stats.notReadBooks;
}
function deleteLibraryFunction() {
  library = [];
  stats.totalBooks = 0;
  stats.readBooks = 0;
  stats.notReadBooks = 0;
  document.querySelector("#totalBooksNumber").textContent = stats.totalBooks;
  document.querySelector("#readBooksNumber").textContent = stats.readBooks;
  document.querySelector("#notReadBooksNumber").textContent =
    stats.notReadBooks;
  let bookCardList = document.querySelectorAll(".bookCard");
  bookCardList.forEach((item) => {
    item.remove();
  });
}

addBookButton.addEventListener("click", addBookFunction);
deleteLibraryButton.addEventListener("click", deleteLibraryFunction);
