const main = document.querySelector('#main')
const divbooks = document.querySelector('.books');
const collection = [
    {
        name:'singleness',
        author:'author'
    },
    {
        name:'love',
        author:'Mucyo Alex'
    },
]


collection.forEach(value=>{
    divbooks.innerHTML +=`
    <div class="books">
    <ul>
        <li class="title">${value.name}</li>
        <li class="author">${value.author}</li>
    </ul>
     <button>remove</button>
     <hr>
   </div>`
   })


