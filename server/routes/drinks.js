const express = require('express');
const router = express.Router();
const DrinksController = require('../controllers/drinks');

/* GET drinks page. */
router.get('/', DrinksController.Index);
router.get('/:id', DrinksController.FilterByIdString);
router.post('/', DrinksController.FilterByAllIngredientsAvailable);


module.exports = router;
