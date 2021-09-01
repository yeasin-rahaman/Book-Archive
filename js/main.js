const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const booksContainer = document.getElementById('books-container');
const errorDiv = document.getElementById('errors');
const bookDetails = document.getElementById('book-details');


searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    if (search == '') {
        errorDiv.innerHTML = 'search field cannot be empty';
        return;
    }
    // clear 
    booksContainer.innerHTML = '';
    bookDetails.innerHTML = '';

    const url = `http://openlibrary.org/search.json?q=${search}`;


    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.docs));

    searchInput.value = ''

})
function showData(bookArray) {

    // error handiling 
    if (bookArray.length === 0) {
        errorDiv.innerText = 'No Books Found';
    }
    else {
        errorDiv.innerText = ''
    }
    bookArray.forEach((book) => {

        // its a loog so it will repete 

        const div = document.createElement('div')
        div.classList.add('col-md-3');

        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`


        div.innerHTML = `
                <div class="card h-100" onclick="handel()">
                        <img src="${imgUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.author_alternative_name}</h5>
                    </div>
                   
                </div>
                `
        booksContainer.appendChild(div);
    })
}


function showDetails(hello) {
    console.log(hello)


}





