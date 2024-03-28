<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // retrieve data
    $name = $_POST['fullName'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $passwordC = $_POST['confirmPassword'];

    //database connect
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = ""; //depends on password
    $dbname = "auth";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if($conn->connect_error){
        die("Connection failed: ".$conn->connect_error);
    }

    if($passwordC.equals($password)){

        $query = "SELECT * FROM login WHERE username = '$username';";
        $result = $conn->query($query);

        if($result->num_rows == 1){
            echo'<script type="text/javascript">alert("Username has already in-use");</script>';
            exit();
        }

        else{
            $query1 = "INSERT INTO login VALUE('$username', '$password', '$name', '$email');";
            $conn->query($query1);
            $query1 = "CREATE TABLE '$username'(bookId VARCHAR (255));";
            if($conn->query($query1)===TRUE){
                //echo'<script type="text/javascript">alert("Success");</script>';
                header('Location: login.html');
                exit();
            }
            else{
                echo'<script type="text/javascript">alert("Fail");</script>';
                exit();
            }
            
        }

    }

    else{
        echo'<script type="text/javascript">alert("Passwords entered are not the Same");</script>';
        exit();
    }

    

    

    
    
}

