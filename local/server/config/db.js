const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB ${mongoose.connection.host}`);
  } catch (error) {
    console.log("MONGO CONNECT ERROR: ", error);
  }
};

module.exports = connectDB;
