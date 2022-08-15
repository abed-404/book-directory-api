const express = require('express');

const app = express();
const port = 3000;
const booksRouter = require('./routes/books');

app.use(express.json());
app.use('/books', booksRouter);

app.get('/', (req, res) => res.send('Home Page'));
app.listen(port, () => console.log(`Server is listening in port: ${port}...`));
