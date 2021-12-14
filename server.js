const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()

const PORT = 3001

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTechnology: true,
  })
  .then(() => console.log('connect to db'))
  .err(() => console.log(("couldn't connect to db, here is why:" = err)))

const mongoose = require('mongoose')

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

app.use(bodyParser.json())

app.listen(PORT, () => console.log(`listening port ${PORT}`))

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

// app.get('/api/welcome', (req, res) => {
//   res.send('welcome!')
// })

app.get('/api/data', tunnelCheck, (req, res) => {
  let someId = req.query.id
  temp = [
    {
      id: 1,
      age: 3,
    },
    {
      id: 2,
      age: 13,
    },
  ]
  const result = temp.filter((item) => item.id == someId)
  res.json(result)
})
