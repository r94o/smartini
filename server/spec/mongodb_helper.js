const mongoose = require('mongoose');

beforeAll((done) => {
  mongoose.connect('mongodb://127.0.0.1/cocktail_test');

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', () => {
    done();
  });
});

afterAll((done) => {
  mongoose.connection.close(true, () => {
    done();
  });
});
