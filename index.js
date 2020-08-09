const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const db = mongoose.connect("mongodb://127.0.0.1/proyectoll");
const cors = require("cors");
const bodyParser = require("body-parser");
// const Session = require("./models/sessionsModel");
// const config = require('./config');
// const jwt = require('jsonwebtoken');



// check for cors
app.use(cors());

// parses the body
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.listen(3000, () => console.log("TODO API is listening on port 3000!"));