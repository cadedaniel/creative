const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require('./users.js')

const User = users.model;

const submissionSchema = new mongoose.Schema({
  author: String,
  link: String,
  description: String,
  upvoters: { type: Array, default: []},
  downvoters: { type: Array, default: []},
});

const Submission = mongoose.model('Submission', submissionSchema);

// create a new submission.
router.post('/', auth.verifyToken, User.verify, async (req, res) => {

    if (!req.body.link || !req.body.description) {
        return res.status(403).send({message: 'link and description are required'});
    }

    const submission = new Submission({
        author: req.user.username,
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
    //
    const submissions = (await Submission.find({})).map(s => {
        // Yes, this is a horrible idea for producton. n < 100.
        return {
            id: s._id,
            author: s.author,
            link: s.link,
            description: s.description,
            upvoter_count: (s.upvoters || []).length,
            downvoter_count: (s.downvoters || []).length,
        };
    });

    return res.status(200).send(submissions);
});

// Add yourself as an upvoter TODO need to do these when I have test data.
router.post('/:id/upvoters', auth.verifyToken, User.verify, async (req, res) => {

    try {
      const submission = await Submission.findOne({
          _id: req.params.id
      });
        
      if (submission.upvoters.includes(req.user.id)) {
        return res.status(403).send({message: 'You already upvoted this submission'});
      }

      submission.upvoters.push(req.user.id);
      await submission.save();
      return res.sendStatus(202);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// Add yourself as a downvoter
router.post('/:id/downvoters', auth.verifyToken, User.verify, async (req, res) => {
    try {
      const submission = await Submission.findOne({
          _id: req.params.id
      });
        
      if (submission.downvoters.includes(req.user.id)) {
        return res.status(403).send({message: 'You already downvoted this submission'});
      }
      submission.downvoters.push(req.user.id);
      await submission.save();
      return res.sendStatus(202);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// Delete your submission
router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {

    try {
      const submission = await Submission.findOne({
          _id: req.params.id
      });

      if (submission.author !== req.user.username) {
        return res.status(403).send({message: 'You do not have permission to delete that submission'});
      }

      await submission.remove();
      return res.sendStatus(202);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
  model: Submission,
  routes: router,
}
