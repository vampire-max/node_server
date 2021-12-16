const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = 3001;
const app = express();

require("dotenv").config();

app.use(bodyParser.json());

const bookRoutes = require("./routes/api.book.js");
const authorRoutes = require("./routes/api.author.js");

app.use("/api/author", authorRoutes);
app.use("/api/book", bookRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connect to db"))
  .catch((err) => console.log(("couldn't connect to db, here is why:", err)));

app.listen(PORT, () => console.log(`listening port ${PORT}`));
