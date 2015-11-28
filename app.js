var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Used for holding/using session data
var session = require('express-session');

//Used for authentication
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

//Setup DB 
var DB = require('./server/config/db.js');
mongoose.connect(DB.url);
mongoose.connection.on('error', function(){
  console.error('MongoDB Connection Error');
});
mongoose.connection.once('open', function(callback) {
  console.log('Connected to MongoDB');
});

var routes = require('./server/routes/index');
var contacts = require('./server/routes/contacts');

var app = express();

//Passport configuration
require('./server/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session configuration
app.use(session({
    secret: 'someSecret',
    saveUninitialized: true,
    resave: true
  })
);

// more authentication configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/contacts', contacts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
