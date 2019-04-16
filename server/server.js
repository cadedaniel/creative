const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/photobomb', {
  useNewUrlParser: true
});

const morgan = require('morgan');
app.use(morgan('tiny'));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const photos = require("./photos.js");
app.use("/api/photos", photos.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.listen(8888, () => console.log('Server listening on port 8888!'));