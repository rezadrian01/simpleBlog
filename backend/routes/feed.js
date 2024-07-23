const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const feedControllers = require("../controllers/feed");

router.get("/posts", feedControllers.getPosts);
router.get("/post/:postId", feedControllers.getPost);
router.post("/user-post", feedControllers.postPostByUserId);
router.post(
  "/post",
  [
    body("title", "Invalid Title").trim().isLength({ min: 3 }),
    body("content", "Invalid Content").trim().isLength({ min: 3 }),
  ],
  feedControllers.createPost
);
router.put(
  "/post/:postId",
  [
    body("title", "Invalid Title").trim().isLength({ min: 3 }),
    body("content", "Invalid Content").trim().isLength({ min: 3 }),
  ],
  feedControllers.updatePost
);
router.delete("/post/:postId", feedControllers.deletePost);

module.exports = router;
