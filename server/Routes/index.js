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

router.get('/', getAllBooks);
router.post('/', addBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
