<?php

header("Access-Control-Allow-Origin: http://loclahost:19006");

$servername = "db";
$username = getenv('MYSQL_USER');
$password = getenv('MYSQL_PASSWORD');
$database = getenv('MYSQL_DATABASE');

$db = new mysqli($servername, $username, $password, $database, 3306);

// Check for errors in database connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

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
    http_response_code(200);
}

$stmt->close(); // Close the prepared statement
$db->close(); // Close the database connection
