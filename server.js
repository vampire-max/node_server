const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 3001

require('./routes')(app)
require('dotenv').config()

app.use(bodyParser.json())

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('connect to db'))
  .catch((err) => console.log(("couldn't connect to db, here is why:", err)))

const bookModel = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  },
  { timestamps: true },
)

const Book = mongoose.model('Book', bookModel)

const authorModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    genre: { type: String, required: true },
    number: { type: String, required: true },
  },
  { timestamps: true },
)

const Author = mongoose.model('Author', authorModel)

app.listen(PORT, () => console.log(`listening port ${PORT}`))
