const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

/* ========================
   CREATE (single / multiple)
======================== */
router.post("/", async (req, res) => {
  try {
    const result = Array.isArray(req.body)
      ? await Book.insertMany(req.body)
      : await new Book(req.body).save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ========================
   READ ALL BOOKS
======================== */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* ========================
   READ BY CATEGORY
======================== */
router.get("/category/:category", async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  if (!books.length)
    return res.status(404).json({ message: "No books found" });
  res.json(books);
});

/* ========================
   READ AFTER YEAR
======================== */
router.get("/after/:year", async (req, res) => {
  const books = await Book.find({
    publishedYear: { $gt: Number(req.params.year) }
  });

  if (!books.length)
    return res.status(404).json({ message: "No books found after this year" });

  res.json(books);
});

/* ========================
   UPDATE COPIES (change +/-)
======================== */
router.put("/copies/:id", async (req, res) => {
  const { change } = req.body;

  if (typeof change !== "number")
    return res.status(400).json({ message: "Change must be a number" });

  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies + change < 0)
    return res.status(400).json({ message: "Copies cannot be negative" });

  book.availableCopies += change;
  await book.save();

  res.json(book);
});

/* ========================
   UPDATE CATEGORY BY ID
======================== */
router.put("/category/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category: req.body.category },
    { new: true }
  );

  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

/* ========================
   DELETE ONLY IF COPIES = 0
======================== */
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies > 0)
    return res.status(400).json({
      message: "Book cannot be deleted unless availableCopies = 0"
    });

  await book.deleteOne();
  res.json({ message: "Book deleted successfully" });
});

module.exports = router;

