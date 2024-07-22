const Post = require("../models/post");
const User = require("../models/user");
const { errTemplate } = require("../utils/error");
const { validationResult } = require("express-validator");

const perPage = 5;
exports.getPosts = async (req, res, next) => {
  try {
    const page = +req.params.page || 1;
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.status(200).json({ message: "Success get a posts", totalPosts, posts });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      errTemplate("Post not found", 404);
    }
    res.status(200).json({ message: "Success get a post", post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      errTemplate("Not Authenticated", 401);
    }
    const user = await User.findById(req.userId);
    if (!user) {
      errTemplate("User not found", 404);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errTemplate("Validation Failed", 422, errors.array());
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
      title,
      content,
      creator: user,
    });
    const createdPost = await post.save();
    user.posts.push(createdPost);
    await user.save();
    res.status(201).json({
      message: "Success creating post",
      postId: createdPost._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
