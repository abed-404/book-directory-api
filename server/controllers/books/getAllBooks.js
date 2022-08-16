const { openJson } = require('../../Database');

const getAllAction = (req, res, data) => {
  const books = JSON.parse(data);
  res.status(200, { 'Content-Type': 'application/json' }).send(books);
};

const getAllBooks = (req, res) => {
  openJson(req, res, getAllAction);
};

module.exports = { getAllBooks };
