const { readJson } = require('../../database');
const { CostumError } = require('../errors/server-error');
// eslint-disable-next-line no-unused-vars
module.exports = async (req, res, next) => {
  try {
    const books = JSON.parse(await readJson());
    const book = books.find((el) => el.id === parseInt(req.params.id, 10));
    if (!book || book.isDeleted === true) {
      throw CostumError(`user with id: ${req.params.id} can not been found`, 404);
    }
    return res.json(book);
  } catch (err) {
    return next(err);
  }
};
