// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        isbn: { type: Number, required: true, unique: true },
        genre: { type: String, required: true },
        difficultyLevel: { type: String, required: true },
        quantity: { type: Number, required: true },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("Book", bookSchema);
