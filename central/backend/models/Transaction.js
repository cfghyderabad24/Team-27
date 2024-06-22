// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        student_roll: { type: Number, required: true },
        book_isbn: { type: Number, required: true },
        return_date: { type: Date, required: true },
        taken_date: { type: Date, required: true },
        library_id: { type: Number, required: true },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);
