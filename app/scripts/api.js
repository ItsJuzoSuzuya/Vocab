export function saveLanguageToDB(language) {
    const url = "http://localhost:9000/db.php";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `language=${encodeURIComponent(language)}`,
    })
        .then((response) => response.json())
        .then((data) => {
            history.back();
        })
        .catch((error) => {
            console.error("Error saving language to DB:", error);
        });
}

export function getLanguages(){
    const url = "http://localhost:9000/db.php";
}
