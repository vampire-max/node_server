const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 3001

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
    title: { type: String, require: true },
    description: { type: String },
    author: { type: String, require: true },
  },
  { timestamps: true },
)

const Book = mongoose.model('Book', bookModel)

app.post('/api/new-book', (req, res) => {
  res.json({ testing: 'ok' })
  new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  })
    .save()
    .then((newBook) => {
      console.log(newBook)
      res.json({ code: 'ok', message: 'book has been added', book: newBook })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ code: '500', message: 'something went wrong' })
    })
})

app.listen(PORT, () => console.log(`listening port ${PORT}`))
