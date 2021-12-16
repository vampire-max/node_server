const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 3001;

require("dotenv").config();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connect to db"))
  .catch((err) => console.log(("couldn't connect to db, here is why:", err)));

const bookModel = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookModel);

app.post("/api/new-book", (req, res) => {
  new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  })
    .save()
    .then((newBook) => {
      console.log(newBook);
      res.json({ code: "ok", message: "book has been added", book: newBook });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ code: "500", message: "something went wrong" });
    });
});
app.get("/api/get-books", (req, res) => {
  const query = req.query.title
    ? { title: new RegExp(`${req.query.title}`, "ig") }
    : {};

  Book.find(query)
    .populate("author")
    .then((books) => {
      res.json(books);
    });
});
app.put("/api/update-book/:id", (req, res) => {
  Book.findOne({ _id: req.params.id })
    .populate("author")
    .then(() => {
      res.json({ message: "book updated successfully" });
    });
});
app.delete("/api/delete-book/:id", (req, res) => {
  Book.deleteOne({ _id: req.params.id }).then(() => {
    res.json({ message: "book deleted successfully" });
  });
});

const authorModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    genre: { type: String, required: true },
    number: { type: String, required: true },
  },
  { timestamps: true }
);
const Author = mongoose.model("Author", authorModel);

app.post("/api/add-author", (req, res) => {
  new Author({
    name: req.body.name,
    address: req.body.address,
    genre: req.body.genre,
    number: req.body.number,
  })
    .save()
    .then((newAuthor) => {
      console.log(newAuthor);
      res.json({ message: "add new author" });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ message: "something went wrong" });
    });
});
app.get("/api/get-author", (req, res) => {
  const filterName = req.query.name
    ? { name: new RegExp(`${req.query.name}`, "ig") }
    : {};

  Author.find(filterName).then((authors) => {
    console.log(authors);
    res.json(authors);
  });
});
app.put("/api/update-author/:id", (req, res) => {
  Author.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  )
    .then(() => {
      res.status(201).json({ message: "author updated successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "something went wrong" });
    });
});
app.delete("/api/delete-author/:id", (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ message: "author deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "something went wrong" });
    });
});

app.listen(PORT, () => console.log(`listening port ${PORT}`));
