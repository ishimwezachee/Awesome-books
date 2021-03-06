const divbooks = document.querySelector('.books');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const addBtn = document.querySelector('#add');
const listNav = document.querySelector('#list_nav');
const addNav = document.querySelector('#add_nav');
const contactNav = document.querySelector('#contact_nav');
const listSection = document.querySelector('#all_books');
const addSection = document.querySelector('#add_book');
const contactSection = document.querySelector('#contact_info');
const date = document.querySelector('.date');
const lux = window.luxon;
const { DateTime } = lux;
const localTime = DateTime.local();
date.innerHTML = DateTime.fromISO(localTime).toLocaleString(DateTime.DATETIME_MED);
contactNav.addEventListener('click', () => {
  contactSection.style.display = 'block';
  listSection.style.display = 'none';
  addSection.style.display = 'none';
});

addNav.addEventListener('click', () => {
  addSection.style.display = 'block';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
});

listNav.addEventListener('click', () => {
  listSection.style.display = 'block';
  contactSection.style.display = 'none';
  addSection.style.display = 'none';
});

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
      this.getData();
    }
  };

  getData() {
    divbooks.innerHTML = '';
    this.arr.forEach((value, index) => {
      divbooks.innerHTML += `
              <div class="books">
              <div class="list-btn">
              <ul class="list">
                  <li class="title">${value.name}</li>
                  <p class="by">by</p>
                  <li class="author">${value.author}</li>
              </ul>
              <button id="remove" onclick="remove(${index});">remove</button>
              </div>
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
  if (inputTitle.value.length > 0 && inputAuthor.value.length > 0) {
    bookArr.saveData(book1);
    bookArr.getData();
  } else {
    alert('please fill all the inputs');
  }
  inputTitle.value = '';
  inputAuthor.value = '';
});

const remove = (index) => bookArr.removeBook(index);
remove();
bookArr.getData();
