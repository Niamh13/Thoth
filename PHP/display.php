<?php

session_start();

function arrayDisplay()
{

    // Include login.php to get the username
    include "login.php";
    $username = $_SESSION["username"];

    // Database connection
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "Timmy2013"; // depends on your MySQL configuration
    $dbname = "auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Initialize an array to store book IDs
    $bookIds = array();

    // Query to fetch book IDs for the given user
    $sql = "SELECT book_id FROM books WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Loop through each row and add the book IDs to the array
        while ($row = $result->fetch_assoc()) {
            $bookIds[0] = $row['book_id'];
        }
    }

    echo '<script>window.location.href = `book.html?id=${bookIds}`;</script>';

    // Close the connection
    $conn->close();
}
