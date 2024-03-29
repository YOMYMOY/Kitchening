require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');


const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');


/* Middlewares */
const localsUserCheck = require('./middlewares/localsUserCheck');
/* const cookieCheck = require('./middlewares/cookieCheck'); */

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'));
app.use(session({secret : "KitcheningForEver", resave : true, saveUninitialized : true}))
/* app.use(cookieCheck) */ //cargo en session lo que hay en la cookie
app.use(localsUserCheck) //cargo en locals lo que hay en session

app
  .use('/', mainRouter)
  .use('/users', usersRouter)
  .use('/courses', coursesRouter)


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
  res.render('error');
});

module.exports = app;
