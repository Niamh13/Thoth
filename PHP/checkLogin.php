<?php
// Start the session
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Check if the user is logged in
$loggedIn = isset($_SESSION['username']);

// Return JSON response
header('Content-Type: application/json');
echo json_encode(['loggedIn' => $loggedIn]);

?>
