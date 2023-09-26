export function saveLanguageToDB(language) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/db.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Send language as POST parameter
    let data = "language=" + encodeURIComponent(language);
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
                history.back();
        }
    };
}

