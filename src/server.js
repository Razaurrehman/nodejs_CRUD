require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require("path");

const connUri ='mongodb://localhost:27017';
let PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true , useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

app.use(passport.initialize());
require("./middlewares/jwt")(passport);

require('./routes/index')(app);

app.listen(PORT, () => console.log('Server running on http://localhost:'+PORT+'/'));
