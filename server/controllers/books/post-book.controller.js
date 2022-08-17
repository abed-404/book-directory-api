/* eslint-disable prefer-const */
const { readJson, updateJson } = require('../../database');
const { validateBook } = require('../../util');

module.exports = async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const books = JSON.parse(await readJson());
    let title; let author; let edition; let image;
    ({
      title = 'default', author = 'default', edition = 3, image = 'default img src',
    } = req.body);
    const newBook = {
      id: books.length + 1, title, author, edition, image,
    };
    books.push(newBook);
    updateJson(books);
    return res.status(201).json({ massage: 'books has been added successfully', 'newly added book': newBook });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
