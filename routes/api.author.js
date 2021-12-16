const Author = require("../model/author");

const router = require("express").Router();

router.post("/add-author", (req, res) => {
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

router.get("/get-author", (req, res) => {
  const filterName = req.query.name
    ? { name: new RegExp(`${req.query.name}`, "ig") }
    : {};

  Author.find(filterName).then((authors) => {
    res.json(authors);
  });
});

router.put("/update-author/:id", (req, res) => {
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

router.delete("/delete-author/:id", (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ message: "author deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "something went wrong" });
    });
});

module.exports = router;
