const express = require('express');

const router = express.Router();

/* GET drinks page. */
router.get('/', (req, res) => {
  res.send('hello world');
});

module.exports = router;
