
const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, author, category } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const book = await Book.create({
      title,
      author,
      category
    });

    return res.status(201).json({
      message: "Book added successfully",
      book
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.page, 10) || 1;
    const limitNumber = parseInt(req.query.limit, 10) || 10;

    const page = Math.max(pageNumber, 1);
    const limit = Math.min(Math.max(limitNumber, 1), 100);
    const skip = (page - 1) * limit;

    const [books, totalRecords] = await Promise.all([
      Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit), Book.countDocuments()
    ]);

    return res.status(200).json({
      currentPage: page,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      books
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    if (typeof available !== "boolean") {
      return res.status(400).json({
        message: "Available must be true or false"
      });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      { available },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    return res.status(200).json({
      message: "Book availability updated successfully",
      book
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;
