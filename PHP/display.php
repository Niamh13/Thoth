<?php
// echo variable username
include login.php;
echo $username;

//database connect
$host = "localhost";
$dbusername = "root";
$dbpassword = ""; //depends on password
$dbname = "auth";

$conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
}

$query = "SELECT * FROM books INNER JOIN '$username' ON books.bookId = '$username'.bookId;";
$query->execute();
