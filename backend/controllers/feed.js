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

exports.updatePost = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      errTemplate("Not Authenticated", 401);
    }
    const user = await User.findById(req.userId);
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!user || !post) {
      errTemplate("User or Post not found!", 404);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errTemplate("Validation failed", 422, errors.array());
    }
    const title = req.body.title || post.title;
    const content = req.body.content || post.content;
    post.title = title;
    post.content = content;
    const updatedPost = await post.save();
    res.status(200).json({ message: "Success updated post" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    if (!req.isAuth) {
      errTemplate("Not Authenticated", 401);
    }
    const postId = req.params.postId;
    const user = await User.findById(req.userId);
    const post = await Post.findById(postId);
    if (!post || !user) {
      errTemplate("Post or User not found", 404);
    }
    if (post.creator.toString() !== user._id.toString()) {
      errTemplate("Access Denied", 403);
    }
    await Post.findByIdAndDelete(postId);
    user.posts.pull(postId);
    await user.save();
    res.status(200).json({ message: "Success deleted post" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
