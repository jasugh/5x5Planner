const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const user = require('./routes/api/user');
const plan = require('./routes/api/plan');
const routineday = require('./routes/api/routineDay');
const routine = require('./routes/api/routine');
const workout = require('./routes/api/workout');
const settings = require('./routes/api/settings');
const category = require('./routes/api/category');
const exercise = require('./routes/api/exercise');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/user', user);
app.use('/api/plan', plan);
app.use('/api/routineday', routineday);
app.use('/api/routine', routine);
app.use('/api/workout', workout);
app.use('/api/settings', settings);
app.use('/api/category', category);
app.use('/api/exercise', exercise);

// Server static assets if production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
 app.use(express.static('client/build'));

 app.get('*', (res, req) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
 });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
