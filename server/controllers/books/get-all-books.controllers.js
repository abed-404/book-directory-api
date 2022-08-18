const { readJson } = require('../../database');

module.exports = async (req, res, next) => {
  try {
    const books = JSON.parse(await readJson());
    return res.json(books.filter((el) => el.isDeleted !== true));
  } catch (err) {
    return next(err);
  }
};
