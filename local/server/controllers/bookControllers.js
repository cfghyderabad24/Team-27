const bookModel = require("../models/bookModel");

// GET ALL BOOKS
const getAllBooksController = async (req, res) => {
  try {
    const books = await bookModel.find({});
    if (!books) {
      return res.status(200).send({
        success: false,
        message: "No books found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All books list",
      books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting books",
      error,
    });
  }
};

// CREATE BOOK
const createBookController = async (req, res) => {
  try {
    const { name, genre, difficultyLevel, quantity } = req.body;

    // Validation
    if (!name || !genre || !difficultyLevel || !quantity) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const newBook = new bookModel({
      name,
      genre,
      difficultyLevel,
      quantity,
    });

    await newBook.save();

    return res.status(201).send({
      success: true,
      message: "Book created successfully",
      newBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating book",
      error,
    });
  }
};

// UPDATE BOOK
const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genre, difficultyLevel, quantity } = req.body;
    const book = await bookModel.findByIdAndUpdate(
      id,
      { name, genre, difficultyLevel, quantity },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating book",
      error,
    });
  }
};

// GET SINGLE BOOK
const getBookByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Single book fetched successfully",
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while fetching single book",
      error,
    });
  }
};

// DELETE BOOK
const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting book",
      error,
    });
  }
};

module.exports = {
  getAllBooksController,
  createBookController,
  updateBookController,
  getBookByIdController,
  deleteBookController,
};
