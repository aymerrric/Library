const library = [];

const dialog = document.querySelector("dialog");
const addButton = document.querySelector("#add-button");
const shelf = document.querySelector(".shelf")
const closeButton = document.querySelector("#close")
const sendButton = document.querySelector("#send")
const form = document.querySelector("form")


function Book(title, price, pages, read,){
    this.title = title;
    this.price = price;
    this.pages = pages;
    this.read = read;
}

Object.getPrototypeOf(Book).change_read = function (){
    this.read = !this.read
} 

function addBook(title, price, pages, read, ){
    const book = new Book(title, price, pages, read);
    library.push(book);
}
function deleteCard(event){
    const button = event.target;
    const card = button.parentNode;
    const title = card.querySelector("h2").textContent;
    for (let i in library){
        if (library[i].title == title){
            library.splice(i,1);
        }
    }
    emptyShelf();
    createShelf();
}

function readIt(event){
    const button = event.target
    const title = button.parentNode.querySelector("h2").textContent
    for (let book of library){
        if (book.title == title){
            book.read = true;
        }
    }
    emptyShelf();
    createShelf();
}

function createCard(book){
    const card = document.createElement("div");
    card.classList.add("book-card");
    const title = document.createElement("h2");
    title.textContent = book.title
    const properties = document.createElement("ul");
    const price = document.createElement("li");
    const pages = document.createElement("li");
    const read = document.createElement("li");
    price.textContent = "Price: " + book.price + "€";
    pages.textContent = `Number of pages: ${book.pages}`;
    read.textContent = book.read ? "Already read" : "I need to read it";
    properties.appendChild(price);
    properties.appendChild(pages);
    properties.appendChild(read);
    card.appendChild(title);
    card.appendChild(properties);
    const button = document.createElement("button");
    button.textContent = "Delete";
    button.classList.add("remoove");
    button.addEventListener("click", deleteCard);
    card.appendChild(button);
    if (!book.read){
        const nowRead = document.createElement("button");
        nowRead.textContent = "I just read it";
        nowRead.addEventListener("click", readIt);
        nowRead.classList.add("finally-read");
        card.appendChild(nowRead);

    }
    return card;
}

function emptyShelf(){
    while(shelf.querySelector("*:nth-child(2")){
        shelf.removeChild(shelf.querySelector("*:nth-child(2"));
    }
}

function createShelf(){
    for (let book of library){
        console.log(book);
        const card = createCard(book);
        shelf.appendChild(card);
    }
}

addBook("test", 30, 200, true);
createShelf()

addButton.addEventListener("click", ()=>{
    dialog.showModal();
})

closeButton.addEventListener("click", (event)=>{
    event.preventDefault();
    dialog.close();
})

sendButton.addEventListener("click", (e)=>{
    if(form.querySelector("#title").value === ""){
        return;
    }
    e.preventDefault(); // prevent from sending the form
    const title = form.querySelector("#title").value;  
    const price = form.querySelector("#price").value;  
    const numberOfPages = form.querySelector("#number-of-pages").value;  
    const read = form.querySelector("#read").checked;  
    addBook(title, price, numberOfPages, read);
    emptyShelf();
    createShelf();
    form.reset();
    dialog.close();
})