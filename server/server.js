const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/starstat', {
  useNewUrlParser: true
});

const morgan = require('morgan');
app.use(morgan('tiny'));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

app.listen(8882, () => console.log('Server listening on port 8882!'));
