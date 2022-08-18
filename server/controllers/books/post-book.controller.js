/* eslint-disable prefer-const */
const { readJson, updateJson } = require('../../database');
const { validateBook } = require('../../util');

module.exports = async (req, res, next) => {
  try {
    await validateBook(req.body, req.method);
    const books = JSON.parse(await readJson());
    let title; let author; let edition; let image;
    ({
      title = 'default', author = 'default', edition = 3, image = 'default img src',
    } = req.body);
    let currentLastId = books.at(-1).id; // to aquire the uniquness of the id
    const newBook = {
      id: currentLastId + 1, isDeleted: false, title, author, edition, image,
    };
    books.push(newBook);
    updateJson(books);
    return res.status(201).json({ massage: 'books has been added successfully', added_book: newBook });
  } catch (err) {
    return next(err);
  }
};
