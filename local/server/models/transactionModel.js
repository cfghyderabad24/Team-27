const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    student_roll: {
        type: Number,
        required: true,
    },
    book_isbn: {
        type: Number,
        required: true
    },
    taken_date: {
        type: Date,
        default:Date.now
    },
    return_date: {
        type: Date,
        required: false
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
