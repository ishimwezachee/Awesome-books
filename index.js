const divbooks = document.querySelector('.books');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const addBtn = document.querySelector('#add');

class Book {
  constructor(savedData = []) {
    this.arr = savedData;
  }

  saveData(data) {
    let existing = JSON.parse(localStorage.getItem('book'));
    existing = existing || [];
    this.arr = existing;
    this.arr.push(data);
    localStorage.setItem('book', JSON.stringify(this.arr));
  }

  removeBook = (index) => {
    if (index !== null && index !== undefined) {
      this.arr.splice(index, 1);
      localStorage.setItem('book', JSON.stringify(this.arr));
      this.retrieve_data_and_display();
    }
  };

  getData() {
    divbooks.innerHTML = '';
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

let collection = JSON.parse(localStorage.getItem('book'));

if (collection === null) {
  collection = [];
}
const bookArr = new Book(collection);
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const book1 = { name: inputTitle.value, author: inputAuthor.value };
  bookArr.saveData(book1);
  bookArr.retrieve_data_and_display();
});

const remove = (index) => bookArr.removeBook(index);
remove();
bookArr.getData();
