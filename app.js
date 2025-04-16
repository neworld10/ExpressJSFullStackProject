import express from 'express';
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    return response.send('Hello World!');
});

app.listen(port, () => {
    console.log('Example app listen on port ${port})');
});