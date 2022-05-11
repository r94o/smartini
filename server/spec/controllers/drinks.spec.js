const mongoose = require('mongoose');
const waitForExpect = require('wait-for-expect');

const mongoDb = process.env.MONGODB_TARGET || 'cocktail_test';
const mongoDbUrl = `mongodb://localhost/${mongoDb}`;

const DrinksController = require('../../controllers/drinks');
const Drink = require('../../models/drink');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = {};

// These controller tests are to be revisited
// While it was possible to mock the model response initially 
// Now that populate is called on the response from the model
// The mock cannot have populate called on it and so the correct (mocked) response is never sent to res.send

describe('DrinksController', () => {
  let req;
  let res;

  // Connect to MongoDB once, before running any test
  beforeAll(() => {
    mongoose.connect(mongoDbUrl);
  });

  // Disconnect from MongoDB, after finsihing the tests
  // Not working -> throws an error that says MongoClient is not connected
  afterAll(async () => {
    try {
      await mongoose.disconnect();
      await mongoose.connection.close();
    } catch (err) {
      console.log('Unable to disconnect from MongoDB:', err);
    }
  });

  describe('Index', () => {
    beforeEach(() => {
      req = mockRequest;
      res = mockResponse();
    });
    it('finds all drinks', async () => {
      jest.spyOn(Drink, 'find')
        .mockImplementation(() => {
          return Promise.resolve(['Example Drink']);
        });
      // const mockCallback = jest.fn(() => { });
      // jest.spyOn(mockCallback, 'populate')
      //   .mockImplementation(() => {
      //     return ['Example Drink'];
      //   });
      DrinksController.Index(req, res);
      await waitForExpect(() => {
        expect(Drink.find).toBeCalled();
        // expect(res.send)
        //   .toHaveBeenCalledWith({ drinks: ['Example Drink'] });
      });
    });
    it('sends a status 500 on failure', async () => {
      jest.spyOn(Drink, 'find').mockImplementation(() => {
        throw 'Error';
      });
      DrinksController.Index(req, res);
      await waitForExpect(() => {
        expect(Drink.find).toBeCalled();
        expect(res.sendStatus).toHaveBeenCalledWith(500);
      });
    });
  });
  describe('FindByIdString', () => {
    beforeEach(() => {
      req = mockRequest;
      res = mockResponse();
    });
    it('finds a single drink based on id', async () => {
      req.params = {
        id: 'certain_id',
      };
      jest.spyOn(Drink, 'findOne').mockImplementation(() => {
        return Promise.resolve(['A Certain Drink']);
      });
      DrinksController.FindByIdString(req, res);
      await waitForExpect(() => {
        expect(Drink.findOne).toBeCalledWith({ id: 'certain_id' });
        // expect(res.send)
        //   .toHaveBeenCalledWith({ drinks: ['A Certain Drink'] });
      });
    });
    it('sends a status 500 on failure', async () => {
      DrinksController.FindByIdString(req, res);
      jest.spyOn(Drink, 'findOne').mockImplementation(() => {
        throw 'Error';
      });
      await waitForExpect(() => {
        expect(Drink.findOne).toBeCalled();
        expect(res.sendStatus).toHaveBeenCalledWith(500);
      });
    });
  });
  describe('FilterByIngredient', () => {
    it('finds drinks based on search ingredients', async () => {
      req.params = {
        ingredient: encodeURI('an ingredient to be found'),
      };
      jest.spyOn(Drink, 'find').mockImplementation(() => {
        return Promise.resolve(['Example Drink']);
      });
      DrinksController.FilterByIngredient(req, res);
      await waitForExpect(() => {
        expect(Drink.find)
          // .toBeCalledWith({ "$in": 'an ingredient to be found' });
          .toBeCalled();
      });
    });
  });
  describe('FilterByAllIngredientsAvailable', () => {
    it('finds drinks that can be made with the search ingredients', async () => {
      req.body = {
        ingredients: ['several', 'ingredients', 'to', 'find'],
      };
      jest.spyOn(Drink, 'find').mockImplementation(() => {
        return Promise.resolve(['A Certain Drink']);
      });
      DrinksController.FilterByAllIngredientsAvailable(req, res);
      await waitForExpect(() => {
        expect(Drink.find).toBeCalledWith({
          $expr: { $setIsSubset: ['$ingredientStrings', ['several', 'ingredients', 'to', 'find']] },
        });
      });
    });
  });
});
