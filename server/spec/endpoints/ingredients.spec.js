const request = require('supertest');

const baseUrl = 'http://localhost:3001/';

describe('Ingredients endpoint', () => {
  describe('Index', () => {
    it('should return a 200 status code and an array of ingredients', async () => {
      const response = await request(baseUrl)
        .get('ingredients');
      expect(response.statusCode).toBe(200);

      const firstObject = response.body.ingredients[0];
      expect(firstObject).toHaveProperty('_id');
      expect(firstObject).toHaveProperty('name');
      expect(firstObject).toHaveProperty('displayName');

      const objectsCount = response.body.ingredients.length;
      expect(objectsCount).not.toEqual([null]);
    });
  });
});
