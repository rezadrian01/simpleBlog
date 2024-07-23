const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const path = require("path");

const port = 8080;

const app = express();
const uri = "mongodb://localhost:27017/blog-1";

//routes
const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");

//auth
const { isAuth } = require("./middleware/auth");

app
  .use(bodyParser.json())
  .use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);

app.use((err, req, res, next) => {
  const data = err.data || [];
  const message = err.message || "An error occured!";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message, data });
});

mongoose.connect(uri).then((result) => {
  app.listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`)
  );
});
