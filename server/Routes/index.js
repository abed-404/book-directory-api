const express = require('express');
const {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers');

const router = express.Router();
router.use(express.json());

router.route('/')
  .get(getAllBooks)
  .post(addBook);
router.route('/:id')
  .get(getBook)
  .put(updateBook)
  .delete(deleteBook);
module.exports = router;
