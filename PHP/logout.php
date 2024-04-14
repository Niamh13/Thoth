<?php
session_start();

// Log the logout event
// Consider logging to a file or database instead of console
error_log("User logged out: " . $_SESSION['username']);

// Destroy the session
session_unset();
session_destroy();

// Redirect to login page
header("Location: /login.html");
exit; // Ensure script termination
