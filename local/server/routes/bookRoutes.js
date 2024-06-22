const express = require("express");
const {
  getAllBooksController,
  createBookController,
  updateBookController,
  getBookByIdController,
  deleteBookController,
} = require("../controllers/bookControllers");

// Router object
const router = express.Router();

// Routes
router.get("/all-books", getAllBooksController);
router.post("/create-book", createBookController);
router.put("/update-book/:id", updateBookController);
router.get("/single-book/:id", getBookByIdController);
router.delete("/delete-book/:id", deleteBookController);

module.exports = router;
