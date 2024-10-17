const mongoose = require("mongoose");
require("dotenv").config();

const mongo_URI = process.env.MONGODB_URI;

const initializeDB = async () => {
  try {
    const connection = await mongoose.connect(mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Database connected");
    }
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

module.exports = { initializeDB };
