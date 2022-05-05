const express = require('express');

const router = express.Router();
const IngredientsController = require('../controllers/ingredients');

router.get('/', IngredientsController.Index);

module.exports = router;