const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1/CRM_API");
const cors = require("cors");
const bodyParser = require("body-parser");
// const Session = require("./models/sessionsModel");
// const config = require('./config');
// const jwt = require('jsonwebtoken');


// check for cors
app.use(cors());

//middlewares
//app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index.routes'));

// Up server
app.listen(3000, () => console.log("CRM API is listening on port 3000!"));