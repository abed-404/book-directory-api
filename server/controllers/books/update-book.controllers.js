/* eslint-disable prefer-const */
const { readJson, updateJson } = require('../../database');
const { validateBook } = require('../../util');

module.exports = async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const books = JSON.parse(await readJson());
    const index = books.findIndex((el) => el.id === parseInt(req.params.id, 10));
    if (index === -1) {
      return res.status(400).json({ massage: `user with id: ${req.params.id} can not been found` });
    }
    let title; let author; let edition; let
      image;
    ({
      title = books[index].title, author = books[index].author, edition = books[index].edition,
      image = books[index].image,
    } = req.body);
    books[index] = {
      id: books[index].id, title, author, edition, image,
    };
    updateJson(books);
    return res
      .status(201)
      .json({
        massage: `user with id:${req.params.id} name has been updated successfully`,
        'newly uodated book': books[index],
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
