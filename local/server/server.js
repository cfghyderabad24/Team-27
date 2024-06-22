const express = require('express')
const cors=require('cors')
const connectDB=require('./utils/connection')
const Student = require('./models/studentModel');
const Book = require('./models/bookModel');
const app = express()
require('dotenv').config();

connectDB()
app.use(express.json())
app.use(cors())

const transaction=require('./routes/transaction')
app.use('/transaction',transaction)

// app.post('/students/create', async (req, res) => {
//     try {
//         console.log(req.body)
//         const { roll, name, grade } = req.body;
//         const student = new Student({ roll, name, grade });
//         await student.save();
//         res.status(201).json(student);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
// app.post('/books/create', async (req, res) => {
//     try {
//         console.log(req.body)
//         const { name, isbn, genre, difficultyLevel, quantity } = req.body;
//         const book = new Book({name, isbn, genre, difficultyLevel, quantity});
//         await book.save();
//         res.status(201).json(book);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server listening on port ${port}!`))