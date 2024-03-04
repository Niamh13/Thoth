/*
=======================
====SEARCH FUNCTION====
=======================
*/
function search() {
  const searchInput = document.getElementById("search").value;
  if (searchInput == "") {
    alert("Please enter a search");
  } else {
    // Reference 1
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        displayResults(data.items);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
}

/*
=======================
====DISPLAY RESULTS====
=======================
*/
function displayResults(books) {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  books.forEach((book) => {
    const bookInfo = `
        <div class="searchResultDiv">
          <img src="${book.volumeInfo.imageLinks.thumbnail}" class="searchResultCover">
          <h2 class="searchResultTitle">${book.volumeInfo.title}</h2>
          <p class="searchResultAuthor"><strong>Author:</strong> ${book.volumeInfo.authors}</p>
          <button class="saveButton" onclick="saveToLibrary('${book.id}')">Save to Library</button>
          <button class="saveButton" onclick="viewBook('${book.id}')">View Book</button>
        </div>
    `;
    searchResults.innerHTML += bookInfo;
  });
}

// Reference 2
function viewBook(bookId) {
  window.location.href = `book-details.html?id=${bookId}`;
}

/*
=======================
===DISPLAY BOOK PAGE===
=======================
*/
function getBook() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then((response) => response.json())
    .then((data) => {
      displayBookDetails(data);
      console.log(data);
    })
    .catch((error) => console.error("Error fetching book details:", error));

  function displayBookDetails(book) {
    const bookDetails = document.getElementById("bookDetails");
    bookDetails.innerHTML = `
    <div class="container">
    <h1 class="bookHeading">${book.volumeInfo.title}</h1>  
    <div class="bookDiv">
      <div class="leftContent">
        <img src="${book.volumeInfo.imageLinks.thumbnail}" />
        <p><strong>Author:</strong> ${book.volumeInfo.authors}</p>
        <p><strong>Publisher:</strong> ${book.volumeInfo.publisher}</p>
        <p><strong>Published Date:</strong> ${book.volumeInfo.publishedDate}</p>
        <p><strong>Page Count:</strong> ${book.volumeInfo.pageCount}</p>
        <p><strong>Categories:</strong> ${book.volumeInfo.categories}</p>
        <p><strong>Rating:</strong> ${book.volumeInfo.averageRating}</p>
        <button class="bookPageSaveButton" onclick="saveToLibrary('${book.id}')">
          <strong>Save to Library</strong>
        </button>
      </div>
      <div class="rightContent">
        <h2 id="bookDescHead">Description</h2>
        <p id="bookDesc">${book.volumeInfo.description}</p>
      </div>
    </div>
    <div class="userReviewsContainer">
      <h1 id="userReviewTitle">User Reviews</h1>
      <div class="userReviews">
        <div class="userReview">
          <p class="userReviewUsername"><strong>User 128482</strong></p>
          <p class="userReviewText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere, est sed dapibus accumsan, felis leo bibendum eros, ac auctor arcu tellus sit amet lorem. Integer id tempus enim, sed finibus purus. Sed placerat tellus sem, in tempor ipsum auctor non. Quisque mollis, nisl ultrices scelerisque faucibus, erat dui rutrum nunc, quis luctus purus dui non dui. Maecenas dignissim sem magna, sit amet scelerisque sem eleifend non. Aenean ullamcorper dictum odio, eu malesuada mi viverra id. Quisque vitae magna et sapien molestie dictum.</p>
        </div>
        <div class="userReview">
          <p class="userReviewUsername"><strong>User 128482</strong></p>
          <p class="userReviewText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere, est sed dapibus accumsan, felis leo bibendum eros, ac auctor arcu tellus sit amet lorem. Integer id tempus enim, sed finibus purus. Sed placerat tellus sem, in tempor ipsum auctor non. Quisque mollis, nisl ultrices scelerisque faucibus, erat dui rutrum nunc, quis luctus purus dui non dui. Maecenas dignissim sem magna, sit amet scelerisque sem eleifend non. Aenean ullamcorper dictum odio, eu malesuada mi viverra id. Quisque vitae magna et sapien molestie dictum.</p>
        </div>
        <div class="userReview">
          <p class="userReviewUsername"><strong>User 128482</strong></p>
          <p class="userReviewText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere, est sed dapibus accumsan, felis leo bibendum eros, ac auctor arcu tellus sit amet lorem. Integer id tempus enim, sed finibus purus. Sed placerat tellus sem, in tempor ipsum auctor non. Quisque mollis, nisl ultrices scelerisque faucibus, erat dui rutrum nunc, quis luctus purus dui non dui. Maecenas dignissim sem magna, sit amet scelerisque sem eleifend non. Aenean ullamcorper dictum odio, eu malesuada mi viverra id. Quisque vitae magna et sapien molestie dictum.</p>
        </div>
        <div class="userReview">
          <p class="userReviewUsername"><strong>User 128482</strong></p>
          <p class="userReviewText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere, est sed dapibus accumsan, felis leo bibendum eros, ac auctor arcu tellus sit amet lorem. Integer id tempus enim, sed finibus purus. Sed placerat tellus sem, in tempor ipsum auctor non. Quisque mollis, nisl ultrices scelerisque faucibus, erat dui rutrum nunc, quis luctus purus dui non dui. Maecenas dignissim sem magna, sit amet scelerisque sem eleifend non. Aenean ullamcorper dictum odio, eu malesuada mi viverra id. Quisque vitae magna et sapien molestie dictum.</p>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

/*
=======================
=======SAVE BOOK=======
=======================
*/
// Reference 3
// function to store the book ids in an array
function saveToLibrary(bookId) {
  // fetches the library array from local storage, or creates one if it doesn't exist.
  let library = JSON.parse(localStorage.getItem("library")) || [];

  // checks if the books ID is already in the library array.
  if (!library.includes(bookId)) {
    // adds the book
    library.push(bookId);

    // stores the library array in localstorage.
    localStorage.setItem("library", JSON.stringify(library));

    // tells the user the book was saved.
    alert("Book saved to library!");
  } else {
    // tells the user if the book is already in the array.
    alert("Book already exists in library!");
  }
}

/*
=======================
=====USERS LIBRARY=====
=======================
*/
function loadLibrary() {
  const libraryBooks = document.getElementById("libraryBooks");
  libraryBooks.innerHTML = "";

  // fetches the library array from local storage, or creates one if it doesn't exist.
  const library = JSON.parse(localStorage.getItem("library")) || [];

  if (library.length === 0) {
    // if the user's library is empty, prints a message to the screen.
    libraryBooks.innerHTML = "<p>No books saved in your library.</p>";
    return;
  }

  library.forEach((bookId) => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        displayBook(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  });
}

function displayBook(book) {
  const libraryBooks = document.getElementById("libraryBooks");
  const bookInfo = `
      <div class="searchResultDiv">
        <img src="${book.volumeInfo.imageLinks.thumbnail}" class="searchResultCover">
        <h2 class="searchResultTitle">${book.volumeInfo.title}</h2>
        <p class="searchResultAuthor"><strong>Author:</strong> ${book.volumeInfo.authors}</p>
        <button class="saveButton" onclick="viewBook('${book.id}')">View Book</button>
      </div>
    `;
  libraryBooks.innerHTML += bookInfo;
}

/*
------------------------------
----------REFERENCES----------
------------------------------

[1]: I used the Google Books API Documentation to learn how to use the API. URL:https://developers.google.com/books/docs/overview

[2]: I learned how to get the window URL from this page: https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript

[3]: I learned how access and save to local storage: https://stackoverflow.com/questions/34493531/how-to-store-and-retrieve-json-data-into-local-storage, https://www.w3schools.com/jsref/tryit.asp?filename=tryjson_store

*/
