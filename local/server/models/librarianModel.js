// models/librarianModel.js

const mongoose = require("mongoose");

const librarianSchema = new mongoose.Schema({
    librarianname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Librarian = mongoose.model("Librarian", librarianSchema);

module.exports = Librarian;
