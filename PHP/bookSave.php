<?php

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['username'])) {
    // Include login.php to get the username
    include "login.php";
    $bookId = $_GET['id'];
    $username = $_SESSION['username'];

    $loggIn = $_SESSION['loggIn'];
    if (loggIn != true) {
        $loggIn = false;
        $_SESSION['loggIn'] = $loggIn;
    }

    // Database connection
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "Timmy2013";
    $dbname = "auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else {
        echo "Unauthorized access.";
    }

    if (loggIn == true) {
        // Check if the book ID already exists in the user's table
        $checkQuery = "SELECT * FROM $username WHERE bookId = '$bookId'";
        $checkResult = $conn->query($checkQuery);


        // Insert the book ID into the user's table
        $insertQuery = "INSERT INTO $username (bookId) VALUES ('$bookId')";
    }
    else if (loggIn == false) {
        echo '<script type="text/javascript">alert("Please log in"); window.location.href = "Beta2/login.html";</script>';
}
    else {
        echo '<script type="text/javascript">console.log("ERROR")</script>';
}
    $conn->close();
}
?>
