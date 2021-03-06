const Book = require('../model/books')

exports.add = (req, res) => {
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
}
exports.get = (req, res) => {
  const query = req.query.title
    ? { title: new RegExp(`${req.query.title}`, 'ig') }
    : {}

  Book.find(query)
    .populate('author')
    .then((books) => {
      res.json(books)
    })
}
exports.update = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .populate({ path: 'author', select: ' -_id name number' })
    .then((books) => {
      console.log(books)
      res.json(books)
    })
}
exports.delete = (req, res) => {
  Book.deleteOne({ _id: req.params.id }).then(() => {
    res.json({ message: 'book deleted successfully' })
  })
}
