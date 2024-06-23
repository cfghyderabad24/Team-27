// server.js

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const Librarian = require("./models/librarianModel");
const Student = require("./models/studentModel");
const Book = require("./models/bookModel");
const transaction = require("./routes/transaction");
const studentAnalysis=require("./routes/studentAnalysis")
const connection=require('./utils/connection')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/transaction',transaction)
app.use('/studentAnalysis',studentAnalysis)

// MongoDB Connection
connection()

// Login Route
app.post("/login", async (req, res) => {
    const { librarianname, password } = req.body;

    try {
        // Find librarian by username (librarianname)
        const librarian = await Librarian.findOne({ librarianname });

        if (!librarian) {
            return res.status(404).json({ message: "Librarian not found" });
        }

        // Compare submitted password with hashed password in database
        const isMatch = await bcrypt.compare(password, librarian.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Password matched, login successful
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/students/create', async (req, res) => {
    try {
        console.log(req.body)
        const { roll, name, grade } = req.body;
        const student = new Student({ roll, name, grade });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.post('/books/create', async (req, res) => {
    try {
        console.log(req.body)
        const { name, isbn, genre, difficultyLevel, quantity } = req.body;
        const book = new Book({name, isbn, genre, difficultyLevel, quantity});
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
     }
 });

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
