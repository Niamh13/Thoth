<?php
    $fullName = $_POST['fullName'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    if (strlen ($_POST["password"]) < 7){
        die("Password must be at least 7 characters");
    }
    
 
    
    print_r($_POST);   

    //Database connection
    $conn = new mysqli('localhost','root','','signup');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }else{
            $stmt = $conn->prepare("insert into registration (firstName, userName, email,password, confirmpassword) 
                values(?,?,?,?,?)");
                $stmt->bind_param("sssss",$fullName,$username,$email,$password,$confirmPassword);
                $stmt->execute();
                echo "You are registered now!";
                $stmt -> close();
                $conn -> close();
    }
    


 
?>
