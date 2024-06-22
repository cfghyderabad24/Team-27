const express = require('express')
const cors=require('cors')
const connectDB=require('./utils/connection')
const app = express()
require('dotenv').config();

connectDB()

app.use(cors())
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))