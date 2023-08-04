var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session=require("express-session");
const pass=require("passport");
const flash=require("express-flash");
const cors=require("cors");

//utils setup section
const dotenv=require("dotenv").config();
const db=require("./utils/db");
const passport=require("./utils/passport");



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter=require("./routes/auth");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//auth setup
app.use(session({
  secret:process.env.sessionSecret,
  resave:false,
  saveUninitialized:false
}));

app.use(pass.initialize());
app.use(pass.session());

app.use(flash());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//routes setup section
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth",authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
