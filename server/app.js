const express = require('express');
require('dotenv').config();

const app = express();
const router = require('./Routes');

app.use(express.json());
app.use('/books', router);
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Home Page'));

module.exports = app;
