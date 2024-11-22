const express = require("express");
const mongoose = require("mongoose");
const { PORT, URI } = require("./config");
const blogRoute = require('./routes/blogRoute')
const cors = require('cors')
const Blog = require("../models/blogModel");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());


mongoose
  .connect(URI)
  .then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);

  app.post("/blogs", async (req, res) => {
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
  app.get("/blogs", async (req, res) => {
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
  app.get("/blogs/:id", async (req, res) => {
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
  app.put("/blogs/:id", async (request, response) => {
    try {
      if (!request.body) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }

      const { id } = request.params;

      const result = await Blog.findByIdAndUpdate(id, request.body);

      if (!result) {
        return response.status(404).json({ message: "Blog not found" });
      }

      return response
        .status(200)
        .send({ message: "Blog updated successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  // Route for Delete a blog
  app.delete("/blogs/:id", async (request, response) => {
    try {
      const { id } = request.params;

      const result = await Blog.findByIdAndDelete(id);

      if (!result) {
        return response.status(404).json({ message: "Blog not found" });
      }

      return response
        .status(200)
        .send({ message: "Blog deleted successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  

    app.listen(PORT, () => {
      console.log(`listening from port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


