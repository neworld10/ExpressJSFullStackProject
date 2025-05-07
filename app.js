import express, { request } from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var data = {
    name: 'neworld'
}

app.get('/', (request, response) => {
    return response.send('Hello World!');
});

app.post('/users', (request, response) => {
    const name = request.body.name;
    const email = request.body.email;

    return response.send(`${name} ${email}`);
});

app.put('/users/:name', (request, response) => {
    const name = request.params.name;
    const email = request.body.email;

    const target = data.name === name ? data : null;
    if (target) {
        target.email = email;
        return response.send(target);
    } else {
        return response.status(404).send('User not found');
    }
})

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`);
});