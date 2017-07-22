const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

// Initializing Express
const app = express();

// Connecting to database
const database = require('./config/database');
database.connect();

// Initializing body-parser
app.use(bodyParser.json());

const users = require('./routes/users');

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Path
app.use(express.static(path.join(__dirname, 'public')));

// For Cross-Origin
app.use(cors());

require('./config/passport')(passport);

app.use('/user', users);

app.get('/', (req, res, next) => {
    res.send('This is the home page');
});

const port = 3000;

app.listen(port, () => {
    console.log('App is running at port: '+port);
});