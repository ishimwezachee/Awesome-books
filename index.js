const divbooks = document.querySelector(".books");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const addBtn = document.querySelector("#add");

class Onebook {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

class Book {
  constructor(savedData = []) {
    this.arr = savedData;
  }
  set_data_to_local_storage(data) {
    let existing = JSON.parse(localStorage.getItem("book"));
    existing = existing ? existing : [];
    this.arr = existing;
    this.arr.push(data);
    localStorage.setItem("book", JSON.stringify(this.arr));
  }

  removeBook = (index) => {
    if (index !== null && index !== undefined) {
      this.arr.splice(index, 1);
      localStorage.setItem("book", JSON.stringify(this.arr));
      this.retrieve_data_and_display();
    }
  };

  retrieve_data_and_display() {
    divbooks.innerHTML = "";
    this.arr.forEach((value, index) => {
      divbooks.innerHTML += `
              <div class="books">
              <ul>
                  <li class="title">${value.name}</li>
                  <li class="author">${value.author}</li>
              </ul>
              <button id="remove" onclick="remove(${index});">remove</button>
               <hr>
             </div>`;
    });
  }
}

let all_local_data = JSON.parse(localStorage.getItem("book"));

if (all_local_data === null) {
  all_local_data = [];
}
let bookArr = new Book(all_local_data);
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const book1 = new Onebook(inputTitle.value, inputAuthor.value);
  bookArr.set_data_to_local_storage(book1);
  bookArr.retrieve_data_and_display();
});

const remove = (index) => bookArr.removeBook(index);
remove();
bookArr.retrieve_data_and_display();
