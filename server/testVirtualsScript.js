require('dotenv').config();
const mongoose = require("mongoose")


const Drink = require("./models/drink")

var mongoDbUrl = process.env.MONGODB_URI || `mongodb://127.0.0.1/cocktail_dev`;
mongoose.connect(mongoDbUrl);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


async function run() {
  try{
    const drink = await Drink.findOne({ name: "martini" })
    console.log(drink)
    console.log(drink.namedId)
  } catch (e) {
    console.log(e.message)
  }
}
run();
