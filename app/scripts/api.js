export function saveLanguage(language) {
    let formBody = {
            requestData: language,
        };

    return fetch('http://localhost:3000/language', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            if (response.status !== 204) {
                return response.json();
            } else {
                return null;
            }
        })
        .then(data => {
            console.log(data);

            if (data != null && Object.keys(data).length !== 0) {
                return data;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export function getLanguages(){
    return fetch('http://localhost:8080/language')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
}

export function getTopics(language){
    return fetch('http://localhost:8080/topic?language=' + language)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
}