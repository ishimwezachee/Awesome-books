const main = document.querySelector("#main");
const divbooks = document.querySelector(".books");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const addBtn = document.querySelector("#add");


let savedData = localStorage.getItem("savedInput");

let collection = [];

if (savedData && savedData !== null) {
  collection = JSON.parse(savedData);
}

const displayData =()=> {
    divbooks.innerHTML = "";
    collection.forEach((value, index) => {
        divbooks.innerHTML += `
            <div class="books">
            <ul>
                <li class="title">${value.name}</li>
                <li class="author">${value.author}</li>
            </ul>
             <button onclick="removeBook(${index});">remove</button>
             <hr>
           </div>`;
      });
}

 displayData();
 const saveData = () => localStorage.setItem("savedInput", JSON.stringify(collection));
 const removeBook = (index) =>{
  collection.splice(index, 1);
  saveData();
  displayData();
}


addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let newData = {
    name: inputTitle.value,
    author: inputAuthor.value,
  };
  collection.push(newData);
  saveData();
  displayData();
});
