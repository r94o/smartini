const mongoose = require('mongoose');

require('../mongodb_helper');
const Drink = require('../../models/drink');

describe('Drink model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.drinks.drop(() => {
      Drink.syncIndexes(() => {
        done();
      });
    });
  });

  it('has a database name (lower case)', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.name).toEqual('cocktail shmocktail');
  });

  it('has a display name (proper case)', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.displayName).toEqual('Cocktail Shmocktail');
  });

  it('has a list of ingredients', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.ingredients).toEqual(['ingredient 1', 'ingredient 2']);
  });

  it('has a list of measures', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.measures).toEqual(['1 oz', '2 oz']);
  });

  it('has a category', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.category).toEqual('booze');
  });

  it('has an IBA category', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.iba).toEqual('Contemporary Classic');
  });

  it('has an alcoholic/unalcoholic tag', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.alcoholic).toEqual('Alcoholic');
  });

  it('has a glass category', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.glass).toEqual('Collins');
  });

  it('has instructions', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.instructions).toEqual('Mix together in washing machine');
  });

  it('has an image URL', () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    expect(drink.image).toEqual('https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg');
  });

  it('has name as a required field', async () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    await expect(drink.save()).rejects.toThrow();
  });

  it('has display name as a required field', async () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    await expect(drink.save()).rejects.toThrow();
  });

  it('has instructions as a required field', async () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    await expect(drink.save()).rejects.toThrow();
  });

  it('name is a unique entry', async () => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    await drink.save();

    const drinkCopy = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });
    await expect(drinkCopy.save()).rejects.toThrow();
  });

  it('can list all drinks', (done) => {
    Drink.find((err, drinks) => {
      expect(err).toBeNull();
      expect(drinks).toEqual([]);
      done();
    });
  });

  it('can retrieve a drink', (done) => {
    const drink = new Drink({
      ingredients: ['ingredient 1', 'ingredient 2'],
      measures: ['1 oz', '2 oz'],
      name: 'cocktail shmocktail',
      displayName: 'Cocktail Shmocktail',
      category: 'booze',
      iba: 'Contemporary Classic',
      alcoholic: 'Alcoholic',
      glass: 'Collins',
      instructions: 'Mix together in washing machine',
      image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
    });

    drink.save((err) => {
      expect(err).toBeNull();

      Drink.find((err, drinks) => {
        expect(err).toBeNull();

        expect(drinks[0]).toMatchObject({
          ingredients: ['ingredient 1', 'ingredient 2'],
          measures: ['1 oz', '2 oz'],
          name: 'cocktail shmocktail',
          displayName: 'Cocktail Shmocktail',
          category: 'booze',
          iba: 'Contemporary Classic',
          alcoholic: 'Alcoholic',
          glass: 'Collins',
          instructions: 'Mix together in washing machine',
          image: 'https://inreview52838412.files.wordpress.com/2020/02/e5107a_lg-e1581130075886.jpeg',
        });
        done();
      });
    });
  });
});
