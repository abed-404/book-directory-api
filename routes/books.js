/* eslint-disable prefer-const */
const express = require('express');
const handlers = require('./handlers');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  handlers.getAllHandler(req, res);
});
router.get('/:id', (req, res) => {
  handlers.getOneHandler(req, res);
});
router.post('/', (req, res) => {
  handlers.postHandler(req, res);
});
router.put('/:id', (req, res) => {
  handlers.putHandler(req, res);
});
router.delete('/:id', (req, res) => {
  handlers.deletHandler(req, res);
});

module.exports = router;
