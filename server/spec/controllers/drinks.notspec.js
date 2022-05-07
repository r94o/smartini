// const mongoose = require('mongoose');

// const mongoDb = process.env.MONGODB_TARGET || 'cocktail_test';
// const mongoDbUrl = process.env.MONGODB_URI || `mongodb://localhost/${mongoDb}`;

// const DrinksController = require('../../controllers/drinks');
// const Drink = require('../../models/drink');
// // jest.mock('../../models/drink');

// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   res.send = jest.fn().mockReturnValue(res);
//   return res;
// };

// const mockRequest = {};

// describe('DrinksController', () => {
//   let req;
//   let res;

//   // Connect to MongoDB once, before running any test
//   beforeAll(() => {
//     mongoose.connect(mongoDbUrl);
//   });

//   // Disconnect from MongoDB, after finsihing the tests
//   // Not working -> throws an error that says MongoClient is not connected
//   afterAll(async () => {
//     try {
//       await mongoose.disconnect();
//       await mongoose.connection.close();
//     } catch (err) {
//       console.log('Unable to dsconnect from MongoDB:', err);
//     }
//   });

//   describe('Index', () => {
//     beforeEach(() => {
//       req = mockRequest;
//       res = mockResponse();
//     });
//     xit('finds all drinks', (done) => {
//       jest.spyOn(Drink, 'find').mockImplementation(() => {
//         Promise.resolves({ drinks: 'Example Drink' });
//       });
//       console.log('Promise?:', Drink.find);
//       DrinksController.Index(req, res);
//       console.log(res.status.mock);
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalledWith('Example Drink');
//       done();
//     });
//     it('the fetch fails with an error', (done) => {
//       // jest.spyOn(Drink, 'find').mockImplementation(() => { throw 'error' });
//       DrinksController.Index(req, res);
//       // expect(Drink.find).toHaveBeenCalled();
//       expect(res.status).toHaveBeenLastCalledWith(500);
//       done();
//     });
//     it('sends a status 500 on failure', (done) => {
//       DrinksController.Index(req, res);
//       jest.spyOn(Drink, 'find');
//       expect(Drink.find).toBeCalled();
//       expect(res.status).toHaveBeenLastCalledWith(500);
//       done();
//     });
//   });
//   describe('FilterByIdString', () => {
//     it('finds a single drink based on id', (done) => {
//       req.params = {
//         id: 'certain_id',
//       };
//       jest.spyOn(Drink, 'findOne').mockReturnValueOnce();
//       DrinksController.FilterByIdString(req, mockResponse());
//       expect(Drink.findOne).toBeCalledWith({ id: 'certain_id' });
//       done();
//     });
//     it('sends a status 500 on failure', (done) => {
//       DrinksController.FilterByIdString(req, res);
//       jest.spyOn(Drink, 'findOne').mockReturnValueOnce({ drinks: 'Example Drink' });
//       expect(Drink.findOne).toBeCalled();
//       expect(res.status).toHaveBeenCalledWith(500);
//       done();
//     });
//   });
//   describe('FilterByIngredient', () => {
//     it('finds drinks based on search ingredients', (done) => {
//       req.body = {
//         ingredients: ['an ingredient to be found'],
//       };
//       DrinksController.FilterByIngredient(req, res);
//       jest.spyOn(Drink, 'find');
//       expect(Drink.find).toBeCalledWith({ ingredients: { $in: ['an ingredient to be found'] } });
//       done();
//     });
//   });
//   describe('FilterByAllIngredientsAvailable', () => {
//     it('finds drinks that can be made with the search ingredients', (done) => {
//       req.body = {
//         ingredients: ['several', 'ingredients', 'to', 'find'],
//       };
//       jest.spyOn(Drink, 'findOne');
//       const returnValue = DrinksController.FilterByAllIngredientsAvailable(req, res).then(() => {
//         expect(Drink.find).toBeCalledWith({
//           $expr: { $setIsSubset: ['$ingredients', ['several', 'ingredients', 'to', 'find']] },
//         });
//         done();
//       });
//       console.log('FBAIA', returnValue);
//     });
//     it('returns the drinks that can be made', (done) => {
//       req.body = {
//         ingredients: ['several', 'ingredients', 'to', 'find'],
//       };
//       DrinksController.FilterByAllIngredientsAvailable(req, res);
//       jest.spyOn(Drink, 'find').mockReturnValueOnce(['drinks']);
//       expect(Drink.find).toBeCalledWith({
//         $expr: { $setIsSubset: ['$ingredients', ['several', 'ingredients', 'to', 'find']] },
//       });
//       expect(res.send).toHaveBeenCalledWith(
//         {
//           drinks: ['drinks'],
//         },
//       );
//       done();
//     });
//   });
// });
