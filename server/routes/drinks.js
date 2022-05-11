const express = require('express');

const router = express.Router();
const DrinksController = require('../controllers/drinks');

/* GET drinks page. */
router.get('/', DrinksController.Index);
router.get('/:id', DrinksController.FindByIdString);
router.get('/name/:name', DrinksController.FindByName);
router.get('/video/:name', DrinksController.FindVideoByName);
router.post('/ingredients', DrinksController.FilterByIngredients);
router.post('/', DrinksController.FilterByAllIngredientsAvailable);

module.exports = router;
