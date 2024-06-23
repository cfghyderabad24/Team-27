const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    isbn:{
        type:Number,
        required: [true,"isbn is required"]
    },
    genre: {
      type: String,
      required: [true, "genre is required"],
    },
    difficultyLevel: {
      type: String,
      required: [true, "difficulty level is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;