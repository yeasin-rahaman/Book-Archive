// documents call 
const container = document.getElementById("books-container");
const searchedInput = document.getElementById("search-input");
const totalBookFound = document.getElementById("total-search-found");
const bookDetails = document.getElementById("book-details");
const noBooksFound = document.getElementById('no-books-found-error');

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
  noBooksFound.innerHTML = ``;
};

// show books function 
const showData = (book) => {

  // if no Books Found error message 
  if (book.numFound === 0) {
    noBooksFound.innerHTML = `<h3 class="position-absolute w-100 fw-bold text-danger d-flex align-items-center justify-content-center" style='height:200px'>
    No Books Found..!
</h3>`;
    console.log(123)
  }

  //Total Book Found
  else {
    totalBookFound.innerText = ` Total ${book.numFound} Books found`;
  }

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
  // get book details 
  const bookTitle = book.title;
  const authorName = book.author_name[0];
  const bookPublishDate = book.publish_date[0];
  const FirstPublishYear = book.first_publish_year[0];
  const publisherName = book.publisher[0];

  // show books details 
  bookDetails.innerHTML = `
        <div class="card h-100 mt-3" style="width: 25rem;">
        <img height="400" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top p-3" alt="...">
          <div class="card-body">
            <h5 class="card-header"><b>Book Title</b> : ${bookTitle}</h5>
            <h6><b>Author Name</b> : ${authorName}</h6>
            <h6><b>Publish Date</b> : ${bookPublishDate}</h6>
            <h6><b>First Publish Year</b> : ${FirstPublishYear}</h6>
            <h6><b>Publisher</b> : ${publisherName}</h6>
          </div>
      </div>`
};

