const { updateJson, readJson } = require('../../database');
const { CostumError } = require('../errors/server-error');

module.exports = async (req, res, next) => {
  try {
    // const allBooks = JSON.parse(await readJson());
    const books = JSON.parse(await readJson());
    const index = books.findIndex((el) => el.id === parseInt(req.params.id, 10));
    // const books = allBooks.filter((el) => el.id !== parseInt(req.params.id, 10));
    if (index === -1) {
      throw CostumError(`user with id: ${req.params.id} can not been found`, 404);
    } else {
      books[index].isDeleted = true;
      updateJson(books);
      return res
        .status(201)
        .json({ massage: `user with id: ${req.params.id} name has been Deleted successfully` });
    }
  } catch (err) {
    return next(err);
  }
};
