<?php
// Start the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Include login.php to get the username
include "checkLogin.php";

// Check if the user is logged in
if (isset($_SESSION["username"])) {
    // Get the username from the session
    $username = $_SESSION["username"];

    // Check if the book ID is provided in the request
    if (isset($_POST['bookId'])) {
        // Get the book ID from the request
        $bookId = $_POST['bookId'];

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

        // Prepare and execute SQL statement to delete the book from the user's library
        $sql = "DELETE FROM `$username` WHERE bookId = ?";
        $stmt = $conn->prepare($sql);

        // Check if the prepare statement was successful
        if ($stmt === false) {
            die("Prepare failed: " . $conn->error);
        }

        // Bind parameters
        $stmt->bind_param("s", $bookId);

        // Execute the statement
        if ($stmt->execute() === false) {
            die("Execute failed: " . $stmt->error);
        }

        // Check if any rows were affected
        if ($stmt->affected_rows > 0) {
            echo "Book deleted successfully.";
        } else {
            echo "No book found with ID: $bookId";
        }

        // Close the statement and database connection
        $stmt->close();
        $conn->close();
    }
}
?>
