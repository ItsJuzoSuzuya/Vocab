export function fetchData(requestType, requestData) {
    let formBody = new URLSearchParams(
        {
            requestType: requestType,
            requestData: JSON.stringify(requestData),
        }
    );

    return fetch('http://localhost:8080/db.php', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if(data != null)
                return data;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}