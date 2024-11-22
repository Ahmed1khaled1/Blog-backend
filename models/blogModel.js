const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    summary: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    authorPic: {
      type: String,
    },
    published_date: {
      type: String,
      required: true,
    },
    reading_time: {
      type: String,
    },
    content: {
      type: String,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("book", blogSchema);
module.exports = Blog;
