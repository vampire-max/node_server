const mongoose = require('mongoose')

const bookModel = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    author: { type: String, require: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('book', bookModel)
