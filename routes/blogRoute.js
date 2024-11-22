const express = require ('express')
const Blog = require('../models/blogModel')

const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "all fields are required" });
      }
      const blog = await Blog.create(req.body);
      return res.status(200).json(blog);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

  // Route for Get All Blogs from database
  router.get("/", async (req, res) => {
    try {
      const blogs = await Blog.find({});

      return res.status(200).json({
        count: blogs.length,
        data: blogs,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

  // Route for Get One Blog from database by id
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const blog = await Blog.findById(id);

      return res.status(200).json(blog);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

// Route for Update a Blog
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Blog.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Blog not found' });
    }

    return response.status(200).send({ message: 'Blog updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a blog
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Blog.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Blog not found' });
    }

    return response.status(200).send({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;