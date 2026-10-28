
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  author: {
    type: String,
    trim: true,
    default: ""
  },
  category: {
    type: String,
    trim: true,
    default: ""
  },
  available:{
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});
module.exports = mongoose.model("Book", bookSchema);
