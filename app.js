const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const expresslayouts = require('express-ejs-layouts');
const passport = require('passport');
const path = require('path');
const flash = require('connect-flash');
const bodyparser = require('body-parser');

const app = express();

// -----Passpot Initialiation-----
require('./config/passport')(passport);

// --------Database Conf --------
const db = require('./config/key').MongoURI;

mongoose.connect(db,{useNewUrlParser : true ,useUnifiedTopology : true , useFindAndModify : false})
.then(() => {

})
.catch((err) => {
  console.log(err);
});

// ------esj conf --------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.use(session({
  secret : 'monitor',
  resave : true,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/user/:id',require('./routes/list'))

const PORT = process.env.PORT || 3000;

app.listen(PORT);
