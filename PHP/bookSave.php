<?php

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['username'])) {
    $bookId = $_GET['id'];
    $username = $_SESSION['username'];

    // Database connection
    $host = "sql109.infinityfree.com";
    $dbusername = "if0_35864125";
    $dbpassword = "superThoth";
    $dbname = "if0_35864125_auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    //check database connection//
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the book ID already exists in the user's table
    $checkQuery = "SELECT * FROM $username WHERE bookId = '$bookId'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        echo "Book already exists in the library.";
    } else {
        // Insert the book ID into the user's table
        $insertQuery = "INSERT INTO $username (bookId) VALUES ('$bookId')";
        if ($conn->query($insertQuery) === TRUE) {
            echo "Book saved successfully.";
        } else {
            echo "Error: " . $insertQuery . "<br>" . $conn->error;
        }
    }

    $conn->close();
} else {
    echo "Unauthorized access.";
}
?>
