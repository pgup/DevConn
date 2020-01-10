const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const passport = require('passport')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


//DB Config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
    

// app.get('/', (req, res) => res.send('Hello'));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport); // peramater

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port 5000`);
});