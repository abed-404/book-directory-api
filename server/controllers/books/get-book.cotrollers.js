const { readJson } = require('../../database');

module.exports = async (req, res) => {
  try {
    const books = JSON.parse(await readJson());
    const book = books.find((el) => el.id === parseInt(req.params.id, 10));
    if (!book) {
      res.status(404).json({ massage: `user with id: ${req.params.id} can not been found` });
    } else { res.json(book); }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
