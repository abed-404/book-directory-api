const { readJson } = require('../../database');

module.exports = async (req, res) => {
  try {
    const books = JSON.parse(await readJson());
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
