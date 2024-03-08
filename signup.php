<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // retrieve data
    $name = $_POST['fullName'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['confirmPassword'];

    //database connect
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = ""; //depends on password
    $dbname = "auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    $query = "INSERT INTO login VALUE('$username', '$password', '$name', '$email');";

    $result = $conn->query($query);

    if($result->num_rows == 1){
        header('Location: Login.html');
        exit();
    }
    else{
        header('Location: index.html');
        exit();
    }
}
