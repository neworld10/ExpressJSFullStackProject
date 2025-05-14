// const express = require('express');
// const routes = require('./route/index.js');
// const cors = require('cors');
import express from 'express';
import routes from './route/index.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors('*'));

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});