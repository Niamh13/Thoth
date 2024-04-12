var isLoggedIn = false;

/*
=======================
====SEARCH FUNCTION====
=======================
*/
function search() {
    const searchInput = document.getElementById("search").value;
    if (searchInput === "") {
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
function viewBook(bookId) {
    window.location.href = `book.html?id=${bookId}`;
}

/*
=======================
===DISPLAY BOOK PAGE===
=======================
*/
function getBook() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    const urlPromise = fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayBookDetails(data);
            console.log(data);
        })
        .catch(function (error) {
            console.error("Error fetching book details:", error);
        });

    document.cookie = "url";

    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayBookDetails(data);
            console.log(data);
        })
        .catch(function (error) {
            console.error("Error fetching book details:", error);
        });


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
function saveToLibrary(bookId) {
    // Send a POST request to your PHP backend with the book ID
    fetch('/PHP/bookSave.php?id=' + bookId, {
        method: 'POST'
    })
        .then(response => {
            if (response.ok) {
                console.log('Book saved to library');
                alert("Book saved!");
            } else {
                console.error('Error saving book to library');
                alert("Error saving book!");
            }
        })
        .catch(error => {
            console.error('Error saving book to library:', error);
            alert("Error saving book!");
        });
}


function loadLibrary() {
    $(document).ready(function () {
        $.ajax({
            url: "/PHP/display.php",
            dataType: "json",
            success: function (data) {
                // Log the retrieved book IDs to the console
                console.log("Book IDs:", data);
                // Process the book IDs as needed
                // For example, you can iterate over the IDs and perform further actions
                data.forEach(function (bookId) {
                    console.log("Book ID:", bookId);
                    // Perform actions with each book ID
                    // For example, you can fetch book details using the ID
                    // Or display the IDs on the webpage
                });
            },
            error: function (xhr, status, error) {
                // Log any errors to the console
                console.error("Error fetching book IDs:", status, error);
            }
        });
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
        <form method="DELETE">
        <button class="saveButton" name="saveButton">Delete from Library</button>
        </form>
      </div>
    `;
    libraryBooks.innerHTML += bookInfo;
}

/*
------------------------------
----------Navigation----------
------------------------------
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

function logout() {
    alert("You have been logged out.");
    window.location.href = 'index.html';
}

/*
------------------------------
----------REFERENCES----------
------------------------------

[1]: I used the Google Books API Documentation to learn how to use the API. URL:https://developers.google.com/books/docs/overview

[2]: I learned how to get the window URL from this page: https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript

[3]: I learned how access and save to local storage: https://stackoverflow.com/questions/34493531/how-to-store-and-retrieve-json-data-into-local-storage, https://www.w3schools.com/jsref/tryit.asp?filename=tryjson_store

*/
