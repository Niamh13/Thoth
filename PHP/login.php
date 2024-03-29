<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // retrieve data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // starting session + variables
    $_SESSION["username"] = $username;

    // database connect
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "Timmy2013"; // depends on password
    $dbname = "auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the table exists
    $checkTableQuery = "SHOW TABLES LIKE '$username'";
    $checkTableResult = $conn->query($checkTableQuery);

    if ($checkTableResult->num_rows > 0) {
        // Table exists, check credentials
        $query = "SELECT * FROM login WHERE username = '$username' AND password = '$password'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            // Credentials match, log in
            header('Location: /Thoth-working-php 3/library.html');
            exit();
            // Perform additional actions for successful login
        } else {
            // Credentials don't match
            echo '<script type="text/javascript">alert("Incorrect username or password");</script>';
        }
    } else {
        // Table doesn't exist
        echo '<script type="text/javascript">alert("Username not found");</script>';
    }

    $conn->close();
}

if (isset($_POST['logoutButton'])) {
    logOut();
}

function logOut()
{
    unset($_SESSION['username']);
    header("Location: login.html");
    die;
}
