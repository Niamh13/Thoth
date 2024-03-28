<?php

 //database connect
 $host = "localhost";
 $dbusername = "root";
 $dbpassword = ""; //depends on password
 $dbname = "auth";

 $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

 if($conn->connect_error){
     die("Connection failed: ".$conn->connect_error);
 }