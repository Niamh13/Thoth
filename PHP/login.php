<?php
session_start();

include("connection.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    // retrieve data
    $name = $_POST['fullName'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['confirmPassword'];

    //starting session + variables
    $_SESSION["username"] = $username;

   

    $query = "SELECT * FROM login WHERE username = '$username';";

    $result = $conn->query($query);

    if($result->num_rows == 0){
        echo'<script type="text/javascript">alert("Username not found");</script>';
        $conn->close();
        die;
    }
    else{
        $query1 = "INSERT INTO login VALUE('$username', '$password', '$name', '$email');";
        $query1 = "CREATE TABLE '$username'(bookId VARCHAR (255), PRIMARY KEY (bookId));";
        if($conn->query($query1)===TRUE){
            echo'<script type="text/javascript">alert("Success");</script>';
            header('Location: login.html');
            $conn->close();
            die;
        }
        else{
            echo'<script type="text/javascript">alert("Fail");</script>';
            $conn->close();
            die;
        }
        
    }
}

if(isset($_POST['logoutButton'])){
    logOut();
}

function logOut(){
    unset($_SESSION['username']);
    header("Location: login.html");
    die;
}