const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const path = require("path");

const port = 8080;

const app = express();
const uri = "mongodb://localhost:27017/blog-1";

app
  .use(bodyParser.json())
  .use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", (req, res, next) => {
  res.status(200).json({ message: "API Hitted!" });
});

mongoose.connect(uri).then((result) => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
