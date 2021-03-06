require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const drinksRouter = require('./routes/drinks');
const ingredientsRouter = require('./routes/ingredients');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use('/drinks', drinksRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/users', usersRouter);
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
