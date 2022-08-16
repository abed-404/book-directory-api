const { openJson, updateJson } = require('../../Database');

const deleteAction = (req, res, data) => {
  const allBooks = JSON.parse(data);
  const books = allBooks.filter((el) => el.id !== parseInt(req.params.id, 10));
  if (books.length === allBooks.length) {
    res.status(400, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} can not been found` });
  } else {
    updateJson(books, res);
    res.status(201, { 'Content-Type': 'application/json' }).send({ massage: `user with id: ${req.params.id} name has been Deleted successfully` });
  }
};
const deleteBook = (req, res) => {
  openJson(req, res, deleteAction);
};

module.exports = { deleteBook };
