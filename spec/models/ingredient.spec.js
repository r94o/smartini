const mongoose = require('mongoose');

require('../mongodb_helper');
const Ingredient = require('../../models/ingredient');

describe('Ingredient model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.ingredients.drop(() => {
      Ingredient.syncIndexes(() => {
        done();
      });
    });
  });

  it('has a database name (lower case)', () => {
    const ingredient = new Ingredient({
      name: 'tasty beverage',
      displayName: 'Tasty Beverage',
    });
    expect(ingredient.name).toEqual('tasty beverage');
  });

  it('has a display name (proper case)', () => {
    const ingredient = new Ingredient({
      name: 'tasty beverage',
      displayName: 'Tasty Beverage',
    });
    expect(ingredient.displayName).toEqual('Tasty Beverage');
  });

  it('has name as a required field', async () => {
    const ingredient = new Ingredient({
      displayName: 'Tasty Beverage',
    });
    await expect(ingredient.save()).rejects.toThrow();
  });

  it('name is a unique entry', async () => {
    const ingredient = new Ingredient({
      name: 'tasty beverage',
      displayName: 'Tasty Beverage',
    });
    await ingredient.save();

    const ingredientCopy = new Ingredient({
      name: 'tasty beverage',
      displayName: 'Tasty Beverage',
    });
    await expect(ingredientCopy.save()).rejects.toThrow();
  });

  it('can list all ingredients', (done) => {
    Ingredient.find((findError, ingredients) => {
      expect(findError).toBeNull();
      expect(ingredients).toEqual([]);
      done();
    });
  });

  it('can retrieve an ingredient', (done) => {
    const ingredient = new Ingredient({
      name: 'tasty beverage',
      displayName: 'Tasty Beverage',
    });

    ingredient.save((saveError) => {
      expect(saveError).toBeNull();
      Ingredient.find((findError, ingredients) => {
        expect(findError).toBeNull();
        expect(ingredients[0]).toMatchObject({
          name: 'tasty beverage',
          displayName: 'Tasty Beverage',
        });
        done();
      });
    });
  });
});
