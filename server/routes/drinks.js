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
router.post('/missing/1', DrinksController.FilterByOneIngredientMissing);

module.exports = router;
