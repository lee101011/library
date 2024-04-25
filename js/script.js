const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

const addBook = document.querySelector("#add");
const bookShelf = document.querySelector("#display");

// initial loading of the bookshelf
document.addEventListener("DOMContentLoaded", (event) => {
    addBookToLibrary(new Book("Legend of the Galactic Heroes, Vol 1: Dawn", "Yoshiki Tanaka", 304, false));
    addBookToLibrary(new Book("And Then There Were None", "Agatha Christie", 272, true));
    addBookToLibrary(new Book("The Hunt for Red October", "Tom Clancy", 387, true));
    drawBookShelf();
});

function addBookToLibrary(book) {
    myLibrary.push(book);
    drawBookShelf();
}

function removeBookFromLibrary(index) {
    if (index < 0) return;
    myLibrary.splice(index, 1);
    drawBookShelf();
}

function drawBookShelf() {
    resetBookShelf();
    drawCards();
}

function resetBookShelf() {
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.lastChild);
    }
}

function drawCards() {
    for (const [index, book] of myLibrary.entries()) {
        drawCard(index, book);
    }
}

function drawCard(index, book) {
    const card = document.createElement("div");
    card.classList.add("card");

    // viewable alternative to useing data-attribute
    const id = document.createElement("div");
    id.classList.add("id");
    id.textContent = `${index}`;
    card.appendChild(id);

    const labelTitle = document.createElement("div");
    labelTitle.classList.add("label");
    labelTitle.textContent = "Title:";
    card.appendChild(labelTitle);

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = `${book.title}`;
    card.appendChild(title);

    const labelAuthor = document.createElement("div");
    labelAuthor.classList.add("label");
    labelAuthor.textContent = "Author:";
    card.appendChild(labelAuthor);

    const author = document.createElement("div");
    author.classList.add("author");
    author.textContent = `${book.author}`;
    card.appendChild(author);

    const labelPages = document.createElement("div");
    labelPages.classList.add("label");
    labelPages.textContent = "Pages:";
    card.appendChild(labelPages);

    const pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = `${book.pages}`;
    card.appendChild(pages);

    const labelStatus = document.createElement("div");
    labelStatus.classList.add("label");
    labelStatus.textContent = "Read:";
    card.appendChild(labelStatus);

    const status = document.createElement("div");
    status.classList.add("status");
    statusResolver(status, book);
    card.appendChild(status);

    const del = document.createElement("div");
    del.classList.add("delete");
    del.textContent = "Delete";
    card.appendChild(del);

    bookShelf.appendChild(card);

    status.addEventListener("click", (event) => {
        book.toggleRead();
        statusResolver(status, book);
    });

    del.addEventListener("click", (event) => {
        const id = parseInt(del.parentElement.querySelector(".id").textContent);
        removeBookFromLibrary(id);
    });
}

function statusResolver(status, book) {
    if (book.read) {
        status.classList.remove("unread");
        status.classList.add("read");
    } else {
        status.classList.add("unread");
        status.classList.remove("read");
    }
    status.textContent = `${book.read ? "Yes" : "No"}`;
}

const add = document.querySelector(".add");
const form = document.querySelector(".form");
const panel = document.querySelector(".panel");

let formVisible = false;

add.addEventListener("click", (event) => {
    toggleForm();
});

function toggleForm() {
    if (formVisible) {
        add.style.marginBottom = "100vh";
    } else {
        add.style.marginBottom = "3rem";
        resetForm();
    }

    formVisible = !formVisible;
}

const titleF = document.querySelector("#in-title");
const authorF = document.querySelector("#in-author");
const pagesF = document.querySelector("#in-pages");
const readF = document.querySelector("#in-read");

function resetForm() {
    titleF.value = "";
    authorF.value = "";
    pagesF.value = "";
    readF.checked = false;
}

const formButton = document.querySelector("#submit");

formButton.addEventListener("click", (event) => {
    event.preventDefault();
    const book = new Book(
        titleF.value,
        authorF.value,
        pagesF.value,
        readF.checked
    );
    addBookToLibrary(book);
    resetForm();
});