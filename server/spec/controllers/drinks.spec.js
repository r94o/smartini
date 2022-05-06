const db = require('./db');
beforeAll(async () => await db.connect());
afterEach(async () => { await db.clearDatabase(); });
afterAll(async () => await db.closeDatabase());

const DrinksController = require('../../controllers/drinks');
const Drink = require('../../models/drink');

// describe("DrinksController", () => {
//   Drink.create({
//     ingredients: ['ingredient 1', 'ingredient 2'],
//     measures: ['1 oz', '2 oz'],
//     name: 'cocktail shmocktail',
//     displayName: 'Cocktail Shmocktail',
//     category: 'booze',
//     iba: 'Contemporary Classic',
//     alcoholic: 'Alcoholic',
//     glass: 'Collins',
//     instructions: 'Mix together in washing machine',
//     image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
//   })
//   DrinksController.Index((req, res, done) => {
//     res.json().then(data => console.log(data.drinks[0].name));
//     expect(true).toBe(true);
//   })
// });