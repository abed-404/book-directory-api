const { getAllBooks } = require('./books/getAllBooks');
const { getBook } = require('./books/getBook');
const { deleteBook } = require('./books/deleteBook');
const { addBook } = require('./books/postBook');
const { updateBook } = require('./books/updateBook');

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
