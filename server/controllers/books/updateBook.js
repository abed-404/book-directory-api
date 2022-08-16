/* eslint-disable prefer-const */
const { openJson, updateJson } = require('../../Database');
const { validateBook } = require('../../Middlewares');

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
const updateBook = (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return openJson(req, res, putAction);
};

module.exports = { updateBook };
