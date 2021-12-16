const router = require("express").Router();
const book = require("../controllers/book");

router.post("/new-book", book.add);
router.get("/get-book", book.get);
router.put("/update-book/:id", book.update);
router.delete("/delete-book/:id", book.delete);

module.exports = router;
