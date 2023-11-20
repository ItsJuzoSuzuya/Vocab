<?php
header("Access-Control-Allow-Origin: *");
include "./define.php";

$db = new mysqli(HOST, USER, PASSWORD, DB_NAME, PORT);

// Check for errors in database connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // This is a preflight request, respond with the allowed methods and headers
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(204);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["language"])) {
    $selectedLanguage = $_POST["language"];

    // Use prepared statement to prevent SQL injection
    $stmt = $db->prepare("INSERT INTO languages(language) SELECT ? WHERE NOT EXISTS (SELECT * FROM languages WHERE language = ?)");
    $stmt->bind_param("ss", $selectedLanguage, $selectedLanguage);
    $stmt->execute();

    // Check for errors in the SQL execution
    if ($stmt->error) {
        echo 'Error: ' . $stmt->error;
        http_response_code(500); // Internal Server Error
    } else {
        echo 'Fresh';
        http_response_code(200);
    }

    $stmt->close(); // Close the prepared statement
} else {
    http_response_code(404);
}

$db->close(); // Close the database connection
