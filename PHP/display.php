<?php
// Include login.php to get the username
include "login.php";
$loggIn = $_SESSION['loggIn'];
if(loggIn != true){
    $loggIn = false;
    $_SESSION['loggIn'] = $loggIn;
}

// Check if the user is logged in
if ($loggIn) {
    // Get the username from the session
    $username = $_SESSION["username"];

    // Database connection settings
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "Timmy2013";
    $dbname = "auth";

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
} else if (loggIn == false) {
    echo '<script type="text/javascript">alert("Please log in"); window.location.href = "/signup.html";</script>';
} else {
    echo '<script type="text/javascript">console.log("ERROR")</script>';
}

?>
