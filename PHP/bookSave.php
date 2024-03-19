<?php

if(isset($_POST['savebutton'])){
    saveBook();
}

function saveBook(){
    // echo variable username
    include login.php;
    echo $username;
   
    //database connect
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = ""; //depends on password
    $dbname = "auth";
    
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);
    
    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    header('Content-Type: application/json');

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case 'POST':
            $bookId = $_GET["id"];
            $url = $_COOKIE['url'];
            $data  = json_decode(file_get_contents($url), true);
            $title = $data['volumeInfo.title'];
            $thumbnail = $data['volumeInfo.imageLinks.thumbnail'];
            $author = $data['volumeInfo.author'];
            $publisher = $data['volumeInfo.publisher'];
            $publishDate = $data['volumeInfo.publishedDate'];
            $pageCount = $data['volumeInfo.pageCount'];
            $category = $data['volumeInfo.categories'];
            $rating = $data['volumeInfo.categories'];

            $query1 = "INSERT INTO '$username' (bookId) VALUES ('$bookId')       ";    
            $query = $conn->prepare('INSERT INTO books (bookId, title, image, author, publisher, publishDate, pageCount, category, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
            $query->execute([$title, $thumbnail, $author, $publisher, $publishDate, $pageCount, $category, $rating]);

            echo json_encode(['message' => 'Book added successfully']);
            if (mysqli_query($conn, $query1)){
                echo "new record created successfful";
            }
            else{
                echo "Error: ".mysqli_error($conn);
            }
            break;

        case 'DELETE':
            $bookId = $_GET["id"];
            $query = $conn->prepare('DELETE FROM books WHERE id=?');
            $query->execute([$bookId]);

            echo json_encode(['message'=> 'Book deleted']);
            break;
    }


}
