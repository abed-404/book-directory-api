const { updateJson, readJson } = require('../../database');

module.exports = async (req, res) => {
  try {
    const allBooks = JSON.parse(await readJson());
    const books = allBooks.filter((el) => el.id !== parseInt(req.params.id, 10));
    if (books.length === allBooks.length) {
      res
        .status(400)
        .json({ massage: `user with id: ${req.params.id} can not been found` });
    } else {
      updateJson(books);
      res
        .status(201)
        .json({ massage: `user with id: ${req.params.id} name has been Deleted successfully` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
