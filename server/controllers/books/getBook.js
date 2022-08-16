const { openJson } = require('../../Database');

const getOneAction = (req, res, data) => {
  const books = JSON.parse(data);
  const book = books.find((el) => el.id === parseInt(req.params.id, 10));
  if (!book) {
    res.status(404, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
  } else { res.status(200, { 'Content-Type': 'application/json' }).send(book); }
};
const getBook = (req, res) => {
  openJson(req, res, getOneAction);
};

module.exports = { getBook };
