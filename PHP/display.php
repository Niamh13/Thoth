<?php

session_start();

function arrayDisplay()
{
    // Include login.php to get the username
    include "login.php";
    $username = $_SESSION["username"];
    $loggIn = $_SESSION["loggIn"];

    // Database connection
    $host = "sql109.infinityfree.com";
    $dbusername = "if0_35864125";
    $dbpassword = "superThoth";
    $dbname = "if0_35864125_auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($loggIn == true) {
        // Initialize an array to store book IDs
        $bookIds = array();

        // Query to fetch book IDs for the given user
        $sql = "SELECT book_id FROM books WHERE username = '$username'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Loop through each row and add the book IDs to the array
            while ($row = $result->fetch_assoc()) {
                $bookIds[] = $row['book_id'];
            }
        }

        // Close the connection
        $conn->close();

        // Return book IDs as JSON
        header('Content-Type: application/json');
        echo json_encode($bookIds);
    } else if ($loggIn == false) {
        echo '<script>alert("Sorry not logged in"); window.location.href =`login.html`;</script>';
    }
}

// Call the function
arrayDisplay();
?>
