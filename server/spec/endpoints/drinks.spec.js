const request = require('supertest');

const baseUrl = 'http://localhost:3001/';

describe('Drinks endpoint', () => {
  describe('Index', () => {
    it('should return a 200 status code and an array of drinks', async () => {
      const response = await request(baseUrl)
        .get('drinks');
      expect(response.statusCode).toBe(200);

      const firstObject = response.body.drinks[0];
      expect(firstObject).toHaveProperty('_id');
      expect(firstObject).toHaveProperty('ingredients');
      expect(firstObject).toHaveProperty('measures');
      expect(firstObject).toHaveProperty('name');
      expect(firstObject).toHaveProperty('displayName');
      expect(firstObject).toHaveProperty('category');
      expect(firstObject).toHaveProperty('iba');
      expect(firstObject).toHaveProperty('alcoholic');
      expect(firstObject).toHaveProperty('glass');
      expect(firstObject).toHaveProperty('instructions');
      expect(firstObject).toHaveProperty('image');

      const objectsCount = response.body.drinks.length;
      expect(objectsCount).not.toEqual([null]);
    });
  });
  describe('FindByName', () => {
    it('returns the drink if it exists', async () => {
      const searchTerm = encodeURI('margarita');
      const response = await request(baseUrl)
        .get(`drinks/name/${searchTerm}`);
      expect(response.statusCode).toBe(200);

      const objectsCount = response.body.drinks.length;
      expect(objectsCount).toEqual(1);

      const firstObject = response.body.drinks[0];
      const margaritaObject = {
        measures: ['1 1/2 oz ', '1/2 oz ', '1 oz '],
        name: 'margarita',
        displayName: 'Margarita',
        category: 'Ordinary Drink',
        iba: 'Contemporary Classics',
        alcoholic: 'Alcoholic',
        instructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
        image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
      };
      expect(firstObject).toMatchObject(margaritaObject);
    });
    it('returns an empty array if it does not exist', async () => {
      const searchTerm = encodeURI("definitely isn't in the database");
      const response = await request(baseUrl)
        .get(`drinks/name/${searchTerm}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.drinks).toEqual([null]);
    });
  });
});
