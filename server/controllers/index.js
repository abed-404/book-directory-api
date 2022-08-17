const getAllBooks = require('./books/get-all-books.controllers');
const getBook = require('./books/get-book.cotrollers');
const deleteBook = require('./books/delete-book.controllers');
const addBook = require('./books/post-book.controller');
const updateBook = require('./books/update-book.controllers');

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
