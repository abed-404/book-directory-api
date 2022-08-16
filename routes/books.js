const express = require('express');
const handlers = require('./handlers');

const router = express.Router();
router.use(express.json());

router.route('/')
  .get((req, res) => {
    handlers.getAllHandler(req, res);
  })
  .post((req, res) => {
    handlers.postHandler(req, res);
  });
router.route('/:id')
  .get((req, res) => {
    handlers.getOneHandler(req, res);
  })
  .put((req, res) => {
    handlers.putHandler(req, res);
  })
  .delete((req, res) => {
    handlers.deletHandler(req, res);
  });

module.exports = router;
