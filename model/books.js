const mongoose = require('mongoose')

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

module.exports = mongoose.model('Book', bookModel)
