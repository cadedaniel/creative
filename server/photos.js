const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '/var/www/lab5.cadedaniel.com/images',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Photo = mongoose.model('Photo', photoSchema);

// upload photo
router.post("/", auth.verifyToken, User.verify, upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const photo = new Photo({
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get specific photo
router.get("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    
    if (req.params.id === "all") {
        return await getAll(req, res);
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(400);
    }

    const photos = await Photo.find({_id: mongoose.Types.ObjectId(req.params.id)}).sort({
      created: -1
    }).populate('user');

    if (photos.length == 0) {
        return res.sendStatus(404);
    } else {
        return res.send(photos[0]);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", getAll);

async function getAll(req, res) {
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

module.exports = {
  model: Photo,
  routes: router,
}
