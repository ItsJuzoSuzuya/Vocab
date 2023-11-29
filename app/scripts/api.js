export function fetchData(requestType, requestData) {
    let formBody = new URLSearchParams(
        {
            requestType: requestType,
            requestData: JSON.stringify(requestData),
        }
    );

    console.log(requestData["language"]);
    fetch('http://localhost:8080/db.php', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
    })
        .then(response => response.text())
        .then(data => {
            // Handle the response data
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}