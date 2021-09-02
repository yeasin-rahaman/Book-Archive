// documents call 
const container = document.getElementById("books-container");
const searchedInput = document.getElementById("search-input");
const totalBookFound = document.getElementById("total-search-found");
const bookDetails = document.getElementById("book-details");

// search books function 
const searchBook = () => {
  // get searched input
  const searchText = searchedInput.value;
  // error message 
  if (searchText === "") {
    container.innerHTML = `
        <h3 class="position-absolute w-100 fw-bold text-danger d-flex align-items-center justify-content-center" style='height:200px'>
            Empty Input..!
        </h3>`;
  }
  else {
    // spinner 
    container.innerHTML = `
        <div id="loadingMessage" class="position-absolute w-100 d-flex align-items-center justify-content-center" style='height:250px'>
            <img src="images/Infinity-1s-200px.svg">
        </div>`;

    //Get API

    // const url = ;
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
      .then((response) => response.json())
      .then((data) => showData(data));
    searchedInput.value = ''
  }
  // clear 

  while (bookDetails.lastChild) {
    bookDetails.removeChild(bookDetails.lastChild);
  };
  totalBookFound.innerText = ``;
};

// show books function 
const showData = (book) => {
  //Total Book Found
  totalBookFound.innerText = ` Total ${book.numFound} Books found`;


  // clear the container field
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  };

  if (book.status === 404) {
    container.innerHTML = `
    <h3 class="position-absolute w-100 fw-bold d-flex align-items-center justify-content-center" style='height:200px'>
        No Book Found..!
    </h3>`;
  };
  const bookArray = book.docs;
  bookArray.forEach((book) => {
    // create a div
    const div = document.createElement("div");
    div.classList.add("col");

    // Book card with name and cover
    div.innerHTML =
      `
        <div class="card h-100">
        <img height="400" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top p-2" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
            </div>
  
        </div>
        `
    // Add div
    container.appendChild(div);

    div.addEventListener("click", () => {
      showDetails(book);
    });
  });
};

//show Book Details function
const showDetails = (book) => {
  bookDetails.innerHTML = `
        <div class="card h-100 mt-3" style="width: 25rem;">
        <img height="400" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top p-3" alt="...">
          <div class="card-body">
            <h5 class="card-header"><b>Book Title</b> : ${book.title}</h5>
            <h6><b>Author Name</b> : ${book.author_name}</h6>
            <h6><b>Publish Date</b> : ${book.publish_date}</h6>
            <h6><b>First Publish Year</b> : ${book.first_publish_year}</h6>
            <h6><b>Publisher</b> : ${book.publisher}</h6>
          </div>
      </div>`
};




