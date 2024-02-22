<?php

if (empty($_POST["fullName"])){
    die("Name is required");
}

if (! filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    die("Valid email is required");    
}

if (strlen ($_POST["password"]) < 7){
    die("Password must be at least 7 characters");
}

if (!preg_match("/[a-z]/i", $_POST["password"])) {
    die("Password must contain at least one letter");
}

if (!preg_match("/[0-9]/i", $_POST["password"])) {
    die("Password must contain at least one number");
}

if ($_POST["password"] !== $_POST["Confirm_Password"]) {
    die ("Passwords must match!");
}

print_r($_POST);