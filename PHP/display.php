<?php
// Start the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Include login.php to get the username
include "login.php";

// Check if the user is logged in
if (isset($_SESSION['loggIn']) && $_SESSION['loggIn']) {

    // Check if the username is set in the session
    if (isset($_SESSION["username"])) {
        // Get the username from the session
        $username = $_SESSION["username"];

        // Database connection settings
        $host = "sql109.infinityfree.com";
        $dbusername = "if0_35864125";
        $dbpassword = "superThoth";
        $dbname = "if0_35864125_auth";

        // Establish a database connection
        $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

        // Check the database connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Query to fetch book IDs for the user
        $sql = "SELECT bookId FROM $username";
        $result = $conn->query($sql);

        // Fetch book IDs and store them in an array
        $bookIds = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $bookIds[] = $row['bookId'];
            }
        }

        // Close the database connection
        $conn->close();

        // Return book IDs as JSON
        header('Content-Type: application/json');
        echo json_encode($bookIds);
    }
}
?>
