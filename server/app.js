const express = require('express');
require('dotenv').config();

// eslint-disable-next-line import/no-unresolved
const router = require('./routes');

const app = express();

app.use(express.json());
app.use('/books', router);
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => res.send('Home Page'));

module.exports = app;
