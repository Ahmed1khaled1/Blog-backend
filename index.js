const express = require("express");
const mongoose = require("mongoose");
const { PORT, URI } = require("./config");
const blogRoute = require('./routes/blogRoute')
const cors = require('cors')

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/blogs", blogRoute);

mongoose
  .connect(URI)
  .then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);

  

    app.listen(PORT, () => {
      console.log(`listening from port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


