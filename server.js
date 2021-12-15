const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
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
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String, required: true },
  },
  { timestamps: true },
)

const Book = mongoose.model('Book', bookModel)

app.post('/api/new-book', (req, res) => {
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

app.get('/api/get-books', (req, res) => {
  // let search = Book.find({
  //   title: new RegExp(`${req.query.title}`, 'ig'),
  //   description: new RegExp(`${req.query.description}`, 'ig'),
  //   author: new RegExp(`${req.query.author}`, 'ig'),
  // })

  // let search = req.query.title

  const query = req.query.title
    ? { title: new RegExp(`${req.query.title}`, 'ig') }
    : {}

  Book.find(query).then((books) => {
    res.json(books)
  })
})

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

app.post('/api/add-author', (req, res) => {
  new Author({
    name: req.body.name,
    address: req.body.address,
    genre: req.body.genre,
    number: req.body.number,
  })
    .save()
    .then((newAuthor) => {
      res.json({ message: 'add new author' })
    })
    .catch((err) => {
      res.status(500).json({ message: 'something went wrong' })
    })
})

app.put('/api/update-author/:id', (req, res) => {
  Author.updateOne({ id: req.query.id })
    .then(() => {
      res.status(201).json({ message: 'author updated successfully' })
    })
    .catch((err) => {
      res.status(400).json({ message: 'something went wrong' })
    })
})

app.delete('/api/delete-author/:id', (req, res) => {
  Author.deleteOne({ id: req.query.id })
    .then(() => {
      res.json({ message: 'author deleted successfully' })
    })
    .catch((err) => {
      res.status(400).json({ message: 'something went wrong' })
    })
})

app.listen(PORT, () => console.log(`listening port ${PORT}`))
