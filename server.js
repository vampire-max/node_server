const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { resetWatchers } = require('nodemon/lib/monitor/watch')
const PORT = 3001

require('dotenv').config()

app.use(bodyParser.json())
app.listen(PORT, () => console.log(`listening port ${PORT}`))

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('connect to db'))
  .catch((err) => console.log(("couldn't connect to db, here is why:", err)))

const bookModel = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    author: { type: String, require: true },
  },
  { timestamps: true },
)

const Book = mongoose.model('Book', bookModel)

Book({ title: 'Book 1', description: 'solid principle', author: 'author1' })
  .save()
  .then((newBook) => console.log(newBook))
  .catch((err) => console.log(err))

Book.find().then((books) => console.log(books))

const tunnelCheck = (req, res, next) => {
  const tunnel = req.body ? req.body.tunnel : null
  if (tunnel) {
    next()
  } else {
    res.send({ message: 'Unauthorized' })
  }
}

app.post('/', tunnelCheck, (req, res) => {
  res.send('Congratulation!')
})

app.post('/new-book', (req, res) => {
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

// require('./routes')(app)

// app.get('/api/welcome', (req, res) => {
//   res.send('welcome!')
// })

// app.get('/api/data', tunnelCheck, (req, res) => {
//   let someId = req.query.id
//   temp = [
//     {
//       id: 1,
//       age: 3,
//     },
//     {
//       id: 2,
//       age: 13,
//     },
//   ]
//   const result = temp.filter((item) => item.id == someId)
//   res.json(result)
// })
