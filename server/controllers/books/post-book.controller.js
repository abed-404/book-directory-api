/* eslint-disable prefer-const */
const { readJson, updateJson } = require('../../database');
const { validateBook } = require('../../util');

module.exports = async (req, res) => {
  try {
    await validateBook(req.body);
    const books = JSON.parse(await readJson());
    let title; let author; let edition; let image;
    ({
      title = 'default', author = 'default', edition = 3, image = 'default img src',
    } = req.body);
    let currentLastId = books.at(-1).id; // to aquire the uniquness of the id
    const newBook = {
      id: currentLastId + 1, title, author, edition, image,
    };
    books.push(newBook);
    updateJson(books);
    return res.status(201).json({ massage: 'books has been added successfully', 'newly added book': newBook });
  } catch (err) {
    if (err.code === 'ENOENT') return res.status(500).send(err.message);
    return res.status(400).send(err.message);
  }
};
