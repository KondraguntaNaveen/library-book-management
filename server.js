const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
