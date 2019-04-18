const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require('./users.js')

const User = users.model;

const submissionSchema = new mongoose.Schema({
  author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
  },
  link: String,
  description: String,
  upvoters: Array,
  downvoters: Array,
});

const Submission = mongoose.model('Submission', submissionSchema);

// create a new submission.
router.post('/', auth.verifyToken, User.verify, async (req, res) => {

    if (!req.body.link || !req.body.description) {
        return res.status(403).send({message: 'link and description are required'});
    }

    const submission = new Submission({
        author: req.user,
        link: req.body.link,
        description: req.body.description,
        upvoters: [],
        downvoters: []
    });

    try {
        await submission.save();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    return res.sendStatus(202);
});

// Get all submissions
router.get('/', async (req, res) => {

    // going to want pagination I think.

    return res.sendStatus(200);
});

// Add yourself as an upvoter TODO need to do these when I have test data.
router.post('/:id/upvoters', auth.verifyToken, User.verify, async (req, res) => {

    try {
      const submission = await Submission.findOne({
          _id: req.params.id
      });

      console.log(req.user.id);

      return res.sendStatus(202);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// Add yourself as a downvoter
router.post('/:id/downvoters', auth.verifyToken, User.verify, async (req, res) => {
    return res.sendStatus(200);
});

// Delete your submission
router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
    return res.sendStatus(500);
});

module.exports = {
  model: Submission,
  routes: router,
}
