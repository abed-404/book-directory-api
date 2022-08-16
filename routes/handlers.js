/* eslint-disable prefer-const */
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const filePath = path.join(__dirname, '..', 'books.json');

const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    author: Joi.string().min(5),
    edition: Joi.number(),
  });
  return schema.validate(book);
};

const updateJson = (books, res) => {
  fs.writeFile(filePath, JSON.stringify(books), (err) => {
    if (err) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    }
  });
};

// Actions
const getOneAction = (req, res, data) => {
  const books = JSON.parse(data);
  const book = books.find((el) => el.id === parseInt(req.params.id, 10));
  if (!book) {
    res.status(404, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
  } else { res.status(200, { 'Content-Type': 'application/json' }).send(book); }
};
const getAllAction = (req, res, data) => {
  const books = JSON.parse(data);
  res.status(200, { 'Content-Type': 'application/json' }).send(books);
};
const postAction = (req, res, data) => {
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
};
const putAction = (req, res, data) => {
  const books = JSON.parse(data);
  const index = books.findIndex((el) => el.id === parseInt(req.params.id, 10));
  if (index === -1) {
    res.status(400, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
  } else {
    let title; let author; let edition; let
      image;
    ({
      title = books[index].title, author = books[index].author, edition = books[index].edition,
      image = books[index].image,
    } = req.body);
    books[index] = {
      id: books[index].id, title, author, edition, image,
    };
    updateJson(books, res);
    res.status(201, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} name has been updated successfully`, 'newly uodated book': books[index] });
  }
};
const deleteAction = (req, res, data) => {
  const allBooks = JSON.parse(data);
  const books = allBooks.filter((el) => el.id !== parseInt(req.params.id, 10));
  if (books.length === allBooks.length) {
    res.status(400, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
  } else {
    updateJson(books, res);
    res.status(201, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} name has been Deleted successfully` });
  }
};
// interact with database
const openJson = (req, res, cb) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      cb(req, res, data);
    }
  });
};
// Handlers
const getOneHandler = (req, res) => {
  openJson(req, res, getOneAction);
};
const getAllHandler = (req, res) => {
  openJson(req, res, getAllAction);
};
const postHandler = (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return openJson(req, res, postAction);
};
const putHandler = (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return openJson(req, res, putAction);
};
const deletHandler = (req, res) => {
  openJson(req, res, deleteAction);
};
module.exports = {
  getOneHandler, getAllHandler, postHandler, putHandler, deletHandler,
};
