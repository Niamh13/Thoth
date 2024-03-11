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

    $query = "SELECT * FROM login WHERE username = '$username';";

    $result = $conn->query($query);

    if($result->num_rows == 1){
        echo'<script type="text/javascript">alert("Username has already in-use");</script>';
        $conn->close();
        exit();
    }
    else{
        $query1 = "INSERT INTO login VALUE('$username', '$password', '$name', '$email');";
        $query1 = "CREATE TABLE '$username'(bookId VARCHAR (255), PRIMARY KEY (bookId));";
        if($conn->query($query1)===TRUE){
            echo'<script type="text/javascript">alert("Success");</script>';
            header('Location: login.html');
            $conn->close();
            exit();
        }
        else{
            echo'<script type="text/javascript">alert("Fail");</script>';
            $conn->close();
            exit();
        }
        
    }
}
