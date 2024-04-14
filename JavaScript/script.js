/*
=======================
=====LOG IN STATUS=====
=======================
*/
// Creates a variable to track login status
let isLoggedIn = false;

// Function to check login status
function checkLoginStatus() {
    // reference 4 and 5
    fetch("/PHP/checkLogin.php")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Received login status data:", data);
            if (data.loggedIn) {
                // User is logged in, load their library
                console.log("User is logged in");
                isLoggedIn = true;
                loadLibrary();
            } else {
                // User is not logged in, redirect them to login page
                console.log("User is not logged in");
                isLoggedIn = false;
                alert("Please log in");
                window.location.href = "login.html";
            }
        })
        .catch(function(error) {
            console.error("Error checking login status:", error);
        });
}



/*
=======================
====SEARCH FUNCTION====
=======================
*/
// Function to search the Google Books API
function search() {
    // Retrieves the value of the search box
    const searchInput = document.getElementById("search").value;

    // Checks if the search input is empty before submitting it to the API
    if (searchInput === "") {
        alert("Please enter a search");
    } else {
        // Reference 1
        // Performs a search using the Google Books API
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
// Function to display the search results
function displayResults(books) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    // Loops through the results and displays the information using template literals
    books.forEach((book) => {
        const bookInfo = `
        <div class="searchResultDiv">
          <img src="${book.volumeInfo.imageLinks.thumbnail}" class="searchResultCover" alt="book cover">
          <h2 class="searchResultTitle">${book.volumeInfo.title}</h2>
          <p class="searchResultAuthor"><strong>Author:</strong> ${book.volumeInfo.authors}</p>
          <button class="saveButton" name="savebutton" onclick="saveToLibrary('${book.id}')">
            <strong>Save to Library</strong>
          </button>
          <button class="saveButton" onclick="viewBook('${book.id}')">View Book</button>
        </div>
    `;
        searchResults.innerHTML += bookInfo;
    });
}

// Reference 2
// Function to put the bookID into the url bar
function viewBook(bookId) {
    window.location.href = `book.html?id=${bookId}`;
}

/*
=======================
===DISPLAY BOOK PAGE===
=======================
*/
// Function to extract the bookID from the url bar and perform a search for that specific book on its own page
async function getBook() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const book = await response.json();
        displayBookDetails(book);
        console.log(book);
    } catch (error) {
        console.error("Error fetching book details:", error);
    }

    // Displays the book information
    function displayBookDetails(book) {
        const bookDetails = document.getElementById("bookDetails");
        bookDetails.innerHTML = `
    <div class="container">
    <h1 class="bookHeading">${book.volumeInfo.title}</h1>  
    <div class="bookDiv">
      <div class="leftContent">
        <img src="${book.volumeInfo.imageLinks.thumbnail}"  alt="book cover"/>
        <p><strong>Author:</strong> ${book.volumeInfo.authors}</p>
        <p><strong>Publisher:</strong> ${book.volumeInfo.publisher}</p>
        <p><strong>Published Date:</strong> ${book.volumeInfo.publishedDate}</p>
        <p><strong>Page Count:</strong> ${book.volumeInfo.pageCount}</p>
        <p><strong>Categories:</strong> ${book.volumeInfo.categories}</p>
        <p><strong>Rating:</strong> ${book.volumeInfo.averageRating}</p>
            <button class="saveButton" name="savebutton" onclick="saveToLibrary('${book.id}')">
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
          <p class="userReviewUsername"><strong>SuperAwesomeMegaJosh</strong></p>
          <p><strong>Rating:</strong>⭐⭐⭐⭐️</p>
          <p class="userReviewText">Maecenas tincidunt lacinia dolor non semper. Quisque pharetra, eros at posuere feugiat, ex dui ultrices justo, id maximus tortor ligula ut ligula. Etiam pretium faucibus nisl, sed imperdiet nulla volutpat eu. Sed convallis, orci quis condimentum volutpat, dolor enim hendrerit nisi, sed tristique enim turpis in eros. Donec et rhoncus leo, non sodales metus. Vestibulum sagittis quam magna. Morbi sit amet posuere ipsum. Morbi mattis augue eu lorem scelerisque iaculis sed at dolor. Proin lacinia lacinia quam, eget dictum est porttitor nec. In aliquet augue tortor, a vulputate mi lobortis a. Etiam feugiat lectus nulla, a ultrices magna egestas sit amet. Nam vel magna lectus. Proin et molestie arcu. Nulla iaculis tincidunt dolor eget volutpat. Maecenas sodales porta elit at accumsan. Aliquam nec varius turpis, ut luctus neque.</p>
        </div>
        <div class="userReview">
          <p class="userReviewUsername"><strong>Niamh</strong></p>
          <p><strong>Rating:</strong>⭐⭐</p>
          <p class="userReviewText">Etiam id dui non urna ornare dignissim nec vel massa. Praesent non dictum lacus. In varius fringilla vehicula. Suspendisse venenatis ut elit ac commodo. Sed sed ligula accumsan erat dictum ullamcorper vel a tellus. Donec facilisis fermentum fringilla. Nam eu ultricies turpis. Pellentesque tristique varius nisl ac facilisis. Morbi tellus ex, malesuada ac suscipit non, tincidunt in neque. Quisque ut tellus libero. Proin mattis, risus non convallis facilisis, arcu urna lobortis lectus, vel malesuada nunc felis eget eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>
        </div>
        <div class="userReview">
          <p class="userReviewUsername"><strong>Dongyi</strong></p>
          <p><strong>Rating:</strong>⭐️</p>
          <p class="userReviewText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere, est sed dapibus accumsan, felis leo bibendum eros, ac auctor arcu tellus sit amet lorem. Integer id tempus enim, sed finibus purus. Sed placerat tellus sem, in tempor ipsum auctor non. Quisque mollis, nisl ultrices scelerisque faucibus, erat dui rutrum nunc, quis luctus purus dui non dui. Maecenas dignissim sem magna, sit amet scelerisque sem eleifend non. Aenean ullamcorper dictum odio, eu malesuada mi viverra id. Quisque vitae magna et sapien molestie dictum.</p>
        </div>
        <div class="userReview">
          <p class="userReviewUsername"><strong>Ata</strong></p>
          <p><strong>Rating:</strong>⭐⭐⭐⭐⭐️</p>
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
// Function to save the books to the library
function saveToLibrary(bookId) {
    // Send a POST request to PHP with the book ID
    fetch('/PHP/bookSave.php?id=' + bookId, {
        method: 'POST'
    })
        .then(function(response) {
            if (response.ok) {
                // Update the library after saving the book
                console.log('Book saved to library');
                alert("Book saved!");
                loadLibrary();
            } else {
                console.error('Error saving book to library');
                alert("Error saving book!");
            }
        })
        .catch(function(error) {
            console.error('Error saving book to library:', error);
            alert("Error saving book!");
        });
}


/*
=======================
====DISPLAY LIBRARY====
=======================
*/
// Function to load and display the books in the users library
function loadLibrary() {
    fetch("/PHP/display.php")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Make sure user is logged in
            if (isLoggedIn === true) {
                // Make sure the response is in the expected structure
                if (Array.isArray(data)) {
                    // Displays the bookIDs in console
                    // For testing
                    console.log("Book IDs:", data);
                    // Loops through the returned books
                    data.forEach(function(bookId) {
                        // Calls the fetchBookDetails function to retrieve the details
                        fetchBookDetails(bookId)
                            .then(function(book) {
                                // Calls the displayBooks function to display the book and its information
                                displayBook(book);
                            })
                            .catch(function(error) {
                                console.error("Error fetching book details:", error);
                            });
                    });
                } else {
                    console.error("Error:", data);
                }
            }
        })
        .catch(function(error) {
            console.error("Error fetching book IDs:", error);
        });
}

// Function to fetch book details from the Google Books API
function fetchBookDetails(bookId) {
    // Fetch book details using the book ID
    return fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data;
        })
        .catch(function(error) {
            console.error("Error fetching book details:", error);
            throw error;
        });
}

// Function to function to display the books
function displayBook(book) {
    const libraryBooks = document.getElementById("libraryBooks");
    const bookInfo = `
      <div class="searchResultDiv">
        <img src="${book.volumeInfo.imageLinks.thumbnail}" class="searchResultCover">
        <h2 class="searchResultTitle">${book.volumeInfo.title}</h2>
        <p class="searchResultAuthor"><strong>Author:</strong> ${book.volumeInfo.authors}</p>
        <button class="saveButton" onclick="viewBook('${book.id}')">View Book</button>
            <form method="post">
        <button class="saveButton" name="saveButton" onclick="deleteBook('${book.id}')">Delete from Library</button>
        </form>
      </div>
    `;
    libraryBooks.innerHTML += bookInfo;
}

/*
=======================
======DELETE BOOKS=====
=======================
*/

// Function to delete the books
function deleteBook(bookId) {
    // Define the request options
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: 'bookId=' + encodeURIComponent(bookId)
    };

    // Send the fetch request
    fetch('/PHP/deleteBook.php', options)
        .then(function(response) {
            // Check the response status
            if (response.ok) {
                console.log('Book deleted successfully');
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

/*
=======================
====NAVIGATION BAR=====
=======================
*/
function toggleDropdown() {
    document.getElementById("DropdownContent").classList.toggle("show");
}

function openSideNav() {
    document.getElementById("SideNav").style.width = "250px";
}

function closeSideNav() {
    document.getElementById("SideNav").style.width = "0";
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *')) {
        var dropdowns = document.getElementsByClassName("DropdownContent");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }

    var sideMenu = document.getElementById("SideNav");
    if (!event.target.matches('.dropbtn') && !event.target.matches('.icon') && !event.target.closest('.SideNav') && sideMenu.style.width === "250px") {
        sideMenu.style.width = "0";
    }
}

/*
=======================
========CONTACT========
=======================
*/
function contactForm() {

    alert("Your message has been sent successfully!");
    return false;

}

/*
------------------------------
----------REFERENCES----------
------------------------------

[1]: I used the Google Books API Documentation to learn how to use the API. URL:https://developers.google.com/books/docs/overview

[2]: I learned how to get the window URL from this page: https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript

[3]: I learned how access and save to local storage: https://stackoverflow.com/questions/34493531/how-to-store-and-retrieve-json-data-into-local-storage, https://www.w3schools.com/jsref/tryit.asp?filename=tryjson_store

[4]: I learned about and how to use JavaScript promises from these two resources: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise, and https://www.w3schools.com/js/js_promise.asp

[5]: I learned about fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch and https://www.w3schools.com/jsref/api_fetch.asp

*/
