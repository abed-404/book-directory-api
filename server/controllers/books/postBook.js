/* eslint-disable prefer-const */
const { openJson, updateJson } = require('../../Database');
const { validateBook } = require('../../Middlewares');

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
  res.status(201, { 'Content-Type': 'application/json' }).send({ massage: 'books has been added successfully', 'newly added book': newBook });
};
const addBook = (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return openJson(req, res, postAction);
};

module.exports = { addBook };
