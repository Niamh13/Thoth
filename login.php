<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // retrieve data
    $username = $_POST['username'];
    $password = $_POST['password'];

    //database connect
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $query = "SELECT * FROM login WHERE username = '$username' AND password = '$password'";

    $result = $conn->query($query);

    if($result->num_rows == 1){
        header('Location: library.html');
        exit();
    }
    else{
        header('Location: index.html');
        exit();
    }
}

