const mongoose = require('mongoose')

const authorModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    genre: { type: String, required: true },
    number: { type: String, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Author', authorModel)
