const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const photos = require("./photos.js");
const Photo = photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

// upload comment
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  if (!req.body.commentText) {
    return res.status(400).send({
        message: 'Empty comments not allowed.'
    });
  }

  const comment = new Comment({
    user: req.user,
    photo: req.body.photo,
    text: req.body.commentText,
  });

  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all comments for photo
router.get("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(400);
    }

    const comments = await Comment.find({photo: mongoose.Types.ObjectId(req.params.id)}).sort({
      created: 1
    }).populate('user');

    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}
