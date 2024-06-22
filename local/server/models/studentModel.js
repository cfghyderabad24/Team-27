const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    roll: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
