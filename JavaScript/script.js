/*
--------------------------
----------SEARCH----------
--------------------------
*/
// Reference 1
const apiKey = "AIzaSyDeo-CS4IKRvG97TjG_usoPKNrgdVv0xXg";

// function to search for book info
function searchBooks() {
  // const searchInput = document.getElementById("searchInput").value;
  const searchInput = "harry potter";

  // Construct the API URL
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchInput
  )}&langRestrict=en&orderBy=relevance&key=${apiKey}`;

  // Make the API request
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displaySearchResults(data.items);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

/*
------------------------------
----DISPLAY SEARCH RESULTS----
------------------------------
*/

// function to display results
function displaySearchResults(books) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (books && books.length > 0) {
    books.forEach((book) => {
      const author = book.volumeInfo.authors;
      const bookInfo = document.createElement("div");
      bookInfo.classList.add("grid-item"); // Add grid item class
      const cover = book.volumeInfo.imageLinks.thumbnail;
      const id = book.id;
      const isbn = book.volumeInfo.industryIdentifiers[0].identifier;
      const title = book.volumeInfo.title;

      bookInfo.innerHTML = `
        <img class="bookResultImage" src="${cover}" alt="Book Cover">
        <h3>${title}</h3>
        <p><strong>Authors:</strong> ${author}</p>
        <button onclick="bookPage('${id}')">View</button>
      `;
      resultsContainer.appendChild(bookInfo);
    });
  } else {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  }
}

// function to navigate to book page
function bookPage(id) {
  // Reference 2
  const encodedId = encodeURIComponent(id);
  const bookPage = `book.html?id=${encodedId}`;
  window.location.href = bookPage;
}

// function to get ISBN from URL and perform a search
function getURL() {
  const currentUrl = new URL(window.location.href);
  let id = currentUrl.searchParams.get("id");
  searchID(id);
}

// function to search for book by ISBN
function searchID(id) {
  const searchInput = id;

  // Construct the API URL
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchInput
  )}&orderBy=relevance&key=${apiKey}`;

  // Make the API request
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayBookInfo(data.items);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

/*
------------------------------
----------BOOK PAGE-----------
------------------------------
*/

// function to display book information
function displayBookInfo(books) {
  const resultsContainer = document.getElementById("bookInfo");

  const author = books[0].volumeInfo.authors;
  const cover = books[0].volumeInfo.imageLinks.thumbnail;
  const description = books[0].volumeInfo.description;
  const isbn = books[0].volumeInfo.industryIdentifiers[0].identifier;
  const published = books[0].volumeInfo.publishedDate;
  const title = books[0].volumeInfo.title;

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-wrapper");

  bookInfo.innerHTML = `
      <div class="col-1">
        <img id="bookCover" src="${cover}" alt="Book Cover" />
        <p id="bookPublishedDate"><strong>Published Date:</strong> ${published}</p>
        <p id="bookISBN">ISBN: ${isbn}</p>
      </div>
      <div class="col-2">
        <h3 id="bookTitle">${title}</h3>
        <p id="bookAuthors"><strong>Authors:</strong> ${author}</p>
        <p id="bookDescription"><strong>Description:</strong> ${description}</p>
      </div>
    `;
  resultsContainer.appendChild(bookInfo);
}

// Function to save JSON data to a file
function saveJSONToFile(data, filename) {
  // Create a Blob object containing the JSON data
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an anchor element (<a>) to simulate a click and trigger the download
  const a = document.createElement("a");
  a.href = url; // Set the href attribute to the Blob URL
  a.download = filename; // Set the download attribute to the desired filename

  // Append the anchor element to the document body
  document.body.appendChild(a);

  // Simulate a click on the anchor element to trigger the download
  a.click();

  // Revoke the Blob URL to release the resources associated with it
  URL.revokeObjectURL(url);

  // Remove the anchor element from the document body after the download is complete
  document.body.removeChild(a);
}

// function to save book information to a JSON file
function saveBook() {
  const bookInfo = {
    title: document.getElementById("bookTitle").innerText,
    authors: document.getElementById("bookAuthors").innerText,
    description: document.getElementById("bookDescription").innerText,
    publishedDate: document.getElementById("bookPublishedDate").innerText,
    isbn: document.getElementById("bookISBN").innerText,
    cover: document.getElementById("bookCover").src,
  };
  saveJSONToFile(bookInfo, "book_info.json");
  alert("Book saved!");
}

/*
------------------------------
----------REFERENCES----------
------------------------------

[1]: I used the Google Books API Documentation to learn how to use the API. URL:https://developers.google.com/books/docs/overview

[2]: I learned how to get the window URL from this page: https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript

*/
