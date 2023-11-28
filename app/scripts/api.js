export function saveLanguageToDB(language) {
    const url = "http://localhost:8080/db.php";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `language=${encodeURIComponent(language)}`,
    })
        .then((data) => {
            // Handle the response data as needed
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error("Error saving language to DB:", error);
        });
}

export function getLanguages() {
    const url = "http://localhost:8080/db.php";

    fetch(url, {
        method: "GET", // Assuming you are retrieving languages, use GET
        headers: {
            "Content-Type": "application/json", // Change to JSON if the response is JSON
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response data as needed
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error("Error retrieving languages:", error);
        });
}
