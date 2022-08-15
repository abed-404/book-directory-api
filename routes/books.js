/* eslint-disable prefer-const */
const express = require('express');
const fs = require('fs');
const path = require('path');

// let books = [{ id: 1, name: 'book1' }, { id: 2, name: 'book2' }, { id: 3, name: 'book3' }];
const router = express.Router();
router.use(express.json());
const filePath = path.join(__dirname, '..', 'books.json');

const updateJson = (books, res) => {
  fs.writeFile(filePath, JSON.stringify(books), (err) => {
    if (err) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    }
  });
};
router.get('/', (req, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      const books = JSON.parse(data);
      res.status(200, { 'Content-Type': 'application/json' }).send(books);
    }
  });
});
router.get('/:id', (req, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      const books = JSON.parse(data);
      const book = books.find((el) => el.id === parseInt(req.params.id, 10));
      if (!book) {
        res.status(404, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
      } else { res.status(200, { 'Content-Type': 'application/json' }).send(book); }
    }
  });
});
router.post('/', (req, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      let title; let author; let edition; let
        image;
      ({
        title = 'default', author = 'default', edition = 3, image = 'default img src',
      } = req.body);
      const books = JSON.parse(data);
      const newBook = {
        id: books.length + 1, title, author, edition, image,
      };
      books.push(newBook);
      updateJson(books, res);
      res.status(201, { 'Content-Type': 'application/json' }).send({ massage: 'books has been updated successfully', 'newly added book': newBook });
    }
  });
});
router.put('/:id', (req, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      const books = JSON.parse(data);
      let book = books.find((el) => el.id === parseInt(req.params.id, 10));
      if (!book) {
        res.status(400, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
      } else {
        let title; let author; let edition; let
          image;
        ({
          title = book.title, author = book.author, edition = book.edition,
          image = book.image,
        } = req.body);
        book = {
          id: book.id, title, author, edition, image,
        };
        updateJson(books, res);
        res.status(201, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} name has been updated successfully`, 'newly uodated book': book });
      }
    }
  });
});
router.delete('/:id', (req, res) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      const allBooks = JSON.parse(data);
      const books = allBooks.filter((el) => el.id !== parseInt(req.params.id, 10));
      if (books.length === allBooks.length) {
        res.status(400, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
      } else {
        updateJson(books, res);
        res.status(201, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} name has been Deleted successfully` });
      }
    }
  });
});

module.exports = router;
