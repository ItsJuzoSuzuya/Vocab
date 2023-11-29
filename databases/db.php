<?php

header("Access-Control-Allow-Origin: http://localhost:19006");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "db";
$username = getenv('MYSQL_USER');
$password = getenv('MYSQL_PASSWORD');
$database = getenv('MYSQL_DATABASE');

$conn = new mysqli($servername, $username, $password, $database, 3306);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$requestType = $_POST['requestType'];
$requestData = isset($_POST['requestData']) ? json_decode(($_POST['requestData']), true) : null;

handleRequest($requestType, $requestData);

function handleRequest($requestType, $requestData){
    global $conn;

    switch ($requestType) {
        case 'saveLanguage':
            $language = $requestData["language"];
            // Use prepared statement to prevent SQL injection
            $insertLanguage = $conn->prepare("
                INSERT INTO languages(language)
                SELECT ? WHERE NOT EXISTS (SELECT * FROM languages WHERE language = ?)");

            $insertLanguage->bind_param("ss", $language, $language);
            executeAndClose($insertLanguage);
            break;

        case 'saveTopic':
            $topic = $requestData["topic"];
            $language= $requestData["language"];
            $langID = 0;

            $selectLangID = $conn->prepare("SELECT langID FROM languages WHERE language = ?");
            $selectLangID->bind_param("s", $language);
            executeAndClose($selectLangID, $langID);

            $insertTopic = $conn->prepare("
                INSERT INTO topics(topic, langID)
                SELECT ?, ? WHERE NOT EXISTS (SELECT * FROM topics WHERE topic = ? AND langID = ?)"
            );

            $insertTopic->bind_param("siss", $topic, $langID, $topic, $langID);
            executeAndClose($insertTopic);
            break;
    }
    $conn->close();
}
function checkForExecutionError($statement) {
    // Check for errors in the SQL execution
    if ($statement->error) {
        echo 'Error: ' . $statement->error;
        http_response_code(500);
    } else {
        http_response_code(200);
    }
}

function executeAndClose($stmt, &$result = null) {
    $stmt->execute();
    checkForExecutionError($stmt);
    if ($result !== null) {
        $stmt->bind_result($result);
        $stmt->fetch();
    }
    $stmt->close();
}
