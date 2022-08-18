/* eslint-disable prefer-const */
const { readJson, updateJson } = require('../../database');
const { validateBook } = require('../../util');
const { CostumError } = require('../errors/server-error');

module.exports = async (req, res, next) => {
  try {
    await validateBook(req.body, req.method);
    const books = JSON.parse(await readJson());
    const index = books.findIndex((el) => el.id === parseInt(req.params.id, 10));
    if (index === -1 || books[index].isDeleted === true) {
      throw CostumError(`user with id: ${req.params.id} can not been found`, 404);
    }
    let title; let author; let edition; let
      image;
    ({
      title = books[index].title, author = books[index].author, edition = books[index].edition,
      image = books[index].image,
    } = req.body);
    books[index] = {
      id: books[index].id, isDeleted: false, title, author, edition, image,
    };
    updateJson(books);
    return res
      .status(200)
      .json({
        massage: `user with id:${req.params.id} name has been updated successfully`,
        updated_book: books[index],
      });
  } catch (err) {
    return next(err);
  }
};
