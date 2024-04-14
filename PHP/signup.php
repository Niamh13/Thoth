<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // retrieve data
    $name = $_POST['fullName'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $passwordC = $_POST['confirmPassword'];

    // database connect
    $host = "sql109.infinityfree.com";
    $dbusername = "if0_35864125";
    $dbpassword = "superThoth";
    $dbname = "if0_35864125_auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if ($passwordC == $password) {
        $query = "SELECT * FROM login WHERE username = '$username'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            echo '<script type="text/javascript">alert("Username is already in use"); window.location.href = "/signup.html";</script>';
        } else {
            $query1 = "INSERT INTO login VALUES ('$username', '$password', '$name', '$email')";
            if ($conn->query($query1) === TRUE) {
                $createTableQuery = "CREATE TABLE `$username` (bookId VARCHAR(255))";
                if ($conn->query($createTableQuery) === TRUE) {
                    //echo '<script type="text/javascript">alert("Success");</script>';
                    header('Location: /login.html');
                    exit();
                } else {
                    echo '<script type="text/javascript">alert("Fail to create user table"); window.location.href = "/signup.html";</script>';
                    header('Location: /signup.html');
                }
            } else {
                echo '<script type="text/javascript">alert("Fail to insert user data"); window.location.href = "/signup.html";</script>';
            }
        }
    } else {
        echo '<script type="text/javascript">alert("Passwords entered are not the same"); window.location.href = "/signup.html";</script>';
    }
    $conn->close();
}
