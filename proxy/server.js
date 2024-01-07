const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.post('*', (req, res) => {
    const requestData = req.body.requestData;
    const requestPath = req.url;
    const endpoint = requestPath.substring(1);
    const destinationURL = `http://web:8080/${endpoint}`;

    console.log(requestData);

    request.post(
        {
            url: destinationURL,
            json: { requestData },
        },
        (error, response, body) => {
            if (error) {
                console.log(error.message);
                return  res.status(500).send(error.message);
            }

            res.json(body)
        }
    )
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
