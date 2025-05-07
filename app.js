import express, { request } from 'express';
import timeout from 'connect-timeout';
const app = express();
const port = 3000;

app.use(timeout('5s'));

app.get('/', (request, response) => {
    setTimeout(() => {
        response.send(`Hello World! after 10 secs.`);
    }, 6000);
});

app.use((request, response, next) => {
    if (!request.timedout) {
        next();
    } else {
        response.status(503).send({
            status: 503,
            message: 'Request_timeout',
            data: null,
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`);
});