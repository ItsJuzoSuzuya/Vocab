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

$requestMethod = $_SERVER['REQUEST_METHOD'];

// Extract endpoint and additional data from the URL
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
$endpoint = $uri[1];

$requestData = isset($_POST['requestData']) ? json_decode(($_POST['requestData']), true) : null;

handleRequest($requestMethod, $endpoint, $requestData);

function handleRequest($requestMethod, $endpoint, $requestData) {
    global $conn;

    switch ($requestMethod) {
        case 'GET':
            handleGETRequest($endpoint, $requestData);
            break;

        case 'POST':
            handlePOSTRequest($endpoint, $requestData);
            break;

        default:
            http_response_code(405); // Method Not Allowed
            break;
    }

    $conn->close();
}

function handleGETRequest($endpoint, $requestData) {
    global $conn;

    switch ($endpoint) {
        case 'language':
            $select = $conn->prepare("SELECT language FROM languages");
            $languages = Array();
            executeAndClose($select, $languages);

            if (!empty($languages)) {
                $values = array_column($languages, 'language');
                echo json_encode($values);
            }
            break;

        case 'topic':
            $language = $requestData["language"];
            $langID = 0;
            $topics = Array();

            $selectLangID = $conn->prepare("SELECT langID FROM languages WHERE language = ?");
            $selectLangID->bind_param("s", $language);
            executeAndClose($selectLangID, $langID);

            $insertTopic = $conn->prepare("SELECT topic FROM topics WHERE langID = ?");
            $insertTopic->bind_param("i", $langID);
            executeAndClose($insertTopic, $topics);

            if (!empty($topics)) {
                $topics = array_column($topics, 'topic');
                echo json_encode($topics);
            }
            break;

        default:
            http_response_code(404); // Not Found
            break;
    }
}

function handlePOSTRequest($endpoint, $requestData) {
    global $conn;

    switch ($endpoint) {
        case 'language':
            $language = $requestData["language"];
            $insertLanguage = $conn->prepare("
                INSERT INTO languages(language)
                SELECT ? WHERE NOT EXISTS (SELECT * FROM languages WHERE language = ?)");

            $insertLanguage->bind_param("ss", $language, $language);
            executeAndClose($insertLanguage);

            http_response_code(204);
            break;

        case 'topic':
            $topic = $requestData["topic"];
            $language = $requestData["language"];
            $langID = 0;

            $selectLangID = $conn->prepare("SELECT langID FROM languages WHERE language = ?");
            $selectLangID->bind_param("s", $language);
            executeAndClose($selectLangID, $langID);

            $insertTopic = $conn->prepare("
                INSERT INTO topics(topic, langID)
                SELECT ?, ? WHERE NOT EXISTS (SELECT * FROM topics WHERE topic = ? AND langID = ?)"
            );
            $insertTopic->bind_param("sisi", $topic, $langID, $topic, $langID);
            executeAndClose($insertTopic);

            http_response_code(204);
            break;

        default:
            http_response_code(404); // Not Found
            break;
    }
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
    $result_set = $stmt->get_result();

    if ($result_set !== false) {
        $result = $result_set->fetch_all(MYSQLI_ASSOC);
    }

    $stmt->close();
}

