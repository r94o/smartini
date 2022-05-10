const mongoose = require('mongoose');
const waitForExpect = require('wait-for-expect');

const mongoDb = process.env.MONGODB_TARGET || 'cocktail_test';
const mongoDbUrl = process.env.MONGODB_URI || `mongodb://localhost/${mongoDb}`;

const DrinksController = require('../../controllers/drinks');
const Drink = require('../../models/drink');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = {};

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
      console.log('Unable to dsconnect from MongoDB:', err);
    }
  });

  describe('Index', () => {
    beforeEach(() => {
      req = mockRequest;
      res = mockResponse();
    });
    it('finds all drinks', async () => {
      jest.spyOn(Drink, 'find').mockImplementation(() => Promise.resolve(['Example Drink']));
      DrinksController.Index(req, res);
      await waitForExpect(() => {
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ drinks: ['Example Drink'] });
      });
    });
    it('the fetch fails with an error', async () => {
      jest.spyOn(Drink, 'find').mockImplementation(() => {
        // return Promise.reject('Error');
        throw 'Error';
      });
      DrinksController.Index(req, res);
      await waitForExpect(() => {
        expect(Drink.find).toBeCalled();
        expect(res.status).toHaveBeenLastCalledWith(500);
        expect(res.send).toHaveBeenCalled();
      });
    });
    it('sends a status 500 on failure', async () => {
      DrinksController.Index(req, res);
      jest.spyOn(Drink, 'find');
      expect(Drink.find).toBeCalled();
      expect(res.status).toHaveBeenLastCalledWith(500);
    });
  });
  // describe('FilterByIdString', () => {
  //   beforeEach(() => {
  //     req = mockRequest;
  //     res = mockResponse();
  //   });
  //   it('finds a single drink based on id', async () => {
  //     req.params = {
  //       id: 'certain_id',
  //     };
  //     jest.spyOn(Drink, 'findOne').mockImplementation(() => {
  //       return Promise.resolve(['A Certain Drink']);
  //     });
  //     DrinksController.FilterByIdString(req, mockResponse());
  //     expect(Drink.findOne).toBeCalledWith({ id: 'certain_id' });
  //   });
  //   it('sends a status 500 on failure', async () => {
  //     DrinksController.FilterByIdString(req, res);
  //     jest.spyOn(Drink, 'findOne').mockReturnValueOnce({ drinks: 'Example Drink' });
  //     await waitForExpect(() => {
  //       expect(Drink.findOne).toBeCalled();
  //       expect(res.send).toHaveBeenCalled();
  //       expect(res.send).toHaveBeenCalledWith({ drinks: ['Example Drink'] });
  //     });

  //     expect(res.status).toHaveBeenCalledWith(500);
  //   });
  // });
  // describe('FilterByIngredient', () => {
  //   it('finds drinks based on search ingredients', async () => {
  //     req.body = {
  //       ingredients: ['an ingredient to be found'],
  //     };
  //     jest.spyOn(Drink, 'find').mockImplementation(() => {
  //       return Promise.resolve(['Example Drink']);
  //     });
  //     DrinksController.FilterByIngredient(req, res);
  //     expect(Drink.find).toBeCalledWith({ ingredients: { $in: ['an ingredient to be found'] } });
  //   });
  // });
  // describe('FilterByAllIngredientsAvailable', () => {
  //   it('finds drinks that can be made with the search ingredients', async () => {
  //     req.body = {
  //       ingredients: ['several', 'ingredients', 'to', 'find'],
  //     };
  //     jest.spyOn(Drink, 'findOne');
  //     const returnValue = DrinksController.FilterByAllIngredientsAvailable(req, res).then(() => {
  //       expect(Drink.find).toBeCalledWith({
  //         $expr: { $setIsSubset: ['$ingredients', ['several', 'ingredients', 'to', 'find']] },
  //       });

  //     });
  //     console.log('FBAIA', returnValue);
  //   });
  //   it('returns the drinks that can be made', async () => {
  //     req.body = {
  //       ingredients: ['several', 'ingredients', 'to', 'find'],
  //     };
  //     DrinksController.FilterByAllIngredientsAvailable(req, res);
  //     jest.spyOn(Drink, 'find').mockReturnValueOnce(['drinks']);
  //     expect(Drink.find).toBeCalledWith({
  //       $expr: { $setIsSubset: ['$ingredients', ['several', 'ingredients', 'to', 'find']] },
  //     });
  //     expect(res.send).toHaveBeenCalledWith(
  //       {
  //         drinks: ['drinks'],
  //       },
  //     );
  //   });
  // });
});
