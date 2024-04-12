<?php
session_start();

unset($_SESSION['username']);
echo '<script>console.log("Logged out Successfully"); window.location.href = "/Beta2/login.html";</script>';

die;